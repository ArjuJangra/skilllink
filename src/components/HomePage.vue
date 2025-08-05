<template>
  <div class="min-h-screen bg-[#F0F9FF]">
    <!-- Header -->
    <header class="sticky top-0 z-50 flex items-center justify-between p-4 bg-white shadow-md max-w-7xl mx-auto">
      <div class="flex items-center space-x-2">
        <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-10 h-10" />
        <h1 class="text-2xl font-bold text-[#007EA7]">SkillLink</h1>
      </div>
      <div class="flex items-center space-x-4">
        <div class="relative w-full max-w-md mx-auto">
          <span class="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-400">
            <i class="fas fa-search"></i>
          </span>
          <input type="text" v-model="searchQuery" placeholder="Search for services..."
            class="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00A8E8] focus:border-[#00A8E8] transition duration-200" />
          <button v-if="searchQuery" @click="searchQuery = ''"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-900 transition"
            type="button">
            <i class="fas fa-times-circle"></i>
          </button>
        </div>
        <template v-if="auth.isLoggedIn">
          <router-link to="/dashboard" class="group relative inline-block">
            <img :src="profilePicUrl || require('@/assets/user.png')" alt="User Avatar"
              class="w-10 h-10 rounded-full object-cover border-2 border-[#0073b1] shadow-sm transition-transform duration-200 group-hover:scale-105 group-hover:shadow-md" />
            <span
              class="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] bg-black text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-90 pointer-events-none transition-opacity duration-200">
              Dashboard
            </span>
          </router-link>
        </template>
        <template v-else>
          <router-link to="/signup">
            <button
              class="px-4 py-2 bg-[#0073b1] text-white font-semibold rounded-lg hover:bg-[#005f91] transition duration-200">
              Login/Sign Up
            </button>
          </router-link>
        </template>
      </div>
    </header>

    <!-- Services Section -->
    <section class="px-4 py-6 max-w-7xl mx-auto space-y-10">
      <!-- 🔍 Filtered Results Section -->
      <div v-if="filteredResults.length">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">🔍 Search Results</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="(service, index) in filteredResults" :key="'filtered-' + index"
            class="bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition">
            <div @click="goToServiceDetails(service.title, service.desc, service.category)" class="cursor-pointer">
              <h3 class="text-lg font-semibold text-[#007EA7] hover:underline">{{ service.title }}</h3>
              <p class="text-sm text-gray-600 mt-1">{{ service.desc }}</p>
              <p class="text-xs text-gray-400 mt-1 italic">From: {{ service.category }}</p>
            </div>
            <button @click="goToBooking(service.title)" :disabled="disableBooking" :class="[
              'ml-4 px-4 py-1 rounded transition',
              disableBooking ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#007EA7] text-white hover:bg-[#005f6b]'
            ]">
              Book Now
            </button>
          </div>
        </div>
      </div>

      <!-- 🧾 Original Full List -->
      <div v-if="!searchQuery">
        <div v-for="category in services" :key="category.title">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">{{ category.title }}</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="(service, index) in category.items" :key="index"
              class="bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition">
              <div @click="goToServiceDetails(service.title, service.desc, category.title)" class="cursor-pointer">
                <h3 class="text-lg font-semibold text-[#007EA7] hover:underline">{{ service.title }}</h3>
                <p class="text-sm text-gray-600 mt-1">{{ service.desc }}</p>
              </div>
              <button @click="goToBooking(service.title)" :disabled="disableBooking" :class="[
                'ml-4 px-4 py-1 rounded transition',
                disableBooking ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#007EA7] text-white hover:bg-[#005f6b]'
              ]">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { auth } from '@/stores/auth';

const router = useRouter();
const route = useRoute();

const disableBooking = route.query.disableBooking === 'true';
const searchQuery = ref('');
const profilePicUrl = ref('');

