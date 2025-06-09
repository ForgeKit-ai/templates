# Vue Dashboard

A modern, fully-featured dashboard built with Vue 3, TypeScript, and Tailwind CSS. Perfect for admin panels, analytics dashboards, and data management interfaces.

## 🚀 Features

- **Vue 3** with Composition API and TypeScript
- **Tailwind CSS** for beautiful, responsive styling
- **Chart.js & Vue-ChartJS** for interactive data visualization
- **Vue Router** for client-side routing
- **Pinia** for state management
- **Heroicons** for consistent iconography
- **Form Validation** with Vee-Validate and Yup
- **Responsive Design** that works on all devices
- **Production Ready** with Docker deployment

## 📦 Pages Included

- **Dashboard** - Overview with stats, charts, and recent activity
- **Analytics** - Detailed metrics with traffic sources and engagement data
- **Users** - User management with search, filtering, and CRUD operations
- **Settings** - Complete settings panel with profile, security, and preferences

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone or download this template
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

## 🏗️ Building for Production

```bash
npm run build
npm run preview  # Preview the production build locally
```

## 🐳 Docker Deployment

Build and run with Docker:

```bash
docker build -t vue-dashboard .
docker run -p 80:80 vue-dashboard
```

The app will be available at [http://localhost](http://localhost)

## 📁 Project Structure

```
src/
├── components/          # Reusable components
├── layouts/            # Layout components
├── views/              # Page components
├── router/             # Vue Router configuration
├── stores/             # Pinia stores (if needed)
└── types/              # TypeScript type definitions
```

## 🎨 Customization

### Themes
- Edit `tailwind.config.js` to customize colors and theme
- Modify CSS custom properties in `src/style.css`

### Charts
- Chart configurations are in each view component
- Easily customizable with Chart.js options

### Navigation
- Update `src/layouts/DashboardLayout.vue` to modify sidebar navigation
- Add new routes in `src/router/index.ts`

## 📊 Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Flexible JavaScript charting
- **Vue Router** - Client-side routing
- **Pinia** - Vue state management
- **Vite** - Fast build tool
- **Nginx** - Production web server

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - TypeScript type checking
- `npm run lint` - Lint and fix code

## 📈 Performance

- **Lazy Loading** - Routes are loaded on demand
- **Tree Shaking** - Unused code is eliminated
- **Code Splitting** - Optimized bundle sizes
- **Asset Optimization** - Images and fonts are optimized

## 🔒 Security Features

- **CSP Headers** - Content Security Policy enabled
- **XSS Protection** - Cross-site scripting protection
- **Frame Options** - Clickjacking protection
- **HTTPS Ready** - SSL/TLS ready configuration

## 📝 License

MIT License - feel free to use this template for any project!

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Built with ❤️ using Vue 3 and modern web technologies**