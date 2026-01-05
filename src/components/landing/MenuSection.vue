<template>
  <section id="menu" class="mb-24">
    <!-- Section Header -->
    <div class="text-center mb-10">
      <span class="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-sm font-semibold rounded-full mb-4"> ☕ Our Menu </span>
      <h2 class="text-3xl md:text-4xl font-bold text-brown-900 mb-2">Complete Menu</h2>
      <p class="text-md text-brown-500">Choose your favorite drink</p>
    </div>

    <!-- Filter Controls -->
    <div class="flex flex-col gap-4 mb-8">
      <!-- Mobile: Search Bar first -->
      <div class="relative w-full md:hidden">
        <input
          type="text"
          placeholder="Cari menu favorit..."
          class="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 bg-white shadow-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
          @input="(e) => $emit('search', e.target.value)"
        />
        <svg class="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>

      <!-- Desktop: Row layout with tabs left, search right -->
      <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <!-- Category Tabs - Left aligned -->
        <div class="relative flex-1">
          <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide scroll-smooth" ref="categoryScroll">
            <button
              v-for="cat in categories"
              :key="cat"
              @click="$emit('category-change', cat)"
              :class="[
                'px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 font-medium text-sm flex-shrink-0',
                selectedCategory === cat ? 'bg-gradient-to-r from-brown-700 to-brown-900 text-white shadow-lg scale-105' : 'bg-white text-brown-600 border border-gray-200 hover:border-brown-300 hover:shadow-md',
              ]"
            >
              {{ cat }}
            </button>
          </div>
          <div class="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-cream-100 to-transparent pointer-events-none md:hidden"></div>
        </div>

        <!-- Desktop Search Bar - Right aligned -->
        <div class="hidden md:block flex-shrink-0">
          <div class="relative w-72">
            <input
              type="text"
              placeholder="Cari menu favorit..."
              class="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 bg-white shadow-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
              @input="(e) => $emit('search', e.target.value)"
            />
            <svg class="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State - Skeleton -->
    <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <SkeletonCard v-for="n in 8" :key="n" />
    </div>

    <!-- Empty State -->
    <div v-else-if="items.length === 0" class="text-center py-16">
      <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-700 mb-2">Menu tidak ditemukan</h3>
      <p class="text-gray-500 text-sm">Coba kata kunci atau kategori lain</p>
    </div>

    <!-- Menu Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <MenuItem v-for="(item, index) in items" :key="item.id" :item="item" :index="index" @add-to-cart="handleAddToCart" />
    </div>

    <!-- Results Count -->
    <div v-if="!isLoading && items.length > 0" class="text-center mt-8">
      <p class="text-sm text-gray-500">
        Menampilkan <span class="font-semibold text-gray-700">{{ items.length }}</span> menu
      </p>
    </div>
  </section>
</template>

<script setup>
import MenuItem from '@/components/product/MenuItem.vue';
import SkeletonCard from '@/components/common/SkeletonCard.vue';

// Props
defineProps({
  items: {
    type: Array,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  selectedCategory: {
    type: String,
    default: 'All',
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emit = defineEmits(['add-to-cart', 'search', 'category-change']);

// Methods
const handleAddToCart = (item, variant) => {
  emit('add-to-cart', item, variant);
};
</script>

<style scoped>
/* CSS Scrollbar Hide */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
