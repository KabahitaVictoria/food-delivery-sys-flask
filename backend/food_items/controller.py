from flask import jsonify, Blueprint, request
from backend.food_items.model import FoodItem, FoodSchema
from backend.categories.model import Category
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.db import db
import datetime

food_items = Blueprint('food_items', __name__, url_prefix='/food_items')

# ------------------------
# GET ALL FOOD ITEMS
@food_items.route('/')
@jwt_required()
def get_all_food_items():
        food_items = FoodItem.query.all()
        food_item_schema = FoodSchema(many=True)
        output = food_item_schema.dump(food_items)
        return jsonify({'data': output})
    
# ------------------------
# GET A FOOD ITEM
@food_items.route('/food_item/<int:id>')
@jwt_required()
def get_a_food_item(id):
    food_item_to_get = FoodItem.query.get(id)
    
    if food_item_to_get:
        return jsonify({'data': FoodSchema().dump(food_item_to_get)}), 200
    else:
        return jsonify({'message': f'Food item of id {id} not found'}), 404
    
# ------------------------
# CREATE A FOOD ITEM
@food_items.route('/create', methods=['POST'])
@jwt_required()
def create_food_item():
    data = request.get_json()
    name = data['name']
    price = data['price']
    image = data['image']
    stock = data['stock']
    description = data['description']
    category_id = data['category_id']
    
    category_name = Category.query.get_or_404(category_id).name
    
    if not name:
        return jsonify({'error':"Please provide a food item name"})
    
    if not category_id:
        return jsonify({'error':"This category id does not exist!"})
    
    if not description:
        return jsonify({'error':"Please provide a food item description"})
    
    if not price:
        return jsonify({'error':"Please provide a food item price"})
    
    if not image:
        return jsonify({'error':"Please provide a food item image url"})
    
    if not stock:
        return jsonify({'error':"Please provide a stock quantity for this food item"})
    
    if FoodItem.query.filter_by(name=name).first() is not None:
            return jsonify({'error': "This food item already exists"}), 409
        
    food_item = FoodItem(name=name, price=price,image=image, stock=stock, created_at=datetime.datetime.utcnow(), description=description, category_id=category_id,category_name=category_name)
    
    db.session.add(food_item)
    db.session.commit()
    
    return jsonify({'message': f'A new food item has been created successfully', 'data': FoodSchema().dump(food_item)}),201
    
# ------------------------
# DELETE A FOOD ITEM
@food_items.route('/food_item/delete/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_food_item(id):
    food_item_to_delete = FoodItem.query.get(id)
    
    if request.method == 'DELETE':
        try:
            db.session.delete(food_item_to_delete)
            db.session.commit()
            return jsonify({'message': 'Food item deleted successfully'}), 200
        except:
            return jsonify({'message': f'Food item of id {id} not found'}), 404
        
# ------------------------
# UPDATE FOOD ITEM
@food_items.route('/food_item/update/<int:id>', methods=['GET', 'PUT'])
def update_food_item(id):
    food_item_to_update = FoodItem.query.get(id)
    data = request.get_json()
    
    if request.method == 'GET':
        return jsonify({'data': FoodSchema().dump(food_item_to_update)})
    
    elif request.method == 'PUT':
        food_item_to_update.name = data['name']
        food_item_to_update.image = data['image']
        food_item_to_update.price = data['price']
        food_item_to_update.stock = data['stock']
        food_item_to_update.updated_at = datetime.datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({'message': f'food item of id {id} updated successfully' ,'data': FoodSchema().dump(food_item_to_update)}),200