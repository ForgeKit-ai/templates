'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Building2, 
  Calendar, 
  MapPin, 
  ExternalLink,
  Award,
  Users,
  TrendingUp,
  Code
} from 'lucide-react'

const experiences = [
  {
    title: 'Senior Full Stack Developer',
    company: 'TechFlow Solutions',
    location: 'San Francisco, CA',
    period: '2022 - Present',
    type: 'Full-time',
    description: 'Leading development of scalable web applications serving 100k+ users. Mentoring junior developers and architecting modern solutions using React, Node.js, and cloud technologies.',
    achievements: [
      'Built a real-time collaboration platform that increased team productivity by 40%',
      'Led migration to microservices architecture, reducing system downtime by 60%',
      'Mentored 5 junior developers, with 100% promotion rate within 18 months',
      'Implemented automated testing pipeline, increasing code coverage to 95%',
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    logo: '🚀',
  },
  {
    title: 'Full Stack Developer',
    company: 'StartupHub Inc.',
    location: 'Austin, TX',
    period: '2020 - 2022',
    type: 'Full-time',
    description: 'Developed and maintained multiple client applications in fast-paced startup environment. Collaborated with cross-functional teams to deliver high-quality products on tight deadlines.',
    achievements: [
      'Shipped 12 production applications with 99.9% uptime',
      'Reduced application load time by 70% through performance optimization',
      'Integrated payment systems processing $2M+ in transactions',
      'Built responsive designs that increased mobile engagement by 50%',
    ],
    technologies: ['React', 'Vue.js', 'Express.js', 'MongoDB', 'Stripe', 'Heroku'],
    logo: '⚡',
  },
  {
    title: 'Frontend Developer',
    company: 'Creative Digital Agency',
    location: 'Remote',
    period: '2019 - 2020',
    type: 'Contract',
    description: 'Created beautiful, interactive websites for various clients ranging from small businesses to Fortune 500 companies. Focused on user experience and conversion optimization.',
    achievements: [
      'Delivered 25+ websites with average 95+ PageSpeed score',
      'Increased client conversion rates by 35% through UX improvements',
      'Established component library used across 15+ projects',
      'Collaborated with designers to implement pixel-perfect interfaces',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Sass', 'Figma'],
    logo: '🎨',
  },
  {
    title: 'Junior Web Developer',
    company: 'Digital Innovations Co.',
    location: 'New York, NY',
    period: '2018 - 2019',
    type: 'Full-time',
    description: 'Started my professional journey building websites and learning modern development practices. Gained solid foundation in web technologies and agile methodologies.',
    achievements: [
      'Built first production React application handling 10k+ users',
      'Contributed to open source projects with 500+ GitHub stars',
      'Completed AWS certification and implemented cloud solutions',
      'Participated in code reviews and improved team coding standards',
    ],
    technologies: ['JavaScript', 'React', 'Python', 'Django', 'MySQL', 'Git'],
    logo: '🌱',
  },
]

const achievements = [
  {
    icon: Award,
    title: 'Industry Recognition',
    items: [
      'Developer of the Year - TechFlow Solutions 2023',
      'Best React Application - StartupHub Awards 2021',
      'Outstanding Performance - Digital Innovations 2019',
    ],
  },
  {
    icon: Users,
    title: 'Leadership & Mentoring',
    items: [
      'Mentored 8+ developers across different companies',
      'Led technical interviews for 50+ candidates',
      'Organized internal tech talks and workshops',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Impact & Results',
    items: [
      'Applications serving 500k+ active users',
      'Reduced infrastructure costs by $100k annually',
      'Improved team velocity by 45% through process improvements',
    ],
  },
  {
    icon: Code,
    title: 'Open Source',
    items: [
      '20+ repositories with 2k+ GitHub stars',
      'Contributor to React ecosystem projects',
      'Published 3 npm packages with 10k+ downloads',
    ],
  },
]

export function ExperienceSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="experience" className="section bg-neutral-50 dark:bg-neutral-900/50" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            My journey through the tech industry and the impact I've made
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500 hidden md:block" />

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={`${experience.company}-${experience.period}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full border-4 border-white dark:border-neutral-900 shadow-lg hidden md:block" />

                <div className="md:ml-16">
                  <div className="card p-8 hover:shadow-xl transition-all duration-300 group">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                      <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                        <div className="text-4xl">{experience.logo}</div>
                        <div>
                          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {experience.title}
                          </h3>
                          <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 font-semibold mb-2">
                            <Building2 className="w-4 h-4" />
                            <span>{experience.company}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm text-neutral-600 dark:text-neutral-400">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{experience.period}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{experience.location}</span>
                            </div>
                            <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-xs font-medium">
                              {experience.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                      {experience.description}
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {experience.achievements.map((achievement, achievementIndex) => (
                            <li
                              key={achievementIndex}
                              className="flex items-start space-x-2 text-sm text-neutral-600 dark:text-neutral-400"
                            >
                              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center text-neutral-900 dark:text-neutral-100 mb-12">
            Achievements & Recognition
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                className="card p-6 text-center group hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  {category.title}
                </h4>
                <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}