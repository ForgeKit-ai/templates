<template>
  <component
    :is="as"
    :class="buttonClasses"
    :disabled="disabled || loading"
    v-bind="$attrs"
  >
    <span
      v-if="loading"
      class="absolute inset-0 flex items-center justify-center"
    >
      <svg
        class="animate-spin h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </span>
    
    <span
      :class="[
        'inline-flex items-center gap-2 transition-all',
        loading && 'opacity-0'
      ]"
    >
      <slot name="icon-left" />
      <slot />
      <slot name="icon-right" />
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const props = defineProps({
  as: {
    type: String as PropType<'button' | 'a' | 'router-link'>,
    default: 'button'
  },
  variant: {
    type: String as PropType<ButtonVariant>,
    default: 'primary'
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'md'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  rounded: {
    type: Boolean,
    default: false
  }
})

const variantClasses = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 active:shadow-sm',
  secondary: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:ring-neutral-500 border border-neutral-200 dark:border-neutral-700',
  ghost: 'hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:ring-neutral-500 text-neutral-700 dark:text-neutral-300',
  danger: 'bg-danger-500 text-white hover:bg-danger-600 focus:ring-danger-500 shadow-lg shadow-danger-500/25 hover:shadow-xl hover:shadow-danger-500/30',
  success: 'bg-success-500 text-white hover:bg-success-600 focus:ring-success-500 shadow-lg shadow-success-500/25 hover:shadow-xl hover:shadow-success-500/30'
}

const sizeClasses = {
  xs: 'px-2.5 py-1.5 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
  xl: 'px-6 py-3.5 text-base'
}

const buttonClasses = computed(() => [
  'relative inline-flex items-center justify-center font-medium transition-all duration-200',
  'focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-neutral-900',
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none',
  'transform active:scale-[0.98]',
  variantClasses[props.variant],
  sizeClasses[props.size],
  props.rounded ? 'rounded-full' : 'rounded-xl',
  props.fullWidth && 'w-full',
  props.loading && 'cursor-wait'
])
</script>