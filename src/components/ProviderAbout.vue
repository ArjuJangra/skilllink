<template>
  <div class="min-h-screen bg-[#F0F9FF] text-gray-800 pt-20">
    <!-- Navbar (copied from Orders page) -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div class="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <!-- Left: Logo + Title -->
        <div class="flex items-center space-x-2">
          <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-10 h-10" />
          <span class="text-xl font-bold text-[#0073b1]">SkillLink</span>
        </div>

        <!-- Right: Navigation + Profile -->
        <nav class="flex items-center space-x-4 text-sm md:text-base">
          <router-link to="/serviceprovider" class="text-[#0073b1] font-bold hover:underline">Home</router-link>
          <router-link to="/provider/orders" class="text-[#0073b1] font-bold hover:underline">Orders</router-link>
          <router-link to="/provider/policies" class="text-[#0073b1] font-bold hover:underline">Policies</router-link>
          <router-link to="/provider/about" class="text-[#0073b1] font-bold hover:underline">About</router-link>
          <router-link to="/provider/contact" class="text-[#0073b1] font-bold hover:underline">Contact</router-link>

          <!-- Profile Picture -->
          <div class="relative group">
            <router-link to="/profile">
              <img v-if="user && user.profilePic" :src="`http://localhost:5000/uploads/${user.profilePic}`" alt="User DP"
                class="w-10 h-10 rounded-full object-cover border-2 border-[#0073b1] cursor-pointer" />
              <img v-else src="@/assets/user.png" alt="Default User DP"
                class="w-10 h-10 rounded-full object-cover border-2 border-[#0073b1] cursor-pointer" />
            </router-link>
          </div>
        </nav>
      </div>
    </header>

    <!-- About Content -->
    <div class="max-w-5xl mx-auto px-4 py-10">
      <div class="text-center mb-8 bg-white p-6 rounded-lg shadow">
        <h1 class="text-3xl font-bold text-[#0073b1] mb-2">About SkillLink</h1>
        <p class="text-gray-600 max-w-xl mx-auto text-sm">
          SkillLink empowers skilled service professionals to grow their customer base and take control of their careers.
        </p>
      </div>

      <!-- Highlights -->
      <div class="grid md:grid-cols-3 gap-6 mb-8 text-center">
        <div class="bg-white p-4 rounded-lg shadow">
          <div class="text-3xl text-[#0073b1] mb-2">💼</div>
          <h3 class="font-semibold text-lg mb-1">Earn Opportunities</h3>
          <p class="text-sm text-gray-600">Expand your reach by connecting with local customers looking for your skills.</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <div class="text-3xl text-[#0073b1] mb-2">📍</div>
          <h3 class="font-semibold text-lg mb-1">Work Locally</h3>
          <p class="text-sm text-gray-600">Get jobs based on your location and availability, no more travel hassles.</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <div class="text-3xl text-[#0073b1] mb-2">📱</div>
          <h3 class="font-semibold text-lg mb-1">Simple Booking</h3>
          <p class="text-sm text-gray-600">Get notified, accept or reject jobs, and chat with customers all in one place.</p>
        </div>
      </div>

      <!-- Why Join Section -->
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
          At <span class="text-[#0073b1] font-semibold">SkillLink</span>, you’re more than a service provider — you’re a valued partner. Let's build success together. 💙
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
import axios from 'axios';

export default {
  data() {
    return {
      user: null,
      reasons: [
        {
          title: 'Verified & Trusted',
          description: 'Every provider is verified to ensure trust and professionalism.'
        },
        {
          title: 'Flexible Scheduling',
          description: 'You control when you work. Accept or decline jobs based on your time.'
        },
        {
          title: 'Fair Payments',
          description: 'Transparent pricing and timely payments help you focus on what matters.'
        },
        {
          title: 'Dedicated Support',
          description: 'Our support team is ready to assist you when you need help.'
        }
      ]
    };
  },
  methods: {
    async fetchUserProfile() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.user = response.data;
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    }
  },
  mounted() {
    this.fetchUserProfile();
  }
};
</script>
