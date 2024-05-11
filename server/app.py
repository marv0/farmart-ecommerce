#!/usr/bin/env python3

from flask import Flask, render_template, request, redirect, url_for, flash, request
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_restful import Resource
from werkzeug.security import generate_password_hash, check_password_hash

# Local imports
from config import app, db, api

# Add your model imports
from models import db, User, Farmer, Animal, Order

# Initialize Flask app
app = Flask(__name__)

# Configure Flask app
app.config['SECRET_KEY'] = 'your_secret_key'  # Change this to a random secret key
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/database_name'  # Update with your database URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy instance
db.init_app(app)

# Initialize LoginManager
login_manager = LoginManager()
login_manager.login_view = 'login'  # Specify the login route
login_manager.init_app(app)

# Define user loader function for LoginManager
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Define route for user registration
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        user_type = request.form['user_type']  # 'consumer' or 'farmer'

        # Check if user already exists
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            flash('Username already exists. Please choose a different one.', 'error')
            return redirect(url_for('register'))

        # Create new user
        hashed_password = generate_password_hash(password, method='sha256')
        new_user = User(username=username, email=email, password=hashed_password, user_type=user_type)
        db.session.add(new_user)
        db.session.commit()

        flash('Account created successfully. Please log in.', 'success')
        return redirect(url_for('login'))

    return render_template('register.html')

# Define route for user login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Check if user exists
        user = User.query.filter_by(username=username).first()
        if user:
            if check_password_hash(user.password, password):
                login_user(user)
                next_page = request.args.get('next')
                return redirect(next_page or url_for('index'))
        
        flash('Invalid username or password. Please try again.', 'error')
        return redirect(url_for('login'))

    return render_template('login.html')

# Define route for user logout
@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.', 'success')
    return redirect(url_for('login'))

# Define route for listing animals
@app.route('/animals')
def list_animals():
    animals = Animal.query.all()
    return render_template('animals.html', animals=animals)

# Define route for adding a new animal (for farmers)
@app.route('/add_animal', methods=['GET', 'POST'])
@login_required
def add_animal():
    if current_user.user_type != 'farmer':
        flash('You do not have permission to access this page.', 'error')
        return redirect(url_for('index'))

    if request.method == 'POST':
        type = request.form['type']
        breed = request.form['breed']
        age = request.form['age']
        price = request.form['price']
        description = request.form['description']

        new_animal = Animal(farmer_id=current_user.id, type=type, breed=breed, age=age, price=price, description=description)
        db.session.add(new_animal)
        db.session.commit()

        flash('Animal added successfully.', 'success')
        return redirect(url_for('list_animals'))

    return render_template('add_animal.html')

# Define route for updating an animal (for farmers)
@app.route('/update_animal/<int:animal_id>', methods=['GET', 'POST'])
@login_required
def update_animal(animal_id):
    animal = Animal.query.get_or_404(animal_id)
    if current_user.user_type != 'farmer' or animal.farmer_id != current_user.id:
        flash('You do not have permission to access this page.', 'error')
        return redirect(url_for('index'))

    if request.method == 'POST':
        animal.type = request.form['type']
        animal.breed = request.form['breed']
        animal.age = request.form['age']
        animal.price = request.form['price']
        animal.description = request.form['description']

        db.session.commit()
        flash('Animal updated successfully.', 'success')
        return redirect(url_for('list_animals'))

    return render_template('update_animal.html', animal=animal)

# Define route for deleting an animal (for farmers)
@app.route('/delete_animal/<int:animal_id>', methods=['POST'])
@login_required
def delete_animal(animal_id):
    animal = Animal.query.get_or_404(animal_id)
    if current_user.user_type != 'farmer' or animal.farmer_id != current_user.id:
        flash('You do not have permission to access this page.', 'error')
        return redirect(url_for('index'))

    db.session.delete(animal)
    db.session.commit()
    flash('Animal deleted successfully.', 'success')
    return redirect(url_for('list_animals'))

# Define route for placing an order (for consumers)
@app.route('/place_order/<int:animal_id>', methods=['POST'])
@login_required
def place_order(animal_id):
    animal = Animal.query.get_or_404(animal_id)
    if current_user.user_type != 'consumer':
        flash('You do not have permission to access this page.', 'error')
        return redirect(url_for('index'))

    quantity = int(request.form['quantity'])
    total_price = quantity * animal.price

    if quantity <= 0:
        flash('Quantity must be greater than zero.', 'error')
        return redirect(url_for('list_animals'))

    if quantity > animal.quantity:
        flash('Insufficient stock.', 'error')
        return redirect(url_for('list_animals'))

    new_order = Order(buyer_id=current_user.id, animal_id=animal.id, quantity=quantity, total_price=total_price)
    db.session.add(new_order)
    db.session.commit()
    
    flash('Order placed successfully.', 'success')
    return redirect(url_for('list_animals'))

# Define a simple route for testing
@app.route('/')
def index():
    return 'Farmart Application is running!'

# Run the Flask app
if __name__ == '__main__':
    app.run(port=5555, debug=True)
