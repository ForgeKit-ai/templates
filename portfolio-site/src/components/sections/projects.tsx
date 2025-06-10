'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  ExternalLink, 
  Github, 
  Star, 
  Users, 
  Calendar,
  Code,
  Zap,
  Smartphone,
  Globe,
  Filter
} from 'lucide-react'
import Image from 'next/image'

const categories = ['All', 'Web Apps', 'Mobile', 'Open Source', 'E-commerce']

const projects = [
  {
    title: 'TaskFlow Pro',
    description: 'A comprehensive project management platform with real-time collaboration, advanced analytics, and team productivity insights.',
    longDescription: 'TaskFlow Pro is a modern project management solution built for remote teams. It features real-time collaboration, advanced project analytics, time tracking, and seamless integrations with popular tools.',
    image: '/projects/taskflow-pro.jpg',
    category: 'Web Apps',
    technologies: ['React', 'Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Socket.io'],
    features: [
      'Real-time collaboration',
      'Advanced analytics dashboard',
      'Time tracking & reporting',
      'Team performance insights',
      'Custom workflow automation',
    ],
    metrics: {
      users: '10k+',
      rating: 4.8,
      uptime: '99.9%',
    },
    links: {
      live: 'https://taskflow-pro.demo',
      github: 'https://github.com/alexchen/taskflow-pro',
    },
    status: 'Live',
    featured: true,
  },
  {
    title: 'EcoTracker Mobile',
    description: 'Mobile app helping users track their carbon footprint and adopt sustainable lifestyle habits through gamification.',
    longDescription: 'EcoTracker is a React Native app that gamifies sustainability. Users can track their daily activities, see their environmental impact, and compete with friends to reduce their carbon footprint.',
    image: '/projects/ecotracker.jpg',
    category: 'Mobile',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Node.js'],
    features: [
      'Carbon footprint tracking',
      'Sustainability challenges',
      'Social leaderboards',
      'Habit formation tools',
      'Impact visualization',
    ],
    metrics: {
      downloads: '25k+',
      rating: 4.6,
      retention: '78%',
    },
    links: {
      live: 'https://ecotracker.app',
      github: 'https://github.com/alexchen/ecotracker',
    },
    status: 'Live',
    featured: true,
  },
  {
    title: 'React Form Builder',
    description: 'Open-source drag-and-drop form builder component for React applications with extensive customization options.',
    longDescription: 'A powerful, flexible form builder component that developers can easily integrate into their React applications. Features drag-and-drop interface, validation, and export capabilities.',
    image: '/projects/form-builder.jpg',
    category: 'Open Source',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook', 'Jest'],
    features: [
      'Drag-and-drop interface',
      'Form validation engine',
      'Custom field types',
      'Export to JSON/React',
      'Theming system',
    ],
    metrics: {
      stars: '2.3k',
      downloads: '50k+',
      contributors: '23',
    },
    links: {
      live: 'https://react-form-builder.demo',
      github: 'https://github.com/alexchen/react-form-builder',
    },
    status: 'Open Source',
    featured: true,
  },
  {
    title: 'ShopFlow E-commerce',
    description: 'Modern e-commerce platform with advanced inventory management, multi-vendor support, and analytics dashboard.',
    longDescription: 'A complete e-commerce solution built for scalability. Features multi-vendor marketplace, advanced inventory management, payment processing, and comprehensive analytics.',
    image: '/projects/shopflow.jpg',
    category: 'E-commerce',
    technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis', 'AWS S3'],
    features: [
      'Multi-vendor marketplace',
      'Inventory management',
      'Payment processing',
      'Order tracking',
      'Analytics dashboard',
    ],
    metrics: {
      transactions: '$2M+',
      vendors: '500+',
      uptime: '99.95%',
    },
    links: {
      live: 'https://shopflow.demo',
      github: 'https://github.com/alexchen/shopflow',
    },
    status: 'Live',
    featured: false,
  },
  {
    title: 'Weather Widget Library',
    description: 'Lightweight, customizable weather widget components for web applications with multiple design variants.',
    longDescription: 'A collection of beautiful weather widgets that can be easily embedded in any web application. Supports multiple weather providers and extensive customization options.',
    image: '/projects/weather-widgets.jpg',
    category: 'Open Source',
    technologies: ['TypeScript', 'CSS3', 'Weather APIs', 'Webpack'],
    features: [
      'Multiple widget designs',
      'Weather API integration',
      'Responsive layouts',
      'Customizable themes',
      'Zero dependencies',
    ],
    metrics: {
      stars: '1.2k',
      downloads: '30k+',
      size: '15kb',
    },
    links: {
      live: 'https://weather-widgets.demo',
      github: 'https://github.com/alexchen/weather-widgets',
    },
    status: 'Open Source',
    featured: false,
  },
  {
    title: 'DevTools Dashboard',
    description: 'Developer productivity dashboard aggregating GitHub stats, project metrics, and coding insights in one place.',
    longDescription: 'A personal dashboard for developers to track their coding activity, GitHub contributions, project status, and productivity metrics across multiple platforms.',
    image: '/projects/devtools-dashboard.jpg',
    category: 'Web Apps',
    technologies: ['Vue.js', 'Chart.js', 'GitHub API', 'Express.js'],
    features: [
      'GitHub integration',
      'Coding metrics',
      'Project tracking',
      'Productivity insights',
      'Custom reports',
    ],
    metrics: {
      users: '5k+',
      integrations: '12',
      accuracy: '95%',
    },
    links: {
      live: 'https://devtools-dashboard.demo',
      github: 'https://github.com/alexchen/devtools-dashboard',
    },
    status: 'Live',
    featured: false,
  },
]

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const featuredProjects = projects.filter(project => project.featured)

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
            A showcase of my recent work and contributions to the developer community
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                <Filter className="w-4 h-4 inline-block mr-2" />
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured Projects Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-center text-neutral-900 dark:text-neutral-100 mb-12">
            🌟 Featured Work
          </h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                onHoverStart={() => setHoveredProject(project.title)}
                onHoverEnd={() => setHoveredProject(null)}
                className="group"
              >
                <div className="card overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/20 dark:to-accent-900/20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-50">
                        {project.category === 'Mobile' && <Smartphone />}
                        {project.category === 'Web Apps' && <Globe />}
                        {project.category === 'Open Source' && <Code />}
                        {project.category === 'E-commerce' && <Zap />}
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Live' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                      }`}>
                        {project.status}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredProject === project.title ? 1 : 0 }}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center space-x-4"
                    >
                      <motion.a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                    </motion.div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {project.title}
                      </h4>
                      <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full text-xs font-medium">
                        {project.category}
                      </span>
                    </div>

                    <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Key Features */}
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        Key Features
                      </h5>
                      <ul className="space-y-1">
                        {project.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-xs text-neutral-600 dark:text-neutral-400">
                            <div className="w-1 h-1 bg-primary-500 rounded-full" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                            {value}
                          </div>
                          <div className="text-xs text-neutral-600 dark:text-neutral-400 capitalize">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded text-xs font-medium">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 btn-primary btn-sm text-center"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary btn-sm"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* All Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-center text-neutral-900 dark:text-neutral-100 mb-12">
            All Projects
          </h3>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="card p-6 group hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h4>
                    <div className="flex space-x-2">
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded text-xs font-medium">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="card p-8 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950/20 dark:to-accent-950/20 border-primary-200 dark:border-primary-800">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Interested in working together?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary btn-lg"
              >
                Start a Project
              </motion.a>
              <motion.a
                href="https://github.com/alexchen"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary btn-lg"
              >
                <Github className="w-5 h-5 mr-2" />
                View All Code
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}