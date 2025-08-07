<template>
  <div v-if="isAuthenticated" class="min-h-screen bg-gray-50 px-4 py-8 relative">
    <!-- 🔥 Loading spinner overlay -->
    <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div class="loader"></div>
    </div>

    <div class="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-8 ">
      <h1 class="text-2xl font-bold text-[#007EA7] mb-6 ">Service Provider Dashboard</h1>

      <!-- Profile Section -->
      <div class="flex items-center justify-between border-b pb-4">
        <div class="flex items-center space-x-4">
          <img :src="profileImage" @error="useDefaultImage" alt="Provider DP"
            class="w-16 h-16 rounded-full object-cover border-2 border-[#007EA7]" />
          <div>
            <h2 class="text-xl font-semibold text-gray-800">{{ provider?.name }}</h2>
            <p class="text-sm text-gray-500">{{ provider?.email }}</p>
            <p class="text-sm text-gray-400 mt-1">Last Login: {{ lastLoginFormatted }}</p>
          </div>
        </div>
        <button class="text-[#007EA7] font-medium hover:underline" @click="showEditProfileForm = true">
          Edit Profile
        </button>
      </div>

      <!-- 🔥 Profile Completeness Bar -->
      <div class="max-w-sm">
        <label class="text-sm font-medium text-gray-700">Profile Completeness</label>
        <div class="w-full bg-gray-200 rounded-full h-4 mt-1">
          <div class="bg-[#007EA7] h-4 rounded-full transition-all duration-300"
            :style="{ width: profileCompleteness + '%' }"></div>
        </div>
        <p class="text-xs text-gray-500 mt-1">{{ profileCompleteness }}% complete</p>
      </div>

      <!-- Location Display -->
      <div class="bg-white rounded-2xl shadow p-6">
        <h3 class="text-xl font-semibold mb-2 text-[#007EA7]">Current Location</h3>
        <p class="text-sm text-gray-700">Area: {{ provider?.area || 'Not set' }}</p>
        <button @click="showLocationModal = true" class="mt-3 px-4 py-2 bg-[#007EA7] text-white rounded-lg">
          Edit Location
        </button>
      </div>

      <!-- Account Settings Section -->
      <div class="bg-white rounded-2xl shadow p-6 space-y-6">
        <h3 class="text-xl font-semibold text-[#007EA7] mb-4">Account Settings</h3>

        <!-- Change Password -->
        <button @click="showChangePasswordModal = true" class="block w-full text-left font-semibold text-[#007EA7] ">
          Change Password
        </button>

        <!-- Notification Preferences -->
        <div class="max-w-sm mt-6">
          <h4 class="font-semibold mb-2 cursor-pointer text-[#007EA7] select-none"
            @click="showNotificationPrefs = !showNotificationPrefs">
            Notification Preferences
          </h4>

          <transition name="fade">
            <div v-if="showNotificationPrefs" class="space-y-2">
              <label class="flex items-center space-x-2">
                <input type="checkbox" v-model="notificationPrefs.email" @change="autoUpdateNotificationPrefs" />
                <span>Email Notifications</span>
              </label>
              <label class="flex items-center space-x-2">
                <input type="checkbox" v-model="notificationPrefs.sms" @change="autoUpdateNotificationPrefs" />
                <span>SMS Notifications</span>
              </label>
              <label class="flex items-center space-x-2">
                <input type="checkbox" v-model="notificationPrefs.push" @change="autoUpdateNotificationPrefs" />
                <span>Push Notifications</span>
              </label>
            </div>
          </transition>
        </div>

        <!-- Availability Scheduling -->
        <div class="max-w-sm mt-6">
          <h4 class="font-semibold mb-2 cursor-pointer text-[#007EA7] select-none"
            @click="showAvailability = !showAvailability">
            Availability Scheduling

          </h4>

          <transition name="fade">
            <div v-if="showAvailability" class="flex items-center space-x-4 max-w-sm">
              <label class="flex flex-col text-sm">
                Start Time
                <input type="time" v-model="availability.start" class="border px-2 py-1 rounded"
                  @change="autoUpdateAvailability" />
              </label>
              <label class="flex flex-col text-sm">
                End Time
                <input type="time" v-model="availability.end" class="border px-2 py-1 rounded"
                  @change="autoUpdateAvailability" />
              </label>
            </div>
          </transition>
        </div>


        <!-- Payment Details -->
        <div class="max-w-sm mt-6">
          <h4 class="font-semibold mb-2 cursor-pointer text-[#007EA7] select-none"
            @click="showPaymentDetails = !showPaymentDetails">
            Payment Details
          </h4>
          <transition name="fade">
            <p v-if="showPaymentDetails" class="text-sm text-gray-600 max-w-sm">
              Manage your payout methods and view payment history (coming soon).
            </p>
          </transition>
        </div>


        <!-- Language Preferences -->
        <div class="max-w-sm mt-6">
          <h4 class="font-semibold mb-2 cursor-pointer text-[#007EA7] select-none"
            @click="showLanguagePref = !showLanguagePref">
            Language Preferences
          </h4>
          <transition name="fade">
            <select v-if="showLanguagePref" v-model="languagePref" class="border rounded px-3 py-1 w-full"
              @change="updateLanguagePref">
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </transition>
        </div>

        <!-- Toggle Section -->
