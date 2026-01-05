<template>
  <div class="min-h-screen bg-gray-50 font-poppins">
    <!-- Success Animation -->
    <SuccessAnimation :show="showSuccessAnimation" @complete="onSuccessAnimationComplete" />

    <!-- Toast Notification -->
    <ToastNotification :show="toast.show" :message="toast.message" :type="toast.type" :title="toast.title" />

    <!-- Header -->
    <header class="bg-gradient-to-r from-green-600 to-green-700 text-white py-6 px-4">
      <div class="container mx-auto">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold">Verifikasi Pesanan</h1>
            <p class="text-green-100 text-sm">Scan QR Code pelanggan</p>
          </div>
          <router-link to="/admin" class="text-green-100 hover:text-white transition-colors text-sm flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Dashboard
          </router-link>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-4 py-8">
      <div class="max-w-lg mx-auto">
        <!-- Quick Stats Card -->
        <div class="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-semibold text-gray-700 text-sm">Statistik Hari Ini</h3>
            <button @click="refreshStats" class="text-green-600 hover:text-green-700 p-1 rounded-lg hover:bg-green-50 transition-colors">
              <svg :class="['w-4 h-4', statsLoading && 'animate-spin']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
          <div class="grid grid-cols-3 gap-3">
            <div class="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div class="text-2xl font-bold text-green-600">{{ stats.verifiedToday }}</div>
              <div class="text-xs text-green-600/70">Terverifikasi</div>
            </div>
            <div class="text-center p-3 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl">
              <div class="text-2xl font-bold text-amber-600">{{ stats.pendingCount }}</div>
              <div class="text-xs text-amber-600/70">Menunggu</div>
            </div>
            <div class="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div class="text-lg font-bold text-blue-600">{{ formatCurrency(stats.totalRevenue) }}</div>
              <div class="text-xs text-blue-600/70">Pendapatan</div>
            </div>
          </div>
        </div>

        <!-- Scanner Mode Toggle -->
        <div class="flex gap-2 mb-6">
          <button
            @click="
              mode = 'scan';
              showScanner = true;
            "
            :class="[
              'flex-1 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2',
              mode === 'scan' ? 'bg-green-600 text-white shadow-lg shadow-green-200' : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300',
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
              />
            </svg>
            Scan QR
          </button>
          <button
            @click="mode = 'manual'"
            :class="[
              'flex-1 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2',
              mode === 'manual' ? 'bg-green-600 text-white shadow-lg shadow-green-200' : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300',
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Input Manual
          </button>
        </div>

        <!-- Scanner Section -->
        <Transition name="fade">
          <div v-if="mode === 'scan' && showScanner" class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div class="p-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 class="font-semibold text-gray-900">Scan QR Code</h2>
                <p class="text-sm text-gray-500">Arahkan kamera ke QR code pelanggan</p>
              </div>
              <div v-if="scannerActive" class="flex items-center gap-2">
                <span class="relative flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span class="text-xs text-green-600 font-medium">Aktif</span>
              </div>
            </div>

            <div class="relative">
              <!-- QR Scanner -->
              <div v-if="scannerActive" class="aspect-square bg-black">
                <QrcodeStream @detect="onDecode" @camera-on="onCameraReady" @error="onError" />
                <!-- Scanning Overlay -->
                <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div class="w-64 h-64 border-4 border-white/50 rounded-2xl relative">
                    <div class="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-500 rounded-tl-xl"></div>
                    <div class="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-500 rounded-tr-xl"></div>
                    <div class="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-500 rounded-bl-xl"></div>
                    <div class="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-500 rounded-br-xl"></div>
                    <!-- Scan Line Animation -->
                    <div class="absolute inset-x-0 h-0.5 bg-green-500 animate-scan"></div>
                  </div>
                </div>
              </div>

              <!-- Camera Not Ready -->
              <div v-else class="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div class="text-center">
                  <div class="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p class="text-gray-500 mb-4">Kamera belum aktif</p>
                  <button @click="startScanner" class="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-200 font-semibold flex items-center gap-2 mx-auto">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Aktifkan Kamera
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <!-- Manual Input Section -->
        <Transition name="fade">
          <div v-if="mode === 'manual'" class="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <h2 class="font-semibold text-gray-900 mb-2">Input Kode Manual</h2>
            <p class="text-sm text-gray-500 mb-4">Masukkan kode 6 digit dari pelanggan</p>

            <div class="flex flex-col sm:flex-row gap-3">
              <input
                ref="manualInputRef"
                v-model="manualCode"
                type="text"
                maxlength="6"
                placeholder="XXXXXX"
                class="w-full sm:flex-1 px-4 py-3 border border-gray-300 rounded-xl text-center text-xl sm:text-2xl font-bold tracking-widest uppercase focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                @keyup.enter="searchOrder"
              />
              <button
                @click="searchOrder"
                :disabled="manualCode.length < 6 || isLoading"
                class="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg shadow-green-200 disabled:shadow-none"
              >
                <span v-if="!isLoading">Cari</span>
                <svg v-else class="w-5 h-5 mx-auto animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </button>
            </div>
          </div>
        </Transition>

        <!-- Order Result -->
        <Transition name="slide">
          <div v-if="foundOrder" class="mt-6 bg-white rounded-2xl shadow-lg overflow-hidden">
            <!-- Order Status Header -->
            <div
              :class="[
                'p-4 text-white relative overflow-hidden',
                foundOrder.status === 'pending' ? 'bg-gradient-to-r from-amber-500 to-amber-600' : foundOrder.status === 'verified' ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-gray-500 to-gray-600',
              ]"
            >
              <!-- Background Pattern -->
              <div class="absolute inset-0 opacity-10">
                <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="5" cy="5" r="1" fill="white" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>
              <div class="flex items-center justify-between relative z-10">
                <div>
                  <p class="text-sm opacity-80">Kode Pesanan</p>
                  <p class="text-2xl font-bold tracking-wider">{{ foundOrder.order_code }}</p>
                </div>
                <span class="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold backdrop-blur-sm">
                  {{ statusLabel }}
                </span>
              </div>
            </div>

            <!-- Order Details -->
            <div class="p-4">
              <!-- Customer & Time Info -->
              <div class="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                <div class="flex items-center gap-2 text-gray-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span class="text-sm font-medium">{{ foundOrder.customer_name || 'Guest' }}</span>
                </div>
                <div class="flex items-center gap-2 text-gray-500 text-sm">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ formatDate(foundOrder.created_at) }}
                </div>
              </div>

              <!-- Items -->
              <div class="space-y-3 mb-4">
                <div v-for="(item, index) in foundOrder.items" :key="index" class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <img :src="item.image" :alt="item.name" class="w-14 h-14 object-cover rounded-xl shadow-sm" />
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-gray-900 truncate">{{ item.name }}</p>
                    <p class="text-sm text-gray-500">{{ item.variant }} · x{{ item.quantity }}</p>
                  </div>
                  <p class="font-bold text-gray-900">{{ item.price }}K</p>
                </div>
              </div>

              <!-- Total -->
              <div class="flex justify-between items-center pt-4 border-t border-gray-100">
                <span class="font-semibold text-gray-700">Total Pembayaran</span>
                <span class="text-2xl font-bold text-green-600">Rp {{ foundOrder.total_price.toLocaleString('id-ID') }}</span>
              </div>

              <!-- Actions for Pending -->
              <div v-if="foundOrder.status === 'pending'" class="mt-6 flex flex-col-reverse sm:flex-row gap-3">
                <button @click="resetScanner" class="w-full sm:flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Batal</span>
                </button>
                <button
                  @click="verifyOrder"
                  :disabled="isLoading"
                  class="w-full sm:flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed shadow-lg shadow-green-200 disabled:shadow-none"
                >
                  <svg v-if="!isLoading" class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <svg v-else class="w-5 h-5 flex-shrink-0 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{{ isLoading ? 'Memproses...' : 'Verifikasi' }}</span>
                </button>
              </div>

              <!-- Actions for Verified -->
              <div v-else-if="foundOrder.status === 'verified'" class="mt-6">
                <div class="bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 p-4 rounded-xl text-center border border-green-100">
                  <div class="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p class="font-semibold text-lg">Pesanan Berhasil Diverifikasi!</p>
                  <p class="text-sm text-green-600/70">{{ formatDate(foundOrder.verified_at) }}</p>
                </div>

                <!-- Auto Reset Countdown -->
                <div v-if="autoResetCountdown > 0" class="mt-4 text-center">
                  <p class="text-sm text-gray-500 mb-2">Kembali ke scanner dalam</p>
                  <div class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                    <div class="relative w-8 h-8">
                      <svg class="w-8 h-8 transform -rotate-90">
                        <circle cx="16" cy="16" r="14" stroke="#e5e7eb" stroke-width="3" fill="none" />
                        <circle cx="16" cy="16" r="14" stroke="#22c55e" stroke-width="3" fill="none" :stroke-dasharray="88" :stroke-dashoffset="88 - (88 * autoResetCountdown) / 5" class="transition-all duration-1000" />
                      </svg>
                      <span class="absolute inset-0 flex items-center justify-center text-sm font-bold text-green-600">{{ autoResetCountdown }}</span>
                    </div>
                    <span class="text-gray-600 font-medium">detik</span>
                  </div>
                </div>

                <!-- Manual Reset Button -->
                <button
                  @click="resetScanner"
                  class="w-full mt-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-200"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                    />
                  </svg>
                  Scan Pesanan Berikutnya
                </button>
              </div>
            </div>
          </div>
        </Transition>

        <!-- Error Message -->
        <Transition name="fade">
          <div v-if="errorMessage && !foundOrder" class="mt-6 bg-red-50 border border-red-100 text-red-700 p-4 rounded-xl text-center">
            <svg class="w-8 h-8 mx-auto mb-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="font-medium">{{ errorMessage }}</p>
            <button @click="errorMessage = ''" class="mt-3 text-sm text-red-600 hover:text-red-700 underline">Tutup</button>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { QrcodeStream } from 'vue-qrcode-reader';
