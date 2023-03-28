from flask import Flask
import os #read .env variables after loading with dot env
from dotenv import load_dotenv
from backend.db import db, ma
from flask_jwt_extended import JWTManager # set up jwt with our app 
from datetime import timedelta
from flask_cors import CORS

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config['JSON_SORT_KEYS'] = False
    app.app_context().push()

    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
    
    CORS(app=app)
    
    db.init_app(app)
    ma.init_app(app)
    
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    app.config["JWT_REQUEST_TOKEN_EXPIRES"] = timedelta(days=30)
    
    # for authentication
    JWTManager(app)
    
    # import models for Flask-Migrate to recognize
    from backend.users.model import User
    from backend.addresses.model import Address
    from backend.categories.model import Category
    from backend.districts.model import District
    from backend.food_items.model import FoodItem
    from backend.regions.model import Region
    from backend.orders.model import Order
    
    from backend.users.controller import users
    from backend.auth.controller import auth
    from backend.addresses.controller import addresses
    from backend.regions.controller import regions
    from backend.districts.controller import districts
    from backend.categories.controller import categories
    from backend.food_items.controller import food_items
    from backend.orders.controller import orders
    
    #registering blueprints    
    app.register_blueprint(users,url_prefix='/users')
    app.register_blueprint(auth,url_prefix='/auth')
    app.register_blueprint(addresses,url_prefix='/addresses')
    app.register_blueprint(regions,url_prefix='/regions')
    app.register_blueprint(districts,url_prefix='/districts')
    app.register_blueprint(categories,url_prefix='/categories')
    app.register_blueprint(food_items,url_prefix='/food_items')
    app.register_blueprint(orders,url_prefix='/orders')

    return app
