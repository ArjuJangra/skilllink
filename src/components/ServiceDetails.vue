<template>
  <div class="min-h-screen bg-[#F0F9FF] text-gray-800">
    <!-- Navbar -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div class="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        <!-- Logo + Name -->
        <div class="flex items-center space-x-2">
          <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="h-8 w-8 sm:h-10 sm:w-10 object-contain" />
          <h1 class="text-xl sm:text-2xl font-bold text-[#0073b1]">SkillLink</h1>
        </div>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center space-x-6 text-sm sm:text-base">
          <router-link to="/serviceprovider"
            class="px-3 py-2 text-xl font-bold text-[#0073b1] hover:bg-[#e6f4f9] rounded-full">Home</router-link>

          <router-link to="/provider/orders"
            class="relative flex items-center space-x-2 px-4 py-2 text-xl font-bold text-[#0073b1] hover:bg-[#e6f4f9] rounded-full">
            <span>Orders</span>
            <span v-if="orderCount > 0"
              class="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow">
              {{ orderCount }}
            </span>
          </router-link>

          <router-link to="/provider/policies"
            class="px-3 py-2 text-xl font-bold text-[#0073b1] hover:bg-[#e6f4f9] rounded-full">Policies</router-link>
          <router-link to="/provider/about"
            class="px-3 py-2 text-xl font-bold text-[#0073b1] hover:bg-[#e6f4f9] rounded-full">About</router-link>
          <router-link to="/provider/contact"
            class="px-3 py-2 text-xl font-bold text-[#0073b1] hover:bg-[#e6f4f9] rounded-full">Contact</router-link>

          <router-link to="/provider/profile">
            <img :src="profileImage" @error="handleImageError"
              class="w-9 h-9 rounded-full object-cover border-2 border-[#0073b1] cursor-pointer" alt="Provider DP" />
          </router-link>
        </nav>

        <!-- Mobile Menu Button -->
        <button @click="drawerOpen = !drawerOpen" class="md:hidden focus:outline-none">
          <svg class="h-6 w-6 text-[#0073b1]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
            stroke-linecap="round" stroke-linejoin="round">
            <path v-if="!drawerOpen" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Drawer -->
      <div v-if="drawerOpen"
        class="md:hidden bg-white border-t border-gray-200 shadow-md px-4 py-4 space-y-4 transition-all duration-300">
        <router-link @click="drawerOpen = false" to="/serviceprovider"
          class="block text-[#0073b1] font-semibold">Home</router-link>
        <router-link @click="drawerOpen = false" to="/provider/orders"
          class="block text-[#0073b1] font-semibold">Orders</router-link>
        <router-link @click="drawerOpen = false" to="/provider/policies"
          class="block text-[#0073b1] font-semibold">Policies</router-link>
        <router-link @click="drawerOpen = false" to="/provider/about"
          class="block text-[#0073b1] font-semibold">About</router-link>
        <router-link @click="drawerOpen = false" to="/provider/contact"
          class="block text-[#0073b1] font-semibold">Contact</router-link>
        <router-link @click="drawerOpen = false" to="/provider/profile" class="block">
          <img :src="profileImage" @error="handleImageError"
            class="w-10 h-10 rounded-full border-2 border-[#0073b1] mt-2" alt="Provider DP" />
        </router-link>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-screen-xl mx-auto px-4 pt-28 sm:pt-32">
      <!-- Welcome -->
      <section class="py-8 sm:py-10 text-center bg-white shadow-md rounded-xl mt-4">
        <h2 class="text-2xl sm:text-3xl font-bold text-[#0073b1] mb-3">Welcome, {{ provider?.name || 'Provider' }}!</h2>
        <p class="max-w-2xl mx-auto text-sm sm:text-base text-gray-600">
          Thank you for joining us! Here you can accept service requests, manage orders, and grow your reach with
          SkillLink.
        </p>
      </section>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div class="bg-white rounded-2xl shadow p-6">
          <h4 class="text-lg font-semibold text-gray-700 mb-2">Total Orders</h4>
          <p class="text-3xl font-bold text-[#007EA7]">{{ stats.total }}</p>
        </div>
        <div class="bg-white rounded-2xl shadow p-6">
          <h4 class="text-lg font-semibold text-gray-700 mb-2">Completed</h4>
          <p class="text-3xl font-bold text-green-500">{{ stats.completed }}</p>
        </div>
        <div class="bg-white rounded-2xl shadow p-6">
          <h4 class="text-lg font-semibold text-gray-700 mb-2">Earnings</h4>
          <p class="text-3xl font-bold text-yellow-600">₹{{ stats.earnings }}</p>
        </div>
      </div>

      <!-- Orders Info -->
      <section class="py-10 mt-8 text-center">
        <h3 class="text-xl sm:text-2xl font-semibold text-[#0073b1] mb-4">How Orders Work</h3>
        <ul class="max-w-2xl mx-auto list-disc list-inside space-y-2 text-sm sm:text-base text-left text-gray-700">
          <li>You will receive order notifications based on your listed services.</li>
          <li>You can Accept or Reject incoming requests in your dashboard.</li>
          <li>After accepting, update the status to "Completed" once the service is delivered.</li>
          <li>Timely service and good ratings will increase your visibility on the platform.</li>
        </ul>
      </section>

      <!-- Policies -->
      <section class="py-8 sm:py-10 mt-8 bg-white shadow-sm rounded-lg text-center">
        <h3 class="text-xl sm:text-2xl font-semibold text-[#0073b1] mb-3">Our Policies</h3>
        <ul class="max-w-2xl mx-auto list-disc list-inside space-y-2 text-sm sm:text-base text-left text-gray-700">
          <li>Respect customer privacy and property.</li>
          <li>No advance payments should be demanded from customers.</li>
          <li>Misuse of platform leads to account suspension.</li>
          <li>All disputes must be reported to SkillLink Support.</li>
        </ul>
      </section>

      <!-- About -->
      <section class="py-8 sm:py-10 mt-8 text-center">
        <h3 class="text-xl sm:text-2xl font-semibold text-[#0073b1] mb-3">About SkillLink</h3>
        <p class="max-w-2xl mx-auto text-sm sm:text-base text-gray-700">
          SkillLink connects verified service providers like you to customers needing reliable repair, maintenance, and
          support services. We empower local professionals and streamline home and field service delivery.
        </p>
      </section>

      <!-- Contact -->
      <section class="py-8 sm:py-10 mt-8 bg-[#e6f4fa] rounded-lg text-center">
        <h3 class="text-xl sm:text-2xl font-semibold text-[#0073b1] mb-3">Contact Us</h3>
        <p class="max-w-2xl mx-auto text-sm sm:text-base text-gray-700">
          Have questions or need help? Email <strong>connectteamskilllink@gmail.com</strong> or call <strong>+91 98765 43210</strong>.
        </p>
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

