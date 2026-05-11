import os
import json
import random
from flask import current_app

SYSTEM_PROMPT = """You are FinSage AI, a certified Indian financial advisor for beginner investors.
- Explain in simple, friendly language
- Use INR (₹) and Indian instruments: Mutual Funds, SIPs, PPF, EPF, NPS, FD, ELSS, NIFTY, SENSEX
- Be warm, encouraging, and motivating
- Give specific actionable advice based on user profile"""

# ---------------------------------------------------------------------------
# Smart local fallback (works with zero API keys)
# ---------------------------------------------------------------------------
_LOCAL_RESPONSES = {
    "sip": "💡 SIP (Systematic Investment Plan) is like a recurring deposit but in mutual funds! Start with ₹500/month in a large-cap index fund. Over 10 years at 12% returns, ₹5,000/month becomes ~₹11.6 Lakhs. The magic is compounding — your returns earn returns! 🚀",
    "mutual fund": "📚 A mutual fund pools money from thousands of investors and a professional fund manager invests it in stocks/bonds. For beginners, I recommend: 1) Nifty 50 Index Fund (low cost, diversified) 2) Start with ₹1,000/month SIP 3) Choose Direct plans to save on commission.",
    "emergency": "🛡️ Emergency fund = your financial shield! Rule: Keep 6 months of expenses in a liquid fund or savings account. Example: If monthly expenses = ₹30,000, target ₹1.8 Lakhs. Start small — even ₹5,000/month in a liquid fund works. Never invest this in stocks!",
    "tax": "💰 Tax saving options under Section 80C (up to ₹1.5L deduction): 1) ELSS Mutual Funds — best returns + 3yr lock-in 2) PPF — safest, 15yr lock-in 3) EPF — employer contribution bonus. I recommend ELSS for young investors — historically 12-15% returns vs FD's 7%.",
    "stock": "📈 For beginners, directly picking stocks is risky. Instead: Start with Nifty 50 Index Fund (owns top 50 companies automatically). Once comfortable, allocate max 10% to individual stocks. Always research before buying — check P/E ratio, debt levels, and revenue growth.",
    "portfolio": "🎯 Ideal beginner portfolio: 60% Large-cap equity (Nifty 50 index) + 20% Debt fund (stability) + 20% Gold ETF (inflation hedge). As you grow, add mid-cap funds. Rebalance annually. At ₹5,000/month: ₹3,000 equity + ₹1,000 debt + ₹1,000 gold.",
    "ppf": "🏦 PPF (Public Provident Fund): Government-backed, tax-free returns at ~7.1% p.a., 15-year lock-in, max ₹1.5L/year. Perfect for conservative investors and tax saving. Open at any post office or bank. Great for children's education corpus!",
    "nps": "🎯 NPS (National Pension System): Market-linked pension, additional ₹50,000 tax deduction under 80CCD(1B). Choose Auto mode — it shifts equity to bonds as you age. Returns: 10-12% historically. Matures at 60, 40% can be withdrawn tax-free.",
    "gold": "✨ Gold as investment: Max 10% of portfolio. Best via Gold ETFs or Sovereign Gold Bonds (SGBs). SGBs pay 2.5% annual interest + gold appreciation + tax-free if held till maturity (8 years). Avoid physical gold — making charges eat returns.",
    "inflation": "📊 Inflation at 6% means ₹1 lakh today = ₹74,000 in 5 years! That's why keeping money in savings account (3.5%) loses value. Equity mutual funds historically beat inflation with 12-15% returns. Always invest in inflation-beating assets.",
    "invest": "🌟 Getting started is the best thing you can do! Step 1: Build 3-month emergency fund. Step 2: Get term insurance (10x annual income). Step 3: Start SIP in Nifty 50 index fund with whatever you can — even ₹500/month. Step 4: Increase by 10% every year.",
    "elss": "💎 ELSS (Equity Linked Savings Scheme): Tax-saving mutual fund under 80C. Only 3-year lock-in (shortest among 80C options). Historically returns 12-15%. Top funds: Mirae Asset Tax Saver, Axis Long Term Equity. Invest before March 31 for current year tax benefit.",
    "fd": "🏦 Fixed Deposits give 6.5-7.5% returns but are taxable. Better alternatives: 1) Liquid funds (7-8%, more flexible) 2) ELSS (12%+, tax-saving) 3) Debt mutual funds (8-9%, tax-efficient). FDs only make sense for capital preservation or short-term (< 1 year).",
    "lakh": "💡 With ₹1 Lakh to invest: ₹30,000 → Emergency fund (liquid fund) ₹40,000 → Large-cap index fund (Nifty 50) ₹20,000 → ELSS for tax saving ₹10,000 → Gold ETF. This gives diversification, tax benefit, and growth potential. Invest via lump sum + start monthly SIP!",
    "risk": "⚖️ Your risk profile matters! Conservative (< 3yr): 80% debt + 20% equity. Balanced (3-7yr): 50% equity + 50% debt. Aggressive (> 7yr): 80% equity + 20% debt. Young age + longer horizon = more equity = more wealth. Time in market > timing the market!",
    "retire": "🎯 Retirement planning: Use NPS + PPF + equity mutual funds. Rule of thumb: Need corpus = 25x annual expenses. ₹5 lakh/year expenses → ₹1.25 crore target. Starting at 25 with ₹10,000/month at 12% = ₹3.5 crore by 60! Start early, retire rich.",
    "crash": "📉 Market crashes are normal! 2008, 2020 — markets always recovered. During crash: 1) Don't panic sell 2) Continue SIPs — you buy more units cheap 3) Consider increasing SIP amount 4) Hold quality stocks. Nifty 50 has never failed to recover. Patience = profits.",
}

