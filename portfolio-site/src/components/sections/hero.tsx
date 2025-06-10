'use client'

import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { ArrowDown, Download, Mail, Github, Linkedin } from 'lucide-react'
import Image from 'next/image'

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
    name: 'Email',
    href: 'mailto:hello@alexchen.dev',
    icon: Mail,
  },
]

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float animation-delay-400" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-full blur-2xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-5rem)]">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 text-center lg:text-left"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-2"
            >
              <p className="text-lg text-primary-600 dark:text-primary-400 font-medium">
                Hello there! 👋
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                I'm{' '}
                <span className="gradient-text">
                  Alex Chen
                </span>
              </h1>
            </motion.div>

            {/* Dynamic text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl lg:text-3xl font-semibold text-neutral-600 dark:text-neutral-400 h-[3rem] flex items-center justify-center lg:justify-start"
            >
              <TypeAnimation
                sequence={[
                  'Full Stack Developer',
                  2000,
                  'React Specialist',
                  2000,
                  'UI/UX Enthusiast',
                  2000,
                  'Problem Solver',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="gradient-text-primary"
              />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed"
            >
              I craft exceptional digital experiences with modern technologies. 
              Passionate about creating beautiful, fast, and user-friendly applications 
              that make a difference.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary btn-lg group"
              >
                <Mail className="w-5 h-5 mr-2" />
                Let's Work Together
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.div>
              </motion.a>
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary btn-lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex items-center justify-center lg:justify-start space-x-6"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  <link.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
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
                className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full blur-2xl opacity-20"
              />
              
              {/* Profile image container */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-80 h-80 lg:w-96 lg:h-96"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full p-1">
                  <div className="w-full h-full bg-white dark:bg-neutral-900 rounded-full p-2">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src="/profile.jpg"
                        alt="Alex Chen"
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 320px, 384px"
                      />
                      
                      {/* Fallback gradient if image fails to load */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900 flex items-center justify-center">
                        <span className="text-6xl font-bold text-primary-600 dark:text-primary-400">
                          AC
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating badges */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 glass px-3 py-1 rounded-full text-sm font-medium text-primary-600 dark:text-primary-400"
                >
                  Available for work ✨
                </motion.div>
                
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  className="absolute -bottom-4 -left-4 glass px-3 py-1 rounded-full text-sm font-medium text-accent-600 dark:text-accent-400"
                >
                  5+ Years Experience
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center space-y-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <ArrowDown className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}