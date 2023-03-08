from backend import app
from flask_migrate import Migrate
from backend.db import db

# migrate app with database
migrate = Migrate(app, db)

if __name__ == '__main__':
    app.run(debug=True)