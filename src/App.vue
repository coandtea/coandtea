<script setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useCartStore } from '@/stores/cartStore';

const cartStore = useCartStore();

onMounted(() => {
  cartStore.initCart();
});
</script>

<template>
  <RouterView />
</template>

<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
