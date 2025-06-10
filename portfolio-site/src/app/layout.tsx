import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import '@/styles/globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Alex Chen | Full Stack Developer',
    template: '%s | Alex Chen'
  },
  description: 'Full Stack Developer specializing in React, Next.js, and Node.js. Building beautiful, fast, and scalable web applications.',
  keywords: ['Alex Chen', 'Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Portfolio'],
  authors: [{ name: 'Alex Chen' }],
  creator: 'Alex Chen',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alexchen.dev',
    title: 'Alex Chen | Full Stack Developer',
    description: 'Full Stack Developer specializing in React, Next.js, and Node.js. Building beautiful, fast, and scalable web applications.',
    siteName: 'Alex Chen Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alex Chen - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex Chen | Full Stack Developer',
    description: 'Full Stack Developer specializing in React, Next.js, and Node.js.',
    images: ['/og-image.jpg'],
    creator: '@alexchen',
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
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
            <div className="mesh-gradient">
              <Navigation />
              <main className="relative">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}