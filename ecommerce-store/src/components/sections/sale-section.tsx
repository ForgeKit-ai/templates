'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Tag, Clock, ArrowRight } from 'lucide-react'
import { saleProducts } from '@/lib/data'
import { formatPrice, calculateDiscount } from '@/lib/utils'

export function SaleSection() {
  return (
    <section className="section">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-error-100 dark:bg-error-900/30 text-error-600 dark:text-error-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Tag className="w-4 h-4" />
            <span>Limited Time Offer</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Flash <span className="gradient-text">Sale</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Don't miss out on these incredible deals - limited quantities available!
          </p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-4 bg-white dark:bg-gray-900 rounded-xl p-4 shadow-lg"
          >
            <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <div className="flex items-center space-x-2 text-sm font-medium">
              <span className="text-gray-600 dark:text-gray-400">Ends in:</span>
              <div className="flex space-x-1">
                {['23', '14', '05'].map((time, index) => (
                  <div key={index} className="bg-primary-600 text-white px-2 py-1 rounded text-xs font-bold">
                    {time}
                  </div>
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">H : M : S</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {saleProducts.slice(0, 4).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="product-card"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-t-xl bg-gray-100 dark:bg-gray-800 h-48">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                    {product.name.substring(0, 2)}
                  </span>
                </div>
                
                {/* Discount badge */}
                {product.originalPrice && (
                  <div className="absolute top-3 left-3 bg-error-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    -{calculateDiscount(product.originalPrice, product.price)}%
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
                    {product.name}
                  </h3>
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xl text-error-600 dark:text-error-400">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  {product.originalPrice && (
                    <p className="text-xs text-success-600 dark:text-success-400 font-medium">
                      You save {formatPrice(product.originalPrice - product.price)}!
                    </p>
                  )}
                </div>

                {/* Quick Buy */}
                <Link
                  href={`/products/${product.id}`}
                  className="w-full btn-primary btn-sm group"
                >
                  Quick Buy
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/sale"
            className="btn-secondary btn-lg"
          >
            View All Sale Items
          </Link>
        </motion.div>
      </div>
    </section>
  )
}