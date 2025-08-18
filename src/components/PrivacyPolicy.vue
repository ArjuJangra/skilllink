<template>
  <div class="h-screen bg-[#F6F9FC] overflow-hidden">
    <!-- Fixed Header -->
    <header class="w-full bg-white shadow-md fixed top-0 z-50">
      <div class="max-w-[1120px] mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <img :src="skillLogo" alt="SkillLink Logo" class="h-10 w-auto" />
          <span class="text-xl font-bold text-[#0074B7]">SkillLink</span>
        </div>
        <router-link
          to="/homelogged"
          class="bg-[#0074B7] text-white px-4 py-2 rounded hover:bg-[#005f91] transition"
        >
          Back to Home
        </router-link>
      </div>
    </header>

    <!-- Main Privacy Content -->
    <div class="pt-[100px] px-2 flex justify-center items-start h-[calc(100vh-100px)]">
      <div class="w-full max-w-[1120px] bg-white rounded-xl shadow-xl p-6 flex flex-col">
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
