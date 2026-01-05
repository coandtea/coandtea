<template>
  <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
    <!-- Table Header -->
    <div class="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 class="text-xl font-bold text-brown-900 flex items-center gap-2">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Daftar Menu
          </h2>
          <p class="text-sm text-gray-500 mt-1">{{ filteredProducts.length }} dari {{ products.length }} menu</p>
        </div>

        <!-- Search Input -->
        <div class="relative w-full sm:w-72">
          <input v-model="searchQuery" type="text" placeholder="Cari menu..." class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all text-sm" />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <button v-if="searchQuery" @click="searchQuery = ''" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="p-12 text-center">
      <div class="inline-flex items-center gap-3">
        <svg class="w-6 h-6 animate-spin text-green-600" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
        <span class="text-gray-500">Memuat data produk...</span>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="products.length === 0" class="p-12 text-center">
      <div class="w-20 h-20 bg-cream-300 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-10 h-10 text-brown-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>
      <h3 class="text-lg font-bold text-brown-900 mb-2">Belum Ada Produk</h3>
      <p class="text-gray-500 text-sm">Tambahkan produk pertama Anda menggunakan form di atas!</p>
    </div>

    <!-- No Search Results -->
    <div v-else-if="filteredProducts.length === 0" class="p-12 text-center">
      <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 class="text-lg font-bold text-gray-700 mb-2">Tidak Ada Hasil</h3>
      <p class="text-gray-500 text-sm">Tidak ditemukan menu dengan kata kunci "{{ searchQuery }}"</p>
    </div>

    <!-- Table -->
    <div v-else class="overflow-x-auto">
      <table class="w-full text-left">
        <thead class="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
          <tr>
            <th class="p-4 font-semibold">Produk</th>
            <th class="p-4 font-semibold">Kategori</th>
            <th class="p-4 font-semibold">Harga</th>
            <th class="p-4 font-semibold text-center">Status</th>
            <th class="p-4 font-semibold text-center">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50/50 transition-colors group">
            <!-- Product Info -->
            <td class="p-4">
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                  <img :src="product.image" :alt="product.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 flex items-center gap-1">
                    {{ product.name }}
                    <span v-if="product.is_favorite" class="text-yellow-500" title="Menu Favorit">⭐</span>
                  </h4>
                  <p class="text-sm text-gray-500 line-clamp-1 max-w-xs">{{ product.description || '-' }}</p>
                </div>
              </div>
            </td>

            <!-- Category -->
            <td class="p-4">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                {{ product.category }}
              </span>
            </td>

            <!-- Price -->
            <td class="p-4">
              <div class="space-y-1 text-sm">
                <div v-if="product.price_hot" class="flex items-center gap-1">
                  <span class="text-orange-500">🔥</span>
                  <span class="font-medium text-gray-700">{{ product.price_hot }}K</span>
                </div>
                <div v-if="product.price_cold" class="flex items-center gap-1">
                  <span class="text-blue-500">❄️</span>
                  <span class="font-medium text-gray-700">{{ product.price_cold }}K</span>
                </div>
              </div>
            </td>

            <!-- Status -->
            <td class="p-4 text-center">
              <span v-if="product.is_favorite" class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                Favorit
              </span>
              <span v-else class="text-gray-400 text-xs">-</span>
            </td>

            <!-- Actions -->
            <td class="p-4 text-center">
              <div class="flex items-center justify-center gap-2">
                <button @click="$emit('edit', product)" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button @click="$emit('delete', product.id)" class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['delete', 'edit']);

// State
const searchQuery = ref('');

// Computed
const filteredProducts = computed(() => {
  if (!searchQuery.value) return props.products;

  const query = searchQuery.value.toLowerCase();
  return props.products.filter((p) => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query) || (p.description && p.description.toLowerCase().includes(query)));
});
</script>

<style scoped>
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  --webkit-box-orient: vertical;
  --webkit-line-clamp: 1;
}
</style>
