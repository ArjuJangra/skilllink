<template>
  <div class="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <!-- Header -->
    <header class="bg-white shadow sticky top-0 z-50">
      <AppNavbar />
    </header>

    <section class="relative text-center overflow-hidden py-20 px-4">
      <!-- Hero Content -->
      <h1
        class="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#3B8D99] to-[#f46675] bg-clip-text text-transparent mb-6">
        Connecting You to Trusted Local Experts
      </h1>

      <p class="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg mb-8">
        Book skilled professionals like plumbers, electricians, makeup artists, and more — all in one platform.
      </p>

      <!-- Call to Action -->
      <div class="flex justify-center gap-4 flex-wrap">
        <router-link to="/signup"
          class="inline-block px-6 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-[#00A8E8] to-[#007EA7] shadow-lg hover:scale-105 transform transition">
          Get Started
        </router-link>
        <router-link to="/home"
          class="inline-block px-6 py-3 font-semibold text-[#0073b1] rounded-lg border-2 border-[#0073b1] hover:bg-[#0073b1] hover:text-white transition">
          Explore Services
        </router-link>
      </div>

    </section>

    <!-- Services Section -->
    <section class="py-12 px-6 ">
      <div class="max-w-screen-xl mx-auto text-center">
        <h3 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-12">
          Our Professional Services
        </h3>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          <router-link v-for="service in services" :key="service.name" to="/login" class="group bg-white border border-gray-200 rounded-2xl p-6 
               shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all 
               duration-300 flex flex-col items-center justify-center text-center">
            <!-- Icon -->
            <div class="bg-blue-100 p-3 rounded-full mb-3 group-hover:bg-blue-500 transition">
              <component :is="service.icon" class="w-7 h-7 text-blue-600 group-hover:text-white transition" />
            </div>

            <!-- Service Name -->
            <h4 class="font-semibold text-gray-800 group-hover:text-blue-600 transition text-sm sm:text-base">
              {{ service.name }}
            </h4>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Solved Cases Section -->
    <section class="py-12 px-4">
      <div class="max-w-screen-xl mx-auto">
        <h3 class="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">Real Stories, Real Impact</h3>
        <p class="text-gray-600 max-w-3xl mx-auto mb-12 text-base sm:text-lg">
          See how SkillLink helped users solve everyday challenges — fast, reliable, and stress-free.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer">
            <img src="@/assets/plumber2.jpg"
              alt="Plumber repairing a leaking pipe under a kitchen sink in a modern home setting, focused and determined expression, bright and clean environment"
              class="w-full h-auto max:h-60 object-cover" />
            <div class="p-4">
              <h4 class="text-lg font-bold text-[#0073b1] mb-2">Leaking Pipe Fixed</h4>
              <p class="text-gray-700 text-sm">"Plumbing emergency solved instantly. Life-saver!" – Rajesh, Delhi</p>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer">
            <img src="@/assets/electician.jpg" alt="Electrician" class="w-full h-auto max:h-60 object-cover" />
            <div class="p-4">
              <h4 class="text-lg font-bold text-[#0073b1] mb-2">Home Wiring Resolved</h4>
              <p class="text-gray-700 text-sm">"Electrician arrived quickly and fixed it all. Great experience!" –
                Priya, Mumbai</p>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer">
            <img src="@/assets/makeup2.jpg" alt="Makeup Artist" class="w-full h-auto max:h-60 object-cover" />
            <div class="p-4">
              <h4 class="text-lg font-bold text-[#0073b1] mb-2">Wedding Makeup</h4>
              <p class="text-gray-700 text-sm">"Booked a makeup artist for a wedding — skilled and professional!" –
                Sneha, Jaipur</p>
            </div>
          </div>

        </div>
        <!-- Counters Section (Add above Contact Section) -->
        <section class="py-12  text-center">
          <div class="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1">
              <h4 class="text-4xl font-bold text-[#0073b1] mb-2">50+</h4>
              <p class="text-gray-700 font-medium">Services</p>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1">
              <h4 class="text-4xl font-bold text-[#0073b1] mb-2">1k+</h4>
              <p class="text-gray-700 font-medium">Happy Users</p>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1">
              <h4 class="text-4xl font-bold text-[#0073b1] mb-2">100+</h4>
              <p class="text-gray-700 font-medium">Verified Providers</p>
            </div>
          </div>
        </section>
      </div>
    </section>

    <!-- About Section-->
    <section class="relative py-12 px-4  overflow-hidden">
      <div class="absolute inset-0 z-0 pointer-events-none">
        <svg class="absolute top-0 left-0 opacity-10 w-[600px]" viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="300" fill="#0073b1" />
        </svg>
        <svg class="absolute bottom-0 right-0 opacity-10 w-[400px]" viewBox="0 0 400 400" fill="none">
          <rect width="400" height="400" fill="#00BFFF" rx="80" />
        </svg>
      </div>

      <!-- Main Content -->
      <div class="relative z-10 max-w-screen-xl mx-auto text-center space-y-14" data-aos="fade-up">

        <!-- Heading -->
        <div>
          <h3 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">About SkillLink</h3>
          <p class="max-w-3xl mx-auto text-gray-600 leading-relaxed text-lg">
            SkillLink connects you with verified professionals for everything from home repairs to personal services —
            reliable, quick, and affordable.
          </p>
        </div>

        <!-- Services Grid -->
        <div class="bg-white shadow-xl rounded-2xl p-10" data-aos="fade-up">
          <h4 class="text-2xl font-semibold text-gray-800 mb-8">Our Available Services</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left text-gray-700 text-base">
            <ul class="space-y-3">
              <li><i class="fas fa-tools text-blue-600 mr-2"></i>Plumber</li>
              <li><i class="fas fa-bolt text-blue-600 mr-2"></i>Electrician</li>
              <li><i class="fas fa-car text-blue-600 mr-2"></i>Mechanic</li>
              <li><i class="fas fa-hammer text-blue-600 mr-2"></i>Carpenter</li>
              <li><i class="fas fa-wind text-blue-600 mr-2"></i>AC Repair</li>
              <li><i class="fas fa-paint-roller text-blue-600 mr-2"></i>Painter</li>
            </ul>
            <ul class="space-y-3">
              <li><i class="fas fa-wrench text-blue-600 mr-2"></i>Welder</li>
              <li><i class="fas fa-magic text-blue-600 mr-2"></i>Makeup Artist</li>
              <li><i class="fas fa-soap text-blue-600 mr-2"></i>Cleaner</li>
              <li><i class="fas fa-seedling text-blue-600 mr-2"></i>Gardener</li>
              <li><i class="fas fa-mobile-alt text-blue-600 mr-2"></i>Mobile Technician</li>
              <li><i class="fas fa-desktop text-blue-600 mr-2"></i>Computer Technician</li>
            </ul>
            <ul class="space-y-3">
              <li><i class="fas fa-cogs text-blue-600 mr-2"></i>Home Appliance Repair</li>
              <li><i class="fas fa-bug text-blue-600 mr-2"></i>Pest Control</li>
              <li><i class="fas fa-tshirt text-blue-600 mr-2"></i>Laundry Services</li>
              <li><i class="fas fa-water text-blue-600 mr-2"></i>Water Purifier Technician</li>
              <li><i class="fas fa-pencil-ruler text-blue-600 mr-2"></i>Interior Designer</li>
              <li><i class="fas fa-gem text-blue-600 mr-2"></i>Event Decorators</li>
            </ul>
          </div>
        </div>

        <!-- Why Choose -->
        <div class="mt-16" data-aos="fade-up">
          <h4 class="text-2xl font-semibold text-gray-800 mb-8">Why Choose SkillLink?</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div class="bg-white shadow-lg rounded-xl p-8 hover:shadow-2xl transition">
              <h5 class="text-lg font-semibold text-gray-800 mb-3">
                <i class="fas fa-check-circle text-blue-600 mr-2"></i>Verified Professionals
              </h5>
              <p class="text-gray-600 text-sm leading-relaxed">Background-checked experts you can trust for every
                service.</p>
            </div>
            <div class="bg-white shadow-lg rounded-xl p-8 hover:shadow-2xl transition">
              <h5 class="text-lg font-semibold text-gray-800 mb-3">
                <i class="fas fa-bolt text-blue-600 mr-2"></i>Fast & Reliable
              </h5>
              <p class="text-gray-600 text-sm leading-relaxed">Quick response, efficient service, and on-time
                completion.</p>
            </div>
            <div class="bg-white shadow-lg rounded-xl p-8 hover:shadow-2xl transition">
              <h5 class="text-lg font-semibold text-gray-800 mb-3">
                <i class="fas fa-wallet text-blue-600 mr-2"></i>Transparent Pricing
              </h5>
              <p class="text-gray-600 text-sm leading-relaxed">Upfront pricing with no hidden costs — ever.</p>
            </div>
          </div>
        </div>

        <!-- Closing Note -->
        <p class="max-w-3xl mx-auto text-gray-700 leading-relaxed text-lg mt-14 italic" data-aos="fade-up">
          “Expert help, a tap away — with SkillLink, convenience meets trust.”
        </p>
      </div>
    </section>

    <!--Contact-->
    <section class=" py-12 px-6">
      <div class="max-w-4xl mx-auto text-center" data-aos="fade-up">
        <!-- Title -->
        <h3 class="text-3xl font-bold text-gray-800 mb-4">Contact Us</h3>
        <p class="text-gray-600 mb-10 text-lg">
          Need help? Reach out to our support team — we’re here to assist you.
        </p>

        <!-- Contact Info Cards -->
        <div class="flex flex-col sm:flex-row justify-center items-stretch gap-6 mb-10">
          <!-- Email -->
          <div
            class="flex-1 bg-white shadow-md rounded-xl p-5 flex items-center gap-3 text-gray-700 hover:shadow-lg transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" viewBox="0 0 24 24"
              fill="currentColor">
              <path
                d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75zm2.334-.75L12 11.327 19.416 6h-14.832z" />
            </svg>
            <a href="mailto:connectteamskilllink@gmail.com" class="font-medium hover:text-blue-600 transition">
              connectteamskilllink@gmail.com
            </a>
          </div>

          <!-- Phone -->
          <div
            class="flex-1 bg-white shadow-md rounded-xl p-5 flex items-center gap-3 text-gray-700 hover:shadow-lg transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-600" viewBox="0 0 24 24"
              fill="currentColor">
              <path
                d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.05 11.05 0 003.47.55 1 1 0 011 1V20a1 1 0 01-1 1C10.42 21 3 13.58 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.2.19 2.38.55 3.47a1 1 0 01-.21 1.11l-2.22 2.21z" />
            </svg>
            <span class="font-medium">+7404227877</span>
          </div>

          <!-- Hours -->
          <div
            class="flex-1 bg-white shadow-md rounded-xl p-5 flex items-center gap-3 text-gray-700 hover:shadow-lg transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-700" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="font-medium">Mon – Sat, 9 AM – 7 PM</span>
          </div>
        </div>

        <!-- CTA -->
        <router-link to="/contact"
          class="inline-block bg-gradient-to-r from-[#00A8E8] to-[#007EA7] text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transform transition">
          Send a Message
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gradient-to-r from-[#007EA7] to-[#00A8E8] text-white shadow-inner shadow-black/10">
      <div class="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        <!-- Logo & Tagline -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-11 h-11 rounded-lg" />
            <span class="text-2xl font-extrabold bg-gradient-to-r from-white to-[#b7ced7] 
bg-clip-text text-transparent">
              SkillLink
            </span>

          </div>
          <p class="text-sm leading-relaxed text-white/80">
            Connecting skilled professionals with customers quickly, easily, and reliably.
          </p>
          <!-- Call-to-Action Button -->
          <router-link to="/signup"
            class="inline-block mt-2 px-4 py-2 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition">
            Join Now
          </router-link>
        </div>

        <!-- Quick Links -->
        <div class="space-y-3">
          <h3 class="text-base font-bold text-white">Company</h3>
          <router-link to="/about" class="flex items-center gap-2 hover:text-white/90 transition">
            About Us
          </router-link>
          <router-link to="/blog" class="flex items-center gap-2 hover:text-white/90 transition">
            Blog
          </router-link>
          <router-link to="/careers" class="flex items-center gap-2 hover:text-white/90 transition">
            Careers
          </router-link>
          <router-link to="/contact" class="flex items-center gap-2 hover:text-white/90 transition">
            Contact
          </router-link>
        </div>

        <!-- Services -->
        <div class="space-y-3">
          <h3 class="text-base font-bold text-white">Services</h3>
          <router-link to="/home" class="flex hover:text-white/90 transition">All Services</router-link>
          <router-link to="/help" class="flex hover:text-white/90 transition">Help / FAQ</router-link>
          <router-link to="/privacy" class="flex hover:text-white/90 transition">Privacy Policy</router-link>
          <router-link to="/terms" class="flex hover:text-white/90 transition">Terms & Conditions</router-link>
        </div>

        <!-- Reach Us / Socials -->
        <div class="space-y-3">
          <h3 class="text-base font-bold text-white">Reach Us</h3>
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 11c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3 1.344 3 3 3zM12 2C8.686 2 6 5.686 6 11c0 5.313 6 11 6 11s6-5.687 6-11c0-5.314-2.686-9-6-9z" />
            </svg>
            <span>Sector 14, Hisar</span>
          </div>
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.05 11.05 0 003.47.55 1 1 0 011 1V20a1 1 0 01-1 1C10.42 21 3 13.58 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.2.19 2.38.55 3.47a1 1 0 01-.21 1.11l-2.22 2.21z" />
            </svg>
            <a href="tel:+919876543210" class="hover:underline hover:text-white/90">+91 7404227877</a>
          </div>

          <!-- Social Icons -->
          <div class="flex items-center gap-4 pt-2">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
              class="hover:text-white/90 transition transform hover:scale-110">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M22.46 6c-.77.35-1.6.59-2.46.69a4.26 4.26 0 001.88-2.36 8.5 8.5 0 01-2.7 1.03 4.24 4.24 0 00-7.23 3.86A12.04 12.04 0 013.9 4.78a4.24 4.24 0 001.31 5.66A4.2 4.2 0 014 10.9v.05a4.24 4.24 0 003.39 4.15c-.8.21-1.61.25-2.39.1a4.24 4.24 0 003.96 2.95A8.5 8.5 0 012 19.54 12 12 0 008.29 21.4c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.34 8.34 0 0024 4.56a8.19 8.19 0 01-2.36.65A4.18 4.18 0 0022.46 6z" />
              </svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              class="hover:text-white/90 transition transform hover:scale-110">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h10.96v-9.33H9.69V11h2.99V8.41c0-2.96 1.8-4.57 4.44-4.57 1.26 0 2.34.09 2.66.13v3.08h-1.83c-1.44 0-1.72.68-1.72 1.68V11h3.44l-.45 3.67h-2.99V24h5.88c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
              </svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              class="hover:text-white/90 transition transform hover:scale-110">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2.04c-5.52 0-10 4.48-10 10 0 4.42 2.87 8.18 6.84 9.51.5.09.68-.22.68-.48v-1.69c-2.78.61-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.64-1.33-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.57 9.57 0 0112 6.8c.85 0 1.71.11 2.51.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.91.68 1.84v2.73c0 .26.18.57.69.48A10 10 0 0022 12.04c0-5.52-4.48-10-10-10z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-white/30 mt-8 py-4 text-center text-sm text-white drop-shadow-sm">
        © 2025 <span class="font-semibold">SkillLink</span>. All rights reserved.
      </div>

    </footer>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppNavbar from "@/components/AppNavbar.vue"
import { Briefcase, Wrench, Home, Zap, Hammer, Wind, Paintbrush, Sparkles } from 'lucide-vue-next'

const services = ref([
  { name: 'Plumber', icon: Briefcase },
  { name: 'Mechanic', icon: Wrench },
  { name: 'Painter', icon: Home },
  { name: 'Electrician', icon: Zap },
  { name: 'Carpenter', icon: Hammer },
  { name: 'AC Repair', icon: Wind },
  { name: 'Painter', icon: Paintbrush },
  { name: 'Makeup Artist', icon: Sparkles },
])
</script>

