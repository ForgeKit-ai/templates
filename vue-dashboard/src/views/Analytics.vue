<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Analytics</h1>
      <p class="mt-2 text-gray-600">Detailed insights and metrics</p>
    </div>

    <!-- Time period selector -->
    <div class="mb-6">
      <div class="flex space-x-2">
        <button
          v-for="period in timePeriods"
          :key="period.value"
          @click="selectedPeriod = period.value"
          class="px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200"
          :class="[
            selectedPeriod === period.value
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          ]"
        >
          {{ period.label }}
        </button>
      </div>
    </div>

    <!-- Analytics metrics -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div
        v-for="metric in analyticsMetrics"
        :key="metric.name"
        class="bg-white rounded-lg shadow p-6"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">{{ metric.name }}</p>
            <p class="text-3xl font-bold text-gray-900">{{ metric.value }}</p>
          </div>
          <div class="flex-shrink-0">
            <component :is="metric.icon" class="h-8 w-8 text-primary-600" />
          </div>
        </div>
        <div class="mt-4">
          <div class="flex items-center text-sm">
            <span :class="[metric.trend > 0 ? 'text-green-600' : 'text-red-600']">
              {{ metric.trend > 0 ? '+' : '' }}{{ metric.trend }}%
            </span>
            <span class="ml-2 text-gray-500">vs previous period</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Traffic sources -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Traffic Sources</h3>
        <div class="h-64">
          <DoughnutChart :chartData="doughnutChartData" :options="doughnutOptions" />
        </div>
      </div>

      <!-- User engagement -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">User Engagement</h3>
        <div class="h-64">
          <LineChart :chartData="engagementChartData" :options="lineOptions" />
        </div>
      </div>
    </div>

    <!-- Top pages table -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Top Pages</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Page
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Views
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unique Views
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bounce Rate
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="page in topPages" :key="page.path">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ page.path }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ page.views.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ page.uniqueViews.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ page.bounceRate }}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Line as LineChart, Doughnut as DoughnutChart } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import {
  EyeIcon,
  UserGroupIcon,
  ClockIcon,
} from '@heroicons/vue/24/outline'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const selectedPeriod = ref('7d')

const timePeriods = [
  { label: '7 Days', value: '7d' },
  { label: '30 Days', value: '30d' },
  { label: '90 Days', value: '90d' },
  { label: '1 Year', value: '1y' },
]

const analyticsMetrics = ref([
  {
    name: 'Total Visitors',
    value: '24,523',
    trend: 15,
    icon: UserGroupIcon,
  },
  {
    name: 'Page Views',
    value: '98,234',
    trend: 8,
    icon: EyeIcon,
  },
  {
    name: 'Avg. Session',
    value: '3m 24s',
    trend: -2,
    icon: ClockIcon,
  },
])

const doughnutChartData = ref({
  labels: ['Organic Search', 'Direct', 'Social Media', 'Referral', 'Email'],
  datasets: [
    {
      data: [45, 25, 15, 10, 5],
      backgroundColor: [
        '#3b82f6',
        '#10b981',
        '#f59e0b',
        '#ef4444',
        '#8b5cf6',
      ],
    },
  ],
})

const doughnutOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
  },
})

const engagementChartData = ref({
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Page Views',
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      data: [1200, 1900, 1500, 2200, 1800, 800, 600],
      tension: 0.4,
    },
    {
      label: 'Unique Visitors',
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      data: [800, 1200, 1000, 1500, 1200, 500, 400],
      tension: 0.4,
    },
  ],
})

const lineOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
})

const topPages = ref([
  { path: '/', views: 12543, uniqueViews: 8934, bounceRate: 32 },
  { path: '/products', views: 8734, uniqueViews: 6234, bounceRate: 28 },
  { path: '/about', views: 5234, uniqueViews: 4123, bounceRate: 45 },
  { path: '/contact', views: 3421, uniqueViews: 2876, bounceRate: 52 },
  { path: '/blog', views: 2987, uniqueViews: 2345, bounceRate: 38 },
])
</script>