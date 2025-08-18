<template>
  <div class="min-h-screen bg-[#F0F9FF] text-gray-800">
    <!-- Navbar -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white via-[#f1faff] to-[#f5fafe] shadow-md">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-10 h-10" />
          <span class="text-xl font-bold text-[#0073b1]">SkillLink</span>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-6 text-sm lg:text-base">

          <!-- Orders -->
          <router-link to="/provider/orders"
            class="relative flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-[#0073b1] transition font-medium"
            active-class="text-[#0073b1] font-semibold after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-[#0073b1] after:rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M6 2a1 1 0 0 0-1 1v2H3a1 1 0 1 0 0 2h1l1.6 9.59A3 3 0 0 0 8.56 19h6.88a3 3 0 0 0 2.96-2.41L20 7H7V5h10a1 1 0 1 0 0-2H7V3a1 1 0 0 0-1-1zm2.56 15a1 1 0 0 1-.98-.8L6.28 9h11.44l-1.3 7.2a1 1 0 0 1-.98.8H8.56zM9 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm6 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            </svg>
            <span>Orders</span>
          </router-link>

          <!-- Profile -->
          <router-link to="/profile">
            <img :src="profileImage" @error="handleImageError"
              class="w-10 h-10 rounded-full border border-gray-300 hover:border-[#0073b1] transition cursor-pointer object-cover"
              loading="lazy" />
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
            <router-link @click="drawerOpen = false" to="/serviceprovider"
              class="block text-[#0073b1] font-semibold py-1">Home</router-link>
            <router-link @click="drawerOpen = false" to="/provider/orders"
              class="block text-[#0073b1] font-semibold py-1">Orders</router-link>
            <router-link @click="drawerOpen = false" to="/provider/policies"
              class="block text-[#0073b1] font-semibold py-1">Policies</router-link>
            <router-link @click="drawerOpen = false" to="/provider/about"
              class="block text-[#0073b1] font-semibold py-1">About</router-link>
            <router-link @click="drawerOpen = false" to="/provider/contact"
              class="block text-[#0073b1] font-semibold py-1">Contact</router-link>
            <router-link @click="drawerOpen = false" to="/profile" class="block mt-2">
              <img :src="profileImage" @error="handleImageError"
                class="w-10 h-10 rounded-full border-2 border-[#0073b1]" loading="lazy" />
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
            class="flex justify-between items-center py-2 border-b last:border-b-0 hover:bg-gray-50 rounded transition">
            <span>{{ order.serviceName }}</span>
            <span :class="statusColor(order.status) + ' px-3 py-1 rounded-full text-sm font-semibold'">{{ order.status
            }}</span>
          </li>
          <li v-if="recentOrders.length === 0" class="text-gray-500 py-2 text-center">No recent orders</li>
        </ul>
      </section>

      <!-- Quick Actions -->
      <section class="mb-10 flex flex-wrap gap-4 justify-center">
        <router-link to="/provider/orders"
          class="bg-[#0073b1] hover:bg-[#005f8d] text-white px-5 py-3 rounded-lg font-semibold transition flex items-center gap-2">
          <span>📄</span> View Orders
        </router-link>
        <router-link to="/provider/profile"
          class="bg-[#f46675] hover:bg-[#d95563] text-white px-5 py-3 rounded-lg font-semibold transition flex items-center gap-2">
          <span>✏️</span> Update Profile
        </router-link>
        <router-link to="/provider/add-service"
          class="bg-[#3B8D99] hover:bg-[#2f7077] text-white px-5 py-3 rounded-lg font-semibold transition flex items-center gap-2">
          <span>➕</span> Add Service
        </router-link>
      </section>
    </main>

    <!-- Footer -->
    <footer class="mt-12 border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-600">

        <!-- Left side -->
        <div class="text-center sm:text-left">
          <h2 class="font-bold text-[#0073b1] text-lg">SkillLink</h2>
          <p class="mt-2 text-gray-500">Empowering providers with tools to manage services and grow faster.</p>
          <p class="mt-4 text-xs text-gray-400">© 2025 SkillLink Provider Portal. All rights reserved.</p>
        </div>

        <!-- Middle: Quick Links -->
        <div class="text-center">
          <h3 class="font-semibold text-gray-700 mb-3">Quick Links</h3>
          <ul class="space-y-2">
             <!-- Contact -->
          <router-link to="/provider/contact"
            class="relative flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-[#0073b1] transition font-medium"
            active-class="text-[#0073b1] font-semibold after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-[#0073b1] after:rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M21 16.5a17.05 17.05 0 0 1-7.5-7.5l2.2-2.2a1 1 0 0 0 .2-1.1l-2-5A1 1 0 0 0 12 0H7a2 2 0 0 0-2 2 19 19 0 0 0 19 19 2 2 0 0 0 2-2v-5a1 1 0 0 0-.7-.95l-5-2a1 1 0 0 0-1.1.2z" />
            </svg>
            <span>Contact</span>
          </router-link>
            <!-- Policies -->
          <router-link to="/provider/policies"
            class="relative flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-[#0073b1] transition font-medium"
            active-class="text-[#0073b1] font-semibold after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-[#0073b1] after:rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5z" />
            </svg>
            <span>Policies</span>
          </router-link>

                      <!-- About -->
          <router-link to="/provider/about"
            class="relative flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-[#0073b1] transition font-medium"
            active-class="text-[#0073b1] font-semibold after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-[#0073b1] after:rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 15a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm1-4h-2V7h2z" />
            </svg>
            <span>About</span>
          </router-link>

          </ul>
        </div>

        <!-- Right side: Social icons -->
        <div class="text-center sm:text-right">
          <h3 class="font-semibold text-gray-700 mb-3">Follow Us</h3>
          <div class="flex justify-center sm:justify-end space-x-4">
            <!-- LinkedIn -->
            <a href="https://linkedin.com" target="_blank" rel="noopener"
              class="hover:text-[#0073b1] transition transform hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14C2.24 0 0 2.24 0 5.01V19c0 2.76 2.24 5 5 5h14c2.76 
                     0 5-2.24 5-5V5c0-2.77-2.24-5-5-5zM8.34 19H5.67V9h2.67v10zM7 
                     7.67c-.86 0-1.56-.7-1.56-1.56S6.14 4.56 7 4.56s1.56.7 
                     1.56 1.56S7.86 7.67 7 7.67zM20 19h-2.67v-5.2c0-1.24-.02-2.83-1.73-2.83-1.73 
                     0-2 1.35-2 2.74V19h-2.67V9h2.56v1.37h.04c.36-.68 
                     1.23-1.39 2.53-1.39 2.7 0 3.2 1.78 3.2 4.09V19z" />
              </svg>
            </a>

            <!-- Twitter / X -->
            <a href="https://x.com" target="_blank" rel="noopener"
              class="hover:text-[#0073b1] transition transform hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 
                     8.26L22 21.75h-6.602l-5.154-6.89-5.908 
                     6.89H1.028l7.73-9.015L2 2.25h6.727l4.713 
                     6.478L18.244 2.25z" />
              </svg>
            </a>

            <!-- GitHub -->
            <a href="https://github.com" target="_blank" rel="noopener"
              class="hover:text-[#0073b1] transition transform hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .5C5.73.5.5 5.73.5 
                     12c0 5.09 3.29 9.4 7.86 10.94.58.1.79-.25.79-.56v-2.16c-3.2.7-3.88-1.54-3.88-1.54-.53-1.35-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 
                     1.17.08 1.79 1.2 1.79 1.2 1.04 1.77 2.73 
                     1.26 3.39.97.1-.76.41-1.26.75-1.55-2.55-.29-5.23-1.28-5.23-5.7 
                     0-1.26.45-2.3 1.2-3.11-.12-.3-.52-1.52.12-3.18 
                     0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.82 
                     0c2.22-1.49 3.2-1.18 3.2-1.18.64 1.66.24 2.88.12 
                     3.18.75.81 1.2 1.85 1.2 3.11 0 4.43-2.68 5.41-5.23 
                     5.7.42.37.8 1.1.8 2.23v3.3c0 .31.21.67.8.56A10.99 
                     10.99 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, reactive, computed, nextTick } from 'vue';
