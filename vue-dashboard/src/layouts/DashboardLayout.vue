<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 mesh-gradient">
    <!-- Sidebar -->
    <div 
      class="fixed inset-y-0 left-0 z-50 w-72 glass border-r border-gray-200/20 dark:border-gray-800/30 transform transition-all duration-500 ease-in-out backdrop-blur-xl lg:translate-x-0" 
      :class="{
        '-translate-x-full lg:translate-x-0': !sidebarOpen,
        'translate-x-0': sidebarOpen,
      }"
    >
      <!-- Logo Section -->
      <div class="flex items-center h-20 px-6 border-b border-gray-200/20 dark:border-gray-800/30">
        <div class="flex items-center space-x-3">
          <div class="relative">
            <div class="w-10 h-10 gradient-bg rounded-xl shadow-lg glow-primary flex items-center justify-center">
              <SparklesIcon class="w-6 h-6 text-white" />
            </div>
            <div class="absolute -top-1 -right-1 w-4 h-4 bg-accent-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
          </div>
          <div>
            <h1 class="text-xl font-display font-bold gradient-text">Vue Dashboard</h1>
            <p class="text-xs text-gray-500 dark:text-gray-400">Modern & Beautiful</p>
          </div>
        </div>
      </div>
      
      <!-- Navigation -->
      <nav class="mt-8 px-4">
        <div class="space-y-2">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden"
            :class="[
              $route.path === item.href
                ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20 shadow-lg backdrop-blur-sm'
                : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white border border-transparent hover:border-gray-200/50 dark:hover:border-gray-700/50'
            ]"
          >
            <!-- Active indicator -->
            <div 
              v-if="$route.path === item.href"
              class="absolute left-0 top-0 bottom-0 w-1 bg-primary-500 rounded-r-full"
            ></div>
            
            <!-- Icon with glow effect -->
            <div class="relative mr-4">
              <component 
                :is="item.icon" 
                class="h-6 w-6 transition-all duration-300" 
                :class="[
                  $route.path === item.href 
                    ? 'text-primary-600 dark:text-primary-400 drop-shadow-sm' 
                    : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                ]" 
              />
              <div 
                v-if="$route.path === item.href"
                class="absolute inset-0 bg-primary-500/20 rounded-lg blur-md -z-10"
              ></div>
            </div>
            
            <!-- Label -->
            <span class="font-medium">{{ item.name }}</span>
            
            <!-- Badge for active item -->
            <div 
              v-if="$route.path === item.href"
              class="ml-auto w-2 h-2 bg-primary-500 rounded-full animate-pulse"
            ></div>
          </router-link>
        </div>
        
        <!-- Bottom section -->
        <div class="mt-12 p-4 glass rounded-xl border border-gray-200/20 dark:border-gray-800/30">
          <div class="flex items-center space-x-3">
            <div class="w-3 h-3 bg-success-500 rounded-full animate-pulse"></div>
            <div>
              <p class="text-xs font-medium text-gray-900 dark:text-white">System Status</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">All systems operational</p>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <!-- Mobile sidebar overlay -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="sidebarOpen" class="fixed inset-0 z-40 lg:hidden" @click="sidebarOpen = false">
        <div class="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"></div>
      </div>
    </Transition>

    <!-- Main content -->
    <div class="lg:pl-72">
      <!-- Top navbar -->
      <header class="glass border-b border-gray-200/20 dark:border-gray-800/30 sticky top-0 z-30">
        <div class="px-6 lg:px-8">
          <div class="flex items-center justify-between h-20">
            <!-- Mobile menu button -->
            <button
              class="btn-ghost p-2 lg:hidden"
              @click="sidebarOpen = !sidebarOpen"
            >
              <Bars3Icon class="h-6 w-6" />
            </button>
            
            <!-- Search bar -->
            <div class="flex-1 max-w-lg mx-8 hidden md:block">
              <div class="relative">
                <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  class="w-full pl-10 pr-4 py-2.5 bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 backdrop-blur-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>
            
            <!-- Right section -->
            <div class="flex items-center space-x-4">
              <!-- Theme toggle -->
              <button 
                class="btn-ghost p-2.5"
                @click="toggleTheme"
                title="Toggle theme"
              >
                <SunIcon v-if="isDark" class="h-5 w-5" />
                <MoonIcon v-else class="h-5 w-5" />
              </button>
              
              <!-- Notifications -->
              <button class="btn-ghost p-2.5 relative">
                <BellIcon class="h-5 w-5" />
                <div class="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
              </button>
              
              <!-- User menu -->
              <div class="flex items-center space-x-3 pl-4 border-l border-gray-200/50 dark:border-gray-700/50">
                <div class="relative">
                  <img
                    class="h-10 w-10 rounded-xl object-cover ring-2 ring-white/50 dark:ring-gray-800/50 shadow-lg"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User avatar"
                  />
                  <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-success-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                </div>
                <div class="hidden md:block">
                  <p class="text-sm font-semibold text-gray-900 dark:text-white">John Doe</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
                </div>
                <ChevronDownIcon class="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="p-6 lg:p-8">
        <Transition
          enter-active-class="transition-all duration-500"
          enter-from-class="opacity-0 translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-300"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-4"
          mode="out-in"
        >
          <router-view />
        </Transition>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { 
  HomeIcon, 
  ChartBarIcon, 
  UsersIcon, 
  CogIcon, 
  Bars3Icon, 
  BellIcon,
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
  ChevronDownIcon,
  SparklesIcon
} from '@heroicons/vue/24/outline'

const sidebarOpen = ref(false)
const isDark = ref(true)

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Users', href: '/users', icon: UsersIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
]

// Theme toggle functionality
const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

// Initialize theme on mount
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  // Default to dark mode if no saved preference
  if (savedTheme === 'light') {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  } else {
    // Default to dark mode
    isDark.value = true
    document.documentElement.classList.remove('dark') // Remove first to ensure clean state
    document.documentElement.classList.add('dark')
  }
})
</script>