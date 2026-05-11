from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from datetime import datetime

goals_bp = Blueprint("goals", __name__)

@goals_bp.route("/", methods=["GET"])
@jwt_required()
def get_goals():
    user_id = get_jwt_identity()
    db = current_app.db
    goals = list(db.goals.find({"user_id": user_id}))
    for g in goals:
        g["_id"] = str(g["_id"])
        g["progress_pct"] = round((g.get("current_amount", 0) / g.get("target_amount", 1)) * 100, 1)
    return jsonify({"goals": goals})

@goals_bp.route("/", methods=["POST"])
@jwt_required()
def create_goal():
    user_id = get_jwt_identity()
    data = request.get_json()
    db = current_app.db
    goal = {
        "user_id": user_id,
        "name": data.get("name"),
        "type": data.get("type", "Custom"),
        "target_amount": float(data.get("target_amount", 0)),
        "current_amount": float(data.get("current_amount", 0)),
        "monthly_contribution": float(data.get("monthly_contribution", 0)),
        "deadline": data.get("deadline"),
        "icon": data.get("icon", "🎯"),
        "created_at": datetime.utcnow().isoformat()
    }
    result = db.goals.insert_one(goal)
    goal["_id"] = str(result.inserted_id)
    goal["progress_pct"] = round((goal["current_amount"] / goal["target_amount"]) * 100, 1) if goal["target_amount"] > 0 else 0
    return jsonify(goal), 201

@goals_bp.route("/<goal_id>", methods=["PUT"])
@jwt_required()
def update_goal(goal_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    db = current_app.db
    update_data = {k: v for k, v in data.items() if k in ["current_amount", "monthly_contribution", "target_amount", "deadline"]}
    db.goals.update_one({"_id": ObjectId(goal_id), "user_id": user_id}, {"$set": update_data})
    return jsonify({"message": "Goal updated"})

@goals_bp.route("/<goal_id>", methods=["DELETE"])
@jwt_required()
def delete_goal(goal_id):
    user_id = get_jwt_identity()
    db = current_app.db
    db.goals.delete_one({"_id": ObjectId(goal_id), "user_id": user_id})
    return jsonify({"message": "Goal deleted"})

@goals_bp.route("/sip-calculate", methods=["POST"])
def sip_calculate():
    data = request.get_json()
    monthly = float(data.get("monthly_amount", 0))
    rate = float(data.get("annual_rate", 12)) / 100 / 12
    months = int(data.get("years", 10)) * 12
    inflation = float(data.get("inflation_rate", 6)) / 100

    future_value = monthly * (((1 + rate) ** months - 1) / rate) * (1 + rate) if rate > 0 else monthly * months
    total_invested = monthly * months
    wealth_gained = future_value - total_invested
    inflation_adjusted = future_value / ((1 + inflation) ** (months / 12))

    yearly_data = []
    running_fv = 0
    for year in range(1, int(months / 12) + 1):
        m = year * 12
        fv = monthly * (((1 + rate) ** m - 1) / rate) * (1 + rate) if rate > 0 else monthly * m
        yearly_data.append({"year": year, "value": round(fv, 0), "invested": round(monthly * m, 0)})

    return jsonify({
        "future_value": round(future_value, 0),
        "total_invested": round(total_invested, 0),
        "wealth_gained": round(wealth_gained, 0),
        "inflation_adjusted_value": round(inflation_adjusted, 0),
        "yearly_projection": yearly_data
    })
