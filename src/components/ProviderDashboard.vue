<template>
  <div v-if="isAuthenticated" class="min-h-screen bg-gray-50 px-4 py-8 relative">

    <!--  Loading spinner overlay -->
    <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div class="loader"></div>
    </div>

    <div class="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-8 ">
       <!-- Header -->
      <h1 class="text-2xl sm:text-3xl font-bold mb-6 text-center 
          bg-gradient-to-r from-[#3B8D99] to-[#f46675]
           bg-clip-text text-transparent">
        Hello, {{ provider?.name || 'Provider' }} – Let’s Get to Work!
      </h1>

      <!-- Profile Section -->
      <div
        class="bg-white rounded-2xl shadow-md p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-gray-100">
        <!-- Profile Info -->
        <div class="flex items-center space-x-4 sm:space-x-5">
          <!-- Profile Picture Wrapper -->
          <div class="relative group">
            <img :src="profileImage" @error="useDefaultImage" alt="Provider DP"
              class="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-gray-200 shadow-sm group-hover:scale-105 transition-transform duration-200" />
            <!-- Glowing Online/Offline Dot -->
            <span class="absolute bottom-1 right-1 block w-3.5 h-3.5 rounded-full border-2 border-white"
              :class="isOnline ? 'bg-green-500 animate-ping-once' : 'bg-gray-400'"></span>
            <span v-if="isOnline"
              class="absolute bottom-1 right-1 block w-3.5 h-3.5 rounded-full border-2 border-white bg-green-500"></span>
          </div>

          <!-- Name & Details -->
          <div>
            <h2
              class="text-lg sm:text-2xl font-bold bg-gradient-to-r from-[#007EA7] via-[#00B4DB] to-[#4dd0e1] bg-clip-text text-transparent">
              {{ provider?.name || 'Provider Name' }}
            </h2>
            <p class="text-sm text-gray-500">
              {{ provider?.email || 'No email available' }}
            </p>
            <p class="text-xs text-gray-400 mt-0.5">
              Last Login: {{ lastLoginFormatted || 'N/A' }}
            </p>
          </div>
        </div>

        <!-- Edit Profile Button -->
        <button
          class="px-5 py-2 bg-gradient-to-r from-[#007EA7] to-[#00B4DB] text-white text-sm font-semibold rounded-full shadow hover:shadow-md hover:opacity-95 transition-all"
          @click="showEditProfileForm = true">
          Edit Profile
        </button>
      </div>

      <!-- Account Settings Section -->
      <div class="flex flex-col lg:flex-row gap-6">
        <div class="bg-white rounded-2xl shadow-lg p-6 space-y-6 w-full max-w-lg ">
          <!-- 🔧 Header -->
          <h3 class="text-2xl font-bold text-[#007EA7]">Account Settings</h3>
          <section class="space-y-4">
            <div>
              <button @click="showSecuritySection = !showSecuritySection"
                class="flex justify-between items-center w-full text-left font-semibold text-[#007EA7] hover:text-[#005f7a] transition">
                <span> Security</span>

              </button>

              <transition name="fade">
                <div v-if="showSecuritySection" class="mt-3 space-y-3 pl-4">
                  <button @click="showChangePasswordModal = true"
                    class="text-[#007EA7] hover:underline font-medium transition">
                    Change Password
                  </button>

                  <label class="flex items-center space-x-2">
                    <input type="checkbox" v-model="twoFactorEnabled" @change="toggleTwoFactor" />
                    <span>
                      Two-Factor Authentication
                      <strong>({{ twoFactorEnabled ? 'Enabled' : 'Disabled' }})</strong>
                    </span>
                  </label>
                </div>
              </transition>
            </div>

            <div>
              <button @click="showNotificationPrefs = !showNotificationPrefs"
                class="flex justify-between items-center w-full text-left font-semibold text-[#007EA7] hover:text-[#005f7a] transition">
                <span> Notification Preferences</span>

              </button>

              <transition name="fade">
                <div v-if="showNotificationPrefs" class="mt-3 space-y-2 pl-4">
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

            <div>
              <button @click="showLanguagePref = !showLanguagePref"
                class="flex justify-between items-center w-full text-left font-semibold text-[#007EA7] hover:text-[#005f7a] transition">
                <span> Language Preferences</span>

              </button>

              <transition name="fade">
                <select v-if="showLanguagePref" v-model="languagePref" @change="updateLanguagePref"
                  class="mt-2 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#007EA7]">
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </transition>
            </div>

            <div>
              <button @click="showAvailability = !showAvailability"
                class="flex justify-between items-center w-full text-left font-semibold text-[#007EA7] hover:text-[#005f7a] transition">
                <span> Availability Scheduling</span>
              </button>

              <transition name="fade">
                <div v-if="showAvailability" class="mt-3 flex gap-4">
                  <label class="flex flex-col text-sm w-full">
                    Start Time
                    <input type="time" v-model="availability.start" @change="autoUpdateAvailability"
                      class="border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-[#007EA7]" />
                  </label>
                  <label class="flex flex-col text-sm w-full">
                    End Time
                    <input type="time" v-model="availability.end" @change="autoUpdateAvailability"
                      class="border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-[#007EA7]" />
                  </label>
                </div>
              </transition>
            </div>

            <div>
              <button @click="showPrivacySettings = !showPrivacySettings"
                class="flex justify-between items-center w-full  font-semibold text-[#007EA7] hover:text-[#005f7a] transition">
                <span> Privacy Settings</span>
              </button>

              <transition name="fade">
                <div v-show="showPrivacySettings" class="px-4 py-3 space-y-2 border-t">
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" v-model="privacySettings.showEmail" />
                    <span>Show email on profile</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" v-model="privacySettings.showPhone" />
                    <span>Show phone number on profile</span>
                  </label>
                </div>
              </transition>
            </div>
          </section>

          <section>
            <button @click="showConnectedAccounts = !showConnectedAccounts"
              class="flex justify-between items-center w-full text-left font-semibold text-[#007EA7] hover:text-[#005f7a] transition">
              <span> Connected Accounts</span>

            </button>

            <transition name="fade">
              <div v-if="showConnectedAccounts" class="mt-3 space-y-3 pl-4">
                <div class="flex justify-between items-center">
                  <span>Google</span>
                  <button @click="toggleGoogleLink"
                    class="px-3 py-1 rounded bg-[#007EA7] text-white hover:bg-[#005f7a]">
                    {{ isGoogleLinked ? 'Unlink' : 'Link' }}
                  </button>
                </div>
                <div class="flex justify-between items-center">
                  <span>Facebook</span>
                  <button @click="toggleFacebookLink"
                    class="px-3 py-1 rounded bg-[#007EA7] text-white hover:bg-[#005f7a]">
                    {{ isFacebookLinked ? 'Unlink' : 'Link' }}
                  </button>
                </div>
              </div>
            </transition>
          </section>

          <div class="bg-white rounded-2xl shadow p-6 w-full lg:w-1/3 transition hover:shadow-xl">

            <h3 class="text-xl font-bold mb-3 flex items-center text-[#007EA7]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-[#007EA7]" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 11c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M20.354 15.354A9 9 0 1112 3v0a9 9 0 018.354 12.354z" />
              </svg>
              Current Location
            </h3>

            <p class="text-sm text-gray-700 mb-4">Area: {{ provider?.area || 'Not set' }}</p>

            <button @click="showLocationModal = true"
              class="px-4 py-2 bg-[#007EA7] text-white rounded-lg shadow hover:bg-[#005f7a] transition">
              Edit Location
            </button>

          </div>

          <!--  Logout + Deactivate -->
          <section class="pt-4 border-t space-y-3">
            <button @click="showLogoutModal = true"
              class="w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition">
              Logout
            </button>
            <button @click="showDeactivateModal = true"
              class="w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition">
              Deactivate Account
            </button>
          </section>


        </div>
      </div>

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
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import API from '@/api';
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import dayjs from 'dayjs'
import { auth } from '@/stores/auth'

// Props
const props = defineProps({
  lastActive: {
    type: String,
    default: null
  }
})

// Router
const router = useRouter()

// Auth & state
const isAuthenticated = ref(false)
const provider = ref(null)
const loading = ref(false)

// Modals & sections
const showEditProfileForm = ref(false)
const showSecuritySection = ref(false)
const showLogoutModal = ref(false)
const showLocationModal = ref(false)
const showChangePasswordModal = ref(false)
const showDeactivateModal = ref(false)
const showNotificationPrefs = ref(false)
const showAvailability = ref(false)
const showLanguagePref = ref(false)
const showPrivacySettings = ref(false)
const showConnectedAccounts = ref(false)

// Form states
const isSubmitting = ref(false)
const passwordSubmitting = ref(false)
const notifSubmitting = ref(false)
const availabilitySubmitting = ref(false)
const languageSubmitting = ref(false)
const privacySubmitting = ref(false)

// Profile form
const editForm = reactive({ name: '', email: '', area: '' })
const selectedFile = ref(null)
const previewImage = ref('')

// Password form
const passwordForm = reactive({ currentPassword: '', newPassword: '', confirmPassword: '' })

// Notification prefs
const notificationPrefs = reactive({ email: false, sms: false, push: false })

// Availability scheduling
const availability = reactive({ start: '', end: '' })

// Language preference
const languagePref = ref('en')

// Privacy settings
const privacySettings = reactive({ showEmail: false, showPhone: false })

// Two-factor auth
const twoFactorEnabled = ref(false)

// Connected accounts
const isGoogleLinked = ref(false)
const isFacebookLinked = ref(false)

// Computed
const profileImage = computed(() => {
  if (provider.value?.profilePic) {
    return `${API.defaults.baseURL}/uploads/providers/${provider.value.profilePic}`;
  }
  return require('@/assets/user.png');
});

const lastLoginFormatted = computed(() =>
  provider.value?.lastLogin ? dayjs(provider.value.lastLogin).format('MMM D, YYYY h:mm A') : 'Not available'
);

const isOnline = computed(() => {
  if (!props.lastActive) return false
  const lastActiveTime = new Date(props.lastActive).getTime()
  const now = Date.now()
  return now - lastActiveTime < 5 * 60 * 1000 // online if active in last 5 min
})

// Methods
const useDefaultImage = (e) => e.target.src = require('@/assets/user.png')

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
    if (selectedFile.value) formData.append('profilePic', selectedFile.value)

     const res = await API.put(`/providers/profile/update/${provider.value._id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

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
    const res = await API.put(
      `/providers/profile/update/${providerId}`,
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

// Change password
const changePassword = async () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) return toast.error('New passwords do not match')
  passwordSubmitting.value = true
  try {
    await API.put('/providers/change-password', {
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword
    });

    toast.success('Password changed successfully')
    showChangePasswordModal.value = false
    passwordForm.currentPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to change password')
  } finally {
    passwordSubmitting.value = false
  }
}

// Logout
const handleLogout = () => {
  auth.logoutUser?.();
  localStorage.clear();
  toast.success('Logged out successfully');
  router.push('/login');
};


// Notification prefs update
const autoUpdateNotificationPrefs = async () => {
  notifSubmitting.value = true
  try {
    const token = localStorage.getItem('token')
    await API.put(
      '/providers/notification-preferences',
      notificationPrefs,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    toast.success('Notification preferences updated')
  } catch {
    toast.error('Failed to update notification preferences')
  } finally {
    notifSubmitting.value = false
  }
}

// Availability update
const autoUpdateAvailability = async () => {
  availabilitySubmitting.value = true
  try {
    const providerId = provider.value._id || provider.value.id
    if (!providerId) return toast.error('Provider ID missing')
    const token = localStorage.getItem('token')
    await API.put(
      `/providers/availability/${providerId}`,
      availability,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    toast.success('Availability updated')
  } catch {
    toast.error('Failed to update availability')
  } finally {
    availabilitySubmitting.value = false
  }
}

// Language
const updateLanguagePref = async () => {
  languageSubmitting.value = true
  try {
    const token = localStorage.getItem('token')
    await API.put(`/providers/language`, { language: languagePref.value }, { headers: { Authorization: `Bearer ${token}` } })
    toast.success('Language preference updated')
  } catch {
    toast.error('Failed to update language preference')
  } finally {
    languageSubmitting.value = false
  }
}

// Privacy settings
const updatePrivacySettings = async () => {
  privacySubmitting.value = true
  try {
    const token = localStorage.getItem('token')
    await API.post(`/providers/privacy`, privacySettings, { headers: { Authorization: `Bearer ${token}` } })
    toast.success('Privacy settings updated')
  } catch {
    toast.error('Failed to update privacy settings')
  } finally {
    privacySubmitting.value = false
  }
}

// Watch privacy changes
watch(() => ({ ...privacySettings }), () => { updatePrivacySettings() }, { deep: true })

// Two-factor toggle
const toggleTwoFactor = () => {
  toast.info(twoFactorEnabled.value ? '2FA enabled (placeholder)' : '2FA disabled (placeholder)')
}

// Deactivate account
const deactivateAccount = async () => {
  try {
    await API.delete('/providers/deactivate');
    toast.success('Account deactivated successfully');
    localStorage.clear();
    router.push('/login');
  } catch {
    toast.error('Failed to deactivate account');
  } finally {
    showDeactivateModal.value = false;
  }
};

// Connected accounts
function toggleGoogleLink() { isGoogleLinked.value = !isGoogleLinked.value }
function toggleFacebookLink() { isFacebookLinked.value = !isFacebookLinked.value }

// On mount: fetch provider
onMounted(async () => {
  const storedUser = JSON.parse(localStorage.getItem('user'))
  if (storedUser?.role !== 'provider') return router.push('/login')

  isAuthenticated.value = true
  loading.value = true
  try {
     const res = await API.get('/api/providers/profile');
    provider.value = res.data
    localStorage.setItem('user', JSON.stringify(res.data))

    // Initialize settings
    notificationPrefs.email = res.data.notificationPrefs?.email ?? true
    notificationPrefs.sms = res.data.notificationPrefs?.sms ?? false
    notificationPrefs.push = res.data.notificationPrefs?.push ?? true
    availability.start = res.data.availability?.start ?? '09:00'
    availability.end = res.data.availability?.end ?? '17:00'
    languagePref.value = res.data.languagePref ?? 'en'
    privacySettings.showEmail = res.data.privacySettings?.showEmail ?? true
    privacySettings.showPhone = res.data.privacySettings?.showPhone ?? false
    twoFactorEnabled.value = res.data.twoFactorEnabled ?? false
  } catch {
    toast.error('Failed to fetch profile')
    router.push('/login')
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Custom glow animation */
@keyframes pulseGlow {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }

  50% {
    transform: scale(1.8);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 0;
  }
}

.animate-ping-once {
  animation: pulseGlow 1.5s infinite;
}

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
