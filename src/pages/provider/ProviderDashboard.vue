<template>
  <div v-if="provider" class="min-h-screen bg-gray-50 px-4 py-8 relative">
    <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div class="loader"></div>
    </div>

    <div class="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-8 ">
      <h1 class="text-2xl sm:text-3xl font-bold mb-6 text-center 
          bg-gradient-to-r from-[#3B8D99] to-[#f46675]
           bg-clip-text text-transparent">
        Hello, {{ provider?.name || 'Provider' }} – Let’s Get to Work!
      </h1>

      <div class="bg-white rounded-2xl shadow-md p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-gray-100">
        <div class="flex items-center space-x-4 sm:space-x-5">
          <div class="relative group">
            <img :src="profileImage" @error="useDefaultImage" alt="Provider DP"
              class="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-gray-200 shadow-sm group-hover:scale-105 transition-transform duration-200" />
          </div>

          <div>
            <h2 class="text-lg sm:text-2xl font-bold bg-gradient-to-r from-[#007EA7] via-[#00B4DB] to-[#4dd0e1] bg-clip-text text-transparent">
              {{ provider?.name || 'Provider Name' }}
            </h2>
            <p class="text-sm text-gray-500">{{ provider?.email || 'No email available' }}</p>
          </div>
        </div>

        <button @click="showEditProfileForm = true"
          class="px-5 py-2 bg-gradient-to-r from-[#007EA7] to-[#00B4DB] text-white text-sm font-semibold rounded-full shadow hover:shadow-md transition-all">
          Edit Profile
        </button>
      </div>

      <div class="flex flex-col lg:flex-row gap-6">
        <div class="flex-1 bg-white rounded-2xl shadow-lg p-6 space-y-6">
          <h3 class="text-2xl font-bold text-[#007EA7] mb-4">Account Settings</h3>
          
          <section class="space-y-4">
            <div class="bg-gray-50 rounded-xl p-4">
              <p class="font-semibold text-[#007EA7] mb-2">Security</p>
              <button @click="showChangePasswordModal = true" class="text-sm text-gray-600 hover:underline">
                Update Password
              </button>
            </div>

            <div class="bg-gray-50 rounded-xl p-4">
              <p class="font-semibold text-[#007EA7] mb-2">Service Area</p>
              <p class="text-sm text-gray-600">{{ provider?.area || 'Not specified' }}</p>
            </div>
          </section>
        </div>

        <div class="flex-1 space-y-6">
          <section class="bg-white rounded-2xl shadow p-6 space-y-3">
            <button @click="showLogoutModal = true"
              class="w-full bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition">
              Logout
            </button>
          </section>
        </div>
      </div>

      <transition name="modal-fade">
        <div v-if="showEditProfileForm" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div class="bg-white w-full max-w-md p-6 rounded-xl shadow-xl">
            <h2 class="text-xl font-semibold mb-4">Edit Profile</h2>
            <form @submit.prevent="updateProfile">
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Name</label>
                <input v-model="editForm.name" type="text" class="w-full px-3 py-2 border rounded-lg" required />
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Area</label>
                <input v-model="editForm.area" type="text" class="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Profile Picture</label>
                <input type="file" @change="handleFileChange" class="w-full text-sm" accept="image/*" />
              </div>
              <div class="flex justify-end space-x-2 mt-6">
                <button type="button" @click="showEditProfileForm = false" class="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                <button type="submit" :disabled="isSubmitting" class="px-4 py-2 bg-[#007EA7] text-white rounded-lg flex items-center">
                  <span v-if="isSubmitting" class="loader mr-2 !w-4 !h-4"></span>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </transition>

     <transition name="modal-fade">
  <div v-if="showLogoutModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-8 rounded-2xl shadow-2xl text-center w-full max-w-sm border border-gray-100">
      <div class="mb-4 flex justify-center">
        <div class="p-3 bg-red-50 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>
      </div>
      
      <h2 class="text-xl font-bold text-gray-800 mb-2">Confirm Logout</h2>
      <p class="text-gray-500 mb-6">Are you sure you want to end your session?</p>
      
      <div class="flex flex-col gap-3">
        <button 
          @click="handleLogout" 
          :disabled="isLoggingOut"
          class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <span v-if="isLoggingOut" class="loader !w-4 !h-4 !border-white !border-t-transparent"></span>
          {{ isLoggingOut ? 'Logging out...' : 'Yes, Logout' }}
        </button>
        
        <button 
          @click="showLogoutModal = false" 
          :disabled="isLoggingOut"
          class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</transition>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { databases, storage, account, APPWRITE_CONFIG, ID } from '@/appwrite';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { logoutUser } from '@/stores/auth'

const router = useRouter();
const provider = ref(null);
const loading = ref(true);
const isSubmitting = ref(false);

const showEditProfileForm = ref(false);
const showLogoutModal = ref(false);
const showChangePasswordModal = ref(false);

const editForm = reactive({ name: '', area: '' });
const selectedFile = ref(null);
const defaultPic = require('@/assets/user.png');

// Computed Profile Image using Appwrite Storage
const profileImage = computed(() => {
  if (provider.value?.profilePic) {
    return storage.getFilePreview(APPWRITE_CONFIG.storageBucket, provider.value.profilePic);
  }
  return defaultPic;
});

const useDefaultImage = (e) => (e.target.src = defaultPic);

// Initialization: Fetch Provider from DB
const initDashboard = async () => {
  try {
    const userString = localStorage.getItem('user');
    if (!userString) throw new Error("No user found");
    
    const localUser = JSON.parse(userString);
    
    // Fetch fresh data from Appwrite Database
    const doc = await databases.getDocument(
      APPWRITE_CONFIG.dbId,
      APPWRITE_CONFIG.providersCollection,
      localUser.$id
    );
    
    provider.value = doc;
    editForm.name = doc.name;
    editForm.area = doc.area;
  } catch (err) {
    console.error(err);
    router.push('/login');
  } finally {
    loading.value = false;
  }
};

const handleFileChange = (e) => {
  selectedFile.value = e.target.files[0];
};

const updateProfile = async () => {
  isSubmitting.value = true;
  try {
    let profilePicId = provider.value.profilePic;

    // 1. If a new file is selected, upload to Appwrite Storage
    if (selectedFile.value) {
      const upload = await storage.createFile(
        APPWRITE_CONFIG.storageBucket,
        ID.unique(),
        selectedFile.value
      );
      profilePicId = upload.$id;
    }

    // 2. Update Database Document
    const updatedDoc = await databases.updateDocument(
      APPWRITE_CONFIG.dbId,
      APPWRITE_CONFIG.providersCollection,
      provider.value.$id,
      {
        name: editForm.name,
        area: editForm.area,
        profilePic: profilePicId
      }
    );

    provider.value = updatedDoc;
    localStorage.setItem('user', JSON.stringify(updatedDoc));
    toast.success('Profile updated successfully');
    showEditProfileForm.value = false;
  } catch (err) {
    toast.error('Failed to update profile');
    console.error(err);
  } finally {
    isSubmitting.value = false;
  }
};

const isLoggingOut = ref(false);

const handleLogout = async () => {
  isLoggingOut.value = true;
  try {
    // 1. Tell Appwrite to kill the session
    await account.deleteSession('current');
  } catch (err) {
    console.warn("Session already cleared on server");
  } finally {
    // 2. USE THE STORE'S LOGOUT FUNCTION
    // This is the "Magic" step. It updates the reactive state 
    // that your Navbar is watching.
    logoutUser(); 

    // 3. Manual cleanup just in case
    localStorage.clear();
    
    // 4. Redirect
    showLogoutModal.value = false;
    isLoggingOut.value = false;
    router.push('/homeboard');
  }
};

onMounted(initDashboard);
</script>

<style scoped>
.loader {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #007EA7;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>