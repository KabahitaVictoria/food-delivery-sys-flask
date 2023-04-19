from backend.db import db, ma
from backend.food_items.model import FoodSchema
from marshmallow import fields

class Order(db.Model):
    __tablename__ = "orders"
    id = db.Column(db.Integer, primary_key = True)
    quantity = db.Column(db.Integer)
    location = db.Column(db.String(255),nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    food_item_id = db.Column(db.Integer, db.ForeignKey('food_items.id'))
    food_item = db.relationship('FoodItem', backref='orders')
    
    def __repr__(self):
        return f"<Order {self.user_id} >"
    
class OrderSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Order
        load_instance = True
    
    food_item = fields.Nested(FoodSchema, only=['id', 'name', 'description', 'price', 'image'])
    name = fields.Function(lambda obj: obj.food_item.name)
    image = fields.Function(lambda obj: obj.food_item.image)
