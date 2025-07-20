
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/components/LoginPage.vue';
import SignupPage from '@/components/SignupPage.vue';
import HomePage from '@/components/HomePage.vue';
import UserDashboard from '@/components/UserDashboard.vue';
import BookingPage from '@/components/BookingPage.vue';
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
  { path: '/dashboard', component: UserDashboard },
  { path: '/booking', component: BookingPage },
  { path: '/homeboard', component: HomeBoard },
  { path: '/homelogged', component: HomeLogged },
  { path: '/about', component: AboutPage },
  { path: '/contact', component: ContactPage },
  {path: '/help', component: HelpPage},
  {path: '/serviceprovider', component: ServiceProvider},
  {
    path: '/profile',
    name: 'UserProfile',
    component: () => import('@/components/UserDashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    component: UserDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/booking',
    component: BookingPage,
    meta: { requiresAuth: true },
  },
  {
  path: '/booking-confirm',
  name: 'BookingConfirm',
  component: () => import('@/components/BookingConfirm.vue')
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

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Not logged in, redirect to login
    next({ path: '/login' });
  } else {
    next(); // Proceed as normal
  }
});



export default router;

