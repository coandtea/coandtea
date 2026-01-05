<template>
  <Transition name="toast">
    <div v-if="show" class="fixed top-24 right-5 z-[100] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3" :class="typeClasses">
      <!-- Icon -->
      <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
        <svg v-if="type === 'success'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
        </svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>

      <!-- Content -->
      <div>
        <h4 class="font-bold text-sm">{{ title }}</h4>
        <p class="text-xs text-white/90">{{ message }}</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue';

// Props
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error'].includes(value),
  },
  title: {
    type: String,
    default: '',
  },
});

// Computed
const typeClasses = computed(() => {
  return props.type === 'success' ? 'bg-brown-900 text-white' : 'bg-red-600 text-white';
});
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
