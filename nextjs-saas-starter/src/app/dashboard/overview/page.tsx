import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { UsageChart } from '@/components/dashboard/usage-chart'
import { QuickActions } from '@/components/dashboard/quick-actions'

export default async function DashboardOverviewPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {session?.user?.name || 'User'}!
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Here&apos;s what&apos;s happening with your account today.
        </p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          <UsageChart />
          <QuickActions />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}