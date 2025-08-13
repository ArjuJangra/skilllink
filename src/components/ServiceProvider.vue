<template>
  <div class="min-h-screen bg-[#F0F9FF] text-gray-800">
    <!-- Navbar -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white via-[#f1faff] to-[#f5fafe] shadow-md">

      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <!-- Logo + Title -->
        <div class="flex items-center space-x-2">
          <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-10 h-10 sm:w-10 sm:h-10" />
          <span class="text-xl sm:text-xl font-bold text-[#0073b1]">SkillLink</span>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-3 lg:space-x-4 text-sm lg:text-base">

          <router-link to="/serviceprovider" class="nav-link">Home</router-link>

          <router-link to="/provider/orders" class="nav-link">Orders</router-link>

          <router-link to="/provider/policies" class="nav-link">Policies</router-link>

          <router-link to="/provider/about" class="nav-link">About</router-link>

          <router-link to="/provider/contact" class="nav-link">Contact</router-link>

          <!-- Profile Picture -->
          <router-link to="/profile">
            <img v-if="provider?.profilePic" :src="`http://localhost:5000/uploads/providers/${provider.profilePic}`"
              @error="handleImageError" alt="Provider DP"
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-[#0073b1] cursor-pointer" />
            <img v-else src="@/assets/user.png" alt="Default Provider DP"
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-[#0073b1] cursor-pointer" />
          </router-link>
        </nav>

        <!-- Mobile Hamburger -->
        <button @click="drawerOpen = !drawerOpen" class="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none">
          <svg class="w-6 h-6 text-[#0073b1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Mobile Drawer -->
      <transition name="slide">
        <div v-if="drawerOpen" class="md:hidden bg-white border-t border-gray-200 shadow-md px-4 py-4 space-y-4">
          <router-link @click="drawerOpen = false" to="/serviceprovider" class="mobile-link">Home</router-link>
          <router-link @click="drawerOpen = false" to="/provider/orders" class="mobile-link">Orders</router-link>
          <router-link @click="drawerOpen = false" to="/provider/policies" class="mobile-link">Policies</router-link>
          <router-link @click="drawerOpen = false" to="/provider/about" class="mobile-link">About</router-link>
          <router-link @click="drawerOpen = false" to="/provider/contact" class="mobile-link">Contact</router-link>
          <router-link @click="drawerOpen = false" to="/provider/profile" class="block">
            <img :src="profileImage" @error="handleImageError"
              class="w-9 h-9 rounded-full border-2 border-[#0073b1] mt-2" alt="Provider DP" />
          </router-link>
        </div>
      </transition>
    </header>

    <!-- Main Content -->
    <main class="max-w-screen-xl mx-auto px-4 pt-24 sm:pt-28">
      <!-- Welcome -->
      <section class="py-6 sm:py-8 text-center bg-gradient-to-r from-blue-100 to-white shadow-md rounded-xl mt-4">
        <h2
          class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#3B8D99] to-[#f46675] bg-clip-text text-transparent mb-2">
          Welcome, {{ provider?.name || 'Provider' }}!
        </h2>

        <p class="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-gray-600">
          Thank you for joining us! Here you can accept service requests, manage orders, and grow your reach with
          SkillLink.
        </p>
      </section>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div class="stat-card">
          <h4 class="stat-title">Total Orders</h4>
          <p class="stat-value text-[#007EA7]">{{ stats.total }}</p>
        </div>
        <div class="stat-card">
          <h4 class="stat-title">Completed</h4>
          <p class="stat-value text-green-500">{{ stats.completed }}</p>
        </div>
        <div class="stat-card">
          <h4 class="stat-title">Earnings</h4>
          <p class="stat-value text-yellow-600">₹{{ stats.earnings }}</p>
        </div>
      </div>

      <!-- Orders Info -->
      <section class="info-section">
        <h3 class="info-title">How Orders Work</h3>
        <ul class="info-list">
          <li>You will receive order notifications based on your listed services.</li>
          <li>You can Accept or Reject incoming requests in your dashboard.</li>
          <li>After accepting, update the status to "Completed" once the service is delivered.</li>
          <li>Timely service and good ratings will increase your visibility on the platform.</li>
        </ul>
      </section>

      <!-- Policies -->
      <section class="info-section bg-white shadow-sm rounded-lg">
        <h3 class="info-title">Our Policies</h3>
        <ul class="info-list">
          <li>Respect customer privacy and property.</li>
          <li>No advance payments should be demanded from customers.</li>
          <li>Misuse of platform leads to account suspension.</li>
          <li>All disputes must be reported to SkillLink Support.</li>
        </ul>
      </section>

      <!-- About -->
      <section class="info-section">
        <h3 class="info-title">About SkillLink</h3>
        <p class="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-gray-700">
          SkillLink connects verified service providers like you to customers needing reliable repair, maintenance, and
          support services. We empower local professionals and streamline home and field service delivery.
        </p>
      </section>

      <!-- Contact -->
      <section class="py-6 sm:py-8 mt-6 bg-[#e6f4fa] rounded-lg text-center">
        <h3 class="info-title">Contact Us</h3>
        <p class="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-gray-700">
          Have questions or need help? Email <strong>connectteamskilllink@gmail.com</strong> or call <strong>+91 98765
            43210</strong>.
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
      stats: {
        total: 0,
        completed: 0,
        earnings: 0
      },
      defaultPic: require('@/assets/user.png')
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
        const res = await axios.get('http://localhost:5000/api/providers/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.provider = res.data;
      } catch (err) {
        console.error('❌ Failed to fetch provider profile:', err);
      }
    },
    async fetchStats() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/provider/orders/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.stats = res.data;
      } catch (err) {
        console.error('❌ Failed to fetch stats:', err);
      }
    },
    handleImageError(e) {
      e.target.src = this.defaultPic;
    }
  },
  mounted() {
    this.fetchProviderProfile();
    this.fetchStats();
  }
};
</script>