def _get_local_response(message: str, profile: dict = None) -> str:
    msg_lower = message.lower()
    for keyword, response in _LOCAL_RESPONSES.items():
        if keyword in msg_lower:
            return response
    # Generic fallback
    surplus = 0
    if profile:
        surplus = profile.get("income", 0) - profile.get("expenses", 0) - profile.get("emi", 0)
    if surplus > 0:
        return f"💬 Great question! Based on your monthly surplus of ₹{surplus:,.0f}, I recommend starting a SIP of ₹{min(surplus * 0.3, 10000):,.0f}/month in a diversified equity fund. For personalized advice, try asking me about: SIP, mutual funds, tax saving, emergency fund, or retirement planning."
    return "💬 I'm your FinSage AI advisor! Ask me about: SIP, mutual funds, tax saving (ELSS/PPF), emergency funds, stock market basics, portfolio building, retirement planning, or 'what to do with ₹X'. I'm here to make investing simple and beginner-friendly! 🇮🇳"

def _try_gemini(messages: list, system: str, api_key: str) -> str | None:
    try:
        import google.generativeai as genai
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-1.5-flash", system_instruction=system)
        history = []
        for m in messages[:-1]:
            history.append({"role": "user" if m["role"] == "user" else "model", "parts": [m["content"]]})
        chat = model.start_chat(history=history)
        response = chat.send_message(messages[-1]["content"])
        return response.text
    except Exception:
        return None

def _try_openai(messages: list, system: str, api_key: str) -> str | None:
    try:
        import openai
        client = openai.OpenAI(api_key=api_key)
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "system", "content": system}] + messages,
            temperature=0.7,
            max_tokens=1500
        )
        return response.choices[0].message.content
    except Exception:
        return None

def _build_system(profile: dict = None) -> str:
    system = SYSTEM_PROMPT
    if profile:
        system += f"\n\nUser Profile: Age={profile.get('age')}, Income=₹{profile.get('income')}, Risk={profile.get('risk_appetite')}, Goals={profile.get('goals')}"
    return system

def get_ai_response(messages: list, user_profile: dict = None) -> str:
    system = _build_system(user_profile)
    openai_key = current_app.config.get("OPENAI_API_KEY", "")
    gemini_key = current_app.config.get("GEMINI_API_KEY", "")

    if openai_key:
        result = _try_openai(messages, system, openai_key)
        if result:
            return result

    if gemini_key:
        result = _try_gemini(messages, system, gemini_key)
        if result:
            return result

    # Smart local fallback
    last_msg = messages[-1]["content"] if messages else ""
    return _get_local_response(last_msg, user_profile)

def stream_ai_response(messages: list, user_profile: dict = None):
    response = get_ai_response(messages, user_profile)
    # Stream word by word for effect
    import json
    words = response.split(" ")
    for i, word in enumerate(words):
        chunk = word + (" " if i < len(words) - 1 else "")
        yield f"data: {json.dumps({'content': chunk})}\n\n"
    yield "data: [DONE]\n\n"

