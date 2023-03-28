from backend.db import db, ma

class Order(db.Model):
    __tablename__ = "orders"
    id = db.Column(db.Integer, primary_key = True)
    quantity = db.Column(db.Integer)
    location = db.Column(db.String(255),nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    food_item_id = db.Column(db.Integer, db.ForeignKey('food_items.id'))
    
    def __repr__(self):
        return f"<Order {self.user_id} >"
    
class OrderSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = Order