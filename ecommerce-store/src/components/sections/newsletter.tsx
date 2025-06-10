'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Gift, ArrowRight } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    setIsSubscribed(true)
    setEmail('')
  }

  return (
    <section className="section bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
              <Gift className="w-4 h-4" />
              <span>Exclusive Offer</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Get 15% Off Your First Order
              </h2>
              <p className="text-xl text-white/90 leading-relaxed">
                Subscribe to our newsletter and be the first to know about new products, 
                exclusive deals, and special promotions.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              {[
                'Early access to sales and new arrivals',
                'Exclusive subscriber-only discounts',
                'Product recommendations just for you',
                'Unsubscribe anytime, no spam ever',
              ].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <div className="w-2 h-2 bg-white rounded-full flex-shrink-0" />
                  <span className="text-white/90">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Join Our Newsletter</h3>
                    <p className="text-white/80 text-sm">
                      50,000+ subscribers already enjoy our exclusive content
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full pl-12 pr-4 py-3 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-white text-primary-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center group"
                    >
                      Subscribe & Get 15% Off
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>

                  <p className="text-xs text-white/70 text-center">
                    By subscribing, you agree to our Privacy Policy and Terms of Service.
                  </p>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-success-500 rounded-full flex items-center justify-center mx-auto">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Welcome Aboard! 🎉</h3>
                    <p className="text-white/80">
                      Check your email for your 15% discount code and start saving today!
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-warning-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg"
            >
              15% OFF
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}