<template>
  <div class="space-y-8">
    <!-- Header Section -->
    <div class="relative overflow-hidden">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div class="space-y-2">
          <h1 class="text-4xl font-display font-bold gradient-text">Users</h1>
          <p class="text-lg text-gray-600 dark:text-gray-400">Manage your user community and permissions</p>
        </div>
        <div class="mt-6 lg:mt-0 flex items-center gap-3">
          <button class="btn-secondary px-4 py-2">
            <ArrowDownTrayIcon class="w-4 h-4 mr-2" />
            Export Users
          </button>
          <button
            @click="showAddUserModal = true"
            class="btn-primary px-4 py-2"
          >
            <UserPlusIcon class="w-4 h-4 mr-2" />
            Add User
          </button>
        </div>
      </div>
    </div>

    <!-- User Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div
        v-for="(stat, index) in userStats"
        :key="stat.name"
        class="card-hover p-6 group animate-slide-up"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{{ stat.name }}</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stat.value }}</p>
          </div>
          <div 
            class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            :class="stat.bgColor"
          >
            <component :is="stat.icon" class="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="card p-6">
      <div class="flex flex-col lg:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1">
          <div class="relative">
            <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search users by name or email..."
              class="w-full pl-10 pr-4 py-3 bg-white/90 dark:bg-gray-800/90 border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 backdrop-blur-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>
        
        <!-- Filters -->
        <div class="flex gap-3">
          <div class="relative">
            <select
              v-model="selectedRole"
              class="pl-4 pr-10 py-3 bg-white/90 dark:bg-gray-800/90 border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 backdrop-blur-sm appearance-none text-gray-900 dark:text-gray-100"
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
            </select>
            <ChevronDownIcon class="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
          
          <div class="relative">
            <select
              v-model="selectedStatus"
              class="pl-4 pr-10 py-3 bg-white/90 dark:bg-gray-800/90 border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 backdrop-blur-sm appearance-none text-gray-900 dark:text-gray-100"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <ChevronDownIcon class="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div class="card overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">User Directory</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ filteredUsers.length }} users found
            </p>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
            <span class="text-xs text-gray-500 dark:text-gray-400">Live updates</span>
          </div>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                User
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Role
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Last Active
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
            <tr 
              v-for="user in paginatedUsers" 
              :key="user.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="relative">
                    <img
                      :src="user.avatar"
                      :alt="user.name"
                      class="h-12 w-12 rounded-xl object-cover ring-2 ring-white/50 dark:ring-gray-800/50 shadow-lg"
                    />
                    <div 
                      :class="[
                        'absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-900',
                        user.status === 'active' ? 'bg-success-500' : 'bg-gray-400'
                      ]"
                    ></div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-semibold text-gray-900 dark:text-white">{{ user.name }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</div>
                    <div class="text-xs text-gray-400 dark:text-gray-500">ID: {{ user.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full"
                  :class="getRoleBadgeClass(user.role)"
                >
                  <component :is="getRoleIcon(user.role)" class="w-3 h-3 mr-1" />
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full"
                  :class="getStatusBadgeClass(user.status)"
                >
                  <div :class="[
                    'w-2 h-2 rounded-full mr-2',
                    user.status === 'active' ? 'bg-success-500' : 'bg-gray-400'
                  ]"></div>
                  {{ user.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ formatDate(user.lastActive) }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  {{ getTimeAgo(user.lastActive) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center space-x-2">
                  <button
                    @click="editUser(user)"
                    class="btn-ghost p-2 text-primary-600 hover:text-primary-500"
                    title="Edit user"
                  >
                    <PencilIcon class="w-4 h-4" />
                  </button>
                  <button
                    @click="viewUser(user)"
                    class="btn-ghost p-2 text-gray-600 hover:text-gray-500"
                    title="View details"
                  >
                    <EyeIcon class="w-4 h-4" />
                  </button>
                  <button
                    @click="deleteUser(user.id)"
                    class="btn-ghost p-2 text-danger-600 hover:text-danger-500"
                    title="Delete user"
                  >
                    <TrashIcon class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="card p-6">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Showing <span class="font-semibold">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> to 
          <span class="font-semibold">{{ Math.min(currentPage * itemsPerPage, filteredUsers.length) }}</span> of 
          <span class="font-semibold">{{ filteredUsers.length }}</span> results
        </div>
        <div class="flex items-center space-x-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="btn-secondary px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon class="w-4 h-4 mr-1" />
            Previous
          </button>
          
          <div class="flex items-center space-x-1">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="currentPage = page"
              :class="[
                'w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200',
                currentPage === page
                  ? 'bg-primary-500 text-white shadow-lg glow-primary'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              ]"
            >
              {{ page }}
            </button>
          </div>
          
          <button
            @click="currentPage++"
            :disabled="currentPage * itemsPerPage >= filteredUsers.length"
            class="btn-secondary px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRightIcon class="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>

    <!-- Add User Modal -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showAddUserModal"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click.self="showAddUserModal = false"
      >
        <div class="flex items-center justify-center min-h-screen px-4">
          <div class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"></div>
          <Transition
            enter-active-class="transition-all duration-300"
            enter-from-class="opacity-0 scale-95 translate-y-4"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition-all duration-200"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 translate-y-4"
          >
            <div class="relative glass rounded-2xl max-w-md w-full p-6 border border-gray-200/20 dark:border-gray-800/30">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Add New User</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Create a new user account</p>
                </div>
                <button
                  @click="showAddUserModal = false"
                  class="btn-ghost p-2"
                >
                  <XMarkIcon class="w-5 h-5" />
                </button>
              </div>
              
              <form @submit.prevent="addUser" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Full Name</label>
                  <input
                    v-model="newUser.name"
                    type="text"
                    required
                    class="w-full px-4 py-3 bg-white/90 dark:bg-gray-800/90 border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Enter full name"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Email Address</label>
                  <input
                    v-model="newUser.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 bg-white/90 dark:bg-gray-800/90 border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="user@example.com"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Role</label>
                  <div class="relative">
                    <select
                      v-model="newUser.role"
                      class="w-full px-4 py-3 bg-white/90 dark:bg-gray-800/90 border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 appearance-none text-gray-900 dark:text-gray-100"
                    >
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                    </select>
                    <ChevronDownIcon class="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                <div class="pt-4 flex gap-3">
                  <button
                    type="button"
                    @click="showAddUserModal = false"
                    class="btn-secondary flex-1 px-4 py-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="btn-primary flex-1 px-4 py-3"
                  >
                    <UserPlusIcon class="w-4 h-4 mr-2" />
                    Add User
                  </button>
                </div>
              </form>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { format, formatDistanceToNow } from 'date-fns'
import {
  UserPlusIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilIcon,
  EyeIcon,
  TrashIcon,
  XMarkIcon,
  UsersIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ClockIcon,
} from '@heroicons/vue/24/outline'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
  lastActive: Date
  avatar: string
}

const showAddUserModal = ref(false)
const searchQuery = ref('')
const selectedRole = ref('')
const selectedStatus = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

const newUser = ref({
  name: '',
  email: '',
  role: 'user',
})

const users = ref<User[]>([
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    lastActive: new Date('2025-01-05T10:30:00'),
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'active',
    lastActive: new Date('2025-01-05T09:15:00'),
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'moderator',
    status: 'inactive',
    lastActive: new Date('2025-01-03T14:20:00'),
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'user',
    status: 'active',
    lastActive: new Date('2025-01-05T08:45:00'),
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david@example.com',
    role: 'moderator',
    status: 'active',
    lastActive: new Date('2025-01-04T16:10:00'),
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
])

const userStats = ref([
  {
    name: 'Total Users',
    value: users.value.length.toString(),
    icon: UsersIcon,
    bgColor: 'bg-gradient-to-br from-primary-500 to-primary-600',
  },
  {
    name: 'Active Users',
    value: users.value.filter(u => u.status === 'active').length.toString(),
    icon: UserGroupIcon,
    bgColor: 'bg-gradient-to-br from-success-500 to-success-600',
  },
  {
    name: 'Administrators',
    value: users.value.filter(u => u.role === 'admin').length.toString(),
    icon: ShieldCheckIcon,
    bgColor: 'bg-gradient-to-br from-warning-500 to-warning-600',
  },
  {
    name: 'Online Now',
    value: users.value.filter(u => u.status === 'active' && new Date(u.lastActive) > new Date(Date.now() - 5 * 60 * 1000)).length.toString(),
    icon: ClockIcon,
    bgColor: 'bg-gradient-to-br from-accent-500 to-accent-600',
  },
])

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesRole = !selectedRole.value || user.role === selectedRole.value
    const matchesStatus = !selectedStatus.value || user.status === selectedStatus.value
    
    return matchesSearch && matchesRole && matchesStatus
  })
})

