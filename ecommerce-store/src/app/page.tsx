import { HeroSection } from '@/components/sections/hero'
import { FeaturedProducts } from '@/components/sections/featured-products'
import { CategoryGrid } from '@/components/sections/category-grid'
import { SaleSection } from '@/components/sections/sale-section'
import { Newsletter } from '@/components/sections/newsletter'
import { TrustBadges } from '@/components/sections/trust-badges'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TrustBadges />
      <FeaturedProducts />
      <CategoryGrid />
      <SaleSection />
      <Newsletter />
    </div>
  )
}