<div class="border rounded-md mb-4 cursor-pointer">
  <div 
    class="flex justify-between items-center px-4 py-2" 
    @click="showPrivacySettings = !showPrivacySettings"
  >
    <h4 class="font-semibold">Privacy Settings</h4>
    <svg
      :class="{'transform rotate-180': showPrivacySettings}"
      class="w-4 h-4 transition-transform duration-300"
      fill="none" viewBox="0 0 24 24" stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M19 9l-7 7-7-7" />
    </svg>
  </div>

  <!-- Toggle Content -->
  <transition name="fade">
    <div 
      v-show="showPrivacySettings" 
      class="px-4 py-3 space-y-2 border-t"
    >
      <label class="flex items-center space-x-2 max-w-sm">
        <input type="checkbox" v-model="privacySettings.showEmail" />
        <span>Show email on profile</span>
      </label>
      <label class="flex items-center space-x-2 max-w-sm">
        <input type="checkbox" v-model="privacySettings.showPhone" />
        <span>Show phone number on profile</span>
      </label>
    </div>
  </transition>
</div>


        <!-- Two-Factor Authentication -->
        <div>
          <h4 class="font-semibold mb-2">Two-Factor Authentication (2FA)</h4>
          <label class="flex items-center space-x-2 max-w-sm">
            <input type="checkbox" v-model="twoFactorEnabled" @change="toggleTwoFactor" />
            <span>{{ twoFactorEnabled ? 'Enabled' : 'Disabled' }}</span>
          </label>
        </div>

        <!-- Logout -->
        <div class="bg-white rounded-2xl shadow p-6 mt-8">

          <button @click="showLogoutModal = true"
            class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition">
            Logout
          </button>
        </div>

        <!-- Account Deactivation -->
        <div class="bg-white rounded-2xl shadow p-6 mt-8 ">
          <button @click="showDeactivateModal = true"
            class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Deactivate Account
          </button>
        </div>

      </div>

      <!-- Modals -->

      <!-- Edit Profile Modal -->
      <transition name="modal-fade">
        <div v-if="showEditProfileForm"
          class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div class="modal-content bg-white w-full max-w-md p-6 rounded-xl shadow-xl overflow-y-auto max-h-[90vh]">
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
                <label class="block text-sm font-medium mb-1">Area</label>
                <input v-model="editForm.area" type="text" class="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Profile Picture</label>
                <input type="file" @change="handleFileChange" class="w-full" />
                <div v-if="previewImage" class="mt-2">
                  <img :src="previewImage" class="w-16 h-16 rounded-full object-cover border mt-2" />
                </div>
              </div>
              <div class="flex justify-end space-x-2">
                <button type="button" @click="showEditProfileForm = false"
                  class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg">
                  Cancel
                </button>
                <button type="submit" :disabled="isSubmitting"
                  class="px-4 py-2 bg-[#007EA7] text-white rounded-lg flex items-center">
                  <span v-if="isSubmitting"
                    class="w-4 h-4 border-2 border-t-2 border-t-white border-white/40 rounded-full animate-spin mr-2"></span>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </transition>

      <!-- Location Modal -->
      <transition name="modal-fade">
        <div v-if="showLocationModal"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="modal-content bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm">
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
      </transition>

      <!-- Logout Modal -->
      <transition name="modal-fade">
        <div v-if="showLogoutModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white p-6 rounded-2xl shadow-lg text-center w-full max-w-sm">
            <h2 class="text-lg font-semibold mb-4">Are you sure you want to logout?</h2>
            <div class="flex justify-center space-x-4">
              <button @click="handleLogout"
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
                Yes, Logout
              </button>
              <button @click="showLogoutModal = false"
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Change Password Modal -->
      <transition name="modal-fade">
        <div v-if="showChangePasswordModal"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="modal-content bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 class="text-xl font-semibold mb-4">Change Password</h2>
            <form @submit.prevent="changePassword">
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Current Password</label>
                <input v-model="passwordForm.currentPassword" type="password" class="w-full px-3 py-2 border rounded-lg"
                  autocomplete="current-password" required />
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">New Password</label>
                <input v-model="passwordForm.newPassword" type="password" class="w-full px-3 py-2 border rounded-lg"
                  autocomplete="new-password" required />
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Confirm New Password</label>
                <input v-model="passwordForm.confirmPassword" type="password" class="w-full px-3 py-2 border rounded-lg"
                  autocomplete="new-password" required />
              </div>
              <div class="flex justify-end space-x-2">
                <button type="button" @click="showChangePasswordModal = false"
                  class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg">
                  Cancel
                </button>
                <button type="submit" :disabled="passwordSubmitting"
                  class="px-4 py-2 bg-[#007EA7] text-white rounded-lg flex items-center">
                  <span v-if="passwordSubmitting"
                    class="w-4 h-4 border-2 border-t-2 border-t-white border-white/40 rounded-full animate-spin mr-2"></span>
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </transition>

      <!-- Account Deactivation Modal -->
      <transition name="modal-fade">
        <div v-if="showDeactivateModal"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white p-6 rounded-2xl shadow-lg text-center w-full max-w-sm">
            <h2 class="text-lg font-semibold mb-4 text-red-600">Are you sure you want to deactivate your account?</h2>
            <p class="mb-6 text-gray-700">This action is irreversible. You will lose access to your account and data.
            </p>
            <div class="flex justify-center space-x-4">
              <button @click="deactivateAccount"
                class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition">
                Yes, Deactivate
              </button>
              <button @click="showDeactivateModal = false"
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </transition>
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
import dayjs from 'dayjs'
import { auth } from '@/stores/auth'

