<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 font-poppins">
    <!-- Toast Notification -->
    <ToastNotification :show="toast.show" :message="toast.message" :type="toast.type" :title="toast.title" />

    <!-- Main Content -->
    <div class="p-4 md:p-8 max-w-7xl mx-auto">
      <!-- Header -->
      <AdminHeader @logout="handleLogout" />

      <!-- Statistics Cards -->
      <AdminStats :products="products" :orders="orders" />

      <!-- Tab Navigation -->
      <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          @click="activeTab = 'products'"
          :class="['px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 whitespace-nowrap', activeTab === 'products' ? 'bg-brown-700 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md']"
        >
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Kelola Menu
          </span>
        </button>
        <button
          @click="activeTab = 'orders'"
          :class="['px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 whitespace-nowrap', activeTab === 'orders' ? 'bg-brown-700 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md']"
        >
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            Kelola Pesanan
            <span v-if="pendingOrdersCount > 0" class="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{{ pendingOrdersCount }}</span>
          </span>
        </button>
        <button
          @click="activeTab = 'analytics'"
          :class="['px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 whitespace-nowrap', activeTab === 'analytics' ? 'bg-brown-700 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md']"
        >
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Kategori
          </span>
        </button>
      </div>

      <!-- Products Tab -->
      <div v-if="activeTab === 'products'">
        <!-- Add/Edit Product Form -->
        <ProductForm :is-loading="isSubmitting" :edit-mode="isEditMode" :edit-product="editingProduct" @submit="handleFormSubmit" @cancel="cancelEdit" @toast="handleToast" />

        <!-- Product List -->
        <ProductTable :products="products" :is-loading="isLoading" @delete="deleteProduct" @edit="startEdit" />
      </div>

      <!-- Orders Tab -->
      <div v-if="activeTab === 'orders'" class="space-y-6">
        <!-- Orders Header -->
        <div class="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h3 class="text-lg font-bold text-brown-900 flex items-center gap-2">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Daftar Pesanan
              </h3>
              <p class="text-sm text-gray-500 mt-1">Kelola semua pesanan yang masuk</p>
            </div>
            <div class="flex gap-2">
              <button @click="fetchOrders" class="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
              <router-link to="/verify" class="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all text-sm font-medium">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                  />
                </svg>
                Scan QR Pesanan
              </router-link>
            </div>
          </div>

          <!-- Order Status Filter -->
          <div class="order-filter-container flex gap-2 md:gap-3 mb-4 overflow-x-auto pb-2 -mx-2 px-2">
            <button
              @click="orderFilter = 'all'"
              :class="[
                'flex-shrink-0 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap',
                orderFilter === 'all' ? 'bg-gray-800 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
              ]"
            >
              Semua ({{ orders.length }})
            </button>
            <button
              @click="orderFilter = 'pending'"
              :class="[
                'flex-shrink-0 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap',
                orderFilter === 'pending' ? 'bg-amber-600 text-white shadow-md' : 'bg-amber-50 text-amber-700 hover:bg-amber-100',
              ]"
            >
              Menunggu ({{ pendingOrdersCount }})
            </button>
            <button
              @click="orderFilter = 'verified'"
              :class="[
                'flex-shrink-0 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap',
                orderFilter === 'verified' ? 'bg-emerald-600 text-white shadow-md' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
              ]"
            >
              Terverifikasi ({{ verifiedOrdersCount }})
            </button>
            <button
              @click="orderFilter = 'completed'"
              :class="[
                'flex-shrink-0 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap',
                orderFilter === 'completed' ? 'bg-slate-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
              ]"
            >
              Selesai ({{ completedOrdersCount }})
            </button>
          </div>

          <!-- Orders List -->
          <div v-if="isLoadingOrders" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-10 w-10 border-4 border-emerald-500 border-t-transparent"></div>
          </div>

          <div v-else-if="filteredOrders.length === 0" class="text-center py-12 text-gray-500">
            <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p>Belum ada pesanan</p>
          </div>

          <div v-else class="space-y-3">
            <div v-for="order in filteredOrders" :key="order.id" class="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-gray-200 transition-all">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div class="flex items-start gap-4">
                  <!-- Status Badge -->
                  <div :class="['w-12 h-12 rounded-xl flex items-center justify-center', order.status === 'pending' ? 'bg-amber-100' : order.status === 'verified' ? 'bg-emerald-100' : 'bg-blue-100']">
                    <svg v-if="order.status === 'pending'" class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <svg v-else-if="order.status === 'verified'" class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <svg v-else class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <div>
                    <div class="flex items-center gap-2 mb-1">
                      <span class="font-bold text-gray-900 tracking-wider">{{ order.order_code }}</span>
                      <span
                        :class="['px-2 py-0.5 rounded-full text-xs font-medium', order.status === 'pending' ? 'bg-amber-100 text-amber-700' : order.status === 'verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700']"
                      >
                        {{ order.status === 'pending' ? 'Menunggu' : order.status === 'verified' ? 'Terverifikasi' : 'Selesai' }}
                      </span>
                    </div>
                    <p class="text-sm text-gray-600">{{ order.customer_name }} • {{ order.items?.length || 0 }} item</p>
                    <p class="text-xs text-gray-400 mt-1">{{ formatDate(order.created_at) }}</p>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <span class="font-bold text-lg text-emerald-600">Rp {{ order.total_price?.toLocaleString('id-ID') || 0 }}</span>
                  <button v-if="order.status === 'pending'" @click="handleVerifyOrder(order.order_code)" class="px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors">Verifikasi</button>
                  <button v-else-if="order.status === 'verified'" @click="handleCompleteOrder(order.order_code)" class="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors">Selesaikan</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Analytics Tab -->
      <div v-if="activeTab === 'analytics'" class="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <h3 class="text-lg font-bold text-brown-900 mb-6 flex items-center gap-2">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Distribusi Menu per Kategori
        </h3>

        <!-- Category Distribution -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="(count, category) in categoryDistribution" :key="category" class="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start mb-3">
              <h4 class="font-semibold text-gray-800">{{ category }}</h4>
              <span class="text-2xl font-bold text-green-600">{{ count }}</span>
            </div>
            <!-- Progress Bar -->
            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500" :style="{ width: `${(count / maxCategoryCount) * 100}%` }"></div>
            </div>
            <p class="text-xs text-gray-500 mt-2">{{ ((count / products.length) * 100).toFixed(1) }}% dari total menu</p>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="Object.keys(categoryDistribution).length === 0" class="text-center py-12 text-gray-500">
          <p>Belum ada data untuk ditampilkan</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/supabase';
