<template>
  <!-- Authenticated User Dashboard -->
  <div v-if="isAuthenticated" class="min-h-screen bg-gray-50 px-4 py-8">
    <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">

      <!-- Profile Section -->

      <div v-if="user"
        class="max-w-2xl mx-auto bg-[#f1f2f3] hover:bg-[#eeeff0] p-8 rounded-2xl shadow-lg mt-6 transition-all duration-300 border border-gray-200 backdrop-blur-sm">
        <!-- Edit Button  -->
        <div class="flex justify-end">
          <button @click="showEditProfileForm = !showEditProfileForm"
            class="flex items-center gap-1 text-blue-500 hover:text-blue-700">
            <!-- Pencil Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span>Edit</span>
          </button>
        </div>

        <!-- Profile Info -->
        <div class="flex items-center space-x-4 border-b pb-4 mb-6">
          <!-- Profile Image with Upload -->
          <div class="relative group">
            <img
              :src="user.profilePic ? `http://localhost:5000/uploads/${user.profilePic}` : require('@/assets/user.png')"
              alt="User" class="w-20 h-20 rounded-full border-2 border-[#00A8E8] object-cover" />

            <!-- Upload Icon -->
            <label
              class="absolute bottom-0 right-0 bg-[#007EA7] text-white rounded-full p-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              title="Change Photo">
              <input type="file" class="hidden" @change="handleProfileImageChange" accept="image/*" />
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 20h14v-2H5v2zm7-18C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 
        18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
            </label>
          </div>

          <!-- User Info -->
          <div>
            <h2 class="text-2xl font-bold text-[#007EA7]">{{ user?.name || 'Guest' }}</h2>
            <p class="text-gray-500">{{ user?.email || 'No email' }}</p>
          </div>
        </div>

        <!-- Edit Profile Form -->
        <div v-if="showEditProfileForm">
          <form @submit.prevent="updateUserProfile">
            <div class="mb-4">
              <label class="block text-gray-600">Full Name</label>
              <input v-model="user.name" type="text" class="w-full mt-1 p-2 border rounded-md" />
            </div>

            <div class="mb-4">
              <label class="block text-gray-600">Phone</label>
              <input v-model="user.phone" type="text" class="w-full mt-1 p-2 border rounded-md" />
            </div>

            <div class="mb-4">
              <label class="block text-gray-600">Bio</label>
              <textarea v-model="user.bio" class="w-full mt-1 p-2 border rounded-md"></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-gray-600">City</label>
              <input v-model="user.city" type="text" class="w-full mt-1 p-2 border rounded-md" />
            </div>

            <div class="mb-4">
              <label class="block text-gray-600">Pincode</label>
              <input v-model="user.pincode" type="text" class="w-full mt-1 p-2 border rounded-md" />
            </div>

            <button type="submit" class="bg-[#00A8E8] hover:bg-[#007EA7] text-white px-4 py-2 rounded-md">
              Save Changes
            </button>
          </form>
        </div>
      </div>


      <!-- Navigation Tabs -->
      <div class="flex flex-wrap gap-2 border-b pb-2 mb-4 text-sm md:text-base mt-6">
        <button v-for="tab in tabs" :key="tab" class="px-4 py-2 rounded-t-lg font-semibold"
          :class="activeTab === tab ? activeClass : inactiveClass" @click="activeTab = tab">
          {{ formatTab(tab) }}
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-8 text-[#007EA7] font-semibold">Loading...</div>

      <!-- Tab Contents -->

      <div v-else>

        <!-- Bookings Tab -->
        <div v-if="activeTab === 'bookings'" class="space-y-2">
          <h3 class="text-lg font-semibold text-[#007EA7]">My Bookings</h3>

          <div v-if="bookings.length" class="space-y-2">
            <div v-for="(booking, index) in bookings" :key="index" class="border rounded-lg p-3 shadow-sm relative">
              <!-- Edit Mode -->
              <div v-if="editingId === booking._id">
                <input v-model="editableBooking.service" placeholder="Service" class="border rounded p-1 w-full mb-1" />
                <input v-model="editableBooking.name" placeholder="Name" class="border rounded p-1 w-full mb-1" />
                <input v-model="editableBooking.contact" placeholder="Contact" class="border rounded p-1 w-full mb-1" />
                <input v-model="editableBooking.address" placeholder="Address" class="border rounded p-1 w-full mb-1" />

                <div class="flex gap-2 mt-2">
                  <button @click="saveEdit(booking._id)"
                    class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    Save
                  </button>
                  <button @click="cancelEdit" class="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500">
                    Cancel
                  </button>
                </div>
              </div>

              <!-- Display Mode -->
              <div v-else>
                <h4 class="font-semibold text-[#007EA7]">{{ booking.service }}</h4>
                <p class="text-sm text-gray-500">Name: {{ booking.name }}</p>
                <p class="text-sm text-gray-500">Contact: {{ booking.contact }}</p>
                <p class="text-sm text-gray-500">Address: {{ booking.address }}</p>
                <p class="text-xs text-gray-400">Booked on: {{ new Date(booking.createdAt).toLocaleString() }}</p>

                <!-- Status -->
                <div class="mt-2">
                  <span v-if="booking.status === 'Completed'" class="text-green-600 font-medium text-sm">
                    Completed
                  </span>
                  <button v-else @click="markAsCompleted(booking._id)"
                    class="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600">
                    Mark as Completed
                  </button>
                </div>
              </div>

              <!-- Edit/Delete Buttons -->
              <div class="absolute top-2 right-2 flex space-x-2">
                <button @click="startEdit(booking)" class="text-blue-600 hover:text-blue-800">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="deleteBooking(booking._id)" class="text-red-600 hover:text-red-800">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>

          <p v-else class="text-gray-500">No bookings found.</p>
        </div>



        <!-- History Tab -->
        <div v-else-if="activeTab === 'history'" class="space-y-2">
          <h3 class="text-lg font-semibold text-[#007EA7]">Previous Services</h3>
          <div v-if="history.length" class="space-y-2">
            <div v-for="(item, index) in history" :key="index"
              class="border rounded-lg p-3 flex justify-between items-center shadow-sm">
              <div>
                <h4 class="font-semibold text-[#007EA7]">{{ item.service }}</h4>
                <p class="text-sm text-gray-500">{{ item.date }}</p>
              </div>
              <span class="text-sm font-medium text-green-600">{{ item.status }}</span>
            </div>
          </div>
          <p v-else class="text-gray-500">No service history available.</p>
        </div>

        <!-- Address Tab -->
        <div v-else-if="activeTab === 'address'" class="space-y-4">
          <h3 class="text-lg font-semibold text-[#007EA7]">Saved Addresses</h3>

          <!-- Add Address Form -->
          <div v-if="showAddressForm" class="bg-gray-100 p-4 rounded-lg space-y-3">
            <input v-model="newAddress.pincode" type="text" placeholder="Pincode"
              class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]" />
            <input v-model="newAddress.city" type="text" placeholder="City"
              class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]" />
            <textarea v-model="newAddress.address" rows="2" placeholder="Full Address"
              class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"></textarea>
            <div class="flex gap-3">
              <button @click="saveAddress"
                class="px-4 py-2 bg-[#007EA7] text-white rounded hover:bg-[#005f78]">Save</button>
              <button @click="showAddressForm = false"
                class="px-4 py-2 border rounded text-[#007EA7] hover:bg-gray-200">Cancel</button>
            </div>
          </div>

          <!-- Add New Address Button -->
          <button v-else @click="showAddressForm = true"
            class="px-4 py-2 bg-[#007EA7] text-white rounded hover:bg-[#005f78]">
            Add New Address
          </button>

          <!-- Saved Addresses List -->
          <div v-if="savedAddresses.length" class="space-y-3">
            <div v-for="(addr, index) in savedAddresses" :key="index"
              class="border p-4 rounded bg-white shadow relative">
              <p><span class="font-medium text-[#007EA7]">Pincode:</span> {{ addr.pincode }}</p>
              <p><span class="font-medium text-[#007EA7]">City:</span> {{ addr.city }}</p>
              <p><span class="font-medium text-[#007EA7]">Address:</span> {{ addr.address }}</p>
              <button @click="deleteAddress(index)"
                class="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm">Delete</button>
            </div>
          </div>
          <p v-else class="text-gray-500">No saved addresses yet.</p>
        </div>

        <!-- Settings Tab -->
        <div v-else-if="activeTab === 'settings'" class="space-y-6">
          <h3 class="text-lg font-semibold text-[#007EA7]">Account Settings</h3>

          <div>
            <div @click="showNotificationPreferences = !showNotificationPreferences"
              class="flex items-center justify-between cursor-pointer select-none border-b pb-2 mb-2">
              <h4 class="font-semibold text-gray-700">Notifications</h4>
            </div>

            <div v-if="showNotificationPreferences" class="mt-4 space-y-4">
              <div v-for="(value, type) in notificationSettings" :key="type"
                class="flex items-center justify-between border-b py-2">
                <span class="text-gray-600 capitalize">{{ type }} Notifications</span>
                <label class="inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="notificationSettings[type]" class="sr-only peer" />
                  <div
                    class="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#007EA7] relative transition-colors duration-300">
                    <div
                      class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-5">
                    </div>
                  </div>
                </label>
              </div>

              <button @click="updateNotificationSettings"
                class="mt-4 px-4 py-2 bg-[#007EA7] text-white rounded hover:bg-[#005f78]"
                :disabled="isSavingNotifications">
                {{ isSavingNotifications ? 'Saving...' : 'Save Preferences' }}
              </button>
            </div>
          </div>

          <!-- Password Toggle -->
          <div> <button @click="showPasswordForm = !showPasswordForm"
              class="px-4 py-2 bg-[#007EA7] text-white rounded hover:bg-[#005f78] transition duration-300">
              {{ showPasswordForm ? 'Cancel' : 'Change Password' }}
            </button>
          </div>



          <!-- Password Form -->
          <div v-if="showPasswordForm" class="bg-gray-100 p-4 rounded-lg space-y-3">
            <input v-model="passwordForm.current" type="password" placeholder="Current Password"
              class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]" />
            <input v-model="passwordForm.new" type="password" placeholder="New Password"
              class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]" />
            <input v-model="passwordForm.confirm" type="password" placeholder="Confirm New Password"
              class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]" />
            <div class="flex justify-between items-center">
              <button @click="changePassword" :disabled="isChangingPassword"
                class="px-4 py-2 bg-[#007EA7] text-white rounded hover:bg-[#005f78] disabled:opacity-50">
                {{ isChangingPassword ? 'Changing...' : 'Submit' }}
              </button>
              <a href="/forgot-password" class="text-sm text-[#007EA7] hover:underline">Forgot Password?</a>
            </div>
          </div>


          <!-- Logout -->
          <div>
            <button class="mt-4 px-6 py-2 bg-[#007EA7] text-white rounded-lg hover:bg-[#005f78]"
              @click="showLogoutModal = true">Logout</button>

          </div>

          <!-- Logout Modal -->
          <transition name="fade-zoom">
            <div v-if="showLogoutModal"
              class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div class="bg-white p-6 rounded-lg shadow-xl w-80">
                <h2 class="text-lg font-semibold text-gray-800 mb-3">Confirm Logout</h2>
                <p class="text-gray-600 mb-5">Are you sure you want to logout?</p>
                <div class="flex justify-end space-x-3">
                  <button @click="showLogoutModal = false" class="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                  <button @click="confirmLogout" class="px-4 py-2 bg-red-500 text-white rounded">Logout</button>
                </div>
              </div>
            </div>
          </transition>
        </div>

      </div>
    </div>
  </div>

  <!-- Redirect Message -->
  <div v-else class="text-center mt-10 text-gray-500">Redirecting to login...</div>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { auth } from '@/stores/auth';

