'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Layers, 
  Database, 
  Palette, 
  Zap, 
  Shield, 
  Globe,
  Smartphone,
  Cpu
} from 'lucide-react'

const skillCategories = [
  {
    title: 'Frontend',
    icon: Layers,
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Framer Motion', level: 85 },
      { name: 'Vue.js', level: 75 },
    ],
  },
  {
    title: 'Backend',
    icon: Database,
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Express.js', level: 88 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 82 },
      { name: 'GraphQL', level: 78 },
      { name: 'Redis', level: 75 },
    ],
  },
  {
    title: 'DevOps & Tools',
    icon: Zap,
    color: 'from-purple-500 to-violet-500',
    skills: [
      { name: 'Docker', level: 85 },
      { name: 'AWS', level: 80 },
      { name: 'Git', level: 95 },
      { name: 'GitHub Actions', level: 78 },
      { name: 'Vercel', level: 90 },
      { name: 'Firebase', level: 82 },
    ],
  },
  {
    title: 'Design',
    icon: Palette,
    color: 'from-pink-500 to-rose-500',
    skills: [
      { name: 'UI/UX Design', level: 85 },
      { name: 'Figma', level: 88 },
      { name: 'Adobe XD', level: 75 },
      { name: 'Responsive Design', level: 92 },
      { name: 'Design Systems', level: 80 },
      { name: 'Prototyping', level: 78 },
    ],
  },
]

const technologies = [
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Framer Motion', category: 'Animation' },
  { name: 'GraphQL', category: 'API' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Vercel', category: 'Deployment' },
  { name: 'Figma', category: 'Design' },
  { name: 'Git', category: 'Version Control' },
  { name: 'Jest', category: 'Testing' },
  { name: 'Cypress', category: 'Testing' },
]

export function SkillsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="skills" className="section" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            The tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              className="card p-6 group hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {skill.name}
                      </span>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ 
                          duration: 1.5, 
                          delay: categoryIndex * 0.1 + skillIndex * 0.1 + 0.5,
                          ease: "easeOut"
                        }}
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technology Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-sm font-medium hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-300 cursor-default"
              >
                {tech.name}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          {[
            { icon: Globe, label: 'Projects Completed', value: '50+' },
            { icon: Smartphone, label: 'Apps Deployed', value: '25+' },
            { icon: Shield, label: 'Years Experience', value: '5+' },
            { icon: Cpu, label: 'Technologies Mastered', value: '20+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}