from flask import request, jsonify, Blueprint, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from flask_mail import Message
from .db_config import get_connection
from application.__init__ import mail

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    existing_user = cursor.fetchone()
    if existing_user:
        cursor.close()
        conn.close()
        return jsonify({"message": "Email already exists"}), 400

    hashed_password = generate_password_hash(password)
    cursor.execute(
        "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
        (name, email, hashed_password)
    )
    conn.commit()

    msg = Message(
        "Welcome to our app!",
        recipients=[email]
    )
    msg.body = f"Hi {name},\n\nThank you for registering at our app!"
    mail.send(msg)
    print(msg)
    
    cursor.close()
    conn.close()
    
    
    

    return jsonify({
        "message": "User registered successfully",
        "success": True,
        "name": name
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT name, password FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if not user or not check_password_hash(user[1], password):
        return jsonify({"message": "Invalid credentials"}), 401

    return jsonify({
        "message": "Login successful",
        "success": True,
        "name": user[0]
    }), 200