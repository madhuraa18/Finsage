from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from pymongo import MongoClient
import mongomock
from config import config
import os

# Global db reference
db = None

def create_app(config_name="default"):
    app = Flask(__name__)
    cfg = config[config_name]
    app.config.from_object(cfg)
    app.config["JWT_SECRET_KEY"] = cfg.JWT_SECRET_KEY
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = cfg.JWT_ACCESS_TOKEN_EXPIRES

    # Extensions
    CORS(app, resources={r"/api/*": {"origins": cfg.FRONTEND_URL}}, supports_credentials=True)
    JWTManager(app)

    # MongoDB
    global db
    try:
        client = MongoClient(cfg.MONGO_URI, serverSelectionTimeoutMS=2000)
        client.server_info()
        db = client.get_database("finsage")
        app.logger.info("Connected to MongoDB at %s", cfg.MONGO_URI)
    except Exception as err:
        app.logger.warning("MongoDB unavailable (%s); using in-memory fallback.", err)
        client = mongomock.MongoClient()
        db = client.get_database("finsage")
    app.db = db

    # Register Blueprints
    from blueprints.auth import auth_bp
    from blueprints.profile import profile_bp
    from blueprints.advisor import advisor_bp
    from blueprints.market import market_bp
    from blueprints.portfolio import portfolio_bp
    from blueprints.goals import goals_bp
    from blueprints.learn import learn_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(profile_bp, url_prefix="/api/profile")
    app.register_blueprint(advisor_bp, url_prefix="/api/advisor")
    app.register_blueprint(market_bp, url_prefix="/api/market")
    app.register_blueprint(portfolio_bp, url_prefix="/api/portfolio")
    app.register_blueprint(goals_bp, url_prefix="/api/goals")
    app.register_blueprint(learn_bp, url_prefix="/api/learn")

    @app.route("/api/health")
    def health():
        return {"status": "ok", "message": "FinSage API is running 🚀"}

    return app

if __name__ == "__main__":
    env = os.environ.get("FLASK_ENV", "development")
    app = create_app(env)
    app.run(debug=(env == "development"), port=5000)
