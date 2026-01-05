<template>
  <div class="min-h-screen flex items-center justify-center bg-cream-100 font-poppins px-4">
    <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-brown-900">Admin Login</h1>
        <p class="text-brown-500 text-sm">Masuk untuk mengelola produk Co & Tea</p>
      </div>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="email" type="email" placeholder="admin@coandtea.com" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" required />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input v-model="password" type="password" placeholder="••••••••" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" required />
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="bg-red-100 text-red-700 p-3 rounded-lg text-sm text-center">
          {{ errorMessage }}
        </div>

        <button type="submit" :disabled="isLoading" class="bg-brown-700 text-white font-bold py-3 rounded-lg hover:bg-brown-900 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
          {{ isLoading ? 'Memproses...' : 'Masuk Dashboard' }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <router-link to="/" class="text-sm text-gray-500 hover:text-green-700 transition-colors"> ← Kembali ke Beranda </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/supabase';

const router = useRouter();

// State
const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

// Methods
async function handleLogin() {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) {
      errorMessage.value = 'Login gagal! Periksa email atau password Anda.';
    } else {
      router.push('/admin');
    }
  } catch (err) {
    errorMessage.value = 'Terjadi kesalahan. Silakan coba lagi.';
    console.error('Login error:', err);
  } finally {
    isLoading.value = false;
  }
}
</script>
