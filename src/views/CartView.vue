<template>
  <div class="min-h-screen bg-gray-50 font-poppins">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <router-link to="/" class="flex items-center gap-2 text-gray-600 hover:text-brown-700 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span class="text-sm font-medium">Kembali</span>
          </router-link>

          <h1 class="text-lg font-medium text-gray-900">
            Keranjang Saya <span class="text-sm">({{ cartStore.totalItems }})</span>
          </h1>

          <div class="w-16"></div>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-4 py-6 pb-32 lg:pb-6">
      <!-- Empty State -->
      <div v-if="cartStore.items.length === 0" class="flex flex-col items-center justify-center py-16">
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-gray-900 mb-2">Keranjang Kosong</h2>
        <p class="text-gray-500 text-center text-sm mb-6 max-w-xs">Anda belum menambahkan item ke keranjang</p>
        <router-link to="/" class="bg-brown-700 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-brown-700 transition-colors text-sm"> Lihat Menu </router-link>
      </div>

      <!-- Cart Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Cart Items List -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <!-- Header with Select All -->
            <div class="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <label class="flex items-center gap-3 cursor-pointer">
                <div class="relative">
                  <input type="checkbox" :checked="isAllSelected" @change="toggleSelectAll" class="peer sr-only" />
                  <div class="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:bg-brown-700 peer-checked:border-brown-700 transition-all flex items-center justify-center">
                    <svg class="w-3 h-3 text-white" :class="isAllSelected ? 'opacity-100' : 'opacity-0'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span class="font-medium text-gray-900 text-sm">Pilih Semua ({{ cartStore.totalItems }})</span>
              </label>
              <button @click="handleClearCart" class="text-xs text-red-500 hover:text-red-700 transition-colors">Hapus Semua</button>
            </div>

            <!-- Items -->
            <div class="divide-y divide-gray-100">
              <CartItem v-for="item in cartStore.items" :key="item.id" :item="item" :is-selected="selectedItems.has(item.id)" class="px-4" @remove="handleRemoveItem(item.id)" @toggle-select="toggleItemSelect" />
            </div>
          </div>
        </div>

        <!-- Order Summary - Desktop -->
        <div class="hidden lg:block lg:col-span-1">
          <div class="bg-white rounded-xl shadow-sm p-5 sticky top-24">
            <h3 class="font-bold text-gray-900 mb-4">Ringkasan Pesanan</h3>

            <!-- Selected Items Info -->
            <div class="mb-4 p-3 bg-gray-50 rounded-lg">
              <p class="text-sm text-gray-600">
                <span class="font-semibold text-gray-900">{{ selectedItemsCount }}</span> item dipilih
              </p>
            </div>

            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-medium">{{ formattedSelectedTotal }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Biaya Layanan</span>
                <span class="font-bold text-green-600">Gratis</span>
              </div>
            </div>

            <div class="border-t border-gray-100 my-4"></div>

            <div class="flex justify-between items-center mb-5">
              <span class="font-bold text-gray-900">Total</span>
              <span class="text-xl font-bold text-brown-700">{{ formattedSelectedTotal }}</span>
            </div>

            <button
              @click="openCheckoutModal"
              :disabled="selectedItemsCount === 0"
              :class="['w-full font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2', selectedItemsCount > 0 ? 'bg-brown-700 text-white hover:bg-brown-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed']"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ selectedItemsCount > 0 ? 'Checkout' : 'Pilih item untuk checkout' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Fixed Bottom Bar -->
    <div v-if="cartStore.items.length > 0" class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="text-xs text-gray-500">Total ({{ selectedItemsCount }} item)</p>
          <p class="text-lg font-bold text-gray-900">{{ formattedSelectedTotal }}</p>
        </div>
        <button
          @click="openCheckoutModal"
          :disabled="selectedItemsCount === 0"
          :class="[
            'flex-1 max-w-xs font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2',
            selectedItemsCount > 0 ? 'bg-brown-700 text-white hover:bg-brown-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed',
          ]"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ selectedItemsCount > 0 ? 'Checkout' : 'Pilih item' }}
        </button>
      </div>
    </div>

    <!-- Checkout Modal -->
    <CheckoutModal :is-open="isCheckoutModalOpen" :items="selectedItemsData" :total-price="selectedTotal" @close="closeCheckoutModal" @order-created="handleOrderCreated" @order-verified="handleOrderVerified" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/config/constants';
import CartItem from '@/components/cart/CartItem.vue';
import CheckoutModal from '@/components/checkout/CheckoutModal.vue';

const cartStore = useCartStore();

// State - Set of selected item IDs
const selectedItems = ref(new Set());
const isCheckoutModalOpen = ref(false);

// Watch for cart changes and clean up selected items that no longer exist
watch(
  () => cartStore.items,
  (newItems) => {
    const existingIds = new Set(newItems.map((item) => item.id));
    selectedItems.value = new Set([...selectedItems.value].filter((id) => existingIds.has(id)));
  },
  { deep: true }
);

// Computed
const selectedItemsCount = computed(() => {
  return [...selectedItems.value].reduce((total, id) => {
    const item = cartStore.items.find((i) => i.id === id);
    return total + (item ? item.quantity : 0);
  }, 0);
});

const selectedItemsData = computed(() => {
  return cartStore.items.filter((item) => selectedItems.value.has(item.id));
});

const selectedTotal = computed(() => {
  return selectedItemsData.value.reduce((total, item) => {
    return total + item.price * 1000 * item.quantity;
  }, 0);
});

const formattedSelectedTotal = computed(() => {
  return formatPrice(selectedTotal.value / 1000);
});

const isAllSelected = computed(() => {
  return cartStore.items.length > 0 && selectedItems.value.size === cartStore.items.length;
});

// Methods
function toggleItemSelect(itemId) {
  const newSelected = new Set(selectedItems.value);
  if (newSelected.has(itemId)) {
    newSelected.delete(itemId);
  } else {
    newSelected.add(itemId);
  }
  selectedItems.value = newSelected;
}

function toggleSelectAll() {
  if (isAllSelected.value) {
    selectedItems.value = new Set();
  } else {
    selectedItems.value = new Set(cartStore.items.map((item) => item.id));
  }
}

function openCheckoutModal() {
  if (selectedItemsCount.value === 0) return;
  isCheckoutModalOpen.value = true;
}

function closeCheckoutModal() {
  isCheckoutModalOpen.value = false;
}

async function handleOrderCreated(order) {
  console.log('Order created:', order);
  // Clear selected items karena item sudah dihapus dari keranjang
  selectedItems.value = new Set();
}

async function handleRemoveItem(itemId) {
  await cartStore.removeItem(itemId);
}

async function handleClearCart() {
  if (confirm('Hapus semua item dari keranjang?')) {
    await cartStore.clearCart();
    selectedItems.value = new Set();
  }
}

// Handle when order is verified by cashier
function handleOrderVerified() {
  // Clear selected items from the set
  selectedItems.value = new Set();
  // Close the modal
  isCheckoutModalOpen.value = false;
}
</script>