<style scoped>
.nav-link {
  padding-left: 0.75rem;
  /* px-3 */
  padding-right: 0.75rem;
  padding-top: 0.5rem;
  /* py-2 */
  padding-bottom: 0.5rem;
  font-weight: 600;
  /* font-semibold */
  color: #0073b1;
  /* text-[#0073b1] */
  border-radius: 9999px;
  /* rounded-full */
  transition: background-color 0.2s;
  text-decoration: none;
}

.nav-link:hover {
  background-color: rgb(230, 244, 249);
  /* hover:bg-[rgb(230,244,249)] */
}

.mobile-link {
  display: block;
  color: #0073b1;
  font-weight: 600;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

.stat-card {
  background-color: #fff;
  border-radius: 1rem;
  /* rounded-2xl */
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  /* shadow */
  padding: 1.25rem;
  /* p-5 */
  text-align: center;
}

.stat-title {
  font-size: 0.875rem;
  /* text-sm */
  font-weight: 600;
  /* font-semibold */
  color: #374151;
  /* text-gray-700 */
  margin-bottom: 0.25rem;
  /* mb-1 */
}

@media (min-width: 640px) {
  .stat-title {
    font-size: 1.125rem;
    /* sm:text-lg */
  }
}

.stat-value {
  font-size: 1.5rem;
  /* text-2xl */
  font-weight: 700;
  /* font-bold */
}

@media (min-width: 640px) {
  .stat-value {
    font-size: 1.875rem;
    /* sm:text-3xl */
  }
}

.info-section {
  padding-top: 1.5rem;
  /* py-6 */
  padding-bottom: 1.5rem;
  margin-top: 1.5rem;
  /* mt-6 */
  text-align: center;
}

@media (min-width: 640px) {
  .info-section {
    padding-top: 2rem;
    /* sm:py-8 */
    padding-bottom: 2rem;
  }
}

.info-title {
  font-size: 1.125rem;
  /* text-lg */
  font-weight: 600;
  /* font-semibold */
  color: #0073b1;
  /* text-[#0073b1] */
  margin-bottom: 0.75rem;
  /* mb-3 */
}

@media (min-width: 640px) {
  .info-title {
    font-size: 1.5rem;
    /* sm:text-2xl */
  }
}

.info-list {
  max-width: 42rem;
  /* max-w-2xl */
  margin-left: auto;
  margin-right: auto;
  list-style-type: disc;
  list-style-position: inside;
  margin-bottom: 0;
  padding-left: 0;
  font-size: 0.75rem;
  /* text-xs */
  color: #374151;
  /* text-gray-700 */
  text-align: left;
}

@media (min-width: 640px) {
  .info-list {
    font-size: 0.875rem;
    /* sm:text-sm */
  }
}

@media (min-width: 768px) {
  .info-list {
    font-size: 1rem;
    /* md:text-base */
  }
}

.info-list>*+* {
  margin-top: 0.5rem;
  /* space-y-2 */
}

.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
}
</style>
