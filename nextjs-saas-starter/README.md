# Next.js SaaS Starter

A complete SaaS starter template built with Next.js 14, featuring authentication, Stripe billing, user dashboard, and modern UI components. Perfect for launching your next SaaS product quickly.

## 🚀 Features

### Core Features
- **Next.js 14** with App Router and Server Components
- **TypeScript** for type safety
- **Tailwind CSS** for beautiful, responsive design
- **Prisma** ORM with PostgreSQL
- **NextAuth.js** for authentication (Email, Google, GitHub)
- **Stripe** integration for subscriptions and billing
- **Dark/Light mode** with system preference detection

### Authentication & Authorization
- Email/password authentication
- OAuth providers (Google, GitHub)
- Protected routes and middleware
- User session management
- Role-based access control

### Billing & Subscriptions
- Stripe Customer Portal
- Subscription plans (Free, Pro, Enterprise)
- Usage-based billing
- Webhook handling
- Invoice management

### Dashboard & UI
- Modern dashboard with charts and metrics
- Responsive design for all devices
- Beautiful UI components with Headless UI
- Loading states and error handling
- Form validation with React Hook Form + Zod

### Developer Experience
- Full TypeScript support
- ESLint and Prettier configuration
- Hot reload in development
- Type-safe database queries
- Comprehensive error handling

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **UI Components**: Headless UI + Heroicons
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Animations**: Framer Motion

## 📦 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your environment variables (see Environment Variables section)

3. **Set up the database**:
   ```bash
   npm run db:push
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 🌐 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/saas_db"

# NextAuth.js
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Email (Optional - for transactional emails)
EMAIL_SERVER_USER="your-email"
EMAIL_SERVER_PASSWORD="your-password"
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_FROM="noreply@yourapp.com"
```

## 🔑 Authentication Setup

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`

### GitHub OAuth
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

## 💳 Stripe Setup

1. **Create Stripe account** at [stripe.com](https://stripe.com)
2. **Get API keys** from Stripe Dashboard
3. **Create products and prices** in Stripe Dashboard
4. **Set up webhook endpoint**: `https://yourdomain.com/api/webhooks/stripe`
5. **Configure webhook events**:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

## 📊 Database Schema

The application uses Prisma with PostgreSQL. Key models include:

- **User**: User accounts and profiles
- **Account**: OAuth account connections
- **Session**: User sessions
- **Subscription**: Stripe subscription data
- **Usage**: Track feature usage for billing

## 🎨 Customization

### Brand Colors
Update your brand colors in `tailwind.config.js`:

```javascript
colors: {
  brand: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    // ... add your brand colors
  }
}
```

### Logo and Branding
- Replace logo in `public/logo.svg`
- Update site metadata in `app/layout.tsx`
- Customize email templates in `components/emails/`

## 🚀 Deployment

### ForgeKit Deployment (Recommended)

This template is optimized for ForgeKit deployment with:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy with ForgeKit CLI:**
   ```bash
   forge deploy
   ```

The template includes:
- ✅ **Dockerfile** - Multi-stage build with Prisma support
- ✅ **Standalone Output** - Configured in `next.config.js`
- ✅ **Health Checks** - Built-in health monitoring at `/api/health`
- ✅ **Security Headers** - Production-ready security configuration
- ✅ **Database Ready** - Prisma client generation included
- ✅ **Non-root User** - Security compliant containerization

### Environment Variables for ForgeKit
```env
# Database (Required)
DATABASE_URL="postgresql://username:password@hostname:5432/database"

# NextAuth.js (Required)
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="https://your-app.forgekit.ai"

# Stripe (Required for billing)
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

### Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

### Docker
```bash
docker build -t nextjs-saas .
docker run -p 3000:3000 nextjs-saas
```

### Other Platforms
The app can be deployed to any Node.js hosting platform like Railway, Render, or DigitalOcean.

## 📋 Features Roadmap

- [ ] Team management and collaboration
- [ ] Advanced analytics dashboard
- [ ] API key management
- [ ] Multi-tenant architecture
- [ ] Advanced notification system
- [ ] Audit logs
- [ ] Advanced billing features (usage tracking, metered billing)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔧 ForgeKit Integration

This SaaS starter is designed to leverage ForgeKit's full platform:
- **Automatic SSL** - HTTPS enabled for all deployments
- **Custom Domains** - Professional domain configuration
- **Database Hosting** - Managed PostgreSQL available
- **Stripe Integration** - Optimized for SaaS billing
- **Resource Monitoring** - Track usage and performance
- **Auto-scaling** - Handle growth automatically

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

This is a ForgeKit template. For support:
- Check the [ForgeKit Documentation](https://forgekit.ai/docs)
- Join our [Discord Community](https://discord.gg/forgekit)
- Contact support at support@forgekit.ai

---

**Happy building with ForgeKit!** 🎉