onMounted(() => {
  const storedUserRaw = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');

  if (storedUserRaw && storedToken) {
    try {
      const storedUser = JSON.parse(storedUserRaw);
      auth.user = storedUser;
      auth.token = storedToken;
      auth.isLoggedIn = true;

      if (storedUser.profilePic) {
        profilePicUrl.value = `http://localhost:5000/uploads/${storedUser.profilePic}?t=${Date.now()}`;
      }
    } catch (err) {
      console.error('Failed to parse user from localStorage', err);
    }
  } else {
    auth.user = null;
    auth.token = null;
    auth.isLoggedIn = false;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
});

watch(
  () => auth.user,
  (newUser) => {
    if (newUser?.profilePic) {
      profilePicUrl.value = `http://localhost:5000/uploads/${newUser.profilePic}?t=${Date.now()}`;
    } else {
      profilePicUrl.value = '';
    }
  },
  { immediate: true, deep: true }
);

const goToBooking = (serviceTitle) => {
  if (!disableBooking) {
    router.push({ path: '/booking', query: { service: serviceTitle } });
  }
};

const goToServiceDetails = (title, desc, category) => {
  router.push({
    name: 'ServiceDetails',
    query: {
      title,
      desc,
      category
    }
  });
};



const services = [
  {
    title: '🛠️ Home & Repair Services',
    items: [
      { title: 'Carpenter', desc: 'Furniture repair, wooden work' },
      { title: 'Electrician', desc: 'Wiring, appliance fitting, fans' },
      { title: 'Plumber', desc: 'Pipe leakage, taps, water motors' },
      { title: 'Mechanic', desc: 'Bike/car repair & servicing' },
      { title: 'AC/Appliance Repair', desc: 'AC, fridge, washing machine repairs' },
      { title: 'Painter', desc: 'House painting, texture walls' },
      { title: 'Welder', desc: 'Metalwork, gates, frames' },
    ]
  },
  {
    title: '🧼 Cleaning & Maintenance',
    items: [
      { title: 'House Cleaner', desc: 'Daily/weekly cleaning' },
      { title: 'Sofa/Curtain Cleaner', desc: 'Deep cleaning for fabrics' },
      { title: 'Water Tank Cleaner', desc: 'Sanitation of overhead tanks' },
      { title: 'Pest Control', desc: 'Termite, cockroach, mosquito control' },
    ]
  },
  {
    title: '🧑‍🌾 Outdoor & Utility',
    items: [
      { title: 'Gardener', desc: 'Planting, trimming, maintenance' },
      { title: 'Security Guard', desc: 'Residential/commercial security' },
      { title: 'Driver on Call', desc: 'Hourly/daily drivers' },
      { title: 'Cook/Chef', desc: 'Part-time or full-time cooking help' },
    ]
  },
  {
    title: '👩‍⚕️ Personal Services',
    items: [
      { title: 'Beautician', desc: 'Home salon, bridal makeup' },
      { title: 'Massage Therapist', desc: 'Body massage, relaxation therapy' },
      { title: 'Fitness Trainer', desc: 'Home workout or yoga sessions' },
      { title: 'Babysitter', desc: 'Child care during office hours' },
    ]
  },
  {
    title: '💻 Tech & Digital Services',
    items: [
      { title: 'Laptop/PC Repair', desc: 'Hardware/software issues' },
      { title: 'CCTV Installation', desc: 'Camera setup for home/shop' },
      { title: 'Mobile Technician', desc: 'Screen repair, battery, etc.' },
      { title: 'Internet Technician', desc: 'Router, broadband, Wi-Fi setup' },
    ]
  },
  {
    title: '📦 Bonus Services',
    items: [
      { title: 'Courier Pickup/Delivery', desc: 'Local package pickup & drop' },
      { title: 'House Shifting/Packers', desc: 'Relocation and moving help' },
      { title: 'Tailor', desc: 'Stitching & alteration' },
      { title: 'Event Decorator', desc: 'Events & party decoration' },
      { title: 'Pet Groomer', desc: 'Pet care and grooming at home' },
    ]
  }
];

const filteredResults = computed(() => {
  if (!searchQuery.value.trim()) return [];
  const query = searchQuery.value.toLowerCase();
  const results = [];
  services.forEach((category) => {
    category.items.forEach((item) => {
      if (
        item.title.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query)
      ) {
        results.push({ ...item, category: category.title });
      }
    });
  });
  return results;
});
</script>
