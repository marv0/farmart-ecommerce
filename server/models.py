from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

from config import db

# Define User model
class User(db.Model, UserMixin, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    user_type = db.Column(db.String(20), nullable=False)  # 'consumer' or 'farmer'
    farm_name = db.Column(db.String(100), nullable=True)  # Specific to farmers
    address = db.Column(db.String(255), nullable=True)    # Specific to farmers
    phone_number = db.Column(db.String(20), nullable=True)  # Specific to farmers
    animals = db.relationship('Animal', backref='farmer', lazy=True, foreign_keys='Animal.farmer_id')

# Define Animal model
class Animal(db.Model):
    __tablename__ = 'animals'
    id = db.Column(db.Integer, primary_key=True)
    farmer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    breed = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=True)
    quantity = db.Column(db.Integer, nullable=True, default=0)
    image_filename = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

# Define Order model
class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    animal_id = db.Column(db.Integer, db.ForeignKey('animals.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    phone_number = db.Column(db.String(10), nullable=False)  # 10 digit phone number
    status = db.Column(db.String(20), nullable=False, default='pending')
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    buyer = db.relationship('User', backref='orders', foreign_keys=[buyer_id])
    animal = db.relationship('Animal', backref='orders', foreign_keys=[animal_id])