<template>
  <div class="min-h-screen bg-[#F6F9FC] px-4 py-6 flex items-center justify-center">
    <!-- 📦 Main Contact Box -->
    <div class="w-full max-w-6xl bg-white rounded-xl shadow-xl p-6 md:p-10 overflow-y-auto max-h-[95vh]">

      <!-- 💬 Header Inside White Box -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-[#0074B7]">Contact SkillLink</h1>
        <p class="text-gray-600 text-base mt-1">
          We’d love to hear from you. Use the form or check FAQs below.
        </p>
      </div>

      <!-- Content Grid -->
      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <!-- ✏️ Contact Form -->
        <form class="space-y-4">
          <div>
            <label class="block text-sm text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Your name"
              class="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-[#0074B7]"
            />
          </div>
          <div>
            <label class="block text-sm text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              class="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-[#0074B7]"
            />
          </div>
          <div>
            <label class="block text-sm text-gray-700 font-medium">Message</label>
            <textarea
              rows="3"
              placeholder="Your message"
              class="w-full border border-gray-300 px-3 py-2 rounded-md resize-none focus:ring-2 focus:ring-[#0074B7]"
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full bg-[#0074B7] text-white py-2 rounded-md font-semibold hover:bg-[#005a91] transition"
          >
            Send Message
          </button>
        </form>

        <!-- ☎️ Contact Info + FAQs -->
        <div class="space-y-4">
          <!-- Contact Info -->
          <div class="bg-[#F6F9FC] p-4 rounded-md shadow-sm">
            <p class="text-sm text-gray-700">
              📧 <span class="font-semibold">Email:</span>
              <span class="text-blue-600">support@skilllink.com</span>
            </p>
            <p class="text-sm text-gray-700 mt-1">
              📞 <span class="font-semibold">Phone:</span> +91 98765 43210
            </p>
          </div>

          <!-- FAQs -->
          <div>
            <h2 class="text-lg font-semibold text-[#0074B7] mb-2">FAQs</h2>
            <div v-for="(faq, index) in faqs" :key="index" class="border border-gray-200 rounded-md mb-2">
              <button
                @click="toggleFAQ(index)"
                class="w-full flex justify-between items-center px-4 py-2 text-left bg-[#F6F9FC] hover:bg-[#E8F1F9] transition"
              >
                <span class="text-sm font-medium text-[#0074B7]">{{ faq.question }}</span>
                <svg
                  :class="{ 'rotate-180': faq.open }"
                  class="w-4 h-4 text-[#0074B7] transform transition-transform"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="faq.open" class="px-4 py-2 text-sm text-gray-700 bg-white">
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const faqs = reactive([
  {
    question: 'Can’t log in to my SkillLink account.',
    answer: 'Make sure your email and password are correct. If not, use “Forgot Password” to reset.',
    open: false
  },
  {
    question: 'How to book a helper?',
    answer: 'Log in, go to the booking page, select your category, and confirm the booking.',
    open: false
  },
  {
    question: 'Can I cancel or reschedule?',
    answer: 'Yes, from the dashboard > booking history. You can reschedule if it’s not too close to the time.',
    open: false
  },
  {
    question: 'Want to join as a service provider?',
    answer: 'Email us at support@skilllink.com and we’ll guide you through onboarding.',
    open: false
  }
])

const toggleFAQ = (index) => {
  faqs[index].open = !faqs[index].open
}
</script>
