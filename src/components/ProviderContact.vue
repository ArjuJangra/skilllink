<template>
  <div class="min-h-screen bg-[#F0F9FF] text-gray-800 pt-20">
    <!-- Navbar (same as About page) -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div class="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <!-- Logo + Title -->
        <div class="flex items-center space-x-2">
          <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-10 h-10" />
          <span class="text-xl font-bold text-[#0073b1]">SkillLink</span>
        </div>

        <!-- Navigation + Profile -->
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

    <!-- Contact Page Content -->
    <div class="max-w-3xl mx-auto px-4 py-10">
      <div class="bg-white p-6 rounded shadow-md mb-8 text-center">
        <h1 class="text-3xl font-bold text-[#0073b1] mb-2">Contact Support</h1>
        <p class="text-gray-600 text-sm">Need help or have a question? We’re here to support our providers anytime.</p>
      </div>

      <form class="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input type="text" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-[#0073b1]" placeholder="Your name" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input type="email" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-[#0073b1]" placeholder="you@example.com" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea rows="4" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-[#0073b1]" placeholder="Describe your issue or question..."></textarea>
        </div>
        <div class="text-center">
          <button type="submit" class="bg-[#0073b1] text-white px-6 py-2 rounded hover:bg-[#005f91] transition">
            Send Message
          </button>
        </div>
      </form>
       <div class="text-center mt-6 pt-4 border-t text-sm text-gray-700 bg-white rounded-b-xl">
  <p class="px-4 pb-4">
    Have any questions or need help? Reach out to our support team at
    <a href="mailto:support@skilllink.com" class="text-[#0074B7] underline">support@skilllink.com</a>
    or call us at
    <a href="tel:+919876543210" class="text-[#0074B7] underline">+91 98765 43210</a>.
  </p>
</div>

    </div>

    <!-- Footer -->
    <footer class="text-center py-6 text-sm text-gray-500 mt-10">
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
    },
  },
  mounted() {
    this.fetchUserProfile();
  },
};
</script>
