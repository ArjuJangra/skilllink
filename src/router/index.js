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
import ServiceDetails from '@/components/ServiceDetails.vue';
import AddService from '@/components/AddService.vue';
import PrivacyPolicy from '@/components/PrivacyPolicy.vue';
import TermsConditions from '@/components/TermsConditions.vue';
// import { auth } from '@/stores/auth';

const routes = [
  { path: '/', redirect: '/homeboard' },
  { path: '/login', component: LoginPage },
  { path: '/signup', component: SignupPage },
  { path: '/home', component: HomePage },
  { path: '/homeboard', component: HomeBoard },
  { path: '/privacy', component: PrivacyPolicy },
  { path: '/terms', component: TermsConditions },
  {
    path: '/homelogged',
    component: HomeLogged,
    meta: { requiresAuth: true, role: 'user' }
  },
  { path: '/about', component: AboutPage },
  { path: '/contact', component: ContactPage },
  { path: '/help', component: HelpPage },
  {
    path: '/ServiceProvider',
    component: ServiceProvider,
    meta: { requiresAuth: true, role: 'provider' }
  },

  // Auth-Protected Routes
  {
    path: '/profile',
    redirect: () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.role === 'provider') {
        return '/provider/profile';
      } else {
        return '/dashboard';
      }
    },
    meta: { requiresAuth: true }
  },
  {
    path: '/provider/profile',
    name: 'ProviderDashboard',
    component: () => import('@/components/ProviderDashboard.vue'),
    meta: { requiresAuth: true, role: 'provider' }
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
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('@/components/NotificationHistory.vue'),
    meta: { requiresAuth: true }
  },

{
  path: '/service-details',
  name: 'ServiceDetails',
  component: ServiceDetails,
  meta: { requiresAuth: true, role: 'user' }
},
  {
    path: '/provider/add-service',
    name: 'AddService',
    component: AddService,
  }


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔐Global Navigation Guard

router.beforeEach((to, from, next) => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = !!storedUser;

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      return next({ path: '/login' });
    }

    if (to.meta.role && storedUser.role !== to.meta.role) {
      return next({ path: '/homeboard' }); // or just redirect to home
    }
  }

  next();
});

export default router;