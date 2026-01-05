<template>
  <div class="cart-item flex items-center gap-3 py-4 border-b border-gray-100 last:border-b-0">
    <!-- Checkbox -->
    <div class="flex-shrink-0">
      <label class="relative cursor-pointer">
        <input type="checkbox" :checked="isSelected" @change="$emit('toggle-select', item.id)" class="peer sr-only" />
        <div class="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:bg-brown-700 peer-checked:border-brown-700 transition-all flex items-center justify-center">
          <svg class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" :class="isSelected ? 'opacity-100' : 'opacity-0'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </label>
    </div>

    <!-- Product Image - Smaller -->
    <div class="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
      <img :src="item.image || '/placeholder-coffee.jpg'" :alt="item.name" class="w-full h-full object-cover" />
    </div>

    <!-- Product Info -->
    <div class="flex-1 min-w-0">
      <div class="flex items-start justify-between gap-2">
        <div class="min-w-0">
          <h3 class="font-semibold text-gray-900 text-sm truncate">{{ item.name }}</h3>
          <span :class="['inline-flex items-center text-xs font-medium mt-0.5', item.variant === 'Hot' ? 'text-orange-600' : 'text-blue-600']">
            {{ item.variant === 'Hot' ? '🔥 Hot' : '❄️ Cold' }}
          </span>
        </div>
        <button @click="handleRemove" class="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all flex-shrink-0" title="Hapus">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Price & Quantity Row -->
      <div class="flex items-center justify-between mt-2">
        <!-- Quantity Controls -->
        <div class="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
          <button @click="decreaseQuantity" :disabled="isUpdating" class="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-white rounded-md transition-all disabled:opacity-50">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
            </svg>
          </button>

          <span class="w-8 text-center font-semibold text-sm text-gray-900">
            <template v-if="isUpdating">
              <svg class="w-3.5 h-3.5 mx-auto animate-spin text-green-600" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            </template>
            <template v-else>{{ item.quantity }}</template>
          </span>

          <button @click="increaseQuantity" :disabled="isUpdating" class="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-white rounded-md transition-all disabled:opacity-50">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        <!-- Price -->
        <p class="font-bold text-gray-900 text-sm min-w-[80px] text-right flex-shrink-0">Rp {{ subtotal.toLocaleString('id-ID') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useCartStore } from '@/stores/cartStore';

// Props
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emit = defineEmits(['remove', 'toggle-select']);

// Store
const cartStore = useCartStore();

// State
const isUpdating = ref(false);

// Computed
const subtotal = computed(() => {
  return props.item.price * 1000 * props.item.quantity;
});

// Methods
async function increaseQuantity() {
  isUpdating.value = true;
  try {
    await cartStore.updateQuantity(props.item.id, props.item.quantity + 1);
  } finally {
    isUpdating.value = false;
  }
}

async function decreaseQuantity() {
  isUpdating.value = true;
  try {
    if (props.item.quantity <= 1) {
      emit('remove');
    } else {
      await cartStore.updateQuantity(props.item.id, props.item.quantity - 1);
    }
  } finally {
    isUpdating.value = false;
  }
}

function handleRemove() {
  emit('remove');
}
</script>

<style scoped>
.cart-item {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
