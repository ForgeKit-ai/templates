'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/alexchen',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/alexchen',
    icon: Linkedin,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/alexchen',
    icon: Twitter,
  },
  {
    name: 'Email',
    href: 'mailto:hello@alexchen.dev',
    icon: Mail,
  },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
      <div className="container-custom py-12">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          {/* Logo and tagline */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                A
              </div>
              <span className="text-lg font-bold gradient-text">Alex Chen</span>
            </motion.div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center md:text-left">
              Building beautiful digital experiences
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                aria-label={link.name}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center space-x-1">
              <span>© {currentYear} Alex Chen. Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>and lots of coffee.</span>
            </p>
            <div className="flex items-center space-x-6 text-sm text-neutral-600 dark:text-neutral-400">
              <a
                href="/privacy"
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Privacy
              </a>
              <a
                href="/terms"
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Terms
              </a>
              <a
                href="/sitemap.xml"
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}