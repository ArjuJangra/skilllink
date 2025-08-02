<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Navbar -->
   <header class="w-full sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-white via-[#f1faff] to-[#f5fafe] shadow-md">
    <div class="max-w-[1300px] mx-auto flex flex-wrap justify-between items-center px-4 sm:px-6 py-3 gap-y-2">
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <img
          src="@/assets/skilllogo.png"
          alt="SkillLink Logo"
          class="w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-transform hover:rotate-12"
          loading="lazy"
        />
        <h1 class="text-xl sm:text-2xl font-bold text-[#0073b1]">SkillLink</h1>
      </div>

      <!-- Navigation & Actions -->
      <div class="flex items-center gap-2 sm:gap-4 flex-wrap">
        <!-- Nav Links -->
        <nav class="hidden sm:flex gap-3 text-gray-700 font-medium text-sm items-center">
          <router-link
            to="/about"
            class="px-3 py-2 text-sm sm:text-lg font-semibold text-[#0073b1] hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105"
          >
            About Us
          </router-link>

          <router-link
            to="/contact"
            class="px-3 py-2 text-sm sm:text-lg font-semibold text-[#0073b1] hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105"
          >
            Contact
          </router-link>

          <router-link
            :to="{ path: '/help', query: { from: 'homelogged' } }"
            class="px-3 py-2 text-sm sm:text-lg font-semibold text-[#0073b1] hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105"
          >
            Help
          </router-link>
        </nav>

        <!-- Book Service Button -->
        <router-link to="/home">
          <button
            class="px-4 py-2 bg-[#0073b1] text-white text-sm sm:text-lg font-semibold rounded-full hover:bg-[#005e91] transition"
          >
            Book Service
          </button>
        </router-link>

        <!-- Notification Bell -->
        <router-link
          to="/notifications"
          class="w-10 h-10 flex items-center justify-center rounded-full hover:ring-2 hover:ring-[#0073b1] transition"
        >
          <svg
            class="w-7 h-7 text-gray-700 hover:text-[#0073b1]"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            ></path>
          </svg>
        </router-link>

        <!-- Profile Picture -->
        <router-link to="/profile">
          <img
            v-if="user && user.profilePic"
            :src="`http://localhost:5000/uploads/${user.profilePic}`"
            alt="User Profile"
            class="w-10 h-10 rounded-full object-cover border-2 border-[#0073b1] hover:ring-1 hover:ring-[#0073b1] transition"
            loading="lazy"
          />
          <img
            v-else
            src="@/assets/user.png"
            alt="Default Profile"
            class="w-10 h-10 rounded-full object-cover border-2 border-[#0073b1] hover:ring-2 hover:ring-[#0073b1] transition"
            loading="lazy"
          />
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
          <router-link
            v-for="service in services"
            :key="service"
            :to="`/booking?service=${encodeURIComponent(service)}`"
            class="bg-[#0073b1] text-white p-4 rounded-lg shadow text-center font-semibold transform hover:scale-105 hover:shadow-lg transition duration-300"
          >
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
          <div
            v-for="caseItem in solvedCases"
            :key="caseItem.title"
            class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
          >
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
 <section class="relative py-20 px-4 bg-gradient-to-br from-[#F0F9FF] via-white to-[#E6F4F9] overflow-hidden">
  <!-- SVG Illustration Background -->
  <div class="absolute inset-0 z-0 pointer-events-none">
    <svg class="absolute top-0 left-0 opacity-20 w-[600px]" viewBox="0 0 600 600" fill="none">
      <circle cx="300" cy="300" r="300" fill="#0073b1" fill-opacity="0.05" />
    </svg>
    <svg class="absolute bottom-0 right-0 opacity-10 w-[400px]" viewBox="0 0 400 400" fill="none">
      <rect x="0" y="0" width="400" height="400" fill="#00BFFF" fill-opacity="0.04" rx="80" />
    </svg>
  </div>

  <!-- Main Content -->
  <div class="relative z-10 max-w-screen-xl mx-auto text-center" data-aos="fade-up">
    <h3 class="text-4xl font-extrabold text-[#0073b1] mb-6">About SkillLink</h3>
    <p class="max-w-3xl mx-auto text-gray-700 leading-relaxed text-lg sm:text-xl mb-10">
      SkillLink is your trusted platform to connect with skilled professionals across a wide range of services.
      Whether it's urgent home repairs or lifestyle services — we bring verified experts right to your doorstep.
    </p>

    <!-- Services Grid -->
    <div class="bg-white shadow-xl rounded-xl p-8 mt-6" data-aos="fade-up" data-aos-delay="100">
      <h4 class="text-2xl font-semibold text-[#0073b1] mb-6">Our Available Services</h4>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left text-gray-800 text-base">
        <ul class="space-y-3">
          <li><i class="fas fa-tools text-[#0073b1] mr-2"></i>Plumber</li>
          <li><i class="fas fa-bolt text-[#0073b1] mr-2"></i>Electrician</li>
          <li><i class="fas fa-car text-[#0073b1] mr-2"></i>Mechanic</li>
          <li><i class="fas fa-hammer text-[#0073b1] mr-2"></i>Carpenter</li>
          <li><i class="fas fa-wind text-[#0073b1] mr-2"></i>AC Repair</li>
          <li><i class="fas fa-paint-roller text-[#0073b1] mr-2"></i>Painter</li>
        </ul>
        <ul class="space-y-3">
          <li><i class="fas fa-wrench text-[#0073b1] mr-2"></i>Welder</li>
          <li><i class="fas fa-magic text-[#0073b1] mr-2"></i>Makeup Artist</li>
          <li><i class="fas fa-broom text-[#0073b1] mr-2"></i>Cleaner</li>
          <li><i class="fas fa-seedling text-[#0073b1] mr-2"></i>Gardener</li>
          <li><i class="fas fa-mobile-alt text-[#0073b1] mr-2"></i>Mobile Technician</li>
          <li><i class="fas fa-desktop text-[#0073b1] mr-2"></i>Computer Technician</li>
        </ul>
        <ul class="space-y-3">
          <li><i class="fas fa-cogs text-[#0073b1] mr-2"></i>Home Appliance Repair</li>
          <li><i class="fas fa-bug text-[#0073b1] mr-2"></i>Pest Control</li>
          <li><i class="fas fa-tshirt text-[#0073b1] mr-2"></i>Laundry Services</li>
          <li><i class="fas fa-water text-[#0073b1] mr-2"></i>Water Purifier Technician</li>
          <li><i class="fas fa-pencil-ruler text-[#0073b1] mr-2"></i>Interior Designer</li>
          <li><i class="fas fa-truck-moving text-[#0073b1] mr-2"></i>Packers & Movers</li>
          <li><i class="fas fa-gem text-[#0073b1] mr-2"></i>Event Decorators</li>
        </ul>
      </div>
    </div>

    <!-- Why SkillLink -->
    <div class="mt-16" data-aos="fade-up" data-aos-delay="200">
      <h4 class="text-2xl font-semibold text-[#0073b1] mb-6">Why Choose SkillLink?</h4>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
        <div class="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition" data-aos="zoom-in">
          <h5 class="text-lg font-semibold text-gray-800 mb-2">
            <i class="fas fa-check-circle text-[#0073b1] mr-2"></i>Verified Professionals
          </h5>
          <p class="text-gray-600 text-sm">All providers are background-checked and verified for your peace of mind.</p>
        </div>
        <div class="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition" data-aos="zoom-in" data-aos-delay="100">
          <h5 class="text-lg font-semibold text-gray-800 mb-2">
            <i class="fas fa-bolt text-[#0073b1] mr-2"></i>Fast & Reliable
          </h5>
          <p class="text-gray-600 text-sm">Get prompt responses and quality service on every request.</p>
        </div>
        <div class="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition" data-aos="zoom-in" data-aos-delay="200">
          <h5 class="text-lg font-semibold text-gray-800 mb-2">
            <i class="fas fa-wallet text-[#0073b1] mr-2"></i>Transparent Pricing
          </h5>
          <p class="text-gray-600 text-sm">No hidden costs — know what you pay for, always.</p>
        </div>
      </div>
    </div>

    <!-- Closing Note -->
    <p class="max-w-3xl mx-auto text-gray-700 leading-relaxed text-lg sm:text-xl mt-14" data-aos="fade-up" data-aos-delay="300">
      With SkillLink, expert help is just a few taps away — fast, safe, and reliable. Join thousands of happy users today.
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
        <p class="text-gray-700 text-base sm:text-lg mb-2">📧 Email: <a href="mailto:support@skilllink.in" class="text-[#0073b1] underline">connectteamskilllink@gmail.com</a></p>
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
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ServiceMap from '@/components/ServiceMap.vue';

const user = ref(null);

const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return;
    const { data } = await axios.get('http://localhost:5000/api/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    user.value = data;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
  }
};

onMounted(() => {
  fetchUserProfile();
});

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
