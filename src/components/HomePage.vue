<template>
  <div class="min-h-screen bg-[#F0F9FF]">
    <header>
      <AppNavbar :mode="'default'" :showSearch="true" :hideExtras="true" @search="searchQuery = $event" />
    </header>

    <section class="bg-gradient-to-r from-blue-50 via-gray-50 to-blue-50 py-12 text-center shadow-sm">
      <h1
        class="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#3B8D99] to-[#f46675] bg-clip-text text-transparent mb-4">
        Your Helper, Anytime, Anywhere</h1>
      <p class="text-gray-600">Quality services delivered to your doorstep 🌟</p>
    </section>

    <!-- Services Section -->
    <section class="px-4 py-6 max-w-7xl mx-auto space-y-10">

      <!-- Filtered Search Results -->
      <div v-if="filteredResults.length">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">🔍 Search Results</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <service-card v-for="(service, index) in filteredResults" :key="'filtered-' + index" :service="service"
            @book="goToBooking(service.title)"
            @details="goToServiceDetails(service.title, service.desc, service.category)"
            :disableBooking="disableBooking" />
        </div>
      </div>

      <!-- Full List -->
      <div v-if="!searchQuery">
        <div class="divide-y divide-gray-200">
          <div v-for="category in services" :key="category.title"
            class="py-5 px-6 bg-gradient-to-r from-blue-50 via-gray-50 to-blue-50 rounded-2xl shadow-sm mb-8">
            <!-- Category Heading -->
            <h2 class="text-2xl font-semibold text-gray-800 flex items-center gap-3 mb-6">

              <span class="relative inline-block">
                {{ category.title }}
                <span class="absolute left-0 -bottom-1 w-full h-[1px] bg-[#007EA7] rounded-full"></span>
              </span>
            </h2>

            <!-- Service Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <service-card v-for="(service, index) in category.items" :key="index"
                :service="{ ...service, category: category.title }" @book="goToBooking(service.title)"
                @details="goToServiceDetails(service.title, service.desc, category.title)"
                :disableBooking="disableBooking" />
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
import ServiceCard from '@/components/ServiceCard.vue';
import API from '@/api';
import AppNavbar from '@/components/AppNavbar.vue'

const router = useRouter();
const route = useRoute();
const searchQuery = ref('');
const profilePicUrl = ref('');
const disableBooking = route.query.disableBooking === 'true';

// On mounted: load user from localStorage
onMounted(() => {
  const storedUserRaw = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');

  if (storedUserRaw && storedToken) {
    try {
      const storedUser = JSON.parse(storedUserRaw);
      auth.user = storedUser;
      auth.token = storedToken;
      auth.isLoggedIn = true;

      // Use getImageUrl helper
      if (storedUser.profilePic) {
        profilePicUrl.value = API.getImageUrl(storedUser.profilePic);
      } else {
        profilePicUrl.value = API.getImageUrl('default-user.png');
      }

    } catch {
      auth.user = null;
      auth.token = null;
      auth.isLoggedIn = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }
});
// Watch for changes in auth.user
watch(() => auth.user, (newUser) => {
  if (newUser?.profilePic) {
    profilePicUrl.value = API.getImageUrl(newUser.profilePic);
  } else {
    profilePicUrl.value = API.getImageUrl('default-user.png');
  }
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
  {
    title: '🛠️ Home & Repair Services', items: [
      { title: 'Carpenter', desc: 'Furniture repair, wooden work', price: 299 },
      { title: 'Electrician', desc: 'Wiring, appliance fitting, fans', price: 249 },
      { title: 'Plumber', desc: 'Pipe leakage, taps, water motors', price: 199 },
      { title: 'Mechanic', desc: 'Bike/car repair & servicing', price: 349 },
      { title: 'AC-Appliance Repair', desc: 'AC, fridge, washing machine repairs', price: 399 },
      { title: 'Painter', desc: 'House painting, texture walls', price: 299 },
      { title: 'Welder', desc: 'Metalwork, gates, frames', price: 199 }
    ]
  },
  {
    title: '🧼 Cleaning & Maintenance', items: [
      { title: 'House Cleaner', desc: 'Daily/weekly cleaning', price: 149 },
      { title: 'Sofa-Curtain Cleaner', desc: 'Deep cleaning for fabrics', price: 199 },
      { title: 'Water Tank Cleaner', desc: 'Sanitation of overhead tanks', price: 249 },
      { title: 'Pest Control', desc: 'Termite, cockroach, mosquito control', price: 299 },
    ]
  },
  {
    title: '🧑‍🌾 Outdoor & Utility', items: [
      { title: 'Gardener', desc: 'Planting, trimming, maintenance', price: 199 },
      { title: 'Security Guard', desc: 'Residential/commercial security', price: 299 },
      { title: 'Driver on Call', desc: 'Hourly/daily drivers', price: 199 },
      { title: 'Cook-Chef', desc: 'Part-time or full-time cooking help', price: 249 },
    ]
  },
  {
    title: '👩‍⚕️ Personal Services', items: [
      { title: 'Beautician', desc: 'Home salon, bridal makeup', price: 249 },
      { title: 'Massage Therapist', desc: 'Body massage, relaxation therapy', price: 299 },
      { title: 'Fitness Trainer', desc: 'Home workout or yoga sessions', price: 199 },
      { title: 'Babysitter', desc: 'Child care during office hours', price: 149 },
    ]
  },
  {
    title: '💻 Tech & Digital Services', items: [
      { title: 'Laptop-PC Repair', desc: 'Hardware/software issues', price: 299 },
      { title: 'CCTV Installation', desc: 'Camera setup for home/shop', price: 249 },
      { title: 'Mobile Technician', desc: 'Screen repair, battery, etc.', price: 199 },
      { title: 'Internet Technician', desc: 'Router, broadband, Wi-Fi setup', price: 149 },
    ]
  },
  {
    title: '📦 Bonus Services', items: [
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
