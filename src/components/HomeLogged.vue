<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Navbar -->
    <header class="w-full bg-white shadow-md">
      <div class="max-w-[1300px] mx-auto flex flex-wrap justify-between items-center px-4 sm:px-6 py-4 gap-y-2">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-10 h-10 sm:w-12 sm:h-12 rounded-full" loading="lazy" />
          <h1 class="text-xl sm:text-2xl font-bold text-[#0073b1]">SkillLink</h1>
        </div>

        <!-- Links and Buttons -->
        <div class="flex items-center gap-4 sm:gap-6 flex-wrap">
          <nav class="hidden sm:flex gap-4 sm:gap-6 text-gray-700 font-medium items-center text-sm">
            <router-link to="/about" class="text-[#0073b1] hover:text-[#005f91] no-underline">About Us</router-link>
            <router-link to="/contact" class="text-[#0073b1] hover:text-[#005f91] no-underline">Contact</router-link>
            <router-link :to="{ path: '/help', query: { from: 'homelogged' } }"
              class="text-[#0073b1] hover:text-[#005f91] no-underline">Help</router-link>
          </nav>

          <!-- Book Service Button -->
          <router-link to="/home">
            <button
              class="px-4 py-2 border border-[#0073b1] text-[#0073b1] font-semibold rounded-lg hover:bg-[#0073b1]/10 transition duration-200">
              Book Service
            </button>
          </router-link>

          <!-- User Profile DP -->
          <router-link to="/profile">
            <img v-if="user && user.profilePic" :src="`http://localhost:5000/uploads/${user.profilePic}`" alt="User DP"
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-[#0073b1] cursor-pointer" loading="lazy" />
            <img v-else src="@/assets/user.png" alt="Default User DP"
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-[#0073b1] cursor-pointer" loading="lazy" />
          </router-link>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="text-center py-10 px-4 bg-gradient-to-br from-blue-100 to-white">
      <div class="max-w-[1300px] mx-auto">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Connecting You to Trusted Local Experts</h2>
        <p class="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
          Book skilled professionals like plumbers, electricians, makeup artists, and more — all in one platform.
        </p>
      </div>
    </section>

    <!-- Services Section -->
    <section class="bg-white py-12 px-4">
      <div class="max-w-[1300px] mx-auto">
        <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center">Services We Provide</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          <router-link v-for="service in services" :key="service"
            :to="`/booking?service=${encodeURIComponent(service)}`"
            class="bg-[#0073b1] text-white p-4 rounded-lg shadow text-center font-semibold transform hover:scale-105 hover:shadow-lg transition duration-300">
            {{ service }}
          </router-link>
        </div>
      </div>
    </section>

    <!-- Solved Cases Section -->
    <section class="bg-blue-50 py-12 px-4">
      <div class="max-w-[1300px] mx-auto">
        <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center">Some Cases We've Solved</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div v-for="caseItem in solvedCases" :key="caseItem.title"
            class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <div class="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
              <img :src="caseItem.image" :alt="caseItem.title" class="w-full h-full object-cover" loading="lazy" />
            </div>
            <div class="p-4 flex-1">
              <h4 class="text-lg font-bold text-[#0073b1] mb-2">{{ caseItem.title }}</h4>
              <p class="text-gray-700 text-sm">{{ caseItem.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-12 bg-white px-4">
      <div class="max-w-screen-xl mx-auto text-center">
        <h3 class="text-2xl font-bold text-gray-800 mb-4">About SkillLink</h3>
        <p class="max-w-3xl mx-auto text-gray-600 leading-relaxed text-base sm:text-lg">
          SkillLink is a one-stop platform built to connect people with skilled professionals across various domains.
          Whether it's an urgent home repair, beauty service, or electrical setup — we bring the experts directly to
          your doorstep.
          <br /><br />
          Here's a complete list of services you can access through SkillLink:
        </p>

        <!-- Grid List -->
        <div class="flex justify-center mt-6 mb-8">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-3 text-left text-gray-700 text-base">
            <ul class="list-disc list-inside space-y-2">
              <li>Plumber</li>
              <li>Electrician</li>
              <li>Mechanic</li>
              <li>Carpenter</li>
              <li>AC Repair</li>
              <li>Painter</li>
              <li>Welder</li>
              <li>Makeup Artist</li>
              <li>Cleaner</li>
              <li>Gardener</li>
            </ul>
            <ul class="list-disc list-inside space-y-2">
              <li>Home Appliance Repair</li>
              <li>Pest Control</li>
              <li>Mobile Technician</li>
              <li>Computer Technician</li>
              <li>Laundry Services</li>
              <li>Water Purifier Technician</li>
              <li>Interior Designer</li>
              <li>Packers & Movers</li>
              <li>Event Decorators</li>
            </ul>
          </div>
        </div>

        <p class="max-w-3xl mx-auto text-gray-600 leading-relaxed text-base sm:text-lg">
          We verify every provider and ensure quality. With SkillLink, expert help is just a few taps away — fast, safe,
          and reliable.
        </p>
      </div>
    </section>

    <!-- Service Area Map Section -->
    <section class="py-12 bg-blue-50 px-4">
      <div class="max-w-screen-xl mx-auto text-center">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Service Coverage Area</h2>
        <ServiceMap />
      </div>
    </section>

    <!-- Contact Section -->
    <section class="bg-blue-50 py-12 px-4 text-center">
      <div class="max-w-[1300px] mx-auto">
        <h3 class="text-2xl font-bold text-gray-800 mb-4">Contact Us</h3>
        <p class="text-gray-700 text-base sm:text-lg mb-2">📧 Email: <a href="mailto:support@skilllink.in"
            class="text-[#0073b1] underline">support@skilllink.in</a></p>
        <p class="text-gray-700 text-base sm:text-lg mb-2">📞 Phone: +91-9876543210</p>
        <p class="text-gray-700 text-base sm:text-lg mb-4">⏰ Support Hours: 9 AM – 7 PM (Mon to Sat)</p>
        <button class="bg-[#0073b1] text-white px-6 py-2 rounded-lg hover:bg-[#005f91] transition">
          Send Us a Message
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-[#0073b1] text-white py-4 text-center text-sm sm:text-base">
      © 2025 SkillLink. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import ServiceMap from '@/components/ServiceMap.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const user = ref(null);

const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    user.value = res.data;
  } catch (err) {
    console.error('Failed to fetch user profile:', err);
  }
};

onMounted(fetchUserProfile);

const services = [
  'Plumber', 'Electrician', 'Mechanic', 'Carpenter',
  'AC Repair', 'Painter', 'Welder', 'Makeup Artist'
];

const solvedCases = [
  {
    title: 'Leaking Pipe Fixed',
    image: require('@/assets/plumber.jpeg'),
    description: '"Emergency plumbing at night! SkillLink saved the day." – Rajesh, Delhi'
  },
  {
    title: 'Wiring Issue Resolved',
    image: require('@/assets/electician.jpg'),
    description: '"The electrician came on time and solved everything!" – Priya, Mumbai'
  },
  {
    title: 'Wedding Makeup Expert',
    image: require('@/assets/makeup.webp'),
    description: '"Booked for a wedding. Amazing experience!" – Sneha, Jaipur'
  }
];
</script>

