import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "finsage-secret-key")
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "finsage-jwt-secret")
    MONGO_URI = os.environ.get("MONGO_URI", "mongodb://localhost:27017/finsage")
    OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "")
    GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
    ALPHA_VANTAGE_API_KEY = os.environ.get("ALPHA_VANTAGE_API_KEY", "")
    TWELVE_DATA_API_KEY = os.environ.get("TWELVE_DATA_API_KEY", "")
    NEWS_API_KEY = os.environ.get("NEWS_API_KEY", "")
    FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:5173")
    JWT_ACCESS_TOKEN_EXPIRES = 86400  # 24 hours
    CACHE_TTL = 300  # 5 minutes

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig
}
