from flask import Flask
import os #read .env variables after loading with dot env
# import psycopg2 # to connect to postgresql database
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.app_context().push()

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
# connection = psycopg2.connect(url)