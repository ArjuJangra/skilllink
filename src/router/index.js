
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
import ProviderLogged from '@/components/ProviderLogged.vue';
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
  {path: '/provider', component: ProviderLogged},
  {
    path: '/profile',
    name: 'UserProfile',
    component: () => import('@/components/UserDashboard.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

