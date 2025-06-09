import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Shield, Zap, Rocket, Users, CreditCard, BarChart3, ArrowRight, Github, Twitter } from 'lucide-react'

const features = [
  {
    name: 'Authentication',
    description: 'Secure auth with NextAuth.js, OAuth providers, and session management.',
    icon: Shield,
  },
  {
    name: 'Billing & Subscriptions',
    description: 'Complete Stripe integration with plans, webhooks, and customer portal.',
    icon: CreditCard,
  },
  {
    name: 'Dashboard',
    description: 'Pre-built responsive dashboard with charts, analytics, and user management.',
    icon: BarChart3,
  },
  {
    name: 'Performance',
    description: 'Built on Next.js 14 with App Router, TypeScript, and modern best practices.',
    icon: Zap,
  },
  {
    name: 'Deployment Ready',
    description: 'Docker setup, environment configuration, and production-ready infrastructure.',
    icon: Rocket,
  },
  {
    name: 'User Management',
    description: 'Complete user profiles, roles, permissions, and team collaboration features.',
    icon: Users,
  },
]

export function Features() {
  return (
    <>
      {/* Features Section */}
      <div className="py-24 bg-slate-800/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Everything you need to{' '}
              <span className="gradient-text">ship fast</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Stop reinventing the wheel. Start with a production-ready foundation that scales.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <dt className="text-base font-semibold leading-7 text-white">
                    {feature.name}
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-slate-300">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-slate-900 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to build the{' '}
              <span className="gradient-text">next big thing</span>?
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Join thousands of developers who are shipping faster with our SaaS starter kit.
            </p>
            <div className="mt-10 flex items-center justify-center gap-6">
              <Button size="lg" className="group" asChild>
                <Link href="/auth/signup">
                  Start Building Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="https://github.com" target="_blank">
                  <Github className="mr-2 h-4 w-4" />
                  View Source
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">SaaS Starter</span>
            </div>
            
            <div className="flex items-center gap-6">
              <Link href="https://github.com" className="text-slate-400 hover:text-purple-400 transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com" className="text-slate-400 hover:text-purple-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div className="mt-8 border-t border-slate-800 pt-8 text-center">
            <p className="text-sm text-slate-400">
              © 2024 SaaS Starter. Built with ❤️ using Next.js, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}