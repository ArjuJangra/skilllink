<template>
  <div class="min-h-screen bg-[#F0F9FF] px-4 py-8">
    <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
      <!-- Profile Section -->
      <div class="flex items-center space-x-4 border-b pb-4 mb-4">
        <img
          src="@/assets/user.png"
          alt="User Profile"
          class="w-20 h-20 rounded-full border-2 border-[#00A8E8]"
        />
        <div>
          <h2 class="text-2xl font-bold text-[#007EA7]">Arju Jangra</h2>
          <p class="text-gray-500">arju@example.com</p>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="flex flex-wrap gap-2 border-b pb-2 mb-4 text-sm md:text-base">
        <button
          class="px-4 py-2 rounded-t-lg font-semibold"
          :class="activeTab === 'bookings' ? activeClass : inactiveClass"
          @click="activeTab = 'bookings'"
        >
          My Bookings
        </button>
        <button
          class="px-4 py-2 rounded-t-lg font-semibold"
          :class="activeTab === 'history' ? activeClass : inactiveClass"
          @click="activeTab = 'history'"
        >
          Service History
        </button>
        <button
          class="px-4 py-2 rounded-t-lg font-semibold"
          :class="activeTab === 'address' ? activeClass : inactiveClass"
          @click="activeTab = 'address'"
        >
          My Address
        </button>
        <button
          class="px-4 py-2 rounded-t-lg font-semibold"
          :class="activeTab === 'settings' ? activeClass : inactiveClass"
          @click="activeTab = 'settings'"
        >
          Settings
        </button>
      </div>

      <!-- Tab Content -->
      <div v-if="activeTab === 'bookings'" class="space-y-2">
        <h3 class="text-lg font-semibold text-[#007EA7]">Upcoming Bookings</h3>
        <div class="text-gray-600">No upcoming bookings yet.</div>
      </div>

      <div v-else-if="activeTab === 'history'" class="space-y-2">
        <h3 class="text-lg font-semibold text-[#007EA7]">Previous Services</h3>
        <div v-if="history.length" class="space-y-2">
          <div
            v-for="(item, index) in history"
            :key="index"
            class="border rounded-lg p-3 flex justify-between items-center shadow-sm"
          >
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('bookings');

const activeClass = 'text-[#007EA7] border-b-2 border-[#00A8E8]';
const inactiveClass = 'text-gray-500 hover:text-[#00A8E8]';

const history = ref([
  { service: 'Electrician - Fan Repair', date: '2025-07-01', status: 'Completed' },
  { service: 'Plumber - Pipe Leakage', date: '2025-06-25', status: 'Completed' },
  { service: 'Mechanic - Bike Servicing', date: '2025-06-20', status: 'Completed' },
]);
</script>
