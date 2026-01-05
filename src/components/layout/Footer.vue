<template>
  <footer class="bg-brown-900 text-white pt-16 pb-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- Brand Section -->
        <div class="md:col-span-2">
          <h3 class="text-2xl font-bold mb-2">CO&T</h3>
          <p class="text-cream-300 max-w-sm">Special Coffee and Tea. Crafting moments, one cup at a time.</p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-bold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li>
              <a href="#home" class="text-cream-300 hover:text-white transition-colors">Home</a>
            </li>
            <li>
              <a href="#products" class="text-cream-300 hover:text-white transition-colors">Products</a>
            </li>
            <li>
              <a href="#menu" class="text-cream-300 hover:text-white transition-colors">Menu</a>
            </li>
            <li>
              <a href="#location" class="text-cream-300 hover:text-white transition-colors">Location</a>
            </li>
          </ul>
        </div>

        <!-- Social Media -->
        <div>
          <h4 class="font-bold mb-4">Follow Us</h4>
          <a href="https://www.instagram.com/co_and_tea" target="_blank" class="w-10 h-10 flex items-center justify-center bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
              />
            </svg>
          </a>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-8 pt-8 border-t border-white/10 text-center text-cream-300 text-sm">
        <p>© {{ currentYear }} CO&T. All Rights Reserved.</p>
        <p class="mt-2 text-xs text-white/30 hover:text-white/50 transition-colors">Crafted  by <span class="font-medium">Yuda Ari Sandi Pasaribu</span></p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';

// Computed
const currentYear = computed(() => new Date().getFullYear());
</script>
