<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-md" @click="handleBackdropClick"></div>

        <!-- Modal Content -->
        <div class="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-hidden animate-modal-in flex flex-col">
          <!-- Header - Dynamic based on status -->
          <div class="relative overflow-hidden flex-shrink-0">
            <div :class="['absolute inset-0', headerGradient]"></div>
            <div
              class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.08%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"
            ></div>
            <div class="relative text-white p-4 text-center">
              <!-- Status Icon Animation - Smaller -->
              <div class="relative w-12 h-12 mx-auto mb-2">
                <div :class="['absolute inset-0 rounded-full', orderStatus === 'verified' ? 'bg-white/30 animate-ping' : 'bg-white/20 animate-pulse']"></div>
                <div class="relative w-full h-full bg-white/25 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <!-- Create Order Icon -->
                  <svg v-if="!orderCode" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <!-- Pending Icon -->
                  <svg v-else-if="orderStatus === 'pending'" class="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <!-- Verified Icon -->
                  <svg v-else-if="orderStatus === 'verified'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 class="text-lg sm:text-xl font-bold tracking-tight">{{ headerTitle }}</h2>
              <p class="text-white/80 text-xs mt-0.5 font-medium">{{ headerSubtitle }}</p>
            </div>
          </div>

          <!-- Body - Scrollable with custom scrollbar -->
          <div class="p-4 overflow-y-auto flex-1 modal-scroll">
            <!-- ============ STATE 1: VERIFIED SUCCESS ============ -->
            <div v-if="orderStatus === 'verified'" class="text-center py-2">
              <!-- Success Icon -->
              <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-200">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h3 class="text-xl font-bold text-gray-900 mb-1">Pesanan Dikonfirmasi!</h3>
              <p class="text-gray-500 text-sm mb-6">Pesanan Anda sedang diproses</p>

              <!-- Order Summary -->
              <div class="bg-gray-50 rounded-xl p-4 mb-4 text-left">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm text-gray-500">Kode Pesanan</span>
                  <span class="font-bold text-gray-900 tracking-wider">{{ orderCode }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500">Total</span>
                  <span class="font-bold text-green-600">{{ formattedTotal }}</span>
                </div>
              </div>

              <!-- Next Step Info -->
              <div class="bg-amber-50 rounded-xl p-4 mb-6 text-left border border-amber-100">
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-semibold text-amber-800 text-sm">Langkah Selanjutnya</p>
                    <p class="text-xs text-amber-700 mt-1">Tunggu pesanan Anda dipanggil dan ambil di counter.</p>
                  </div>
                </div>
              </div>

              <!-- Done Button -->
              <button
                @click="handleOrderComplete"
                class="w-full py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Selesai
              </button>
            </div>

            <!-- ============ STATE 2: PENDING (QR Code Display) ============ -->
            <div v-else-if="orderCode && orderStatus === 'pending'" class="text-center">
              <!-- QR Code Container - Compact -->
              <div class="relative inline-block mb-4">
                <div class="absolute -inset-2 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 rounded-xl opacity-20 blur-lg animate-pulse"></div>
                <div ref="qrContainer" class="relative bg-white p-3 rounded-xl shadow-lg border border-gray-100">
                  <img :src="qrCodeUrl" alt="QR Code" class="w-36 h-36 sm:w-44 sm:h-44 mx-auto" />
                </div>
              </div>

              <!-- Order Code Badge - Compact -->
              <div class="bg-gradient-to-r from-slate-50 to-gray-100 rounded-xl p-3 mb-4 border border-gray-200/50">
                <p class="text-xs text-gray-500 mb-0.5 uppercase tracking-wider font-semibold">Kode Pesanan</p>
                <p class="text-2xl font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">{{ orderCode }}</p>
              </div>

              <!-- Steps to Follow -->
              <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 mb-4 border border-blue-100">
                <h4 class="font-bold text-blue-900 text-sm mb-3 flex items-center justify-center gap-2">
                  <ListOrdered class="w-4 h-4" />
                  Langkah Selanjutnya
                </h4>
                <div class="space-y-2.5">
                  <!-- Step 1 -->
                  <div class="flex items-center gap-3 bg-white rounded-lg p-2.5 border border-blue-100">
                    <div class="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span class="text-white text-xs font-bold">1</span>
                    </div>
                    <p class="text-sm text-gray-700 text-left"><strong>Screenshot</strong> atau <strong>Download</strong> QR Code ini</p>
                  </div>
                  <!-- Step 2 -->
                  <div class="flex items-center gap-3 bg-white rounded-lg p-2.5 border border-blue-100">
                    <div class="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span class="text-white text-xs font-bold">2</span>
                    </div>
                    <p class="text-sm text-gray-700 text-left">Pergi ke <strong>kasir</strong> untuk membayar</p>
                  </div>
                  <!-- Step 3 -->
                  <div class="flex items-center gap-3 bg-white rounded-lg p-2.5 border border-blue-100">
                    <div class="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span class="text-white text-xs font-bold">3</span>
                    </div>
                    <p class="text-sm text-gray-700 text-left"><strong>Tunjukkan QR</strong> ke kasir untuk verifikasi</p>
                  </div>
                </div>
              </div>

              <!-- Realtime Status Indicator -->
              <div class="flex items-center justify-center gap-2 mb-4 p-2 bg-amber-50 rounded-lg border border-amber-200">
                <span class="relative flex h-2.5 w-2.5">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                </span>
                <span class="text-xs text-amber-700 font-medium">Menunggu konfirmasi kasir...</span>
              </div>

              <!-- Action Buttons - Compact -->
              <div class="flex gap-2">
                <button
                  @click="downloadQR"
                  class="flex-1 py-2.5 px-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-[0.98] text-sm"
                >
                  <Download class="w-4 h-4" />
                  Download
                </button>
                <button
                  @click="copyCode"
                  class="flex-1 py-2.5 px-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold rounded-lg hover:from-slate-700 hover:to-slate-800 transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-[0.98] text-sm"
                >
                  <Copy class="w-4 h-4" />
                  Salin Kode
                </button>
              </div>
            </div>

            <div v-else class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2"> Nama Anda <span class="text-red-500">*</span> </label>
                <input
                  v-model="customerName"
                  type="text"
                  placeholder="Masukkan nama Anda..."
                  :class="[
                    'w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-gray-50 focus:bg-white',
                    nameError ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200',
                  ]"
                  @input="nameError = ''"
                />
                <p v-if="nameError" class="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ nameError }}
                </p>
              </div>

              <!-- Payment Methods Info -->
              <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                <p class="text-sm text-blue-800 font-medium mb-2">💳 Metode Pembayaran Tersedia:</p>
                <div class="flex gap-3">
                  <span class="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700 border border-blue-100">
                    <QrCode class="w-4 h-4 text-purple-500" />
                    QR Code
                  </span>
                  <span class="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700 border border-blue-100">
                    <Banknote class="w-4 h-4 text-green-500" />
                    Tunai
                  </span>
                </div>
              </div>

              <!-- Create QR Code Button -->
              <button
                @click="createQROrder"
                :disabled="isLoading"
                class="w-full flex items-center gap-4 p-5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl hover:from-emerald-600 hover:to-teal-700 transition-all group shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white backdrop-blur-sm">
                  <!-- QR Code Icon - Fixed SVG -->
                  <QrCode v-if="!isLoading" class="w-7 h-7" />
                  <Loader2 v-else class="w-7 h-7 animate-spin" />
                </div>
                <div class="flex-1 text-left">
                  <h3 class="font-bold text-white text-lg">{{ isLoading ? 'Membuat Pesanan...' : 'Buat Pesanan' }}</h3>
                  <p class="text-sm text-emerald-100">Dapatkan QR Code untuk verifikasi di kasir</p>
                </div>
                <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <ChevronRight class="w-5 h-5 text-white" />
                </div>
              </button>

              <!-- Cancel Button - More Visible -->
              <button
                @click="close"
                class="w-full py-3.5 mt-3 text-gray-600 hover:text-gray-800 transition-all text-sm font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <X class="w-4 h-4" />
                Batal
              </button>
            </div>

            <!-- Loading Overlay -->
            <div v-if="isLoading && !orderCode" class="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-3xl">
              <div class="flex flex-col items-center gap-4">
                <div class="relative">
                  <div class="w-16 h-16 border-4 border-emerald-100 rounded-full"></div>
                  <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-emerald-500 rounded-full animate-spin"></div>
                </div>
                <p class="text-gray-700 font-semibold">Membuat pesanan...</p>
                <p class="text-gray-400 text-sm">Mohon tunggu sebentar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Toast Notification -->
    <Transition name="toast">
      <div v-if="showToast" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
        <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span class="font-medium">{{ toastMessage }}</span>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue';