import { useOrderStore } from '@/stores/orderStore';
import { useFeedback } from '@/composables/useFeedback';
import ToastNotification from '@/components/common/ToastNotification.vue';
import SuccessAnimation from '@/components/common/SuccessAnimation.vue';

// Store & Composables
const orderStore = useOrderStore();
const { scanSuccessFeedback, verifySuccessFeedback, errorFeedback } = useFeedback();

// Refs
const manualInputRef = ref(null);

// State
const mode = ref('scan');
const scannerActive = ref(false);
const showScanner = ref(true);
const manualCode = ref('');
const foundOrder = ref(null);
const errorMessage = ref('');
const isLoading = ref(false);

// Stats
const stats = ref({ verifiedToday: 0, pendingCount: 0, totalRevenue: 0 });
const statsLoading = ref(false);

// Toast
const toast = ref({ show: false, message: '', type: 'success', title: '' });

// Success Animation
const showSuccessAnimation = ref(false);

// Auto Reset
const autoResetCountdown = ref(0);
let autoResetInterval = null;

// Computed
const statusLabel = computed(() => {
  if (!foundOrder.value) return '';
  const labels = {
    pending: 'Menunggu Verifikasi',
    verified: 'Terverifikasi',
    completed: 'Selesai',
  };
  return labels[foundOrder.value.status] || foundOrder.value.status;
});

