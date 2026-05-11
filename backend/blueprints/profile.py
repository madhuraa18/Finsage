from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from datetime import datetime

profile_bp = Blueprint("profile", __name__)

@profile_bp.route("/onboarding", methods=["POST"])
@jwt_required()
def complete_onboarding():
    user_id = get_jwt_identity()
    data = request.get_json()
    db = current_app.db

    profile = {
        "age": int(data.get("age", 25)),
        "income": float(data.get("income", 0)),
        "expenses": float(data.get("expenses", 0)),
        "emi": float(data.get("emi", 0)),
        "savings": float(data.get("savings", 0)),
        "risk_appetite": data.get("risk_appetite", "Moderate"),
        "goals": data.get("goals", []),
        "timeline": int(data.get("timeline", 5)),
        "existing_investments": data.get("existing_investments", "None"),
        "emergency_fund": float(data.get("emergency_fund", 0))
    }

    surplus = profile["income"] - profile["expenses"] - profile["emi"]
    personality = _detect_personality(profile)

    db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"profile": profile, "onboarding_complete": True, "financial_personality": personality, "onboarding_date": datetime.utcnow()}}
    )

    return jsonify({
        "message": "Onboarding complete",
        "financial_personality": personality,
        "monthly_surplus": round(surplus, 0),
        "profile": profile
    })

@profile_bp.route("/", methods=["GET"])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    db = current_app.db
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return jsonify({"error": "Not found"}), 404
    profile = user.get("profile", {})
    surplus = profile.get("income", 0) - profile.get("expenses", 0) - profile.get("emi", 0)
    emergency_months = profile.get("emergency_fund", 0) / profile.get("expenses", 1) if profile.get("expenses", 0) > 0 else 0
    dti = (profile.get("emi", 0) / profile.get("income", 1)) * 100 if profile.get("income", 0) > 0 else 0
    return jsonify({
        "profile": profile,
        "financial_personality": user.get("financial_personality"),
        "monthly_surplus": round(surplus, 0),
        "emergency_fund_months": round(emergency_months, 1),
        "debt_to_income_ratio": round(dti, 1),
        "onboarding_complete": user.get("onboarding_complete", False)
    })

@profile_bp.route("/", methods=["PUT"])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    data = request.get_json()
    db = current_app.db
    allowed = ["age","income","expenses","emi","savings","risk_appetite","goals","timeline","existing_investments","emergency_fund"]
    update = {f"profile.{k}": v for k, v in data.items() if k in allowed}
    db.users.update_one({"_id": ObjectId(user_id)}, {"$set": update})
    return jsonify({"message": "Profile updated"})

@profile_bp.route("/health-score", methods=["GET"])
@jwt_required()
def health_score():
    user_id = get_jwt_identity()
    db = current_app.db
    user = db.users.find_one({"_id": ObjectId(user_id)})
    profile = user.get("profile", {}) if user else {}
    score, breakdown = _calculate_health_score(profile)
    return jsonify({"score": score, "breakdown": breakdown, "grade": _score_grade(score)})

def _detect_personality(profile):
    risk = profile.get("risk_appetite", "Moderate")
    timeline = profile.get("timeline", 5)
    if risk == "High" and timeline >= 7: return "Aggressive"
    if risk == "Low" or timeline <= 3: return "Conservative"
    return "Balanced"

def _calculate_health_score(profile):
    score = 0
    breakdown = {}
    income = profile.get("income", 0)
    expenses = profile.get("expenses", 0)
    emi = profile.get("emi", 0)
    savings = profile.get("savings", 0)
    emergency = profile.get("emergency_fund", 0)

    # Savings rate (max 25 pts)
    sr = ((income - expenses - emi) / income * 100) if income > 0 else 0
    sr_score = min(25, int(sr * 25 / 30))
    score += sr_score
    breakdown["savings_rate"] = {"score": sr_score, "max": 25, "value": f"{sr:.1f}%"}

    # Emergency fund (max 25 pts)
    ef_months = emergency / expenses if expenses > 0 else 0
    ef_score = min(25, int(ef_months / 6 * 25))
    score += ef_score
    breakdown["emergency_fund"] = {"score": ef_score, "max": 25, "value": f"{ef_months:.1f} months"}

    # Debt-to-income (max 25 pts)
    dti = (emi / income * 100) if income > 0 else 100
    dti_score = max(0, 25 - int(dti))
    score += dti_score
    breakdown["debt_ratio"] = {"score": dti_score, "max": 25, "value": f"{dti:.1f}%"}

    # Investments (max 25 pts)
    inv_score = 25 if profile.get("existing_investments", "None") != "None" else 10
    score += inv_score
    breakdown["investments"] = {"score": inv_score, "max": 25}

    return min(100, score), breakdown

def _score_grade(score):
    if score >= 80: return "Excellent"
    if score >= 60: return "Good"
    if score >= 40: return "Fair"
    return "Needs Attention"