const paginatedUsers = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return filteredUsers.value.slice(startIndex, endIndex)
})

const totalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / itemsPerPage)
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const getRoleBadgeClass = (role: string) => {
  const classes = {
    admin: 'bg-danger-100 text-danger-800 dark:bg-danger-900/30 dark:text-danger-300',
    moderator: 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300',
    user: 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300',
  }
  return classes[role as keyof typeof classes] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
}

const getStatusBadgeClass = (status: string) => {
  const classes = {
    active: 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300',
    inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
}

const getRoleIcon = (role: string) => {
  const icons = {
    admin: ShieldCheckIcon,
    moderator: UserGroupIcon,
    user: UsersIcon,
  }
  return icons[role as keyof typeof icons] || UsersIcon
}

const formatDate = (date: Date) => {
  return format(date, 'MMM dd, yyyy')
}

const getTimeAgo = (date: Date) => {
  return formatDistanceToNow(date, { addSuffix: true })
}

const addUser = () => {
  const user: User = {
    id: users.value.length + 1,
    name: newUser.value.name,
    email: newUser.value.email,
    role: newUser.value.role,
    status: 'active',
    lastActive: new Date(),
    avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80&sig=${Math.random()}`,
  }
  
  users.value.push(user)
  
  // Update stats
  userStats.value[0].value = users.value.length.toString()
  userStats.value[1].value = users.value.filter(u => u.status === 'active').length.toString()
  userStats.value[2].value = users.value.filter(u => u.role === 'admin').length.toString()
  
  showAddUserModal.value = false
  newUser.value = { name: '', email: '', role: 'user' }
}

const editUser = (user: User) => {
  // Implement edit functionality
  console.log('Edit user:', user)
}

const viewUser = (user: User) => {
  // Implement view functionality
  console.log('View user:', user)
}

const deleteUser = (userId: number) => {
  if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
    users.value = users.value.filter(user => user.id !== userId)
    
    // Update stats
    userStats.value[0].value = users.value.length.toString()
    userStats.value[1].value = users.value.filter(u => u.status === 'active').length.toString()
    userStats.value[2].value = users.value.filter(u => u.role === 'admin').length.toString()
    
    // Reset to first page if current page is empty
    if (paginatedUsers.value.length === 0 && currentPage.value > 1) {
      currentPage.value = 1
    }
  }
}
</script>