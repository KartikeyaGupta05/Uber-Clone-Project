# Backend API Documentation

## 📌 Endpoint: `/users/register`

### 📋 Description
Registers a new user by creating a user account with the provided information.

### 🧾 HTTP Method
**POST**


---

## 📝 Request Body

The request body should be in **JSON format** and include the following fields:

### 🔹 `fullname` (object):
- **`firstname`** (string, required):  
  User's first name (minimum 3 characters).
  
- **`lastname`** (string, optional):  
  User's last name (minimum 3 characters).

### 🔹 `email` (string, required):  
User's email address (must be a valid email).

### 🔹 `password` (string, required):  
User's password (minimum 6 characters).

---

## 💡 Example Response

### 🔹 `user` (object):
- **`fullName`** (object):
  - **`firstname`** (string):  
  User's first name (minimum 3 characters).
  - **`lastname`** (string):  
  User's last name (minimum 3 characters).

- **`email`** (String):  
User's email address (must be a valid email).

- **`password`** (string):  
User's password (minimum 6 characters).

### 🔹 `token` (String): JWT Token

---


## 💡 Example Request

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePass123"
}
```


---
## 📌 Endpoint: `/users/login`

### 📋 Description
Authenticates a user using their email and password, returning a JWT token upon successful login.

### 🧾 HTTP Method
**POST**

## 📝 Request Body

### 🔹 `email` (string, required): User's email address (must be a valid email).
### 🔹 `password` (string, required): User's password (minimum 6 characters).

---

## 💡 Example Response

### 🔹 `user` (object):
- **`fullName`** (object):
  - **`firstname`** (string):  
  User's first name (minimum 3 characters).
  - **`lastname`** (string):  
  User's last name (minimum 3 characters).

- **`email`** (String):  
User's email address (must be a valid email).

- **`password`** (string):  
User's password (minimum 6 characters).

### 🔹 `token` (String): JWT Token