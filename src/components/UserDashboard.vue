<template>
  <div v-if="isAuthenticated" class="min-h-screen bg-gray-50 py-4 px-2 sm:py-8 sm:px-4">
    <div class="max-w-5xl mx-auto bg-white/70 rounded-3xl shadow-xl p-6">

      <div v-if="user"
        class="relative bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-5 sm:p-8 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-8">

          <div class="relative group">
            <img :src="userImg"
              class="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[#00A8E8]/80 object-cover shadow-md"
              alt="Profile Picture" />
            <label
              class="absolute bottom-2 right-2 bg-[#00A8E8] text-white rounded-full p-2 cursor-pointer shadow-md hover:bg-[#007EA7] transition-all duration-200"
              title="Upload Photo">
              <input type="file" class="hidden" @change="handleProfileImageChange" />
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24"
                fill="currentColor">
                <path
                  d="M21 7h-3.17l-1.84-2H7.01L5.17 7H2a2 2 0 00-2 2v10a2 2 0 002 2h19a2 2 0 002-2V9a2 2 0 00-2-2zm-9 12a5 5 0 110-10 5 5 0 010 10z" />
              </svg>
            </label>
          </div>

          <div class="flex-1 text-center sm:text-left w-full">
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 truncate">
              {{ user.name }}
            </h2>
            <p class="text-gray-500 text-sm sm:text-base mb-3">ID: {{ user.$id }}</p>

            <div class="flex flex-col sm:flex-row sm:items-center sm:gap-5 text-sm text-gray-700">
              <div class="flex items-center justify-center sm:justify-start gap-2 truncate">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#00A8E8]" fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zM4 8l8 5 8-5v10H4V8z" />
                </svg>
                <span class="truncate">{{ user.email }}</span>
              </div>
            </div>
          </div>

          <div class="mt-6 flex justify-end gap-3">
            <button @click="showEditProfileForm = false"
              class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition shadow-sm">
              Cancel
            </button>

            <button @click="updateUserProfile"
              class="px-4 py-2 bg-[#00A8E8] hover:bg-[#007EA7] text-white rounded-lg font-medium shadow-md transition flex items-center gap-2">
              <span>Save Changes</span>
              <svg v-if="isLoading" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        class="flex overflow-x-auto no-scrollbar items-center gap-1 sm:gap-3 bg-white border-b border-gray-100 rounded-2xl p-2 mt-4 mb-3 shadow-sm">
        <button v-for="tab in ['bookings', 'history', 'address', 'settings']" :key="tab" @click="activeTab = tab"
          :class="[
            'px-4 py-2 font-medium transition-all rounded-lg text-sm sm:text-base whitespace-nowrap',
            activeTab === tab ? 'text-[#0083b0] bg-blue-50' : 'text-gray-600 hover:bg-gray-50'
          ]">
          {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
        </button>
      </div>

      <div v-if="isLoading" class="text-center py-10">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00A8E8] mx-auto"></div>
        <p class="mt-4 text-gray-500">Loading your data...</p>
      </div>

      <div v-else>

        <div v-if="activeTab === 'bookings'" class="space-y-6">
          <h3 class="text-xl font-bold text-gray-800">Ongoing Bookings</h3>
          <div v-if="bookings.length" class="space-y-4">
            <div v-for="booking in bookings" :key="booking.$id"
              class="flex flex-col sm:flex-row justify-between bg-white rounded-2xl shadow-sm p-5 border-l-4"
              :class="booking.status === 'Pending' ? 'border-yellow-400' : 'border-blue-400'">

              <div class="flex-1 space-y-2">
                <h4 class="text-lg font-bold text-gray-800">{{ booking.service }}</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
                  <p><span class="font-medium text-gray-400">Address:</span> {{ booking.address }}</p>
                  <p><span class="font-medium text-gray-400">Price:</span> ₹{{ booking.price }}</p>
                  <p><span class="font-medium text-gray-400">Status:</span>
                    <span :class="booking.status === 'Accepted' ? 'text-blue-600' : 'text-yellow-600'">{{ booking.status
                      }}</span>
                  </p>
                </div>
                <p class="text-xs text-gray-400">Booked on: {{ formatDate(booking.$createdAt) }}</p>
              </div>

              <div class="mt-4 sm:mt-0 flex items-center gap-3">
                <button @click="deleteBooking(booking.$id)"
                  class="px-4 py-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition">
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-10 text-gray-400 bg-gray-50 rounded-2xl border-2 border-dashed">
            No active bookings found.
          </div>
        </div>

        <div v-else-if="activeTab === 'history'" class="space-y-6">
          <h3 class="text-xl font-bold text-gray-800">Previous Services</h3>
          <div v-if="history.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="item in history" :key="item.$id" class="bg-white border rounded-2xl p-5 shadow-sm">
              <div class="flex justify-between mb-3">
                <h4 class="font-bold text-[#007EA7]">{{ item.service }}</h4>
                <span :class="item.status === 'Completed' ? 'text-green-600' : 'text-red-600'"
                  class="text-sm font-bold">
                  {{ item.status }}
                </span>
              </div>
              <p class="text-sm text-gray-500 mb-4">Completed on: {{ formatDate(item.$createdAt) }}</p>

              <div v-if="item.status === 'Completed'" class="border-t pt-4">
                <p class="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Your Review</p>
                <div class="flex gap-1 mb-2">
                  <template v-for="n in 5" :key="n">
                    <svg class="w-4 h-4" :class="n <= (item.rating || 0) ? 'text-yellow-400' : 'text-gray-200'"
                      fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.05 9.387c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.96z" />
                    </svg>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-10 text-gray-400">No service history yet.</div>
        </div>

        <div v-else-if="activeTab === 'address'" class="text-center py-10">
          <p class="text-gray-500">Address management coming soon to your profile.</p>
        </div>

        <div v-else-if="activeTab === 'settings'" class="space-y-6">
          <div class="bg-white p-6 rounded-2xl border">
            <h4 class="font-bold text-gray-800 mb-4">Account Actions</h4>
            <button @click="showLogoutModal = true"
              class="w-full sm:w-auto px-6 py-2 bg-red-500 text-white rounded-xl font-bold shadow-lg shadow-red-200 hover:bg-red-600 transition">
              Sign Out
            </button>
          </div>
        </div>

      </div>
    </div>

    <div v-if="showLogoutModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
        <h3 class="text-2xl font-bold text-gray-900 mb-2">Sign Out?</h3>
        <p class="text-gray-500 mb-6">Are you sure you want to exit your dashboard?</p>
        <div class="flex gap-3">
          <button @click="showLogoutModal = false" class="flex-1 py-3 bg-gray-100 rounded-2xl font-bold">Cancel</button>
          <button @click="handleLogout" class="flex-1 py-3 bg-red-500 text-white rounded-2xl font-bold">Logout</button>
        </div>
      </div>
    </div>

  </div>

  <div v-else class="flex items-center justify-center min-h-screen text-gray-400">
    <div class="text-center">
      <div class="animate-pulse mb-4 text-[#00A8E8] font-bold">Authenticating...</div>
      <p>Redirecting to login if session is expired.</p>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// Import your Appwrite configuration