const router = useRouter();

const isAuthenticated = ref(false);
const isLoading = ref(true);
const showLogoutModal = ref(false);
const showEditProfileForm = ref(false);

const previewImage = ref(null); // for temporary image preview

const tabs = ['bookings', 'history', 'address', 'settings'];
const activeTab = ref('bookings');
const activeClass = 'text-[#007EA7] border-b-2 border-[#00A8E8]';
const inactiveClass = 'text-gray-500 hover:text-[#00A8E8]';

const user = ref({ name: '', email: '', phone: '', bio: '', profilePic: '' });
const socket = ref(null);
const bookings = ref([]);
const editingId = ref(null);
const editableBooking = ref({ service: '', name: '', contact: '', address: '' });

const history = ref([]);

const showAddressForm = ref(false);
const savedAddresses = ref(JSON.parse(localStorage.getItem('addresses')) || []);
const newAddress = ref({ pincode: '', city: '', address: '' });

const showPasswordForm = ref(false);
const isChangingPassword = ref(false);
const passwordForm = ref({ current: '', new: '', confirm: '' });

const notificationSettings = ref({ email: true, sms: false, push: true });
const isSavingNotifications = ref(false);
const showNotificationPreferences = ref(false);

const formatTab = (tab) => tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ');

// Fetch user profile
const getUserProfile = async () => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get('http://localhost:5000/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
    user.value = res.data;
    auth.user = res.data;
    localStorage.setItem("user", JSON.stringify(res.data));
  } catch (err) {
    toast.error("Failed to load user data");
  }
};

