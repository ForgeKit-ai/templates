<template>
  <div class="space-y-8">
    <!-- Header Section -->
    <div class="relative overflow-hidden">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div class="space-y-2">
          <h1 class="text-4xl font-display font-bold gradient-text">Dashboard</h1>
          <p class="text-lg text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening today.</p>
        </div>
        <div class="mt-4 md:mt-0 flex items-center space-x-3">
          <button class="btn-secondary px-4 py-2">
            <DocumentIcon class="w-4 h-4 mr-2" />
            Export Report
          </button>
          <button class="btn-primary px-4 py-2">
            <PlusIcon class="w-4 h-4 mr-2" />
            New Project
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="(stat, index) in stats"
        :key="stat.name"
        class="card-hover p-6 group"
        :class="{'animate-slide-up': true}"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{{ stat.name }}</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ stat.value }}</p>
            <div class="flex items-center mt-3">
              <span 
                :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  stat.change > 0 
                    ? 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300' 
                    : 'bg-danger-100 text-danger-800 dark:bg-danger-900/30 dark:text-danger-300'
                ]"
              >
                <component 
                  :is="stat.change > 0 ? ArrowTrendingUpIcon : ArrowTrendingDownIcon" 
                  class="w-3 h-3 mr-1" 
                />
                {{ Math.abs(stat.change) }}%
              </span>
              <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">vs last month</span>
            </div>
          </div>
          <div class="ml-4">
            <div 
              class="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              :class="stat.bgColor"
            >
              <component :is="stat.icon" class="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <!-- Revenue Chart -->
      <div class="xl:col-span-2 card p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Revenue Overview</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Monthly performance trends</p>
          </div>
          <div class="flex items-center space-x-2">
            <button class="btn-secondary text-xs px-3 py-1.5">Last 6 months</button>
            <button class="btn-ghost text-xs px-3 py-1.5">Last year</button>
          </div>
        </div>
        <div class="h-80">
          <LineChart :chartData="lineChartData" :options="lineChartOptions" />
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="space-y-6">
        <!-- Sales Chart -->
        <div class="card p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Monthly Sales</h3>
            <div class="flex items-center space-x-1">
              <div class="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span class="text-xs text-gray-500 dark:text-gray-400">Current</span>
            </div>
          </div>
          <div class="h-48">
            <BarChart :chartData="barChartData" :options="barChartOptions" />
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div class="space-y-3">
            <button 
              v-for="action in quickActions" 
              :key="action.name"
              class="w-full flex items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200 group"
            >
              <div :class="action.iconBg" class="w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                <component :is="action.icon" class="w-5 h-5 text-white" />
              </div>
              <span class="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                {{ action.name }}
              </span>
              <ChevronRightIcon class="w-4 h-4 ml-auto text-gray-400 group-hover:text-primary-500" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity & Performance -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Activity -->
      <div class="card overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
            <button class="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-500">View all</button>
          </div>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div 
              v-for="(activity, index) in recentActivity" 
              :key="activity.id" 
              class="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
            >
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center" 
                :class="activity.iconBackground"
              >
                <component :is="activity.icon" class="w-5 h-5 text-white" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {{ activity.description }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {{ activity.target }}
                </p>
              </div>
              <div class="text-xs text-gray-400 dark:text-gray-500">
                {{ activity.date }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Metrics -->
      <div class="card p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Performance Metrics</h3>
          <span class="badge-success">Live</span>
        </div>
        <div class="space-y-6">
          <div v-for="metric in performanceMetrics" :key="metric.name" class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-900 dark:text-white">{{ metric.name }}</span>
              <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ metric.value }}%</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                class="h-2 rounded-full transition-all duration-1000 ease-out"
                :class="metric.color"
                :style="{ width: `${metric.value}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Line as LineChart, Bar as BarChart } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import {
  CurrencyDollarIcon,
  UsersIcon,
  ShoppingCartIcon,
  EyeIcon,
  UserPlusIcon,
  DocumentIcon,
  PlusIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChevronRightIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  CogIcon,
  BellIcon,
} from '@heroicons/vue/24/outline'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const stats = ref([
  {
    name: 'Total Revenue',
    value: '$45,231',
    change: 12,
    icon: CurrencyDollarIcon,
    bgColor: 'bg-gradient-to-br from-primary-500 to-primary-600',
  },
  {
    name: 'Total Users',
    value: '1,234',
    change: 5,
    icon: UsersIcon,
    bgColor: 'bg-gradient-to-br from-success-500 to-success-600',
  },
  {
    name: 'Orders',
    value: '156',
    change: -3,
    icon: ShoppingCartIcon,
    bgColor: 'bg-gradient-to-br from-warning-500 to-warning-600',
  },
  {
    name: 'Page Views',
    value: '12,543',
    change: 8,
    icon: EyeIcon,
    bgColor: 'bg-gradient-to-br from-accent-500 to-accent-600',
  },
])

