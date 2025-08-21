<template>
  <div class="min-h-screen bg-gradient-to-b from-[#F0F9FF] to-white text-gray-800 pt-24">
    <!-- Navbar -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <img :src="require('@/assets/skilllogo.png')" alt="SkillLink Logo" class="w-10 h-10" />

          <span class="text-xl font-extrabold text-[#0073b1]">SkillLink</span>
        </div>
        <nav class="flex items-center space-x-4 text-sm md:text-base font-medium">

          <router-link to="/serviceprovider"
            class="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#0073b1] hover:scale-105 transition-transform duration-200">
            <!-- Filled Home Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3l8 7v10a2 2 0 0 1-2 2h-4a1 1 0 0 1-1-1v-5H11v5a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V10l8-7z" />
            </svg>
            <span class="font-semibold">Home</span>
          </router-link>
          
          <router-link to="/profile">
            <img v-if="provider && provider.profilePic"
              :src="`http://localhost:5000/uploads/providers/${provider.profilePic}`" alt="Provider DP"
              class="w-10 h-10 rounded-full border-2 border-[#0073b1] object-cover cursor-pointer" />
            <img v-else src="@/assets/user.png" alt="Default Provider DP"
              class="w-10 h-10 rounded-full border-2 border-[#0073b1] cursor-pointer" />
          </router-link>
        </nav>
      </div>
    </header>

    <!-- Page Header -->
    <div class="max-w-6xl mx-auto px-4 py-10 text-center">
      <h1
        class="text-4xl font-extrabold bg-gradient-to-r from-[#3B8D99] to-[#f46675] bg-clip-text text-transparent mb-3">
        My Orders
      </h1>
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
      <div v-for="order in filteredOrders" :key="order._id" :class="[
        'bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 p-6 border',
        borderClass(order.status)
      ]">

        <!-- Header -->
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold text-[#0073b1]">{{ order.service }}</h3>
          <span :class="statusClass(order.status)"
            class="px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1">
            {{ getStatusIcon(order.status) }} {{ order.status }}
          </span>
        </div>

        <!-- Details -->
     <div class="text-gray-700 text-sm space-y-3">
  <!-- Customer -->
  <p class="flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#0073b1]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
    </svg>
    <strong>Customer:</strong> {{ order.name }}
  </p>

  <!-- Contact -->
  <p class="flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V21c0 
      .55-.45 1-1 1C10.07 22 2 13.93 2 4c0-.55.45-1 1-1h3.5c.55 
      0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
    <strong>Contact:</strong> {{ order.contact }}
  </p>

  <!-- Address -->
  <p class="flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 
      9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 
      6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
    </svg>
    <strong>Address:</strong> {{ order.address }}
  </p>

  <!-- Description -->
  <p v-if="order.description" class="flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21 6.5l-9-4.5-9 4.5v11l9 4.5 9-4.5v-11zm-9 
      9l-6-3V9l6 3 6-3v3.5l-6 3z"/>
    </svg>
    <strong>Description:</strong> {{ order.description }}
  </p>

  <!-- Placed Date -->
  <p class="flex items-center gap-2 text-xs text-gray-500">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 
      0-2 .9-2 2v14c0 1.1.89 2 2 
      2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 
      16H5V9h14v11z"/>
    </svg>
    <span>Placed: {{ formatDate(order.createdAt) }}</span>
  </p>
</div>
        <!-- Actions -->
        <div class="mt-4 flex flex-wrap gap-2">
          <button v-if="order.status === 'Pending'" @click="acceptOrder(order._id)"
            class="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 text-white px-4 py-2 rounded-xl font-semibold shadow-md transition">
             Accept
          </button>
          <button v-if="order.status === 'Pending'" @click="rejectOrder(order._id)"
            class="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 text-white px-4 py-2 rounded-xl font-semibold shadow-md transition">
             Reject
          </button>
          <button v-if="order.status === 'Accepted'" @click="completeOrder(order._id)"
            class="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 text-white px-4 py-2 rounded-xl font-semibold shadow-md transition">
            🎉 Mark Completed
          </button>
        </div>
      </div>

      <div v-if="filteredOrders.length === 0" class="col-span-full text-center text-gray-500 mt-10">
        No orders match the criteria.
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-[#f9fafb] border-t mt-16">
      <div class="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Logo & Tagline -->
        <div>
          <div class="flex items-center space-x-2 mb-3">
            <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-10 h-10" />
            <span class="text-xl font-extrabold text-[#0073b1]">SkillLink</span>
          </div>
          <p class="text-sm text-gray-600">
            Empowering service providers to grow their business and connect with more customers.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-sm font-bold text-gray-800 mb-3">Quick Links</h3>
          <ul class="space-y-2 text-sm text-gray-600">

            <li>
              <router-link to="/provider/policies" class="flex items-center gap-2 hover:text-[#0073b1] transition">
                <!-- Shield/Document Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 3l8 4v6c0 5-3 9-8 10-5-1-8-5-8-10V7l8-4z" />
                </svg>
                <span>Policies</span>
              </router-link>
            </li>

            <li>
              <router-link to="/provider/about" class="flex items-center gap-2 hover:text-[#0073b1] transition">
                <!-- Info Circle Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>About Us</span>
              </router-link>
            </li>

            <li>
              <router-link to="/provider/contact" class="flex items-center gap-2 hover:text-[#0073b1] transition">
                <!-- Phone Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.684l1.518 4.552a1 1 0 01-.27 1.043l-1.2 1.2a16.001 16.001 0 006.586 6.586l1.2-1.2a1 1 0 011.043-.27l4.552 1.518A1 1 0 0121 19.72V22a2 2 0 01-2 2h-1C9.163 24 3 17.837 3 10V5z" />
                </svg>
                <span>Contact</span>
              </router-link>
            </li>

          </ul>
        </div>

        <!-- Support -->
        <div>
          <h3 class="text-sm font-bold text-gray-800 mb-3">Support</h3>
          <ul class="space-y-2 text-sm text-gray-600">
            <li>
              <a href="mailto:connectteamskilllink@gmail.com"
                class="flex items-center gap-2 hover:text-[#0073b1] transition">
                <!-- Mail Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16 12H8m12 0c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M22 6l-10 7L2 6" />
                </svg>
                <span>connectteamskilllink@gmail.com</span>
              </a>
            </li>

            <li>
              <a href="tel:+919876543210" class="flex items-center gap-2 hover:text-[#0073b1] transition">
                <!-- Phone Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.684l1.52 4.552a1 1 0 01-.27 1.043l-1.2 1.2a16 16 0 006.586 6.586l1.2-1.2a1 1 0 011.043-.27l4.552 1.52a1 1 0 01.684.95V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z" />
                </svg>
                <span>+91 98765 43210</span>
              </a>
            </li>

            <li>
              <router-link to="/help" class="flex items-center gap-2 hover:text-[#0073b1] transition">
                <!-- Help Circle Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 18h.01M12 6a9 9 0 100 18 9 9 0 000-18zm0 4v4" />
                </svg>
                <span>Help Center</span>
              </router-link>
            </li>

          </ul>
        </div>

        <!-- Legal & Social -->
        <div>
          <h3 class="text-sm font-bold text-gray-800 mb-3">More</h3>
          <ul class="space-y-2 text-sm text-gray-600">
            <li><router-link to="/terms" class="hover:text-[#0073b1]">⚖️ Terms of Service</router-link></li>
            <li><router-link to="/privacy" class="hover:text-[#0073b1]">🔒 Privacy Policy</router-link></li>
          </ul>
          <div class="flex space-x-4 mt-4">
            <a href="#" class="text-gray-500 hover:text-[#0073b1]"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="text-gray-500 hover:text-[#0073b1]"><i class="fab fa-twitter"></i></a>
            <a href="#" class="text-gray-500 hover:text-[#0073b1]"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t text-center text-sm text-gray-500 py-4">
        © 2025 SkillLink Provider Portal. All rights reserved. Powered by SkillLink
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import API from '@/api';
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const provider = ref(null)
const allOrders = ref([])
const searchQuery = ref('')
const statusFilter = ref('')

// Fetch Orders
const fetchOrders = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await API.get('/api/provider/orders', {
      headers: { Authorization: `Bearer ${token}` },
    })
    allOrders.value = res.data
  } catch (err) {
    console.error('❌ Failed to fetch orders:', err)
    toast.error('Failed to load orders')
  }
}

