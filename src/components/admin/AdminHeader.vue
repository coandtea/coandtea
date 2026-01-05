<template>
  <header class="relative z-50 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
      <!-- Logo & Title -->
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-gradient-to-br from-brown-700 to-brown-900 rounded-xl flex items-center justify-center shadow-md">
          <span class="text-white font-bold text-lg">☕</span>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-brown-900">Admin Dashboard</h1>
          <p class="text-sm text-gray-500">Kelola menu Co & Tea</p>
        </div>
      </div>

      <!-- Navigation Actions -->
      <div class="flex items-center gap-3">
        <!-- Verify Orders Button -->
        <router-link
          to="/verify"
          class="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-2.5 rounded-xl shadow-lg hover:from-emerald-600 hover:to-teal-700 hover:shadow-xl font-semibold transition-all duration-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
            />
          </svg>
          <span class="hidden sm:inline">Verifikasi Pesanan</span>
        </router-link>

        <!-- View Website Button -->
        <router-link to="/" class="inline-flex items-center gap-2 bg-white text-brown-700 px-5 py-2.5 rounded-xl shadow-md border border-gray-200 hover:bg-gray-50 hover:shadow-lg font-semibold transition-all duration-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          <span class="hidden sm:inline">Lihat Website</span>
        </router-link>

        <!-- User Menu -->
        <div class="relative">
          <button @click="showUserMenu = !showUserMenu" class="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-xl transition-colors">
            <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">A</div>
            <span class="text-sm font-medium text-gray-700 hidden sm:inline">Admin</span>
            <svg class="w-4 h-4 text-gray-500 transition-transform" :class="showUserMenu ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <Transition name="dropdown">
            <div v-if="showUserMenu" class="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
              <button @click="handleLogout" class="w-full flex items-center gap-3 px-4 py-2.5 text-left text-red-600 hover:bg-red-50 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span class="font-medium">Logout</span>
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['logout']);

const showUserMenu = ref(false);

function handleLogout() {
  showUserMenu.value = false;
  emit('logout');
}
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