const lineChartData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Revenue',
      backgroundColor: 'rgba(14, 165, 233, 0.1)',
      borderColor: 'rgba(14, 165, 233, 1)',
      pointBackgroundColor: 'rgba(14, 165, 233, 1)',
      pointBorderColor: 'rgba(255, 255, 255, 1)',
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
      data: [15000, 22000, 18000, 35000, 28000, 42000, 38000, 45000, 52000, 48000, 55000, 62000],
      tension: 0.4,
      fill: true,
    },
  ],
})

const barChartData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      backgroundColor: 'rgba(14, 165, 233, 0.8)',
      borderColor: 'rgba(14, 165, 233, 1)',
      borderWidth: 2,
      borderRadius: 8,
      borderSkipped: false,
      data: [65, 78, 55, 89, 72, 95],
    },
  ],
})

const lineChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(14, 165, 233, 1)',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: false,
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
        callback: function(value: any) {
          return '$' + value.toLocaleString()
        },
      },
    },
  },
  interaction: {
    intersect: false,
    mode: 'index' as const,
  },
})

const barChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(14, 165, 233, 1)',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: false,
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
})

const quickActions = ref([
  {
    name: 'Create Campaign',
    icon: RocketLaunchIcon,
    iconBg: 'bg-primary-500',
  },
  {
    name: 'View Analytics',
    icon: ChartBarIcon,
    iconBg: 'bg-accent-500',
  },
  {
    name: 'Settings',
    icon: CogIcon,
    iconBg: 'bg-gray-500',
  },
  {
    name: 'Notifications',
    icon: BellIcon,
    iconBg: 'bg-warning-500',
  },
])

const recentActivity = ref([
  {
    id: 1,
    description: 'New user registered',
    target: 'John Smith joined the platform',
    date: '2h ago',
    icon: UserPlusIcon,
    iconBackground: 'bg-success-500',
  },
  {
    id: 2,
    description: 'Order completed',
    target: 'Premium Package - $299',
    date: '4h ago',
    icon: ShoppingCartIcon,
    iconBackground: 'bg-primary-500',
  },
  {
    id: 3,
    description: 'Report generated',
    target: 'Q4 Performance Report',
    date: '6h ago',
    icon: DocumentIcon,
    iconBackground: 'bg-accent-500',
  },
  {
    id: 4,
    description: 'System update',
    target: 'Version 2.1.0 deployed',
    date: '8h ago',
    icon: RocketLaunchIcon,
    iconBackground: 'bg-warning-500',
  },
])

const performanceMetrics = ref([
  {
    name: 'Server Uptime',
    value: 99.9,
    color: 'bg-success-500',
  },
  {
    name: 'Response Time',
    value: 85,
    color: 'bg-primary-500',
  },
  {
    name: 'User Satisfaction',
    value: 92,
    color: 'bg-accent-500',
  },
  {
    name: 'Error Rate',
    value: 5,
    color: 'bg-danger-500',
  },
])
</script>