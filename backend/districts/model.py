from backend.db import db, ma

class District(db.Model):
    __tablename__ = "districts"
    name:str
    region_id:int
    
    from backend.addresses.model import Address

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(255),unique=True)
    region_id = db.Column(db.Integer,db.ForeignKey('regions.id'))
    created_by  = db.Column(db.Integer,db.ForeignKey('users.id'))
    created_at = db.Column(db.String(255),nullable=True)
    updated_at = db.Column(db.String(255),nullable=True)
    addresses = db.relationship("Address",backref="district")
    
    def __repr__(self):
        return f"<District {self.name} >"
    
class DistrictSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = District 