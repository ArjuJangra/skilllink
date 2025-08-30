<template>
  <div class="min-h-screen bg-[#F0F9FF] text-gray-800">
    <header class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white via-[#f1faff] to-[#f5fafe] shadow-md">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">

        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <img src="@/assets/skilllogo.png" alt="Logo" class="w-10 h-10" />
          <span class="text-xl font-bold text-[#0073b1]">SkillLink</span>
        </div>

        <!-- Nav items: Orders + Profile -->
        <div class="flex items-center space-x-4">

          <!-- Orders -->
          <router-link to="/providerorders"
            class="relative flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-[#0073b1] hover:scale-105 transition-transform duration-200 font-medium"
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

          <!-- Profile picture -->
          <router-link to="/providerprofile">
            <img :src="profileImage" @error="handleImageError"
              class="w-10 h-10 rounded-full border border-gray-300 object-cover" />
          </router-link>

        </div>
      </div>
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
              class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 text-xs bg-white px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition md:group-hover:opacity-100">
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
        <router-link to="/providerprofile"
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
            <li><router-link to="/providerabout" class="flex items-center gap-2 hover:text-[#0073b1] transition"> <!-- Info Circle Icon --> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg> <span>About Us</span> </router-link></li>
            <li>
              <router-link to="/providerpolicies" class="flex items-center gap-2 hover:text-[#0073b1] transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 3l8 4v6c0 5-3 9-8 10-5-1-8-5-8-10V7l8-4z" />
                </svg>
                <span>Policies</span>
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
                 <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" xmlns:xlink="http://www.w3.org/1999/xlink"
              fill="currentcolor" version="1.1" id="Layer_1" viewBox="0 0 24 24" >
              <g>
                <path
                  d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,20c-4.5,0-8-3.5-8-8s3.5-8,8-8s8,3.5,8,8   S16.5,20,12,20z" />
              </g>
              <rect x="11" y="15" width="2" height="2" />
              <path
                d="M13,14h-2c0-2.6,2-2.1,2-4.2c0-0.4-0.2-1.3-1.1-1.3c-0.3,0-1,0.5-1,1.5H9c0,0-0.4-3,2.9-3C14.5,7,15,8.9,15,9.8  C15,12.1,13,12.3,13,14z" />
            </svg>
                <span>Help Center</span>
              </router-link>
            </li>
          <li> <router-link to="/providercontact" class="flex items-center gap-2 hover:text-[#0073b1] transition"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"> <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.05 11.05 0 003.47.55 1 1 0 011 1V20a1 1 0 01-1 1C10.42 21 3 13.58 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.2.19 2.38.55 3.47a1 1 0 01-.21 1.11l-2.22 2.21z" /> </svg> <span>Contact</span> </router-link> </li>
          </ul>
        </div>

        <!-- Legal & Social -->
        <div>
          <h3 class="text-sm font-bold text-gray-800 mb-3">More</h3>
          <ul class="space-y-2 text-sm text-gray-600">
            <li><router-link to="/terms" class="hover:text-[#0073b1] flex gap-2">Terms of Service</router-link></li>
            <li><router-link to="/privacy" class="hover:text-[#0073b1] flex gap-2">Privacy Policy</router-link></li>
          </ul>
          <div class="flex space-x-4 mt-4"> <a href="#" class="text-gray-500 hover:text-[#0073b1]"><i class="fab fa-facebook-f"></i></a> <a href="#" class="text-gray-500 hover:text-[#0073b1]"><i class="fab fa-twitter"></i></a> <a href="#" class="text-gray-500 hover:text-[#0073b1]"><i class="fab fa-linkedin-in"></i></a> </div>
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
import { ref, onMounted, reactive, computed, nextTick } from 'vue';
import API from '@/api';
import Chart from 'chart.js/auto';

export default {
  name: 'ServiceProvider',
  setup() {
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
        ? API.getImageUrl(`providers/${provider.value.profilePic}`)
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
    const statusMap = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Accepted: 'bg-blue-100 text-blue-800',
      Completed: 'bg-green-100 text-green-800',
      Rejected: 'bg-red-100 text-red-800',
    };
    const statusColor = (status) => statusMap[status] || 'bg-gray-100 text-gray-800';
    const token = localStorage.getItem('token');

    const fetchProviderProfile = async () => {
      try {
        const res = await API.get(`/providers/providerprofile`, { headers: { Authorization: `Bearer ${token}` } });
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
        const res = await API.get(`/providerorders`, { headers: { Authorization: `Bearer ${token}` } });
        newOrdersCount.value = res.data.filter(order => order.status !== 'Completed').length;
      } catch (err) {
        console.error('Error fetching new orders count:', err);
      }
    };

    const fetchStats = async () => {
      try {
        const res = await API.get(`/providerorders/stats`, { headers: { Authorization: `Bearer ${token}` } });
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
        const res = await API.get(`/providerorders/recent`, { headers: { Authorization: `Bearer ${token}` } });
        recentOrders.value = res.data;
      } catch (err) {
        console.error(err);
      }
    };

    const renderEarningsChart = async () => {
      await nextTick();
      if (!earningsChart.value) return;

      const monthlyData = [...stats.earningsData];
      const ctx = earningsChart.value.getContext('2d');

      if (chartInstance.value) {
        chartInstance.value.data.datasets[0].data = monthlyData;
        chartInstance.value.update();
      } else {
        chartInstance.value = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{ label: 'Earnings', data: monthlyData, backgroundColor: '#0073b1', borderRadius: 6 }]
          },
          options: {
            responsive: true,
            plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
            scales: { y: { beginAtZero: true } }
          }
        });
      }
    };

    onMounted(async () => {
      await Promise.all([
        fetchProviderProfile(),
        fetchStats(),
        fetchRecentOrders(),
        fetchNewOrdersCount()
      ]);
      setInterval(fetchNewOrdersCount, 60000);
    });

    return {
      provider,
      stats,
      recentOrders,
      profileCompletion,
      profileImage,
      greeting,
      statsCards,
      handleImageError,
      statusColor,
      earningsChart,
      newOrdersCount
    };
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
