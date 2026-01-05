<template>
  <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" :class="isScrolled ? 'bg-white/80 shadow-md backdrop-blur-lg py-3' : 'py-5'">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <a href="#home" class="flex items-center gap-3">
        <img src="@/assets/logo.jpg" alt="CO & T Logo" class="h-12 w-12 object-cover rounded-full border-2 border-brown-500" />
        <span class="text-2xl font-bold tracking-wider text-brown-900"> CO<span class="text-green-700">&</span>T </span>
      </a>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center gap-8">
        <a href="/#home" class="font-semibold text-brown-700 hover:text-green-700 transition-colors">Home</a>
        <a href="/#products" class="font-semibold text-brown-700 hover:text-green-700 transition-colors">Products</a>
        <a href="/#menu" class="font-semibold text-brown-700 hover:text-green-700 transition-colors">Menu</a>
        <a href="/#location" class="font-semibold text-brown-700 hover:text-green-700 transition-colors">Location</a>
        <router-link to="/cart" class="relative text-brown-700 hover:text-green-700 transition-colors p-1" title="Keranjang">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span v-if="cartItemCount > 0" class="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-white shadow-sm">
            {{ cartItemCount > 99 ? '99+' : cartItemCount }}
          </span>
        </router-link>

      
      </div>

      <!-- Mobile Menu Button -->
      <div class="md:hidden">
        <button @click="toggleMobileMenu" class="text-brown-900">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Dropdown -->
    <div v-if="isMobileMenuOpen" class="md:hidden bg-white shadow-lg absolute top-full left-0 w-full">
      <div class="flex flex-col items-center gap-4 py-6">
        <a href="/#home" @click="closeMobileMenu" class="font-semibold text-lg text-brown-700 hover:text-green-700">Home</a>
        <a href="/#products" @click="closeMobileMenu" class="font-semibold text-lg text-brown-700 hover:text-green-700">Products</a>
        <a href="/#menu" @click="closeMobileMenu" class="font-semibold text-lg text-brown-700 hover:text-green-700">Menu</a>
        <a href="/#location" @click="closeMobileMenu" class="font-semibold text-lg text-brown-700 hover:text-green-700">Location</a>
        <router-link to="/cart" @click="closeMobileMenu" class="relative flex items-center gap-2 font-semibold text-lg text-brown-700 hover:text-green-700">
          <div class="relative">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span v-if="cartItemCount > 0" class="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5 border-2 border-white">
              {{ cartItemCount > 99 ? '99+' : cartItemCount }}
            </span>
          </div>
         
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Props
defineProps({
  cartItemCount: {
    type: Number,
    default: 0,
  },
});

// State
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

// Methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