import { account, databases, client } from '@/appwrite'; // Ensure this path is correct
import { Query } from 'appwrite';
import userAvatar from '@/assets/user.png';

dayjs.extend(relativeTime);

const router = useRouter();
const userImg = userAvatar;

// --- State Management ---
const user = ref(null);
const isAuthenticated = ref(false);
const isLoading = ref(true);
const activeTab = ref(localStorage.getItem("activeTab") || "bookings");
const bookings = ref([]);
const history = ref([]);
const showLogoutModal = ref(false);
const showEditProfileForm = ref(false);

// Appwrite Constants 
const DB_ID = "69bc1ae900174fd0a3c6";
const BOOKINGS_COLLECTION = "bookings";

// --- Form State ---
const editForm = ref({ name: '', email: '', phone: '' });

// --- Watchers ---
watch(activeTab, val => localStorage.setItem("activeTab", val));

// --- Helpers ---
const isValidDate = d => d && !isNaN(new Date(d).getTime());
const formatDate = d => isValidDate(d) ? dayjs(d).format('DD MMM YYYY, hh:mm A') : 'N/A';

// --- Appwrite Logic ---

const fetchBookingsData = async () => {
  try {
    const res = await databases.listDocuments(
      DB_ID,
      BOOKINGS_COLLECTION,
      [
        Query.equal('userId', user.value.$id),
        Query.orderDesc('$createdAt')
      ]
    );

    // Separate into active bookings and history based on status
    const allDocs = res.documents;
    bookings.value = allDocs.filter(doc => ['Pending', 'Accepted'].includes(doc.status));
    history.value = allDocs.filter(doc => ['Completed', 'Rejected', 'Cancelled'].includes(doc.status));
  } catch (err) {
    console.error("Fetch Error:", err);
    toast.error("Failed to load bookings");
  }
};

