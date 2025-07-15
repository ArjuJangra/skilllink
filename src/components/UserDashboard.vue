<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white px-4 py-8">
    <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
      <!-- Profile Section -->
      <div class="flex items-center space-x-4 border-b pb-4 mb-4">
        <img src="@/assets/user.png" alt="User Profile" class="w-20 h-20 rounded-full border-2 border-[#00A8E8] " />
        <div>
          <h2 class="text-2xl font-bold text-[#007EA7]">{{ user.name }}</h2>
          <p class="text-gray-500">{{ user.email }}</p>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="flex flex-wrap gap-2 border-b pb-2 mb-4 text-sm md:text-base">
        <button class="px-4 py-2 rounded-t-lg font-semibold"
          :class="activeTab === 'bookings' ? activeClass : inactiveClass" @click="activeTab = 'bookings'">
          My Bookings
        </button>
        <button class="px-4 py-2 rounded-t-lg font-semibold"
          :class="activeTab === 'history' ? activeClass : inactiveClass" @click="activeTab = 'history'">
          Service History
        </button>
        <button class="px-4 py-2 rounded-t-lg font-semibold"
          :class="activeTab === 'address' ? activeClass : inactiveClass" @click="activeTab = 'address'">
          My Address
        </button>
        <button class="px-4 py-2 rounded-t-lg font-semibold"
          :class="activeTab === 'settings' ? activeClass : inactiveClass" @click="activeTab = 'settings'">
          Settings
        </button>

      </div>

      <!-- Tab Content -->
      
<div v-if="activeTab === 'bookings'" class="space-y-2">
  <h3 class="text-lg font-semibold text-[#007EA7]">My Bookings</h3>
  <div v-if="bookings.length" class="space-y-2">
    <div
      v-for="(booking, index) in bookings"
      :key="index"
      class="border rounded-lg p-3 flex justify-between items-start shadow-sm"
    >
      <div>
        <h4 class="font-semibold text-[#007EA7]">{{ booking.service }}</h4>
        <p class="text-sm text-gray-500">Name: {{ booking.name }}</p>
        <p class="text-sm text-gray-500">Contact: {{ booking.contact }}</p>
        <p class="text-sm text-gray-500">Address: {{ booking.address }}</p>
        <p class="text-xs text-gray-400">Booked on: {{ new Date(booking.createdAt).toLocaleString() }}</p>
      </div>
    </div>
  </div>
  <p v-else class="text-gray-500">No bookings found.</p>
</div>


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

      <div v-else-if="activeTab === 'address'" class="space-y-2">
        <h3 class="text-lg font-semibold text-[#007EA7]">Saved Addresses</h3>
        <p class="text-gray-600">You have not added any address.</p>
        <button class="mt-2 px-4 py-2 bg-[#007EA7] text-white rounded hover:bg-[#005f78]">
          Add New Address
        </button>
      </div>

      <div v-else-if="activeTab === 'settings'" class="space-y-2">
        <h3 class="text-lg font-semibold text-[#007EA7]">Account Settings</h3>
        <ul class="text-gray-600 list-disc list-inside">
          <li>Change Password</li>
          <li>Notification Preferences</li>
          <li>Privacy Settings</li>
        </ul>

        <button class="mt-4 px-6 py-2 bg-[#007EA7] text-white rounded-lg shadow hover:bg-[#005f78] transition duration-300" @click="logout">
          Logout
        </button>
         <button @click="toggleDarkMode" class="px-3 py-1 rounded border border-gray-400 text-sm">
  {{ isDark ? '☀️ Light' : '🌙 Dark' }}
</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const bookings = ref([]);
const router = useRouter();
const isDark = ref(false);

const logout = () => {
  localStorage.removeItem('token');
  router.push('/login'); // make sure '/login' route exists
};

const activeTab = ref('bookings');

const activeClass = 'text-[#007EA7] border-b-2 border-[#00A8E8]';
const inactiveClass = 'text-gray-500 hover:text-[#00A8E8]';
const user = ref({ name: '', email: '' });
const history = ref([
  { service: 'Electrician - Fan Repair', date: '2025-07-01', status: 'Completed' },
  { service: 'Plumber - Pipe Leakage', date: '2025-06-25', status: 'Completed' },
  { service: 'Mechanic - Bike Servicing', date: '2025-06-20', status: 'Completed' },
]);

const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('User data response:', res.data); // 👈 add this line
    user.value = res.data;
  } catch (err) {
    console.error('Failed to load user:', err);
  }
};


const fetchBookings = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/bookings', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    bookings.value = res.data;
  } catch (err) {
    console.error('Failed to load bookings:', err);
  }
};

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  getUserProfile();
   fetchBookings();
   isDark.value = localStorage.getItem('theme') === 'dark'
  document.documentElement.classList.toggle('dark', isDark.value)
});

</script>