// Upload & preview profile image
const handleProfileImageChange = async (event) => {
  const file = event.target.files[0];
  if (!file || !file.type.startsWith('image/')) {
    toast.error("Please select a valid image file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.value = e.target.result;
  };
  reader.readAsDataURL(file);

  const formData = new FormData();
  formData.append('profilePic', file); 


  try {
    const token = localStorage.getItem('token');
    const res = await axios.put('http://localhost:5000/api/user/profile/picture', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    const timestampedProfilePic = `${res.data.profilePic}?t=${Date.now()}`;
    user.value.profilePic = timestampedProfilePic;
    auth.user.profilePic = timestampedProfilePic;

    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser) {
      existingUser.profilePic = timestampedProfilePic;
      localStorage.setItem("user", JSON.stringify(existingUser));
    }

    toast.success("Profile picture updated!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to upload profile picture.");
  }
};

// Update profile info
const updateUserProfile = async () => {
  const token = localStorage.getItem('token');
  try {
    const { name, phone, bio } = user.value;
    const res = await axios.put(
      'http://localhost:5000/api/user/profile',
      { name, phone, bio },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    toast.success(res.data.message || "Profile updated successfully!");
    showEditProfileForm.value = false;
  } catch (error) {
    toast.error("Failed to update profile.");
  }
};

// Bookings
const fetchBookings = async () => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get('http://localhost:5000/api/bookings', {
      headers: { Authorization: `Bearer ${token}` },
    });
    bookings.value = res.data;
  } catch {
    toast.error("Failed to load bookings");
  }
};

