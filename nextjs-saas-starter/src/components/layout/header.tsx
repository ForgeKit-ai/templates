import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

export function Header() {
  return (
    <header className="absolute top-0 z-50 w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center gap-2 -m-1.5 p-1.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">SaaS Starter</span>
          </Link>
        </div>
        <div className="flex flex-1 justify-end gap-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/auth/signin">Sign in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/auth/signup">Get started</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}