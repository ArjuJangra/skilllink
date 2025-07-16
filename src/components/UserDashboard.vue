<template>
  <div class="min-h-screen bg-gray-50 px-4 py-8">
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
      <div v-else-if="activeTab === 'address'" class="space-y-4">
  <h3 class="text-lg font-semibold text-[#007EA7]">Saved Addresses</h3>

  <!-- Form to Add Address -->
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

  <!-- Add Button -->
  <button v-else @click="showAddressForm = true"
    class="px-4 py-2 bg-[#007EA7] text-white rounded hover:bg-[#005f78]">
    Add New Address
  </button>

  <!-- Saved Addresses -->
  <div v-if="savedAddresses.length" class="space-y-3">
    <div v-for="(addr, index) in savedAddresses" :key="index" class="border p-4 rounded bg-white shadow">
      <p><span class="font-medium text-[#007EA7]">Pincode:</span> {{ addr.pincode }}</p>
      <p><span class="font-medium text-[#007EA7]">City:</span> {{ addr.city }}</p>
      <p><span class="font-medium text-[#007EA7]">Address:</span> {{ addr.address }}</p>
    </div>
  </div>
  <p v-else class="text-gray-500">No saved addresses yet.</p>
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


const logout = () => {
  localStorage.removeItem('token');
  router.push('/login'); 
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
const showAddressForm = ref(false);
const savedAddresses = ref([]);

const newAddress = ref({
  pincode: '',
  city: '',
  address: ''
});

const saveAddress = () => {
  if (newAddress.value.pincode && newAddress.value.city && newAddress.value.address) {
    savedAddresses.value.push({ ...newAddress.value });
    newAddress.value = { pincode: '', city: '', address: '' };
    showAddressForm.value = false;
  } else {
    alert('Please fill in all fields.');
  }
};



onMounted(() => {
  getUserProfile();
   fetchBookings();
});

</script>
