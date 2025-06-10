<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
    >
      {{ label }}
      <span v-if="required" class="text-danger-500">*</span>
    </label>
    
    <div class="relative">
      <div
        v-if="$slots.prefix || prefixIcon"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <slot name="prefix">
          <component
            v-if="prefixIcon"
            :is="prefixIcon"
            class="h-5 w-5 text-neutral-400 dark:text-neutral-600"
          />
        </slot>
      </div>
      
      <input
        :id="inputId"
        v-model="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="inputClasses"
        @focus="isFocused = true"
        @blur="isFocused = false"
        v-bind="$attrs"
      />
      
      <div
        v-if="$slots.suffix || suffixIcon || (type === 'password' && showPasswordToggle)"
        class="absolute inset-y-0 right-0 pr-3 flex items-center"
        :class="{ 'pointer-events-none': !showPasswordToggle }"
      >
        <button
          v-if="type === 'password' && showPasswordToggle"
          type="button"
          @click="togglePasswordVisibility"
          class="text-neutral-400 hover:text-neutral-600 dark:text-neutral-600 dark:hover:text-neutral-400 focus:outline-none"
        >
          <EyeIcon v-if="!showPassword" class="h-5 w-5" />
          <EyeSlashIcon v-else class="h-5 w-5" />
        </button>
        <slot v-else name="suffix">
          <component
            v-if="suffixIcon"
            :is="suffixIcon"
            class="h-5 w-5 text-neutral-400 dark:text-neutral-600"
          />
        </slot>
      </div>
      
      <!-- Animated focus border -->
      <div
        class="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300"
        :class="{
          'ring-2 ring-primary-500 ring-opacity-20': isFocused && !error,
          'ring-2 ring-danger-500 ring-opacity-20': error
        }"
      />
    </div>
    
    <p v-if="hint && !error" class="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
      {{ hint }}
    </p>
    
    <p v-if="error" class="mt-2 text-sm text-danger-600 dark:text-danger-400">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type PropType } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  label: String,
  placeholder: String,
  hint: String,
  error: String,
  disabled: Boolean,
  required: Boolean,
  prefixIcon: Object,
  suffixIcon: Object,
  showPasswordToggle: {
    type: Boolean,
    default: true
  },
  size: {
    type: String as PropType<'sm' | 'md' | 'lg'>,
    default: 'md'
  }
})

const emit = defineEmits(['update:modelValue'])

const inputId = `input-${Math.random().toString(36).substr(2, 9)}`
const isFocused = ref(false)
const showPassword = ref(false)

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const actualType = computed(() => {
  if (props.type === 'password' && showPassword.value) {
    return 'text'
  }
  return props.type
})

const sizeClasses = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5',
  lg: 'px-4 py-3 text-lg'
}

const inputClasses = computed(() => [
  'w-full rounded-xl border bg-white dark:bg-neutral-900',
  'text-neutral-900 dark:text-neutral-100',
  'placeholder-neutral-400 dark:placeholder-neutral-600',
  'transition-all duration-200',
  'focus:outline-none',
  sizeClasses[props.size],
  props.error
    ? 'border-danger-500 dark:border-danger-500'
    : 'border-neutral-200 dark:border-neutral-800 focus:border-primary-500 dark:focus:border-primary-500',
  props.disabled && 'opacity-50 cursor-not-allowed',
  (props.prefixIcon || props.$slots.prefix) && 'pl-10',
  (props.suffixIcon || props.$slots.suffix || (props.type === 'password' && props.showPasswordToggle)) && 'pr-10'
])

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>