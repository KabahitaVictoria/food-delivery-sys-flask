from backend.db import db # import the database
from backend.db import ma

# create user model 
class User(db.Model):
    __tablename__ = "users"
    
    from backend.addresses.model import Address
    from backend.regions.model import Region
    
    id: int
    first_name: str
    last_name: str
    email: str
    contact: str
    user_type: str
    
    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String(100), nullable = False)
    last_name = db.Column(db.String(100), nullable = False)
    email = db.Column(db.String(50))
    contact = db.Column(db.String(200))
    user_type = db.Column(db.String(100), default="customer")
    password = db.Column(db.String(100))
    created_at = db.Column(db.String(255),nullable=True)
    updated_at = db.Column(db.String(255), nullable=True)
    addresses = db.relationship("Address",backref="user", lazy=True)
    regions = db.relationship("Region", backref="user", lazy=True)
    
    def __repr__(self):
        return f"<User {self.name} >"
    
      #save a new instance
    def save(self):
            db.session.add(self)
            db.session.commit()

    #delete the item
    def delete(self):
            db.session.delete(self)
            db.session.commit()
    
    
# marshmallow schema for user model
class UserSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = User
    
    
    # profile = db.relationship("Profile", backref="user")
    