const startEdit = (booking) => {
  editingId.value = booking._id;
  editableBooking.value = { ...booking };
};

const cancelEdit = () => {
  editingId.value = null;
  editableBooking.value = { service: '', name: '', contact: '', address: '' };
};

const saveEdit = async (id) => {
  try {
    const res = await axios.put(`http://localhost:5000/api/bookings/${id}`, editableBooking.value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const index = bookings.value.findIndex(b => b._id === id);
    if (index !== -1) bookings.value[index] = res.data;
    editingId.value = null;
  } catch (err) {
    console.error(err);
    toast.error('Update failed');
  }
};

const markAsCompleted = async (bookingId) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/bookings/mark-completed/${bookingId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    const updatedBooking = res.data.booking;

    history.value.push({
      service: updatedBooking.service,
      date: new Date(updatedBooking.updatedAt).toLocaleDateString(),
      status: updatedBooking.status,
    });

    bookings.value = bookings.value.filter(b => b._id !== bookingId);

    toast.success("Booking marked as completed");
  } catch (err) {
    console.error(err);
    toast.error("Failed to update booking status");
  }
};

const deleteBooking = async (bookingId) => {
  try {
    await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);
    bookings.value = bookings.value.filter(b => b._id !== bookingId);
    toast.success('Booking deleted successfully');
  } catch (err) {
    toast.error('Failed to delete booking');
    console.error(err);
  }
};

