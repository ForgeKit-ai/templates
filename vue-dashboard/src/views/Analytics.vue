<template>
  <div class="space-y-8">
    <!-- Header Section -->
    <div class="relative overflow-hidden">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div class="space-y-2">
          <h1 class="text-4xl font-display font-bold gradient-text">Analytics</h1>
          <p class="text-lg text-gray-600 dark:text-gray-400">Deep insights into your platform performance</p>
        </div>
        <div class="mt-6 lg:mt-0 flex flex-wrap items-center gap-3">
          <button class="btn-secondary px-4 py-2">
            <ArrowDownTrayIcon class="w-4 h-4 mr-2" />
            Export Data
          </button>
          <div class="flex items-center gap-2">
            <CalendarIcon class="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span class="text-sm text-gray-600 dark:text-gray-400">Last updated: 2 min ago</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Time Period Selector -->
    <div class="card p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 sm:mb-0">Time Period</h3>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="(period, index) in timePeriods"
            :key="period.value"
            @click="selectedPeriod = period.value"
            class="px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 transform hover:scale-105"
            :class="[
              selectedPeriod === period.value
                ? 'bg-primary-500 text-white shadow-lg glow-primary'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            ]"
            :style="{ animationDelay: `${index * 50}ms` }"
          >
            {{ period.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Analytics Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="(metric, index) in analyticsMetrics"
        :key="metric.name"
        class="card-hover p-6 group animate-slide-up"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{{ metric.name }}</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ metric.value }}</p>
            <div class="flex items-center mt-3">
              <span 
                :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  metric.trend > 0 
                    ? 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300' 
                    : 'bg-danger-100 text-danger-800 dark:bg-danger-900/30 dark:text-danger-300'
                ]"
              >
                <component 
                  :is="metric.trend > 0 ? ArrowTrendingUpIcon : ArrowTrendingDownIcon" 
                  class="w-3 h-3 mr-1" 
                />
                {{ Math.abs(metric.trend) }}%
              </span>
              <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">vs previous period</span>
            </div>
          </div>
          <div class="ml-4">
            <div 
              class="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              :class="metric.bgColor"
            >
              <component :is="metric.icon" class="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <!-- Traffic Sources -->
      <div class="card p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Traffic Sources</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Where your visitors come from</p>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
            <span class="text-xs text-gray-500 dark:text-gray-400">Live</span>
          </div>
        </div>
        <div class="h-80">
          <DoughnutChart :chartData="doughnutChartData" :options="doughnutOptions" />
        </div>
      </div>

      <!-- User Engagement -->
      <div class="xl:col-span-2 card p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">User Engagement</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Daily activity trends</p>
          </div>
          <div class="flex items-center space-x-2">
            <button class="btn-secondary text-xs px-3 py-1.5">This week</button>
            <button class="btn-ghost text-xs px-3 py-1.5">Last week</button>
          </div>
        </div>
        <div class="h-80">
          <LineChart :chartData="engagementChartData" :options="lineOptions" />
        </div>
      </div>
    </div>

    <!-- Top Pages Table -->
    <div class="card overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Top Performing Pages</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Most visited pages in the selected period</p>
          </div>
          <button class="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-500 font-medium">
            View all pages
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Page
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Views
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Unique Views
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Bounce Rate
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Performance
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
            <tr 
              v-for="(page, index) in topPages" 
              :key="page.path"
              class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mr-3">
                    <GlobeAltIcon class="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div class="text-sm font-semibold text-gray-900 dark:text-white">{{ page.path }}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">{{ page.title }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-semibold text-gray-900 dark:text-white">
                  {{ page.views.toLocaleString() }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-semibold text-gray-900 dark:text-white">
                  {{ page.uniqueViews.toLocaleString() }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    page.bounceRate > 50 
                      ? 'bg-danger-100 text-danger-800 dark:bg-danger-900/30 dark:text-danger-300' 
                      : page.bounceRate > 30
                      ? 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300'
                      : 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300'
                  ]"
                >
                  {{ page.bounceRate }}%
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center space-x-2">
                  <div class="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      class="h-2 rounded-full transition-all duration-1000 ease-out"
                      :class="page.performance > 80 ? 'bg-success-500' : page.performance > 60 ? 'bg-warning-500' : 'bg-danger-500'"
                      :style="{ width: `${page.performance}%` }"
                    ></div>
                  </div>
                  <span class="text-xs font-medium text-gray-600 dark:text-gray-400">{{ page.performance }}%</span>
                </div>
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
  Filler,
} from 'chart.js'
import {
  EyeIcon,
  UserGroupIcon,
  ClockIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  GlobeAltIcon,
} from '@heroicons/vue/24/outline'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
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
    bgColor: 'bg-gradient-to-br from-primary-500 to-primary-600',
  },
  {
    name: 'Page Views',
    value: '98,234',
    trend: 8,
    icon: EyeIcon,
    bgColor: 'bg-gradient-to-br from-success-500 to-success-600',
  },
  {
    name: 'Avg. Session',
    value: '3m 24s',
    trend: -2,
    icon: ClockIcon,
    bgColor: 'bg-gradient-to-br from-accent-500 to-accent-600',
  },
])

