<template>
  <!-- Authenticated Dashboard Wrapper -->
  <div v-if="isAuthenticated" class="min-h-screen bg-gradient-to-b from-[#F0F9FF] to-white py-4 px-2 sm:py-8 sm:px-4">
    <div class="max-w-5xl mx-auto bg-gradient from-[#F0F9FF] via-white to-[#E6F4F9] rounded-3xl shadow-xl p-6">
      <!-- User Profile Card -->
      <div v-if="user"
        class="bg-gradient-to-br from-white via-[#f1faff] to-[#f5fafe] p-4 sm:p-6 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
        <!-- Profile Section -->
        <div class="flex items-center gap-4 sm:gap-6 w-full">
          <div class="relative flex-shrink-0">
            <img :src="user.profilePic ? API.getImageUrl(user.profilePic) : userImg"
              @error="e => e.target.src = userImg"
              class="w-16 h-16 sm:w-28 sm:h-28 rounded-full border-4 border-[#00A8E8] object-cover shadow-md"
              alt="Profile Picture" />
            <label
              class="absolute bottom-0 right-0 bg-[#00A8E8] text-white rounded-full p-2 cursor-pointer hover:bg-[#007EA7] transition"
              title="Upload Photo">
              <input type="file" class="hidden" @change="handleProfileImageChange" />
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24"
                fill="currentColor">
                <path
                  d="M21 7h-3.17l-1.84-2H7.01L5.17 7H2a2 2 0 00-2 2v10a2 2 0 002 2h19a2 2 0 002-2V9a2 2 0 00-2-2zm-9 12a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z" />
              </svg>
            </label>
          </div>
          <div class="flex-1 flex flex-col justify-center overflow-hidden">
            <h2 class="text-lg sm:text-2xl font-bold text-gray-900 truncate"> {{ user.name }} </h2>
            <div class="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-1 text-sm text-gray-600 overflow-hidden">
              <div class="flex items-center gap-1 truncate">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2-8 5-8-5h16zM4 18V8l8 5 8-5v10H4z" />
                </svg>
                <span class="truncate max-w-[120px] sm:max-w-full">{{ user.email }}</span>
              </div>
              <div v-if="user.phone" class="flex items-center gap-1 truncate mt-1 sm:mt-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.1-.2 11.05 11.05 0 003.49.55 1 1 0 011 1v3.46a1 1 0 01-1 1C10.4 21 3 13.6 3 5a1 1 0 011-1h3.46a1 1 0 011 1c0 1.2.18 2.38.55 3.47a1 1 0 01-.2 1.1l-2.19 2.22z" />
                </svg>
                <span class="truncate max-w-[120px] sm:max-w-full">{{ user.phone }}</span>
              </div>
            </div>
          </div>
          <!-- Right: Edit Button -->
          <div class="flex-shrink-0 ml-2">
            <button @click="showEditProfileForm = true"
              class="px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-[#007EA7] to-[#00B4DB] text-white rounded-lg text-sm sm:text-base font-medium shadow-sm transition whitespace-nowrap flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-4 sm:w-4" fill="currentColor"
                viewBox="0 0 24 24">
                <path
                  d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm14.71-9.04a1 1 0 010 1.41l-1.83 1.83-3.75-3.75 1.83-1.83a1 1 0 011.41 0l2.34 2.34z" />
              </svg>
              Edit
            </button>
          </div>
        </div>
        <!-- Edit Profile Modal -->
        <transition name="fade">
          <div v-if="showEditProfileForm"
            class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 px-2">
            <div class="bg-white rounded-2xl shadow-lg w-full max-w-md p-4 sm:p-6">
              <!-- Header -->
              <div class="flex justify-between items-center mb-3 sm:mb-4">
                <h3 class="text-lg sm:text-lg font-semibold text-gray-800">Edit Profile</h3>
                <button @click="showEditProfileForm = false" class="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <!-- Form -->
              <div class="space-y-3 sm:space-y-4">
                <div>
                  <label class="block text-sm sm:text-base font-medium text-gray-600 mb-1">Name</label>
                  <input v-model="editForm.name" type="text"
                    class="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8E8] focus:outline-none shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm sm:text-base font-medium text-gray-600 mb-1">Email</label>
                  <input v-model="editForm.email" type="email"
                    class="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8E8] focus:outline-none shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm sm:text-base font-medium text-gray-600 mb-1">Phone</label>
                  <input v-model="editForm.phone" type="tel"
                    class="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8E8] focus:outline-none shadow-sm" />
                </div>
              </div>
              <!-- Actions -->
              <div class="mt-4 sm:mt-5 flex justify-end gap-2">
                <button @click="showEditProfileForm = false"
                  class="px-3 sm:px-4 py-1 sm:py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm sm:text-base font-medium">
                  Cancel
                </button>
                <button @click="updateUserProfile"
                  class="px-3 sm:px-4 py-1 sm:py-2 bg-[#00A8E8] hover:bg-[#007EA7] text-white rounded-lg text-sm sm:text-base font-medium shadow-sm flex items-center gap-2">
                  <span>Save</span>
                  <svg v-if="loading" class="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none"
                    viewBox="0 0 24 24">
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
      <div
        class="flex flex-wrap items-center gap-1 sm:gap-2 bg-gradient-to-br from-[#f1faff]  via-[#f1faff] to-[#f5fafe] border-b border-gray-200 pb-2 sm:pb-3 mb-2 mt-2">
        <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" :class="[
          ' px-3 sm:px-5 py-1 sm:py-2 font-medium transition-all duration-200 rounded-t-lg border-b-2 text-sm sm:text-base',
          activeTab === tab
            ? 'text-[#00A8E8] border-[#00A8E8]  shadow-sm'
            : 'text-gray-600 border-transparent hover:text-[#00A8E8] '
        ]">
          {{ formatTab(tab) }}
        </button>
      </div>
      <!-- Loading -->
      <div v-if="isLoading" class="text-center text-[#007EA7] font-semibold py-6 sm:py-8">Loading...</div>
      <!-- Content -->
      <div v-else class="bg-gradient-to-br from-white via-[#f1faff] to-[#f5fafe]">
        <transition name="fade-slide " mode="out-in">
          <div :key="activeTab" class="w-full bg-white rounded-2xl shadow-md p-4 sm:p-6 transition-all">

            <!-- Bookings Tab -->
            <div v-if="activeTab === 'bookings'" class="space-y-6">
              <h3 class="text-2xl font-bold text-[#007EA7]">My Bookings</h3>
              <div v-if="bookings.length" class="space-y-4">

                <div v-for="booking in bookings" :key="booking._id"
                  class="flex flex-col sm:flex-row justify-between bg-white rounded-2xl shadow-md p-4 sm:p-5 hover:shadow-lg transition-all border-l-4"
                  :class="booking.status === 'Pending' ? 'border-yellow-500' :
                    booking.status === 'Accepted' ? 'border-blue-500' :
                      booking.status === 'Completed' ? 'border-green-500' : 'border-red-500'">
                  <!-- Status Badge for small screens -->
                  <span class="sm:hidden mb-2 px-3 py-1 rounded-full text-sm font-semibold self-start" :class="booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    booking.status === 'Accepted' ? 'bg-blue-100 text-blue-800' :
                      booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'">
                    {{ booking.status }}
                  </span>

                  <!-- Left: Booking & Provider Info -->
                  <div class="flex-1 space-y-2">
                    <div class="flex items-center gap-3">
                      <img :src="booking.provider?.avatar || defaultProvider" alt="Provider"
                        class="w-12 h-12 sm:w-14 sm:h-14 rounded-full border object-cover" />
                      <div>
                        <h4 class="text-base sm:text-lg font-semibold text-gray-800">{{ booking.service }}</h4>
                        <p class="text-sm text-gray-600">
                          By {{ booking.provider?.name || "Assigned Expert" }}
                        </p>
                      </div>
                    </div>

                    <p class="text-sm text-gray-600"><span class="font-medium">Name:</span> {{ booking.name }}</p>
                    <p class="text-sm text-gray-600"><span class="font-medium">Contact:</span> {{ booking.contact }}</p>
                    <p class="text-sm text-gray-600"><span class="font-medium">Address:</span> {{ booking.address }}</p>
                    <p class="text-sm text-gray-600"><span class="font-medium">Price:</span> ₹{{ booking.price }}</p>
                    <p class="text-sm text-gray-600"><span class="font-medium">Payment:</span> {{ booking.paymentMethod
                      || 'Cash' }}</p>
                    <p class="text-xs text-gray-400"> Booked: {{ formatDate(booking.createdAt) }}</p>
                  </div>

                  <!-- Right: Status & Actions -->
                  <div class="hidden sm:flex flex-col justify-between items-end ml-4 flex-shrink-0">
                    <!-- Status Badge on top -->
                    <span :class="[
                      'px-3 py-1 rounded-full text-sm font-semibold',
                      booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'Accepted' ? 'bg-blue-100 text-blue-800' :
                          booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                    ]">
                      {{ booking.status }}
                    </span>

                    <!-- Buttons at the bottom -->
                    <div class="flex gap-2 mt-auto">
                      <button @click="deleteBooking(booking._id)"
                        class="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md text-sm transition flex items-center gap-1">
                        <i class="fas fa-trash"></i> Delete
                      </button>
                      <button v-if="booking.status === 'Pending'"
                        class="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-md text-sm transition">
                        Details
                      </button>
                    </div>
                  </div>
                  <!-- Buttons for small screens -->
                  <div class="flex sm:hidden gap-2 mt-2">
                    <button @click="deleteBooking(booking._id)"
                      class="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md text-sm transition flex items-center gap-1">
                      <i class="fas fa-trash"></i> Delete
                    </button>
                    <button v-if="booking.status === 'Pending'"
                      class="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-md text-sm transition">
                      Details
                    </button>
                  </div>


                </div>
              </div>

              <!-- Empty State -->
              <div v-else class="flex flex-col items-center justify-center py-10 text-gray-500">
                <i class="fas fa-calendar-times text-4xl mb-3"></i>
                <p>No bookings found.</p>
                <button @click="router.push('/services')"
                  class="mt-3 px-4 py-2 bg-[#007EA7] text-white rounded-lg hover:bg-[#005f7f] transition">
                  Explore Services
                </button>
              </div>
            </div>

            <!-- History Tab -->
            <div v-else-if="activeTab === 'history'" class="space-y-6">
              <h3 class="text-xl font-semibold text-[#007EA7]">Previous Services</h3>
              <!-- Grid of History Cards -->
              <div v-if="history.length" class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="item in history" :key="item.id"
                  class="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transform hover:scale-105 transition-all p-5 flex flex-col justify-between">

                  <!-- Top Section: Service & Status -->
                  <div class="flex justify-between items-start mb-3">
                    <div>
                      <h4 class="text-lg font-bold text-[#007EA7]">{{ item.service }}</h4>
                      <p class="text-gray-500 text-sm">{{ item.date }}</p>
                    </div>

                    <!-- Status Badge with Icon -->
                    <span class="flex items-center gap-1 text-sm font-semibold px-3 py-1 rounded-full" :class="item.status === 'Completed' ? 'bg-green-100 text-green-700'
                      : item.status === 'Rejected' ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'">
                      <svg v-if="item.status === 'Completed'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                      </svg>
                      <svg v-else-if="item.status === 'Rejected'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                          d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 animate-spin" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>
                      {{ item.status }}
                    </span>
                  </div>

                  <!-- Optional Description -->
                  <p v-if="item.description" class="text-gray-600 text-sm mb-2 line-clamp-3">{{ item.description }}</p>

                  <!-- Optional Provider Info -->
                  <div v-if="item.provider" class="flex items-center gap-2 mb-2">
                    <img :src="item.provider.avatar || userImg" class="w-8 h-8 rounded-full object-cover"
                      alt="provider" />
                    <span class="text-gray-700 text-sm">{{ item.provider.name }}</span>
                  </div>

                  <!-- Bottom Section: Booked Date & Time -->
                  <div class="flex justify-between items-center mt-auto text-xs text-gray-400">
                    <span>Booked {{ isValidDate(item.date) ? relativeDate(item.date) : 'N/A' }}</span>
                    <span>{{ isValidDate(item.date) ? formatTime(item.date) : '' }}</span>
                  </div>

                </div>
              </div>

              <!-- Empty State -->
              <div v-else class="flex flex-col items-center justify-center py-10 text-gray-500">

                <p>No service history available.</p>
                <button @click="router.push('/services')" class="btn-blue mt-3">Explore Services</button>
              </div>
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
  <div v-else class="text-center mt-10 sm:mt-20 text-gray-500">Redirecting to login...</div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue';
