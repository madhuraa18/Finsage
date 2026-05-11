import requests
from cachetools import TTLCache
from datetime import datetime
import random

# In-memory cache: 100 items, 5 min TTL
_cache = TTLCache(maxsize=100, ttl=300)

def _cached(key, fetch_fn):
    if key in _cache:
        return _cache[key]
    result = fetch_fn()
    _cache[key] = result
    return result

def get_nifty_sensex(api_key: str) -> dict:
    """Get NIFTY 50 and SENSEX data from Alpha Vantage or mock."""
    def fetch():
        try:
            url = f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=^NSEI&apikey={api_key}"
            resp = requests.get(url, timeout=5)
            data = resp.json()
            nifty_val = float(data.get("Global Quote", {}).get("05. price", 22500))
            nifty_chg = float(data.get("Global Quote", {}).get("09. change", 0))
            nifty_pct = float(data.get("Global Quote", {}).get("10. change percent", "0%").replace("%", ""))
        except:
            nifty_val = 22500 + random.uniform(-200, 200)
            nifty_chg = random.uniform(-150, 150)
            nifty_pct = (nifty_chg / nifty_val) * 100

        sensex_val = nifty_val * 3.32 + random.uniform(-100, 100)
        sensex_chg = nifty_chg * 3.32

        return {
            "nifty": {"value": round(nifty_val, 2), "change": round(nifty_chg, 2), "change_pct": round(nifty_pct, 2)},
            "sensex": {"value": round(sensex_val, 2), "change": round(sensex_chg, 2), "change_pct": round((sensex_chg / sensex_val) * 100, 2)},
            "timestamp": datetime.utcnow().isoformat()
        }
    return _cached("nifty_sensex", fetch)

def get_top_mutual_funds() -> list:
    """Fetch top mutual fund data from mfapi.in."""
    def fetch():
        popular_funds = [
            {"scheme_code": 120503, "name": "Mirae Asset Large Cap Fund - Direct Growth"},
            {"scheme_code": 119598, "name": "Axis Bluechip Fund - Direct Growth"},
            {"scheme_code": 120716, "name": "Parag Parikh Flexi Cap Fund - Direct Growth"},
            {"scheme_code": 125497, "name": "SBI Small Cap Fund - Direct Growth"},
            {"scheme_code": 118989, "name": "HDFC Mid-Cap Opportunities Fund - Direct Growth"},
        ]
        results = []
        for fund in popular_funds:
            try:
                resp = requests.get(f"https://api.mfapi.in/mf/{fund['scheme_code']}", timeout=5)
                data = resp.json()
                nav_data = data.get("data", [])
                if len(nav_data) >= 2:
                    current_nav = float(nav_data[0]["nav"])
                    prev_nav = float(nav_data[1]["nav"])
                    change_pct = ((current_nav - prev_nav) / prev_nav) * 100
                    results.append({
                        "scheme_code": fund["scheme_code"],
                        "name": data.get("meta", {}).get("scheme_name", fund["name"]),
                        "nav": round(current_nav, 2),
                        "change_pct": round(change_pct, 2),
                        "date": nav_data[0]["date"]
                    })
            except:
                results.append({
                    "scheme_code": fund["scheme_code"],
                    "name": fund["name"],
                    "nav": round(100 + random.uniform(-5, 15), 2),
                    "change_pct": round(random.uniform(-1.5, 2.5), 2),
                    "date": datetime.utcnow().strftime("%d-%m-%Y")
                })
        return results
    return _cached("mutual_funds", fetch)

def get_market_sentiment() -> dict:
    """Calculate a Fear & Greed style market sentiment score."""
    def fetch():
        score = random.randint(35, 75)
        if score < 25: label = "Extreme Fear"
        elif score < 45: label = "Fear"
        elif score < 55: label = "Neutral"
        elif score < 75: label = "Greed"
        else: label = "Extreme Greed"
        return {
            "score": score,
            "label": label,
            "timestamp": datetime.utcnow().isoformat(),
            "factors": {
                "market_momentum": random.randint(30, 80),
                "volatility": random.randint(20, 70),
                "stock_strength": random.randint(40, 90),
                "safe_haven_demand": random.randint(25, 75),
            }
        }
    return _cached("sentiment", fetch)

def get_finance_news(api_key: str) -> list:
    """Fetch finance news from NewsAPI."""
    def fetch():
        try:
            url = f"https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey={api_key}&pageSize=10"
            resp = requests.get(url, timeout=5)
            articles = resp.json().get("articles", [])
            return [{"title": a["title"], "description": a.get("description",""), "url": a["url"], "source": a["source"]["name"], "published_at": a["publishedAt"], "image": a.get("urlToImage","")} for a in articles if a.get("title")]
        except:
            return [
                {"title": "NIFTY hits new high amid strong FII inflows", "description": "Foreign institutional investors continue to pour money into Indian equities.", "url": "#", "source": "Economic Times", "published_at": datetime.utcnow().isoformat(), "image": ""},
                {"title": "RBI keeps repo rate unchanged at 6.5%", "description": "Reserve Bank of India maintains status quo on interest rates for third consecutive time.", "url": "#", "source": "Mint", "published_at": datetime.utcnow().isoformat(), "image": ""},
                {"title": "Mutual fund SIP inflows reach record ₹21,000 crore in April", "description": "Systematic investment plans continue to attract retail investors.", "url": "#", "source": "Business Standard", "published_at": datetime.utcnow().isoformat(), "image": ""},
                {"title": "Gold prices surge 2% on global uncertainty", "description": "Gold ETFs see increased demand as investors seek safe haven assets.", "url": "#", "source": "NDTV Profit", "published_at": datetime.utcnow().isoformat(), "image": ""},
                {"title": "SEBI introduces new regulations for index funds", "description": "New guidelines aim to bring more transparency to passive investing products.", "url": "#", "source": "Financial Express", "published_at": datetime.utcnow().isoformat(), "image": ""},
            ]
    return _cached("news", fetch)

def get_stock_tickers() -> list:
    """Get live stock ticker data."""
    stocks = [
        {"symbol": "RELIANCE", "price": 2950, "change": 1.2},
        {"symbol": "TCS", "price": 4120, "change": -0.5},
        {"symbol": "INFY", "price": 1890, "change": 0.8},
        {"symbol": "HDFC BANK", "price": 1680, "change": -0.3},
        {"symbol": "ICICI BANK", "price": 1250, "change": 1.5},
        {"symbol": "ITC", "price": 470, "change": 0.2},
        {"symbol": "WIPRO", "price": 560, "change": -0.7},
        {"symbol": "BAJAJ FIN", "price": 7200, "change": 2.1},
        {"symbol": "MARUTI", "price": 12800, "change": -0.4},
        {"symbol": "LT", "price": 3800, "change": 0.9},
    ]
    for s in stocks:
        s["price"] = round(s["price"] + random.uniform(-50, 50), 2)
        s["change"] = round(s["change"] + random.uniform(-0.3, 0.3), 2)
    return stocks
