from flask import jsonify, Blueprint, request
from backend.orders.model import Order, OrderSchema
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.db import db

orders = Blueprint('orders', __name__, url_prefix='/orders')

# ------------------------
# GET ALL ORDERS
@orders.route('/')
@jwt_required()
def get_all_orders():
        orders = Order.query.all()
        order_schema = OrderSchema(many=True)
        output = order_schema.dump(orders)
        return jsonify({'data': output})
    
# ------------------------
# GET AN ORDER
@orders.route('/order/<int:id>')
@jwt_required()
def get_an_order(id):
    order_to_get = Order.query.get(id)
    
    if order_to_get:
        return jsonify({'data': OrderSchema().dump(order_to_get)}), 200
    else:
        return jsonify({'message': f'Order of id {id} not found'}), 404
    
# ------------------------
# CREATE AN ORDER
@orders.route('/create', methods=['POST'])
@jwt_required()
def create_order():
    data = request.get_json()
    quantity = data['quantity']
    location = data['location']
    
    if not quantity:
        return jsonify({'error':"Please provide a food order quantity"})
    
    if not location:
        return jsonify({'error':"Please provide a location for your order"})
        
    order = Order(quantity=quantity, location=location)
    
    db.session.add(order)
    db.session.commit()
    
    return jsonify({'message': f'A new order has been created successfully', 'data': OrderSchema().dump(order)}),201

# ------------------------
# DELETE AN ORDER
@orders.route('/order/delete/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_order(id):
    order_to_delete = Order.query.get(id)
    
    if request.method == 'DELETE':
        try:
            db.session.delete(order_to_delete)
            db.session.commit()
            return jsonify({'message': 'Order deleted successfully'}), 200
        except:
            return jsonify({'message': f'Order of id {id} not found'}), 404
        
# ------------------------
# UPDATE ORDER
@orders.route('/order/update/<int:id>', methods=['GET', 'PUT'])
def update_order(id):
    order_to_update = Order.query.get(id)
    data = request.get_json()
    
    if request.method == 'GET':
        return jsonify({'data': OrderSchema().dump(order_to_update)})
    
    elif request.method == 'PUT':
        order_to_update.quantity = data['quantity']
        order_to_update.location = data['location']
        
        db.session.commit()
        
        return jsonify({'message': f'order of id {id} updated successfully' ,'data': OrderSchema().dump(order_to_update)}),200
    
    