import { io } from 'socket.io-client';
import API from '@/api';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { auth, logoutUser } from '@/stores/auth';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import userImg from '@/assets/user.png';

const router = useRouter();
const getToken = () => localStorage.getItem('token');

// --- State ---
const isAuthenticated = ref(false), isLoading = ref(true), loading = ref(false);
const showLogoutModal = ref(false), showEditProfileForm = ref(false), previewImage = ref(null);
const tabs = ['bookings', 'history', 'address', 'settings'];
const activeTab = ref(localStorage.getItem("activeTab") || "bookings");

const user = ref({ name: '', email: '', phone: '', bio: '', profilePic: '' });
const socket = ref(null);

// --- Booking state ---
const bookings = ref([]);   // Active bookings
const history = ref([]);    // Past/completed bookings

// --- Address state ---
const savedAddresses = ref(JSON.parse(localStorage.getItem('addresses')) || []);
const newAddress = reactive({ pincode: '', city: '', address: '' });
const showAddressForm = ref(false);

// --- Password & Settings ---
const passwordForm = reactive({ current: '', new: '', confirm: '' });
const showPasswordForm = ref(false), isChangingPassword = ref(false);
const notificationSettings = reactive({ email: true, sms: false, push: true });
const isSavingNotifications = ref(false), showNotificationPreferences = ref(false);
const editForm = reactive({ name: '', email: '', phone: '' });

