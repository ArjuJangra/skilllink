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

    <!-- Main Terms Content -->
    <div class="pt-[100px] px-2 flex justify-center items-start h-[calc(100vh-100px)]">
      <div class="w-full max-w-[1120px] bg-white rounded-xl shadow-xl p-6 flex flex-col">
        <!-- Center Title -->
        <div class="text-center mb-6">
          <h1 class="text-3xl font-bold text-[#0074B7] mb-2">Terms & Conditions</h1>
          <p class="text-gray-600 text-base">
            Please read these terms carefully before using SkillLink’s services.
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
`Welcome to SkillLink. By accessing or using our services, you agree to comply with these Terms & Conditions.
They establish the legal agreement between you (the user) and SkillLink.

If you do not agree with any part of these terms, please discontinue using our services immediately.`
  },
  {
    title: "User Responsibilities",
    content:
`When using SkillLink, you agree to:
- Provide accurate and truthful information during registration
- Use the platform only for lawful purposes
- Respect all service providers and other users
- Avoid misuse, fraudulent activity, or attempts to disrupt the platform

Violation of these responsibilities may lead to suspension or permanent removal.`
  },
  {
    title: "Service Provider Duties",
    content:
`Service providers on SkillLink must:
- Deliver services with professionalism, honesty, and skill
- Avoid fraudulent or misleading representations
- Comply with legal requirements and safety standards

SkillLink reserves the right to remove providers failing to meet expectations.`
  },
  {
    title: "Payments & Refunds",
    content:
`All payments must be processed securely through SkillLink’s payment system.
Refunds are available under certain conditions:
- If a service provider fails to deliver as agreed
- If a booking is cancelled under eligible policies
- Refunds may take 5–7 business days to process

SkillLink is not responsible for transactions conducted outside the platform.`
  },
  {
    title: "Limitations of Liability",
    content:
`SkillLink acts as a connecting platform between users and providers.
We are not liable for:
- The quality or outcome of services provided by third parties
- Any damages, losses, or disputes arising from user-provider interactions

Our liability is limited to the fullest extent permitted by applicable law.`
  },
  {
    title: "Privacy & Data Use",
    content:
`By using SkillLink, you agree that your data may be used according to our Privacy Policy.
We ensure data is handled securely but cannot guarantee protection from unauthorized breaches
outside our control.

We never sell your personal information without your consent.`
  },
  {
    title: "Governing Law",
    content:
`These Terms & Conditions are governed by the laws of India.
Any disputes arising under these terms will be subject to the jurisdiction of courts in Hisar, Haryana.

By continuing to use SkillLink, you agree to these terms in their entirety.`
  }
];
</script>
