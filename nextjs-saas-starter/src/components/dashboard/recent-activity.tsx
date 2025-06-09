import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                User signed up
              </p>
              <p className="text-sm text-gray-500">
                2 minutes ago
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}