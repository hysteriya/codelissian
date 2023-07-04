# User API

This is a Node.js API for user management, built using Express.js and MongoDB. The API provides endpoints for user signup, login, profile retrieval, updating user data, and deleting user accounts. It incorporates JWT authentication for secure access to protected routes.

## Requirements

To run this API locally, you need to have the following software installed on your machine:

- Node.js
- MongoDB

## Getting Started

1. Clone the repository:

```
git clone <repository-url>
```

2. Install dependencies:

```
cd user-api
npm install
```

3. Configure the Database:

   - Update the MongoDB connection URL in the `usermodel.js` file:
     ```javascript
     const dbLink = 'mongodb://<username>:<password>@<host>/<database>';
     ```

4. Start the server:

```
npm start
```

The server will start running at `http://localhost:3000`.

## API Endpoints

### Signup

Create a new user account.

- **Endpoint**: `/user/signup`
- **Method**: `POST`
- **Request Body**:

  ```json
  {
    "name": "John Doe",
    "role": "user",
    "password": "password123"
  }
  ```

### Login

Authenticate a user and obtain an access token.

- **Endpoint**: `/user/login`
- **Method**: `POST`
- **Request Body**:

  ```json
  {
    "name": "John Doe",
    "password": "password123"
  }
  ```

### Get User Profile

Retrieve user profile information.

- **Endpoint**: `/user/profile`
- **Method**: `GET`
- **Authorization Header**: `Bearer <access-token>`

### Update User

Update user information.

- **Endpoint**: `/user/profile`
- **Method**: `PATCH`
- **Authorization Header**: `Bearer <access-token>`
- **Request Body**: Any fields to be updated

### Delete User

Delete a user account.

- **Endpoint**: `/user/profile`
- **Method**: `DELETE`
- **Authorization Header**: `Bearer <access-token>`

## Authentication

This API uses JWT (JSON Web Tokens) for authentication. After successful login, the server issues an access token that should be included in the Authorization header of subsequent requests.

Example Authorization Header:

```
Authorization: Bearer <access-token>
```

If the access token expires, the client should use the refresh token to obtain a new access token by sending a request to the `/user/refresh-token` endpoint.

## Error Handling

Errors are returned in a JSON format with the following structure:

```json
{
  "error": "Error message"
}
```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

---

Please customize the README file to include any additional information or instructions specific to your project.
