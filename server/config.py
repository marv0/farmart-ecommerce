# Standard library imports

# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from datetime import timedelta

# Local imports

# Instantiate app, set attributes
app = Flask(__name__)
app.config['SECRET_KEY'] = 'absnbsyfz633'  # Add your secret key here
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Change this to a random secret key
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)