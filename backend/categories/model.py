from backend.db import db, ma
from dataclasses import dataclass

@dataclass
class Category(db.Model):
    __tablename__ = "categories"
    name:str
    image:str
    
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(255),unique=True)
    image = db.Column(db.String(255),nullable=False)
    created_by  = db.Column(db.Integer,db.ForeignKey('users.id'))
    created_at = db.Column(db.String(255),nullable=True)
    updated_at = db.Column(db.String(255),nullable=True)
    
    def __repr__(self):
        return f"<Category {self.name} >"
    
class CategorySchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = Category 