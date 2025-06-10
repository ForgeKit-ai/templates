'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Coffee, Music, Camera, Gamepad2, Heart } from 'lucide-react'

const interests = [
  {
    name: 'Coding',
    icon: Code,
    description: 'Building amazing things with code',
  },
  {
    name: 'Coffee',
    icon: Coffee,
    description: 'Fuel for creative thinking',
  },
  {
    name: 'Music',
    icon: Music,
    description: 'Creating the perfect coding playlist',
  },
  {
    name: 'Photography',
    icon: Camera,
    description: 'Capturing beautiful moments',
  },
  {
    name: 'Gaming',
    icon: Gamepad2,
    description: 'Exploring virtual worlds',
  },
]

const values = [
  {
    title: 'Quality First',
    description: 'I believe in writing clean, maintainable code that stands the test of time.',
  },
  {
    title: 'User-Centered',
    description: 'Every line of code I write is focused on creating better user experiences.',
  },
  {
    title: 'Continuous Learning',
    description: 'Technology evolves fast, and I make sure to stay on the cutting edge.',
  },
  {
    title: 'Collaboration',
    description: 'Great products are built by great teams working together.',
  },
]

export function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="section bg-neutral-50 dark:bg-neutral-900/50" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Get to know the person behind the code
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                My Journey
              </h3>
              <div className="space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <p>
                  Hey there! I'm Alex, a passionate full-stack developer with over 5 years 
                  of experience building digital experiences that users love. My journey 
                  started in college when I built my first website and fell in love with 
                  the magic of bringing ideas to life through code.
                </p>
                <p>
                  Since then, I've had the privilege of working with startups, agencies, 
                  and tech companies, helping them build scalable applications and solve 
                  complex problems. I specialize in React, Next.js, Node.js, and modern 
                  web technologies.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, 
                  contributing to open source projects, or sharing my knowledge through 
                  blog posts and talks. I believe in continuous learning and giving 
                  back to the developer community.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                What I Value
              </h4>
              <div className="grid gap-4">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h5 className="font-medium text-neutral-900 dark:text-neutral-100">
                        {value.title}
                      </h5>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Interests & Fun Facts */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Interests */}
            <div>
              <h4 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
                When I'm Not Coding
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {interests.map((interest, index) => (
                  <motion.div
                    key={interest.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="card p-4 text-center group cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <interest.icon className="w-6 h-6 text-white" />
                    </div>
                    <h5 className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                      {interest.name}
                    </h5>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                      {interest.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Fun Facts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="card p-6 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950/20 dark:to-accent-950/20 border-primary-200 dark:border-primary-800"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Fun Facts
                </h4>
              </div>
              <div className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                <p>☕ I drink approximately 4 cups of coffee per day (don't judge!)</p>
                <p>🎵 My coding playlist has over 500 songs and counting</p>
                <p>📚 I've read 23 tech books this year</p>
                <p>🌍 I've worked with teams across 12 different countries</p>
                <p>🎮 I once spent 3 days straight building a game for a hackathon</p>
                <p>🏃‍♂️ I run 5k every morning to clear my mind for coding</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}