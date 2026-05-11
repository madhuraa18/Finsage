from flask import Blueprint, request, jsonify, Response, stream_with_context, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.ai_service import get_ai_response, stream_ai_response, generate_investment_plan
from bson import ObjectId

advisor_bp = Blueprint("advisor", __name__)

@advisor_bp.route("/chat", methods=["POST"])
@jwt_required()
def chat():
    user_id = get_jwt_identity()
    data = request.get_json()
    messages = data.get("messages", [])
    stream = data.get("stream", False)

    db = current_app.db
    user = db.users.find_one({"_id": ObjectId(user_id)})
    profile = user.get("profile", {}) if user else {}

    # Save conversation to DB
    if messages:
        db.conversations.update_one(
            {"user_id": user_id},
            {"$push": {"messages": {"$each": messages[-1:]}}},
            upsert=True
        )

    if stream:
        def generate():
            yield from stream_ai_response(messages, profile)
        return Response(stream_with_context(generate()), mimetype="text/event-stream",
                       headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})
    else:
        response = get_ai_response(messages, profile)
        return jsonify({"response": response})

@advisor_bp.route("/investment-plan", methods=["GET"])
@jwt_required()
def investment_plan():
    user_id = get_jwt_identity()
    db = current_app.db
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user or not user.get("profile"):
        return jsonify({"error": "Please complete onboarding first"}), 400

    # Check if we have a cached plan
    cached = db.investment_plans.find_one({"user_id": user_id})
    if cached:
        cached["_id"] = str(cached["_id"])
        return jsonify(cached)

    profile = user["profile"]
    plan = generate_investment_plan(profile)
    plan["user_id"] = user_id
    db.investment_plans.insert_one(plan.copy())
    return jsonify(plan)

@advisor_bp.route("/investment-plan/refresh", methods=["POST"])
@jwt_required()
def refresh_plan():
    user_id = get_jwt_identity()
    db = current_app.db
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user or not user.get("profile"):
        return jsonify({"error": "Please complete onboarding first"}), 400

    db.investment_plans.delete_one({"user_id": user_id})
    profile = user["profile"]
    plan = generate_investment_plan(profile)
    plan["user_id"] = user_id
    db.investment_plans.insert_one(plan.copy())
    return jsonify(plan)

@advisor_bp.route("/explain-eli5", methods=["POST"])
@jwt_required()
def explain_eli5():
    data = request.get_json()
    concept = data.get("concept", "")
    messages = [{"role": "user", "content": f"Explain '{concept}' to me like I'm 5 years old. Use a simple analogy and keep it under 100 words."}]
    response = get_ai_response(messages)
    return jsonify({"explanation": response})

@advisor_bp.route("/crash-simulator", methods=["POST"])
@jwt_required()
def crash_simulator():
    user_id = get_jwt_identity()
    data = request.get_json()
    crash_pct = data.get("crash_percentage", 30)
    db = current_app.db
    user = db.users.find_one({"_id": ObjectId(user_id)})
    profile = user.get("profile", {}) if user else {}

    prompt = f"A market crash of {crash_pct}% just happened. Based on this investor profile: {profile}. Give a calm, reassuring action plan in 5 bullet points. Include: what to do now, what NOT to do, and whether to buy more."
    response = get_ai_response([{"role": "user", "content": prompt}], profile)
    return jsonify({"advice": response, "crash_percentage": crash_pct})
