
import { createRouter, createWebHistory } from 'vue-router';

import LoginPage from '@/components/LoginPage.vue';
import SignupPage from '@/components/SignupPage.vue';
import HomePage from '@/components/HomePage.vue';
import HomeBoard from '@/components/HomeBoard.vue';
import HomeLogged from '@/components/HomeLogged.vue';
import AboutPage from '@/components/AboutPage.vue';
import ContactPage from '@/components/ContactPage.vue';
import HelpPage from '@/components/HelpPage.vue';
import ServiceProvider from '@/components/ServiceProvider.vue';
import ProviderOrders from '@/components/ProviderOrders.vue';
import ProviderPolicies from '@/components/ProviderPolicies.vue';
import ProviderAbout from '@/components/ProviderAbout.vue';
import ProviderContact from '@/components/ProviderContact.vue';

const routes = [
  { path: '/', redirect: '/homeboard' },
  { path: '/login', component: LoginPage },
  { path: '/signup', component: SignupPage },
  { path: '/home', component: HomePage },
  { path: '/homeboard', component: HomeBoard },
  { path: '/homelogged', component: HomeLogged },
  { path: '/about', component: AboutPage },
  { path: '/contact', component: ContactPage },
  { path: '/help', component: HelpPage },
  { path: '/serviceprovider', component: ServiceProvider },

  // Auth-Protected Routes
  {
    path: '/profile',
    name: 'UserProfile',
    component: () => import('@/components/UserDashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/components/UserDashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/booking',
    name: 'Booking',
    component: () => import('@/components/BookingPage.vue'),
    meta: { requiresAuth: true }
  },
  
   {
  path: '/booking-confirm',
  name: 'BookingConfirm',
  component: () => import('@/components/BookingConfirm.vue'),
  meta: { requiresAuth: true }
},


  {
  path: '/provider/orders',
  name: 'ProviderOrders',
  component: ProviderOrders,
  meta: { requiresAuth: true }
},
  {
    path: '/provider/policies',
    name: 'ProviderPolicies',
    component: ProviderPolicies,
    meta: { requiresAuth: true }
  },
  {
    path: '/provider/about',
    name: 'ProviderAbout',
    component: ProviderAbout,
    meta: { requiresAuth: true }
  },
  {
    path: '/provider/contact',
    name: 'ProviderContact',
    component: ProviderContact,
    meta: { requiresAuth: true }
  }

  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔐Global Navigation Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default router;
