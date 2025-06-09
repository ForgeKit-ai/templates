<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Settings</h1>
      <p class="mt-2 text-gray-600">Manage your application settings</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Settings navigation -->
      <div class="lg:col-span-1">
        <nav class="space-y-1">
          <button
            v-for="tab in settingsTabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            :class="[
              activeTab === tab.id
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            ]"
          >
            <component :is="tab.icon" class="inline-block w-5 h-5 mr-3" />
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Settings content -->
      <div class="lg:col-span-2">
        <!-- Profile Settings -->
        <div v-if="activeTab === 'profile'" class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-6">Profile Settings</h3>
          <form @submit.prevent="saveProfile">
            <div class="space-y-6">
              <div class="flex items-center space-x-6">
                <img
                  :src="profile.avatar"
                  alt="Profile"
                  class="h-20 w-20 rounded-full object-cover"
                />
                <div>
                  <button
                    type="button"
                    class="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors duration-200"
                  >
                    Change Avatar
                  </button>
                  <p class="mt-2 text-sm text-gray-500">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    v-model="profile.firstName"
                    type="text"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    v-model="profile.lastName"
                    type="text"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input
                  v-model="profile.email"
                  type="email"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  v-model="profile.bio"
                  rows="4"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                ></textarea>
              </div>
            </div>

            <div class="mt-6 flex justify-end">
              <button
                type="submit"
                class="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        <!-- Security Settings -->
        <div v-if="activeTab === 'security'" class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-6">Security Settings</h3>
          
          <!-- Change Password -->
          <div class="mb-8">
            <h4 class="text-md font-medium text-gray-900 mb-4">Change Password</h4>
            <form @submit.prevent="changePassword">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Current Password</label>
                  <input
                    v-model="passwordForm.current"
                    type="password"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">New Password</label>
                  <input
                    v-model="passwordForm.new"
                    type="password"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <input
                    v-model="passwordForm.confirm"
                    type="password"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              <div class="mt-4">
                <button
                  type="submit"
                  class="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors duration-200"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>

          <!-- Two-Factor Authentication -->
          <div>
            <h4 class="text-md font-medium text-gray-900 mb-4">Two-Factor Authentication</h4>
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-md">
              <div>
                <p class="text-sm font-medium text-gray-900">SMS Authentication</p>
                <p class="text-sm text-gray-500">Receive verification codes via SMS</p>
              </div>
              <button
                @click="toggleTwoFactor"
                class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                :class="[twoFactorEnabled ? 'bg-primary-600' : 'bg-gray-200']"
              >
                <span
                  class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out"
                  :class="[twoFactorEnabled ? 'translate-x-5' : 'translate-x-0']"
                />
              </button>
            </div>
          </div>
        </div>

        <!-- Notifications Settings -->
        <div v-if="activeTab === 'notifications'" class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-6">Notification Preferences</h3>
          
          <div class="space-y-6">
            <div v-for="notification in notificationSettings" :key="notification.id">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">{{ notification.title }}</h4>
                  <p class="text-sm text-gray-500">{{ notification.description }}</p>
                </div>
                <button
                  @click="notification.enabled = !notification.enabled"
                  class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  :class="[notification.enabled ? 'bg-primary-600' : 'bg-gray-200']"
                >
                  <span
                    class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out"
                    :class="[notification.enabled ? 'translate-x-5' : 'translate-x-0']"
                  />
                </button>
              </div>
            </div>
          </div>

          <div class="mt-6 flex justify-end">
            <button
              @click="saveNotifications"
              class="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors duration-200"
            >
              Save Preferences
            </button>
          </div>
        </div>

        <!-- System Settings -->
        <div v-if="activeTab === 'system'" class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-6">System Settings</h3>
          
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
              <select
                v-model="systemSettings.timezone"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="Europe/London">London</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select
                v-model="systemSettings.language"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    v-model="systemSettings.theme"
                    type="radio"
                    value="light"
                    class="text-primary-600 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-gray-700">Light</span>
                </label>
                <label class="flex items-center">
                  <input
                    v-model="systemSettings.theme"
                    type="radio"
                    value="dark"
                    class="text-primary-600 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-gray-700">Dark</span>
                </label>
                <label class="flex items-center">
                  <input
                    v-model="systemSettings.theme"
                    type="radio"
                    value="auto"
                    class="text-primary-600 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-gray-700">Auto</span>
                </label>
              </div>
            </div>
          </div>

          <div class="mt-6 flex justify-end">
            <button
              @click="saveSystemSettings"
              class="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors duration-200"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  UserIcon,
  ShieldCheckIcon,
  BellIcon,
  CogIcon,
} from '@heroicons/vue/24/outline'

const activeTab = ref('profile')

const settingsTabs = [
  { id: 'profile', name: 'Profile', icon: UserIcon },
  { id: 'security', name: 'Security', icon: ShieldCheckIcon },
  { id: 'notifications', name: 'Notifications', icon: BellIcon },
  { id: 'system', name: 'System', icon: CogIcon },
]

const profile = ref({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  bio: 'Software developer with a passion for creating great user experiences.',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
})

const passwordForm = ref({
  current: '',
  new: '',
  confirm: '',
})

const twoFactorEnabled = ref(false)

const notificationSettings = ref([
  {
    id: 1,
    title: 'Email Notifications',
    description: 'Receive notifications via email',
    enabled: true,
  },
  {
    id: 2,
    title: 'Push Notifications',
    description: 'Receive push notifications in your browser',
    enabled: false,
  },
  {
    id: 3,
    title: 'SMS Notifications',
    description: 'Receive important updates via SMS',
    enabled: true,
  },
  {
    id: 4,
    title: 'Marketing Emails',
    description: 'Receive product updates and marketing emails',
    enabled: false,
  },
])

const systemSettings = ref({
  timezone: 'UTC',
  language: 'en',
  theme: 'auto',
})

const saveProfile = () => {
  console.log('Saving profile:', profile.value)
  // Implement save logic
}

const changePassword = () => {
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    alert('New passwords do not match')
    return
  }
  console.log('Changing password')
  // Implement password change logic
  passwordForm.value = { current: '', new: '', confirm: '' }
}

const toggleTwoFactor = () => {
  twoFactorEnabled.value = !twoFactorEnabled.value
  console.log('Two-factor authentication:', twoFactorEnabled.value ? 'enabled' : 'disabled')
}

const saveNotifications = () => {
  console.log('Saving notification settings:', notificationSettings.value)
  // Implement save logic
}

const saveSystemSettings = () => {
  console.log('Saving system settings:', systemSettings.value)
  // Implement save logic
}
</script>