export default {
  name: 'ServiceProvider',
  data() {
    return {
      drawerOpen: false,
      provider: null,
      orderCount: 0,
      defaultPic: require('@/assets/user.png'),
      stats: {
        total: 0,
        completed: 0,
        earnings: 0
      }
    };
  },
  computed: {
    profileImage() {
      return this.provider?.profilePic
        ? `http://localhost:5000/uploads/providers/${this.provider.profilePic}`
        : this.defaultPic;
    }
  },
  methods: {
    async fetchProviderProfile() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/providers/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.provider = response.data;
      } catch (error) {
        console.error('❌ Failed to fetch provider profile:', error);
      }
    },
    async fetchOrderCount() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/providers/orders/count', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.orderCount = res.data.count || 0;
        console.log('✅ Updated Order Count:', this.orderCount);
      } catch (error) {
        console.error('❌ Error fetching order count:', error);
      }
    },
    async fetchOrderStats() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/providers/orders/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.stats = res.data;
        console.log('📊 Order Stats:', this.stats);
      } catch (error) {
        console.error('❌ Failed to fetch order stats:', error);
      }
    },
    handleImageError(e) {
      e.target.src = this.defaultPic;
    }
  },
  mounted() {
    this.fetchProviderProfile();
    this.fetchOrderCount();
    this.fetchOrderStats();
  }
};
</script>


<style scoped>
.fade-in {
  animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