import { useOrderStore } from '@/stores/orderStore';
import AdminHeader from '@/components/admin/AdminHeader.vue';
import AdminStats from '@/components/admin/AdminStats.vue';
import ProductForm from '@/components/admin/ProductForm.vue';
import ProductTable from '@/components/admin/ProductTable.vue';
import ToastNotification from '@/components/common/ToastNotification.vue';

const router = useRouter();
const orderStore = useOrderStore();

// State
const products = ref([]);
const orders = ref([]);
const isLoading = ref(false);
const isLoadingOrders = ref(false);
const isSubmitting = ref(false);
const activeTab = ref('products');
const isEditMode = ref(false);
const editingProduct = ref(null);
const orderFilter = ref('all');

// Toast
const toast = ref({ show: false, message: '', type: 'success', title: '' });

function showToast(message, type = 'success', title = '') {
  toast.value = { show: true, message, type, title };
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
}

function handleToast(data) {
  showToast(data.message, data.type, data.title || '');
}

// Computed - Products
const categoryDistribution = computed(() => {
  const dist = {};
  products.value.forEach((p) => {
    dist[p.category] = (dist[p.category] || 0) + 1;
  });
  return dist;
});

const maxCategoryCount = computed(() => {
  return Math.max(...Object.values(categoryDistribution.value), 1);
});

