from flask import jsonify, request, Blueprint 
from backend.users.model import User, UserSchema
from backend.db import db
import datetime
from flask_jwt_extended import jwt_required

users = Blueprint('users', __name__, url_prefix='/users')

# ------------------------
# GET ALL USERS
@users.route("/")
# @jwt_required()
def get_all_users():
    users= User.query.all()
    user_schema = UserSchema(many=True)
    output = user_schema.dump(users)
    return jsonify({'data': output}), 200

# ------------------------
# GET A USER
@users.route('/user/<int:id>', methods=['GET'])
@jwt_required()
def get_user(id):
    user_to_get = User.query.get(id)
    
    if user_to_get:
        return jsonify({'data': UserSchema().dump(user_to_get)})
    else:
        return jsonify({'message': f'User of id {id} not found'})
    
# ------------------------
# PROMOTE USER TO ADMIN POSITION
@users.route('/user/<int:id>', methods=['PUT'])
@jwt_required()
def promote_user(id):
    user_to_promote = User.query.get(id)
    
    if user_to_promote:
        user_to_promote.user_type = "admin"
        db.session.commit()
        return jsonify({'message': 'The user has been promoted', 'data': UserSchema().dump(user_to_promote)})
        
    else:
        return jsonify({'message': f'User of id {id} not found'})

# ------------------------
# DELETE USER
@users.route('/user/delete/<int:id>', methods=['DELETE'])
# @jwt_required()
def delete_user(id):
    user_to_delete = User.query.filter_by(id=id).first()
    
    if request.method == 'DELETE':
        try:
            db.session.delete(user_to_delete)
            db.session.commit()
            return jsonify({'message': 'User deleted successfully'}), 200
        except:
            return jsonify({'message': f'User of id {id} not found'}),404
            
# ------------------------
# UPDATE USER
@users.route('/user/update/<int:id>', methods=['GET', 'PUT'])
@jwt_required()
def update_user(id):
    user_to_update = User.query.get(id)
    data = request.get_json()
    
    if request.method == 'GET':
        return jsonify({'data': UserSchema().dump(user_to_update)})
    
    elif request.method == 'PUT':
        user_to_update.name = data['name']
        user_to_update.email = data['email']
        user_to_update.contact = data['contact']
        user_to_update.user_type = data['user_type']
        user_to_update.password = data['password']
        user_to_update.updated_at = datetime.datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({'message': f'user of id {id} updated successfully' ,'data': UserSchema().dump(user_to_update)})