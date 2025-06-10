<template>
  <div
    :class="cardClasses"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousemove="handleMouseMove"
  >
    <!-- Gradient border effect -->
    <div
      v-if="variant === 'gradient'"
      class="absolute inset-0 rounded-2xl bg-linear-to-r from-primary-500 to-accent-500 opacity-0 transition-opacity duration-300"
      :class="{ 'opacity-100': isHovered }"
      :style="{ 
        background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(14, 165, 233, 0.15), transparent 40%)` 
      }"
    />
    
    <!-- Glass overlay -->
    <div
      v-if="variant === 'glass'"
      class="absolute inset-0 rounded-2xl bg-linear-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/0"
    />
    
    <!-- Card content -->
    <div class="relative">
      <div v-if="$slots.header" class="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
        <slot name="header" />
      </div>
      
      <div :class="['px-6 py-4', padding]">
        <slot />
      </div>
      
      <div v-if="$slots.footer" class="px-6 py-4 border-t border-neutral-200 dark:border-neutral-800">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type PropType } from 'vue'

type CardVariant = 'default' | 'elevated' | 'glass' | 'gradient' | 'flat'

const props = defineProps({
  variant: {
    type: String as PropType<CardVariant>,
    default: 'default'
  },
  hover: {
    type: Boolean,
    default: false
  },
  padding: {
    type: String,
    default: ''
  }
})

const isHovered = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)

const variantClasses = {
  default: 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-soft',
  elevated: 'bg-white dark:bg-neutral-900 shadow-xl',
  glass: 'backdrop-blur-xl bg-white/70 dark:bg-neutral-900/70 border border-white/20 dark:border-neutral-800/30',
  gradient: 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800',
  flat: 'bg-neutral-50 dark:bg-neutral-900/50'
}

const cardClasses = computed(() => [
  'relative rounded-2xl overflow-hidden transition-all duration-300',
  variantClasses[props.variant],
  props.hover && 'hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1',
  props.variant === 'gradient' && 'hover:border-primary-500/50'
])

const handleMouseEnter = () => {
  if (props.hover || props.variant === 'gradient') {
    isHovered.value = true
  }
}

const handleMouseLeave = () => {
  isHovered.value = false
}

const handleMouseMove = (e: MouseEvent) => {
  if (props.variant === 'gradient') {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    mouseX.value = e.clientX - rect.left
    mouseY.value = e.clientY - rect.top
  }
}
</script>