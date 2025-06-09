# ForgeKit Templates

A collection of production-ready project templates for rapid development and deployment. Each template is carefully crafted with modern best practices, complete documentation, and ready for deployment to ForgeKit or any other platform.

## 🚀 Available Templates

### Full-Stack Applications

#### 1. **React + Express Blog** (`react-express-blog`)
A modern blog application with user authentication, rich text editing, and responsive design.

- **Frontend**: React 18, TypeScript, CSS3
- **Backend**: Express.js, MongoDB, JWT Auth
- **Features**: User auth, CRUD posts, comments, likes, SEO
- **Category**: Blog
- **Difficulty**: Intermediate

#### 2. **Next.js SaaS Starter** (`nextjs-saas-starter`)
Complete SaaS foundation with authentication, billing, and dashboard.

- **Tech**: Next.js 14, TypeScript, Tailwind CSS, Prisma
- **Features**: Stripe billing, NextAuth, dashboard, dark mode
- **Category**: SaaS
- **Difficulty**: Advanced

### Frontend Applications

#### 3. **Vue Dashboard** (`vue-dashboard`)
Modern admin dashboard with charts, data visualization, and responsive design.

- **Tech**: Vue 3, TypeScript, Tailwind CSS, Chart.js
- **Features**: Real-time charts, data tables, dark mode
- **Category**: Dashboard
- **Difficulty**: Intermediate

#### 4. **Portfolio Site** (`portfolio-site`)
Beautiful portfolio website for developers and designers.

- **Tech**: Next.js, Framer Motion, MDX, Tailwind CSS
- **Features**: Project showcase, blog, contact form, animations
- **Category**: Portfolio
- **Difficulty**: Beginner

#### 5. **E-commerce Store** (`ecommerce-store`)
Full-featured online store with payment processing and admin panel.

- **Tech**: Next.js, Stripe, Prisma, NextAuth
- **Features**: Shopping cart, payments, inventory, orders
- **Category**: E-commerce
- **Difficulty**: Advanced

## 📁 Template Structure

Each template includes:

```
template-name/
├── README.md           # Detailed setup instructions
├── package.json        # Dependencies and scripts
├── Dockerfile         # Container configuration
├── .env.example       # Environment variables template
├── src/               # Source code
├── public/            # Static assets
└── docs/              # Additional documentation
```

## 🛠️ Features

### Common Features Across Templates
- **Production Ready**: Optimized for deployment
- **Docker Support**: Containerized for easy deployment
- **Environment Config**: Secure environment variable handling
- **Type Safety**: TypeScript support where applicable
- **Modern Tooling**: Latest versions of frameworks and libraries
- **Best Practices**: Clean code, proper error handling, security
- **Documentation**: Comprehensive setup and customization guides

### Security Features
- Input validation and sanitization
- Authentication and authorization
- CORS configuration
- Rate limiting
- Secure headers
- Environment variable protection

### Performance Features
- Code splitting and optimization
- Image optimization
- Caching strategies
- Lazy loading
- Bundle size optimization
- CDN ready

## 🚀 Quick Start

### Using with ForgeKit CLI

```bash
# Install ForgeKit CLI
npm install -g @forgekit/cli

# Deploy a template directly
forge deploy --template react-express-blog

# Or scaffold locally first
forge create --template nextjs-saas-starter my-saas-app
cd my-saas-app
forge deploy
```

### Manual Setup

```bash
# Clone template
git clone <template-repo-url>
cd template-name

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your values

# Start development
npm run dev
```

### Docker Deployment

```bash
# Build and run with Docker
docker build -t my-app .
docker run -p 3000:3000 my-app
```

## 🎨 Customization

Each template is designed to be easily customizable:

1. **Branding**: Update colors, fonts, and logos
2. **Content**: Replace placeholder content with your own
3. **Features**: Add or remove functionality as needed
4. **Styling**: Modify CSS/styling to match your design
5. **Configuration**: Adjust settings and environment variables

## 📚 Documentation

### Template-Specific Docs
- Each template has detailed README with setup instructions
- API documentation for backend templates
- Component documentation for frontend templates
- Deployment guides for various platforms

### General Resources
- [Template Development Guidelines](docs/development.md)
- [Contribution Guide](docs/contributing.md)
- [Best Practices](docs/best-practices.md)
- [Troubleshooting](docs/troubleshooting.md)

## 🌐 Deployment Options

### Recommended Platforms
- **ForgeKit**: One-click deployment with the CLI
- **Vercel**: Great for Next.js and static sites
- **Railway**: Excellent for full-stack applications
- **Netlify**: Perfect for frontend applications
- **Docker**: Deploy anywhere with container support

### Database Options
- **PostgreSQL**: Recommended for production
- **MongoDB**: Great for document-based apps
- **SQLite**: Good for development and small apps
- **Supabase**: Managed PostgreSQL with real-time features

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Adding New Templates
1. Follow the [Template Guidelines](docs/template-guidelines.md)
2. Ensure production readiness
3. Include comprehensive documentation
4. Add tests where applicable
5. Submit a pull request

### Improving Existing Templates
- Bug fixes and security updates
- Performance optimizations
- Feature enhancements
- Documentation improvements

### Template Ideas
- Mobile app templates (React Native, Flutter)
- API-only templates (FastAPI, Express, Go)
- Static site generators (Astro, Gatsby)
- Specialized apps (CRM, Blog platforms, Forums)

## 📊 Template Statistics

| Template | Downloads | Stars | Last Updated |
|----------|-----------|-------|--------------|
| React Express Blog | 🔄 Loading | ⭐ Loading | 📅 Loading |
| Next.js SaaS Starter | 🔄 Loading | ⭐ Loading | 📅 Loading |
| Vue Dashboard | 🔄 Loading | ⭐ Loading | 📅 Loading |
| Portfolio Site | 🔄 Loading | ⭐ Loading | 📅 Loading |
| E-commerce Store | 🔄 Loading | ⭐ Loading | 📅 Loading |

## 🆘 Support

### Getting Help
- 📖 Check template README files
- 🐛 Report issues on GitHub
- 💬 Join our Discord community
- 📧 Email support for urgent issues

### Community
- Share your projects built with these templates
- Contribute improvements and bug fixes
- Suggest new template ideas
- Help other developers in discussions

## 📄 License

All templates are released under the MIT License. Feel free to use them for personal and commercial projects.

---

**Happy coding!** 🎉

Built with ❤️ by the ForgeKit team and community contributors.