<template>
  <div class="min-h-screen bg-[#F0F9FF] text-gray-800 pt-20">
    <!-- Navbar -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white via-[#f1faff] to-[#f5fafe]  shadow-md">
      <div class="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <!-- Logo + Title -->
        <div class="flex items-center space-x-2">
          <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-10 h-10" />
          <span class="text-xl font-bold text-[#0073b1]">SkillLink</span>
        </div>

        <!-- Navigation -->
        <nav class="flex items-center space-x-4 text-sm md:text-base">

          <router-link to="/serviceprovider"
            class="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#0073b1] hover:scale-105 transition-transform duration-200">
            <!-- Filled Home Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3l8 7v10a2 2 0 0 1-2 2h-4a1 1 0 0 1-1-1v-5H11v5a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V10l8-7z" />
            </svg>
            <span class="font-semibold">Home</span>
          </router-link>

          <router-link to="/providerorders"
            class="relative flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-[#0073b1] transition font-medium"
            active-class="text-[#0073b1] font-semibold after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-[#0073b1] after:rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M6 2a1 1 0 0 0-1 1v2H3a1 1 0 1 0 0 2h1l1.6 9.59A3 3 0 0 0 8.56 19h6.88a3 3 0 0 0 2.96-2.41L20 7H7V5h10a1 1 0 1 0 0-2H7V3a1 1 0 0 0-1-1zm2.56 15a1 1 0 0 1-.98-.8L6.28 9h11.44l-1.3 7.2a1 1 0 0 1-.98.8H8.56zM9 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm6 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            </svg>
            <span>Orders</span>
          </router-link>

          <!-- Policies -->
          <router-link to="/providerpolicies"
            class="relative flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-[#0073b1] transition font-medium"
            active-class="text-[#0073b1] font-semibold after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-[#0073b1] after:rounded-full">
            
            <span>Policies</span>
          </router-link>

          <!-- Contact -->
          <router-link to="/providercontact"
            class="relative flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-[#0073b1] transition font-medium"
            active-class="text-[#0073b1] font-semibold after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-[#0073b1] after:rounded-full">
           
            <span>Contact</span>
          </router-link>
          <!-- Profile picture -->
          <router-link to="/providerprofile">
            <img :src="profileImage" @error="handleImageError"
              class="w-10 h-10 rounded-full border border-gray-300 object-cover" />
          </router-link>

        </nav>
      </div>
    </header>

    <!-- About Content -->
    <div class="max-w-5xl mx-auto px-4 py-10">
      <!-- Introduction -->
      <div class="text-center mb-8 bg-white p-6 rounded-lg shadow">
        <h1 class="text-3xl font-bold text-[#0073b1] mb-2">About SkillLink</h1>
        <p class="text-gray-600 max-w-xl mx-auto text-sm">
          SkillLink empowers skilled service professionals to grow their customer base and take control of their
          careers.
        </p>
      </div>

      <!-- Highlights -->
      <div class="grid md:grid-cols-3 gap-6 mb-8 text-center">
        <div class="bg-white p-4 rounded-lg shadow">
          <div class="text-3xl text-[#0073b1] mb-2">💼</div>
          <h3 class="font-semibold text-lg mb-1">Earn Opportunities</h3>
          <p class="text-sm text-gray-600">Expand your reach by connecting with local customers looking for your skills.
          </p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <div class="text-3xl text-[#0073b1] mb-2">📍</div>
          <h3 class="font-semibold text-lg mb-1">Work Locally</h3>
          <p class="text-sm text-gray-600">Get jobs based on your location and availability, no more travel hassles.</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <div class="text-3xl text-[#0073b1] mb-2">📱</div>
          <h3 class="font-semibold text-lg mb-1">Simple Booking</h3>
          <p class="text-sm text-gray-600">Get notified, accept or reject jobs, and chat with customers all in one
            place.</p>
        </div>
      </div>

      <!-- Why Join -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-[#0073b1] mb-4 text-center">Why Join SkillLink?</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div v-for="(item, index) in reasons" :key="index" class="bg-[#f0f4f8] p-5 rounded shadow text-sm">
            <h3 class="text-[#0073b1] font-semibold mb-2">{{ item.title }}</h3>
            <p class="text-gray-600">{{ item.description }}</p>
          </div>
        </div>
      </div>

      <!-- Final Statement -->
      <div class="text-center bg-white p-6 rounded shadow-md">
        <p class="text-gray-700 text-base">
          At <span class="text-[#0073b1] font-semibold">SkillLink</span>, you’re more than a service provider — you’re a
          valued partner. Let's build success together. 💙
        </p>
      </div>
    </div>

    <!-- Footer -->
    <footer class="text-center py-6 text-sm text-gray-500 mt-6">
      © 2025 SkillLink Provider Portal. All rights reserved.
    </footer>
  </div>
</template>

<script>
import API from '@/api';

export default {
  data() {
    return {
      provider: null,
      user: null,
      reasons: [
        { title: 'Verified & Trusted', description: 'Every provider is verified...' },
        { title: 'Flexible Scheduling', description: 'You control when you work...' },
        { title: 'Fair Payments', description: 'Transparent pricing and timely payments...' },
        { title: 'Dedicated Support', description: 'Our support team is ready to assist...' }
      ]
    }
  },
  computed: {
    profileImage() {
      return this.provider?.profilePic
        ? API.getImageUrl(`providers/${this.provider.profilePic}`)
        : require('@/assets/user.png');
    }
  },
  methods: {
    async fetchUserProfile() {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/providers/providerprofile', { headers: { Authorization: `Bearer ${token}` } });
        this.provider = res.data;
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    }
  },
  mounted() {
    this.fetchUserProfile();
  }
}
</script>

