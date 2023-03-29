from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, unset_jwt_cookies
from werkzeug.security import generate_password_hash, check_password_hash
from backend.users.model import User, UserSchema
from backend.addresses.model import Address, AddressSchema
from backend.db import db
import datetime

auth = Blueprint('auth', __name__, url_prefix='/auth')

# ------------------------
# ADD NEW USER
@auth.route('/register', methods=['GET', 'POST'])
def create_user():
    data = request.get_json()
    
    if request.method == "POST":
        first_name = data['firstName']
        last_name = data['lastName']
        email = data['email']
        contact = data['contact']
        password = data['password']
        
        if not first_name:
                return jsonify({'error':"Please provide your first name"})
            
        elif not last_name:
                return jsonify({'error':"Please provide your last name"})
        
        elif not email:
                return jsonify({'error':"Please provide your email address"})
        
        elif not contact:
                return jsonify({'error':"Please provide your contact"})
        
        elif len(password) < 6:
                return jsonify({'error': "Your password is too short"}), 400

        elif User.query.filter_by(email=email).first() is not None:
            return jsonify({'error': "This email is already in use"}), 409 

        
        elif User.query.filter_by(contact=contact).first() is not None:
            return jsonify({'error': "This phone number is already in use"}), 409
        
        hashed_pw = generate_password_hash(password, 'sha256')
        user = User(first_name=first_name,
                    last_name=last_name,
                    email=email,
                    contact=contact,
                    password=hashed_pw,
                    created_at=datetime.datetime.utcnow())
        
        #add and save user to database
        db.session.add(user)
        db.session.commit()
        return jsonify({'message':'Successful sign up! Please log in!', 'data': UserSchema().dump(user)}),201
    
    elif request.method == "GET":
        users= User.query.all()
        user_schema = UserSchema(many=True)
        output = user_schema.dump(users)
        return jsonify({'data': output}), 200
    
# ------------------------
# USER LOGIN
@auth.route('/login', methods=['POST'])
def login_user():
    email = request.json.get("email", '') # default value so app doesn't crash
    password = request.json.get("password", '')
    
    #check if user exists
    user = User.query.filter_by(email=email).first()
    
    if user:
        check_password = check_password_hash(user.password, password)
        
        if check_password:
            refresh = create_refresh_token(identity=user.id)
            access = create_access_token(identity=user.id)
            return jsonify({'tokens': {
                'refresh_token': refresh,
                'access_token': access
            }, 'for': {
                'email': email,
                'id': user.id
            }})
        else:
            jsonify({'error': 'password is incorrect, please try again'}), 401
        
    else:
        return jsonify({'error': 'email entered does not exist. Please sign up!'}), 401
    
# ------------------------
# REFRESH ACCESS TOKEN
@auth.route('/token/refresh', methods=['GET'])
@jwt_required(refresh=True)
def get_refresh_token():
    identity = get_jwt_identity()
    access = create_access_token(identity=identity)
    
    return jsonify({'new_access_token': access})

# USER LOGOUT
@auth.route("/logout", methods=['POST'])
def logout():
    response = jsonify({"message": "Logout successful"})
    unset_jwt_cookies(response)
    return response
    
@auth.route("/check")
def check():
    return jsonify({'message': 'success'})