import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function UsageChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] flex items-center justify-center text-gray-500">
          Chart placeholder
        </div>
      </CardContent>
    </Card>
  )
}