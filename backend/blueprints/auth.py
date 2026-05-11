from flask import Blueprint, request, jsonify
from services.auth_service import create_user, authenticate_user, generate_token
from flask_jwt_extended import get_jwt_identity, jwt_required
from bson import ObjectId
from flask import current_app

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not name or not email or not password:
        return jsonify({"error": "All fields required"}), 400
    if len(password) < 6:
        return jsonify({"error": "Password must be at least 6 characters"}), 400

    db = current_app.db
    user, error = create_user(db, email, password, name)
    if error:
        return jsonify({"error": error}), 409

    token = generate_token(str(user["_id"]))
    return jsonify({
        "message": "Account created successfully",
        "token": token,
        "user": {"id": str(user["_id"]), "name": user["name"], "email": user["email"], "onboarding_complete": False}
    }), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    db = current_app.db
    user, error = authenticate_user(db, email, password)
    if error:
        return jsonify({"error": error}), 401

    token = generate_token(str(user["_id"]))
    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "onboarding_complete": user.get("onboarding_complete", False),
            "financial_personality": user.get("financial_personality")
        }
    }), 200

@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    db = current_app.db
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "onboarding_complete": user.get("onboarding_complete", False),
        "financial_personality": user.get("financial_personality"),
        "profile": user.get("profile", {})
    }), 200
