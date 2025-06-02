from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.secret_key = '12345678'

    CORS(app)
    
    from application.server.auth import auth_bp
    
    app.register_blueprint(auth_bp)


    return app