// Watch mode changes to focus input
watch(mode, async (newMode) => {
  if (newMode === 'manual') {
    await nextTick();
    manualInputRef.value?.focus();
  }
});

// Methods
function startScanner() {
  scannerActive.value = true;
}

function onCameraReady() {
  showToast('Kamera Aktif', 'Scanner siap digunakan', 'success');
}

function onError(error) {
  console.error('Scanner error:', error);
  errorMessage.value = 'Tidak dapat mengakses kamera. Pastikan izin kamera diberikan.';
  errorFeedback();
}

async function onDecode(detectedCodes) {
  if (detectedCodes.length === 0) return;

  const rawValue = detectedCodes[0].rawValue;
  scanSuccessFeedback();

  try {
    const data = JSON.parse(rawValue);
    if (data.code) {
      await fetchOrder(data.code);
    }
  } catch {
    await fetchOrder(rawValue);
  }
}

async function searchOrder() {
  if (manualCode.value.length < 6) return;
  await fetchOrder(manualCode.value);
}

async function fetchOrder(code) {
  isLoading.value = true;
  errorMessage.value = '';
  foundOrder.value = null;

  try {
    const order = await orderStore.getOrderByCode(code);
    foundOrder.value = order;
    showScanner.value = false;
    scanSuccessFeedback();
    showToast('Pesanan Ditemukan', `Kode: ${order.order_code}`, 'success');
  } catch (error) {
    errorMessage.value = 'Pesanan tidak ditemukan. Periksa kode dan coba lagi.';
    errorFeedback();
  } finally {
    isLoading.value = false;
  }
}

