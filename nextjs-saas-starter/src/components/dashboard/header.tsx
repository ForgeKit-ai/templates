'use client'

import { signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export function DashboardHeader() {
  const { data: session } = useSession()

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1"></div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" />
          <div className="flex items-center gap-x-4">
            <span className="text-sm font-medium text-gray-900">
              {session?.user?.name || session?.user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={() => signOut()}>
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}