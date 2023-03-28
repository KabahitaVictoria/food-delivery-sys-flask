from flask import jsonify, Blueprint, request
from backend.regions.model import Region, RegionSchema
from backend.users.model import User
from flask_jwt_extended import jwt_required, get_jwt_identity
import datetime
from backend.db import db

regions = Blueprint('regions', __name__, url_prefix='/regions')

# ------------------------
# GET ALL REGIONS
@regions.route('/')
@jwt_required()
def get_all_regions():
    regions = Region.query.all()
    region_schema = RegionSchema(many=True)
    output = region_schema.dump(regions)
    return jsonify({'data': output}), 200

# ------------------------
# GET A REGION
@regions.route('/region/<int:id>', methods=['GET'])
@jwt_required()
def get_region(id):
    region_to_get = Region.query.get(id)
    
    if region_to_get:
        return jsonify({'data': RegionSchema().dump(region_to_get)}), 200
    else:
        return jsonify({'message': f'Region of id {id} not found'}), 404

# ------------------------
# CREATE A REGION
@regions.route('/create', methods=['POST'])
@jwt_required()
def create_region():
    data = request.get_json()
    name = data['name']
    
    if not name:
        return jsonify({'error':"Please provide a region name"})
    
    if Region.query.filter_by(name=name).first() is not None:
            return jsonify({'error': "This region already exists"}), 409
        
    region = Region(name=name, created_at = datetime.datetime.utcnow(), created_by=get_jwt_identity())
    
    db.session.add(region)
    db.session.commit()
    
    return jsonify({'message': f'A new region has been created successfully', 'data': RegionSchema().dump(region)}),201
    
# ------------------------
# DELETE A REGION
@regions.route('/region/delete/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_region(id):
    region_to_delete = Region.query.get(id)
    
    if request.method == 'DELETE':
        try:
            db.session.delete(region_to_delete)
            db.session.commit()
            return jsonify({'message': 'Region deleted successfully'}), 200
        except:
            return jsonify({'message': f'Region of id {id} not found'}), 404

