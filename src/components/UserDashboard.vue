<template>
  <!-- Authenticated Dashboard Wrapper -->
  <div v-if="isAuthenticated" class="min-h-screen bg-gradient-to-b from-[#F0F9FF] to-white py-8 px-4">
    <div class="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-6">

      <!-- User Profile Card -->
      <div v-if="user"
        class="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 max-w-2xl mx-auto">

        <!-- Profile Section -->
        <div class="flex flex-col sm:flex-row items-center gap-6">

          <!-- Profile Picture with Edit Button -->
          <div class="relative">
            <img :src="user.profilePic ? `http://localhost:5000/uploads/${user.profilePic}` : userImg"
              class="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-[#00A8E8] object-cover shadow-md" />
            <label
              class="absolute bottom-1 right-1 bg-[#00A8E8] text-white rounded-full p-2 cursor-pointer hover:bg-[#007EA7] transition"
              title="Upload Photo">
              <input type="file" class="hidden" @change="handleProfileImageChange" />
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 5c-3.86 0-7 3.14-7 7 0 3.31 2.69 6 6 6 3.86 0 7-3.14 7-7 0-3.31-2.69-6-6-6zm0-2c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z" />
              </svg>
            </label>
          </div>

          <!-- User Info -->
          <div class="flex-1 text-center sm:text-left">
            <h2
              class="text-2xl font-bold inline-block bg-gradient-to-r from-[#007EA7] via-[#00B4DB] to-[#4dd0e1] bg-clip-text text-transparent break-words">
              {{ user.name }}
            </h2>

            <div class="mt-2 space-y-1">

              <!-- Email -->
              <div class="flex items-center justify-center sm:justify-start gap-2 text-gray-600 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2-8 5-8-5h16zM4 18V8l8 5 8-5v10H4z" />
                </svg>
                <span>{{ user.email }}</span>
              </div>

              <!-- Phone -->
              <div v-if="user.phone"
                class="flex items-center justify-center sm:justify-start gap-2 text-gray-600 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.1-.2 11.05 11.05 0 003.49.55 1 1 0 011 1v3.46a1 1 0 01-1 1C10.4 21 3 13.6 3 5a1 1 0 011-1h3.46a1 1 0 011 1c0 1.2.18 2.38.55 3.47a1 1 0 01-.2 1.1l-2.19 2.22z" />
                </svg>
                <span>{{ user.phone }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit Button -->
        <div class="flex justify-end mt-4">
          <button @click="showEditProfileForm = true"
            class="px-4 py-2 bg-gradient-to-r from-[#007EA7] to-[#00B4DB] text-white rounded-lg text-sm font-medium shadow-sm transition flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm14.71-9.04a1 1 0 010 1.41l-1.83 1.83-3.75-3.75 1.83-1.83a1 1 0 011.41 0l2.34 2.34z" />
            </svg>
            Edit
          </button>
        </div>

        <!-- Edit Profile Modal -->
        <transition name="fade">
          <div v-if="showEditProfileForm"
            class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div class="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">

              <!-- Header -->
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-gray-800">Edit Profile</h3>
                <button @click="showEditProfileForm = false" class="text-gray-400 hover:text-gray-600">✕</button>
              </div>

              <!-- Form -->
              <div class="space-y-4">
                <div v-for="(field, key) in editableFields" :key="key">
                  <label class="block text-sm font-medium text-gray-600 mb-1">{{ field.label }}</label>
                  <input v-model="user[key]" :type="field.type || 'text'"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8E8] focus:outline-none shadow-sm" />
                </div>
              </div>

              <!-- Actions -->
              <div class="mt-5 flex justify-end gap-2">
                <button @click="showEditProfileForm = false"
                  class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium">
                  Cancel
                </button>
                <button @click="updateUserProfile"
                  class="px-4 py-2 bg-[#00A8E8] hover:bg-[#007EA7] text-white rounded-lg text-sm font-medium shadow-sm flex items-center gap-2">
                  <span>Save</span>
                  <svg v-if="loading" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Navigation Tabs -->
      <div class="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-3 mb-6">
        <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" :class="[
          ' px-5 py-2 font-medium transition-all duration-200 rounded-t-lg border-b-2',
          activeTab === tab
            ? 'text-[#00A8E8] border-[#00A8E8]  shadow-sm'
            : 'text-gray-600 border-transparent hover:text-[#00A8E8] '
        ]">
          {{ formatTab(tab) }}
        </button>
      </div>
      <!-- Loading -->
      <div v-if="isLoading" class="text-center text-[#007EA7] font-semibold py-8">Loading...</div>

      <!-- Content -->
      <div v-else>
        <transition name="fade-slide " mode="out-in">
          <div :key="activeTab"  class="w-full bg-white rounded-2xl shadow-md p-6 transition-all">
            <!-- Bookings Tab -->
            <div v-if="activeTab === 'bookings'" class="space-y-6">
              <h3 class="text-xl font-semibold text-[#007EA7]">My Bookings</h3>
              <div v-if="bookings.length" class="grid md:grid-cols-2 gap-4">
                <div v-for="booking in bookings" :key="booking._id"
                  class="bg-white p-5 rounded-xl shadow-lg border relative transition hover:shadow-xl">
                  <template v-if="editingId === booking._id">
                    <input v-model="editableBooking.service" placeholder="Service" class="input-edit mb-2" />
                    <input v-model="editableBooking.name" placeholder="Name" class="input-edit mb-2" />
                    <input v-model="editableBooking.contact" placeholder="Contact" class="input-edit mb-2" />
                    <input v-model="editableBooking.address" placeholder="Address" class="input-edit mb-2" />
                    <div class="flex justify-end gap-2 mt-2">
                      <button @click="saveEdit(booking._id)" class="btn-green">Save</button>
                      <button @click="cancelEdit" class="btn-gray">Cancel</button>
                    </div>
                  </template>
                  <template v-else>
                    <h4 class="font-semibold text-[#007EA7] text-lg">{{ booking.service }}</h4>
                    <p class="text-sm text-gray-500">Name: {{ booking.name }}</p>
                    <p class="text-sm text-gray-500">Contact: {{ booking.contact }}</p>
                    <p class="text-sm text-gray-500">Address: {{ booking.address }}</p>
                    <p class="text-xs text-gray-400">Booked: {{ new Date(booking.createdAt).toLocaleString() }}</p>
                    <div class="mt-2">
                      <span v-if="booking.status === 'Completed'"
                        class="text-green-600 font-medium text-sm">Completed</span>
                      <button v-else @click="markAsCompleted(booking._id)"
                        class="text-sm px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded">
                        Mark as Completed
                      </button>
                    </div>
                  </template>
                  <div class="absolute top-2 right-2 flex gap-2 text-sm">
                    <button @click="startEdit(booking)" class="text-blue-500 hover:text-blue-700"><i
                        class="fas fa-edit"></i></button>
                    <button @click="deleteBooking(booking._id)" class="text-red-500 hover:text-red-700"><i
                        class="fas fa-trash"></i></button>
                  </div>
                </div>
              </div>
              <p v-else class="text-gray-500">No bookings found.</p>
            </div>
            <!-- History Tab -->
            <div v-else-if="activeTab === 'history'" class="space-y-6">
              <h3 class="text-xl font-semibold text-[#007EA7]">Previous Services</h3>
              <div v-if="history.length" class="grid md:grid-cols-2 gap-4">
                <div v-for="item in history" :key="item._id"
                  class="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md p-4 transition">
                  <div class="flex justify-between items-start">
                    <div class="space-y-1">
                      <h4 class="text-lg text-[#007EA7] font-bold">{{ item.service }}</h4>
                      <p class="text-gray-500 text-sm">{{ formatDate(item.date) }}</p>
                    </div>
                    <span :class="[
                      'text-sm font-semibold px-3 py-1 rounded-full',
                      item.status === 'Completed' ? 'bg-green-100 text-green-700'
                        : item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-600'
                    ]">{{ item.status }}</span>
                  </div>
                </div>
              </div>
              <p v-else class="text-gray-500">No service history available.</p>
            </div>
            <!-- Address Tab -->
            <div v-else-if="activeTab === 'address'" class="space-y-6">
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-semibold text-[#007EA7]">Saved Addresses</h3>
                <span @click="showAddressForm = !showAddressForm"
                  class="text-sm text-[#007EA7] hover:text-[#005f7f] font-medium cursor-pointer">
                  {{ showAddressForm ? 'Close' : 'Add New Address' }}
                </span>
              </div>

              <!-- Address Form -->
              <transition name="fade">
                <div v-if="showAddressForm" class="bg-gray-50 border p-4 rounded-xl space-y-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input v-model="newAddress.pincode" placeholder="Pincode" class="input-edit" />
                    <input v-model="newAddress.city" placeholder="City" class="input-edit" />
                  </div>
                  <textarea v-model="newAddress.address" placeholder="Full Address" rows="2"
                    class="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"></textarea>
                  <div class="flex gap-3">
                    <button @click="saveAddress"
                      class="bg-[#007EA7] hover:bg-[#005f7f] text-white px-4 py-2 rounded-md transition">
                      Save
                    </button>
                    <button @click="showAddressForm = false"
                      class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md transition">
                      Cancel
                    </button>
                  </div>
                </div>
              </transition>

              <!-- Address List -->
              <div v-if="savedAddresses.length" class="grid md:grid-cols-2 gap-4">
                <div v-for="addr in savedAddresses" :key="addr.id || addr.pincode"
                  class="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition relative">
                  <div class="space-y-1 text-sm text-gray-700">
                    <p><strong class="text-[#007EA7]">Pincode:</strong> {{ addr.pincode }}</p>
                    <p><strong class="text-[#007EA7]">City:</strong> {{ addr.city }}</p>
                    <p><strong class="text-[#007EA7]">Address:</strong> {{ addr.address }}</p>
                  </div>
                  <button @click="deleteAddress(savedAddresses.indexOf(addr))"
                    class="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-semibold">
                    ✕
                  </button>
                </div>
              </div>
              <p v-else class="text-gray-500">No saved addresses found.</p>
            </div>
            <!-- Settings Tab -->
            <div v-else-if="activeTab === 'settings'" class="space-y-6">
              <h3 class="text-xl font-semibold text-[#007EA7]">Account Settings</h3>

              <!-- Notification Preferences -->
              <h4 class="font-semibold text-gray-700 cursor-pointer hover:text-[#007EA7] transition"
                @click="showNotificationPreferences = !showNotificationPreferences">
                Notification Preferences
              </h4>
              <div v-if="showNotificationPreferences" class="mt-4 space-y-3">
                <div v-for="(value, type) in notificationSettings" :key="type"
                  class="flex justify-between items-center">
                  <span class="capitalize text-sm text-gray-600">{{ type }}</span>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="notificationSettings[type]" class="sr-only peer" />
                    <div class="w-11 h-6 bg-gray-300 peer-checked:bg-[#007EA7] rounded-full transition-all">
                      <div
                        class="absolute w-4 h-4 bg-white rounded-full left-1 top-1 transition peer-checked:translate-x-5">
                      </div>
                    </div>
                  </label>
                </div>
                <button @click="updateNotificationSettings" :disabled="isSavingNotifications" class="btn-blue mt-2">
                  {{ isSavingNotifications ? 'Saving...' : 'Save Preferences' }}
                </button>
              </div>

              <!-- Change Password -->
              <div>
                <h4 class="font-semibold text-gray-700 cursor-pointer hover:text-[#007EA7] transition"
                  @click="showPasswordForm = !showPasswordForm">
                  {{ showPasswordForm ? 'Cancel Change Password' : 'Change Password' }}
                </h4>
                <div v-if="showPasswordForm" class="mt-4 space-y-3 bg-gray-100 p-4 rounded-xl">
                  <input v-model="passwordForm.current" placeholder="Current Password" type="password"
                    class="input-edit" />
                  <input v-model="passwordForm.new" placeholder="New Password" type="password" class="input-edit" />
                  <input v-model="passwordForm.confirm" placeholder="Confirm New Password" type="password"
                    class="input-edit" />
                  <div class="flex justify-between items-center">
                    <button @click="changePassword" :disabled="isChangingPassword" class="btn-blue">
                      {{ isChangingPassword ? 'Changing...' : 'Submit' }}
                    </button>
                    <a href="/forgot-password" class="text-sm text-[#007EA7] hover:underline">Forgot Password?</a>
                  </div>
                </div>
              </div>

              <!-- Logout -->
              <div>
                <button @click="showLogoutModal = true" class="btn-red">Logout</button>
              </div>

              <!-- Logout Modal -->
              <transition name="fade-zoom">
                <div v-if="showLogoutModal"
                  class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                  <div class="bg-white p-6 rounded-xl shadow-xl w-80">
                    <h2 class="text-lg font-semibold mb-2">Confirm Logout</h2>
                    <p class="text-gray-600 mb-4">Are you sure you want to logout?</p>
                    <div class="flex justify-end space-x-3">
                      <button @click="showLogoutModal = false" class="btn-gray">Cancel</button>
                      <button @click="confirmLogout" class="btn-red">Logout</button>
                    </div>
                  </div>
                </div>
              </transition>
            </div>

          </div>
        </transition>
      </div>
    </div>
  </div>

  <!-- Redirect Notice -->
  <div v-else class="text-center mt-20 text-gray-500">Redirecting to login...</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { auth, logoutUser } from '@/stores/auth';

const router = useRouter();

const isAuthenticated = ref(false);
const isLoading = ref(true);
const loading = ref(false);
const showLogoutModal = ref(false);
const showEditProfileForm = ref(false);
const previewImage = ref(null);
const tabs = ['bookings', 'history', 'address', 'settings'];
const activeTab = ref(localStorage.getItem("activeTab") || "bookings");
const userImg = ref('/images/default-user.png');
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

const editableFields = {
  name: { label: 'Full Name' },
  email: { label: 'Email', type: 'email' },
  phone: { label: 'Phone', type: 'tel' },
};

const syncActiveTabFromHash = () => {
  const hash = window.location.hash.replace('#', '');
  if (tabs.includes(hash)) activeTab.value = hash;
};

watch(activeTab, (val) => {
  localStorage.setItem("activeTab", val);
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Get user profile
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

// Upload profile image
const handleProfileImageChange = async (event) => {
  const file = event.target.files[0];
  if (!file || !file.type.startsWith('image/')) {
    toast.error("Please select a valid image file.");
    return;
  }

  previewImage.value = URL.createObjectURL(file);
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
    toast.error("Failed to upload profile picture.");
  }
};

 const updateUserProfile = async () => {
  if (!user.value.name || !user.value.email) {
    toast.error("Name and email are required.");
    return;
  }

  loading.value = true;

  try {
    const token = localStorage.getItem('token');
    const { name, phone, bio, address } = user.value; // include any other editable fields
    const res = await axios.put(
      'http://localhost:5000/api/user/profile',
      { name, phone, bio, address },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    toast.success(res.data.message || "Profile updated successfully!");
    showEditProfileForm.value = false; // close toast form
  } catch (err) {
    console.error("Profile update error:", err);
    toast.error(err.response?.data?.message || "Failed to update profile.");
  } finally {
    loading.value = false;
  }
};
// Bookings
const fetchBookings = async () => {
  try {
    const token = localStorage.getItem('token');
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
  } catch {
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
  } catch {
    toast.error("Failed to update booking status");
  }
};

const deleteBooking = async (bookingId) => {
  try {
    await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    bookings.value = bookings.value.filter(b => b._id !== bookingId);
    toast.success('Booking deleted successfully');
  } catch {
    toast.error('Failed to delete booking');
  }
};

const fetchHistory = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/bookings/history', {
      headers: { Authorization: `Bearer ${token}` },
    });
    history.value = res.data;
  } catch {
    toast.error("Failed to load service history.");
  }
};

