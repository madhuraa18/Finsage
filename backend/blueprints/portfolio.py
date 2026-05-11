from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from datetime import datetime

portfolio_bp = Blueprint("portfolio", __name__)

@portfolio_bp.route("/", methods=["GET"])
@jwt_required()
def get_portfolio():
    user_id = get_jwt_identity()
    db = current_app.db
    portfolio = db.portfolios.find_one({"user_id": user_id})
    if not portfolio:
        return jsonify({"investments": [], "total_value": 0, "total_invested": 0, "total_gain": 0, "gain_pct": 0})
    portfolio["_id"] = str(portfolio["_id"])
    return jsonify(portfolio)

@portfolio_bp.route("/add", methods=["POST"])
@jwt_required()
def add_investment():
    user_id = get_jwt_identity()
    data = request.get_json()
    db = current_app.db

    investment = {
        "id": str(ObjectId()),
        "name": data.get("name"),
        "type": data.get("type", "Mutual Fund"),
        "invested_amount": float(data.get("invested_amount", 0)),
        "current_value": float(data.get("current_value", data.get("invested_amount", 0))),
        "units": float(data.get("units", 0)),
        "buy_nav": float(data.get("buy_nav", 0)),
        "start_date": data.get("start_date", datetime.utcnow().strftime("%Y-%m-%d")),
        "is_sip": data.get("is_sip", False),
        "sip_amount": float(data.get("sip_amount", 0)),
        "added_at": datetime.utcnow().isoformat()
    }

    result = db.portfolios.update_one(
        {"user_id": user_id},
        {
            "$push": {"investments": investment},
            "$inc": {"total_invested": investment["invested_amount"]},
            "$set": {"last_updated": datetime.utcnow()}
        },
        upsert=True
    )
    _recalculate_portfolio(db, user_id)
    return jsonify({"message": "Investment added", "investment": investment}), 201

@portfolio_bp.route("/remove/<investment_id>", methods=["DELETE"])
@jwt_required()
def remove_investment(investment_id):
    user_id = get_jwt_identity()
    db = current_app.db
    db.portfolios.update_one(
        {"user_id": user_id},
        {"$pull": {"investments": {"id": investment_id}}}
    )
    _recalculate_portfolio(db, user_id)
    return jsonify({"message": "Investment removed"})

@portfolio_bp.route("/update/<investment_id>", methods=["PUT"])
@jwt_required()
def update_investment(investment_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    db = current_app.db
    db.portfolios.update_one(
        {"user_id": user_id, "investments.id": investment_id},
        {"$set": {"investments.$.current_value": float(data.get("current_value", 0))}}
    )
    _recalculate_portfolio(db, user_id)
    return jsonify({"message": "Updated"})

def _recalculate_portfolio(db, user_id):
    portfolio = db.portfolios.find_one({"user_id": user_id})
    if not portfolio:
        return
    investments = portfolio.get("investments", [])
    total_invested = sum(i.get("invested_amount", 0) for i in investments)
    total_value = sum(i.get("current_value", 0) for i in investments)
    gain = total_value - total_invested
    gain_pct = (gain / total_invested * 100) if total_invested > 0 else 0
    db.portfolios.update_one(
        {"user_id": user_id},
        {"$set": {"total_invested": total_invested, "total_value": total_value, "total_gain": gain, "gain_pct": round(gain_pct, 2)}}
    )
