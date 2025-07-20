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
            <img v-if="user && user.profilePic" :src="`http://localhost:5000/uploads/${user.profilePic}`" alt="User DP"
              class="w-10 h-10 rounded-full object-cover border-2 border-[#0073b1] cursor-pointer" />
            <img v-else src="@/assets/user.png" alt="Default User DP"
              class="w-10 h-10 rounded-full object-cover border-2 border-[#0073b1] cursor-pointer" />
          </router-link>

</div>
        </nav>
      </div>
    </header>

    <!-- Page Content -->
    <div class="max-w-5xl mx-auto px-4 py-6 ">
     <div class="mb-8 text-center bg-[#f0f4f8] shadow-md rounded-lg p-6">
  <h1 class="text-3xl font-bold text-[#0073b1] mb-2">My Orders</h1>
  <p class="text-gray-600 text-sm">View and manage your service orders here.</p>
</div>


      <!-- Pending Orders -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-[#0073b1] mb-4">Pending Orders</h2>
        <div v-if="pendingOrders.length === 0" class="text-gray-500 bg-white rounded shadow p-6 text-center">
          No new orders for now.
        </div>
        <div v-else class="grid md:grid-cols-2 gap-4">
          <div
            v-for="(order, index) in pendingOrders"
            :key="index"
            class="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h3 class="text-lg font-bold">{{ order.service }}</h3>
            <p class="text-sm text-gray-600">Customer: {{ order.customer }}</p>
            <p class="text-sm text-gray-600">Date: {{ order.date }}</p>
            <p class="text-sm text-gray-600">Address: {{ order.address }}</p>
            <p class="text-sm text-gray-600">Issue: {{ order.description }}</p>
            <div class="flex gap-3 mt-4">
              <button
                @click="acceptOrder(index)"
                class="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
              >
                Accept
              </button>
              <button
                @click="rejectOrder(index)"
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Accepted Orders -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-[#0073b1] mb-4">Accepted Orders</h2>
        <div v-if="acceptedOrders.length === 0" class="text-gray-500 bg-white rounded shadow p-6 text-center">
          No accepted orders.
        </div>
        <div class="space-y-4">
          <div
            v-for="(order, index) in acceptedOrders"
            :key="index"
            class="bg-[#E6F4FA] p-4 rounded shadow border border-blue-200"
          >
            <p><strong>{{ order.service }}</strong> - {{ order.customer }}</p>
            <p class="text-sm text-gray-600">Address: {{ order.address }}</p>
            <p class="text-sm text-gray-600">Date: {{ order.date }}</p>
          </div>
        </div>
      </section>

      <!-- Completed Orders -->
      <section>
        <h2 class="text-2xl font-semibold text-[#0073b1] mb-4">Completed Orders</h2>
        <div v-if="completedOrders.length === 0" class="text-gray-500 bg-white rounded shadow p-6 text-center">
          No completed orders yet.
        </div>
        <ul class="space-y-3">
          <li
            v-for="(order, index) in completedOrders"
            :key="index"
            class="bg-green-50 p-4 rounded border border-green-200"
          >
            ✅ <strong>{{ order.service }}</strong> completed for {{ order.customer }} on {{ order.date }}
          </li>
        </ul>
      </section>
    </div>
     <!-- Footer -->
    <footer class="text-center py-6 text-sm text-gray-500 mt-10">
      © 2025 SkillLink Provider Portal. All rights reserved.
    </footer>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: null,
      pendingOrders: [
        {
          service: 'Plumber',
          customer: 'Arju Jangra',
          date: '2025-07-20',
          address: 'Sector 9, Hisar',
          description: 'Leaking tap in kitchen',
        },
        {
          service: 'Electrician',
          customer: 'Neha Sharma',
          date: '2025-07-21',
          address: 'Sector 14, Hisar',
          description: 'Short circuit in bedroom',
        },
      ],
      acceptedOrders: [],
      completedOrders: [
        {
          service: 'Painter',
          customer: 'Ravi Kumar',
          date: '2025-07-18',
        },
      ],
    };
  },
  methods: {
    acceptOrder(index) {
      const order = this.pendingOrders.splice(index, 1)[0];
      this.acceptedOrders.push(order);
    },
    rejectOrder(index) {
      this.pendingOrders.splice(index, 1);
    },
    async fetchUserProfile() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.user = response.data;
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    },
  },
  mounted() {
    this.fetchUserProfile();
  },
};
</script>

