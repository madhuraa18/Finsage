import bcrypt
from flask import current_app
from flask_jwt_extended import create_access_token
from bson import ObjectId
from datetime import datetime

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), hashed.encode("utf-8"))

def create_user(db, email: str, password: str, name: str) -> dict:
    existing = db.users.find_one({"email": email})
    if existing:
        return None, "Email already registered"

    user = {
        "email": email,
        "password": hash_password(password),
        "name": name,
        "created_at": datetime.utcnow(),
        "onboarding_complete": False,
        "profile": {},
        "avatar": None,
        "financial_personality": None
    }
    result = db.users.insert_one(user)
    user["_id"] = str(result.inserted_id)
    return user, None

def authenticate_user(db, email: str, password: str) -> dict:
    user = db.users.find_one({"email": email})
    if not user:
        return None, "User not found"
    if not verify_password(password, user["password"]):
        return None, "Invalid password"
    return user, None

def generate_token(user_id: str) -> str:
    return create_access_token(identity=str(user_id))
