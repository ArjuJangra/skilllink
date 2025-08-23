<template>
  <div class="min-h-screen bg-[#F0F9FF] text-gray-800">
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
         
           <router-link to="/providerorders"
            class="relative flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-[#0073b1] transition font-medium"
            active-class="text-[#0073b1] font-semibold after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-[#0073b1] after:rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M6 2a1 1 0 0 0-1 1v2H3a1 1 0 1 0 0 2h1l1.6 9.59A3 3 0 0 0 8.56 19h6.88a3 3 0 0 0 2.96-2.41L20 7H7V5h10a1 1 0 1 0 0-2H7V3a1 1 0 0 0-1-1zm2.56 15a1 1 0 0 1-.98-.8L6.28 9h11.44l-1.3 7.2a1 1 0 0 1-.98.8H8.56zM9 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm6 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            </svg>
            <span>Orders</span>
          </router-link>

          <!-- About -->
          <router-link to="/providerabout"
            class="relative flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-[#0073b1] transition font-medium"
            active-class="text-[#0073b1] font-semibold after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-[#0073b1] after:rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 15a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm1-4h-2V7h2z" />
            </svg>
            <span>About</span>
          </router-link>

          <!-- Contact -->
          <router-link to="/providercontact"
            class="relative flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-[#0073b1] transition font-medium"
            active-class="text-[#0073b1] font-semibold after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-[#0073b1] after:rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M21 16.5a17.05 17.05 0 0 1-7.5-7.5l2.2-2.2a1 1 0 0 0 .2-1.1l-2-5A1 1 0 0 0 12 0H7a2 2 0 0 0-2 2 19 19 0 0 0 19 19 2 2 0 0 0 2-2v-5a1 1 0 0 0-.7-.95l-5-2a1 1 0 0 0-1.1.2z" />
            </svg>
            <span>Contact</span>
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

    <!-- Main Content -->
    <main class="pt-32 max-w-5xl mx-auto px-4">
      <!-- Policy Section -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-3xl font-bold text-[#0073b1] mb-4 text-center">Policies</h2>
        <p class="text-gray-700 mb-4 text-sm text-center">
          Below are the service policies that providers and users must follow to ensure a smooth experience:
        </p>

        <ul class="space-y-4 text-gray-700 text-sm">
          <li>
            <h3 class="font-semibold text-lg text-[#0073b1]">1. Service Timeliness</h3>
            <p>Providers must reach the service location on time. If delayed, inform the user in advance.</p>
          </li>
          <li>
            <h3 class="font-semibold text-lg text-[#0073b1]">2. Cancellations</h3>
            <p>Cancellations must be made at least 2 hours before the scheduled time to avoid penalties.</p>
          </li>
          <li>
            <h3 class="font-semibold text-lg text-[#0073b1]">3. Service Quality</h3>
            <p>Ensure that service is done professionally, using the proper tools and methods agreed upon.</p>
          </li>
          <li>
            <h3 class="font-semibold text-lg text-[#0073b1]">4. Payment Policy</h3>
            <p>Payments are processed after service completion. Any dispute must be raised within 24 hours.</p>
          </li>
          <li>
            <h3 class="font-semibold text-lg text-[#0073b1]">5. Safety & Conduct</h3>
            <p>Respect the customer’s property. Any misconduct or inappropriate behavior will result in a ban.</p>
          </li>
        </ul>
      </div>

      <!-- Notes Section -->
      <div class="mt-10 bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold text-yellow-700 mb-2 text-center">Important Notes</h3>
        <ul class="list-disc pl-5 text-yellow-800 space-y-1 text-sm">
          <li>Keep your profile and contact details updated.</li>
          <li>Maintain transparency and clear communication with clients.</li>
          <li>Report any suspicious or fraudulent activity immediately.</li>
          <li>Ensure you follow SkillLink’s safety guidelines and hygiene protocols.</li>
        </ul>
      </div>
    </main>

    <!-- Footer -->
    <footer class="text-center py-6 text-sm text-gray-500 mt-10">
      © 2025 SkillLink Provider Portal. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import API from '@/api';
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const provider = ref(null)
const router = useRouter()

 const fetchProviderProfile = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await API.get('/providers/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    provider.value = res.data
  } catch (err) {
    console.error('Failed to fetch provider profile:', err)
    toast.error('Unable to load provider profile')
    router.push('/login') // fallback
  }
}

onMounted(() => {
  const stored = localStorage.getItem('user')
  if (stored && JSON.parse(stored).role === 'provider') {
    fetchProviderProfile()
  } else {
    toast.error('Unauthorized access')
    router.push('/login')
  }
})
</script>


<style scoped></style>
