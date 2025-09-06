<template>
  <div class="min-h-screen bg-gray-50 text-gray-800">
    <!-- Navbar -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white shadow-md backdrop-blur-sm">
      <div class="max-w-6xl mx-auto px-4 py-3 sm:px-6 flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <img :src="skillLogo" alt="SkillLink Logo" class="w-10 h-10" />
          <span class="text-xl font-bold text-[#0073b1]">SkillLink</span>
        </div>
        <nav class="flex items-center space-x-6 text-sm md:text-base font-medium">
          <router-link to="/serviceprovider" class="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-[#0073b1] transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3l8 7v10a2 2 0 0 1-2 2h-4a1 1 0 0 1-1-1v-5H11v5a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V10l8-7z" />
            </svg>
            <span class="font-semibold">Home</span>
          </router-link>
          <router-link to="/providerprofile">
            <img :src="profileImage" @error="handleImageError"
              class="w-10 h-10 rounded-full border border-gray-300 hover:border-[#0073b1] transition cursor-pointer object-cover"
              loading="lazy" alt="Profile Picture" />
          </router-link>
        </nav>
      </div>
    </header>

    <!-- Page Header -->
    <div class="max-w-6xl mx-auto pt-24 px-4 py-10 text-center">
      <h1 class="text-4xl font-extrabold text-[#0073b1] leading-[1.2] pb-1">My Orders</h1>
      <p class="text-gray-600 text-sm">Track and manage your service orders with ease.</p>

      <!-- Search & Filter -->
      <div class="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
        <input v-model="searchQuery" type="text" placeholder="🔍 Search by customer or service"
          class="px-4 py-2 rounded-xl border border-gray-300 w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-[#0073b1]" />
        <select v-model="statusFilter"
          class="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0073b1]">
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Completed">Completed</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
    </div>

    <!-- Orders Grid -->
    <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="order in filteredOrders" :key="order._id"
           class="bg-white rounded-2xl shadow-md p-6 border transition hover:shadow-lg"
           :class="borderClass(order.status)">
        <!-- Header -->
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold text-[#0073b1]">{{ order.service }}</h3>
          <span :class="statusClass(order.status)" class="px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1">
            {{ getStatusIcon(order.status) }} {{ order.status }}
          </span>
        </div>

        <!-- Details -->
        <div class="text-gray-700 text-sm space-y-2">
          <p class="flex items-center gap-2"><strong>Customer:</strong> {{ order.name }}</p>
          <p class="flex items-center gap-2"><strong>Contact:</strong> {{ order.contact }}</p>
          <p class="flex items-center gap-2"><strong>Address:</strong> {{ order.address }}</p>
          <p v-if="order.description" class="flex items-center gap-2"><strong>Description:</strong> {{ order.description }}</p>
          <p class="flex items-center gap-2 text-xs text-gray-500"><span>Placed: {{ formatDate(order.createdAt) }}</span></p>
        </div>

        <!-- Actions -->
        <div class="mt-4 flex flex-wrap gap-2">
          <button v-if="order.status === 'Pending'" @click="acceptOrder(order._id)"
            class="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-semibold transition">
            Accept
          </button>
          <button v-if="order.status === 'Pending'" @click="rejectOrder(order._id)"
            class="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition">
            Reject
          </button>
          <button v-if="order.status === 'Accepted'" @click="completeOrder(order._id)"
            class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold transition">
            Mark Completed
          </button>
        </div>
      </div>

      <div v-if="filteredOrders.length === 0" class="col-span-full text-center text-gray-500 mt-10">
        No orders match the criteria.
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-100 border-t mt-16">
      <div class="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700">
        <div>
          <div class="flex items-center space-x-2 mb-3">
            <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-10 h-10" />
            <span class="text-xl font-extrabold text-[#0073b1]">SkillLink</span>
          </div>
          <p class="text-sm">Empowering service providers to grow their business and connect with more customers.</p>
        </div>
        <div>
          <h3 class="text-sm font-bold mb-3">Quick Links</h3>
          <ul class="space-y-2 text-sm">
            <li><router-link to="/providerabout" class="hover:text-[#0073b1]">About Us</router-link></li>
            <li><router-link to="/providerpolicies" class="hover:text-[#0073b1]">Policies</router-link></li>
          </ul>
        </div>
        <div>
          <h3 class="text-sm font-bold mb-3">Support</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="mailto:connectteamskilllink@gmail.com" class="hover:text-[#0073b1]">connectteamskilllink@gmail.com</a></li>
            <li><router-link to="/providercontact" class="hover:text-[#0073b1]">Contact Us</router-link></li>
          </ul>
        </div>
        <div>
          <h3 class="text-sm font-bold mb-3">More</h3>
          <ul class="space-y-2 text-sm">
            <li><router-link to="/terms" class="hover:text-[#0073b1]">Terms of Service</router-link></li>
            <li><router-link to="/privacy" class="hover:text-[#0073b1]">Privacy</router-link></li>
          </ul>
          <div class="flex space-x-4 mt-4"> <a href="#" class="text-gray-500 hover:text-[#0073b1]"><i class="fab fa-facebook-f"></i></a> <a href="#" class="text-gray-500 hover:text-[#0073b1]"><i class="fab fa-twitter"></i></a> <a href="#" class="text-gray-500 hover:text-[#0073b1]"><i class="fab fa-linkedin-in"></i></a> </div>
        </div>
      </div>
      <div class="border-t text-center text-sm text-gray-500 py-4">
        © 2025 SkillLink Provider Portal. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import API from '@/api';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import skillLogo from '@/assets/skilllogo.png';
const defaultPic = require('@/assets/user.png');

const provider = ref(null);
const allOrders = ref([]);
const searchQuery = ref('');
const statusFilter = ref('');

const profileImage = computed(() =>
  provider.value?.profilePic
    ? API.getImageUrl(`providers/${provider.value.profilePic}`)
    : defaultPic
);

const fetchOrders = async () => {
  try {
    const res = await API.get('/providerorders');
    allOrders.value = res.data;
  } catch (err) {
    toast.error('Failed to load orders');
  }
};

const updateOrderStatus = async (id, status) => {
  try {
    await API.put(`/providerorders/${id}/status`, { status });
    toast.success(`Order ${status.toLowerCase()} successfully`);
    fetchOrders();
  } catch (err) {
    toast.error(`Could not ${status.toLowerCase()} order`);
  }
};

const acceptOrder = (id) => updateOrderStatus(id, 'Accepted');
const rejectOrder = (id) => updateOrderStatus(id, 'Rejected');
const completeOrder = (id) => updateOrderStatus(id, 'Completed');

const statusClass = (status) => {
  return 'flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ' + {
    Pending: 'bg-yellow-100 text-yellow-800',
    Accepted: 'bg-blue-100 text-blue-800',
    Completed: 'bg-green-100 text-green-800',
    Rejected: 'bg-red-100 text-red-800',
  }[status] || 'bg-gray-100 text-gray-800';
};

const borderClass = (status) => {
  return {
    Pending: 'border-yellow-400',
    Accepted: 'border-blue-400',
    Completed: 'border-green-400',
    Rejected: 'border-red-400',
  }[status] || 'border-gray-200';
};

const getStatusIcon = (status) => (status === 'Rejected' ? '❌' : '');

const formatDate = (dateStr) => new Date(dateStr).toLocaleString();

const filteredOrders = computed(() =>
  allOrders.value.filter((order) => {
    const matchesSearch =
      order.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.service.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesStatus = statusFilter.value ? order.status === statusFilter.value : true;
    return matchesSearch && matchesStatus;
  })
);

const handleImageError = (e) => (e.target.src = defaultPic);

onMounted(() => {
  const storedProvider = localStorage.getItem('user');
  if (storedProvider && JSON.parse(storedProvider).role === 'provider') {
    provider.value = JSON.parse(storedProvider);
  } else {
    toast.error('Unauthorized access');
    window.location.href = '/login';
  }
  fetchOrders();
});
</script>

<style>
/* Optional animation for future UI expansions */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin: 0;
}
</style>
