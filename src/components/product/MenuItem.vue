<template>
  <div class="menu-item bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" :style="{ animationDelay: `${index * 50}ms` }">
    <!-- Image Container -->
    <div class="relative h-52 overflow-hidden">
      <img :src="item.image" :alt="item.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />

      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-col gap-2">
        <!-- Favorite Badge -->
        <span v-if="item.is_favorite" class="inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
          Best Seller
        </span>

        <!-- Category Badge -->
        <span class="inline-flex items-center bg-white/90 backdrop-blur-sm text-brown-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
          {{ item.category }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4">
      <h3 class="text-lg font-bold text-gray-900 mb-1 truncate group-hover:text-green-700 transition-colors">
        {{ item.name }}
      </h3>

      <p v-if="item.description" class="text-xs text-gray-500 mb-3 line-clamp-2">
        {{ item.description }}
      </p>

      <!-- Price Options -->
      <div class="flex flex-col gap-2">
        <!-- Hot Price Option -->
        <div v-if="item.price_hot" class="flex justify-between items-center p-2 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors">
          <div class="flex items-center gap-2">
            <span class="text-lg">🔥</span>
            <div>
              <span class="text-xs text-gray-500">Hot</span>
              <p class="font-bold text-gray-900">{{ item.price_hot }}K</p>
            </div>
          </div>
          <button
            @click="handleAddToCart('Hot')"
            class="w-9 h-9 flex items-center justify-center bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all hover:scale-110 shadow-md active:scale-95"
            title="Tambah Hot ke Keranjang"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
        </div>

        <!-- Cold Price Option -->
        <div v-if="item.price_cold" class="flex justify-between items-center p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
          <div class="flex items-center gap-2">
            <span class="text-lg">❄️</span>
            <div>
              <span class="text-xs text-gray-500">Cold</span>
              <p class="font-bold text-gray-900">{{ item.price_cold }}K</p>
            </div>
          </div>
          <button
            @click="handleAddToCart('Cold')"
            class="w-9 h-9 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all hover:scale-110 shadow-md active:scale-95"
            title="Tambah Cold ke Keranjang"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    default: 0,
  },
});

// Emits
const emit = defineEmits(['add-to-cart']);

// Methods
const handleAddToCart = (variant) => {
  emit('add-to-cart', props.item, variant);
};
</script>

<style scoped>
.menu-item {
  animation: fadeInUp 0.5s ease-out both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}
</style>
