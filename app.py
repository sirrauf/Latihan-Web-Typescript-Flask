from flask import Flask, request, jsonify, render_template
from models import User, db
from pony.orm import db_session, select

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/register", methods=["POST"])
@db_session
def register():
    data = request.json
    if User.get(email=data['email']):
        return jsonify({"status": "fail", "message": "Email already exists"}), 400
    User(
        full_name=data['full_name'],
        address=data['address'],
        email=data['email'],
        password=data['password'],
        role=data['role']
    )
    return jsonify({"status": "success", "message": "User registered successfully"})

@app.route("/api/login", methods=["POST"])
@db_session
def login():
    data = request.json
    user = User.get(email=data['email'], password=data['password'])
    if user:
        return jsonify({
            "status": "success",
            "user": {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email,
                "role": user.role
            }
        })
    return jsonify({"status": "fail", "message": "Invalid credentials"}), 401

@app.route("/api/switch_role", methods=["POST"])
@db_session
def switch_role():
    data = request.json
    user = User.get(id=data["id"])
    if user:
        user.role = "Admin" if user.role == "User" else "User"
        return jsonify({"status": "success", "new_role": user.role})
    return jsonify({"status": "fail"}), 404

if __name__ == "__main__":
    app.run(debug=True)
