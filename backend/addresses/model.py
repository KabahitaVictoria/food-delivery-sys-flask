from backend.db import db, ma

class Address(db.Model):
    __tablename__ = "addresses"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    district_id = db.Column(db.Integer, db.ForeignKey('districts.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_name = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.String(255), nullable=True)
    updated_at = db.Column(db.String(255), nullable=True)
    
    def __repr__(self):
        return f"<Address {self.name} >"
    
class AddressSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Address