// Computed - Orders
const pendingOrdersCount = computed(() => {
  return orders.value.filter((o) => o.status === 'pending').length;
});

const verifiedOrdersCount = computed(() => {
  return orders.value.filter((o) => o.status === 'verified').length;
});

const completedOrdersCount = computed(() => {
  return orders.value.filter((o) => o.status === 'completed').length;
});

const filteredOrders = computed(() => {
  if (orderFilter.value === 'all') return orders.value;
  return orders.value.filter((o) => o.status === orderFilter.value);
});

// Fetch Products
async function fetchProducts() {
  isLoading.value = true;
  try {
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: false });

    if (error) throw error;
    products.value = data || [];
  } catch (error) {
    console.error('Error fetching products:', error.message);
    showToast('Gagal mengambil data produk: ' + error.message, 'error');
  } finally {
    isLoading.value = false;
  }
}

// Fetch Orders
async function fetchOrders() {
  isLoadingOrders.value = true;
  try {
    const data = await orderStore.getAllOrders();
    orders.value = data;
  } catch (error) {
    console.error('Error fetching orders:', error.message);
  } finally {
    isLoadingOrders.value = false;
  }
}

// Handle Form Submit (Add or Edit)
async function handleFormSubmit(formData) {
  isSubmitting.value = true;
  try {
    if (isEditMode.value && editingProduct.value) {
      // Update existing product
      const { error } = await supabase.from('products').update(formData).eq('id', editingProduct.value.id);

      if (error) throw error;

      showToast('Menu berhasil diperbarui!', 'success', '✅ Berhasil');
      cancelEdit();
    } else {
      // Add new product
      const { error } = await supabase.from('products').insert([formData]);

      if (error) throw error;

      showToast('Menu berhasil ditambahkan!', 'success', '✅ Berhasil');
    }

    await fetchProducts();
  } catch (error) {
    showToast('Gagal menyimpan produk: ' + error.message, 'error', '❌ Error');
  } finally {
    isSubmitting.value = false;
  }
}

// Start Edit Mode
function startEdit(product) {
  isEditMode.value = true;
  editingProduct.value = { ...product };
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Cancel Edit
function cancelEdit() {
  isEditMode.value = false;
  editingProduct.value = null;
}

// Delete Product
async function deleteProduct(id) {
  if (!confirm('Apakah Anda yakin ingin menghapus menu ini?')) return;

  try {
    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) throw error;

    showToast('Menu berhasil dihapus!', 'success', '🗑️ Dihapus');
    await fetchProducts();
  } catch (error) {
    showToast('Gagal menghapus produk: ' + error.message, 'error');
  }
}

// Handle Verify Order
async function handleVerifyOrder(orderCode) {
  try {
    await orderStore.verifyOrder(orderCode);
    showToast('Pesanan berhasil diverifikasi!', 'success', '✅ Terverifikasi');
    await fetchOrders();
  } catch (error) {
    showToast('Gagal memverifikasi pesanan: ' + error.message, 'error');
  }
}

// Handle Complete Order
async function handleCompleteOrder(orderCode) {
  try {
    await orderStore.completeOrder(orderCode);
    showToast('Pesanan selesai!', 'success', '🎉 Selesai');
    await fetchOrders();
  } catch (error) {
    showToast('Gagal menyelesaikan pesanan: ' + error.message, 'error');
  }
}

// Format Date
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Logout
async function handleLogout() {
  try {
    // Cek apakah ada session aktif terlebih dahulu
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      // Jika ada session, lakukan signOut
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    }

    // Redirect ke login baik ada session atau tidak
    router.push('/login');
  } catch (error) {
    // Jika error karena session missing, tetap redirect ke login
    if (error.message?.includes('session') || error.message?.includes('Auth')) {
      router.push('/login');
      return;
    }
    showToast('Gagal logout: ' + error.message, 'error');
  }
}

// Lifecycle
onMounted(() => {
  fetchProducts();
  fetchOrders();
});
</script>
