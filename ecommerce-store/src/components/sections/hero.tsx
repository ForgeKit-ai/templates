'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Star, ShoppingBag, Truck, Shield } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950/20 py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-400" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium"
            >
              <Star className="w-4 h-4 fill-current" />
              <span>Trusted by 50,000+ customers</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                Premium Products,{' '}
                <span className="gradient-text">Modern Experience</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                Discover our curated collection of premium products with exceptional quality, 
                fast shipping, and a shopping experience you'll love.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center btn-primary btn-lg group"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Shop Now
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/categories"
                  className="btn-secondary btn-lg"
                >
                  Browse Categories
                </Link>
              </motion.div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-6 pt-8"
            >
              {[
                { icon: Truck, text: 'Free shipping over $75' },
                { icon: Shield, text: '30-day easy returns' },
                { icon: Star, text: 'Quality guarantee' },
              ].map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-400"
                >
                  <feature.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              {/* Background decoration */}
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl blur-2xl opacity-20"
              />
              
              {/* Main visual container */}
              <div className="relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl">
                {/* Product grid preview */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'Headphones', price: '$299', color: 'from-primary-500 to-primary-600' },
                    { name: 'Smart Watch', price: '$449', color: 'from-secondary-500 to-secondary-600' },
                    { name: 'Camera Lens', price: '$1299', color: 'from-primary-600 to-secondary-500' },
                    { name: 'Sneakers', price: '$159', color: 'from-secondary-600 to-primary-500' },
                  ].map((product, index) => (
                    <motion.div
                      key={product.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 cursor-pointer group"
                    >
                      <div className={`w-full h-24 bg-gradient-to-br ${product.color} rounded-xl mb-3 flex items-center justify-center text-white font-bold text-xs group-hover:scale-105 transition-transform`}>
                        {product.name.substring(0, 2)}
                      </div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                        {product.name}
                      </h4>
                      <p className="text-sm font-bold text-primary-600 dark:text-primary-400">
                        {product.price}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Floating elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 bg-success-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg"
                >
                  50% OFF
                </motion.div>
                
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  className="absolute -bottom-4 -left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg"
                >
                  Free Shipping
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}