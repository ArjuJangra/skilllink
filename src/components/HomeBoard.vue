<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <header class="flex  sticky top-0 z-50 flex-wrap justify-between items-center px-4 sm:px-6 py-4 bg-white max-w-7xl mx-auto gap-4">
      <div class="flex items-center gap-2">
        <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-10 h-10 sm:w-12 sm:h-12 " />
        <h1 class="text-xl sm:text-2xl font-bold text-[#0073b1]">SkillLink</h1>
      </div>

      <div class="flex flex-wrap justify-center sm:justify-end items-center gap-3 sm:gap-6 w-full sm:w-auto">
        <router-link to="/about"
          class="text-sm sm:text-lg font-semibold text-gray-600 hover:text-[#0073b1] hover:bg-gray-100  px-3 py-2 rounded-lg transition hover:scale-105">
          About Us
        </router-link>
        <router-link to="/contact"
          class="text-sm sm:text-lg font-semibold text-gray-600 hover:text-[#0073b1] hover:bg-gray-100 px-3 py-2 rounded-lg transition hover:scale-105">
          Contact
        </router-link>
        <router-link :to="{ path: '/help', query: { from: 'homelogged' } }"
          class="text-sm sm:text-lg font-semibold text-gray-600 hover:text-[#0073b1] hover:bg-gray-100  px-3 py-2 rounded-lg transition hover:scale-105">
          Help
        </router-link>
        <router-link :to="{ path: '/home', query: { disableBooking: true } }">
          <button class="flex items-center gap-2 px-4 py-2 text-gray-600 font-bold rounded-lg hover:ring-1 hover:text-[#0073b1] hover:ring-[#0073b1] transition">
             <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 1024 1024" fill="#000000"
              class="w-6 h-6 fill-current">
              <path
                d="M959.018 208.158c0.23-2.721 0.34-5.45 0.34-8.172 0-74.93-60.96-135.89-135.89-135.89-1.54 0-3.036 0.06-6.522 0.213l-611.757-0.043c-1.768-0.085-3.563-0.17-5.424-0.17-74.812 0-135.67 60.84-135.67 135.712l0.188 10.952h-0.306l0.391 594.972-0.162 20.382c0 74.03 60.22 134.25 134.24 134.25 1.668 0 7.007-0.239 7.1-0.239l608.934 0.085c2.985 0.357 6.216 0.468 9.55 0.468 35.815 0 69.514-13.954 94.879-39.302 25.373-25.34 39.344-58.987 39.344-94.794l-0.145-12.015h0.918l-0.008-606.41z m-757.655 693.82l-2.585-0.203c-42.524 0-76.146-34.863-76.537-79.309V332.671H900.79l0.46 485.186-0.885 2.865c-0.535 1.837-0.8 3.58-0.8 5.17 0 40.382-31.555 73.766-71.852 76.002l-10.816 0.621v-0.527l-615.533-0.01zM900.78 274.424H122.3l-0.375-65.934 0.85-2.924c0.52-1.82 0.782-3.63 0.782-5.247 0-42.236 34.727-76.665 78.179-76.809l0.45-0.068 618.177 0.018 2.662 0.203c42.329 0 76.767 34.439 76.767 76.768 0 1.326 0.196 2.687 0.655 4.532l0.332 0.884v68.577z" />
              <path
                d="M697.67 471.435c-7.882 0-15.314 3.078-20.918 8.682l-223.43 223.439L346.599 596.84c-5.544-5.603-12.95-8.69-20.842-8.69s-15.323 3.078-20.918 8.665c-5.578 5.518-8.674 12.9-8.7 20.79-0.017 7.908 3.07 15.357 8.69 20.994l127.55 127.558c5.57 5.56 13.01 8.622 20.943 8.622 7.925 0 15.364-3.06 20.934-8.63l244.247-244.247c5.578-5.511 8.674-12.883 8.7-20.783 0.017-7.942-3.079-15.408-8.682-20.986-5.552-5.612-12.958-8.698-20.85-8.698z" />
            </svg>
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
          <div v-for="service in services" :key="service"
            class="bg-[#0073b1] text-white p-4 rounded-lg shadow text-center font-semibold transform hover:scale-105 hover:shadow-lg transition cursor-pointer text-sm sm:text-base">
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
              <p class="text-gray-700 text-sm">"Electrician arrived quickly and fixed it all. Great experience!" –
                Priya, Mumbai</p>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <img src="@/assets/makeup.webp" alt="Makeup Artist" class="w-full h-48 sm:h-60 object-cover" />
            <div class="p-4">
              <h4 class="text-lg font-bold text-[#0073b1] mb-2">Wedding Makeup</h4>
              <p class="text-gray-700 text-sm">"Booked a makeup artist for a wedding — skilled and professional!" –
                Sneha, Jaipur</p>
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
              <p class="text-gray-600 text-sm">All providers are background-checked and verified for your peace of mind.
              </p>
            </div>
            <div class="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition" data-aos="zoom-in"
              data-aos-delay="100">
              <h5 class="text-lg font-semibold text-gray-800 mb-2">
                <i class="fas fa-bolt text-[#0073b1] mr-2"></i>Fast & Reliable
              </h5>
              <p class="text-gray-600 text-sm">Get prompt responses and quality service on every request.</p>
            </div>
            <div class="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition" data-aos="zoom-in"
              data-aos-delay="200">
              <h5 class="text-lg font-semibold text-gray-800 mb-2">
                <i class="fas fa-wallet text-[#0073b1] mr-2"></i>Transparent Pricing
              </h5>
              <p class="text-gray-600 text-sm">No hidden costs — know what you pay for, always.</p>
            </div>
          </div>
        </div>

        <!-- Closing Note -->
        <p class="max-w-3xl mx-auto text-gray-700 leading-relaxed text-lg sm:text-xl mt-14" data-aos="fade-up"
          data-aos-delay="300">
          With SkillLink, expert help is just a few taps away — fast, safe, and reliable. Join thousands of happy users
          today.
        </p>
      </div>
    </section>

    <!-- Contact -->
    <section class="bg-blue-50 py-4 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Title -->
        <h3 class="text-2xl font-bold text-gray-800 mb-4">Contact Us</h3>
        <p class="text-gray-600 mb-8">
          Need help? Reach out to our team quickly and easily.
        </p>

        <!-- Contact Info Row -->
        <div class="flex flex-col sm:flex-row justify-center gap-6 mb-6">
          <!-- Email -->
          <div class="flex items-center gap-2 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#0073b1]" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 12H8m0 0l4-4m0 8l-4-4m12-4v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h12a2 2 0 012 2z" />
            </svg>
            <a href="mailto:connectteamskilllink@gmail.com" class="hover:underline">
              connectteamskilllink@gmail.com
            </a>
          </div>

          <!-- Phone -->
          <div class="flex items-center gap-2 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#0073b1]" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 5a2 2 0 012-2h2l1 5-1 1c.5.5 2.5 2.5 3 3l1-1 5 1v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
            </svg>
            <span>+91-9876543210</span>
          </div>

          <!-- Hours -->
          <div class="flex items-center gap-2 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#0073b1]" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Mon – Sat, 9 AM – 7 PM</span>
          </div>
        </div>

        <!-- Call to Action -->
        <router-link to="/contact"
          class="inline-block bg-[#0073b1] text-white font-semibold px-6 py-2 rounded hover:bg-[#005f91] transition">
          Send a Message
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-[#0073b1] text-white pt-8 pb-2">
      <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <!-- Brand -->
        <div class="flex flex-col gap-4">
          <h2 class="text-2xl font-bold">SkillLink</h2>
          <p class="text-sm leading-relaxed">
            Connecting skilled professionals with customers quickly, easily, and reliably.
          </p>
          <!-- Socials -->
          <div class="flex items-center gap-4">
            <a href="#" class="hover:text-[#00A8E8] transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M22.46 6c-.77.35-1.6.59-2.46.69a4.26 4.26 0 001.88-2.36 8.5 8.5 0 01-2.7 1.03 4.24 4.24 0 00-7.23 3.86 12.04 12.04 0 01-8.74-4.44 4.24 4.24 0 001.31 5.66 4.22 4.22 0 01-1.92-.53v.05a4.24 4.24 0 003.39 4.15 4.28 4.28 0 01-1.91.07 4.24 4.24 0 003.96 2.95A8.51 8.51 0 012 19.54a12 12 0 006.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.34 8.34 0 0024 4.56a8.19 8.19 0 01-2.36.65 4.18 4.18 0 001.84-2.3z" />
              </svg>
            </a>
            <a href="#" class="hover:text-[#00A8E8] transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h10.96v-9.33H9.69V11h2.99V8.41c0-2.96 1.8-4.57 4.44-4.57 1.26 0 2.34.09 2.66.13v3.08l-1.83.001c-1.44 0-1.72.68-1.72 1.68V11h3.44l-.45 3.67h-2.99V24h5.88c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
              </svg>
            </a>
            <a href="#" class="hover:text-[#00A8E8] transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2.04c-5.52 0-10 4.48-10 10 0 4.42 2.87 8.18 6.84 9.51.5.09.68-.22.68-.48v-1.69c-2.78.61-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.64-1.33-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.57 9.57 0 0112 6.8c.85.004 1.71.115 2.51.337 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.91.68 1.84v2.73c0 .26.18.57.69.48A10.003 10.003 0 0022 12.04c0-5.52-4.48-10-10-10z" />
              </svg>
            </a>
          </div>
        </div>
        <!-- Quick Links -->
        <div class="flex flex-col gap-3">
          <h3 class="text-lg font-semibold">Quick Links</h3>
          <router-link to="/about" class="hover:text-[#00A8E8] transition">About</router-link>
          <router-link to="/home" class="hover:text-[#00A8E8] transition">Services</router-link>
          <router-link to="/help" class="hover:text-[#00A8E8] transition">FAQ</router-link>
         
        </div>
        <!-- Support & Help -->
        <div class="flex flex-col gap-3">
          <h3 class="text-lg font-semibold">Support</h3>
          <router-link to="/contact" class="  hover:text-[#00A8E8] transition">
            Contact Us
          </router-link>
          <router-link to="/privacy" class="hover:text-[#00A8E8] transition">Privacy Policy</router-link>
          <router-link to="/terms" class="hover:text-[#00A8E8] transition">Terms & Conditions</router-link>
        </div>
        <!-- Contact -->
        <div class="flex flex-col gap-3">
          <h3 class="text-lg font-semibold">Reach Us</h3>

          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 11c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3 1.344 3 3 3zM12 2C8.686 2 6 5.686 6 11c0 5.313 6 11 6 11s6-5.687 6-11c0-5.314-2.686-9-6-9z" />
            </svg>
            <span>Sector 41, Gurugram</span>
          </div>
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12l-4-4-4 4m8 0l-4 4-4-4" />
            </svg>
            <a href="mailto:connectteamskilllink@gmail.com" class="hover:underline">connectteamskilllink@gmail.com</a>
          </div>
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 5a2 2 0 012-2h3l2 5-2.5 2.5a11.042 11.042 0 005 5L14 14l5 2v3a2 2 0 01-2 2h-1C7.163 21 3 16.837 3 11V5z" />
            </svg>
            <span>+91 98765 43210</span>
          </div>
        </div>
      </div>
      <!-- Bottom -->
      <div class="border-t border-white/20 mt-8 pt-4 text-center text-sm">
        © 2025 SkillLink. All rights reserved.
      </div>
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
