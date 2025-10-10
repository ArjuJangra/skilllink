<template>
  <div class="min-h-screen bg-[#F0F9FF]">
    <header class="bg-white shadow sticky top-0 z-50">
      <AppNavbar :mode="'default'" :showSearch="true" :hideExtras="true" @search="searchQuery = $event" />
    </header>

    <!-- Hero -->
    <section class="bg-gradient-to-r from-blue-50 via-gray-50 to-blue-50 py-6 sm:py-10 px-4 text-center shadow-sm">
      <div class="max-w-3xl mx-auto">
        <h1
          class="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#3B8D99] to-[#f46675] bg-clip-text text-transparent leading-snug">
          Your Helper, Anytime, Anywhere
        </h1>
      </div>
    </section>

    <!-- Services Section -->
    <section class="px-4 py-10 max-w-7xl mx-auto space-y-10">
      <!-- Section Heading -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 class="text-3xl font-bold text-gray-900">Our Services</h1>

        <!-- Sorting -->
        <select v-model="sortBy"
          class="px-3 py-2 border rounded-lg text-sm text-gray-700 focus:ring-[#0073b1] focus:border-[#0073b1]">
          <option value="popular">Most Popular</option>
          <option value="newest">Newest</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
        </select>
      </div>

      <!-- Filtered Search Results -->
      <div v-if="filteredResults.length">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">🔍 Search Results</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <service-card v-for="(service, index) in filteredResults" :key="'filtered-' + index" :service="service"
            class="transform hover:scale-105 transition duration-200"
            @book="goToBooking(service.title)"
            @details="goToServiceDetails(service.title, service.desc, service.category)"
            :disableBooking="disableBooking" />
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="searchQuery && !filteredResults.length" class="text-center py-10">
        <p class="text-gray-600 text-lg">
          No services found for "<span class="font-semibold">{{ searchQuery }}</span>"
        </p>
        <button @click="searchQuery = ''"
          class="mt-4 px-4 py-2 bg-[#0073b1] text-white rounded-lg hover:bg-[#005f8d] transition">
          Reset Search
        </button>
      </div>

      <!-- Full List -->
      <div v-if="!searchQuery">
        <div class="divide-y divide-gray-200">
          <div v-for="category in sortedServices" :key="category.title"
            class="py-6 bg-gradient-to-r from-blue-50 via-gray-50 to-blue-50 rounded-2xl shadow-sm mb-8">
            <!-- Category Heading -->
            <h2 class="text-2xl font-semibold text-gray-800 flex items-center gap-3 mb-2">
              <span class="relative inline-block">
                {{ category.title }}
                <span class="absolute left-0 -bottom-1 w-full h-[1px] bg-[#007EA7] rounded-full"></span>
              </span>
            </h2>

            <!-- Optional description -->
            <p v-if="category.desc" class="text-gray-600 text-sm mb-6">
              {{ category.desc }}
            </p>

            <!-- Service Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <service-card v-for="(service, index) in category.items" :key="index"
                :service="{ ...service, category: category.title }"
                class="transform hover:scale-105 transition duration-200"
                @book="goToBooking(service.title)"
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
import AppNavbar from '@/components/AppNavbar.vue';

const router = useRouter();
const route = useRoute();
const searchQuery = ref('');
const profilePicUrl = ref('');
const disableBooking = route.query.disableBooking === 'true';
const sortBy = ref('popular');

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

// Helper function for sorting
function sortServices(list) {
  if (sortBy.value === 'priceLow') {
    return [...list].sort((a, b) => a.price - b.price);
  } else if (sortBy.value === 'priceHigh') {
    return [...list].sort((a, b) => b.price - a.price);
  } else if (sortBy.value === 'newest') {
    return [...list].reverse(); // replace with actual date field later
  }
  return list; // popular (default)
}

// Services data
const services = [
  {
    title: '🛠️ Home & Repair Services',
    desc: 'Reliable professionals for all your home repair needs.',
    items: [
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
    title: '🧼 Cleaning & Maintenance',
    desc: 'Keep your home and office fresh, clean, and hygienic.',
    items: [
      { title: 'House Cleaner', desc: 'Daily/weekly cleaning', price: 149 },
      { title: 'Sofa-Curtain Cleaner', desc: 'Deep cleaning for fabrics', price: 199 },
      { title: 'Water Tank Cleaner', desc: 'Sanitation of overhead tanks', price: 249 },
      { title: 'Pest Control', desc: 'Termite, cockroach, mosquito control', price: 299 },
    ]
  },
  {
    title: '🧑‍🌾 Outdoor & Utility',
    desc: 'Reliable helpers for your outdoor and utility needs.',
    items: [
      { title: 'Gardener', desc: 'Planting, trimming, maintenance', price: 199 },
      { title: 'Security Guard', desc: 'Residential/commercial security', price: 299 },
      { title: 'Driver on Call', desc: 'Hourly/daily drivers', price: 199 },
      { title: 'Cook-Chef', desc: 'Part-time or full-time cooking help', price: 249 },
    ]
  },
  {
    title: '👩‍⚕️ Personal Services',
    desc: 'Trusted personal care and lifestyle services at home.',
    items: [
      { title: 'Beautician', desc: 'Home salon, bridal makeup', price: 249 },
      { title: 'Massage Therapist', desc: 'Body massage, relaxation therapy', price: 299 },
      { title: 'Fitness Trainer', desc: 'Home workout or yoga sessions', price: 199 },
      { title: 'Babysitter', desc: 'Child care during office hours', price: 149 },
    ]
  },
  {
    title: '💻 Tech & Digital Services',
    desc: 'Technical experts for all your digital needs.',
    items: [
      { title: 'Laptop-PC Repair', desc: 'Hardware/software issues', price: 299 },
      { title: 'CCTV Installation', desc: 'Camera setup for home/shop', price: 249 },
      { title: 'Mobile Technician', desc: 'Screen repair, battery, etc.', price: 199 },
      { title: 'Internet Technician', desc: 'Router, broadband, Wi-Fi setup', price: 149 },
    ]
  },
  {
    title: '📦 Bonus Services',
    desc: 'Extra services to make your life easier.',
    items: [
      { title: 'Courier Pickup-Delivery', desc: 'Local package pickup & drop', price: 99 },
      { title: 'Home Shifting', desc: 'Relocation and moving help', price: 399 },
      { title: 'Tailor', desc: 'Stitching & alteration', price: 149 },
      { title: 'Event Decorator', desc: 'Events & party decoration', price: 399 },
      { title: 'Pet Groomer', desc: 'Pet care and grooming at home', price: 199 },
    ]
  }
];

// Filtered (search) results with sorting
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
  return sortServices(results);
});

// Sorted full service list
const sortedServices = computed(() => {
  return services.map(category => {
    return {
      ...category,
      items: sortServices(category.items),
    };
  });
});
</script>