const doughnutChartData = ref({
  labels: ['Organic Search', 'Direct', 'Social Media', 'Referral', 'Email'],
  datasets: [
    {
      data: [45, 25, 15, 10, 5],
      backgroundColor: [
        'rgba(14, 165, 233, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(217, 70, 239, 0.8)',
      ],
      borderColor: [
        'rgba(14, 165, 233, 1)',
        'rgba(34, 197, 94, 1)',
        'rgba(245, 158, 11, 1)',
        'rgba(239, 68, 68, 1)',
        'rgba(217, 70, 239, 1)',
      ],
      borderWidth: 2,
      hoverBorderWidth: 3,
    },
  ],
})

const doughnutOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        padding: 20,
        usePointStyle: true,
        pointStyle: 'circle',
        font: {
          size: 12,
          weight: '500',
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(14, 165, 233, 1)',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      callbacks: {
        label: function(context: any) {
          return ` ${context.label}: ${context.parsed}%`
        }
      }
    },
  },
  cutout: '65%',
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
})

const engagementChartData = ref({
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Page Views',
      borderColor: 'rgba(14, 165, 233, 1)',
      backgroundColor: 'rgba(14, 165, 233, 0.1)',
      pointBackgroundColor: 'rgba(14, 165, 233, 1)',
      pointBorderColor: 'rgba(255, 255, 255, 1)',
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
      data: [1200, 1900, 1500, 2200, 1800, 800, 600],
      tension: 0.4,
      fill: true,
    },
    {
      label: 'Unique Visitors',
      borderColor: 'rgba(34, 197, 94, 1)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      pointBackgroundColor: 'rgba(34, 197, 94, 1)',
      pointBorderColor: 'rgba(255, 255, 255, 1)',
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
      data: [800, 1200, 1000, 1500, 1200, 500, 400],
      tension: 0.4,
      fill: true,
    },
  ],
})

const lineOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        padding: 20,
        usePointStyle: true,
        pointStyle: 'circle',
        font: {
          size: 12,
          weight: '500',
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(14, 165, 233, 1)',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        color: 'rgba(107, 114, 128, 1)',
        font: {
          size: 12,
        },
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(229, 231, 235, 0.5)',
      },
      border: {
        display: false,
      },
      ticks: {
        color: 'rgba(107, 114, 128, 1)',
        font: {
          size: 12,
        },
      },
    },
  },
  interaction: {
    intersect: false,
    mode: 'index' as const,
  },
})

const topPages = ref([
  { path: '/', title: 'Homepage', views: 12543, uniqueViews: 8934, bounceRate: 32, performance: 92 },
  { path: '/products', title: 'Product Catalog', views: 8734, uniqueViews: 6234, bounceRate: 28, performance: 85 },
  { path: '/about', title: 'About Us', views: 5234, uniqueViews: 4123, bounceRate: 45, performance: 78 },
  { path: '/contact', title: 'Contact Page', views: 3421, uniqueViews: 2876, bounceRate: 52, performance: 65 },
  { path: '/blog', title: 'Blog Articles', views: 2987, uniqueViews: 2345, bounceRate: 38, performance: 88 },
])
</script>