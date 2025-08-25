<template>
  <div class="min-h-screen bg-[#F6F9FC] overflow-hidden">
    <!--Header -->
   <header class="w-full bg-white shadow-md fixed top-0 z-50">
  <div class="max-w-6xl mx-auto py-4 flex items-center justify-between">
    
    <!-- Logo -->
    <div class="flex items-center space-x-2">
      <img :src="skillLogo" alt="SkillLink Logo" class="h-10 w-auto" />
      <span class="text-xl font-bold text-[#0074B7]">SkillLink</span>
    </div>

    <!-- Navigation -->
    <nav class="flex items-center space-x-4">
      <!-- About -->
      <router-link 
        to="/about"
        class="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 font-medium hover:text-[#00A8E8] transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>About Us</span>
      </router-link>

      <!-- Contact -->
      <router-link 
        to="/contact"
        class="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 font-medium hover:text-[#0073b1] transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.05 11.05 0 003.47.55 1 1 0 011 1V20a1 1 0 01-1 1C10.42 21 3 13.58 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.2.19 2.38.55 3.47a1 1 0 01-.21 1.11l-2.22 2.21z" />
        </svg>
        <span>Contact</span>
      </router-link>

      <!-- Help -->
      <router-link 
        :to="{ path: '/help', query: { from: 'homelogged' } }"
        class="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 hover:text-[#0073b1] transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" clip-rule="evenodd" 
            d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM12.75 15V16.5H11.25V15H12.75ZM10.5 10.4318C10.5 9.66263 11.1497 9 12 9C12.8503 9 13.5 9.66263 13.5 10.4318C13.5 10.739 13.3151 11.1031 12.9076 11.5159C12.5126 11.9161 12.0104 12.2593 11.5928 12.5292L11.25 12.7509V14.25H12.75V13.5623C13.1312 13.303 13.5828 12.9671 13.9752 12.5696C14.4818 12.0564 15 11.3296 15 10.4318C15 8.79103 13.6349 7.5 12 7.5C10.3651 7.5 9 8.79103 9 10.4318H10.5Z" 
          />
        </svg>
        <span>Help</span>
      </router-link>

      <!-- Home Button -->
      <router-link 
        to="/homelogged"
        class="bg-[#0074B7] text-white px-4 py-2 rounded-lg hover:bg-[#005f91] transition"
      >
        Home
      </router-link>
    </nav>
  </div>
</header>

    <!-- Main Privacy Content -->
    <div class="pt-[90px] px-2 py-6 flex justify-center items-start h-[calc(100vh-100px)]">
      <div class="w-full max-w-6xl bg-white rounded-xl shadow-xl p-6 md:p-6 flex flex-col">
        <!-- Center Title -->
        <div class="text-center mb-6">
          <h1 class="text-3xl font-bold text-[#0074B7] mb-2">Privacy Policy</h1>
          <p class="text-gray-600 text-base">
            Learn how we protect, use, and manage your personal information at SkillLink.
          </p>
        </div>

        <!-- Two Column Layout -->
        <div class="flex flex-1 flex-col md:flex-row">
          <!-- Left Menu -->
          <div class="w-full md:w-1/3 border-r border-gray-200 pr-4 mb-6 md:mb-0">
            <ul class="space-y-3">
              <li
                v-for="(section, index) in sections"
                :key="index"
                @click="activeSection = index"
                class="cursor-pointer p-3 rounded-lg text-sm md:text-base transition-all duration-300"
                :class="activeSection === index 
                  ? 'bg-[#0074B7] text-white font-semibold shadow' 
                  : 'bg-[#F6F9FC] text-gray-700 hover:bg-[#e1e9f0]'"
              >
                {{ section.title }}
              </li>
            </ul>
          </div>

          <!-- Right Content -->
          <div class="w-full md:w-2/3 pl-4 flex flex-col justify-center">
            <div class="bg-[#F6F9FC] rounded-lg p-6 shadow-sm h-full">
              <h2 class="text-xl md:text-2xl font-semibold text-[#0074B7] mb-4">
                {{ sections[activeSection].title }}
              </h2>
              <p class="text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line">
                {{ sections[activeSection].content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import skillLogo from "@/assets/skilllogo.png";

const activeSection = ref(0);

const sections = [
  {
    title: "Introduction",
    content:
`Welcome to SkillLink. Protecting your privacy is our top priority.
This Privacy Policy explains how we handle your personal data with care.

We believe in complete transparency so you always know what information
we collect, how it is used, and the steps we take to protect it.
SkillLink is designed with your safety and trust in mind — giving you
control over your information at every stage.`
  },
  {
    title: "Information We Collect",
    content:
`We collect the minimum information necessary to provide you with safe and reliable services:
- Basic details like your name, email, and phone number
- Location information to connect you with nearby helpers
- Booking history and preferences to personalize your experience
- Device & usage data for fraud prevention and platform improvements

We never request sensitive information unrelated to your service needs.`
  },
  {
    title: "How We Use Information",
    content:
`Your data is used only to improve your SkillLink experience:
- Confirm and manage your bookings
- Connect you quickly with trusted service providers
- Send important safety updates and booking alerts
- Personalize suggestions and improve platform performance

We do not sell or misuse your personal data for unrelated purposes.`
  },
  {
    title: "Data Protection",
    content:
`Your security is our responsibility. We safeguard your information with:
- End-to-end encryption for sensitive data
- Verified logins and secure authentication
- Regular monitoring and security updates
- Strict internal policies limiting data access

We continuously upgrade our systems to meet global security standards.`
  },
  {
    title: "Your Rights",
    content:
`You are in control of your personal data:
- Access and update your profile information anytime
- Request complete deletion of your account and history
- Choose to opt-out of promotional communications
- Contact our support team with privacy-related questions

SkillLink ensures compliance with global privacy regulations to protect your rights.`
  },
  {
    title: "Third-Party Sharing",
    content:
`We only share your data with trusted third-party providers when absolutely necessary:
- To process secure payments
- To verify identity or prevent fraud
- To connect you with verified service providers

We never share or sell your personal information for marketing purposes without consent.`
  },
  {
    title: "Policy Updates",
    content:
`This Privacy Policy may be updated from time to time:
- Updates will be communicated clearly through our platform
- Major changes will require your consent before taking effect
- We encourage you to review our policy periodically

By continuing to use SkillLink, you agree to the latest version of this policy.`
  }
];
</script>
