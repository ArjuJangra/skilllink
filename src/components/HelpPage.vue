<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="h-10 w-auto" />
          <h1 class="text-2xl font-bold text-[#0073b1]">SkillLink Help Center</h1>
        </div>

        <!-- Navigation -->
        <nav class="flex items-center gap-4">
          <!-- About -->
          <router-link
            to="/about"
            class="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-100 hover:text-[#0073b1] transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>About</span>
          </router-link>

          <!-- Contact -->
          <router-link
            to="/contact"
            class="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-100 hover:text-[#0073b1] transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.05 11.05 0 003.47.55 1 1 0 011 1V20a1 1 0 01-1 1C10.42 21 3 13.58 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.2.19 2.38.55 3.47a1 1 0 01-.21 1.11l-2.22 2.21z" />
            </svg>
            <span>Contact</span>
          </router-link>

          <!-- Policies -->
          <router-link
            to="/privacy"
            class="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-100 hover:text-[#0073b1] transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1l9 4v6c0 5-3.6 9.7-9 11-5.4-1.3-9-6-9-11V5l9-4zM7 9v2h10V9H7z" />
            </svg>
            <span>Policies</span>
          </router-link>

          <!-- Home -->
          <router-link to="/homelogged">
            <button class="bg-[#0073b1] text-white px-4 py-2 rounded-lg hover:bg-[#005f91] transition shadow-md">
              Home
            </button>
          </router-link>
        </nav>
      </div>
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