const updateUserProfile = async () => {
  try {
    isLoading.value = true;
    await account.updateName(editForm.value.name);
    // Note: Updating email/phone in Appwrite requires verification/separate methods
    user.value.name = editForm.value.name;
    showEditProfileForm.value = false;
    toast.success("Profile updated!");
  } catch (err) {
    toast.error("Update failed");
  } finally {
    isLoading.value = false;
  }
};

const handleLogout = async () => {
  try {
    await account.deleteSession('current');
    isAuthenticated.value = false;
    router.push('/login');
  } catch (err) {
    toast.error("Logout failed");
  }
};

// --- Lifecycle & Realtime ---
let unsubscribe;

onMounted(async () => {
  try {
    // 1. Authenticate
    const appwriteUser = await account.get();
    user.value = appwriteUser;
    isAuthenticated.value = true;

    // 2. Fetch Initial Data
    await fetchBookingsData();

    // 3. Setup Appwrite Realtime (Replaces Socket.io)
    const channel = `databases.${DB_ID}.collections.${BOOKINGS_COLLECTION}.documents`;
    unsubscribe = client.subscribe(channel, response => {
      // Check if the change belongs to the current user
      if (response.payload.userId === user.value.$id) {
        const status = response.payload.status;

        if (response.events.includes(`${channel}.*.update`)) {
          toast.info(`Booking Status Updated: ${status}`);
          fetchBookingsData(); // Refresh list to move items between tabs
        }
      }
    });

    isLoading.value = false;
  } catch (err) {
    console.error("Auth failed:", err);
    router.push('/login');
  }
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe(); // Clean up Realtime listener
});
</script>

<style scoped>
/* Responsive Images */
@media (max-width: 640px) {
  img {
    width: 5.5rem !important;
    height: 5.5rem !important;
  }
}

/* No Scrollbar */
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Animations */
.fade-zoom-enter-active,
.fade-zoom-leave-active,
.fade-tab-enter-active,
.fade-tab-leave-active,
.fade-enter-active,
.fade-leave-active,
.scale-fade-enter-active,
.scale-fade-leave-active {
  transition: all 0.3s ease;
}

.fade-zoom-enter-from,
.fade-zoom-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.fade-tab-enter-from,
.fade-tab-leave-to,
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-fade-enter-from,
.scale-fade-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}

/* Inputs */
.input-edit {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem;
  outline: none;
  transition: box-shadow 0.2s, border-color 0.2s;
}

.input-edit:focus {
  border-color: #00A8E8;
  box-shadow: 0 0 0 2px #00A8E8;
}

/* Buttons */
.btn-blue,
.btn-green,
.btn-gray,
.btn-red {
  border-radius: 0.375rem;
  color: #fff;
  transition: background-color 0.2s;
}

.btn-blue,
.btn-red {
  padding: 0.5rem 1rem;
}

.btn-green,
.btn-gray {
  padding: 0.25rem 0.75rem;
}

.btn-gray {
  color: #1f2937;
}

/* Button Colors & Hover */
.btn-blue {
  background: #007EA7;
}

.btn-blue:hover {
  background: #005f78;
}

.btn-green {
  background: #22c55e;
}

.btn-green:hover {
  background: #16a34a;
}

.btn-gray {
  background: #d1d5db;
}

.btn-gray:hover {
  background: #9ca3af;
}

.btn-red {
  background: #ef4444;
}

.btn-red:hover {
  background: #dc2626;
}
</style>
