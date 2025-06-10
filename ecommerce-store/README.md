# E-commerce Store Template

A beautifully designed, modern e-commerce store built with Next.js 15, featuring a stunning product catalog, shopping cart, and responsive design. This template combines form and function with smooth animations and a gorgeous user interface.

## ✨ Features

### 🛍️ Shopping Experience
- **Product Catalog** - Beautiful grid layout with hover animations
- **Shopping Cart** - Persistent cart with Zustand state management
- **Cart Sidebar** - Smooth slide-out cart with item management
- **Featured Products** - Highlighted bestsellers with "Add to Cart" functionality
- **Categories** - Easy navigation between product categories
- **Sale Section** - Promotional content with countdown timer

### 🎨 Design & User Experience
- **Modern Glassmorphism** - Beautiful frosted glass effects
- **Smooth Animations** - Framer Motion transitions throughout
- **Responsive Design** - Mobile-first, works on all screen sizes
- **Dark Mode Support** - Automatic theme switching with next-themes
- **Trust Badges** - Security and guarantee indicators
- **Newsletter Signup** - Email capture with gradient backgrounds

### 🚀 Technical Stack
- **Next.js 15** - Latest React framework with App Router
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **Zustand** - Lightweight state management for cart
- **Framer Motion** - Smooth animations and micro-interactions
- **Lucide React** - Beautiful, consistent iconography

## 🛠️ Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout with providers
│   └── page.tsx             # Home page with all sections
├── components/
│   ├── cart/
│   │   └── cart-sidebar.tsx # Slide-out shopping cart
│   ├── layout/
│   │   ├── footer.tsx       # Site footer with links
│   │   └── header.tsx       # Navigation with cart button
│   ├── sections/
│   │   ├── category-grid.tsx    # Product categories
│   │   ├── featured-products.tsx # Featured products showcase
│   │   ├── hero.tsx             # Hero banner with CTA
│   │   ├── newsletter.tsx       # Email signup section
│   │   ├── sale-section.tsx     # Promotional content
│   │   └── trust-badges.tsx     # Trust indicators
│   ├── ui/
│   │   └── theme-toggle.tsx # Dark/light mode toggle
│   └── providers.tsx        # Theme and other providers
├── lib/
│   ├── data.ts              # Sample product data
│   └── utils.ts             # Utility functions
├── store/
│   └── cart.ts              # Zustand cart state management
├── styles/
│   └── globals.css          # Custom component styles
└── types/
    └── index.ts             # TypeScript type definitions
```

## 🛒 Cart Management

The shopping cart uses Zustand for state management with localStorage persistence:

```typescript
// Add item to cart
const { addItem } = useCartStore()
addItem(product, quantity)

// Remove item
const { removeItem } = useCartStore()
removeItem(productId)

// Update quantity
const { updateQuantity } = useCartStore()
updateQuantity(productId, newQuantity)

// Toggle cart sidebar
const { toggleCart } = useCartStore()
toggleCart()
```

## 🎨 Customization

### Colors and Branding
Update your brand colors in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ee',
          // ... your brand colors
          900: '#9a3412',
        }
      }
    }
  }
}
```

### Products Data
Replace the sample products in `src/lib/data.ts` with your actual product data:

```typescript
export const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Your Product Name",
    price: 99.99,
    originalPrice: 129.99, // Optional for sale items
    category: "Electronics",
    description: "Product description",
    inStock: true,
    rating: 4.5,
    reviews: 128
  }
  // ... more products
]
```

### Newsletter Integration
Connect the newsletter signup in `src/components/sections/newsletter.tsx` to your email service:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  // Add your email service integration here
  // e.g., Mailchimp, ConvertKit, etc.
}
```

## 🚀 Deployment to ForgeKit

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
- ✅ **Dockerfile** - Ready for containerization
- ✅ **Standalone Output** - Configured in `next.config.js`
- ✅ **Static Assets** - Properly optimized for CDN
- ✅ **Environment Variables** - Support for runtime configuration

## 🔧 Environment Variables

Create a `.env.local` file for local development:

```env
# Optional: Analytics tracking
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Optional: Newsletter service
NEWSLETTER_API_KEY=your-newsletter-service-key

# Optional: Payment processing
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

## 📱 Responsive Design

The template is fully responsive with breakpoints:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

All components adapt smoothly across screen sizes with mobile-first design principles.

## 🎭 Animations

Framer Motion provides smooth transitions:
- **Page Transitions** - Fade in effects
- **Cart Sidebar** - Slide animations
- **Product Cards** - Hover scale effects
- **Buttons** - Tap animations
- **Loading States** - Smooth state changes

## 🛡️ Best Practices

- **TypeScript** - Full type safety throughout
- **Accessibility** - ARIA labels and keyboard navigation
- **Performance** - Optimized images and lazy loading
- **SEO** - Proper meta tags and structured data
- **Security** - Input validation and sanitization

## 📈 Performance Optimizations

- **Next.js Image** - Automatic image optimization
- **Code Splitting** - Automatic route-based splitting
- **Bundle Analysis** - `npm run analyze` to check bundle size
- **Compression** - Gzip compression in production
- **Caching** - Optimized caching headers

## 🔮 Future Enhancements

Ready for expansion with:
- **Payment Integration** - Stripe, PayPal, etc.
- **User Authentication** - Login and user accounts
- **Product Search** - Full-text search functionality
- **Inventory Management** - Stock tracking
- **Order Management** - Order history and tracking
- **Admin Dashboard** - Product and order management
- **Reviews & Ratings** - Customer feedback system

## 📞 Support

This template is part of the ForgeKit platform. For support:
- Check the [ForgeKit Documentation](https://forgekit.ai/docs)
- Join our [Discord Community](https://discord.gg/forgekit)
- Contact support at support@forgekit.ai

---

Built with ❤️ for modern e-commerce. Deploy instantly with ForgeKit!