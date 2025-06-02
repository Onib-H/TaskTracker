from flask import Flask
from flask_cors import CORS
from flask_mail import Mail
from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables

mail = Mail()

def create_app():
    app = Flask(__name__)

    app.secret_key = os.getenv('SECRET_KEY')
    app.config["MAIL_SERVER"] = "smtp.gmail.com"
    app.config["MAIL_PORT"] = 587
    app.config["MAIL_USE_TLS"] = True
    app.config["MAIL_USE_SSL"] = False
    app.config["MAIL_USERNAME"] = os.getenv("GMAIL_USERNAME")
    app.config["MAIL_PASSWORD"] = os.getenv("GMAIL_PASSWORD")
    app.config["MAIL_DEFAULT_SENDER"] = os.getenv("GMAIL_USERNAME")
    
    
    mail.init_app(app)
    CORS(app)
    
    from application.server.auth import auth_bp
    app.register_blueprint(auth_bp)

    return app