def generate_investment_plan(profile: dict) -> dict:
    openai_key = current_app.config.get("OPENAI_API_KEY", "")
    gemini_key = current_app.config.get("GEMINI_API_KEY", "")

    income = float(profile.get("income", 50000))
    expenses = float(profile.get("expenses", 30000))
    emi = float(profile.get("emi", 0))
    risk = profile.get("risk_appetite", "Moderate")
    goals = profile.get("goals", [])

    surplus = income - expenses - emi

    if openai_key or gemini_key:
        prompt = f"""Create a detailed personalized investment plan JSON for:
Age: {profile.get('age')}, Income: ₹{income}, Expenses: ₹{expenses}, EMI: ₹{emi},
Risk: {risk}, Goals: {goals}, Timeline: {profile.get('timeline')} years.

Return JSON with: monthly_surplus, emergency_fund_target, emergency_fund_months, financial_health_score (0-100),
financial_personality (Conservative|Balanced|Aggressive), allocations (array of fund recommendations),
tax_saving_tips, monthly_plan, long_term_strategy, warnings, quick_wins."""

        messages = [{"role": "user", "content": prompt}]
        system = SYSTEM_PROMPT + "\nRespond ONLY with valid JSON, no markdown."

        result = None
        if openai_key:
            result = _try_openai(messages, system, openai_key)
        if not result and gemini_key:
            result = _try_gemini(messages, system, gemini_key)
        if result:
            try:
                clean = result.strip().lstrip("```json").lstrip("```").rstrip("```").strip()
                return json.loads(clean)
            except Exception:
                pass

    # Local plan generation
    return _generate_local_plan(profile, surplus, risk, goals)