const fetchHistory = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/bookings/history', {
      headers: { Authorization: `Bearer ${token}` },
    });
    history.value = res.data;
  } catch (err) {
    console.error(err);
    toast.error("Failed to load service history.");
  }
};

// Notification Settings
const fetchNotificationSettings = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/user/notifications', {
      headers: { Authorization: `Bearer ${token}` },
    });
    notificationSettings.value = res.data;
  } catch (err) {
    console.error('Failed to fetch notification settings:', err);
    toast.error("Failed to load notification settings.");
  }
};

const updateNotificationSettings = async () => {
  isSavingNotifications.value = true;
  try {
    const token = localStorage.getItem('token');
    const res = await axios.put(
      'http://localhost:5000/api/user/notifications',
      notificationSettings.value,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    toast.success(res.data.message || "Notification preferences updated.");
  } catch (err) {
    console.error('Failed to update settings:', err);
    toast.error("Could not update notification settings.");
  } finally {
    isSavingNotifications.value = false;
  }
};

// Address functions
const saveAddress = () => {
  const { pincode, city, address } = newAddress.value;
  if (pincode && city && address) {
    savedAddresses.value.push({ ...newAddress.value });
    localStorage.setItem('addresses', JSON.stringify(savedAddresses.value));
    newAddress.value = { pincode: '', city: '', address: '' };
    showAddressForm.value = false;
  } else {
    toast.error('Please fill in all fields.');
  }
};

const deleteAddress = (index) => {
  savedAddresses.value.splice(index, 1);
  localStorage.setItem('addresses', JSON.stringify(savedAddresses.value));
  toast.success("Address deleted.");
};

// Password change
const changePassword = async () => {
  const { current, new: newPass, confirm } = passwordForm.value;
  if (!current || !newPass || !confirm) return toast.error("All fields required");
  if (newPass !== confirm) return toast.error("Passwords do not match");

  isChangingPassword.value = true;
  try {
    const token = localStorage.getItem('token');
    const res = await axios.post('http://localhost:5000/api/user/change-password', {
      currentPassword: current,
      newPassword: newPass,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success(res.data.message || "Password updated!");
    showPasswordForm.value = false;
    passwordForm.value = { current: '', new: '', confirm: '' };
  } catch (err) {
    toast.error(err.response?.data?.message || "Error changing password");
  } finally {
    isChangingPassword.value = false;
  }
};

// Logout
const logout = () => {
  localStorage.removeItem('user');
  auth.user = null;
  user.value = { name: '', email: '', phone: '', bio: '', profilePic: '' };
  router.push('/homeboard');
};

const confirmLogout = () => {
  logout();
  showLogoutModal.value = false;
};

// Initial load
onMounted(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    toast.error("Please login first");
    router.push('/login');
    return;
  }
   const localUser = JSON.parse(localStorage.getItem('user'));
  if (localUser?.role === 'provider') {
    router.push('/provider/profile');
    return;
  }

  isAuthenticated.value = true;

  Promise.all([
    getUserProfile(),
    fetchBookings(),
    fetchHistory(),
    fetchNotificationSettings(),
  ]).then(() => {
    
    socket.value = io('http://localhost:5000', {
  auth: {
    token,
  },
  withCredentials: true,
  transports: ['websocket'],
});


    socket.value.emit('joinRoom', { userId: user.value._id });

 
    socket.value.on('orderAccepted', (data) => {
      toast.info(`Your order has been accepted by ${data.providerName}`);
      fetchBookings(); // Refresh bookings if needed
    });
    
  socket.value.on('orderRejected', (data) => {
      toast.info(`Your booking has been rejected by ${data.providerName}`);
      fetchBookings(); // Refresh bookings if needed
    });

 

  }).finally(() => {
    isLoading.value = false;
  });

  if (window.location.hash === '#bookings') {
    activeTab.value = 'bookings';
  }
});

</script>




<style scoped>
.fade-zoom-enter-active,
.fade-zoom-leave-active {
  transition: all 0.3s ease;
}

.fade-zoom-enter-from,
.fade-zoom-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
