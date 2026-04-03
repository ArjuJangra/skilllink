<template>
  <footer class="bg-gradient-to-r from-[#007EA7] to-[#00A8E8] text-white shadow-inner shadow-black/10 mt-auto">
    <div class="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

      <div class="space-y-6">
        <div class="flex items-center space-x-3">
          <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-10 h-10 rounded-xl shadow-lg border border-white/20" />
          <span class="text-2xl font-black tracking-tight bg-gradient-to-b from-white to-blue-100 bg-clip-text text-transparent">
            SkillLink
          </span>
        </div>
        <p class="text-sm leading-relaxed text-blue-50/80">
          Connecting skilled professionals with customers quickly, easily, and reliably. Expert help, just a tap away.
        </p>
        <router-link to="/signup"
          class="inline-flex items-center justify-center px-6 py-2.5 bg-white text-[#007EA7] font-bold rounded-xl hover:bg-blue-50 hover:scale-105 transition-all shadow-md">
          Join Now
        </router-link>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-bold text-white relative inline-block">
          Company
          <span class="absolute -bottom-1 left-0 w-8 h-1 bg-white/30 rounded-full"></span>
        </h3>
        <nav class="flex flex-col space-y-3">
          <router-link v-for="link in companyLinks" :key="link.path" :to="link.path" 
            class="text-blue-50/70 hover:text-white transition-colors flex items-center gap-2 group">
            <span class="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white transition-all"></span>
            {{ link.name }}
          </router-link>
        </nav>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-bold text-white relative inline-block">
          Support
          <span class="absolute -bottom-1 left-0 w-8 h-1 bg-white/30 rounded-full"></span>
        </h3>
        <nav class="flex flex-col space-y-3">
          <router-link v-for="link in supportLinks" :key="link.path" :to="link.path" 
            class="text-blue-50/70 hover:text-white transition-colors">
            {{ link.name }}
          </router-link>
        </nav>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-bold text-white relative inline-block">
          Reach Us
          <span class="absolute -bottom-1 left-0 w-8 h-1 bg-white/30 rounded-full"></span>
        </h3>
        <div class="space-y-4">
          <div class="flex items-start gap-3 text-blue-50/80">
            <i class="fas fa-map-marker-alt mt-1"></i>
            <span class="text-sm">Sector 14, Hisar, <br/>Haryana, India</span>
          </div>
          <div class="flex items-center gap-3 text-blue-50/80">
            <i class="fas fa-phone-alt"></i>
            <a href="tel:+917404227877" class="hover:text-white transition-colors">+91 7404227877</a>
          </div>
          
          <div class="flex items-center gap-4 pt-4">
            <a v-for="social in socials" :key="social.icon" :href="social.url" target="_blank"
              class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#007EA7] transition-all transform hover:-translate-y-1 shadow-sm">
              <i :class="social.icon" class="text-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="border-t border-white/10">
      <div class="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-blue-100/60 uppercase tracking-widest">
        <p>© 2026 SkillLink. Crafted with <i class="fas fa-heart text-white/40 mx-1"></i> in Noida.</p>
        <div class="flex gap-6">
          <a href="#" class="hover:text-white">Status</a>
          <a href="#" class="hover:text-white">Cookies</a>
          <a href="#" class="hover:text-white">Security</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const companyLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'Careers', path: '/careers' },
  { name: 'Contact', path: '/contact' },
  { name: 'Partner with Us', path: '/signup' }
];

const supportLinks = [
  { name: 'All Services', path: '/home' },
  { name: 'Help Center / FAQ', path: '/help' },
  { name: 'Privacy Policy', path: '/privacy' },
  { name: 'Terms & Conditions', path: '/terms' }
];

const socials = [
  { icon: 'fab fa-twitter', url: '#' },
  { icon: 'fab fa-facebook-f', url: '#' },
  { icon: 'fab fa-github', url: '#' },
  { icon: 'fab fa-instagram', url: '#' }
];
</script>