const isAuthenticated = ref(false)
const provider = ref(null)
const loading = ref(false)

const showEditProfileForm = ref(false)
const showLogoutModal = ref(false)
const showLocationModal = ref(false)
const showChangePasswordModal = ref(false)
const showDeactivateModal = ref(false)
const showNotificationPrefs = ref(false)
const showAvailability = ref(false)
const showPaymentDetails = ref(false)
const showLanguagePref = ref(false)
const showPrivacySettings = ref(false);

const isSubmitting = ref(false)
const passwordSubmitting = ref(false)
const notifSubmitting = ref(false)
const availabilitySubmitting = ref(false)
const languageSubmitting = ref(false)
const privacySubmitting = ref(false)

const router = useRouter()

// Profile form
const editForm = reactive({
  name: '',
  email: '',
  area: ''
})
const selectedFile = ref(null)
const previewImage = ref('')

// Password form
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Notifications
const notificationPrefs = reactive({
  email: false,
  sms: false,
  push: false,
})

// Availability scheduling
const availability = reactive({
  start: '',
  end: '',
})

// Language preference
const languagePref = ref('en')

// Privacy settings
const privacySettings = reactive({
  showEmail: false,
  showPhone: false,
})

// Two factor auth
const twoFactorEnabled = ref(false)


// Computed properties
const profileImage = computed(() => {
  if (provider.value?.profilePic) {
    return `http://localhost:5000/uploads/providers/${provider.value.profilePic}`
  }
  return require('@/assets/user.png')
})

const lastLoginFormatted = computed(() => {
  if (!provider.value?.lastLogin) return 'Not available'
  return dayjs(provider.value.lastLogin).format('MMM D, YYYY h:mm A')
})

const profileCompleteness = computed(() => {
  if (!provider.value) return 0

  let completed = 0
  const fields = ['name', 'email', 'area', 'profilePic']

  fields.forEach(field => {
    if (provider.value[field]) completed++
  })

  return Math.round((completed / fields.length) * 100)
})

const useDefaultImage = (e) => {
  e.target.src = require('@/assets/user.png')
}

watch(showEditProfileForm, (open) => {
  if (open && provider.value) {
    editForm.name = provider.value.name || ''
    editForm.email = provider.value.email || ''
    editForm.area = provider.value.area || ''
    previewImage.value = profileImage.value
  }
})

// Profile update
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
          'Content-Type': 'multipart/form-data'
        }
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

