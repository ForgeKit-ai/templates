import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Zap, Rocket } from 'lucide-react'

export function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0 gradient-mesh opacity-40" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl floating" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl floating-delayed" />
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl floating" />
      
      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 sm:pb-32 lg:flex lg:items-center lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-3xl lg:pt-8">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-6 py-2 text-sm font-medium text-purple-300 ring-1 ring-purple-500/20">
            <Sparkles className="h-4 w-4" />
            The future of SaaS development
          </div>
          
          {/* Main heading */}
          <h1 className="text-6xl font-black tracking-tight text-white sm:text-8xl lg:text-9xl">
            Build{' '}
            <span className="gradient-text">Epic</span>
            <br />
            SaaS Apps
          </h1>
          
          {/* Subheading */}
          <p className="mt-8 text-xl leading-8 text-slate-300 lg:text-2xl">
            Skip the boring setup. Start with authentication, billing, dashboards, 
            and everything you need to launch your next{' '}
            <span className="text-purple-400 font-semibold">unicorn startup</span>.
          </p>
          
          {/* Features list */}
          <div className="mt-8 flex flex-wrap gap-4">
            {[
              { icon: Zap, text: 'Auth & Billing' },
              { icon: Rocket, text: 'Pre-built Dashboard' },
              { icon: Sparkles, text: 'Modern UI' }
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2 rounded-lg bg-slate-800/50 px-3 py-2 text-sm text-slate-300">
                <feature.icon className="h-4 w-4 text-purple-400" />
                {feature.text}
              </div>
            ))}
          </div>
          
          {/* CTAs */}
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-6">
            <Button size="lg" className="group" asChild>
              <Link href="/auth/signup">
                Start Building Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/auth/signin">
                View Demo
              </Link>
            </Button>
          </div>
          
          {/* Social proof */}
          <div className="mt-12 flex items-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">10k+</div>
              <div className="text-sm text-slate-400">Developers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-slate-400">Apps Built</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-sm text-slate-400">Uptime</div>
            </div>
          </div>
        </div>
        
        {/* Visual element */}
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-3xl opacity-30" />
              <div className="relative glass-dark p-8 rounded-3xl">
                <div className="grid grid-cols-3 gap-4">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div 
                      key={i}
                      className="h-16 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 animate-pulse"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}