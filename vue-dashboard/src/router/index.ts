import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Dashboard from '@/views/Dashboard.vue'
import Analytics from '@/views/Analytics.vue'
import Users from '@/views/Users.vue'
import Settings from '@/views/Settings.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: DashboardLayout,
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          path: '/analytics',
          name: 'Analytics',
          component: Analytics,
        },
        {
          path: '/users',
          name: 'Users',
          component: Users,
        },
        {
          path: '/settings',
          name: 'Settings',
          component: Settings,
        },
      ],
    },
  ],
})

export default router