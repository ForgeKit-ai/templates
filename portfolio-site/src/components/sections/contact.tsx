'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Github,
  Linkedin,
  Twitter,
  Calendar,
  Coffee,
  MessageSquare
} from 'lucide-react'

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    description: 'Drop me a line anytime',
    value: 'hello@alexchen.dev',
    href: 'mailto:hello@alexchen.dev',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Phone,
    title: 'Phone',
    description: 'Call for urgent matters',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: MapPin,
    title: 'Location',
    description: 'Based in San Francisco',
    value: 'San Francisco, CA',
    href: 'https://maps.google.com/?q=San+Francisco,CA',
    color: 'from-purple-500 to-violet-500',
  },
  {
    icon: Calendar,
    title: 'Schedule a Call',
    description: 'Book a 30-min chat',
    value: 'calendly.com/alexchen',
    href: 'https://calendly.com/alexchen',
    color: 'from-orange-500 to-red-500',
  },
]

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/alexchen',
    icon: Github,
    username: '@alexchen',
    color: 'hover:text-gray-600',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/alexchen',
    icon: Linkedin,
    username: '/in/alexchen',
    color: 'hover:text-blue-600',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/alexchen',
    icon: Twitter,
    username: '@alexchen',
    color: 'hover:text-sky-500',
  },
]

const quickQuestions = [
  "I'd like to discuss a project",
  "I'm interested in hiring you",
  "I have a technical question",
  "I want to collaborate",
  "Other"
]

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    quickQuestion: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setStatus('loading')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData)
      
      setStatus('success')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        quickQuestion: '',
      })
    } catch (error) {
      setStatus('error')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <section id="contact" className="section bg-neutral-50 dark:bg-neutral-900/50" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Get in Touch
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                I'm currently available for freelance work and interesting project collaborations. 
                Whether you're a startup looking to build your MVP or an established company 
                wanting to improve your digital presence, I'd love to help.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid gap-6">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.title}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="card p-6 group hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${method.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <method.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {method.title}
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                        {method.description}
                      </p>
                      <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {method.value}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-8 border-t border-neutral-200 dark:border-neutral-800"
            >
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Connect with me
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-neutral-600 dark:text-neutral-400 ${social.color} transition-all duration-300 group`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
              <div className="mt-4 space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                {socialLinks.map((social) => (
                  <p key={social.name}>
                    <span className="font-medium">{social.name}:</span> {social.username}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="card p-6 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950/20 dark:to-accent-950/20 border-primary-200 dark:border-primary-800"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Coffee className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Response Time
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-neutral-600 dark:text-neutral-400">Email</p>
                  <p className="font-semibold text-neutral-900 dark:text-neutral-100">Within 24h</p>
                </div>
                <div>
                  <p className="text-neutral-600 dark:text-neutral-400">Calls</p>
                  <p className="font-semibold text-neutral-900 dark:text-neutral-100">Same day</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="card p-8">
              <div className="flex items-center space-x-2 mb-6">
                <MessageSquare className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  Send me a message
                </h3>
              </div>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                >
                  <div className="flex items-center space-x-2 text-green-800 dark:text-green-300">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Message sent successfully!</span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                    I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <div className="flex items-center space-x-2 text-red-800 dark:text-red-300">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">Something went wrong</span>
                  </div>
                  <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                    Please try again or email me directly.
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Quick Question */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    What brings you here? (Optional)
                  </label>
                  <select
                    name="quickQuestion"
                    value={formData.quickQuestion}
                    onChange={handleInputChange}
                    className="input"
                  >
                    <option value="">Select a topic...</option>
                    {quickQuestions.map((question) => (
                      <option key={question} value={question}>
                        {question}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name and Email */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`input ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`input ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`input ${errors.subject ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`textarea ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Tell me about your project, timeline, budget, or any questions you have..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                  )}
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    Minimum 10 characters. Include as much detail as you'd like!
                  </p>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                  whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                  className="w-full btn-primary btn-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </div>
                  )}
                </motion.button>

                <p className="text-xs text-center text-neutral-500 dark:text-neutral-400">
                  I typically respond within 24 hours. For urgent matters, feel free to call me directly.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}