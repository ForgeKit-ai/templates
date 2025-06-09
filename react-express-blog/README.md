# React Express Blog

A modern, full-stack blog application built with React and Express. Features a clean, responsive design with CRUD operations for blog posts, user authentication, and a modern UI.

## 🚀 Features

- **Modern React Frontend** with hooks and functional components
- **Express.js Backend** with RESTful API
- **MongoDB** for data persistence
- **User Authentication** with JWT tokens
- **Responsive Design** with CSS Grid and Flexbox
- **Rich Text Editor** for blog post creation
- **Image Upload** support
- **SEO Friendly** with meta tags and proper routing
- **Dark/Light Mode** toggle

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router, Axios
- **Backend**: Express.js, JWT, bcrypt
- **Database**: MongoDB with Mongoose
- **Styling**: CSS3 with CSS Variables
- **Deployment**: Docker ready

## 📦 Quick Start

1. **Install dependencies**:
   ```bash
   npm run install-deps
   ```

2. **Set up environment variables**:
   - Copy `.env.example` to `.env` in the server directory
   - Add your MongoDB URI and JWT secret

3. **Run in development**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## 🌐 API Endpoints

- `GET /api/posts` - Get all blog posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (auth required)
- `PUT /api/posts/:id` - Update post (auth required)
- `DELETE /api/posts/:id` - Delete post (auth required)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

## 📝 Environment Variables

```env
MONGODB_URI=mongodb://localhost:27017/blog
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=production
```

## 🐳 Docker Deployment

The application includes a Dockerfile for easy deployment to any containerized environment including ForgeKit.

```bash
docker build -t react-express-blog .
docker run -p 5000:5000 react-express-blog
```

## 📄 License

MIT License - feel free to use this template for your projects!