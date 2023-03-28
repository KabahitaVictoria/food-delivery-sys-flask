from backend.db import db, ma

class Region(db.Model):
    __tablename__ = "regions"
    
    from backend.districts.model import District
    
    name:str
  
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(255),unique=True)
    created_by  = db.Column(db.Integer,db.ForeignKey('users.id'))
    created_at = db.Column(db.String(255),nullable=True)
    updated_at = db.Column(db.String(255),nullable=True)
    districts = db.relationship("District",backref="region")
    
    def __repr__(self):
        return f"<Region {self.name} >"
    
class RegionSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = Region