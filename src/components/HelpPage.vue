<template>
  <div class="min-h-screen flex flex-col bg-gray-50">

    <!-- Header -->
    <header class="bg-white shadow sticky top-0 z-50">
     <AppNavbar />
    </header>

    <!-- Help Section -->
    <main class="flex-grow px-4 md:px-10 py-10 max-w-5xl mx-auto">
      <div class="bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-3xl font-bold text-[#0073b1] mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="border-b py-4"
        >
          <button
            class="w-full flex justify-between items-center text-left focus:outline-none group"
            @click="toggle(index)"
          >
            <h3 class="text-lg font-semibold text-gray-800 group-hover:text-[#0073b1] transition">
              {{ faq.question }}
            </h3>
            <span class="text-xl font-bold text-[#0073b1]">
              {{ faq.open ? '-' : '+' }}
            </span>
          </button>

          <!-- Smooth Expand Animation -->
          <transition name="fade">
            <p
              v-if="faq.open"
              class="mt-3 text-gray-600 text-sm leading-relaxed"
            >
              {{ faq.answer }}
            </p>
          </transition>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-[#0073b1] text-white py-6 text-center mt-10">
      <p class="text-sm">
        Need more help? Email us at
        <a href="mailto:connectteamskilllink@gmail.com" class="underline hover:text-gray-200">
          connectteamskilllink@gmail.com
        </a>
      </p>
    </footer>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import AppNavbar from '@/components/AppNavbar.vue'
// FAQs
const faqs = reactive([
  {
    question: 'I can’t log into my account. What should I do?',
    answer: 'Ensure your credentials are correct. Try resetting your password. If the problem persists, contact support@skilllink.in.',
    open: false,
  },
  {
    question: 'How do I book a service?',
    answer: 'Go to the Home page, select your desired service and click on “Book Now.”',
    open: false,
  },
  {
    question: 'Can I cancel or reschedule my booking?',
    answer: 'Yes, log in to your dashboard, view your booking and choose cancel or reschedule.',
    open: false,
  },
  {
    question: 'How are service providers verified?',
    answer: 'Every provider goes through ID and background verification before being listed.',
    open: false,
  },
  {
    question: 'Is there any customer support number?',
    answer: 'Yes! You can call us at +91-9876543210 between 9 AM to 7 PM (Mon–Sat).',
    open: false,
  }
])

function toggle(index) {
  faqs[index].open = !faqs[index].open
}
</script>

<style scoped>
/* Optional smooth toggle */
p {
  transition: all 0.3s ease-in-out;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
