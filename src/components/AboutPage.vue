
<template>
  <div class="min-h-screen bg-[#F6F9FC]">
    <!-- Fixed Header -->
    <header class="w-full bg-white shadow-md fixed top-0 z-50">
      <div class="max-w-[1120px] mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <img :src="skillLogo" alt="SkillLink Logo" class="h-10 w-auto" />
          <span class="text-xl font-bold text-[#0074B7]">SkillLink</span>
        </div>
        <router-link to="/" class="bg-[#0074B7] text-white px-4 py-2 rounded hover:bg-[#005f91] transition">
          Back to Home
        </router-link>
      </div>
    </header>

    <!-- Main About Content -->
    <div class="pt-[90px] px-2 py-4 flex justify-center items-start">
      <div class="w-full max-w-[1120px] bg-white rounded-xl shadow-xl p-4 md:p-6">
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
              <div
                v-for="(point, index) in reasons"
                :key="index"
                class="bg-[#F6F9FC] p-5 rounded-lg shadow h-full flex flex-col justify-between"
              >
                <h3 class="text-sm font-semibold text-[#0074B7] mb-2">{{ point.title }}</h3>
                <p class="text-sm text-gray-600">{{ point.description }}</p>
              </div>
            </div>
          </div>

          <div class="text-center mt-6">
            <p class="text-gray-700 text-base md:text-lg font-medium leading-relaxed">
              At <span class="text-[#0074B7] font-semibold">SkillLink</span>, we believe in building community connections.
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

