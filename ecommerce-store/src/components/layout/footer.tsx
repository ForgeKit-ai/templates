'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  CreditCard,
  Truck,
  Shield,
  Award
} from 'lucide-react'
import { storeInfo } from '@/lib/data'

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/products' },
    { name: 'Featured', href: '/featured' },
    { name: 'Sale', href: '/sale' },
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Categories', href: '/categories' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'Size Guide', href: '/size-guide' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Blog', href: '/blog' },
    { name: 'Sustainability', href: '/sustainability' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Accessibility', href: '/accessibility' },
    { name: 'Sitemap', href: '/sitemap' },
  ],
}

const socialLinks = [
  { name: 'Facebook', href: storeInfo.social.facebook, icon: Facebook },
  { name: 'Twitter', href: storeInfo.social.twitter, icon: Twitter },
  { name: 'Instagram', href: storeInfo.social.instagram, icon: Instagram },
  { name: 'YouTube', href: '#', icon: Youtube },
]

const paymentMethods = [
  'Visa', 'Mastercard', 'American Express', 'PayPal', 'Apple Pay', 'Google Pay'
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                  M
                </div>
                <span className="text-xl font-bold text-white">ModernShop</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                {storeInfo.description}
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-400" />
                <span className="text-sm">{storeInfo.contact.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-400" />
                <span className="text-sm">{storeInfo.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span className="text-sm">{storeInfo.contact.address}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-gray-800 hover:bg-primary-600 rounded-lg transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-white mb-4">Shop</h4>
              <ul className="space-y-2">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, text: 'Free Shipping Over $75' },
              { icon: Shield, text: 'Secure Payment' },
              { icon: Award, text: 'Quality Guarantee' },
              { icon: CreditCard, text: 'Easy Returns' },
            ].map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <feature.icon className="w-5 h-5 text-primary-400" />
                <span className="text-sm text-gray-400">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-gray-400">
                © {currentYear} ModernShop. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-500">Payment methods:</span>
                <div className="flex space-x-2">
                  {paymentMethods.slice(0, 4).map((method) => (
                    <div
                      key={method}
                      className="w-8 h-5 bg-gray-700 rounded text-xs flex items-center justify-center text-gray-400"
                    >
                      {method.substring(0, 2)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="text-xs text-gray-500">
              Built with ❤️ using ForgeKit
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}