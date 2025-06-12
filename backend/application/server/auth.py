from flask import request, jsonify, Blueprint, render_template, session
from werkzeug.security import generate_password_hash, check_password_hash
from flask_mail import Message
from .db_config import get_connection
from application.__init__ import mail
import random
from datetime import datetime, timedelta


auth_bp = Blueprint('auth', __name__, template_folder='templates')

@auth_bp.route('/register', methods=['POST'])
def register():
    
    otp = random.randint(100000, 999999)
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
    session['otp'] = str(otp)
    session['otp_email'] = email
    session['user'] = email
    session['role'] = "user"
    session['otp_expiry'] = (datetime.utcnow() + timedelta(minutes=3)).timestamp()
    session['pending_users'] = {
        "name": name,
        "email": email,
        "password": hashed_password,
        "role": "user"
    }

    msg = Message(
        "Welcome to TaskTrackr!",
        recipients=[email]
    )
    msg.html = render_template('otp.html', email=email, otp=otp)
    msg.body = f"Hi {name},\n\nThank you for registering at our app!"
    mail.send(msg)
    
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

    cursor.execute("SELECT name, password, role FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()
    
    session["user"] = email
    session["role"] = user[2]
        
    cursor.close()
    conn.close()    

    if not user or not check_password_hash(user[1], password):
        return jsonify({"message": "Invalid credentials"}), 401

    return jsonify({
        "message": "Login successful",
        "success": True,
        "name": user[0]
    }), 200
    
@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message": "Logout successful"}), 200

@auth_bp.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.json
    otp = data['otp']
    
    stored_otp = session.get('otp')
    stored_email = session.get('otp_email')
    expiry_timestamp = session.get('otp_expiry')
    pending_users = session.get('pending_users')
    

    if not stored_otp or not stored_email or not expiry_timestamp:
        return jsonify({"message": "No OTP found or expired. Please request a new one."}), 400

    if stored_email != pending_users.get('email'):
        return jsonify({"message": "Email does not match OTP session data."}), 400

    if datetime.utcnow().timestamp() > expiry_timestamp:
        session.pop('otp', None)
        session.pop('otp_email', None)
        session.pop('otp_expiry', None)
        return jsonify({"message": "OTP expired. Please request a new one."}), 400

    if otp != stored_otp:
        return jsonify({"message": "Invalid OTP."}), 400
    
    
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
            (pending_users['name'], pending_users['email'], pending_users['password'])
        )
        conn.commit()
        cursor.close()
        conn.close()
    except Exception as e:
        print(f"Error inserting user into database: {e}")
        return jsonify({"message": "Error inserting user into database."}), 500
    
    session.pop('otp', None)
    session.pop('otp_email', None)
    session.pop('otp_expiry', None)
    session.pop('pending_users', None)

    return jsonify({"message": "OTP verified successfully.", "success": True}), 200
    
@auth_bp.route('/check-auth', methods=['GET'])
def check_auth():
    user = session.get('user')
    role = session.get('role')

    if not user or not role:
        return jsonify({"message": "User is not authenticated."}), 401

    return jsonify({
        "message": f"{role.capitalize()} is authenticated.",
        "user": user,
        "role": role
    }), 200

    

@auth_bp.route('/resend-otp', methods=['POST'])
def resend_otp():
    pass

@auth_bp.route('/get-email', methods=['GET'])
def get_email():
    email = session.get('user')
    return jsonify({"email": email}), 200