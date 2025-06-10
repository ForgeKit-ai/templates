'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { formatPrice, getImageUrl } from '@/lib/utils'

export function CartSidebar() {
  const { 
    items, 
    isOpen, 
    closeCart, 
    updateQuantity, 
    removeItem, 
    getSubtotal,
    getTotalSavings 
  } = useCartStore()

  const subtotal = getSubtotal()
  const savings = getTotalSavings()
  const shipping = subtotal > 75 ? 0 : 9.99
  const total = subtotal + shipping

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-950 shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="text-lg font-semibold">
                  Your Cart ({items.length})
                </h2>
              </div>
              <motion.button
                onClick={closeCart}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Content */}
            {items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Start shopping to add items to your cart
                  </p>
                  <motion.button
                    onClick={closeCart}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary btn-lg"
                  >
                    Continue Shopping
                  </motion.button>
                </div>
              </div>
            ) : (
              <>
                {/* Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex space-x-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4"
                    >
                      {/* Image */}
                      <div className="relative w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 flex items-center justify-center">
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {item.name.substring(0, 2)}
                          </span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                          SKU: {item.sku}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                              {formatPrice(item.price)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-xs text-gray-500 line-through">
                                {formatPrice(item.originalPrice)}
                              </span>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2">
                            <motion.button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                            >
                              <Minus className="w-3 h-3" />
                            </motion.button>
                            
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            
                            <motion.button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                            >
                              <Plus className="w-3 h-3" />
                            </motion.button>
                            
                            <motion.button
                              onClick={() => removeItem(item.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded"
                            >
                              <Trash2 className="w-3 h-3" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Summary */}
                <div className="border-t border-gray-200 dark:border-gray-800 p-6 space-y-4">
                  {/* Free Shipping Notice */}
                  {subtotal < 75 && (
                    <div className="text-center p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                      <p className="text-sm text-primary-600 dark:text-primary-400">
                        Add {formatPrice(75 - subtotal)} more for free shipping!
                      </p>
                    </div>
                  )}

                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span className="text-gray-900 dark:text-gray-100">{formatPrice(subtotal)}</span>
                    </div>
                    
                    {savings > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Savings</span>
                        <span className="text-success-600 dark:text-success-400">
                          -{formatPrice(savings)}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                      <span className="text-gray-900 dark:text-gray-100">
                        {shipping === 0 ? 'Free' : formatPrice(shipping)}
                      </span>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-800 pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Link
                      href="/checkout"
                      onClick={closeCart}
                      className="block w-full btn-primary btn-lg text-center"
                    >
                      Checkout
                    </Link>
                    <button
                      onClick={closeCart}
                      className="w-full btn-secondary btn-md"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}