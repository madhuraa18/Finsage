from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from datetime import datetime

learn_bp = Blueprint("learn", __name__)

LESSONS = [
    {"id": "1", "title": "What is a Mutual Fund?", "category": "Basics", "xp": 50, "duration": "5 min", "icon": "📚", "difficulty": "Beginner"},
    {"id": "2", "title": "SIP: The Magic of Regular Investing", "category": "Investing", "xp": 75, "duration": "7 min", "icon": "💰", "difficulty": "Beginner"},
    {"id": "3", "title": "Understanding Risk vs Return", "category": "Basics", "xp": 100, "duration": "10 min", "icon": "⚖️", "difficulty": "Beginner"},
    {"id": "4", "title": "Power of Compounding", "category": "Concepts", "xp": 100, "duration": "8 min", "icon": "🚀", "difficulty": "Beginner"},
    {"id": "5", "title": "NIFTY & SENSEX Explained", "category": "Markets", "xp": 125, "duration": "12 min", "icon": "📈", "difficulty": "Intermediate"},
    {"id": "6", "title": "Tax Saving with ELSS Funds", "category": "Tax", "xp": 150, "duration": "15 min", "icon": "💡", "difficulty": "Intermediate"},
    {"id": "7", "title": "Emergency Fund: Your Financial Shield", "category": "Planning", "xp": 100, "duration": "8 min", "icon": "🛡️", "difficulty": "Beginner"},
    {"id": "8", "title": "Debt vs Equity: Know the Difference", "category": "Investing", "xp": 125, "duration": "10 min", "icon": "🔄", "difficulty": "Intermediate"},
    {"id": "9", "title": "Goal-Based Investing Strategy", "category": "Planning", "xp": 150, "duration": "12 min", "icon": "🎯", "difficulty": "Intermediate"},
    {"id": "10", "title": "Portfolio Rebalancing 101", "category": "Advanced", "xp": 200, "duration": "20 min", "icon": "⚡", "difficulty": "Advanced"},
]

BADGES = [
    {"id": "first_lesson", "name": "First Step", "icon": "🌱", "description": "Complete your first lesson", "xp_required": 50},
    {"id": "finance_novice", "name": "Finance Novice", "icon": "📖", "description": "Earn 200 XP", "xp_required": 200},
    {"id": "sip_master", "name": "SIP Master", "icon": "💎", "description": "Complete SIP lesson", "xp_required": 0},
    {"id": "tax_saver", "name": "Tax Saver", "icon": "🏆", "description": "Complete Tax lesson", "xp_required": 0},
    {"id": "investor", "name": "True Investor", "icon": "🚀", "description": "Earn 500 XP", "xp_required": 500},
]

@learn_bp.route("/lessons", methods=["GET"])
@jwt_required()
def get_lessons():
    user_id = get_jwt_identity()
    db = current_app.db
    progress = db.learning_progress.find_one({"user_id": user_id}) or {"completed_lessons": [], "xp": 0, "badges": [], "streak": 0}
    completed = progress.get("completed_lessons", [])
    lessons_with_status = [{**l, "completed": l["id"] in completed} for l in LESSONS]
    return jsonify({
        "lessons": lessons_with_status,
        "xp": progress.get("xp", 0),
        "badges": progress.get("badges", []),
        "streak": progress.get("streak", 0),
        "completed_count": len(completed),
        "total_count": len(LESSONS)
    })

@learn_bp.route("/complete/<lesson_id>", methods=["POST"])
@jwt_required()
def complete_lesson(lesson_id):
    user_id = get_jwt_identity()
    db = current_app.db
    lesson = next((l for l in LESSONS if l["id"] == lesson_id), None)
    if not lesson:
        return jsonify({"error": "Lesson not found"}), 404

    progress = db.learning_progress.find_one({"user_id": user_id})
    completed = progress.get("completed_lessons", []) if progress else []
    if lesson_id in completed:
        return jsonify({"message": "Already completed", "xp_earned": 0})

    new_xp = (progress.get("xp", 0) if progress else 0) + lesson["xp"]
    new_badges = _check_badges(new_xp, completed + [lesson_id], progress.get("badges", []) if progress else [])

    db.learning_progress.update_one(
        {"user_id": user_id},
        {"$addToSet": {"completed_lessons": lesson_id}, "$set": {"xp": new_xp, "badges": new_badges, "last_activity": datetime.utcnow()}, "$inc": {"streak": 1}},
        upsert=True
    )
    return jsonify({"message": "Lesson completed!", "xp_earned": lesson["xp"], "total_xp": new_xp, "new_badges": [b for b in new_badges if b not in (progress.get("badges",[]) if progress else [])]})

def _check_badges(xp, completed, current_badges):
    badges = list(current_badges)
    if xp >= 50 and "first_lesson" not in badges: badges.append("first_lesson")
    if xp >= 200 and "finance_novice" not in badges: badges.append("finance_novice")
    if xp >= 500 and "investor" not in badges: badges.append("investor")
    if "2" in completed and "sip_master" not in badges: badges.append("sip_master")
    if "6" in completed and "tax_saver" not in badges: badges.append("tax_saver")
    return badges

@learn_bp.route("/quiz/<lesson_id>", methods=["GET"])
def get_quiz(lesson_id):
    quizzes = {
        "1": [{"q": "What is a Mutual Fund?", "options": ["A savings account", "A pool of money from many investors managed professionally", "A government bond", "A stock"], "answer": 1}],
        "2": [{"q": "What does SIP stand for?", "options": ["Stock Investment Plan", "Systematic Investment Plan", "Savings Interest Plan", "Safe Investment Program"], "answer": 1}],
        "4": [{"q": "Compounding means earning returns on?", "options": ["Only principal", "Only interest", "Both principal and previous returns", "Nothing"], "answer": 2}],
    }
    return jsonify({"quiz": quizzes.get(lesson_id, [])})
