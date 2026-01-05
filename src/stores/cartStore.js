import { defineStore } from 'pinia';
import { supabase } from '@/supabase';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    sessionId: null, // Penanda unik untuk setiap pengunjung
  }),
  actions: {
    // 1. Inisialisasi Session ID (Dijalankan sekali saat web dibuka)
    async initCart() {
      // Cek apakah user sudah punya ID sesi di browser ini
      let storedSession = localStorage.getItem('guest_session_id');

      if (!storedSession) {
        // Jika belum, buat ID acak baru (contoh: "guest-123456789")
        storedSession = 'guest-' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('guest_session_id', storedSession);
      }

      this.sessionId = storedSession;
      await this.fetchCart(); // Ambil data keranjang dari Supabase

      // Cleanup cart items lama (opsional - jalankan di background)
      this.cleanupOldCartItems();
    },

    // 2. Ambil Keranjang dari Supabase
    async fetchCart() {
      if (!this.sessionId) return;

      // Tambahkan .order('id') agar urutan items konsisten (berdasarkan waktu ditambahkan)
      const { data, error } = await supabase.from('cart_items').select('*').eq('session_id', this.sessionId).order('id', { ascending: true }); // Item pertama ditambahkan akan selalu di atas

      if (data) this.items = data;
    },

    // 3. Tambah Item (Simpan ke Supabase)
    async addToCart(product, variant) {
      const price = variant === 'Hot' ? product.price_hot : product.price_cold;

      // Cek apakah item sudah ada di DB
      const existingItem = this.items.find((i) => i.product_id === product.id && i.variant === variant);

      if (existingItem) {
        // Update Quantity di Database
        const newQty = existingItem.quantity + 1;
        await supabase.from('cart_items').update({ quantity: newQty }).eq('id', existingItem.id);
      } else {
        // Insert Baru ke Database
        await supabase.from('cart_items').insert({
          session_id: this.sessionId,
          product_id: product.id,
          name: product.name,
          price: price,
          image: product.image,
          variant: variant,
          quantity: 1,
        });
      }

      // Refresh state lokal agar tampilan update
      await this.fetchCart();
    },

    // 4. Hapus Item
    async removeItem(cartItemId) {
      await supabase.from('cart_items').delete().eq('id', cartItemId);

      await this.fetchCart();
    },

    // 5. Update Quantity
    async updateQuantity(cartItemId, newQuantity) {
      if (newQuantity <= 0) {
        await this.removeItem(cartItemId);
        return;
      }

      await supabase.from('cart_items').update({ quantity: newQuantity }).eq('id', cartItemId);
      await this.fetchCart();
    },

    // 6. Clear Cart
    async clearCart() {
      if (!this.sessionId) return;

      await supabase.from('cart_items').delete().eq('session_id', this.sessionId);
      await this.fetchCart();
    },

    // 7. Remove multiple items by IDs (untuk checkout)
    async removeItems(itemIds) {
      if (!itemIds || itemIds.length === 0) return;

      await supabase.from('cart_items').delete().in('id', itemIds);
      await this.fetchCart();
    },

    // 8. Remove checked out items (dipanggil setelah order berhasil dibuat)
    async removeCheckedOutItems(items) {
      if (!items || items.length === 0) return;

      const itemIds = items.map((item) => item.id);
      await this.removeItems(itemIds);
    },

    // 9. Cleanup cart items yang sudah lama (lebih dari 24 jam)
    // Ini membantu menjaga database tetap bersih dari data cart yang tidak digunakan
    async cleanupOldCartItems() {
      try {
        // Hitung waktu 24 jam yang lalu
        const cutoffTime = new Date();
        cutoffTime.setHours(cutoffTime.getHours() - 24);

        // Hapus cart items yang dibuat lebih dari 24 jam yang lalu
        // Ini hanya akan berjalan jika tabel punya kolom created_at
        const { error } = await supabase.from('cart_items').delete().lt('created_at', cutoffTime.toISOString());

        if (error) {
          // Jika kolom created_at tidak ada, abaikan error
          console.log('Cleanup skipped:', error.message);
        }
      } catch (err) {
        // Jangan tampilkan error ke user, ini hanya maintenance task
        console.log('Cart cleanup failed silently');
      }
    },
  },
  getters: {
    totalPrice: (state) => {
      return state.items.reduce((total, item) => {
        return total + item.price * 1000 * item.quantity;
      }, 0);
    },
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
  },
});
