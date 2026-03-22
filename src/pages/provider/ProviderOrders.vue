<template>
  <div class="min-h-screen bg-[#F8FAFC] text-slate-800">
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 shadow-sm backdrop-blur-md border-b border-slate-100">
      <div class="max-w-6xl mx-auto px-4 py-3 sm:px-6 flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <img :src="skillLogo" alt="SkillLink Logo" class="w-9 h-9" />
          <span class="text-xl font-black text-[#0073b1] tracking-tight">SkillLink</span>
        </div>
        <nav class="flex items-center space-x-5">
          <router-link to="/serviceprovider" class="p-2 text-slate-500 hover:text-[#0073b1] transition">
            <i class="fas fa-home text-xl"></i>
          </router-link>
          <router-link to="/providerprofile">
            <img :src="profileImage" @error="handleImageError"
              class="w-10 h-10 rounded-2xl border-2 border-white shadow-sm object-cover" />
          </router-link>
        </nav>
      </div>
    </header>

    <div class="max-w-6xl mx-auto pt-28 px-4 pb-20">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 class="text-3xl font-black text-slate-900 mb-2">My Active Orders</h1>
          <p class="text-slate-500">You have <span class="text-[#0073b1] font-bold">{{ filteredOrders.length }}</span> bookings matching your filters.</p>
        </div>

        <div class="flex flex-wrap gap-3">
          <div class="relative flex-1 min-w-[240px]">
            <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input v-model="searchQuery" type="text" placeholder="Search customer or service..."
              class="w-full pl-11 pr-4 py-3 rounded-2xl border-none bg-white shadow-sm focus:ring-2 focus:ring-[#0073b1] transition-all" />
          </div>
          <select v-model="statusFilter"
            class="px-4 py-3 rounded-2xl border-none bg-white shadow-sm font-bold text-slate-600 focus:ring-2 focus:ring-[#0073b1] transition-all cursor-pointer">
            <option value="">All Status</option>
            <option value="pending">🟡 Pending</option>
            <option value="accepted">🔵 Accepted</option>
            <option value="completed">🟢 Completed</option>
            <option value="rejected">🔴 Rejected</option>
          </select>
        </div>
      </div>

      <div v-if="filteredOrders.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="order in filteredOrders" :key="order.$id"
          class="bg-white rounded-[2rem] p-6 border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          :class="borderClass(order.status)">
          
          <div class="flex justify-between items-start mb-6">
            <div class="p-3 rounded-2xl" :class="statusBg(order.status)">
               <i :class="getServiceIcon(order.service)" class="text-xl"></i>
            </div>
            <span :class="statusClass(order.status)" class="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-xl">
              {{ order.status || 'pending' }}
            </span>
          </div>

          <h3 class="text-xl font-black text-slate-900 mb-1">{{ order.service }}</h3>
          <p class="text-xs text-slate-400 mb-6 flex items-center gap-1">
            <i class="far fa-clock"></i> Booked on {{ formatDate(order.$createdAt) }}
          </p>

          <div class="space-y-4 mb-8">
            <div class="flex items-center gap-4">
              <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 text-xs">
                <i class="fas fa-user"></i>
              </div>
              <div>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Customer</p>
                <p class="text-sm font-bold text-slate-700">{{ order.userName }}</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 text-xs">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div class="flex-1">
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Service Address</p>
                <p class="text-sm font-medium text-slate-600 line-clamp-1" :title="order.address">{{ order.address }}</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#0073b1] text-xs">
                <i class="fas fa-calendar-day"></i>
              </div>
              <div>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Schedule</p>
                <p class="text-sm font-bold text-slate-700">{{ order.date }} • {{ order.time }}</p>
              </div>
            </div>
          </div>

          <div class="bg-slate-50 rounded-2xl p-4 flex justify-between items-center mb-6">
            <span class="text-xs font-bold text-slate-400 uppercase">Payout</span>
            <span class="text-xl font-black text-[#0073b1]">₹{{ order.price }}</span>
          </div>

          <div class="flex gap-3">
            <template v-if="normalizeStatus(order.status) === 'pending'">
              <button @click="updateStatus(order.$id, 'Accepted')"
                class="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold transition shadow-lg shadow-green-100">
                Accept
              </button>
              <button @click="updateStatus(order.$id, 'Rejected')"
                class="px-4 bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-500 py-3 rounded-xl font-bold transition">
                <i class="fas fa-times"></i>
              </button>
            </template>

            <button v-else-if="normalizeStatus(order.status) === 'accepted'" 
              @click="updateStatus(order.$id, 'Completed')"
              class="flex-1 bg-[#0073b1] hover:bg-[#005f8d] text-white py-3 rounded-xl font-bold transition shadow-lg shadow-blue-100">
              <i class="fas fa-check-circle mr-2"></i> Mark Completed
            </button>

            <div v-else class="w-full text-center py-2 text-xs font-bold text-slate-300 uppercase tracking-widest">
              No further actions
            </div>
          </div>
        </div>
      </div>

      <div v-else class="py-20 text-center bg-white rounded-[3rem] shadow-sm border border-slate-50">
        <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fas fa-inbox text-slate-200 text-3xl"></i>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-2">No bookings found</h3>
        <p class="text-slate-400">Try adjusting your filters or search query.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
