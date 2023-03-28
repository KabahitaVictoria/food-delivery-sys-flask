from flask import jsonify, Blueprint, request
from backend.districts.model import District, DistrictSchema
from backend.users.model import User
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.db import db
import datetime

districts = Blueprint('districts', __name__, url_prefix='/districts')

# ------------------------
# GET ALL DISTRICTS
@districts.route('/')
# @jwt_required()
def get_all_districts():
        districts = District.query.all()
        district_schema = DistrictSchema(many=True)
        output = district_schema.dump(districts)
        return jsonify({'data': output})
    
# ------------------------
# GET A DISTRICT
@districts.route('/district/<int:id>')
# @jwt_required()
def get_a_district(id):
    district_to_get = District.query.get(id)
    
    if district_to_get:
        return jsonify({'data': DistrictSchema().dump(district_to_get)}), 200
    else:
        return jsonify({'message': f'District of id {id} not found'}), 404
    
# ------------------------
# CREATE A DISTRICT
@districts.route('/create', methods=['POST'])
@jwt_required()
def create_region():
    data = request.get_json()
    name = data['name']
    
    if not name:
        return jsonify({'error':"Please provide a district name"})
    
    if District.query.filter_by(name=name).first() is not None:
            return jsonify({'error': "This district already exists"}), 409
        
    district = District(name=name, created_at=datetime.datetime.utcnow(), created_by=get_jwt_identity())
    
    db.session.add(district)
    db.session.commit()
    
    return jsonify({'message': f'A new district has been created successfully', 'data': DistrictSchema().dump(district)}),201
    
# ------------------------
# DELETE A DISTRICT
@districts.route('/district/delete/<int:id>', methods=['DELETE'])
# @jwt_required()
def delete_region(id):
    district_to_delete = District.query.get(id)
    
    if request.method == 'DELETE':
        try:
            db.session.delete(district_to_delete)
            db.session.commit()
            return jsonify({'message': 'District deleted successfully'}), 200
        except:
            return jsonify({'message': f'District of id {id} not found'}), 404
        
# ------------------------
# UPDATE DISTRICT
@districts.route('/district/update/<int:id>', methods=['GET', 'PUT'])
def update_district(id):
    district_to_update = District.query.get(id)
    data = request.get_json()
    
    if request.method == 'GET':
        return jsonify({'data': DistrictSchema().dump(district_to_update)})
    
    elif request.method == 'PUT':
        district_to_update.name = data['name']
        district_to_update.updated_at = datetime.datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({'message': f'user of id {id} updated successfully' ,'data': DistrictSchema().dump(district_to_update)})