// --- Watchers ---
watch(showEditProfileForm, val => {
  if (val) Object.assign(editForm, { name: user.value.name || '', email: user.value.email || '', phone: user.value.phone || '' });
});
watch(activeTab, val => localStorage.setItem("activeTab", val));

// --- Helpers ---
const formatTab = t => t.charAt(0).toUpperCase() + t.slice(1).replace('-', ' ');
const isValidDate = d => d && !isNaN(new Date(d).getTime());
const formatTime = d => isValidDate(d) ? dayjs(d).format('hh:mm A') : '';
const relativeDate = d => isValidDate(d) ? dayjs(d).fromNow() : 'N/A';
const formatDate = d => isValidDate(d) ? dayjs(d).format('DD MMM YYYY, hh:mm A') : '';

// --- Profile ---
const getUserProfile = async () => {
  try {
    const { data } = await API.get('/user/profile');
    user.value = data;
    auth.user = data;
    localStorage.setItem("user", JSON.stringify(data));
  } catch {
    toast.error("Failed to load user data");
  }
};

const handleProfileImageChange = async e => {
  const f = e.target.files[0];
  if (!f?.type.startsWith('image/')) return toast.error("Please select an image.");

  previewImage.value = URL.createObjectURL(f);
  const fd = new FormData();
  fd.append('profilePic', f);

  try {
    const { data } = await API.put('/user/profile/picture', fd);
    const pic = `${data.profilePic}?t=${Date.now()}`;
    user.value.profilePic = auth.user.profilePic = pic;

    let existing = JSON.parse(localStorage.getItem("user"));
    if (existing) {
      existing.profilePic = pic;
      localStorage.setItem("user", JSON.stringify(existing));
    }
    toast.success("Profile picture updated!");
  } catch {
    toast.error("Failed to upload profile picture.");
  }
};

