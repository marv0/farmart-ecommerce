# Creating test data and corresponding endpoints.

1. **User Registration**
2. **User Login**
3. **List Animals**
4. **Add Animal**
5. **Update Animal**
6. **Delete Animal**
7. **Place Order**
8. **View Orders**
9. **Accept Order**

### 1. User Registration

**URL:** `POST /register`

**Request Body:**
```json
{
  "username": "test_farmer",
  "email": "farmer@example.com",
  "password": "password123",
  "user_type": "farmer"
}
```

```json
{
  "username": "test_consumer",
  "email": "consumer@example.com",
  "password": "password123",
  "user_type": "consumer"
}
```

### 2. User Login

**URL:** `POST /login`

**Request Body (Farmer):**
```json
{
  "username": "test_farmer",
  "password": "password123"
}
```

**Request Body (Consumer):**
```json
{
  "username": "test_consumer",
  "password": "password123"
}
```

### 3. List Animals

**URL:** `GET /animals`

### 4. Add Animal (Farmer only)

**URL:** `POST /add_animal`

**Request Body:**
```json
{
  "type": "Cow",
  "breed": "Holstein",
  "age": 3,
  "price": 500,
  "quantity": 10,
  "description": "A healthy Holstein cow."
}
```

### 5. Update Animal (Farmer only)

**URL:** `PUT /update_animal/{animal_id}`

**Request Body:**
```json
{
  "type": "Cow",
  "breed": "Holstein",
  "age": 4,
  "price": 550,
  "description": "An updated description of the Holstein cow."
}
```

### 6. Delete Animal (Farmer only)

**URL:** `DELETE /delete_animal/{animal_id}`

### 7. Place Order (Consumer only)

**URL:** `POST /place_order/{animal_id}`

**Request Body:**
```json
{
  "quantity": 2
}
```

### 8. View Orders (Farmer only)

**URL:** `GET /view_orders`

### 9. Accept Order (Farmer only)

**URL:** `PUT /accept_order/{order_id}`

**Request Body:**
```json
{
  "status": "accepted"
}
```

### Example User Credentials for Testing

- **Farmer Account:**
  - **Username:** `test_farmer`
  - **Password:** `password123`
  - **User Type:** `farmer`

- **Consumer Account:**
  - **Username:** `test_consumer`
  - **Password:** `password123`
  - **User Type:** `consumer`

### Testing Endpoints in Postman

1. **Register Users**
   - Create a new POST request in Postman with the `/register` URL.
   - Add the JSON body for both farmer and consumer as provided above.
   - Send the requests to register both users.

2. **Login Users**
   - Create new POST requests in Postman with the `/login` URL.
   - Add the JSON body for both farmer and consumer.
   - Send the requests to obtain the session tokens.

3. **List Animals**
   - Create a new GET request in Postman with the `/animals` URL.
   - Send the request to get the list of animals.

4. **Add Animal (Logged-in Farmer)**
   - Create a new POST request in Postman with the `/add_animal` URL.
   - Use the session token from the farmer login.
   - Add the JSON body for adding an animal.
   - Send the request to add an animal.

5. **Update Animal (Logged-in Farmer)**
   - Create a new PUT request in Postman with the `/update_animal/{animal_id}` URL.
   - Use the session token from the farmer login.
   - Add the JSON body for updating the animal.
   - Send the request to update the animal.

6. **Delete Animal (Logged-in Farmer)**
   - Create a new DELETE request in Postman with the `/delete_animal/{animal_id}` URL.
   - Use the session token from the farmer login.
   - Send the request to delete the animal.

7. **Place Order (Logged-in Consumer)**
   - Create a new POST request in Postman with the `/place_order/{animal_id}` URL.
   - Use the session token from the consumer login.
   - Add the JSON body for placing an order.
   - Send the request to place the order.

8. **View Orders (Logged-in Farmer)**
   - Create a new GET request in Postman with the `/view_orders` URL.
   - Use the session token from the farmer login.
   - Send the request to view the orders.

9. **Accept Order (Logged-in Farmer)**
   - Create a new PUT request in Postman with the `/accept_order/{order_id}` URL.
   - Use the session token from the farmer login.
   - Add the JSON body for accepting the order.
   - Send the request to accept the order.

These steps should help you test all the endpoints of your Farmart application using Postman. Make sure you replace `{animal_id}` and `{order_id}` with actual IDs when testing the specific endpoints.