// Notifications
const fetchNotificationSettings = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/user/notifications', {
      headers: { Authorization: `Bearer ${token}` },
    });
    notificationSettings.value = res.data;
  } catch {
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
  } catch {
    toast.error("Could not update notification settings.");
  } finally {
    isSavingNotifications.value = false;
  }
};

// Address
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

// Password
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
  logoutUser(); // clears storages, axios headers, resets auth
  user.value = { name: '', email: '', phone: '', bio: '', profilePic: '' };

  socket.value?.disconnect?.();

  router.push('/homeboard');
};

const confirmLogout = () => {
  logout();
  showLogoutModal.value = false;
};

// Initial Load
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
  syncActiveTabFromHash();

  Promise.all([
    getUserProfile(),
    fetchBookings(),
    fetchHistory(),
    fetchNotificationSettings(),
  ]).then(() => {
    socket.value = io('http://localhost:5000', {
      auth: { token },
      withCredentials: true,
      transports: ['websocket'],
    });

    socket.value.emit('join', user.value._id);

    socket.value.on('orderAccepted', (data) => {
      toast.info(`✅ Your order has been accepted by ${data.providerName}`);
      fetchBookings();
    });

    socket.value.on('orderRejected', (data) => {
      toast.info(`❌ Your booking was rejected by ${data.providerName}`);
      fetchBookings();
    });
  }).finally(() => {
    isLoading.value = false;
  });
});

