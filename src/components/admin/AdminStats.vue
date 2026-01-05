<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
    <!-- Total Products Card -->
    <div class="stat-card bg-gradient-to-br from-slate-700 to-slate-800 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-slate-300 text-sm font-medium mb-1">Total Menu</p>
          <h3 class="text-3xl font-bold">{{ stats.totalProducts }}</h3>
        </div>
        <div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
      </div>
      <div class="mt-4 flex items-center text-slate-300 text-xs">
        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
        <span>Menu terdaftar</span>
      </div>
    </div>

    <!-- Favorite Products Card -->
    <div class="stat-card bg-gradient-to-br from-amber-700 to-amber-900 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-amber-200 text-sm font-medium mb-1">Menu Favorit</p>
          <h3 class="text-3xl font-bold">{{ stats.favoriteProducts }}</h3>
        </div>
        <div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
          <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        </div>
      </div>
      <div class="mt-4 flex items-center text-amber-200 text-xs">
        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
        </svg>
        <span>Tampil di beranda</span>
      </div>
    </div>

    <!-- Categories Card -->
    <div class="stat-card bg-gradient-to-br from-emerald-700 to-emerald-900 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-emerald-200 text-sm font-medium mb-1">Kategori</p>
          <h3 class="text-3xl font-bold">{{ stats.categories }}</h3>
        </div>
        <div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
      </div>
      <div class="mt-4 flex items-center text-emerald-200 text-xs">
        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path
            fill-rule="evenodd"
            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
            clip-rule="evenodd"
          />
        </svg>
        <span>Jenis menu</span>
      </div>
    </div>

    <!-- Top Category Card -->
    <div class="stat-card bg-gradient-to-br from-violet-800 to-indigo-900 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div class="flex items-center justify-between gap-2">
        <div class="min-w-0 flex-1">
          <p class="text-violet-200 text-sm font-medium mb-1">Kategori Terbanyak</p>
          <h3 class="text-lg font-bold truncate" :title="stats.topCategory || '-'">{{ stats.topCategory || '-' }}</h3>
        </div>
        <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
      </div>
      <div class="mt-4 flex items-center text-violet-200 text-xs">
        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
        <span>{{ stats.topCategoryCount }} produk</span>
      </div>
    </div>

    <!-- Total Orders Card -->
    <div class="stat-card bg-gradient-to-br from-teal-700 to-cyan-900 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-teal-200 text-sm font-medium mb-1">Total Pesanan</p>
          <h3 class="text-3xl font-bold">{{ stats.totalOrders }}</h3>
        </div>
        <div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
        </div>
      </div>
      <div class="mt-4 flex items-center text-teal-200 text-xs">
        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
        </svg>
        <span>Semua pesanan</span>
      </div>
    </div>

    <!-- Pending Orders Card -->
    <div class="stat-card bg-gradient-to-br from-rose-800 to-rose-900 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-rose-200 text-sm font-medium mb-1">Menunggu</p>
          <h3 class="text-3xl font-bold">{{ stats.pendingOrders }}</h3>
        </div>
        <div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <div class="mt-4 flex items-center text-rose-200 text-xs">
        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        <span>Perlu diproses</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
  orders: {
    type: Array,
    default: () => [],
  },
});

const stats = computed(() => {
  const products = props.products;
  const orders = props.orders;

  // Count categories
  const categoryCount = {};
  products.forEach((p) => {
    categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
  });

  // Find top category
  let topCategory = '';
  let topCategoryCount = 0;
  Object.entries(categoryCount).forEach(([cat, count]) => {
    if (count > topCategoryCount) {
      topCategory = cat;
      topCategoryCount = count;
    }
  });

  // Count orders by status
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;

  return {
    totalProducts: products.length,
    favoriteProducts: products.filter((p) => p.is_favorite).length,
    categories: Object.keys(categoryCount).length,
    topCategory,
    topCategoryCount,
    totalOrders: orders.length,
    pendingOrders,
  };
});
</script>

<style scoped>
.stat-card {
  position: relative;
  z-index: 10;
  animation: fadeInUp 0.5s ease-out;
}

.stat-card:nth-child(1) {
  animation-delay: 0ms;
}
.stat-card:nth-child(2) {
  animation-delay: 100ms;
}
.stat-card:nth-child(3) {
  animation-delay: 200ms;
}
.stat-card:nth-child(4) {
  animation-delay: 300ms;
}
.stat-card:nth-child(5) {
  animation-delay: 400ms;
}
.stat-card:nth-child(6) {
  animation-delay: 500ms;
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
</style>
