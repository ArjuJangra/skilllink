<template>
  <div class="min-h-screen bg-[#F0F9FF]">
    <!-- Header -->
    <header class="flex items-center justify-between p-4 bg-white shadow-md max-w-7xl mx-auto">
      <div class="flex items-center space-x-2">
        <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-10 h-10" />
        <h1 class="text-2xl font-bold text-[#007EA7]">SkillLink</h1>
      </div>
      <div class="flex items-center space-x-4">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search for services..."
          class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8E8] w-64"
        />
<router-link to="/dashboard" v-if="auth.user" >
  <img
    :src="auth.user.profilePic ? `http://localhost:5000/uploads/${auth.user.profilePic}` : require('@/assets/user.png')"
    alt="User"
    class="w-10 h-10 rounded-full object-cover border-2 border-[#0073b1] cursor-pointer"
  />
</router-link>

      </div>
    </header>

    <!-- Services Section -->
    <section class="px-4 py-6 max-w-7xl mx-auto space-y-10">
      
      <!-- 🔍 Filtered Results Section -->
      <div v-if="filteredResults.length">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">🔍 Search Results</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="(service, index) in filteredResults"
            :key="'filtered-' + index"
            class="bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition"
          >
            <div>
              <h3 class="text-lg font-semibold text-[#007EA7]">{{ service.title }}</h3>
              <p class="text-sm text-gray-600 mt-1">{{ service.desc }}</p>
              <p class="text-xs text-gray-400 mt-1 italic">From: {{ service.category }}</p>
            </div>
            <button
              @click="goToBooking(service.title)"
              :disabled="disableBooking"
              :class="[
                'ml-4 px-4 py-1 rounded transition',
                disableBooking
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#007EA7] text-white hover:bg-[#005f6b]'
              ]"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      <!-- 🧾 Original Full List (only when no search) -->
      <div v-if="!searchQuery">
        <div v-for="category in services" :key="category.title">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">{{ category.title }}</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="(service, index) in category.items"
              :key="index"
              class="bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition"
            >
              <div>
                <h3 class="text-lg font-semibold text-[#007EA7]">{{ service.title }}</h3>
                <p class="text-sm text-gray-600 mt-1">{{ service.desc }}</p>
              </div>
              <button
                @click="goToBooking(service.title)"
                :disabled="disableBooking"
                :class="[
                  'ml-4 px-4 py-1 rounded transition',
                  disableBooking
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#007EA7] text-white hover:bg-[#005f6b]'
                ]"
              >
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
import { ref ,computed ,onMounted} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { auth } from '@/stores/auth';

const router = useRouter();
const route = useRoute();

const disableBooking = route.query.disableBooking === 'true';
const searchQuery = ref('');


onMounted(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser && !auth.user) {
    auth.user = storedUser;
  }
});


const goToBooking = (serviceTitle) => {
  if (!disableBooking) {
    router.push({ path: '/booking', query: { service: serviceTitle } });
  }
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
// 🔍 Filter logic for search
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
