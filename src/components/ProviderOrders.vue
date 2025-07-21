<template>
  <div class="min-h-screen bg-[#F0F9FF] text-gray-800 pt-20">
    <!-- Navbar -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div class="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <!-- Left: Logo + Title -->
        <div class="flex items-center space-x-2">
          <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-10 h-10" />
          <span class="text-xl font-bold text-[#0073b1]">SkillLink</span>
        </div>

        <!-- Right: Navigation + Profile -->
        <nav class="flex items-center space-x-4 text-sm md:text-base">
          <router-link to="/serviceprovider" class="text-[#0073b1] font-bold hover:underline">Home</router-link>
          <router-link to="/provider/orders" class="text-[#0073b1] font-bold hover:underline">Orders</router-link>
          <router-link to="/provider/policies" class="text-[#0073b1] font-bold hover:underline">Policies</router-link>
          <router-link to="/provider/about" class="text-[#0073b1] font-bold hover:underline">About</router-link>
          <router-link to="/provider/contact" class="text-[#0073b1] font-bold hover:underline">Contact</router-link>


          <!-- Profile Picture Dropdown -->
          <div class="relative group">
            <router-link to="/profile">
              <img v-if="user && user.profilePic" :src="`http://localhost:5000/uploads/${user.profilePic}`"
                alt="User DP" class="w-10 h-10 rounded-full object-cover border-2 border-[#0073b1] cursor-pointer" />
              <img v-else src="@/assets/user.png" alt="Default User DP"
                class="w-10 h-10 rounded-full object-cover border-2 border-[#0073b1] cursor-pointer" />
            </router-link>

          </div>
        </nav>
      </div>
    </header>

    <!-- Page Content -->
    <!-- Page Content -->
    <div class="max-w-5xl mx-auto px-4 py-6 ">

      <!-- Orders Header -->
      <div class="mb-8 text-center bg-[#f0f4f8] shadow-md rounded-lg p-6">
        <h1 class="text-3xl font-bold text-[#0073b1] mb-2">My Orders</h1>
        <p class="text-gray-600 text-sm">View and manage your service orders here.</p>
      </div>

      <!-- 🔽 Paste your new order block here -->
      <div v-if="allOrders.length" class="mt-8 space-y-4">
        <div v-for="order in allOrders" :key="order._id"
          class="bg-white p-4 rounded-xl shadow-md border border-gray-200">
          <h3 class="text-lg font-semibold text-blue-600">{{ order.service }}</h3>
          <p><strong>Customer:</strong> {{ order.name }}</p>
          <p><strong>Contact:</strong> {{ order.contact }}</p>
          <p><strong>Address:</strong> {{ order.address }}</p>
          <p><strong>Status:</strong> {{ order.status }}</p>

          <div class="mt-3 flex space-x-2">
            <button v-if="order.status === 'Pending'" @click="acceptOrder(order._id)"
              class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
              Accept
            </button>
            <button v-if="order.status === 'Pending'" @click="rejectOrder(order._id)"
              class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
              Reject
            </button>
            <button v-if="order.status === 'Accepted'" @click="completeOrder(order._id)"
              class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
              Mark Completed
            </button>
          </div>
        </div>
      </div>

      <div v-else class="text-center mt-10 text-gray-500">
        No orders assigned yet.
      </div>
    </div>


    <!-- Footer -->
    <footer class="text-center py-6 text-sm text-gray-500 mt-10">
      © 2025 SkillLink Provider Portal. All rights reserved.
    </footer>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const allOrders = ref([])

const fetchOrders = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/provider/orders', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    allOrders.value = res.data;
  } catch (err) {
    console.error('❌ Failed to fetch orders:', err);
    toast.error('Failed to load orders');
  }
};

const updateOrderStatus = async (id, status) => {
  try {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/provider/orders/${id}/status`, {
      status,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    toast.success(`Order ${status.toLowerCase()} successfully`);
    fetchOrders();
  } catch (err) {
    console.error(`❌ ${status} failed:`, err);
    toast.error(`Could not ${status.toLowerCase()} order`);
  }
};

const acceptOrder = (id) => updateOrderStatus(id, 'Accepted');
const rejectOrder = (id) => updateOrderStatus(id, 'Rejected');
const completeOrder = (id) => updateOrderStatus(id, 'Completed');





onMounted(() => {
  fetchOrders()
})
</script>
