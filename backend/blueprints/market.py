from flask import Blueprint, jsonify, current_app
from flask_jwt_extended import jwt_required
from services.market_service import get_nifty_sensex, get_top_mutual_funds, get_market_sentiment, get_finance_news, get_stock_tickers

market_bp = Blueprint("market", __name__)

@market_bp.route("/indices", methods=["GET"])
def indices():
    api_key = current_app.config.get("ALPHA_VANTAGE_API_KEY", "")
    data = get_nifty_sensex(api_key)
    return jsonify(data)

@market_bp.route("/mutual-funds", methods=["GET"])
def mutual_funds():
    data = get_top_mutual_funds()
    return jsonify({"funds": data})

@market_bp.route("/sentiment", methods=["GET"])
def sentiment():
    data = get_market_sentiment()
    return jsonify(data)

@market_bp.route("/news", methods=["GET"])
def news():
    api_key = current_app.config.get("NEWS_API_KEY", "")
    data = get_finance_news(api_key)
    return jsonify({"articles": data})

@market_bp.route("/tickers", methods=["GET"])
def tickers():
    data = get_stock_tickers()
    return jsonify({"stocks": data})

@market_bp.route("/overview", methods=["GET"])
def overview():
    api_key = current_app.config.get("ALPHA_VANTAGE_API_KEY", "")
    news_key = current_app.config.get("NEWS_API_KEY", "")
    return jsonify({
        "indices": get_nifty_sensex(api_key),
        "sentiment": get_market_sentiment(),
        "tickers": get_stock_tickers()[:5],
        "top_funds": get_top_mutual_funds()[:3]
    })
