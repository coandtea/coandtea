<template>
  <div class="font-poppins bg-cream-100 text-brown-900">
    <!-- Toast Notification -->
    <ToastNotification :show="toast.show" :message="toast.message" :type="toast.type" title="Sukses!" />

    <!-- Navbar -->
    <Navbar :cart-item-count="cartStore.totalItems" />

    <!-- Hero Section -->
    <HeroSection />

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-16 sm:py-24">
      <!-- Featured Products Section -->
      <FeaturedProducts :products="featuredProducts" :is-loading="productStore.isLoading" @add-to-cart="handleAddToCart" />

      <!-- Menu Section -->
      <MenuSection
        :items="filteredItems"
        :categories="productStore.categories"
        :selected-category="productStore.selectedCategory"
        :is-loading="productStore.isLoading"
        @add-to-cart="handleAddToCart"
        @search="productStore.setSearchQuery"
        @category-change="productStore.setCategory"
      />

      <!-- Location Section -->
      <LocationSection />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useProductStore } from '@/stores/productStore';
import { useCartStore } from '@/stores/cartStore';
import { TOAST_CONFIG } from '@/config/constants';

// Layout Components
import Navbar from '@/components/layout/Navbar.vue';
import AppFooter from '@/components/layout/Footer.vue';

// Common Components
import ToastNotification from '@/components/common/ToastNotification.vue';

// Landing Page Components
import HeroSection from '@/components/landing/HeroSection.vue';
import FeaturedProducts from '@/components/landing/FeaturedProducts.vue';
import MenuSection from '@/components/landing/MenuSection.vue';
import LocationSection from '@/components/landing/LocationSection.vue';

// Stores
const productStore = useProductStore();
const cartStore = useCartStore();

// Computed - Data dari store
const featuredProducts = computed(() => productStore.featuredProducts);
const filteredItems = computed(() => productStore.filteredProducts);

// Toast State
const toast = ref({
  show: false,
  message: '',
  type: TOAST_CONFIG.defaultType,
});

// Methods
function handleAddToCart(item, variant) {
  // Validasi variant tersedia
  if ((variant === 'Hot' && !item.price_hot) || (variant === 'Cold' && !item.price_cold)) {
    const availableVariant = item.price_hot ? 'Hot' : 'Cold';
    cartStore.addToCart(item, availableVariant);
    showToast(`${item.name} (${availableVariant}) masuk keranjang!`);
  } else {
    cartStore.addToCart(item, variant);
    showToast(`${item.name} (${variant}) masuk keranjang!`);
  }
}

function showToast(message, type = TOAST_CONFIG.defaultType) {
  toast.value = { show: true, message, type };
  setTimeout(() => {
    toast.value.show = false;
  }, TOAST_CONFIG.duration);
}

// Lifecycle
onMounted(() => {
  productStore.fetchProducts();
});
</script>
