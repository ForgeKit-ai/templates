import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CartProvider } from '@/components/cart/cart-context'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'ModernShop | Premium E-commerce Experience',
    template: '%s | ModernShop'
  },
  description: 'Discover premium products with modern shopping experience. Fast shipping, quality guarantee, and exceptional customer service.',
  keywords: ['ecommerce', 'shopping', 'premium products', 'online store', 'modern shop'],
  authors: [{ name: 'ModernShop Team' }],
  creator: 'ModernShop',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://modernshop.example.com',
    title: 'ModernShop | Premium E-commerce Experience',
    description: 'Discover premium products with modern shopping experience. Fast shipping, quality guarantee, and exceptional customer service.',
    siteName: 'ModernShop',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ModernShop - Premium E-commerce',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ModernShop | Premium E-commerce Experience',
    description: 'Discover premium products with modern shopping experience.',
    images: ['/og-image.jpg'],
    creator: '@modernshop',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <CartProvider>
            <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
          </CartProvider>
        </Providers>
      </body>
    </html>
  )
}