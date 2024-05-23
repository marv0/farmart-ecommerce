from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Assuming your Node.js server is running on localhost:5000
NODE_SERVER_URL = 'http://localhost:5000/api'

@app.route('/check-order/<int:order_id>', methods=['GET'])
def check_order_status(order_id):
    try:
        # Make a request to the Node.js backend to get the order details
        response = requests.get(f'{NODE_SERVER_URL}/order/{order_id}')
        response.raise_for_status()  # Raise an exception for HTTP errors
        order_data = response.json()
        
        # Check if the order status is 'accepted'
        if order_data.get('status') == 'accepted':
            return jsonify({'status': 'Order is accepted'})
        else:
            return jsonify({'status': 'Order is not accepted'})
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)  # Run Flask server on port 5001
