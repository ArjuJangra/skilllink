
<template>
  <div v-if="isAuthenticated" class="min-h-screen bg-gray-50 px-4 py-8">
    <div class="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
      <h1 class="text-2xl font-bold text-[#007EA7] mb-4">Service Provider Dashboard</h1>

      <!-- Profile Section -->
      <div class="flex items-center justify-between border-b pb-4 mb-6">
        <div class="flex items-center space-x-4">
          <img
            :src="provider?.profilePic ? `http://localhost:5000/uploads/${provider.profilePic}` : require('@/assets/user.png')"
            @error="e => e.target.src = require('@/assets/user.png')"
            alt="Provider DP"
            class="w-16 h-16 rounded-full object-cover border-2 border-[#007EA7]"
          />
          <div>
            <h2 class="text-xl font-semibold text-gray-800">{{ provider?.name }}</h2>
            <p class="text-sm text-gray-500">{{ provider?.email }}</p>
          </div>
        </div>
        <button
          class="text-[#007EA7] font-medium hover:underline"
          @click="showEditProfileForm = !showEditProfileForm"
        >
          Edit Profile
        </button>
      </div>

      <!-- Edit Profile Modal -->
      <div
        v-if="showEditProfileForm"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div class="bg-white w-full max-w-md p-6 rounded-xl shadow-xl">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">Edit Profile</h2>
          <form @submit.prevent="updateProfile">
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Name</label>
              <input
                v-model="editForm.name"
                type="text"
                class="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Email</label>
              <input
                v-model="editForm.email"
                type="email"
                class="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Profile Picture</label>
              <input
                type="file"
                @change="handleFileChange"
                class="w-full"
              />
            </div>
            <div class="flex justify-end space-x-2">
              <button
                type="button"
                @click="showEditProfileForm = false"
                class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-[#007EA7] text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div class="bg-white rounded-2xl shadow p-6">
          <h4 class="text-lg font-semibold text-gray-700 mb-2">Total Orders</h4>
          <p class="text-3xl font-bold text-[#007EA7]">24</p>
        </div>
        <div class="bg-white rounded-2xl shadow p-6">
          <h4 class="text-lg font-semibold text-gray-700 mb-2">Completed</h4>
          <p class="text-3xl font-bold text-green-500">19</p>
        </div>
        <div class="bg-white rounded-2xl shadow p-6">
          <h4 class="text-lg font-semibold text-gray-700 mb-2">Earnings</h4>
          <p class="text-3xl font-bold text-yellow-600">₹12,500</p>
        </div>
      </div>

      <!-- Settings & Logout -->
      <div class="bg-white rounded-2xl shadow p-6 mt-8">
        <h3 class="text-xl font-semibold mb-4 text-[#007EA7]">Account Settings</h3>
        <button
          @click="showLogoutModal = true"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      <!-- Logout Confirmation Modal -->
      <div
        v-if="showLogoutModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-2xl shadow-lg text-center w-full max-w-sm">
          <h2 class="text-lg font-semibold mb-4">Are you sure you want to logout?</h2>
          <div class="flex justify-center space-x-4">
            <button
              @click="handleLogout"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              Yes, Logout
            </button>
            <button
              @click="showLogoutModal = false"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <p class="text-gray-500 mt-6">Welcome to your dashboard. Sections coming soon...</p>
    </div>
  </div>

  <!-- Redirect Message -->
  <div v-else class="text-center mt-10 text-gray-500">Redirecting to login...</div>
</template>


<script setup>
import { ref, onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { auth } from '@/stores/auth'

const isAuthenticated = ref(false)
const provider = ref(null)
const showEditProfileForm = ref(false)
const showLogoutModal = ref(false)
const router = useRouter()

const editForm = reactive({
  name: '',
  email: '',
})

const selectedFile = ref(null)

// Sync form with existing provider data
watch(showEditProfileForm, (open) => {
  if (open && provider.value) {
    editForm.name = provider.value.name || ''
    editForm.email = provider.value.email || ''
  }
})

// File input change handler
const handleFileChange = (e) => {
  selectedFile.value = e.target.files[0]
}

// Update profile API call
const updateProfile = async () => {
  try {
    const formData = new FormData()
    formData.append('name', editForm.name)
    formData.append('email', editForm.email)

    if (selectedFile.value) {
      formData.append('profilePic', selectedFile.value)
    }

    const res = await axios.put(
      `http://localhost:5000/api/providers/${provider.value._id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    toast.success('Profile updated successfully')
    localStorage.setItem('user', JSON.stringify(res.data))
    provider.value = res.data
    showEditProfileForm.value = false
  } catch (err) {
    console.error('Update Error:', err)
    toast.error('Failed to update profile')
  }
}

// Logout functionality
const handleLogout = () => {
  auth.logoutUser?.() // Safely call if defined
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  toast.success('Logged out successfully')
  router.push('/login')
}

// On mount, load provider data
onMounted(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'))
  if (storedUser?.role === 'provider') {
    isAuthenticated.value = true
    provider.value = storedUser
  } else {
    router.push('/login')
  }
})
</script>
