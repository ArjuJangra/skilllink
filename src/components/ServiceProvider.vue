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
        <nav class="hidden md:flex items-center space-x-4 text-sm lg:text-base">
          <router-link to="/serviceprovider"
            class="px-3 py-2 font-semibold text-[#0073b1] rounded-full hover:bg-[#e6f4f9] transition">Home</router-link>
          <router-link to="/provider/orders"
            class="px-3 py-2 font-semibold text-[#0073b1] rounded-full hover:bg-[#e6f4f9] transition">Orders</router-link>
          <router-link to="/provider/policies"
            class="px-3 py-2 font-semibold text-[#0073b1] rounded-full hover:bg-[#e6f4f9] transition">Policies</router-link>
          <router-link to="/provider/about"
            class="px-3 py-2 font-semibold text-[#0073b1] rounded-full hover:bg-[#e6f4f9] transition">About</router-link>
          <router-link to="/provider/contact"
            class="px-3 py-2 font-semibold text-[#0073b1] rounded-full hover:bg-[#e6f4f9] transition">Contact</router-link>
          <router-link to="/profile">
            <img :src="profileImage" @error="handleImageError"
              class="w-10 h-10 rounded-full border-2 border-[#0073b1] cursor-pointer" loading="lazy" />
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
    <footer class="text-center py-6 text-xs sm:text-sm text-gray-500 mt-10">
      © 2025 SkillLink Provider Portal. All rights reserved.
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
