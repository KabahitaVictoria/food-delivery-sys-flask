from flask import Blueprint, jsonify, request
from backend.addresses.model import Address, AddressSchema
from backend.users.model import User
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.db import db
import datetime

addresses = Blueprint('addresses', __name__, url_prefix='/addresses')

# ------------------------
# GET ALL ADDRESSES
@addresses.route('/', methods=['GET'])
def all_addresses():
    addresses = Address.query.all()
    address_schema = AddressSchema(many=True)
    output = address_schema.dump(addresses)
    return jsonify({'data': output}), 200

# ------------------------
# GET AN ADDRESS
@addresses.route('/address/<int:id>', methods=['GET'])
def get_an_address(id):
    address_to_get = Address.query.get(id)
    
    if address_to_get:
        return jsonify({'data': AddressSchema().dump(address_to_get)})
    else:
        return jsonify({'message': f'Address of id {id} not found'})
    
# ------------------------
# CREATE AN ADDRESS
@addresses.route('/create', methods=['POST'])
# @jwt_required()
def create_address():
    data = request.get_json()
    name = data['name']
    user_id = data['user_id']
    
    user = User.query.filter_by(id=user_id).first_or_404()
    
    if not name:
        return jsonify({'error':"Please provide an address name"})
    
    if User.query.filter_by(id=user_id).first() is None:
            return jsonify({'error': "This user id does not exist"}), 404 
    
    if Address.query.filter_by(name=name).first() is not None:
            return jsonify({'error': "This address already exists"}), 409
        
    address = Address(name=name, created_at=datetime.datetime.utcnow(), user_id=user_id, user_name=user.name)
    
    db.session.add(address)
    db.session.commit()
    
    return jsonify({'message': f'A new address has been created successfully', 'data': AddressSchema().dump(address)}),201
    
# ------------------------
# DELETE AN ADDRESS
@addresses.route('/address/delete/<int:id>', methods=['DELETE'])
# @jwt_required()
def delete_address(id):
    address_to_delete = Address.query.get(id)
    
    if request.method == 'DELETE':
        try:
            db.session.delete(address_to_delete)
            db.session.commit()
            return jsonify({'message': 'Address deleted successfully'}), 200
        except:
            return jsonify({'message': f'Address of id {id} not found'}), 404
        
# ------------------------
# UPDATE ADDRESS
@addresses.route('/address/update/<int:id>', methods=['GET', 'PUT'])
def update_address(id):
    address_to_update = Address.query.get(id)
    data = request.get_json()
    
    if request.method == 'GET':
        return jsonify({'data': AddressSchema().dump(address_to_update)})
    
    elif request.method == 'PUT':
        address_to_update.name = data['name']
        address_to_update.updated_at = datetime.datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({'message': f'address of id {id} updated successfully' ,'data': AddressSchema().dump(address_to_update)}),200