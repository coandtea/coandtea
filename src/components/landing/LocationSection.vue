<template>
  <section id="location" class="py-16 sm:py-24 bg-gradient-to-b from-cream-100 to-white">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <span class="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4"> 📍 Visit Us </span>
        <h2 class="text-3xl md:text-4xl font-bold text-brown-900 mb-2">Find Our Store</h2>
        <p class="text-md text-brown-500">We'd love to serve you in person</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        <!-- Info Card -->
        <div class="location-card bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6">
          <!-- Address -->
          <div class="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-transparent hover:from-green-100 transition-colors">
            <div class="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-green-500 rounded-xl text-white shadow-lg">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div>
              <h4 class="font-bold text-lg text-brown-900 mb-1">Alamat</h4>
              <p class="text-gray-600">
                {{ storeInfo.address.street }}<br />
                {{ storeInfo.address.district }}, {{ storeInfo.address.city }}
              </p>
            </div>
          </div>

          <!-- Operating Hours -->
          <div class="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-transparent hover:from-amber-100 transition-colors">
            <div class="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-amber-500 rounded-xl text-white shadow-lg">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h4 class="font-bold text-lg text-brown-900 mb-1">Jam Buka</h4>
              <p class="text-gray-600">
                {{ storeInfo.operatingHours.days }}<br />
                <span class="font-semibold text-green-600">{{ storeInfo.operatingHours.hours }}</span>
              </p>
              <!-- Open Status -->
              <span class="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Buka Sekarang
              </span>
            </div>
          </div>

          <!-- Contact -->
          <div class="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-pink-50 to-transparent hover:from-pink-100 transition-colors">
            <div class="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl text-white shadow-lg">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                />
              </svg>
            </div>
            <div>
              <h4 class="font-bold text-lg text-brown-900 mb-1">Sosial Media</h4>
              <a :href="storeInfo.socialMedia.instagram.url" target="_blank" class="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold transition-colors">
                {{ storeInfo.socialMedia.instagram.handle }}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          <!-- CTA Button -->
          <a :href="storeInfo.googleMapsUrl" target="_blank" class="block w-full text-center bg-gradient-to-r from-brown-700 to-brown-900 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all">
            Buka di Google Maps
          </a>
        </div>

        <!-- Map -->
        <div class="location-map h-96 lg:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl border-4 border-white relative">
          <!-- Loading State -->
          <div v-if="mapLoading" class="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
            <div class="text-center">
              <svg class="w-8 h-8 text-green-500 animate-spin mx-auto mb-3" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p class="text-gray-500 text-sm">Memuat peta...</p>
            </div>
          </div>

          <!-- Map iframe -->
          <iframe
            :src="storeInfo.mapEmbedUrl"
            width="100%"
            height="100%"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            class="grayscale-[30%] hover:grayscale-0 transition-all duration-700"
            @load="onMapLoad"
            @error="onMapError"
          ></iframe>

          <!-- Fallback View (jika map error) -->
          <div v-if="mapError" class="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
            <div class="text-center p-6">
              <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 class="font-bold text-lg text-gray-800 mb-2">{{ storeInfo.address.street }}</h3>
              <p class="text-gray-600 mb-4">{{ storeInfo.address.district }}, {{ storeInfo.address.city }}</p>
              <a :href="storeInfo.googleMapsUrl" target="_blank" class="inline-flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Lihat di Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { STORE_INFO } from '@/config/constants';

const storeInfo = STORE_INFO;

// State untuk loading dan error handling peta
const mapLoading = ref(true);
const mapError = ref(false);

function onMapLoad() {
  mapLoading.value = false;
}

function onMapError() {
  mapLoading.value = false;
  mapError.value = true;
}
</script>

<style scoped>
.location-card {
  animation: slideInLeft 0.6s ease-out;
}

.location-map {
  animation: slideInRight 0.6s ease-out;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
