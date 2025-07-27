
<template>
  <div class="min-h-screen bg-blue-50 flex flex-col justify-between">
    <!-- Header -->
    <header class="bg-white shadow w-full">
      <div class="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-auto h-10" />
          <h1 class="text-2xl font-bold text-[#0073b1]">SkillLink Help Center</h1>
        </div>
        <router-link :to="backRoute">
          <button class="bg-[#0073b1] text-white px-4 py-2 rounded-lg hover:bg-[#005f91] transition">
            Back to Home
          </button>
        </router-link>
      </div>
    </header>

    <!-- Help Section -->
    <main class="flex-grow px-4 md:px-10 py-8 max-w-5xl mx-auto bg-white rounded-lg shadow mt-6 mb-10">
      <h2 class="text-3xl font-bold text-[#0073b1] mb-6 text-center">Frequently Asked Questions</h2>

      <div v-for="(faq, index) in faqs" :key="index" class="border-b py-4">
        <button
          class="w-full flex justify-between items-center text-left focus:outline-none"
          @click="toggle(index)"
        >
          <h3 class="text-lg font-semibold text-gray-800">
            {{ faq.question }}
          </h3>
          <span class="text-xl text-[#0073b1]">
            {{ faq.open ? '-' : '+' }}
          </span>
        </button>
        <p v-if="faq.open" class="mt-2 text-gray-600 text-sm">
          {{ faq.answer }}
        </p>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-[#0073b1] text-white py-4 text-center">
      Need more help? Email us at
      <a href="mailto:support@skilllink.in" class="underline">support@skilllink.in</a>
    </footer>
  </div>
</template>


<script setup>
import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Determine where to go back based on the query parameter
const backRoute = computed(() => {
  return route.query.from === 'homelogged' ? '/homelogged' : '/homeboard'
})

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
</style>