// Location update
const updateLocation = async () => {
  const providerId = provider.value._id || provider.value.id
  if (!providerId) return toast.error('Provider ID missing')

  try {
    const token = localStorage.getItem('token')
    const res = await axios.put(
      `http://localhost:5000/api/providers/profile/update/${providerId}`,
      { area: editForm.area },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    provider.value = res.data.provider || res.data
    localStorage.setItem('user', JSON.stringify(provider.value))
    toast.success('Location updated successfully')
    showLocationModal.value = false
  } catch (err) {
    toast.error('Failed to update location')
  }
}

// Logout
const handleLogout = () => {
  auth.logoutUser?.()
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  toast.success('Logged out successfully')
  router.push('/login')
}

// Change password
const changePassword = async () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    return toast.error('New passwords do not match')
  }
  passwordSubmitting.value = true
  try {
    const token = localStorage.getItem('token')
    await axios.put(
      'http://localhost:5000/api/providers/change-password',
      {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    toast.success('Password changed successfully')
    showChangePasswordModal.value = false
    // clear form
    passwordForm.currentPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to change password')
  } finally {
    passwordSubmitting.value = false
  }
}

// Notification prefs update
const autoUpdateNotificationPrefs = async () => {
  notifSubmitting.value = true
  try {
    const token = localStorage.getItem('token')
    await axios.put(
      'http://localhost:5000/api/providers/notification-preferences',
      notificationPrefs,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    toast.success('Notification preferences updated')
  } catch (error) {
    toast.error('Failed to update notification preferences')
  } finally {
    notifSubmitting.value = false
  }
}

const autoUpdateAvailability = async () => {
  availabilitySubmitting.value = true
  try {
    const providerId = provider.value._id || provider.value.id
    if (!providerId) {
      toast.error('Provider ID missing')
      return
    }
    const token = localStorage.getItem('token')
    await axios.put(
      `http://localhost:5000/api/providers/availability/${providerId}`,
      availability,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    toast.success('Availability updated')
  } catch (error) {
    toast.error('Failed to update availability')
  } finally {
    availabilitySubmitting.value = false
  }
}

const updateLanguagePref = async () => {
  languageSubmitting.value = true
  try {
    const token = localStorage.getItem('token')
    await axios.put(
      `http://localhost:5000/api/providers/language`,
      { language: languagePref.value },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    toast.success('Language preference updated')
  } catch {
    toast.error('Failed to update language preference')
  } finally {
    languageSubmitting.value = false
  }
}

// Privacy settings update
const updatePrivacySettings = async () => {
  privacySubmitting.value = true
  try {
    const token = localStorage.getItem('token')
    await axios.post(
      `http://localhost:5000/api/providers/privacy`,
      privacySettings,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    toast.success('Privacy settings updated')
  } catch {
    toast.error('Failed to update privacy settings')
  } finally {
    privacySubmitting.value = false
  }
}

// Two-factor auth toggle (placeholder)
const toggleTwoFactor = () => {
  toast.info(
    twoFactorEnabled.value
      ? '2FA enabled (placeholder)'
      : '2FA disabled (placeholder)'
  )
}

// Account deactivation
const deactivateAccount = async () => {
  try {
    const token = localStorage.getItem('token')
    await axios.delete(
      `http://localhost:5000/api/providers/deactivate`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    toast.success('Account deactivated successfully')
    localStorage.clear()
    router.push('/login')
  } catch {
    toast.error('Failed to deactivate account')
  }
  showDeactivateModal.value = false
}

// On mount, fetch provider data and load saved preferences if any
onMounted(async () => {
  const storedUser = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  if (storedUser?.role !== 'provider') {
    return router.push('/login')
  }

  isAuthenticated.value = true
  loading.value = true

  try {
    const res = await axios.get('http://localhost:5000/api/providers/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    provider.value = res.data
    localStorage.setItem('user', JSON.stringify(res.data))

    // Initialize settings from provider data or defaults
    notificationPrefs.email = res.data.notificationPrefs?.email ?? true
    notificationPrefs.sms = res.data.notificationPrefs?.sms ?? false
    notificationPrefs.push = res.data.notificationPrefs?.push ?? true

    availability.start = res.data.availability?.start ?? '09:00'
    availability.end = res.data.availability?.end ?? '17:00'

    languagePref.value = res.data.languagePref ?? 'en'

    privacySettings.showEmail = res.data.privacySettings?.showEmail ?? true
    privacySettings.showPhone = res.data.privacySettings?.showPhone ?? false

    twoFactorEnabled.value = res.data.twoFactorEnabled ?? false
  } catch (err) {
    toast.error('Failed to fetch profile')
    router.push('/login')
  } finally {
    loading.value = false
  }
})
watch(
  () => ({ ...privacySettings }),
  () => {
    updatePrivacySettings()
  },
  { deep: true }
)


</script>

<style scoped>
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007EA7;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  display: inline-block;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* Modal fade transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Loader spinner */
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007EA7;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Modal transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

/* Responsive modal width */
@media (max-width: 640px) {
  .modal-content {
    width: 90% !important;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
