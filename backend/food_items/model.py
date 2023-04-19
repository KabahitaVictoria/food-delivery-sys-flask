from backend.db import db, ma

class FoodItem(db.Model):
  __tablename__ = 'food_items'

  name:str
  price:int
  price_unit:str
  image:str
  stock:int
  category_id:int

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(100),unique=True)
  description = db.Column(db.String(255))
  price = db.Column(db.String(255))  
  price_unit = db.Column(db.String(10),default='UGX')
  image = db.Column(db.String(200))
  stock = db.Column(db.Integer)
  category_id = db.Column(db.Integer,db.ForeignKey('categories.id'))
  category_name = db.Column(db.String(100))
  created_by  = db.Column(db.Integer,db.ForeignKey('users.id'))
  created_at = db.Column(db.String(255),nullable=True)
  updated_at = db.Column(db.String(255),nullable=True)
  
  def __repr__(self):
        return f"<FoodItem {self.name} >"
      
class FoodSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = FoodItem