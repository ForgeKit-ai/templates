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

## 🚀 Deployment

### ForgeKit Deployment (Recommended)

This template is optimized for ForgeKit deployment:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy with ForgeKit CLI:**
   ```bash
   forge deploy
   ```

The template includes:
- ✅ **Dockerfile** - Multi-stage build for React + Express
- ✅ **Health Checks** - Built-in health monitoring
- ✅ **Production Build** - Optimized React client build
- ✅ **Non-root User** - Security compliant containerization
- ✅ **Signal Handling** - Proper process management with dumb-init

### Environment Variables for ForgeKit
```env
# Database (Required)
MONGODB_URI=mongodb://your-mongodb-host:27017/blog

# Authentication (Required)
JWT_SECRET=your-jwt-secret-key

# Server Configuration
PORT=5000
NODE_ENV=production

# Optional: Upload configuration
UPLOAD_PATH=/app/uploads
MAX_FILE_SIZE=5mb
```

### Docker Deployment

```bash
docker build -t react-express-blog .
docker run -p 5000:5000 react-express-blog
```

### Other Platforms
Deploy to any Node.js hosting platform with MongoDB support like Railway, Render, or Heroku.

## 🔧 ForgeKit Features

This template leverages ForgeKit's capabilities:
- **Automatic SSL** - HTTPS enabled by default
- **Custom Domains** - Easy domain configuration
- **Resource Monitoring** - Built-in performance tracking
- **Log Management** - Centralized logging and monitoring
- **Auto-scaling** - Handles traffic spikes automatically

## 📄 License

MIT License - feel free to use this template for your projects!

## 📞 Support

This is a ForgeKit template. For support:
- Check the [ForgeKit Documentation](https://forgekit.ai/docs)
- Join our [Discord Community](https://discord.gg/forgekit)
- Contact support at support@forgekit.ai

---

**Built with ❤️ for the ForgeKit community**