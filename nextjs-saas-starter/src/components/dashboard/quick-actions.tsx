import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button className="w-full">Create New Project</Button>
        <Button variant="outline" className="w-full">View Analytics</Button>
      </CardContent>
    </Card>
  )
}