import Chart from 'chart.js/auto';

const API_BASE = 'http://localhost:5000';

export default {
  name: 'ServiceProvider',
  setup() {
    const drawerOpen = ref(false);
    const provider = ref(null);
    const stats = reactive({ total: 0, completed: 0, earnings: 0, earningsData: [] });
    const recentOrders = ref([]);
    const profileCompletion = ref(0);
    const defaultPic = require('@/assets/user.png');
    const earningsChart = ref(null);
    const chartInstance = ref(null);

    const profileImage = computed(() =>
      provider.value?.profilePic
        ? `${API_BASE}/uploads/providers/${provider.value.profilePic}`
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
        const res = await axios.get(`${API_BASE}/api/providers/profile`, { headers: { Authorization: `Bearer ${token}` } });
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

    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE}/api/provider/orders/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log('Fetched stats raw:', res.data);

        stats.total = res.data.total || 0;
        stats.completed = res.data.completed || 0;
        stats.earnings = res.data.earnings || 0;
        stats.earningsData = Array.isArray(res.data.earningsData)
          ? res.data.earningsData.map(n => Number(n) || 0)
          : Array(12).fill(0);

        console.log('Processed earningsData:', stats.earningsData);

        await renderEarningsChart();

      } catch (err) {
        console.error(err);
      }
    };


    const fetchRecentOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE}/api/provider/orders/recent`, { headers: { Authorization: `Bearer ${token}` } });
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
      console.log("Chart data:", monthlyData);

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
    });

    return { drawerOpen, provider, stats, recentOrders, profileCompletion, profileImage, greeting, statsCards, handleImageError, statusColor, earningsChart };
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
