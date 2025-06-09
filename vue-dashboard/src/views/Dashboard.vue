<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p class="mt-2 text-gray-600">Welcome to your Vue dashboard</p>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        v-for="stat in stats"
        :key="stat.name"
        class="bg-white rounded-lg shadow p-6"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <component :is="stat.icon" class="h-8 w-8 text-primary-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">{{ stat.name }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
          </div>
        </div>
        <div class="mt-4">
          <div class="flex items-center text-sm">
            <span :class="[stat.change > 0 ? 'text-green-600' : 'text-red-600']">
              {{ stat.change > 0 ? '+' : '' }}{{ stat.change }}%
            </span>
            <span class="ml-2 text-gray-500">from last month</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Line chart -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Revenue Over Time</h3>
        <div class="h-64">
          <LineChart :chartData="lineChartData" :options="chartOptions" />
        </div>
      </div>

      <!-- Bar chart -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Monthly Sales</h3>
        <div class="h-64">
          <BarChart :chartData="barChartData" :options="chartOptions" />
        </div>
      </div>
    </div>

    <!-- Recent activity -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Recent Activity</h3>
      </div>
      <div class="p-6">
        <div class="flow-root">
          <ul class="-mb-8">
            <li v-for="(activity, index) in recentActivity" :key="activity.id" class="relative pb-8">
              <div v-if="index !== recentActivity.length - 1" class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"></div>
              <div class="relative flex space-x-3">
                <div class="flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white" :class="activity.iconBackground">
                  <component :is="activity.icon" class="h-4 w-4 text-white" />
                </div>
                <div class="min-w-0 flex-1 pt-1.5">
                  <div>
                    <p class="text-sm text-gray-500">
                      {{ activity.description }}
                      <span class="font-medium text-gray-900">{{ activity.target }}</span>
                    </p>
                  </div>
                  <div class="mt-2 text-sm text-gray-700">
                    <time :datetime="activity.datetime">{{ activity.date }}</time>
                  </div>
                </div>
              </div>
            </li>
          </ul>
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
} from 'chart.js'
import {
  CurrencyDollarIcon,
  UsersIcon,
  ShoppingCartIcon,
  EyeIcon,
  UserPlusIcon,
  DocumentIcon,
} from '@heroicons/vue/24/outline'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const stats = ref([
  {
    name: 'Total Revenue',
    value: '$45,231',
    change: 12,
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Total Users',
    value: '1,234',
    change: 5,
    icon: UsersIcon,
  },
  {
    name: 'Orders',
    value: '156',
    change: -3,
    icon: ShoppingCartIcon,
  },
  {
    name: 'Page Views',
    value: '12,543',
    change: 8,
    icon: EyeIcon,
  },
])

const lineChartData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderColor: 'rgba(59, 130, 246, 1)',
      data: [15000, 22000, 18000, 35000, 28000, 42000],
      tension: 0.4,
    },
  ],
})

const barChartData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      data: [65, 78, 55, 89, 72, 95],
    },
  ],
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
})

const recentActivity = ref([
  {
    id: 1,
    description: 'New user registered:',
    target: 'John Smith',
    date: '2 hours ago',
    datetime: '2023-12-01T10:00:00Z',
    icon: UserPlusIcon,
    iconBackground: 'bg-green-500',
  },
  {
    id: 2,
    description: 'Order completed for:',
    target: 'Product ABC',
    date: '4 hours ago',
    datetime: '2023-12-01T08:00:00Z',
    icon: ShoppingCartIcon,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 3,
    description: 'Document uploaded:',
    target: 'Report Q4.pdf',
    date: '6 hours ago',
    datetime: '2023-12-01T06:00:00Z',
    icon: DocumentIcon,
    iconBackground: 'bg-gray-500',
  },
])
</script>