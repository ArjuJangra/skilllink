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

<!-- 
      <div v-else-if="activeTab === 'settings'" class="space-y-2">
        <h3 class="text-lg font-semibold text-[#007EA7]">Account Settings</h3>
        <ul class="text-gray-600 list-disc list-inside">
          <li>Change Password</li>
          <li>Notification Preferences</li>
          <li>Privacy Settings</li>
        </ul> -->
        <div v-else-if="activeTab === 'settings'" class="space-y-4">
  <h3 class="text-lg font-semibold text-[#007EA7]">Account Settings</h3>

  <!-- Button to Show/Hide Change Password Form -->
  <button
    @click="showPasswordForm = !showPasswordForm"
    class="px-4 py-2 bg-[#007EA7] text-white rounded hover:bg-[#005f78] transition duration-300"
  >
    {{ showPasswordForm ? 'Cancel' : 'Change Password' }}
  </button>

  <!-- Change Password Section -->
  <div v-if="showPasswordForm" class="bg-gray-100 p-4 rounded-lg space-y-3 mt-2">
    <h4 class="text-md font-semibold text-gray-700">Change Password</h4>
    
    <input
      v-model="passwordForm.current"
      type="password"
      placeholder="Current Password"
      class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
    />
    
    <input
      v-model="passwordForm.new"
      type="password"
      placeholder="New Password"
      class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
    />
    
    <input
      v-model="passwordForm.confirm"
      type="password"
      placeholder="Confirm New Password"
      class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
    />
    
    <div class="flex items-center justify-between">
      <button
        @click="changePassword"
        :disabled="isChangingPassword "
        class="px-4 py-2 bg-[#007EA7] text-white rounded hover:bg-[#005f78]  disabled:opacity-50 disabled:cursor-not-allowed"
      >
          {{ isChangingPassword ? 'Changing...' : 'Submit' }}
      </button>
      <a href="/forgot-password" class="text-sm text-[#007EA7] hover:underline">
        Forgot Password?
      </a>
    </div>
  </div>

  <!-- Other Settings -->
  <ul class="text-gray-600 list-disc list-inside mt-4">
    <li>Notification Preferences</li>
    <li>Privacy Settings</li>
  </ul>

  <button 
    class="mt-4 px-6 py-2 bg-[#007EA7] text-white rounded-lg shadow hover:bg-[#005f78] transition duration-300"
    @click="showLogoutModal = true"
  >
    Logout
  </button>
  <!-- Logout Confirmation Modal -->
<transition name="fade-zoom">
  <div
    v-if="showLogoutModal"
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
  >
    <div
      class="bg-white p-6 rounded-lg shadow-xl w-80 transform transition-transform duration-300"
    >
      <h2 class="text-lg font-semibold text-gray-800 mb-3">Confirm Logout</h2>
      <p class="text-gray-600 mb-5">Are you sure you want to logout?</p>
      <div class="flex justify-end space-x-3">
        <button
          @click="showLogoutModal = false"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          @click="confirmLogout"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</transition>


</div>


      </div>
    </div>
  
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const showLogoutModal = ref(false);

const bookings = ref([]);
const router = useRouter();


const logout = () => {
  toast.success("Logged out successfully");

  setTimeout(() => {
    localStorage.removeItem('token');
    router.push('/homeboard');
  }, 1000); 
};


const confirmLogout = () => {
  logout();
  showLogoutModal.value = false;
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
    console.log('User data response:', res.data); 
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

const showPasswordForm = ref(false);
const isChangingPassword = ref(false);
const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
});

const changePassword = async () => {
  if (!passwordForm.value.current || !passwordForm.value.new || !passwordForm.value.confirm) {
    toast.error("Please fill out all password fields.");
    return;
  }
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    toast.error("New passwords do not match.");
    return;
  }
   isChangingPassword.value = true;
   try {
    const token = localStorage.getItem('token');
    const res = await axios.post('http://localhost:5000/api/user/change-password', {
      currentPassword: passwordForm.value.current,
      newPassword: passwordForm.value.new
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

 toast.success(res.data.message || "Password changed successfully!");
    showPasswordForm.value = false;
    passwordForm.value = { current: '', new: '', confirm: '' };

  } catch (err) {
    const msg = err.response?.data?.message || "Failed to change password.";
    toast.error(msg);
  }finally {
    isChangingPassword.value = false;
  }
};


onMounted(() => {
  getUserProfile();
   fetchBookings();
});

</script>

<style scoped>
.fade-zoom-enter-active,
.fade-zoom-leave-active {
  transition: all 0.3s ease;
}
.fade-zoom-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.fade-zoom-enter-to {
  opacity: 1;
  transform: scale(1);
}
.fade-zoom-leave-from {
  opacity: 1;
  transform: scale(1);
}
.fade-zoom-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
