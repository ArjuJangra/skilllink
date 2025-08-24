<template>
  <div class="min-h-screen bg-[#F6F9FC]">
    <!-- Fixed Header -->
    <header class="w-full bg-white shadow-md fixed top-0 z-50">
      <div class="max-w-6xl mx-auto py-4 flex items-center justify-between">

        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="h-10 w-auto" />
          <span class="text-xl font-bold text-[#0074B7]">SkillLink</span>
        </div>

        <!-- Navigation -->
        <nav class="flex items-center gap-6">
          <!-- About -->
          <router-link to="/about"
            class="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 font-medium hover:text-[#00A8E8] transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>About Us</span>
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
            class="flex items-center gap-2 text-gray-700 font-medium hover:text-[#0073b1] transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM12.75 15V16.5H11.25V15H12.75ZM10.5 10.4318C10.5 9.66263 11.1497 9 12 9C12.8503 9 13.5 9.66263 13.5 10.4318C13.5 10.739 13.3151 11.1031 12.9076 11.5159C12.5126 11.9161 12.0104 12.2593 11.5928 12.5292L11.25 12.7509V14.25H12.75V13.5623C13.1312 13.303 13.5828 12.9671 13.9752 12.5696C14.4818 12.0564 15 11.3296 15 10.4318C15 8.79103 13.6349 7.5 12 7.5C10.3651 7.5 9 8.79103 9 10.4318H10.5Z" />
            </svg>
            <span>Help</span>
          </router-link>

          <!-- Home -->
          <router-link to="/homelogged" class="bg-[#0074B7] text-white px-4 py-2 rounded-lg hover:bg-[#005f91] transition">
            Home
          </router-link>
        </nav>
      </div>
    </header>

    <!-- Page Content -->
    <div class="pt-[90px] px-4 py-6 flex items-center justify-center">
      <div class="w-full max-w-6xl bg-white rounded-xl shadow-xl p-6 md:p-10 overflow-y-auto max-h-[95vh]">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-[#0074B7]">Contact SkillLink</h1>
          <p class="text-gray-600 text-base mt-1">
            We’d love to hear from you. Use the form or check FAQs below.
          </p>
        </div>

        <!-- Grid -->
        <div class="grid md:grid-cols-2 gap-6 mb-6">
          <!-- Contact Form -->
          <form class="space-y-4" @submit.prevent="handleSubmit" novalidate>
            <div>
              <label for="name" class="block text-sm text-gray-700 font-medium">Full Name</label>
              <input id="name" v-model="form.name" type="text" placeholder="Your name"
                class="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-[#0074B7]" required />
            </div>
            <div>
              <label for="email" class="block text-sm text-gray-700 font-medium">Email</label>
              <input id="email" v-model="form.email" type="email" placeholder="you@example.com"
                class="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-[#0074B7]" required />
            </div>
            <div>
              <label for="message" class="block text-sm text-gray-700 font-medium">Message</label>
              <textarea id="message" v-model="form.message" rows="3" placeholder="Your message"
                class="w-full border border-gray-300 px-3 py-2 rounded-md resize-none focus:ring-2 focus:ring-[#0074B7]"
                required></textarea>
            </div>
            <button type="submit" :disabled="loading"
              class="w-full bg-[#0074B7] text-white py-2 rounded-md font-semibold hover:bg-[#005a91] transition disabled:opacity-50">
              {{ loading ? 'Sending...' : 'Send Message' }}
            </button>
          </form>

          <!-- Contact Info + FAQs -->
          <div class="space-y-4">
            <!-- Info -->
            <div class="bg-[#F6F9FC] p-4 rounded-md shadow-sm">
              <p class="text-sm text-gray-700">
                📧 <span class="font-semibold">Email:</span>
                <span class="text-blue-600">connectteamskilllink@gmail.com</span>
              </p>
              <p class="text-sm text-gray-700 mt-1">
                📞 <span class="font-semibold">Phone:</span> +91 98765 43210
              </p>
            </div>

            <!-- FAQs -->
            <div>
              <h2 class="text-lg font-semibold text-[#0074B7] mb-2">FAQs</h2>
              <div v-for="(faq, index) in faqs" :key="index" class="border border-gray-200 rounded-md mb-2">
                <button @click="toggleFAQ(index)" :aria-expanded="faq.open.toString()"
                  class="w-full flex justify-between items-center px-4 py-2 text-left bg-[#F6F9FC] hover:bg-[#E8F1F9] transition cursor-pointer select-none">
                  <span class="text-sm font-medium text-[#0074B7]">{{ faq.question }}</span>
                  <svg :class="{ 'rotate-180': faq.open }" class="w-4 h-4 text-[#0074B7] transform transition-transform"
                    fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <transition name="fade">
                  <div v-if="faq.open" class="px-4 py-2 text-sm text-gray-700 bg-white">
                    {{ faq.answer }}
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import API from '@/api';
import { toast } from 'vue3-toastify'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const loading = ref(false)

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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const handleSubmit = async () => {
  if (!form.name || !form.email || !form.message) {
    toast.error('❗ Please fill in all fields.')
    return
  }
  if (!emailRegex.test(form.email)) {
    toast.error('❗ Please enter a valid email address.')
    return
  }

  loading.value = true
  const toastId = toast.loading('Sending your message...')

  try {
    await API.post('/contact', {
      name: form.name,
      email: form.email,
      message: form.message
    })

    toast.update(toastId, {
      render: '📨 Message sent successfully!',
      type: 'success',
      isLoading: false,
      autoClose: 2000,
      theme: 'colored',
    })

    form.name = ''
    form.email = ''
    form.message = ''
  } catch (error) {
    console.error('Send message error:', error)
    toast.update(toastId, {
      render: '❌ Failed to send message. Try again later.',
      type: 'error',
      isLoading: false,
      autoClose: 3000,
      theme: 'colored',
    })
  } finally {
    loading.value = false
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
