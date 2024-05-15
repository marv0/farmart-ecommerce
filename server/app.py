from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/databasename'

db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    USER_TYPE_USER = 'user'
    USER_TYPE_FARMER = 'farmer'
    user_type = db.Column(db.String(20), nullable=False, default=USER_TYPE_USER)

# Initialize LoginManager
login_manager = LoginManager()
login_manager.login_view = 'login'
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Route for user registration
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    user_type = data.get('user_type')

    if not username or not email or not password or not user_type:
        return jsonify({'message': 'Missing parameters'}), 400

    if user_type not in [User.USER_TYPE_USER, User.USER_TYPE_FARMER]:
        return jsonify({'message': 'Invalid user type'}), 400

    # Check if the username or email already exists
    if User.query.filter_by(username=username).first() is not None:
        return jsonify({'message': 'Username already exists'}), 400
    if User.query.filter_by(email=email).first() is not None:
        return jsonify({'message': 'Email already exists'}), 400

    # Create a new user
    hashed_password = generate_password_hash(password)
    new_user = User(username=username, email=email, password=hashed_password, user_type=user_type)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

# Route for user login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user_type = data.get('user_type')

    if not username or not password or not user_type:
        return jsonify({'message': 'Missing username, password, or user type'}), 400

    user = User.query.filter_by(username=username).first()

    if not user or not check_password_hash(user.password, password) or user.user_type != user_type:
        return jsonify({'message': 'Invalid username, password, or user type'}), 401

    login_user(user)
    return jsonify({'message': 'Login successful'}), 200

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200

if __name__ == '__main__':
    app.run(port=5555, debug=True)