async function verifyOrder() {
  if (!foundOrder.value) return;

  isLoading.value = true;

  try {
    const updated = await orderStore.verifyOrder(foundOrder.value.order_code);
    foundOrder.value = updated;

    // Show success animation
    showSuccessAnimation.value = true;
    verifySuccessFeedback();

    // Refresh stats
    await refreshStats();

    // Start auto reset countdown
    startAutoResetCountdown();

    showToast('Verifikasi Berhasil!', 'Pesanan telah diverifikasi', 'success');
  } catch (error) {
    errorMessage.value = 'Gagal memverifikasi pesanan.';
    errorFeedback();
    showToast('Gagal', 'Tidak dapat memverifikasi pesanan', 'error');
  } finally {
    isLoading.value = false;
  }
}

function startAutoResetCountdown() {
  autoResetCountdown.value = 5;

  if (autoResetInterval) {
    clearInterval(autoResetInterval);
  }

  autoResetInterval = setInterval(() => {
    autoResetCountdown.value--;
    if (autoResetCountdown.value <= 0) {
      clearInterval(autoResetInterval);
      resetScanner();
    }
  }, 1000);
}

function resetScanner() {
  if (autoResetInterval) {
    clearInterval(autoResetInterval);
  }
  autoResetCountdown.value = 0;
  foundOrder.value = null;
  errorMessage.value = '';
  manualCode.value = '';
  showScanner.value = true;
}

function onSuccessAnimationComplete() {
  showSuccessAnimation.value = false;
}

async function refreshStats() {
  statsLoading.value = true;
  try {
    stats.value = await orderStore.getTodayStats();
  } catch (error) {
    console.error('Failed to fetch stats:', error);
  } finally {
    statsLoading.value = false;
  }
}

function showToast(title, message, type = 'success') {
  toast.value = { show: true, title, message, type };
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
}

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

function formatCurrency(amount) {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}jt`;
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(0)}rb`;
  }
  return amount.toString();
}

// Lifecycle
onMounted(() => {
  refreshStats();
});

onUnmounted(() => {
  if (autoResetInterval) {
    clearInterval(autoResetInterval);
  }
});
</script>

<style scoped>
/* Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Scan animation */
@keyframes scan {
  0%,
  100% {
    top: 0;
  }
  50% {
    top: calc(100% - 2px);
  }
}

.animate-scan {
  animation: scan 2s ease-in-out infinite;
}

/* Pulse animation for active indicator */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
