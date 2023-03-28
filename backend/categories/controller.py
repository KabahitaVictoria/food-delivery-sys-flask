from flask import jsonify, Blueprint, request
from backend.categories.model import Category, CategorySchema
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.db import db
import datetime

categories = Blueprint('categories', __name__, url_prefix='/categories')

# ------------------------
# GET ALL CATEGORIES
@categories.route('/')
@jwt_required()
def get_all_categories():
        categories = Category.query.all()
        category_schema = CategorySchema(many=True)
        output = category_schema.dump(categories)
        return jsonify({'data': output})
    
# ------------------------
# GET A CATEGORY
@categories.route('/category/<int:id>')
@jwt_required()
def get_a_category(id):
    category_to_get = Category.query.get(id)
    
    if category_to_get:
        return jsonify({'data': CategorySchema().dump(category_to_get)}), 200
    else:
        return jsonify({'message': f'Category of id {id} not found'}), 404
    
# ------------------------
# CREATE A CATEGORY
@categories.route('/create', methods=['POST'])
@jwt_required()
def create_category():
    data = request.get_json()
    name = data['name']
    image = data['image']
    
    if not name:
        return jsonify({'error':"Please provide a category name"})
    
    if Category.query.filter_by(name=name).first() is not None:
            return jsonify({'error': "This category already exists"}), 409
        
    category = Category(name=name, image=image, created_at=datetime.datetime.utcnow())
    
    db.session.add(category)
    db.session.commit()
    
    return jsonify({'message': f'A new category has been created successfully', 'data': CategorySchema().dump(category)}),201
    
# ------------------------
# DELETE A CATEGORY
@categories.route('/category/delete/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_category(id):
    category_to_delete = Category.query.get(id)
    
    if request.method == 'DELETE':
        try:
            db.session.delete(category_to_delete)
            db.session.commit()
            return jsonify({'message': 'Category deleted successfully'}), 200
        except:
            return jsonify({'message': f'Category of id {id} not found'}), 404
        
# ------------------------
# UPDATE CATEGORY
@categories.route('/category/update/<int:id>', methods=['GET', 'PUT'])
def update_category(id):
    category_to_update = Category.query.get(id)
    data = request.get_json()
    
    if request.method == 'GET':
        return jsonify({'data': CategorySchema().dump(category_to_update)})
    
    elif request.method == 'PUT':
        category_to_update.name = data['name']
        category_to_update.image = data['image']
        category_to_update.updated_at = datetime.datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({'message': f'category of id {id} updated successfully' ,'data': CategorySchema().dump(category_to_update)}),200