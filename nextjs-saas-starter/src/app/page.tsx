import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { Header } from '@/components/layout/header'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
    </div>
  )
}