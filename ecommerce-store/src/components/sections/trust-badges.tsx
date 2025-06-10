'use client'

import { motion } from 'framer-motion'
import { Shield, Truck, RotateCcw, Headphones, Award, Clock } from 'lucide-react'

const trustBadges = [
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '256-bit SSL encryption',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $75',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day return policy',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Expert customer service',
  },
  {
    icon: Award,
    title: 'Quality Guarantee',
    description: 'Premium products only',
  },
  {
    icon: Clock,
    title: 'Fast Delivery',
    description: '2-3 business days',
  },
]

export function TrustBadges() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <badge.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1">
                {badge.title}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}