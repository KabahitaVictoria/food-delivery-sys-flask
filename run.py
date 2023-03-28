from backend import create_app, db
from flask_migrate import Migrate
from backend.users.model import User
from backend.addresses.model import Address
from backend.categories.model import Category
from backend.districts.model import District
from backend.food_items.model import FoodItem
from backend.regions.model import Region
from backend.orders.model import Order

app = create_app()

# migrate app with database
migrate = Migrate(app, db)

@app.shell_context_processor
def make_shell_context():
   return dict(db=db, User=User, Address=Address, Category=Category, District=District, FoodItem=FoodItem, Region=Region, Order=Order)