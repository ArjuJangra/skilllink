import { createRouter, createWebHistory } from 'vue-router';
import { account } from '@/appwrite'; // Ensure this path points to your Appwrite config

// Helper for lazy loading components
const loadPage = (path) => () => import(`@/pages/${path}.vue`);
const loadComp = (path) => () => import(`@/components/${path}.vue`);

const routes = [
  { path: '/', redirect: '/homeboard' },

  // --- Public Routes ---
  { path: '/login', component: loadPage('LoginPage') },
  { path: '/signup', component: loadPage('SignupPage') },
  { path: '/homeboard', component: loadPage('HomeBoard') },
  { path: '/about', name: "About", component: loadPage('AboutPage') },
  { path: '/contact', component: loadComp('ContactPage') },
  { path: '/help', component: loadComp('HelpPage') },
  { path: '/privacy', component: loadComp('PrivacyPolicy') },
  { path: '/terms', component: loadPage('TermsConditions') },
  { path: '/careers', component: loadPage('CareerPage') },

  // --- Protected Identity Redirector ---
  {
    path: "/profile",
    beforeEnter: async (to, from, next) => {
      try {
        const user = await account.get();
        // Check custom labels or logic for provider/user
        const isProvider = user.labels?.includes('provider');
        next(isProvider ? "/providerprofile" : "/dashboard");
      } catch {
        next("/login");
      }
    },
    meta: { requiresAuth: true }
  },

  // --- User Routes ---
  { path: '/home', component: loadPage('HomePage'), meta: { requiresAuth: true, role: 'user' } },
  { path: '/homelogged', component: loadPage('HomeLogged'), meta: { requiresAuth: true, role: 'user' } },
  { path: '/dashboard', name: 'Dashboard', component: loadComp('UserDashboard'), meta: { requiresAuth: true, role: 'user' } },
  { path: '/booking', component: loadComp('BookingPage'), meta: { requiresAuth: true, role: 'user' } },
  { path: '/service-details', component: loadPage('ServiceDetails'), meta: { requiresAuth: true, role: 'user' } },
  // Ensure this matches your actual file path: src/components/NotificationHistory.vue
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('@/components/NotificationHistory.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/service-details',
    name: 'ServiceDetails', // <--- This must match "ServiceDetails" exactly
    component: () => import('@/pages/ServiceDetails.vue'),
    meta: { requiresAuth: true, role: 'user' }
  },
  // router/index.js
  {
    path: '/booking',
    name: 'BookingPage',
    // Make sure this path is 100% correct
    component: () => import('@/components/BookingPage.vue')
  },
  // router/index.js
  {
    path: '/booking-confirm',
    name: 'BookingConfirm', // <--- This MUST match "BookingConfirm" exactly
    component: () => import('@/components/BookingConfirm.vue')
  },

  // --- Provider Routes ---
 // Change 'ServiceProvide' to 'ServiceProvider'
{ 
  path: '/providerprofile', 
  component: loadPage('provider/ProviderDashboard'), 
  meta: { requiresAuth: true, role: 'provider' } 
},
  {
    path: '/serviceprovider',
    name: 'ServiceProviderDashboard',
    component: () => import('@/pages/provider/ServiceProvider.vue'), // Ensure path is correct
    meta: { requiresAuth: true, role: 'provider' }
  },
  { path: '/providerorders', component: loadPage('provider/ProviderOrders'), meta: { requiresAuth: true, role: 'provider' } },
  { path: '/provideraddservice', name: 'AddService', component: loadComp('AddService'), meta: { requiresAuth: true, role: 'provider' } }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 }; }
});

// 🔐 Appwrite-Ready Global Navigation Guard
router.beforeEach(async (to, from, next) => {
  let userDoc = null;

  // 1. Get the profile from LocalStorage (fastest for redirects)
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    userDoc = JSON.parse(storedUser);
  }

  const isAuthenticated = !!userDoc;

  // 2. Handle Auth Requirement
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ path: '/login', query: { redirect: to.fullPath } });
  }

  // 3. Handle Role-Based Access
  if (to.meta.role && isAuthenticated) {
    // Check the 'role' field from your Database Document
    const userRole = userDoc.role ? userDoc.role.toLowerCase().trim() : 'user';

    if (to.meta.role !== userRole) {
      console.warn(`Access Denied: Route needs ${to.meta.role}, User is ${userRole}`);
      // Redirect to their respective correct home instead of just homeboard
      return next(userRole === 'provider' ? '/serviceprovider' : '/homelogged');
    }
  }

  next();
});

export default router;