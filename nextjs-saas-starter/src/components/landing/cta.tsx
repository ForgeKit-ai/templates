import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CTA() {
  return (
    <div className="bg-blue-600">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-200">
            Join thousands of developers building amazing SaaS applications.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/auth/signup">
                Start building
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}