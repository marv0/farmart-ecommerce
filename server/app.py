import os
from flask import Flask, request, jsonify, flash, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask import request, jsonify, flash, redirect, url_for
from sqlalchemy import or_
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
from werkzeug.utils import secure_filename

# Import Flask app and SQLAlchemy instance from config
from config import app, db  

# Add your model imports
from models import User, Animal, Order, db

# Configure upload folder and allowed extensions
UPLOAD_FOLDER = 'uploads/'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Create the upload folder if it does not exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

#Initialize JWT _ flask Extension 
jwt = JWTManager(app)

# Initialize LoginManager
login_manager = LoginManager()
login_manager.login_view = 'login'  # Specify the login route
login_manager.init_app(app)

# Define user loader function for LoginManager
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Define route for user registration
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    user_type = data.get('user_type')
    
    if not username or not email or not password or not user_type:
        return jsonify({'error': 'Username, email, password, and user type are required.'}), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'error': 'Username already exists. Please choose a different one.'}), 400

    # Conditionally require farm-related fields for farmers
    if user_type == 'farmer':
        farm_name = data.get('farm_name')
        address = data.get('address')
        phone_number = data.get('phone_number')
        if not farm_name or not address or not phone_number:
            return jsonify({'error': 'Farm name, address, and phone number are required for farmers.'}), 400
    else:
        farm_name = None
        address = None
        phone_number = None

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    new_user = User(
        username=username, 
        email=email, 
        password=hashed_password, 
        user_type=user_type,
        farm_name=farm_name,
        address=address,
        phone_number=phone_number
    )
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
    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity={'id': user.id, 'user_type': user.user_type})
        return jsonify({'message': 'Login successful.', 'access_token': access_token, 'user_type': user.user_type}), 200

    return jsonify({'error': 'Invalid username or password. Please try again.'}), 401

# Define route for user logout (if needed)
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'You have been logged out.'}), 200

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

# Route to get animal details 
@app.route('/animal/<int:animal_id>', methods=['GET'])
def get_animal(animal_id):
    animal = Animal.query.get_or_404(animal_id)
    if animal:
        # animal_data = animal.to_dict()
        # Serialize animals data
        animal_data = {'id': animal.id, 'type': animal.type, 'breed': animal.breed,
                    'age': animal.age, 'price': animal.price, 'description': animal.description, 'quantity': animal.quantity}
        return jsonify(animal_data), 200

# Define route for adding a new animal (for farmers)
@app.route('/add_animal', methods=['POST'])
@jwt_required()
def add_animal():
    current_user = get_jwt_identity()
    if current_user['user_type'] != 'farmer':
        return jsonify({'error': 'You do not have permission to access this page.'}), 403

    data = request.form
    type = data.get('type')

    print('Animal type is:', type)

    breed = data.get('breed')
    age = data.get('age')
    price = data.get('price')
    description = data.get('description')
    quantity = data.get('quantity')

    print('Submitted data is: ', data)

    if 'image' not in request.files:
        return jsonify({'error': 'Image file is required.'}), 400
    
    image = request.files['image']
    if image.filename == '' or not allowed_file(image.filename):
        return jsonify({'error': 'Invalid image file.'}), 400
    
    filename = secure_filename(image.filename)
    image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    new_animal = Animal(
        farmer_id=current_user['id'], 
        type=type, 
        breed=breed, 
        age=age, 
        price=price, 
        description=description, 
        quantity=quantity,
        image_filename=filename
    )
    db.session.add(new_animal)
    db.session.commit()

    return jsonify({'message': 'Animal added successfully.'}), 201

# Route to get all animals belonging to a specific farmer 
@app.route('/get_farmer_animals', methods=['GET'])
@jwt_required()
def get_farmer_animals():
    current_user = get_jwt_identity()
    if current_user['user_type'] != 'farmer':
        return jsonify({'error': 'You do not have permission to access this page.'}), 401
    
    # Get the farmer associated with the current user
    user = User.query.filter_by(id=current_user['id']).first()
    print('Farmer Fetched', user)
    if not user:
        print('Farmer with this id not found', current_user['id'])
        return jsonify({'error': 'Farmer not found.'}), 404
    
    # Get all animals associated with the farmer
    animals = Animal.query.filter_by(farmer_id=user.id).all()

    # Serialize the animal data
    animal_data = [{'id': animal.id, 'type': animal.type, 'breed': animal.breed,
                    'age': animal.age, 'price': animal.price, 'description': animal.description, 'quantity': animal.quantity}
                   for animal in animals]
    return jsonify(animal_data), 200

# Define route for updating an animal (for farmers)
@app.route('/update_animal/<int:animal_id>', methods=['PUT'])
@jwt_required()
def update_animal(animal_id):
    animal = Animal.query.get_or_404(animal_id)
    current_user = get_jwt_identity()
    if current_user['user_type'] != 'farmer' or animal.farmer_id != current_user['id']:
        return jsonify({'error': 'You do not have permission to access this page.'}), 403

    data = request.form
    animal.type = data.get('type')
    animal.breed = data.get('breed')
    animal.age = data.get('age')
    animal.price = data.get('price')
    animal.description = data.get('description')
    animal.quantity = data.get('quantity')

    if 'image' in request.files:
        image = request.files['image']
        if image.filename != '' and allowed_file(image.filename):
            filename = secure_filename(image.filename)
            image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            animal.image_filename = filename

    db.session.commit()
    return jsonify({'message': 'Animal updated successfully.'}), 200

