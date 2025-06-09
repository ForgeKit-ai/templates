<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out" :class="{
      '-translate-x-full': !sidebarOpen,
      'translate-x-0': sidebarOpen,
    }" @click="sidebarOpen = true">
      <div class="flex items-center justify-center h-16 bg-primary-600">
        <h1 class="text-xl font-bold text-white">Vue Dashboard</h1>
      </div>
      
      <nav class="mt-8">
        <div class="px-4 space-y-2">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="group flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200"
            :class="[
              $route.path === item.href
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            ]"
          >
            <component :is="item.icon" class="mr-3 h-5 w-5 flex-shrink-0" :class="[
              $route.path === item.href ? 'text-primary-700' : 'text-gray-400 group-hover:text-gray-500'
            ]" />
            {{ item.name }}
          </router-link>
        </div>
      </nav>
    </div>

    <!-- Mobile sidebar overlay -->
    <div v-if="sidebarOpen" class="fixed inset-0 z-40 lg:hidden" @click="sidebarOpen = false">
      <div class="absolute inset-0 bg-gray-600 opacity-75"></div>
    </div>

    <!-- Main content -->
    <div class="lg:pl-64">
      <!-- Top navbar -->
      <div class="bg-white shadow-sm border-b border-gray-200">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <button
              class="text-gray-500 hover:text-gray-600 lg:hidden"
              @click="sidebarOpen = !sidebarOpen"
            >
              <Bars3Icon class="h-6 w-6" />
            </button>
            
            <div class="flex items-center space-x-4">
              <button class="text-gray-500 hover:text-gray-600">
                <BellIcon class="h-6 w-6" />
              </button>
              
              <div class="flex items-center space-x-3">
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User avatar"
                />
                <span class="text-sm font-medium text-gray-700">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Page content -->
      <main class="p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  HomeIcon, 
  ChartBarIcon, 
  UsersIcon, 
  CogIcon, 
  Bars3Icon, 
  BellIcon 
} from '@heroicons/vue/24/outline'

const sidebarOpen = ref(false)

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Users', href: '/users', icon: UsersIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
]
</script>