import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/providers/auth-provider'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SaaS Starter - Build Your SaaS Fast',
  description: 'A comprehensive SaaS starter with authentication, billing, and dashboard',
  keywords: ['SaaS', 'Next.js', 'TypeScript', 'Stripe', 'Authentication'],
  authors: [{ name: 'ForgeKit' }],
  creator: 'ForgeKit',
  metadataBase: new URL('https://your-domain.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'SaaS Starter',
    description: 'Build your SaaS application fast',
    siteName: 'SaaS Starter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaaS Starter',
    description: 'Build your SaaS application fast',
    creator: '@yourusername',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}