import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '@/supabase';

export const useOrderStore = defineStore('order', () => {
  // State
  const currentOrder = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  // Generate unique order code (6 characters)
  function generateOrderCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  // Create new order
  async function createOrder(items, totalPrice, customerName = 'Guest') {
    isLoading.value = true;
    error.value = null;

    try {
      const orderCode = generateOrderCode();
      const orderData = {
        order_code: orderCode,
        customer_name: customerName,
        items: items.map((item) => ({
          name: item.name,
          variant: item.variant,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
        total_price: totalPrice,
        status: 'pending', // pending, verified, completed
        created_at: new Date().toISOString(),
      };

      const { data, error: insertError } = await supabase.from('orders').insert([orderData]).select().single();

      if (insertError) throw insertError;

      currentOrder.value = data;
      return data;
    } catch (err) {
      console.error('Error creating order:', err);
      error.value = err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  // Get order by code
  async function getOrderByCode(orderCode) {
    isLoading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await supabase.from('orders').select('*').eq('order_code', orderCode.toUpperCase()).single();

      if (fetchError) throw fetchError;

      return data;
    } catch (err) {
      console.error('Error fetching order:', err);
      error.value = err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  // Verify order (seller action)
  async function verifyOrder(orderCode) {
    isLoading.value = true;
    error.value = null;

    try {
      const { data, error: updateError } = await supabase.from('orders').update({ status: 'verified', verified_at: new Date().toISOString() }).eq('order_code', orderCode.toUpperCase()).eq('status', 'pending').select().single();

      if (updateError) throw updateError;

      return data;
    } catch (err) {
      console.error('Error verifying order:', err);
      error.value = err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  // Complete order
  async function completeOrder(orderCode) {
    isLoading.value = true;
    error.value = null;

    try {
      const { data, error: updateError } = await supabase.from('orders').update({ status: 'completed', completed_at: new Date().toISOString() }).eq('order_code', orderCode.toUpperCase()).select().single();

      if (updateError) throw updateError;

      return data;
    } catch (err) {
      console.error('Error completing order:', err);
      error.value = err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  // Get all orders (for admin)
  async function getAllOrders() {
    isLoading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await supabase.from('orders').select('*').order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      return data || [];
    } catch (err) {
      console.error('Error fetching orders:', err);
      error.value = err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  // Clear current order
  function clearCurrentOrder() {
    currentOrder.value = null;
  }

  // Get today's verification stats
  async function getTodayStats() {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayISO = today.toISOString();

      // Get verified orders today
      const { data: verifiedOrders, error: verifiedError } = await supabase.from('orders').select('id, total_price').gte('verified_at', todayISO).in('status', ['verified', 'completed']);

      if (verifiedError) throw verifiedError;

      // Get pending orders
      const { data: pendingOrders, error: pendingError } = await supabase.from('orders').select('id').eq('status', 'pending');

      if (pendingError) throw pendingError;

      const totalRevenue = verifiedOrders?.reduce((sum, order) => sum + (order.total_price || 0), 0) || 0;

      return {
        verifiedToday: verifiedOrders?.length || 0,
        pendingCount: pendingOrders?.length || 0,
        totalRevenue,
      };
    } catch (err) {
      console.error('Error fetching today stats:', err);
      return { verifiedToday: 0, pendingCount: 0, totalRevenue: 0 };
    }
  }

  return {
    currentOrder,
    isLoading,
    error,
    createOrder,
    getOrderByCode,
    verifyOrder,
    completeOrder,
    getAllOrders,
    clearCurrentOrder,
    getTodayStats,
  };
});
