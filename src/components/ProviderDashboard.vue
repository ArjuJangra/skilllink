<!-- ProviderDashboard.vue -->
<template>
  <div v-if="isAuthenticated" class="min-h-screen bg-gray-50 px-4 py-8">
    <div class="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
      <h1 class="text-2xl font-bold text-[#007EA7] mb-6">Service Provider Dashboard</h1>

      <!-- Profile Section -->
      <div class="flex items-center justify-between border-b pb-4 mb-6">
        <div class="flex items-center space-x-4">
          <img
            :src="profileImage"
            @error="useDefaultImage"
            alt="Provider DP"
            class="w-16 h-16 rounded-full object-cover border-2 border-[#007EA7]"
          />
          <div>
            <h2 class="text-xl font-semibold text-gray-800">{{ provider?.name }}</h2>
            <p class="text-sm text-gray-500">{{ provider?.email }}</p>
          </div>
        </div>
        <button class="text-[#007EA7] font-medium hover:underline" @click="showEditProfileForm = true">Edit Profile</button>
      </div>

      <!-- Edit Profile Modal -->
      <div v-if="showEditProfileForm" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white w-full max-w-md p-6 rounded-xl shadow-xl">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">Edit Profile</h2>
          <form @submit.prevent="updateProfile">
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Name</label>
              <input v-model="editForm.name" type="text" class="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Email</label>
              <input v-model="editForm.email" type="email" class="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Profile Picture</label>
              <input type="file" @change="handleFileChange" class="w-full" />
              <div v-if="previewImage" class="mt-2">
                <img :src="previewImage" class="w-16 h-16 rounded-full object-cover border mt-2" />
              </div>
            </div>
            <div class="flex justify-end space-x-2">
              <button type="button" @click="showEditProfileForm = false" class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg">
                Cancel
              </button>
              <button type="submit" :disabled="isSubmitting" class="px-4 py-2 bg-[#007EA7] text-white rounded-lg flex items-center">
                <span v-if="isSubmitting" class="loader mr-2"></span>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

     

      <!-- Location Edit -->
<div class="bg-white rounded-2xl shadow p-6 mt-8">
  <h3 class="text-xl font-semibold mb-2 text-[#007EA7]">Current Location</h3>
  <p class="text-sm text-gray-700">Latitude: {{ provider?.latitude }}</p>
  <p class="text-sm text-gray-700">Longitude: {{ provider?.longitude }}</p>
  <button @click="showLocationModal = true" class="mt-3 px-4 py-2 bg-[#007EA7] text-white rounded-lg">
    Edit Location
  </button>
</div>

<!-- Location Modal -->
<div v-if="showLocationModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div class="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm">
    <h2 class="text-lg font-semibold mb-4">Edit Location</h2>
   <div class="mb-4">
  <label class="block text-sm font-medium mb-1">Area</label>
  <input v-model="editForm.area" type="text" class="w-full px-3 py-2 border rounded-lg" />
</div>

    <div class="flex justify-end space-x-3">
      <button @click="showLocationModal = false" class="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
      <button @click="updateLocation" class="px-4 py-2 bg-[#007EA7] text-white rounded-lg">Save</button>
    </div>
  </div>
</div>


      <!-- Settings & Logout -->
      <div class="bg-white rounded-2xl shadow p-6 mt-8">
        <h3 class="text-xl font-semibold mb-4 text-[#007EA7]">Account Settings</h3>
        <button @click="showLogoutModal = true" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
          Logout
        </button>
      </div>

      <!-- Logout Modal -->
      <div v-if="showLogoutModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-2xl shadow-lg text-center w-full max-w-sm">
          <h2 class="text-lg font-semibold mb-4">Are you sure you want to logout?</h2>
          <div class="flex justify-center space-x-4">
            <button @click="handleLogout" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
              Yes, Logout
            </button>
            <button @click="showLogoutModal = false" class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <p class="text-gray-500 mt-6 text-center">Welcome to your dashboard. More features coming soon...</p>
    </div>
  </div>

  <div v-else class="text-center mt-10 text-gray-500">Redirecting to login...</div>
</template>

<script setup>
import { ref, onMounted, reactive, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { auth } from '@/stores/auth'

const isAuthenticated = ref(false)
const provider = ref(null)
const showEditProfileForm = ref(false)
const showLogoutModal = ref(false)
const isSubmitting = ref(false)
const showLocationModal = ref(false)
const router = useRouter()
const editForm = reactive({
  name: '',
  email: '',
  area: '',
})

const selectedFile = ref(null)
const previewImage = ref('')
const locationForm = reactive({
  latitude: null,
  longitude: null
})
// Profile image logic
const profileImage = computed(() => {
  if (provider.value?.profilePic) {
    return `http://localhost:5000/uploads/providers/${provider.value.profilePic}`
  }
  return require('@/assets/user.png')
})

const useDefaultImage = (e) => {
  e.target.src = require('@/assets/user.png')
}

watch(showEditProfileForm, (open) => {
  if (open && provider.value) {
    editForm.name = provider.value.name || ''
    editForm.email = provider.value.email || ''
    previewImage.value = profileImage.value
  }
})

const handleFileChange = (e) => {
  selectedFile.value = e.target.files[0]
  if (selectedFile.value) {
    previewImage.value = URL.createObjectURL(selectedFile.value)
  }
}

const updateProfile = async () => {
  const providerId = provider.value._id || provider.value.id
  if (!providerId) return toast.error('Provider ID is missing')

  isSubmitting.value = true
  try {
    const formData = new FormData()
    formData.append('name', editForm.name)
    formData.append('email', editForm.email)
    formData.append('area', editForm.area)

    if (selectedFile.value) {
      formData.append('profilePic', selectedFile.value)
    }

    const token = localStorage.getItem('token')
    const res = await axios.put(
      `http://localhost:5000/api/providers/profile/update/${providerId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    const updated = res.data.provider || res.data
    toast.success('Profile updated successfully')
    localStorage.setItem('user', JSON.stringify(updated))
    provider.value = updated
    showEditProfileForm.value = false
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to update profile')
  } finally {
    isSubmitting.value = false
  }
}

const handleLogout = () => {
  auth.logoutUser?.()
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  toast.success('Logged out successfully')
  router.push('/login')
}

watch(showEditProfileForm, (open) => {
  if (open && provider.value) {
    editForm.name = provider.value.name || ''
    editForm.email = provider.value.email || ''
    editForm.area = provider.value.area || ''
  }
})


const updateLocation = async () => {
  const providerId = provider.value._id || provider.value.id
  if (!providerId) return toast.error('Provider ID missing')

  try {
    const token = localStorage.getItem('token')
    const res = await axios.put(
      `http://localhost:5000/api/providers/profile/update/${providerId}`,
      {
        lat: locationForm.latitude,
        lng: locationForm.longitude
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    provider.value = res.data.provider || res.data
    localStorage.setItem('user', JSON.stringify(provider.value))
    toast.success('Location updated successfully')
    showLocationModal.value = false
  } catch (err) {
    console.error(err)
    toast.error('Failed to update location')
  }
}


onMounted(async () => {
  const storedUser = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  if (storedUser?.role !== 'provider') {
    return router.push('/login')
  }

  isAuthenticated.value = true

  try {
    const res = await axios.get('http://localhost:5000/api/providers/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })

    provider.value = res.data
    localStorage.setItem('user', JSON.stringify(res.data))
  } catch (err) {
    toast.error('Failed to fetch profile')
    router.push('/login')
  }
})
</script>

<style scoped>
.loader {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #007ea7;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 0.6s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>



