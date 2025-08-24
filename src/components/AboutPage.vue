<template>
  <div class="min-h-screen bg-[#F6F9FC] overflow-hidden">
    <!-- Fixed Header -->
    <header class="w-full bg-white shadow-md fixed top-0 z-50">
      <div class="max-w-6xl mx-auto py-4 flex items-center justify-between">

        <!--Logo -->
        <div class="flex items-center space-x-2">
          <img :src="skillLogo" alt="SkillLink Logo" class="h-10 w-auto" />
          <span class="text-xl font-bold text-[#0074B7]">SkillLink</span>
        </div>

        <!--Navigation -->
        <nav class="flex items-center space-x-4">

          <!-- Contact -->
          <router-link to="/contact"
            class="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 font-medium  hover:text-[#0073b1] transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.05 11.05 0 003.47.55 1 1 0 011 1V20a1 1 0 01-1 1C10.42 21 3 13.58 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.2.19 2.38.55 3.47a1 1 0 01-.21 1.11l-2.22 2.21z" />
            </svg>
            <span>Contact</span>
          </router-link>

          <!-- Policies -->
          <router-link to="/privacy"
            class="flex items-center gap-2 text-gray-700 font-medium hover:text-[#00A8E8] transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1l9 4v6c0 5-3.6 9.7-9 11-5.4-1.3-9-6-9-11V5l9-4zM7 9v2h10V9H7z" />
            </svg>
            <span>Policies</span>
          </router-link>

          <!-- Help -->
          <router-link :to="{ path: '/help', query: { from: 'homelogged' } }"
            class="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 hover:text-[#0073b1] transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM12.75 15V16.5H11.25V15H12.75ZM10.5 10.4318C10.5 9.66263 11.1497 9 12 9C12.8503 9 13.5 9.66263 13.5 10.4318C13.5 10.739 13.3151 11.1031 12.9076 11.5159C12.5126 11.9161 12.0104 12.2593 11.5928 12.5292L11.25 12.7509V14.25H12.75V13.5623C13.1312 13.303 13.5828 12.9671 13.9752 12.5696C14.4818 12.0564 15 11.3296 15 10.4318C15 8.79103 13.6349 7.5 12 7.5C10.3651 7.5 9 8.79103 9 10.4318H10.5Z" />
            </svg>
            <span>Help</span>
          </router-link>

          <!-- Home Button -->
          <router-link to="/homelogged"
            class="bg-[#0074B7] text-white px-4 py-2 rounded-lg hover:bg-[#005f91] transition">
            Home
          </router-link>
        </nav>
      </div>
    </header>

    <!-- Main About Content -->
    <div class="pt-[90px] px-2 py-6 flex justify-center items-start">
      <div class="w-full max-w-6xl bg-white rounded-xl shadow-xl p-4 md:p-6">
        <div>
          <div class="text-center mb-6">
            <h1 class="text-3xl font-bold text-[#0074B7] mb-1">About SkillLink</h1>
            <p class="text-gray-600 text-base">
              Empowering people to find trusted home and repair services with ease.
            </p>
          </div>

          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center mb-6">
            <div class="bg-[#F6F9FC] rounded-lg p-4 shadow-sm">
              <div class="text-[#0074B7] text-2xl mb-1">🔧</div>
              <h3 class="text-lg font-semibold mb-1">Reliable Helpers</h3>
              <p class="text-gray-600 text-sm">Each service provider is verified and reviewed by real users.</p>
            </div>
            <div class="bg-[#F6F9FC] rounded-lg p-4 shadow-sm">
              <div class="text-[#0074B7] text-2xl mb-1">⚡</div>
              <h3 class="text-lg font-semibold mb-1">Quick Booking</h3>
              <p class="text-gray-600 text-sm">Book nearby mechanics, electricians or carpenters instantly.</p>
            </div>
            <div class="bg-[#F6F9FC] rounded-lg p-4 shadow-sm">
              <div class="text-[#0074B7] text-2xl mb-1">🔒</div>
              <h3 class="text-lg font-semibold mb-1">Secure & Trusted</h3>
              <p class="text-gray-600 text-sm">Your safety is our priority. Every booking is trackable.</p>
            </div>
          </div>

          <div class="mb-4">
            <h2 class="text-2xl md:text-3xl font-bold text-[#0074B7] mb-6 text-center">Why Choose SkillLink?</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
              <div v-for="(point, index) in reasons" :key="index"
                class="bg-[#F6F9FC] p-5 rounded-lg shadow h-full flex flex-col justify-between">
                <h3 class="text-sm font-semibold text-[#0074B7] mb-2">{{ point.title }}</h3>
                <p class="text-sm text-gray-600">{{ point.description }}</p>
              </div>
            </div>
          </div>

          <div class="text-center mt-6">
            <p class="text-gray-700 text-base md:text-lg font-medium leading-relaxed">
              At <span class="text-[#0074B7] font-semibold">SkillLink</span>, we believe in building community
              connections.
              Whether you're looking for quick help or want to offer your skills — you're part of something bigger. 💙
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import skillLogo from '@/assets/skilllogo.png'

const reasons = [
  { title: 'Verified Professionals', description: 'We verify identity, skills, and reviews before allowing any service provider on our platform.' },
  { title: 'Easy Scheduling', description: 'Schedule, cancel, or reschedule bookings with ease from your dashboard.' },
  { title: 'Customer Support', description: 'Our team is ready to help via chat or email with any questions or booking issues.' },
  { title: 'Fair Pricing', description: 'Transparent, competitive pricing. No hidden costs, ever.' }
]
</script>

<img :src="skillLogo" alt="SkillLink Logo" class="h-10 w-auto" />