# Define route for deleting an animal (for farmers)
@app.route('/delete_animal/<int:animal_id>', methods=['DELETE'])
@jwt_required()
def delete_animal(animal_id):
    animal = Animal.query.get_or_404(animal_id)
    current_user = get_jwt_identity()
    if current_user['user_type'] != 'farmer' or animal.farmer_id != current_user['id']:
        return jsonify({'error': 'You do not have permission to access this page.'}), 403

    db.session.delete(animal)
    db.session.commit()
    return jsonify({'message': 'Animal deleted successfully.'}), 200

# Define route for placing an order (for consumers)
@app.route('/place_order/<int:animal_id>', methods=['POST'])
@jwt_required()
def place_order(animal_id):
    animal = Animal.query.get_or_404(animal_id)
    current_user = get_jwt_identity()
    if current_user['user_type'] != 'consumer':
        return jsonify({'error': 'You do not have permission to access this page.'}), 403

    data = request.get_json()
    quantity = int(data.get('quantity'))
    total_price = quantity * animal.price
    phone_number = data.get('phone_number')

    if len(phone_number) != 10:
        return jsonify({'error': 'Phone number must be 10 digits long.'}), 400

    if quantity <= 0:
        return jsonify({'error': 'Quantity must be greater than zero.'}), 400

    if quantity > animal.quantity:
        return jsonify({'error': 'Insufficient stock.'}), 400

    new_order = Order(
        buyer_id=current_user['id'], 
        animal_id=animal.id, 
        quantity=quantity, 
        total_price=total_price, 
        phone_number=phone_number
    )
    db.session.add(new_order)
    db.session.commit()

    return jsonify({'message': 'Order placed successfully.'}), 201

# Define route for viewing orders ( for farmer)
@app.route('/farmer_orders', methods=['GET'])
@jwt_required()
def view_farmer_orders():
    current_user = get_jwt_identity()
    if current_user['user_type'] != 'farmer':
        return jsonify({'error': 'You do not have permission to access this page.'}), 403

    farmer_orders = Order.query.join(Animal).filter(Animal.farmer_id == current_user['id']).all()

    order_data = [{
            'id': order.id,
            'animal_type': order.animal.type,
            'animal_breed': order.animal.breed,
            'age': order.animal.age,
            'price': order.animal.price,
            'description': order.animal.description,
            'quantity': order.quantity,
            'total_price': order.total_price,
            'status': order.status,
            'image_filename': order.animal.image_filename,
            'created_at': order.created_at,
            'updated_at': order.animal.updated_at,
        } for order in farmer_orders]
    # order_data = []
    # for order in farmer_orders:
    #     order_info = order.to_dict()
    #     order_info['animal'] = order.animal.to_dict()
    #     order_info['buyer'] = order.buyer.to_dict()
    #     order_data.append(order_info)

    return jsonify(order_data), 200

# Define route for viewing orders ( for consumer)
# @app.route('/consumer_orders', methods=['GET'])
# @jwt_required()
# def view_consumer_orders():
#     current_user = get_jwt_identity()
#     if current_user['user_type'] != 'consumer':
#         return jsonify({'error': 'You do not have permission to access this page.'}), 403

#     consumer_orders = Order.query.filter_by(buyer_id=current_user['id']).all()
#     order_data = []
#     for order in consumer_orders:
#         order_info = order.to_dict()
#         order_info['animal'] = order.animal.to_dict()
#         order_info['farmer'] = order.animal.farmer.to_dict()
#         order_data.append(order_info)

#     return jsonify(order_data), 200

@app.route('/consumer_orders', methods=['GET'])
@jwt_required()
def view_consumer_orders():
    current_user = get_jwt_identity()
    if current_user['user_type'] != 'consumer':
        return jsonify({'error': 'You do not have permission to access this page.'}), 403

    consumer_orders = Order.query.filter_by(buyer_id=current_user['id']).all()
    
    order_data = [{
            'id': order.id,
            'animal_type': order.animal.type,
            'animal_breed': order.animal.breed,
            'age': order.animal.age,
            'price': order.animal.price,
            'description': order.animal.description,
            'quantity': order.quantity,
            'total_price': order.total_price,
            'status': order.status,
            'image_filename': order.animal.image_filename,
            'created_at': order.created_at,
            'updated_at': order.animal.updated_at,
        } for order in consumer_orders]

    return jsonify(order_data), 200

# Define route for accepting an order (for farmers)
@app.route('/accept_order/<int:order_id>', methods=['PUT'])
@jwt_required()
def accept_order(order_id):
    order = Order.query.get_or_404(order_id)
    current_user = get_jwt_identity()
    if current_user['user_type'] == 'farmer' and order.animal.farmer_id == current_user['id']:
        if order.quantity > order.animal.quantity:
            return jsonify({'error': 'Insufficient stock to accept this order.'}), 400
        order.animal.quantity -= order.quantity
        order.status = 'accepted'
        db.session.commit()
        return jsonify({'message': 'Order accepted successfully.'}), 200
    else:
        return jsonify({'error': 'You do not have permission to access this page.'}), 403

# Define a simple route for testing
@app.route('/')
def index():
    return jsonify({'message': 'Farmart Application is running!'})

# Run the Flask app
if __name__ == '__main__':
    app.run(port=5555, debug=True)