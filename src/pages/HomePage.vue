<template>
  <div class="min-h-screen bg-[#F8FAFC]">
    <AppNavbar :showSearch="true" />

    <div class="bg-white border-b border-gray-100">
      <section class="max-w-7xl mx-auto px-6 py-10">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div class="space-y-2">
          
            <h1 class="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              {{ searchQuery ? `Results for "${searchQuery}"` : 'Professional Services' }}
            </h1>
            <p class="text-gray-500 text-base">
              {{ searchQuery ? `We found ${filteredResults.length} services matching your interest.` : 'Hand-picked, background-verified experts in Noida.' }}
            </p>
          </div>

          <div class="flex items-center gap-3 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
            <span class="text-[10px] font-bold text-gray-400 uppercase pl-3">Sort By</span>
            <select v-model="sortBy"
              class="bg-transparent border-none text-sm font-bold text-gray-700 px-3 py-1.5 outline-none focus:ring-0 cursor-pointer">
              <option value="popular">Recommended</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>
    </div>

    <nav class="sticky top-[64px] bg-white/80 backdrop-blur-md border-b z-40 overflow-x-auto no-scrollbar py-3 px-6">
      <div class="max-w-7xl mx-auto flex items-center gap-3">
        <button @click="selectedCategory = 'All'"
          :class="selectedCategory === 'All' ? 'bg-[#0073b1] text-white shadow-lg shadow-blue-100' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'"
          class="px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap">
          All Services
        </button>
        <button v-for="cat in availableCategories" :key="cat" @click="selectedCategory = cat"
          :class="selectedCategory === cat ? 'bg-[#0073b1] text-white shadow-lg shadow-blue-100' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'"
          class="px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap">
          {{ cat }}
        </button>
      </div>
    </nav>

    <main class="px-6 py-12 max-w-7xl mx-auto min-h-[60vh]">
      
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div v-for="n in 6" :key="n" class="h-72 bg-white border border-gray-100 rounded-3xl p-6 space-y-4">
          <div class="w-full h-40 bg-gray-100 animate-pulse rounded-2xl"></div>
          <div class="h-6 w-2/3 bg-gray-100 animate-pulse rounded-md"></div>
          <div class="h-4 w-full bg-gray-50 animate-pulse rounded-md"></div>
        </div>
      </div>

      <div v-else>
        <div v-if="searchQuery" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <ServiceCard v-for="service in filteredResults" :key="service.$id" :service="service"
            class="transform transition-all duration-300 hover:-translate-y-2" 
            @book="goToBooking(service.title)"
            @details="goToServiceDetails(service.title, service.desc, service.category)" />
          
          <div v-if="filteredResults.length === 0" class="col-span-full text-center py-24">
            <div class="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
               <i class="fas fa-search text-3xl text-gray-300"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900">No services found</h3>
            <p class="text-gray-500 mt-2">Try searching for "Plumbing", "Salon", or "Cleaning"</p>
            <button @click="clearSearch" class="mt-6 text-[#0073b1] font-bold hover:underline">Clear Search</button>
          </div>
        </div>

        <div v-else class="space-y-20">
          <div v-for="category in displayedGroups" :key="category.title">
            <div class="flex items-center gap-4 mb-8">
              <h3 class="text-2xl font-black text-gray-900">{{ category.title }}</h3>
              <div class="h-px flex-1 bg-gray-100"></div>
              <span class="text-xs font-bold text-gray-400 bg-white px-3 border border-gray-100 rounded-full py-1">{{ category.items.length }} Services</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              <ServiceCard v-for="service in category.items" :key="service.$id" :service="service"
                class="transform transition-all duration-300 hover:-translate-y-2" 
                @book="goToBooking(service.title)"
                @details="goToServiceDetails(service.title, service.desc, category.title)" />
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-white border-t border-gray-100 py-16 px-6">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
            <i class="fas fa-shield-alt text-xl"></i>
          </div>
          <div>
            <h4 class="font-bold text-gray-900 mb-1">Quality Assured</h4>
            <p class="text-gray-500 text-sm leading-relaxed">Every professional is background checked and rigorously trained for excellence.</p>
          </div>
        </div>
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 shrink-0">
            <i class="fas fa-tags text-xl"></i>
          </div>
          <div>
            <h4 class="font-bold text-gray-900 mb-1">Transparent Pricing</h4>
            <p class="text-gray-500 text-sm leading-relaxed">No hidden fees or surprises. You pay exactly what you see during the booking.</p>
          </div>
        </div>
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 shrink-0">
            <i class="fas fa-headset text-xl"></i>
          </div>
          <div>
            <h4 class="font-bold text-gray-900 mb-1">24/7 Support</h4>
            <p class="text-gray-500 text-sm leading-relaxed">Our Noida-based support team is here to help you before, during, and after service.</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'; // Added useRoute
import { databases, APPWRITE_CONFIG } from '@/appwrite';
import { Query } from 'appwrite';
import ServiceCard from '@/components/ServiceCard.vue';
import AppNavbar from '@/components/AppNavbar.vue';

const router = useRouter();
const route = useRoute(); // Access current URL

// DATA STATE
const sortBy = ref('popular');
const selectedCategory = ref('All');
const rawServices = ref([]);
const loading = ref(true);

// LISTEN TO URL SEARCH: This replaces the local searchQuery = ref('')
const searchQuery = computed(() => route.query.q || '');

const fetchServices = async () => {
  try {
    loading.value = true;
    const res = await databases.listDocuments(APPWRITE_CONFIG.dbId, 'services', [Query.limit(100)]);
    rawServices.value = res.documents;
  } catch (err) {
    console.error("Failed to fetch services:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchServices);

// LOGIC: Filter categories for the nav bar
const availableCategories = computed(() => {
  const cats = new Set(rawServices.value.map(s => s.category));
  return Array.from(cats).sort();
});

// LOGIC: Sort results based on price/popularity
const sortLogic = (list) => {
  if (sortBy.value === 'priceLow') return [...list].sort((a, b) => a.price - b.price);
  if (sortBy.value === 'priceHigh') return [...list].sort((a, b) => b.price - a.price);
  return list;
};

// LOGIC: Filter results based on the Navbar/URL search query
const filteredResults = computed(() => {
  const query = searchQuery.value.toLowerCase();
  let list = rawServices.value.filter(s =>
    s.title.toLowerCase().includes(query) ||
    s.category.toLowerCase().includes(query) ||
    (s.desc && s.desc.toLowerCase().includes(query))
  );
  return sortLogic(list);
});

// LOGIC: Group services by category for the 'All' view
const displayedGroups = computed(() => {
  const groups = {};
  rawServices.value.forEach(s => {
    // If a specific category is selected, skip others
    if (selectedCategory.value !== 'All' && s.category !== selectedCategory.value) return;

    if (!groups[s.category]) groups[s.category] = { title: s.category, items: [] };
    groups[s.category].items.push(s);
  });

  return Object.values(groups).map(g => ({
    ...g,
    items: sortLogic(g.items)
  }));
});

// ACTIONS
const clearSearch = () => router.push({ query: { ...route.query, q: undefined } });
const goToBooking = (t) => router.push({ path: '/booking', query: { service: t } });
const goToServiceDetails = (title, desc, category) => {
  router.push({ name: 'ServiceDetails', query: { title, desc, category } });
};
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>