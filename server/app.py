from flask import Flask, request, jsonify, flash, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask import request, jsonify, flash, redirect, url_for
from config import app, db  # Import Flask app and SQLAlchemy instance from config
from sqlalchemy import or_

# Add your model imports
from models import User, Farmer, Animal, Order, db

# Initialize LoginManager
login_manager = LoginManager()
login_manager.login_view = 'login'  # Specify the login route
login_manager.init_app(app)

# Define user loader function for LoginManager
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Define route for user registration
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

# Define route for user login
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

# Define route for user logout
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'You have been logged out.'}), 200

# # Define route for listing animals
# @app.route('/animals')
# def list_animals():
#     animals = Animal.query.all()
#     animal_data = [{'id': animal.id, 'type': animal.type, 'breed': animal.breed, 'age': animal.age, 'price': animal.price, 'description': animal.description} for animal in animals]
#     return jsonify(animal_data)

# Define route for listing animals with search and filter options
@app.route('/animals', methods=['GET'])
def list_animals():
    # Get query parameters
    animal_type = request.args.get('type')
    breed = request.args.get('breed')
    min_age = request.args.get('min_age')
    max_age = request.args.get('max_age')
    search_query = request.args.get('q')

    # Query animals based on filters
    query = Animal.query

    if animal_type:
        query = query.filter(Animal.type == animal_type)

    if breed:
        query = query.filter(Animal.breed == breed)

    if min_age:
        query = query.filter(Animal.age >= int(min_age))

    if max_age:
        query = query.filter(Animal.age <= int(max_age))

    # Search animals based on search query
    if search_query:
        query = query.filter(or_(Animal.type.ilike(f'%{search_query}%'), Animal.breed.ilike(f'%{search_query}%')))

    animals = query.all()

    # Serialize animals data
    animal_data = [{'id': animal.id, 'type': animal.type, 'breed': animal.breed,
                    'age': animal.age, 'price': animal.price, 'description': animal.description, 'quantity': animal.quantity}
                   for animal in animals]

    return jsonify(animal_data)

# Define route for adding a new animal (for farmers)
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

# Define route for updating an animal (for farmers)
@app.route('/update_animal/<int:animal_id>', methods=['PUT'])
@login_required
def update_animal(animal_id):
    animal = Animal.query.get_or_404(animal_id)
    if current_user.user_type != 'farmer' or animal.farmer_id != current_user.id:
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

# Define route for deleting an animal (for farmers)
@app.route('/delete_animal/<int:animal_id>', methods=['DELETE'])
@login_required
def delete_animal(animal_id):
    animal = Animal.query.get_or_404(animal_id)
    if current_user.user_type != 'farmer' or animal.farmer_id != current_user.id:
        return jsonify({'error': 'You do not have permission to access this page.'}), 403

    db.session.delete(animal)
    db.session.commit()
    return jsonify({'message': 'Animal deleted successfully.'}), 200

# Define route for placing an order (for consumers)
@app.route('/place_order/<int:animal_id>', methods=['POST'])
@login_required
def place_order(animal_id):
    animal = Animal.query.get_or_404(animal_id)
    if current_user.user_type != 'consumer':
        return jsonify({'error': 'You do not have permission to access this page.'}), 403

    data = request.get_json()
    quantity = int(data.get('quantity'))
    total_price = quantity * animal.price

    if quantity <= 0:
        return jsonify({'error': 'Quantity must be greater than zero.'}), 400

    if quantity > animal.quantity:
        return jsonify({'error': 'Insufficient stock.'}), 400

    new_order = Order(buyer_id=current_user.id, animal_id=animal.id, quantity=quantity, total_price=total_price)
    db.session.add(new_order)
    db.session.commit()

    return jsonify({'message': 'Order placed successfully.'}), 201

# Define a simple route for testing
@app.route('/')
def index():
    return jsonify({'message': 'Farmart Application is running!'})

# Run the Flask app
if __name__ == '__main__':
    app.run(port=5555, debug=True)
