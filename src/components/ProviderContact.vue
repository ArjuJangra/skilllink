<template>
  <div class="min-h-screen bg-[#F0F9FF] text-gray-800 pt-20">
    <!-- Navbar -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white via-[#f1faff] to-[#f5fafe]  shadow-md">
      <div class="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <!-- Logo + Title -->
        <div class="flex items-center space-x-2">
          <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-10 h-10" />
          <span class="text-xl font-bold text-[#0073b1]">SkillLink</span>
        </div>

        <!-- Navigation + Profile -->
        <nav class="flex items-center space-x-4 text-sm md:text-base">
           <router-link to="/serviceprovider"
            class="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#0073b1] hover:scale-105 transition-transform duration-200">
            <!-- Filled Home Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3l8 7v10a2 2 0 0 1-2 2h-4a1 1 0 0 1-1-1v-5H11v5a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V10l8-7z" />
            </svg>
            <span class="font-semibold">Home</span>
          </router-link>

           <router-link to="/provider/orders"
            class="relative flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-[#0073b1] transition font-medium"
            active-class="text-[#0073b1] font-semibold after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-[#0073b1] after:rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M6 2a1 1 0 0 0-1 1v2H3a1 1 0 1 0 0 2h1l1.6 9.59A3 3 0 0 0 8.56 19h6.88a3 3 0 0 0 2.96-2.41L20 7H7V5h10a1 1 0 1 0 0-2H7V3a1 1 0 0 0-1-1zm2.56 15a1 1 0 0 1-.98-.8L6.28 9h11.44l-1.3 7.2a1 1 0 0 1-.98.8H8.56zM9 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm6 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            </svg>
            <span>Orders</span>
          </router-link>

          <!-- Policies -->
          <router-link to="/provider/policies"
            class="relative flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-[#0073b1] transition font-medium"
            active-class="text-[#0073b1] font-semibold after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-[#0073b1] after:rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5z" />
            </svg>
            <span>Policies</span>
          </router-link>

          <!-- About -->
          <router-link to="/provider/about"
            class="relative flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-[#0073b1] transition font-medium"
            active-class="text-[#0073b1] font-semibold after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-[#0073b1] after:rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 15a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm1-4h-2V7h2z" />
            </svg>
            <span>About</span>
          </router-link>

          <!-- Profile Picture -->
          <div class="relative group">
            <router-link to="/profile">
              <img
                v-if="provider && provider.profilePic"
                :src="`http://localhost:5000/uploads/providers/${provider.profilePic}`"
                alt="Provider DP"
                class="w-10 h-10 rounded-full object-cover border-2 border-[#0073b1] cursor-pointer"
              />
              <img
                v-else
                src="@/assets/user.png"
                alt="Default Provider DP"
                class="w-10 h-10 rounded-full object-cover border-2 border-[#0073b1] cursor-pointer"
              />
            </router-link>
          </div>
        </nav>
      </div>
    </header>

    <!-- Contact Page Content -->
    <div class="max-w-3xl mx-auto px-4 py-10">
      <div class="bg-white p-6 rounded shadow-md mb-8 text-center">
        <h1 class="text-3xl font-bold text-[#0073b1] mb-2">Contact Support</h1>
        <p class="text-gray-600 text-sm">
          Need help or have a question? We’re here to support our providers anytime.
        </p>
      </div>

      <form class="bg-white p-6 rounded shadow space-y-4" @submit.prevent="sendMessage">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-[#0073b1]"
            v-model="name"
            readonly
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-[#0073b1]"
            v-model="email"
            readonly
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            v-model="message"
            rows="4"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-[#0073b1]"
            placeholder="Describe your issue or question..."
          ></textarea>
        </div>
        <div class="text-center">
          <button
            type="submit"
            class="bg-[#0073b1] text-white px-6 py-2 rounded hover:bg-[#005f91] transition"
          >
            Send Message
          </button>
        </div>
      </form>

      <div class="text-center mt-6 pt-4 border-t text-sm text-gray-700 bg-white rounded-b-xl">
        <p class="px-4 pb-4">
          Have any questions or need help? Reach out to our support team at
          <a href="mailto:connectteamskilllink@gmail.com" class="text-[#0074B7] underline">connectteamskilllink@gmail.com</a>
          or call us at
          <a href="tel:+919876543210" class="text-[#0074B7] underline">+91 98765 43210</a>.
        </p>
      </div>
    </div>

    <!-- Footer -->
    <footer class="text-center py-6 text-sm text-gray-500 mt-10">
      © 2025 SkillLink Provider Portal. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import API from '@/api';
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const provider = ref(null)
const name = ref('')
const email = ref('')
const message = ref('')

// Fetch provider profile
const fetchProviderProfile = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await API.get('/providers/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    provider.value = res.data
    name.value = res.data.name
    email.value = res.data.email
  } catch (err) {
    console.error('❌ Failed to fetch provider profile:', err)
    toast.error('Failed to load profile')
  }
}

// Send contact message to backend
const sendMessage = async () => {
  if (!name.value || !email.value || !message.value) {
    toast.error('Please fill all fields')
    return
  }

  try {
    const res = await API.post('/contact/provider/contact', {
      name: name.value,
      email: email.value,
      message: message.value,
    })
    toast.success(res.data.message || 'Message sent successfully!')
    message.value = ''
  } catch (err) {
    console.error(err)
    toast.error(err.response?.data?.message || 'Failed to send message')
  }
}

// On mount
onMounted(() => {
  const storedProvider = localStorage.getItem('user')
  if (storedProvider && JSON.parse(storedProvider).role === 'provider') {
    provider.value = JSON.parse(storedProvider)
    fetchProviderProfile()
  } else {
    toast.error('Unauthorized access')
    window.location.href = '/login'
  }
})
</script>