const updateUserProfile = async () => {
  if (!editForm.name || !editForm.email) return toast.error("Name and email are required.");
  loading.value = true;
  try {
    const { data } = await API.put("/user/profile", { ...editForm });
    Object.assign(user.value, editForm);
    toast.success(data.message || "Profile updated successfully!");
    showEditProfileForm.value = false;
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to update profile.");
  } finally {
    loading.value = false;
  }
};

// --- Bookings ---
const fetchBookings = async () => {
  try {
    bookings.value = (await API.get('/bookings')).data;
  } catch {
    toast.error("Failed to load bookings");
  }
};

const fetchHistory = async () => {
  try {
    history.value = (await API.get('/bookings/history')).data;
  } catch {
    toast.error("Failed to load service history.");
  }
};

const deleteBooking = async id => {
  try {
    await API.delete(`/bookings/${id}`);
    bookings.value = bookings.value.filter(b => b._id !== id);
    toast.success('Booking deleted');
  } catch {
    toast.error('Failed to delete booking');
  }
};

const moveToHistory = b => {
  history.value.push({
    service: b.service,
    date: new Date(b.updatedAt).toLocaleDateString(),
    status: b.status
  });
  bookings.value = bookings.value.filter(x => x._id !== b._id);
};

// --- Notifications ---
const fetchNotificationSettings = async () => {
  try {
    Object.assign(notificationSettings, (await API.get('/user/notifications')).data);
  } catch {
    toast.error("Failed to load notification settings.");
  }
};

