# Portfolio Site

A stunning, modern portfolio website built with Next.js, Framer Motion, and Tailwind CSS. Perfect for developers, designers, and creative professionals to showcase their work.

## 🚀 Features

- **Modern Design** with smooth animations and glassmorphism effects
- **Responsive Layout** that works perfectly on all devices
- **Dark/Light Mode** with system preference detection
- **Interactive Sections** with scroll-triggered animations
- **Project Showcase** with filterable categories and detailed cards
- **Contact Form** with validation and success states
- **SEO Optimized** with proper meta tags and sitemap
- **Performance Optimized** with Next.js 14 and standalone builds
- **TypeScript** for type safety and better development experience

## 🎨 Sections

- **Hero Section** with animated typing effect and gradient backgrounds
- **About Section** with personal story, values, and fun facts
- **Experience Section** with timeline and detailed achievements
- **Skills Section** with animated progress bars and technology cloud
- **Projects Section** with featured projects and filtering
- **Contact Section** with working form and multiple contact methods

## 🛠️ Tech Stack

- **Next.js 14** with App Router and standalone output
- **TypeScript** for type safety
- **Tailwind CSS** with custom design system
- **Framer Motion** for smooth animations
- **Lucide React** for beautiful icons
- **next-themes** for theme switching
- **react-intersection-observer** for scroll animations
- **react-type-animation** for typing effects

## 📦 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

4. **Build for ForgeKit deployment**:
   ```bash
   npm run build:standalone
   ```

## ✨ Customization

### Personal Information
Edit `src/lib/data.ts` to update:
- Personal details (name, email, phone, location)
- Social media links
- Bio and description
- Skills and experience
- Projects and achievements

### Styling
- Customize colors in `tailwind.config.js`
- Modify animations and effects in `src/styles/globals.css`
- Update component styles in individual section files

### Images
Replace placeholder images in `public/` directory:
- `profile.jpg` - Your profile photo
- `og-image.jpg` - Open Graph image for social sharing
- `resume.pdf` - Your resume/CV file
- Project images in `projects/` folder

### Content
- Update meta information in `src/app/layout.tsx`
- Modify sections in `src/components/sections/`
- Add new projects to the projects array in `data.ts`
- Customize contact methods and social links

## 🌐 Deployment

### ForgeKit Deployment
This template is optimized for ForgeKit infrastructure:

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy with ForgeKit CLI**:
   ```bash
   forge deploy
   ```

The included `Dockerfile` and `next.config.js` are configured for optimal deployment on ForgeKit with:
- Standalone output for efficient containerization
- Optimized image handling
- Proper port configuration (3000)
- Production-ready settings

### Other Platforms
Also deployable to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Any Docker-compatible platform**

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:
```env
# Optional: Add any API keys or configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Features
Toggle features in `src/lib/data.ts`:
```typescript
export const config = {
  features: {
    blog: false, // Enable when blog is implemented
    testimonials: false, // Enable when testimonials are added
    analytics: true, // Enable analytics tracking
  }
}
```

## 📱 Responsive Design

The portfolio is fully responsive with:
- Mobile-first approach
- Optimized navigation for all screen sizes
- Touch-friendly interactions
- Proper typography scaling
- Performance optimization for mobile devices

## ⚡ Performance

Built with performance in mind:
- Next.js 14 with App Router
- Optimized images and fonts
- Efficient animations with Framer Motion
- Minimal bundle size
- Fast loading times
- SEO optimization

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

This is a ForgeKit template. If you find bugs or have suggestions:
1. Open an issue on the ForgeKit repository
2. Submit a pull request with improvements
3. Share your customized version with the community

---

**Made with ❤️ for the ForgeKit community**