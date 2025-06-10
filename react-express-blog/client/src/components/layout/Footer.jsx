import React from 'react';
import { Link } from 'react-router-dom';
import { 
  EnvelopeIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  RssIcon
} from '@heroicons/react/24/outline';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Blog: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Search', href: '/search' },
    ],
    Account: [
      { name: 'Sign in', href: '/login' },
      { name: 'Sign up', href: '/register' },
      { name: 'Profile', href: '/profile' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  };

  return (
    <footer className="bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-xl font-bold font-serif text-neutral-900 dark:text-white mb-4"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span>Blog</span>
            </Link>
            
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md">
              A modern blog platform for writers and readers. Share your stories, 
              discover new voices, and connect with a community of passionate writers.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900 dark:text-white">
                Stay updated
              </h4>
              <div className="flex space-x-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-neutral-800 dark:text-white"
                />
                <button className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-neutral-500">
                No spam, unsubscribe at any time.
              </p>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="font-semibold text-neutral-900 dark:text-white">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-1 text-sm text-neutral-600 dark:text-neutral-400">
              <span>© {currentYear} Blog. Made with</span>
              <HeartIcon className="h-4 w-4 text-red-500" />
              <span>by developers, for writers.</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <button 
                className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                title="RSS Feed"
              >
                <RssIcon className="h-5 w-5" />
              </button>
              
              <button 
                className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                title="Contact Us"
              >
                <EnvelopeIcon className="h-5 w-5" />
              </button>
              
              <button 
                className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                title="Feedback"
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-neutral-500">
              Built with React, Express.js, and MongoDB. 
              <Link to="/about" className="hover:text-primary-600 ml-1">
                Learn more about our technology stack.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}