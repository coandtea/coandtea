// src/stores/productStore.js
import { defineStore } from 'pinia';
import { supabase } from '@/supabase';
import { PRODUCT_CATEGORIES } from '@/config/constants';

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    searchQuery: '',
    selectedCategory: PRODUCT_CATEGORIES.all,
    isLoading: false,
    error: null, // Added for error handling
  }),

  getters: {
    // Filter produk berdasarkan Kategori DAN Pencarian
    filteredProducts: (state) => {
      let result = state.products;

      // 1. Filter Kategori
      if (state.selectedCategory !== PRODUCT_CATEGORIES.all) {
        result = result.filter((p) => p.category === state.selectedCategory);
      }

      // 2. Filter Pencarian
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        result = result.filter((p) => p.name.toLowerCase().includes(query));
      }

      return result;
    },

    // Ambil daftar kategori unik dari data
    categories: (state) => {
      const cats = [PRODUCT_CATEGORIES.all, ...new Set(state.products.map((p) => p.category))];
      return cats;
    },

    // Produk favorit
    featuredProducts: (state) =>
      state.products.filter((p) => {
        // Handle both boolean and string values from database
        if (typeof p.is_favorite === 'boolean') {
          return p.is_favorite === true;
        }
        // Handle string values (e.g., "TRUE", "true", "1")
        const strVal = String(p.is_favorite).toLowerCase();
        return strVal === 'true' || strVal === '1';
      }),

    // Helper getter untuk cek ada error
    hasError: (state) => state.error !== null,
  },

  actions: {
    async fetchProducts() {
      this.isLoading = true;
      this.error = null;

      try {
        const { data, error } = await supabase.from('products').select('*');

        if (error) {
          throw error;
        }

        this.products = data || [];

        // Debug logging (can be removed in production)
        if (import.meta.env.DEV) {
          console.log('Products fetched:', this.products.length);
        }
      } catch (error) {
        this.error = {
          message: error.message || 'Failed to fetch products',
          code: error.code || 'UNKNOWN_ERROR',
        };
        console.error('Error fetching products:', this.error);
      } finally {
        this.isLoading = false;
      }
    },

    setSearchQuery(query) {
      this.searchQuery = query;
    },

    setCategory(category) {
      this.selectedCategory = category;
    },

    clearError() {
      this.error = null;
    },

    // Reset store to initial state
    $reset() {
      this.products = [];
      this.searchQuery = '';
      this.selectedCategory = PRODUCT_CATEGORIES.all;
      this.isLoading = false;
      this.error = null;
    },
  },
});
