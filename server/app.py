from flask import Flask, request, jsonify, flash, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from config import app, db
from models import User, Farmer, Animal, Order, db
from flask_login import UserMixin

# Initialize LoginManager
login_manager = LoginManager()
login_manager.login_view = 'login'  # Specify the login route
login_manager.init_app(app)

# Define user loader function for LoginManager
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Define routes
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    user_type = data.get('user_type')  # 'consumer' or 'farmer'

    # Check if user already exists
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'error': 'Username already exists. Please choose a different one.'}), 400

    # Create new user
    hashed_password = generate_password_hash(password, method='sha256')
    new_user = User(username=username, email=email, password=hashed_password, user_type=user_type)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Account created successfully. Please log in.'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Check if user exists
    user = User.query.filter_by(username=username).first()
    if user:
        if check_password_hash(user.password, password):
            login_user(user)
            return jsonify({'message': 'Login successful.'}), 200

    return jsonify({'error': 'Invalid username or password. Please try again.'}), 401

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'You have been logged out.'}), 200

@app.route('/animals', methods=['GET'])
def list_animals():
    animal_type = request.args.get('type')
    breed = request.args.get('breed')
    min_age = request.args.get('min_age')
    max_age = request.args.get('max_age')
    search_query = request.args.get('q')

    query = Animal.query

    if animal_type:
        query = query.filter(Animal.type == animal_type)

    if breed:
        query = query.filter(Animal.breed == breed)

    if min_age:
        query = query.filter(Animal.age >= int(min_age))

    if max_age:
        query = query.filter(Animal.age <= int(max_age))

    if search_query:
        query = query.filter(or_(Animal.type.ilike(f'%{search_query}%'), Animal.breed.ilike(f'%{search_query}%')))

    animals = query.all()

    animal_data = [{'id': animal.id, 'type': animal.type, 'breed': animal.breed,
                    'age': animal.age, 'price': animal.price, 'description': animal.description, 'quantity': animal.quantity}
                   for animal in animals]

    return jsonify(animal_data)

@app.route('/add_animal', methods=['POST'])
@login_required
def add_animal():
    if current_user.user_type != 'farmer':
        return jsonify({'error': 'You do not have permission to access this page.'}), 403

    data = request.get_json()
    type = data.get('type')
    breed = data.get('breed')
    age = data.get('age')
    price = data.get('price')
    description = data.get('description')
    quantity = data.get('quantity')

    new_animal = Animal(farmer_id=current_user.id, type=type, breed=breed, age=age, price=price, description=description, quantity=quantity)
    db.session.add(new_animal)
    db.session.commit()

    return jsonify({'message': 'Animal added successfully.'}), 201

@app.route('/update_animal/<int:animal_id>', methods=['PUT'])
@login_required
def update_animal(animal_id):
    animal = Animal.query.get_or_404(animal_id)
    if current_user.user_type != 'farmer':
        return jsonify({'error': 'You do not have permission to access this page.'}), 403

    data = request.get_json()
    animal.type = data.get('type')
    animal.breed = data.get('breed')
    animal.age = data.get('age')
    animal.price = data.get('price')
    animal.description = data.get('description')
    animal.quantity = data.get('quantity')

    db.session.commit()

    return jsonify({'message': 'Animal updated successfully.'}), 200

@app.route('/delete_animal/<int:animal_id>', methods=['DELETE'])
@login_required
def delete_animal(animal_id):
    animal = Animal.query.get_or_404(animal_id)
    if current_user.user_type != 'farmer':
        return jsonify({'error': 'You do not have permission to access this page.'}), 403

    db.session.delete(animal)
    db.session.commit()

    return jsonify({'message': 'Animal deleted successfully.'}), 200

@app.route('/place_order', methods=['POST'])
@login_required
def place_order():
    if current_user.user_type != 'consumer':
        return jsonify({'error': 'You do not have permission to access this page.'}), 403

    data = request.get_json()
    animal_id = data.get('animal_id')
    quantity = data.get('quantity')

    animal = Animal.query.get_or_404(animal_id)
    if animal.quantity < quantity:
        return jsonify({'error': 'Not enough animals in stock.'}), 400

    new_order = Order(user_id=current_user.id, animal_id=animal_id, quantity=quantity)
    db.session.add(new_order)
    db.session.commit()

    animal.quantity -= quantity
    db.session.commit()

    return jsonify({'message': 'Order placed successfully.'}), 201

@app.route('/orders', methods=['GET'])
@login_required
def view_orders():
    if current_user.user_type != 'consumer':
        return jsonify({'error': 'You do not have permission to access this page.'}), 403

    orders = Order.query.filter_by(user_id=current_user.id).all()

    order_data = [{'id': order.id, 'animal_id': order.animal_id, 'animal_type': order.animal.type,
                   'animal_breed': order.animal.breed, 'quantity': order.quantity,
                   'status': order.status, 'created_at': order.created_at.strftime('%Y-%m-%d %H:%M:%S')}
                  for order in orders]

    return jsonify(order_data)

@app.route('/cancel_order/<int:order_id>', methods=['DELETE'])
@login_required
def cancel_order(order_id):
    order = Order.query.get_or_404(order_id)
    if current_user.user_type != 'consumer':
        return jsonify({'error': 'You do not have permission to access this page.'}), 403

    animal = order.animal
    animal.quantity += order.quantity
    db.session.commit()

    db.session.delete(order)
    db.session.commit()

    return jsonify({'message': 'Order cancelled successfully.'}), 200

# Define user model
class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    user_type = db.Column(db.String(64))  # 'consumer' or 'farmer'
    registered_on = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# Define farmer model
class Farmer(db.Model):
    __tablename__ = 'farmers'
    id= db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        return '<Farmer {}>'.format(self.user.username)

# Define animal model
class Animal(db.Model):
    __tablename__ = 'animals'
    id = db.Column(db.Integer, primary_key=True)
    farmer_id = db.Column(db.Integer, db.ForeignKey('farmers.id'), nullable=False)
    type = db.Column(db.String(64), index=True)
    breed = db.Column(db.String(64), index=True)
    age = db.Column(db.Integer)
    price = db.Column(db.Float)
    description = db.Column(db.Text)
    quantity = db.Column(db.Integer)
    status = db.Column(db.String(64))  # 'available' or 'sold'

    def __repr__(self):
        return '<Animal {}>'.format(self.type)

# Define order model
class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    animal_id = db.Column(db.Integer, db.ForeignKey('animals.id'), nullable=False)
    quantity = db.Column(db.Integer)
    status = db.Column(db.String(64))  # 'pending' or 'processing' or 'completed' or 'cancelled'
    created_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    def __repr__(self):
        return '<Order {}>'.format(self.id)

# Run application
if __name__ == '__main__':
    app.run(debug=True)