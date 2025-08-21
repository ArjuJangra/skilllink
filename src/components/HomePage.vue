<template>
  <div class="min-h-screen bg-[#F0F9FF]">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-gradient-to-r from-white via-[#f1faff] to-[#f5fafe] shadow-md w-full">
      <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-10 h-10" />
          <h1 class="text-2xl font-bold text-[#007EA7] hidden sm:block">SkillLink</h1>
        </div>

        <!-- Right Side -->
        <div class="flex items-center space-x-4">
          <!-- Mobile Search -->
          <button @click="showMobileSearch = !showMobileSearch" class="sm:hidden text-gray-600 text-xl focus:outline-none">
            <i class="fas fa-search text-[#007EA7] hover:text-[#005f6b] cursor-pointer" title="Search services"></i>
          </button>

          <!-- Desktop Search -->
          <div class="hidden sm:block relative w-72">
            <span class="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-400">
              <i class="fas fa-search"></i>
            </span>
            <input type="text" v-model="searchQuery" placeholder="Search for services..."
              class="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00A8E8] focus:border-[#00A8E8] transition duration-200" />
            <button v-if="searchQuery" @click="searchQuery = ''"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-900 transition">
              <i class="fas fa-times-circle"></i>
            </button>
          </div>

          <!-- User Login/Profile -->
          <template v-if="auth.isLoggedIn">
            <router-link to="/dashboard" class="group relative inline-block">
              <img :src="profilePicUrl || require('@/assets/user.png')" alt="User Avatar"
                class="w-10 h-10 rounded-full object-cover border-2 border-[#0073b1] shadow-sm transition-transform duration-200 group-hover:scale-105 group-hover:shadow-md" />
            </router-link>
          </template>
          <template v-else>
            <router-link to="/signup" class="hidden sm:block">
              <button
                class="px-6 py-2 bg-[#0073b1] text-white font-semibold rounded-lg hover:bg-[#005f91] transition duration-200">
                Login / Sign Up
              </button>
            </router-link>
            <router-link to="/signup" class="sm:hidden">
              <i class="fas fa-user-circle text-[#007EA7] text-2xl hover:text-[#005f6b] cursor-pointer" title="Login / Signup"></i>
            </router-link>
          </template>
        </div>
      </div>

      <!-- Mobile Search Input -->
      <div v-if="showMobileSearch" class="sm:hidden px-4 pb-3">
        <div class="relative">
          <span class="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-400">
            <i class="fas fa-search"></i>
          </span>
          <input type="text" v-model="searchQuery" placeholder="Search..."
            class="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00A8E8] focus:border-[#00A8E8] transition duration-200" />
          <button v-if="searchQuery" @click="searchQuery = ''"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-900 transition">
            <i class="fas fa-times-circle"></i>
          </button>
        </div>
      </div>
    </header>

    <!-- Services Section -->
    <section class="px-4 py-6 max-w-7xl mx-auto space-y-10">

      <!-- Filtered Search Results -->
      <div v-if="filteredResults.length">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">🔍 Search Results</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <service-card
            v-for="(service, index) in filteredResults"
            :key="'filtered-' + index"
            :service="service"
            @book="goToBooking(service.title)"
            @details="goToServiceDetails(service.title, service.desc, service.category)"
            :disableBooking="disableBooking"
          />
        </div>
      </div>

      <!-- Full List -->
      <div v-if="!searchQuery">
        <div v-for="category in services" :key="category.title" class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">{{ category.title }}</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <service-card
              v-for="(service, index) in category.items"
              :key="index"
              :service="{ ...service, category: category.title }"
              @book="goToBooking(service.title)"
              @details="goToServiceDetails(service.title, service.desc, category.title)"
              :disableBooking="disableBooking"
            />
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
import ServiceCard from '@/components/ServiceCard.vue';

const router = useRouter();
const route = useRoute();
const showMobileSearch = ref(false);
const searchQuery = ref('');
const profilePicUrl = ref('');
const disableBooking = route.query.disableBooking === 'true';

// User profile handling
onMounted(() => {
  const storedUserRaw = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');

  if (storedUserRaw && storedToken) {
    try {
      const storedUser = JSON.parse(storedUserRaw);
      auth.user = storedUser;
      auth.token = storedToken;
      auth.isLoggedIn = true;
      if (storedUser.profilePic) profilePicUrl.value = `/uploads/${storedUser.profilePic}?t=${Date.now()}`;
    } catch {
      auth.user = null;
      auth.token = null;
      auth.isLoggedIn = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }
});

watch(() => auth.user, (newUser) => {
  if (newUser?.profilePic) {
    profilePicUrl.value = `/uploads/${newUser.profilePic}?t=${Date.now()}`;
  } else profilePicUrl.value = '';
}, { immediate: true, deep: true });

// Navigation methods
const goToBooking = (serviceTitle) => {
  if (!disableBooking) router.push({ path: '/booking', query: { service: serviceTitle } });
};
const goToServiceDetails = (title, desc, category) => {
  router.push({ name: 'ServiceDetails', query: { title, desc, category } });
};

// Services data
const services = [
  { title: '🛠️ Home & Repair Services', items: [
      { title: 'Carpenter', desc: 'Furniture repair, wooden work', price: 299 },
      { title: 'Electrician', desc: 'Wiring, appliance fitting, fans', price: 249 },
      { title: 'Plumber', desc: 'Pipe leakage, taps, water motors', price: 199 },
      { title: 'Mechanic', desc: 'Bike/car repair & servicing', price: 349 },
      { title: 'AC-Appliance Repair', desc: 'AC, fridge, washing machine repairs', price: 399 },
      { title: 'Painter', desc: 'House painting, texture walls', price: 299 },
      { title: 'Welder', desc: 'Metalwork, gates, frames', price: 199 }
    ]
  },
  { title: '🧼 Cleaning & Maintenance', items: [
      { title: 'House Cleaner', desc: 'Daily/weekly cleaning', price: 149 },
      { title: 'Sofa-Curtain Cleaner', desc: 'Deep cleaning for fabrics', price: 199 },
      { title: 'Water Tank Cleaner', desc: 'Sanitation of overhead tanks', price: 249 },
      { title: 'Pest Control', desc: 'Termite, cockroach, mosquito control', price: 299 },
    ]
  },
  { title: '🧑‍🌾 Outdoor & Utility', items: [
      { title: 'Gardener', desc: 'Planting, trimming, maintenance', price: 199 },
      { title: 'Security Guard', desc: 'Residential/commercial security', price: 299 },
      { title: 'Driver on Call', desc: 'Hourly/daily drivers', price: 199 },
      { title: 'Cook-Chef', desc: 'Part-time or full-time cooking help', price: 249 },
    ]
  },
  { title: '👩‍⚕️ Personal Services', items: [
      { title: 'Beautician', desc: 'Home salon, bridal makeup', price: 249 },
      { title: 'Massage Therapist', desc: 'Body massage, relaxation therapy', price: 299 },
      { title: 'Fitness Trainer', desc: 'Home workout or yoga sessions', price: 199 },
      { title: 'Babysitter', desc: 'Child care during office hours', price: 149 },
    ]
  },
  { title: '💻 Tech & Digital Services', items: [
      { title: 'Laptop-PC Repair', desc: 'Hardware/software issues', price: 299 },
      { title: 'CCTV Installation', desc: 'Camera setup for home/shop', price: 249 },
      { title: 'Mobile Technician', desc: 'Screen repair, battery, etc.', price: 199 },
      { title: 'Internet Technician', desc: 'Router, broadband, Wi-Fi setup', price: 149 },
    ]
  },
  { title: '📦 Bonus Services', items: [
      { title: 'Courier Pickup-Delivery', desc: 'Local package pickup & drop', price: 99 },
      { title: 'Home Shifting', desc: 'Relocation and moving help', price: 399 },
      { title: 'Tailor', desc: 'Stitching & alteration', price: 149 },
      { title: 'Event Decorator', desc: 'Events & party decoration', price: 399 },
      { title: 'Pet Groomer', desc: 'Pet care and grooming at home', price: 199 },
    ]
  }
];

const filteredResults = computed(() => {
  if (!searchQuery.value.trim()) return [];
  const query = searchQuery.value.toLowerCase();
  const results = [];
  services.forEach(category => {
    category.items.forEach(item => {
      if (item.title.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)) {
        results.push({ ...item, category: category.title });
      }
    });
  });
  return results;
});
</script>