// Update Order Status
const updateOrderStatus = async (id, status) => {
  try {
    const token = localStorage.getItem('token')
    await API.put(
      `/api/provider/orders/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    toast.success(`Order ${status.toLowerCase()} successfully`)
    fetchOrders()
  } catch (err) {
    console.error(`❌ ${status} failed:`, err)
    toast.error(`Could not ${status.toLowerCase()} order`)
  }
}

const acceptOrder = (id) => updateOrderStatus(id, 'Accepted')
const rejectOrder = (id) => updateOrderStatus(id, 'Rejected')
const completeOrder = (id) => updateOrderStatus(id, 'Completed')

const statusClass = (status) => {
  return 'flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ' + {
    Pending: 'bg-yellow-100 text-yellow-800',
    Accepted: 'bg-blue-100 text-blue-800',
    Completed: 'bg-green-100 text-green-800',
    Rejected: 'bg-red-100 text-red-800',
  }[status] || 'bg-gray-100 text-gray-800'
}

const borderClass = (status) => {
  return {
    Pending: 'border-yellow-400',
    Accepted: 'border-blue-400',
    Completed: 'border-green-400',
    Rejected: 'border-red-400',
  }[status] || 'border-gray-200'
}

const getStatusIcon = (status) => {
  switch (status) {
    case 'Pending': return ''
    case 'Accepted': return ''
    case 'Completed': return ''
    case 'Rejected': return '❌'
    default: return 'ℹ️'
  }
}

const formatDate = (dateStr) => new Date(dateStr).toLocaleString()

const filteredOrders = computed(() => {
  return allOrders.value.filter((order) => {
    const matchesSearch =
      order.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.service.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = statusFilter.value ? order.status === statusFilter.value : true
    return matchesSearch && matchesStatus
  })
})

onMounted(() => {
  const storedProvider = localStorage.getItem('user')
  if (storedProvider && JSON.parse(storedProvider).role === 'provider') {
    provider.value = JSON.parse(storedProvider)
  } else {
    toast.error('Unauthorized access')
    window.location.href = '/login'
  }
  fetchOrders()
})
</script>


<style>
/* Expand/Collapse Animation */
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
