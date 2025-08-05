<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <header class="flex flex-wrap justify-between items-center px-4 sm:px-6 py-4 bg-white max-w-7xl mx-auto gap-4">
      <div class="flex items-center gap-2">
        <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
        <h1 class="text-xl sm:text-2xl font-bold text-[#0073b1]">SkillLink</h1>
      </div>

      <div class="flex flex-wrap justify-center sm:justify-end items-center gap-3 sm:gap-6 w-full sm:w-auto">
        <router-link to="/about" class="text-sm sm:text-lg font-semibold text-[#0073b1] hover:bg-gray-100 px-3 py-2 rounded-lg transition hover:scale-105">
          About Us
        </router-link>
        <router-link to="/contact" class="text-sm sm:text-lg font-semibold text-[#0073b1] hover:bg-gray-100 px-3 py-2 rounded-lg transition hover:scale-105">
          Contact
        </router-link>
        <router-link :to="{ path: '/help', query: { from: 'homelogged' } }" class="text-sm sm:text-lg font-semibold text-[#0073b1] hover:bg-gray-100 px-3 py-2 rounded-lg transition hover:scale-105">
          Help
        </router-link>
        <router-link :to="{ path: '/home', query: { disableBooking: true } }">
          <button class="px-4 py-2 text-[#0073b1] font-bold rounded-lg hover:ring-1 hover:ring-[#0073b1] transition">
            Book Service
          </button>
        </router-link>
        <router-link to="/login">
          <button class="px-4 py-2 bg-[#0073b1] text-white font-semibold rounded-lg hover:bg-[#005f91] transition">
            Login/Sign Up
          </button>
        </router-link>
      </div>
    </header>

    <!-- Hero -->
    <section class="py-10 bg-gradient-to-br from-blue-100 to-white text-center px-4">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Connecting You to Trusted Local Experts
      </h2>
      <p class="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
        Book skilled professionals like plumbers, electricians, makeup artists, and more — all in one platform.
      </p>
    </section>

    <!-- Services Section -->
    <section class="py-10 bg-white px-4">
      <div class="max-w-screen-xl mx-auto">
        <h3 class="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6">Services We Provide</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          <div v-for="service in services" :key="service" class="bg-[#0073b1] text-white p-4 rounded-lg shadow text-center font-semibold transform hover:scale-105 hover:shadow-lg transition cursor-pointer text-sm sm:text-base">
            {{ service }}
          </div>
        </div>
      </div>
    </section>

    <!-- Solved Cases Section -->
    <section class="py-12 bg-blue-50 px-4">
      <div class="max-w-screen-xl mx-auto">
        <h3 class="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6">Some Cases We've Solved</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <img src="@/assets/plumber.jpeg" alt="Plumber" class="w-full h-48 sm:h-60 object-cover" />
            <div class="p-4">
              <h4 class="text-lg font-bold text-[#0073b1] mb-2">Leaking Pipe Fixed</h4>
              <p class="text-gray-700 text-sm">"Plumbing emergency solved instantly. Life-saver!" – Rajesh, Delhi</p>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <img src="@/assets/electician.jpg" alt="Electrician" class="w-full h-48 sm:h-60 object-cover" />
            <div class="p-4">
              <h4 class="text-lg font-bold text-[#0073b1] mb-2">Home Wiring Resolved</h4>
              <p class="text-gray-700 text-sm">"Electrician arrived quickly and fixed it all. Great experience!" – Priya, Mumbai</p>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <img src="@/assets/makeup.webp" alt="Makeup Artist" class="w-full h-48 sm:h-60 object-cover" />
            <div class="p-4">
              <h4 class="text-lg font-bold text-[#0073b1] mb-2">Wedding Makeup</h4>
              <p class="text-gray-700 text-sm">"Booked a makeup artist for a wedding — skilled and professional!" – Sneha, Jaipur</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="relative py-16 px-4 bg-gradient-to-br from-[#F0F9FF] via-white to-[#E6F4F9]">
      <div class="absolute inset-0 pointer-events-none">
        <svg class="absolute top-0 left-0 opacity-20 w-[400px]" viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="300" fill="#0073b1" fill-opacity="0.05" />
        </svg>
        <svg class="absolute bottom-0 right-0 opacity-10 w-[300px]" viewBox="0 0 400 400" fill="none">
          <rect x="0" y="0" width="400" height="400" fill="#00BFFF" fill-opacity="0.04" rx="80" />
        </svg>
      </div>

      <div class="relative z-10 max-w-6xl mx-auto text-center">
        <h3 class="text-2xl sm:text-3xl font-extrabold text-[#0073b1] mb-6">About SkillLink</h3>
        <p class="max-w-3xl mx-auto text-gray-700 text-base sm:text-lg mb-10">
          SkillLink is your trusted platform to connect with skilled professionals across many services.
        </p>

        <!-- Services List -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left bg-white rounded-xl shadow-xl p-6">
          <ul class="space-y-2 text-sm text-gray-800">
            <li>🔧 Plumber</li>
            <li>⚡ Electrician</li>
            <li>🚗 Mechanic</li>
            <li>🪚 Carpenter</li>
            <li>❄️ AC Repair</li>
            <li>🎨 Painter</li>
          </ul>
          <ul class="space-y-2 text-sm text-gray-800">
            <li>🔩 Welder</li>
            <li>💄 Makeup Artist</li>
            <li>🧹 Cleaner</li>
            <li>🌱 Gardener</li>
            <li>📱 Mobile Technician</li>
            <li>💻 Computer Technician</li>
          </ul>
          <ul class="space-y-2 text-sm text-gray-800">
            <li>🔧 Appliance Repair</li>
            <li>🐛 Pest Control</li>
            <li>👕 Laundry Services</li>
            <li>💧 Water Purifier</li>
            <li>🖌️ Interior Designer</li>
            <li>🚚 Packers & Movers</li>
          </ul>
        </div>

        <!-- Why SkillLink -->
        <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
          <div class="bg-white rounded-lg shadow p-4">
            <h5 class="font-semibold text-gray-800 mb-2">✅ Verified Professionals</h5>
            <p class="text-sm text-gray-600">All service providers are vetted and background-checked.</p>
          </div>
          <div class="bg-white rounded-lg shadow p-4">
            <h5 class="font-semibold text-gray-800 mb-2">⚡ Fast & Reliable</h5>
            <p class="text-sm text-gray-600">Quick service matching and response every time.</p>
          </div>
          <div class="bg-white rounded-lg shadow p-4">
            <h5 class="font-semibold text-gray-800 mb-2">💰 Transparent Pricing</h5>
            <p class="text-sm text-gray-600">Upfront cost estimates — no surprises.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section class="py-10 bg-blue-50 px-4 text-center">
      <h3 class="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Contact Us</h3>
      <p class="text-gray-700 mb-2">📧 Email: <a href="mailto:support@skilllink.in" class="text-[#0073b1] underline">support@skilllink.in</a></p>
      <p class="text-gray-700 mb-2">📞 Phone: +91-9876543210</p>
      <p class="text-gray-700 mb-4">⏰ Support Hours: 9 AM – 7 PM (Mon to Sat)</p>
      <button class="bg-[#0073b1] text-white px-6 py-2 rounded-lg hover:bg-[#005f91] transition">
        Send Us a Message
      </button>
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
  "Plumber", "Electrician", "Mechanic", "Carpenter",
  "AC Repair", "Painter", "Welder", "Makeup Artist"
])
</script>