def _generate_local_plan(profile, surplus, risk, goals):
    income = float(profile.get("income", 50000))
    expenses = float(profile.get("expenses", 30000))
    emi = float(profile.get("emi", 0))
    timeline = int(profile.get("timeline", 5))
    emergency = float(profile.get("emergency_fund", 0))

    surplus = max(0, income - expenses - emi)
    ef_target = expenses * 6
    ef_months = (emergency / expenses) if expenses > 0 else 0

    # Allocation based on risk
    if risk == "High":
        personality = "Aggressive"
        allocs = [
            {"name": "Nifty 50 Index Fund", "category": "Mutual Fund", "percentage": 40, "risk_level": "Medium", "expected_return": "11-13%", "time_horizon": f"{timeline} years", "why": "Core large-cap holding tracking India's top 50 companies. Low cost, diversified."},
            {"name": "Parag Parikh Flexi Cap Fund", "category": "Mutual Fund", "percentage": 25, "risk_level": "High", "expected_return": "13-16%", "time_horizon": f"{timeline} years", "why": "International diversification + Indian growth. One of India's most trusted funds."},
            {"name": "SBI Small Cap Fund", "category": "Mutual Fund", "percentage": 20, "risk_level": "High", "expected_return": "15-18%", "time_horizon": "7+ years", "why": "High growth potential from small companies. Long-term wealth creator."},
            {"name": "ELSS Tax Saver Fund", "category": "Mutual Fund", "percentage": 10, "risk_level": "Medium", "expected_return": "12-14%", "time_horizon": "3+ years", "why": "Saves up to ₹46,800 tax under Section 80C with growth potential."},
            {"name": "Liquid Fund", "category": "Mutual Fund", "percentage": 5, "risk_level": "Low", "expected_return": "6-7%", "time_horizon": "Any", "why": "Emergency reserve and parking funds before deployment."},
        ]
    elif risk == "Low":
        personality = "Conservative"
        allocs = [
            {"name": "PPF (Public Provident Fund)", "category": "PPF", "percentage": 35, "risk_level": "Low", "expected_return": "7-7.5%", "time_horizon": "15 years", "why": "Government-guaranteed, tax-free returns. Perfect safe foundation."},
            {"name": "SBI Liquid Fund", "category": "Mutual Fund", "percentage": 25, "risk_level": "Low", "expected_return": "6-7%", "time_horizon": "Any", "why": "Better than savings account, instant redemption, capital protection."},
            {"name": "HDFC Short Duration Debt Fund", "category": "Mutual Fund", "percentage": 25, "risk_level": "Low", "expected_return": "7-8%", "time_horizon": "2-3 years", "why": "Stable returns from quality bonds, tax-efficient versus FD."},
            {"name": "ELSS Tax Saver Fund", "category": "Mutual Fund", "percentage": 10, "risk_level": "Medium", "expected_return": "11-13%", "time_horizon": "3+ years", "why": "Small equity exposure for long-term growth + tax saving."},
            {"name": "Gold ETF", "category": "Gold", "percentage": 5, "risk_level": "Medium", "expected_return": "8-10%", "time_horizon": f"{timeline} years", "why": "Inflation hedge and safe haven. 5% allocation recommended."},
        ]
    else:
        personality = "Balanced"
        allocs = [
            {"name": "Nifty 50 Index Fund", "category": "Mutual Fund", "percentage": 35, "risk_level": "Medium", "expected_return": "11-13%", "time_horizon": f"{timeline} years", "why": "Core equity holding. Captures India's economic growth at lowest cost."},
            {"name": "Mirae Asset Large Cap Fund", "category": "Mutual Fund", "percentage": 20, "risk_level": "Medium", "expected_return": "12-14%", "time_horizon": "5+ years", "why": "Top-rated large-cap fund with consistent performance and experienced management."},
            {"name": "HDFC Balanced Advantage Fund", "category": "Mutual Fund", "percentage": 20, "risk_level": "Medium", "expected_return": "10-12%", "time_horizon": "3+ years", "why": "Dynamic allocation between equity and debt. Perfect for balanced investors."},
            {"name": "ELSS Tax Saver Fund", "category": "Mutual Fund", "percentage": 15, "risk_level": "Medium", "expected_return": "12-14%", "time_horizon": "3+ years", "why": "Tax saving + equity returns. Mandatory for efficient tax planning."},
            {"name": "Gold ETF", "category": "Gold", "percentage": 5, "risk_level": "Medium", "expected_return": "8-10%", "time_horizon": f"{timeline} years", "why": "Portfolio hedge against market crashes and inflation."},
            {"name": "Liquid Fund", "category": "Mutual Fund", "percentage": 5, "risk_level": "Low", "expected_return": "6-7%", "time_horizon": "Any", "why": "Emergency buffer, better than keeping cash idle in savings."},
        ]

    for a in allocs:
        a["monthly_amount"] = round(surplus * a["percentage"] / 100, 0)

    health_score = min(95, max(30, int(((surplus / income) * 40) + (ef_months / 6 * 30) + 20)))

    return {
        "monthly_surplus": round(surplus, 0),
        "emergency_fund_target": round(ef_target, 0),
        "emergency_fund_months": round(ef_months, 1),
        "financial_health_score": health_score,
        "financial_personality": personality,
        "allocations": allocs,
        "tax_saving_tips": [
            f"Invest ₹{min(surplus * 0.3, 12500):,.0f}/month in ELSS to maximize ₹1.5L Section 80C limit",
            "Open NPS account for extra ₹50,000 deduction under 80CCD(1B)",
            "Use HRA exemption if renting — can save ₹50,000-₹1,00,000 in taxes",
            "Claim LTA exemption for travel expenses twice in a 4-year block"
        ],
        "monthly_plan": f"Invest ₹{surplus * 0.7:,.0f} (70% of surplus ₹{surplus:,.0f}) across the recommended funds via SIP on the 1st of every month. Keep ₹{surplus * 0.3:,.0f} for discretionary spending and emergency top-up.",
        "long_term_strategy": f"With ₹{surplus:,.0f}/month invested at expected returns, you could build ₹{surplus * 12 * timeline * 1.5:,.0f}+ in {timeline} years. Increase SIP by 10% every year (step-up SIP) to accelerate wealth creation significantly.",
        "warnings": [
            "Never invest money you need within 1 year in equity mutual funds",
            "Don't stop SIPs during market corrections — this is when you get the most units!",
            f"Build emergency fund of ₹{ef_target:,.0f} before aggressive investing"
        ],
        "quick_wins": [
            "Start your first SIP today — even ₹500/month in Nifty 50 index fund",
            f"Open PPF account at your bank — deposit ₹{min(surplus * 0.2, 12500):,.0f}/month",
            "Download CAMS/KFin app to track all mutual funds in one place",
            "Enable auto-pay for SIPs so you never miss an instalment"
        ]
    }
