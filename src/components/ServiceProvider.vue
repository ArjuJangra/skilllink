<template>
  <div class="min-h-screen bg-[#F0F9FF] text-gray-800">
    <!-- Navbar -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white via-[#f1faff] to-[#f5fafe] shadow-md">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <img src="@/assets/skilllogo.png" alt="SkillLink Logo" loading="eager" class="w-10 h-10" />
          <span class="text-xl font-bold text-[#0073b1]">SkillLink</span>
        </div>
          
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-6 text-sm lg:text-base">

          <!-- Orders -->
          <router-link to="/providerorders"
            class="relative flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-[#0073b1] hover:scale-105 transition-transform duration-200 font-medium"
            active-class="text-[#0073b1] font-semibold after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-[#0073b1] after:rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M6 2a1 1 0 0 0-1 1v2H3a1 1 0 1 0 0 2h1l1.6 9.59A3 3 0 0 0 8.56 19h6.88a3 3 0 0 0 2.96-2.41L20 7H7V5h10a1 1 0 1 0 0-2H7V3a1 1 0 0 0-1-1zm2.56 15a1 1 0 0 1-.98-.8L6.28 9h11.44l-1.3 7.2a1 1 0 0 1-.98.8H8.56zM9 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm6 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            </svg>
            <span>Orders</span>
            <!-- Notification Badge -->
            <span v-if="newOrdersCount > 0"
              class="absolute top-0 right-0 -mt-1 -mr-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {{ newOrdersCount }}
            </span>
          </router-link>

          <!-- Profile -->
          <router-link to="/provider/profile">
            <img :src="profileImage" @error="handleImageError"
              class="w-10 h-10 rounded-full border border-gray-300 hover:border-[#0073b1] transition cursor-pointer object-cover"
              loading="lazy" alt="Profile Picture" />
          </router-link>
        </nav>
        <!-- Mobile Hamburger -->
        <button @click="drawerOpen = !drawerOpen" class="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
          aria-label="Toggle menu">
          <svg class="w-6 h-6 text-[#0073b1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Mobile Drawer -->
      <transition name="fade">
        <div v-if="drawerOpen" class="fixed inset-0 z-40 bg-black bg-opacity-30" @click.self="drawerOpen = false">
          <div class="absolute top-0 right-0 w-64 h-full bg-white shadow-lg p-4 space-y-4 overflow-y-auto">
              <router-link @click="drawerOpen = false" to="/provider/profile" class="block mt-2">
              <img :src="profileImage" @error="handleImageError"
                class="w-10 h-10 rounded-full border-2 border-[#0073b1]" loading="lazy" />
            </router-link>
             <div>
                <p class="text-gray-800 font-semibold">{{ user?.name || 'Welcome!' }}</p>
                <router-link to="/provider/profile" class="text-sm text-[#0073b1] hover:underline" @click="closeMenu">
                  View Dashboard
                </router-link>
              </div>
             <hr class="border-gray-200 my-6" />

              <router-link to="/serviceprovider"
            class="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#0073b1] hover:scale-105 transition-transform duration-200">
            <!-- Filled Home Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3l8 7v10a2 2 0 0 1-2 2h-4a1 1 0 0 1-1-1v-5H11v5a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V10l8-7z" />
            </svg>
            <span class="font-semibold">Home</span>
          </router-link>
            <!-- Orders -->
          <router-link to="/providerorders"
            class="relative flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-[#0073b1] hover:scale-105 transition-transform duration-200 font-medium"
            active-class="text-[#0073b1] font-semibold after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-[#0073b1] after:rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M6 2a1 1 0 0 0-1 1v2H3a1 1 0 1 0 0 2h1l1.6 9.59A3 3 0 0 0 8.56 19h6.88a3 3 0 0 0 2.96-2.41L20 7H7V5h10a1 1 0 1 0 0-2H7V3a1 1 0 0 0-1-1zm2.56 15a1 1 0 0 1-.98-.8L6.28 9h11.44l-1.3 7.2a1 1 0 0 1-.98.8H8.56zM9 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm6 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            </svg>
            <span>Orders</span>
            <!-- Notification Badge -->
            <span v-if="newOrdersCount > 0"
              class="absolute top-0 right-0 -mt-1 -mr-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {{ newOrdersCount }}
            </span>
          </router-link>
             <!-- Privacy Policy -->
          <router-link to="/privacy" class="flex items-center gap-2 hover:text-[#00A8E8] transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1l9 4v6c0 5-3.6 9.7-9 11-5.4-1.3-9-6-9-11V5l9-4zM7 9v2h10V9H7z" />
            </svg>
            <span>Privacy Policy</span>
          </router-link>
             <router-link to="/about" class="flex items-center gap-2 hover:text-[#00A8E8] transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>About Us</span>
          </router-link>
            <router-link to="/contact" class="flex items-center gap-2 hover:text-[#00A8E8] transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75zm2.334-.75L12 11.327 19.416 6h-14.832zm15.166 1.635-7.731 5.154a.75.75 0 0 1-.838 0L3.45 7.635v9.615c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75V7.635z" />
            </svg>
            <span>Contact Us</span>
          </router-link>

          
          </div>
        </div>
      </transition>
    </header>
    <!-- Main Content -->
    <main class="max-w-screen-xl mx-auto px-4 pt-28">
      <!-- Dynamic Greeting -->
      <section class="text-center mb-6">
        <h2
          class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#3B8D99] to-[#f46675] bg-clip-text text-transparent mb-2">
          {{ greeting }}, {{ provider?.name || 'Provider' }}!
        </h2>
        <p class="text-gray-600">Manage your services, orders, and earnings efficiently from here.</p>
      </section>

      <!-- Quick Stats + Profile Completion -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div v-for="card in statsCards" :key="card.title"
          class="bg-white rounded-2xl shadow p-5 text-center hover:shadow-lg transition">
          <h4 class="text-gray-700 font-semibold mb-1">{{ card.title }}</h4>
          <p :class="card.color + ' font-bold text-2xl'">
            {{ card.title === 'Earnings' ? '₹' + card.value : card.value }}
          </p>

          <!-- Profile completion bar -->
          <div v-if="card.title === 'Profile Completion'"
            class="w-full bg-gray-200 rounded-full h-4 mt-2 relative group">
            <div :style="{ width: profileCompletion + '%' }" class="h-4 bg-[#0073b1] rounded-full transition-all"></div>
            <span
              class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 text-xs bg-white px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition">
              Complete your profile for better visibility
            </span>
          </div>
        </div>
      </div>

      <!-- Earnings Chart -->
      <section class="bg-white shadow rounded-2xl p-5 mb-6">
        <h3 class="text-[#0073b1] font-semibold text-lg sm:text-xl mb-3">Monthly Earnings</h3>
        <canvas ref="earningsChart" class="w-full"></canvas>
      </section>
      <!-- Recent Orders -->
      <section class="bg-white shadow rounded-2xl p-5 mb-6">
        <h3 class="text-[#0073b1] font-semibold text-lg sm:text-xl mb-3">Recent Orders</h3>
        <ul>
          <li v-for="order in recentOrders" :key="order.id"
            class="flex justify-between items-center py-3 border-b last:border-b-0 hover:bg-gray-50 rounded transition">
            <!-- Order name styled -->
            <span class="font-medium text-gray-800">
              {{ order.name || order.title || order.serviceName }}
            </span>

            <!-- Status badge -->
            <span
              :class="statusColor(order.status) + ' px-3 py-1 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wide'">
              {{ order.status }}
            </span>
          </li>

          <li v-if="recentOrders.length === 0" class="text-gray-500 py-2 text-center">
            No recent orders
          </li>
        </ul>
      </section>
      <!-- Quick Actions -->
      <section class="mb-10 flex flex-wrap gap-4 justify-center">
        <router-link to="/providerorders"
          class="bg-[#0073b1] hover:bg-[#005f8d] text-white px-5 py-3 rounded-lg font-semibold transition flex items-center gap-2">
          <span>📄</span> View Orders
        </router-link>
        <router-link to="/provider/profile"
          class="bg-[#f46675] hover:bg-[#d95563] text-white px-5 py-3 rounded-lg font-semibold transition flex items-center gap-2">
          <span>✏️</span> Update Profile
        </router-link>
        <router-link to="/provideraddservice"
          class="bg-[#3B8D99] hover:bg-[#2f7077] text-white px-5 py-3 rounded-lg font-semibold transition flex items-center gap-2">
          <span>➕</span> Add Service
        </router-link>
      </section>
    </main>
    <!-- Footer -->
    <footer class="bg-[#f9fafb] border-t mt-16">
      <div class="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Logo & Tagline -->
        <div>
          <div class="flex items-center space-x-2 mb-3">
            <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-10 h-10" />
            <span class="text-xl font-extrabold text-[#0073b1]">SkillLink</span>
          </div>
          <p class="text-sm text-gray-600">
            Empowering service providers to grow their business and connect with more customers.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-sm font-bold text-gray-800 mb-3">Quick Links</h3>
          <ul class="space-y-2 text-sm text-gray-600">

            <li>
              <router-link to="/providerpolicies" class="flex items-center gap-2 hover:text-[#0073b1] transition">
                <!-- Shield/Document Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 3l8 4v6c0 5-3 9-8 10-5-1-8-5-8-10V7l8-4z" />
                </svg>
                <span>Policies</span>
              </router-link>
            </li>

            <li>
              <router-link to="/providerabout" class="flex items-center gap-2 hover:text-[#0073b1] transition">
                <!-- Info Circle Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>About Us</span>
              </router-link>
            </li>

            <li>
              <router-link to="/providercontact" class="flex items-center gap-2 hover:text-[#0073b1] transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.05 11.05 0 003.47.55 1 1 0 011 1V20a1 1 0 01-1 1C10.42 21 3 13.58 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.2.19 2.38.55 3.47a1 1 0 01-.21 1.11l-2.22 2.21z" />
                </svg>
                <span>Contact</span>
              </router-link>
            </li>

          </ul>
        </div>

        <!-- Support -->
        <div>
          <h3 class="text-sm font-bold text-gray-800 mb-3">Support</h3>
          <ul class="space-y-2 text-sm text-gray-600">
            <li>
              <router-link to="/help" class="flex items-center gap-2 hover:text-[#0073b1] transition">
                <!-- Help Circle Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 18h.01M12 6a9 9 0 100 18 9 9 0 000-18zm0 4v4" />
                </svg>
                <span>Help Center</span>
              </router-link>
            </li>

            <li>
              <a href="mailto:connectteamskilllink@gmail.com"
                class="flex items-center gap-2 hover:text-[#0073b1] transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75zm2.334-.75L12 11.327 19.416 6h-14.832zm15.166 1.635-7.731 5.154a.75.75 0 0 1-.838 0L3.45 7.635v9.615c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75V7.635z" />
                </svg>
                <span>connectteamskilllink@gmail.com</span>
              </a>
            </li>

            <li>
              <a href="tel:+919876543210" class="flex items-center gap-2 hover:text-[#0073b1] transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.05 11.05 0 003.47.55 1 1 0 011 1V20a1 1 0 01-1 1C10.42 21 3 13.58 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.2.19 2.38.55 3.47a1 1 0 01-.21 1.11l-2.22 2.21z" />
                </svg>
                <span>+91 98765 43210</span>
              </a>
            </li>

          </ul>
        </div>

        <!-- Legal & Social -->
        <div>
          <h3 class="text-sm font-bold text-gray-800 mb-3">More</h3>
          <ul class="space-y-2 text-sm text-gray-600">
            <li><router-link to="/terms" class="hover:text-[#0073b1] flex gap-2"> <svg
                  xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"
                  aria-hidden="true">
                  <!-- finial + crossbar -->
                  <path
                    d="M11 2a1 1 0 0 1 2 0v2h3a1 1 0 1 1 0 2h-1.6l3.86 7A3.75 3.75 0 1 1 14.5 16h-.5V7h-4v9h-.5A3.75 3.75 0 1 1 4.74 13l3.86-7H7A1 1 0 1 1 7 4h4V2zM7.2 9.2 5 13h4L7.2 9.2zm11.8 3.8h-4l2.2-3.8 1.8 3.8z" />
                  <!-- base -->
                  <path d="M10 19h4v2h-4z" />
                </svg> Terms of Service</router-link></li>
            <li><router-link to="/privacy" class="hover:text-[#0073b1] flex gap-2"> <svg
                  xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1l9 4v6c0 5-3.6 9.7-9 11-5.4-1.3-9-6-9-11V5l9-4zM7 9v2h10V9H7z" />
                </svg> <span>Privacy Policy</span> </router-link></li>
          </ul>
          <div class="flex space-x-4 mt-4">
            <a href="#" class="text-gray-500 hover:text-[#0073b1]"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="text-gray-500 hover:text-[#0073b1]"><i class="fab fa-twitter"></i></a>
            <a href="#" class="text-gray-500 hover:text-[#0073b1]"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t text-center text-sm text-gray-500 py-4">
        © 2025 SkillLink Provider Portal. All rights reserved. Powered by SkillLink
      </div>
    </footer>
  </div>
</template>

<script>
import API from '@/api';
import { ref, onMounted, reactive, computed, nextTick } from 'vue';
import Chart from 'chart.js/auto';

export default {
  name: 'ServiceProvider',
  setup() {
    const drawerOpen = ref(false);
    const provider = ref(null);
    const stats = reactive({ total: 0, completed: 0, earnings: 0, earningsData: [] });
    const recentOrders = ref([]);
    const newOrdersCount = ref(0);
    const profileCompletion = ref(0);
    const defaultPic = require('@/assets/user.png');
    const earningsChart = ref(null);
    const chartInstance = ref(null);

    const profileImage = computed(() =>
      provider.value?.profilePic
        ? API.getImageUrl(`providers/${provider.value.profilePic}`) // use helper
        : defaultPic
    );

    const greeting = computed(() => {
      const hour = new Date().getHours();
      if (hour < 12) return 'Good Morning';
      else if (hour < 18) return 'Good Afternoon';
      else return 'Good Evening';
    });

    const statsCards = computed(() => [
      { title: 'Total Orders', value: stats.total, color: 'text-[#007EA7]' },
      { title: 'Completed', value: stats.completed, color: 'text-green-500' },
      { title: 'Earnings', value: stats.earnings, color: 'text-yellow-600' },
      { title: 'Profile Completion', value: profileCompletion.value, color: 'text-[#0073b1]' },
    ]);

    const handleImageError = (e) => (e.target.src = defaultPic);

    const statusColor = (status) => {
      switch (status) {
        case 'Pending': return 'bg-yellow-100 text-yellow-800';
        case 'Accepted': return 'bg-blue-100 text-blue-800';
        case 'Completed': return 'bg-green-100 text-green-800';
        case 'Rejected': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const fetchProviderProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get(`/providers/profile`, { headers: { Authorization: `Bearer ${token}` } });
        provider.value = res.data;
        let completed = 0;
        if (provider.value.name) completed += 25;
        if (provider.value.profilePic) completed += 25;
        if (provider.value.services?.length > 0) completed += 25;
        if (provider.value.bio) completed += 25;
        profileCompletion.value = completed;
      } catch (err) {
        console.error(err);
      }
    };

    const fetchNewOrdersCount = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get(`/providerorders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Count orders which are not completed
        newOrdersCount.value = res.data.filter(order => order.status !== 'Completed').length;
      } catch (err) {
        console.error('Error fetching new orders count:', err);
      }
    };

    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get(`/providerorders/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        stats.total = res.data.total || 0;
        stats.completed = res.data.completed || 0;
        stats.earnings = res.data.earnings || 0;
        stats.earningsData = Array.isArray(res.data.earningsData)
          ? res.data.earningsData.map(n => Number(n) || 0)
          : Array(12).fill(0);

        await renderEarningsChart();

      } catch (err) {
        console.error(err);
      }
    };

    const fetchRecentOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get(`/providerorders/recent`, { headers: { Authorization: `Bearer ${token}` } });
        recentOrders.value = res.data;
      } catch (err) {
        console.error(err);
      }
    };

    const renderEarningsChart = async () => {
      await nextTick();
      if (!earningsChart.value) return;
      if (chartInstance.value) chartInstance.value.destroy();

      const monthlyData = [...stats.earningsData];

      const ctx = earningsChart.value.getContext('2d');
      chartInstance.value = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Earnings',
            data: monthlyData,
            backgroundColor: '#0073b1',
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
          scales: { y: { beginAtZero: true } }
        }
      });
    };
    onMounted(async () => {
      await fetchProviderProfile();
      await fetchStats();
      await fetchRecentOrders();
      await fetchNewOrdersCount();
      setInterval(fetchNewOrdersCount, 60000);
    });

    return { drawerOpen, provider, stats, recentOrders, profileCompletion, profileImage, greeting, statsCards, handleImageError, statusColor, earningsChart, newOrdersCount };
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
