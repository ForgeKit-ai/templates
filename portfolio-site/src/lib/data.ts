// Personal Information
export const personal = {
  name: 'Alex Chen',
  title: 'Full Stack Developer',
  email: 'hello@alexchen.dev',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  website: 'https://alexchen.dev',
  
  // Social Media
  social: {
    github: 'https://github.com/alexchen',
    linkedin: 'https://linkedin.com/in/alexchen',
    twitter: 'https://twitter.com/alexchen',
  },

  // Bio
  bio: `I craft exceptional digital experiences with modern technologies. 
        Passionate about creating beautiful, fast, and user-friendly applications 
        that make a difference.`,

  // Resume
  resumeUrl: '/resume.pdf',
}

// SEO and Meta Information
export const seo = {
  title: 'Alex Chen | Full Stack Developer',
  description: 'Full Stack Developer specializing in React, Next.js, and Node.js. Building beautiful, fast, and scalable web applications.',
  keywords: ['Alex Chen', 'Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Portfolio'],
  ogImage: '/og-image.jpg',
}

// Skills and Technologies
export const skills = {
  frontend: [
    { name: 'React', level: 95 },
    { name: 'Next.js', level: 90 },
    { name: 'TypeScript', level: 88 },
    { name: 'Tailwind CSS', level: 92 },
    { name: 'Framer Motion', level: 85 },
    { name: 'Vue.js', level: 75 },
  ],
  backend: [
    { name: 'Node.js', level: 90 },
    { name: 'Express.js', level: 88 },
    { name: 'PostgreSQL', level: 85 },
    { name: 'MongoDB', level: 82 },
    { name: 'GraphQL', level: 78 },
    { name: 'Redis', level: 75 },
  ],
  devops: [
    { name: 'Docker', level: 85 },
    { name: 'AWS', level: 80 },
    { name: 'Git', level: 95 },
    { name: 'GitHub Actions', level: 78 },
    { name: 'Vercel', level: 90 },
    { name: 'Firebase', level: 82 },
  ],
  design: [
    { name: 'UI/UX Design', level: 85 },
    { name: 'Figma', level: 88 },
    { name: 'Adobe XD', level: 75 },
    { name: 'Responsive Design', level: 92 },
    { name: 'Design Systems', level: 80 },
    { name: 'Prototyping', level: 78 },
  ],
}

// Experience
export const experience = [
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
  },
  // Add more experience entries here
]

// Projects
export const projects = [
  {
    title: 'TaskFlow Pro',
    description: 'A comprehensive project management platform with real-time collaboration, advanced analytics, and team productivity insights.',
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
    featured: true,
  },
  // Add more projects here
]

// Contact Information
export const contact = {
  email: personal.email,
  phone: personal.phone,
  location: personal.location,
  calendly: 'https://calendly.com/alexchen',
  
  // Response times
  responseTime: {
    email: 'Within 24h',
    calls: 'Same day',
  },
}

// Configuration
export const config = {
  // Features to enable/disable
  features: {
    blog: false, // Set to true when blog is implemented
    testimonials: false, // Set to true when testimonials are added
    analytics: true, // Enable analytics tracking
  },
  
  // Theme settings
  theme: {
    defaultTheme: 'dark', // 'light' | 'dark' | 'system'
    enableSystemTheme: true,
  },
  
  // Animation settings
  animations: {
    enabled: true,
    reducedMotion: false, // Respect user's motion preferences
  },
}