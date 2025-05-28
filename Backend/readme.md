# /users/register Endpoint Documentation

## Description
Registers a new user. The endpoint validates required fields and creates the user in the database. On success, it returns a JWT token along with user details.

## Endpoint
**POST** `/users/register`

## Request Body
- **fullname.firstname**: string (Required, minimum 3 characters)
- **fullname.lastname**: string (Optional, if provided should be at least 3 characters)
- **email**: string (Required, valid email)
- **password**: string (Required, minimum 6 characters)

### Example Responses

-'user(object);
-'fullname'(object),
  -'firstname'(string):User's firstname (minimum 3 characters),
  -'lastname'(string):User's lastname (minimum 3 characters),
-'email'(string):User's email address (must be valid email),
-'password'(string):User's password (minimum 6 characters),
-'token'(String):JWT Token

### Success
- **Status Code**: 201
- **Body**:
  ```json
  {
    "token": "string",
    "user": { /* user details object */ }
  }
  ```

# /users/profile Endpoint Documentation

## Description
Retrieves the profile information of the authenticated user.

## Endpoint
**GET** `/users/profile`

## Authentication
Requires JWT token in Authorization header or cookies

### Example Response

### Success
- **Status Code**: 200
- **Body**:
  ```json
  {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "createdAt": "date",
    "_id": "string"
  }
  ```

### Error
- **Status Code**: 401
- **Body**:
  ```json
  {
    "message": "Unauthorized"
  }
  ```

# /users/logout Endpoint Documentation

## Description
Logs out the current user by invalidating their JWT token.

## Endpoint
**POST** `/users/logout`

## Authentication
Requires JWT token in Authorization header or cookies

### Example Response

### Success
- **Status Code**: 200
- **Body**:
  ```json
  {
    "message": "Logout successful"
  }
  ```

### Error
- **Status Code**: 401
- **Body**:
  ```json
  {
    "message": "Unauthorized"
  }
  ```

# Captain API Documentation

## Register Captain
Register a new captain with vehicle details.

### Endpoint
**POST** `/captains/register`

### Request Body
```json
{
  "fullname": {
    "firstname": "string (Required)",
    "lastname": "string (Required)"
  },
  "email": "string (Required, valid email)",
  "password": "string (Required, min 6 characters)",
  "vehicle": {
    "color": "string (Required)",
    "plate": "string (Required)",
    "capacity": "number (Required)",
    "vehicleType": "string (Required)"
  }
}
```

### Validation Rules
- firstname: Required
- lastname: Required
- email: Must be valid email format
- password: Minimum 6 characters
- vehicle.color: Required
- vehicle.plate: Required
- vehicle.capacity: Must be numeric
- vehicle.vehicleType: Required

### Success Response
- **Status Code**: 201
- **Body**:
  ```json
  {
    "token": "string",
    "captain": {
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string",
      "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": "number",
        "vehicleType": "string"
      },
      "createdAt": "date",
      "_id": "string"
    }
  }
  ```

### Error Response
- **Status Code**: 400
- **Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field_name"
      }
    ]
  }
  ```