onUnmounted(() => {
  socket.value?.disconnect();
});

</script>

<style scoped>
@media (max-width: 640px) {
  img {
    width: 5.5rem !important;
    height: 5.5rem !important;
  }
}

.fade-zoom-enter-active,
.fade-zoom-leave-active {
  transition: all 0.3s ease;
}

.fade-zoom-enter-from,
.fade-zoom-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.input-edit {
  width: 100%;
  border: 1px solid #d1d5db;
  /* gray-300 */
  border-radius: 0.375rem;
  /* rounded-md */
  padding: 0.5rem;
  /* p-2 */
  outline: none;
  transition: box-shadow 0.2s;
}

.input-edit:focus {
  outline: none;
  box-shadow: 0 0 0 2px #00A8E8;
  border-color: #00A8E8;
}

.btn-blue {
  padding: 0.5rem 1rem;
  background-color: #007EA7;
  color: #fff;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
}

.btn-blue:hover {
  background-color: #005f78;
}

.btn-green {
  padding: 0.25rem 0.75rem;
  /* px-3 py-1 */
  background-color: #22c55e;
  /* bg-green-500 */
  color: #fff;
  /* text-white */
  border-radius: 0.375rem;
  /* rounded */
  transition: background-color 0.2s;
}

.btn-green:hover {
  background-color: #16a34a;
  /* bg-green-600 */
}

.btn-gray {
  padding: 0.25rem 0.75rem;
  /* px-3 py-1 */
  background-color: #d1d5db;
  /* bg-gray-300 */
  color: #1f2937;
  /* text-gray-800 */
  border-radius: 0.375rem;
  /* rounded */
  transition: background-color 0.2s;
}

.btn-gray:hover {
  background-color: #9ca3af;
  /* bg-gray-400 */
}

.btn-red {
  padding: 0.5rem 1rem;
  /* px-4 py-2 */
  background-color: #ef4444;
  /* bg-red-500 */
  color: #fff;
  /* text-white */
  border-radius: 0.375rem;
  /* rounded */
  transition: background-color 0.2s;
}

.btn-red:hover {
  background-color: #dc2626;
  /* bg-red-600 */
}

.fade-tab-enter-active,
.fade-tab-leave-active {
  transition: opacity 0.20s ease;
}

.fade-tab-enter-from,
.fade-tab-leave-to {
  opacity: 0;
}
</style>
