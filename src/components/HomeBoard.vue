<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <header class="flex justify-between items-center px-6 py-4 bg-white max-w-7xl mx-auto">
      <div class="flex items-center gap-2">
        <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-12 h-12 rounded-full" />
        <h1 class="text-2xl font-bold text-[#0073b1]">SkillLink</h1>
      </div>

      <div class="flex items-center gap-6">
        <!-- Direct Links to Pages -->
        <router-link
            to="/about"
            class="px-2 py-2 text-sm sm:text-lg font-semibold text-[#0073b1] hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105"
          >
            About Us
          </router-link>
         <router-link
            to="/contact"
            class="px-2 py-2 text-sm sm:text-lg font-semibold text-[#0073b1] hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105"
          >
            Contact
          </router-link>

     <router-link
            :to="{ path: '/help', query: { from: 'homelogged' } }"
            class="px-3 py-2 text-sm sm:text-lg font-semibold text-[#0073b1] hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105"
          >
            Help
          </router-link>


        <!-- Book Service -->
        <router-link :to="{ path: '/home', query: { disableBooking: true } }">
          <button class="px-4 py-2  text-[rgb(0,115,177)] font-bold rounded-lg hover:ring-1 hover:ring-[#0073b1]  transition duration-200">
            Book Service
          </button>
        </router-link>

        <!-- Login/Signup -->
        <router-link to="/login">
          <button class="px-4 py-2 bg-[#0073b1] text-white font-semibold rounded-lg hover:bg-[#005f91] transition duration-200">
            Login/Sign Up
          </button>
        </router-link>
      </div>
    </header>

    
    <!-- Hero Section -->
    <section class="py-10 bg-gradient-to-br from-blue-100 to-white">
      <div class="max-w-screen-xl mx-auto px-4 md:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Connecting You to Trusted Local Experts
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Book skilled professionals like plumbers, electricians, makeup artists, and more — all in one platform.
        </p>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-12 bg-white">
      <div class="max-w-screen-xl mx-auto px-4 md:px-8">
        <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center">Services We Provide</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          <div
            v-for="service in services"
            :key="service"
            class="bg-[#0073b1] text-white p-4 rounded-lg shadow text-center font-semibold transform hover:scale-105 hover:shadow-lg transition duration-300 cursor-pointer"
          >
            {{ service }}
          </div>
        </div>
      </div>
    </section>

    <!-- Solved Cases Section -->
    <section class="py-12 bg-blue-50">
      <div class="max-w-screen-xl mx-auto px-4 md:px-8">
        <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center">Some Cases We've Solved</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Case 1 -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <div class="w-full h-[240px] flex items-center justify-center bg-gray-100">
              <img src="@/assets/plumber.jpeg" alt="Plumber" class="w-full h-full object-fit-top" />
            </div>
            <div class="p-4">
              <h4 class="text-lg font-bold text-[#0073b1] mb-2">Leaking Pipe Fixed</h4>
              <p class="text-gray-700 text-sm">
                "I had a plumbing emergency at night and SkillLink helped me find a local plumber instantly. Life-saver!" – Rajesh, Delhi
              </p>
            </div>
          </div>

          <!-- Case 2 -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <div class="w-full h-[240px] flex items-center justify-center bg-gray-100">
              <img src="@/assets/electician.jpg" alt="Electrician" class="w-full h-full object-fit-top" />
            </div>
            <div class="p-4">
              <h4 class="text-lg font-bold text-[#0073b1] mb-2">Home Wiring Issue Resolved</h4>
              <p class="text-gray-700 text-sm">
                "Great service. The electrician arrived on time and fixed everything quickly. Highly recommend!" – Priya, Mumbai
              </p>
            </div>
          </div>

          <!-- Case 3 -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <div class="w-full h-[240px] flex items-center justify-center bg-gray-100">
              <img src="@/assets/makeup.webp" alt="Makeup Artist" class="w-full h-full object-fit-top" />
            </div>
            <div class="p-4">
              <h4 class="text-lg font-bold text-[#0073b1] mb-2">Wedding Makeup by Expert</h4>
              <p class="text-gray-700 text-sm">
                "Booked a makeup artist for my cousin's wedding. She was skilled, professional and friendly!" – Sneha, Jaipur
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Us -->
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

    <!-- Contact Us -->
    <section class="py-12 bg-blue-50">
      <div class="max-w-screen-xl mx-auto px-4 md:px-8 text-center">
        <h3 class="text-2xl font-bold text-gray-800 mb-4">Contact Us</h3>
        <p class="text-gray-700 text-lg mb-2">
          📧 Email: <a href="mailto:support@skilllink.in" class="text-[#0073b1] underline">support@skilllink.in</a>
        </p>
        <p class="text-gray-700 text-lg mb-2">📞 Phone: +91-9876543210</p>
        <p class="text-gray-700 text-lg mb-4">⏰ Support Hours: 9 AM – 7 PM (Mon to Sat)</p>
        <button class="bg-[#0073b1] text-white px-6 py-2 rounded-lg hover:bg-[#005f91] transition cursor-pointer">
          Send Us a Message
        </button>
      </div>
    </section>




    <!-- Footer -->
    <footer class="bg-[#0073b1] text-white py-4 text-center mt-10">
      © 2025 SkillLink. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'


const services = ref([
  "Plumber",
  "Electrician",
  "Mechanic",
  "Carpenter",
  "AC Repair",
  "Painter",
  "Welder",
  "Makeup Artist",
]);

</script>