import QRCode from 'qrcode';
import { useOrderStore } from '@/stores/orderStore';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/config/constants';
import { supabase } from '@/supabase';
import { QrCode, Wallet, Banknote, Check, Download, Copy, X, ChevronRight, Clock, Loader2, AlertCircle, CheckCircle, ListOrdered } from 'lucide-vue-next';

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array,
    default: () => [],
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
});

// Emits
const emit = defineEmits(['close', 'order-created', 'order-verified']);

// Stores
const orderStore = useOrderStore();
const cartStore = useCartStore();

// State
const customerName = ref('');
const orderCode = ref('');
const orderStatus = ref('pending'); // 'pending', 'verified', 'completed'
const qrCodeUrl = ref('');
const isLoading = ref(false);
const qrContainer = ref(null);
const showToast = ref(false);
const toastMessage = ref('');
const nameError = ref('');

// Realtime subscription
let realtimeSubscription = null;

// Computed
const formattedTotal = computed(() => {
  return formatPrice(props.totalPrice / 1000);
});

const headerGradient = computed(() => {
  if (orderStatus.value === 'verified') {
    return 'bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600';
  } else if (orderCode.value) {
    return 'bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600';
  }
  return 'bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600';
});

const headerTitle = computed(() => {
  if (orderStatus.value === 'verified') {
    return '✅ Pesanan Dikonfirmasi!';
  } else if (orderCode.value) {
    return '⏳ Menunggu Konfirmasi';
  }
  return 'Buat Pesanan';
});

