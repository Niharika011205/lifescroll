# MERN Stack Blog Backend

A complete backend API for a blog application built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: JWT-based authentication with register, login, and profile endpoints
- **Post Management**: Full CRUD operations for blog posts
- **Comment System**: Nested comments with replies
- **Like System**: Users can like/unlike posts
- **Admin Features**: Admin users have additional permissions
- **Security**: Password hashing with bcrypt, JWT tokens, input validation

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- express-validator for input validation

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mern-blog
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)

### Posts
- `GET /api/posts` - Get all posts (with pagination)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (Protected)
- `PUT /api/posts/:id` - Update post (Author only)
- `DELETE /api/posts/:id` - Delete post (Author only)
- `POST /api/posts/:id/like` - Like/Unlike post (Protected)
- `GET /api/posts/user/:userId` - Get posts by user

### Comments
- `GET /api/comments/post/:postId` - Get comments for a post
- `POST /api/comments` - Create new comment (Protected)
- `PUT /api/comments/:id` - Update comment (Author only)
- `DELETE /api/comments/:id` - Delete comment (Author only)

## Usage Examples

### Register a new user
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create a new post
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My First Post",
    "content": "This is the content of my first post.",
    "tags": ["javascript", "nodejs"]
  }'
```

## Project Structure

```
├── models/
│   ├── User.js          # User model
│   ├── Post.js          # Post model
│   └── Comment.js       # Comment model
├── routes/
│   ├── auth.js          # Authentication routes
│   ├── posts.js         # Post routes
│   └── comments.js      # Comment routes
├── middleware/
│   └── auth.js          # Authentication middleware
├── server.js            # Main server file
├── package.json
└── README.md
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- Protected routes with middleware
- Role-based access control (Admin/User)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request