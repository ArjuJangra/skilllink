<template>
  <div class="min-h-screen bg-[#F0F9FF] text-gray-800">
    <!-- Navbar -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div class="max-w-screen-lg mx-auto px-4 py-6 flex justify-between items-center">
        <!-- Logo + Name -->
        <div class="flex items-center space-x-2">
          <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="h-10 w-10 object-contain" />
          <h1 class="text-2xl font-bold text-[#0073b1]">SkillLink</h1>
        </div>

        <!-- Nav Links + Profile -->
        <nav class="flex items-center space-x-6 text-base">
          <router-link to="/serviceprovider" class="text-[#0073b1] font-bold hover:underline">Home</router-link>
          <router-link to="/provider/orders" class="text-[#0073b1] font-bold hover:underline"> Orders </router-link>
          <router-link to="/provider/policies" class="text-[#0073b1] font-bold hover:underline">Policies</router-link>
          <router-link to="/provider/about" class="text-[#0073b1] font-bold hover:underline">About</router-link>
          <router-link to="/provider/contact" class="text-[#0073b1] font-bold hover:underline">Contact</router-link>

          <!-- Profile Picture Dropdown -->
          <!-- <div class="relative group">
            <img src="@/assets/user.png" alt="Profile" class="h-10 w-10 rounded-full cursor-pointer border border-[#0073b1]" />
            <div class="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-200 z-50">
              <a href="/provider/profile" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</a>
              <a href="/logout" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</a>
            </div>
          </div> -->

          <!-- Profile Picture Dropdown -->
<div class="relative group">
 <router-link :to="user?.role === 'provider' ? '/provider/profile' : '/profile'">
  <img v-if="user && user.profilePic" :src="`http://localhost:5000/uploads/${user.profilePic}`" alt="User DP"
    class="w-10 h-10 rounded-full object-cover border-2 border-[#0073b1] cursor-pointer" />
  <img v-else src="@/assets/user.png" alt="Default User DP"
    class="w-10 h-10 rounded-full object-cover border-2 border-[#0073b1] cursor-pointer" />
</router-link>


</div>

        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-screen-lg mx-auto px-4 pt-32">
      <!-- Hero / Welcome Section -->
      <section id="home" class="py-10 text-center bg-white shadow-md mt-4 rounded-xl">
        <h2 class="text-3xl font-bold text-[#0073b1] mb-4">Welcome to SkillLink, Provider!</h2>
        <div class="max-w-2xl mx-auto">
          <p class="text-gray-600">
            Thank you for joining us! Here you can accept service requests, manage orders, and grow your reach with SkillLink.
          </p>
        </div>
      </section>

      <!-- Orders Info Section -->
      <section id="orders" class="py-10 mt-10 text-center">
        <h3 class="text-2xl font-semibold text-[#0073b1] mb-4">How Orders Work</h3>
        <div class="max-w-2xl mx-auto text-left">
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li>You will receive order notifications based on your listed services.</li>
            <li>You can Accept or Reject incoming requests in your dashboard.</li>
            <li>After accepting, update the status to "Completed" once the service is delivered.</li>
            <li>Timely service and good ratings will increase your visibility on the platform.</li>
          </ul>
        </div>
      </section>

      <!-- Policies Section -->
      <section id="policies" class="py-10 bg-white mt-6 shadow-sm rounded-lg text-center">
        <h3 class="text-2xl font-semibold text-[#0073b1] mb-4">Our Policies</h3>
        <div class="max-w-2xl mx-auto text-left">
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li>Respect customer privacy and property.</li>
            <li>No advance payments should be demanded from customers.</li>
            <li>Misuse of platform leads to account suspension.</li>
            <li>All disputes must be reported to SkillLink Support.</li>
          </ul>
        </div>
      </section>

      <!-- About Section -->
      <section id="about" class="py-10 mt-10 text-center">
        <h3 class="text-2xl font-semibold text-[#0073b1] mb-4">About SkillLink</h3>
        <div class="max-w-2xl mx-auto">
          <p class="text-gray-700">
            SkillLink is a platform that connects verified service providers like you to customers in need of trustworthy repair, maintenance, and support services.
            We aim to empower local professionals and streamline home and field service delivery.
          </p>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="py-10 mt-10 bg-[#e6f4fa] rounded-lg text-center">
        <h3 class="text-2xl font-semibold text-[#0073b1] mb-4">Contact Us</h3>
        <div class="max-w-2xl mx-auto">
          <p class="text-gray-700">
            Have any questions or need help? Reach out to our support team at <strong>support@skilllink.com</strong> or call us at <strong>+91 98765 43210</strong>.
          </p>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="text-center py-6 text-sm text-gray-500 mt-10">
      © 2025 SkillLink Provider Portal. All rights reserved.
    </footer>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: "ProviderWelcome",
  data() {
    return {
      showProfile: false,
      user: null
    };
  },
  methods: {
    toggleProfileDropdown() {
      this.showProfile = !this.showProfile;
    },
    async fetchUserProfile() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.user = res.data;
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
      }
    }
  },
  mounted() {
    this.fetchUserProfile();
  }
};
</script>


<style scoped>
/* Optional: Close dropdown when clicked outside */
body {
  position: relative;
}
</style>

