<template>
  <div class="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <!-- Header -->
    <header class="bg-white shadow sticky top-0 z-50">
      <AppNavbar />
    </header>

    <section class="relative min-h-[85vh] flex items-center bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-0 items-center relative z-10">

        <div class="lg:col-span-6 relative h-[500px] lg:h-[700px] flex items-center justify-center"
          data-aos="fade-right">
          <img src="@/assets/hero-girl.png" alt="SkillLink Professional"
            class="z-10 w-full h-full object-contain object-left-bottom lg:object-center transition-transform duration-[2s] hover:scale-105" />

          <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#00A8E8]/5 rounded-full blur-[120px] -z-10">
          </div>
        </div>

        <div class="lg:col-span-6 space-y-8 py-12 lg:pl-12" data-aos="fade-up">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00A8E8]/10 border border-[#00A8E8]/20">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A8E8] opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-[#00A8E8]"></span>
            </span>
            <span class="text-[11px] font-black text-[#007EA7] uppercase tracking-[0.2em]">Verified Professionals</span>
          </div>

          <div class="space-y-4">
            <h1 class="text-5xl font-black text-gray-900 leading-tight">
              Expert Help <br />
              <span class="text-[#00A8E8]">at Your Doorstep.</span>
            </h1>
            <p class="text-gray-500 text-lg md:text-xl max-w-lg leading-relaxed font-medium">
              Connecting you with top-rated experts in Your Area. Reliable, fast, and background-verified services
              tailored for your home.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-5 pt-4">
            <router-link to="/signup"
              class="px-10 py-5 bg-[#00A8E8] text-white font-bold rounded-2xl shadow-[0_20px_40px_rgba(0,168,232,0.3)] hover:bg-[#007EA7] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3">
              Get Stared
              <i class="fas fa-chevron-right text-xs"></i>
            </router-link>

            <router-link to="/home"
              class="px-10 py-5 bg-white text-[#00A8E8] font-bold rounded-2xl border-2 border-[#00A8E8]/10 shadow-sm hover:bg-blue-50 transition-all duration-300 text-center">
              Explore Services
            </router-link>
          </div>

          <div class="flex items-center gap-10 pt-8 border-t border-gray-100">
            <div class="flex flex-col">
              <span class="text-2xl font-black text-gray-900">4.9/5</span>
              <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">User Rating</span>
            </div>
            <div class="flex flex-col">
              <span class="text-2xl font-black text-gray-900">100%</span>
              <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Safety Record</span>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute bottom-[-5%] left-[-5%] text-[15vw] font-black text-gray-50 select-none -z-20 uppercase">
        SkillLink
      </div>
    </section>

    <PromoBanner />
    <ServiceSection />

    <TestimonialsSection />
    <AboutSection />

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

import AppNavbar from "@/components/AppNavbar.vue"
import TestimonialsSection from '@/components/home/TestimonialsSection';
import AboutSection from '@/components/home/AboutSection.vue';
import PromoBanner from '@/components/home/PromoBanners.vue';
import ServiceSection from '@/components/home/ServiceSection.vue';

</script>

<style>
@keyframes bounce-slow {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-12px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 5s ease-in-out infinite;
}
</style>

<style>
.clip-path-slant {
  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%);
}

h1,
p,
span,
a {
  font-family: 'Inter', system-ui, sans-serif;
  /* Recommended clean, Swiss-style typography */
}

/* Smooth Floating Animation */
@keyframes float {

  0%,
  100% {
    transform: translateY(0) rotate(0);
  }

  50% {
    transform: translateY(-20px) rotate(1deg);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Custom Scrollbar for the page if needed */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #007EA7;
  border-radius: 10px;
}
</style>