const updateNotificationSettings = async () => {
  isSavingNotifications.value = true;
  try {
    const { data } = await API.put('/user/notifications', notificationSettings);
    toast.success(data.message || "Preferences updated.");
  } catch {
    toast.error("Could not update notifications.");
  } finally {
    isSavingNotifications.value = false;
  }
};

// --- Address ---
const saveAddress = () => {
  if (newAddress.pincode && newAddress.city && newAddress.address) {
    savedAddresses.value.push({ ...newAddress });
    localStorage.setItem('addresses', JSON.stringify(savedAddresses.value));
    Object.assign(newAddress, { pincode: '', city: '', address: '' });
    showAddressForm.value = false;
  } else toast.error('Please fill in all fields.');
};

const deleteAddress = i => {
  savedAddresses.value.splice(i, 1);
  localStorage.setItem('addresses', JSON.stringify(savedAddresses.value));
  toast.success("Address deleted.");
};

// --- Password ---
const changePassword = async () => {
  if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) return toast.error("All fields required");
  if (passwordForm.new !== passwordForm.confirm) return toast.error("Passwords do not match");

  isChangingPassword.value = true;
  try {
    const { data } = await API.post('/user/change-password', {
      currentPassword: passwordForm.current,
      newPassword: passwordForm.new
    });
    toast.success(data.message || "Password updated!");
    showPasswordForm.value = false;
    Object.assign(passwordForm, { current: '', new: '', confirm: '' });
  } catch (err) {
    toast.error(err.response?.data?.message || "Error changing password");
  } finally {
    isChangingPassword.value = false;
  }
};

// --- Logout ---
const logout = () => {
  logoutUser();
  user.value = { name: '', email: '', phone: '', bio: '', profilePic: '' };
  socket.value?.disconnect?.();
  router.push('/homeboard');
};
const confirmLogout = () => { logout(); showLogoutModal.value = false; };

// --- Lifecycle ---
onMounted(() => {
  const token = getToken();
  if (!token) return (toast.error("Please login first"), router.push('/login'));

  const localUser = JSON.parse(localStorage.getItem('user'));
  if (localUser?.role === 'provider') return router.push('/provider/profile');

  isAuthenticated.value = true;
  Promise.all([getUserProfile(), fetchBookings(), fetchHistory(), fetchNotificationSettings()])
    .then(() => {
      socket.value = io(API.defaults.baseURL, { auth: { token }, withCredentials: true, transports: ['websocket'] });
      socket.value.emit('join', user.value._id);

      // Socket event listeners
      socket.value.on('orderAccepted', d => (toast.info(`✅ Accepted by ${d.providerName}`), fetchBookings()));
      socket.value.on('orderRejected', d => (toast.info(`❌ Rejected by ${d.providerName}`), fetchBookings()));
      socket.value.on('orderCompleted', d => {
        toast.success(`🎉 Booking for ${d.service} is completed`);
        const booking = bookings.value.find(b => b._id === d._id);
        if (booking) moveToHistory(booking);
      });
    })
    .finally(() => isLoading.value = false);
});
onUnmounted(() => socket.value?.disconnect());
</script>


<style scoped>
/* Responsive Images */
@media (max-width: 640px) {
  img {
    width: 5.5rem !important;
    height: 5.5rem !important;
  }
}

/* Animations */
.fade-zoom-enter-active,
.fade-zoom-leave-active,
.fade-tab-enter-active,
.fade-tab-leave-active {
  transition: all 0.3s ease;
}

.fade-zoom-enter-from,
.fade-zoom-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.fade-tab-enter-from,
.fade-tab-leave-to {
  opacity: 0;
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
  box-shadow: 0 0 0 2px #00A8E8;
  border-color: #00A8E8;
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