const headerSubtitle = computed(() => {
  if (orderStatus.value === 'verified') {
    return 'Pesanan sedang diproses';
  } else if (orderCode.value) {
    return 'Tunjukkan QR Code ke kasir';
  }
  return 'Total: ' + formattedTotal.value;
});

// Subscribe to order status changes
function subscribeToOrderStatus(code) {
  // Unsubscribe from previous subscription if exists
  if (realtimeSubscription) {
    supabase.removeChannel(realtimeSubscription);
  }

  // Create new subscription
  realtimeSubscription = supabase
    .channel(`order-${code}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'orders',
        filter: `order_code=eq.${code}`,
      },
      (payload) => {
        console.log('Order updated:', payload);
        if (payload.new && payload.new.status) {
          orderStatus.value = payload.new.status;

          if (payload.new.status === 'verified') {
            showToastNotification('Pesanan Anda telah dikonfirmasi! 🎉');
          }
        }
      }
    )
    .subscribe();
}

// Cleanup subscription
function unsubscribeFromOrder() {
  if (realtimeSubscription) {
    supabase.removeChannel(realtimeSubscription);
    realtimeSubscription = null;
  }
}

// Reset state when modal closes
watch(
  () => props.isOpen,
  (newVal) => {
    if (!newVal) {
      // Delay reset to allow animation
      setTimeout(() => {
        orderCode.value = '';
        orderStatus.value = 'pending';
        qrCodeUrl.value = '';
        customerName.value = '';
        nameError.value = '';
        unsubscribeFromOrder();
      }, 300);
    }
  }
);

// Cleanup on unmount
onUnmounted(() => {
  unsubscribeFromOrder();
});

// Methods
function close() {
  emit('close');
}

function handleBackdropClick() {
  // Only allow closing if not verified state
  if (orderStatus.value !== 'verified') {
    close();
  }
}

function showToastNotification(message) {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
}

async function createQROrder() {
  if (props.items.length === 0) return;

  // Validate customer name
  if (!customerName.value.trim()) {
    nameError.value = 'Nama wajib diisi';
    return;
  }

  isLoading.value = true;

  try {
    // Create order in database
    const order = await orderStore.createOrder(props.items, props.totalPrice, customerName.value.trim());

    orderCode.value = order.order_code;
    orderStatus.value = 'pending';

    // Generate QR Code with order code
    const qrData = JSON.stringify({
      code: order.order_code,
      total: props.totalPrice,
      items: props.items.length,
    });

    qrCodeUrl.value = await QRCode.toDataURL(qrData, {
      width: 300,
      margin: 2,
      color: {
        dark: '#1f2937',
        light: '#ffffff',
      },
    });

    // LANGSUNG hapus item dari keranjang setelah order dibuat
    await cartStore.removeCheckedOutItems(props.items);

    // Subscribe to order status changes
    subscribeToOrderStatus(order.order_code);

    emit('order-created', order);
  } catch (error) {
    console.error('Error creating QR order:', error);
    showToastNotification('Gagal membuat pesanan. Silakan coba lagi.');
  } finally {
    isLoading.value = false;
  }
}

function handleOrderComplete() {
  // Item sudah dihapus saat order dibuat, langsung tutup modal
  emit('order-verified');
  close();
}

function copyCode() {
  navigator.clipboard.writeText(orderCode.value);
  showToastNotification('Kode pesanan berhasil disalin!');
}

async function downloadQR() {
  if (!qrCodeUrl.value) return;

  try {
    // Create a canvas to combine QR code with branding
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Load the QR code image
    const img = new Image();
    img.src = qrCodeUrl.value;

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    // Set canvas size
    const padding = 40;
    const headerHeight = 80;
    const footerHeight = 100;
    canvas.width = img.width + padding * 2;
    canvas.height = img.height + padding * 2 + headerHeight + footerHeight;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, headerHeight);
    gradient.addColorStop(0, '#f59e0b');
    gradient.addColorStop(1, '#d97706');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, headerHeight);

    // Header text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Co & Tea', canvas.width / 2, 35);
    ctx.font = '14px Arial, sans-serif';
    ctx.fillText('Pesanan Anda', canvas.width / 2, 58);

    // Draw QR code
    ctx.drawImage(img, padding, headerHeight + padding);

    // Draw border around QR
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.strokeRect(padding - 10, headerHeight + padding - 10, img.width + 20, img.height + 20);

    // Footer - Order code
    const footerY = headerHeight + padding * 2 + img.height;
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, footerY, canvas.width, footerHeight);

    ctx.fillStyle = '#6b7280';
    ctx.font = '12px Arial, sans-serif';
    ctx.fillText('KODE PESANAN', canvas.width / 2, footerY + 25);

    ctx.fillStyle = '#111827';
    ctx.font = 'bold 32px Arial, sans-serif';
    ctx.fillText(orderCode.value, canvas.width / 2, footerY + 60);

    ctx.fillStyle = '#9ca3af';
    ctx.font = '11px Arial, sans-serif';
    ctx.fillText('Tunjukkan QR ini ke kasir untuk verifikasi', canvas.width / 2, footerY + 85);

    // Create download link
    const link = document.createElement('a');
    link.download = `CoAndTea-Order-${orderCode.value}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    showToastNotification('QR Code berhasil didownload!');
  } catch (error) {
    console.error('Error downloading QR:', error);
    // Fallback: download just the QR code
    const link = document.createElement('a');
    link.download = `CoAndTea-Order-${orderCode.value}.png`;
    link.href = qrCodeUrl.value;
    link.click();
    showToastNotification('QR Code berhasil didownload!');
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .animate-modal-in,
.modal-leave-to .animate-modal-in {
  transform: scale(0.9) translateY(30px);
}

.animate-modal-in {
  animation: modalIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.85) translateY(40px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Toast animation */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

/* Slow bounce animation */
@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

/* Custom scrollbar for modal */
.modal-scroll {
  scrollbar-width: thin;
  scrollbar-color: #d1d5db transparent;
}

.modal-scroll::-webkit-scrollbar {
  width: 6px;
}

.modal-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.modal-scroll::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 3px;
}

.modal-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}
</style>