// Appwrite Imports
import { databases, storage, APPWRITE_CONFIG } from '@/appwrite';
import { Query, ID } from 'appwrite';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import skillLogo from '@/assets/skilllogo.png';
const defaultPic = require('@/assets/user.png');

const router = useRouter();
const provider = ref(null);
const allOrders = ref([]);
const searchQuery = ref('');
const statusFilter = ref('');
// Add these to your existing script section
const normalizeStatus = (status) => String(status || 'pending').toLowerCase();

const statusBg = (status) => {
  const s = normalizeStatus(status);
  if (s === 'pending') return 'bg-yellow-50 text-yellow-600';
  if (s === 'accepted') return 'bg-blue-50 text-blue-600';
  if (s === 'completed') return 'bg-green-50 text-green-600';
  return 'bg-slate-50 text-slate-600';
};

const getServiceIcon = (service) => {
  const s = String(service).toLowerCase();
  if (s.includes('plumb')) return 'fas fa-faucet';
  if (s.includes('electr')) return 'fas fa-bolt';
  if (s.includes('paint')) return 'fas fa-paint-roller';
  if (s.includes('clean')) return 'fas fa-broom';
  if (s.includes('ac')) return 'fas fa-wind';
  return 'fas fa-tools';
};

// Ensure your existing statusClass and borderClass use normalizeStatus(status)
// Updated Profile Image Logic for Appwrite Storage
const profileImage = computed(() => {
  if (provider.value?.profilePic) {
    return storage.getFilePreview(APPWRITE_CONFIG.storageBucket, provider.value.profilePic);
  }
  return defaultPic;
});

// Fetching correct booking data from Appwrite
const fetchOrders = async () => {
  try {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const userData = JSON.parse(userString);
    const providerId = userData.$id; // Assuming Appwrite Auth ID is used

    const response = await databases.listDocuments(
      APPWRITE_CONFIG.dbId,
      APPWRITE_CONFIG.bookingsCollection,
      [
        Query.equal('providerId', providerId),
        Query.orderDesc('$createdAt')
      ]
    );
    allOrders.value = response.documents;
  } catch (err) {
    console.error(err);
    toast.error('Failed to load bookings');
  }
};

const updateStatus = async (id, newStatus) => {
  try {
    // 1. Update the booking status first
    const booking = await databases.updateDocument(
      APPWRITE_CONFIG.dbId,
      APPWRITE_CONFIG.bookingsCollection,
      id,
      { status: newStatus }
    );

    // DEBUG: Check if the booking document actually has a userId
    console.log("Found Customer ID:", booking.userId);

    if (!booking.userId) {
      toast.error("User ID missing in booking record. Cannot notify user.");
      return;
    }

    // 2. Create the Notification Document
    // Ensure the keys match your schema: userId, message, type, read
    await databases.createDocument(
      APPWRITE_CONFIG.dbId,
      'notifications', // Your Notifications Collection ID
      ID.unique(),
      {
        userId: String(booking.userId), // Ensure it's a string
        message: `Your booking for ${booking.service} has been ${newStatus.toLowerCase()}.`,
        type: 'booking', 
        read: false // This matches your Boolean attribute
      }
    );

    toast.success(`Order ${newStatus} & User Notified!`);
    fetchOrders(); // Refresh the UI list

  } catch (err) {
    console.error("Appwrite Save Error:", err);
    // This will tell you if an attribute size is too small or if a field is missing
    toast.error(`Database Error: ${err.message}`);
  }
};

const statusClass = (status) => {
  const s = status?.toLowerCase();
  if (s === 'pending') return 'bg-yellow-100 text-yellow-800';
  if (s === 'accepted') return 'bg-blue-100 text-blue-800';
  if (s === 'completed') return 'bg-green-100 text-green-800';
  if (s === 'rejected') return 'bg-red-100 text-red-800';
  return 'bg-gray-100 text-gray-800';
};

const borderClass = (status) => {
  const s = status?.toLowerCase();
  if (s === 'pending') return 'border-yellow-400';
  if (s === 'accepted') return 'border-blue-400';
  if (s === 'completed') return 'border-green-400';
  if (s === 'rejected') return 'border-red-400';
  return 'border-gray-200';
};



const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

const filteredOrders = computed(() =>
  allOrders.value.filter((order) => {
    const matchesSearch =
      (order.userName?.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (order.service?.toLowerCase().includes(searchQuery.value.toLowerCase()));
    
    // Status filter (handling case sensitivity)
    const matchesStatus = statusFilter.value 
      ? order.status?.toLowerCase() === statusFilter.value.toLowerCase() 
      : true;
      
    return matchesSearch && matchesStatus;
  })
);

const handleImageError = (e) => (e.target.src = defaultPic);

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    if (userData.role === 'provider') {
      provider.value = userData;
      fetchOrders();
    } else {
      router.push('/login');
    }
  } else {
    router.push('/login');
  }
});
</script>