'use client'

import { motion } from 'framer-motion'
import { Star, ShoppingBag, Heart } from 'lucide-react'
import Link from 'next/link'
import { featuredProducts } from '@/lib/data'
import { useCartStore } from '@/store/cart'
import { formatPrice, getImageUrl } from '@/lib/utils'

export function FeaturedProducts() {
  const { addItem } = useCartStore()

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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Products</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our most popular and highest-rated products
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="product-card group"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-t-xl bg-gray-100 dark:bg-gray-800 h-48">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                    {product.name.substring(0, 2)}
                  </span>
                </div>
                
                {/* Sale badge */}
                {product.originalPrice && (
                  <div className="absolute top-3 left-3 bg-error-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Sale
                  </div>
                )}

                {/* Wishlist button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-900 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </motion.button>

                {/* Quick view overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link
                    href={`/products/${product.id}`}
                    className="btn-primary btn-sm"
                  >
                    Quick View
                  </Link>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {product.category}
                  </p>
                </div>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating!)
                              ? 'text-warning-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ({product.reviews})
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Add to Cart */}
                <motion.button
                  onClick={() => addItem(product)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary btn-sm group"
                  disabled={!product.inStock}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/products"
            className="btn-secondary btn-lg"
          >
            View All Products
          </Link>
        </motion.div>
      </div>
    </section>
  )
}