<template>
  <section id="products" class="mb-24">
    <!-- Section Header -->
    <div class="text-center mb-12">
      <span class="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full mb-4"> ⭐ Best Seller </span>
      <h2 class="text-3xl md:text-4xl font-bold text-brown-900 mb-2">Our Favorite Drinks</h2>
      <p class="text-md text-brown-500">Crafted with passion, served with love</p>
    </div>

    <!-- Loading State - Skeleton -->
    <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <SkeletonCard v-for="n in 4" :key="n" />
    </div>

    <!-- Empty State -->
    <div v-else-if="products.length === 0" class="text-center py-12">
      <p class="text-gray-500">Belum ada produk favorit</p>
    </div>

    <!-- Product Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <ProductCard v-for="(product, index) in products" :key="product.id" :product="product" :index="index" @add-to-cart="handleAddToCart" />
    </div>
  </section>
</template>

<script setup>
import ProductCard from '@/components/product/ProductCard.vue';
import SkeletonCard from '@/components/common/SkeletonCard.vue';

// Props
defineProps({
  products: {
    type: Array,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emit = defineEmits(['add-to-cart']);

// Methods
const handleAddToCart = (product, variant) => {
  emit('add-to-cart', product, variant);
};
</script>
