import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from '@/supabase';

// Views
import HomeView from '@/views/HomeView.vue';
import CartView from '@/views/CartView.vue';
import LoginView from '@/views/admin/LoginView.vue';
import DashboardView from '@/views/admin/DashboardView.vue';
import VerifyOrderView from '@/views/VerifyOrderView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'CO&T - Special Coffee and Tea',
    },
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
    meta: {
      title: 'Keranjang - CO&T',
    },
  },
  {
    path: '/verify',
    name: 'verify-order',
    component: VerifyOrderView,
    meta: {
      title: 'Verifikasi Pesanan - CO&T',
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: 'Login Admin - CO&T',
    },
  },
  {
    path: '/admin',
    name: 'admin',
    component: DashboardView,
    meta: {
      title: 'Dashboard Admin - CO&T',
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Scroll behavior untuk navigasi yang smooth
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// Navigation Guard - Authentication
router.beforeEach(async (to, from, next) => {
  // Update document title
  document.title = to.meta.title || 'CO&T';

  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        next(); // User is authenticated, allow access
      } else {
        next('/login'); // Redirect to login page
      }
    } catch (error) {
      console.error('Auth check error:', error);
      next('/login');
    }
  } else {
    next(); // Route doesn't require auth, allow access
  }
});

export default router;
