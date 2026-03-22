<template>
  <div class="min-h-screen bg-[#F8FAFC]">
    <header class="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <AppNavbar :mode="'default'" :showSearch="false" :hideExtras="true" />
    </header>

    <div class="bg-white border-b border-gray-100">
      <section class="max-w-7xl mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">

          <div class="space-y-1">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Professional Services
            </h1>
            <p class="text-gray-400 text-sm md:text-base font-medium">
              Book top-rated experts for every task
            </p>
          </div>

          <div class="relative w-full md:w-[400px]">
            <div
              class="group flex items-center bg-[#f5f5f6] border border-transparent focus-within:bg-white focus-within:border-gray-200 transition-all rounded-md">
              <span class="pl-4 text-gray-400 group-focus-within:text-gray-900">
                <i class="fas fa-search text-sm"></i>
              </span>
              <input v-model="searchQuery" type="text" placeholder="Search for services (e.g. Carpenter, Cleaning)"
                class="w-full bg-transparent border-none focus:ring-0 py-2.5 px-3 text-[14px] text-gray-800 placeholder:text-gray-500" />
            </div>
          </div>
        </div>
      </section>
    </div>

    <nav class="sticky top-[64px] bg-white border-b z-40 overflow-x-auto no-scrollbar py-4 px-4">
      <div class="max-w-7xl mx-auto flex items-center gap-3">
        <button @click="selectedCategory = 'All'"
          :class="selectedCategory === 'All' ? 'bg-[#0073b1] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
          class="px-5 py-2 rounded-full text-sm font-medium transition whitespace-nowrap">
          All Services
        </button>
        <button v-for="cat in availableCategories" :key="cat" @click="selectedCategory = cat"
          :class="selectedCategory === cat ? 'bg-[#0073b1] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
          class="px-5 py-2 rounded-full text-sm font-medium transition whitespace-nowrap">
          {{ cat }}
        </button>
      </div>
    </nav>

    <main class="px-4 py-8 max-w-7xl mx-auto">

      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold text-gray-900">
          {{ searchQuery ? 'Search Results' : selectedCategory }}
        </h2>

        <div class="flex items-center gap-3">
          <select v-model="sortBy"
            class="bg-white border-gray-200 rounded-lg text-sm px-3 py-2 outline-none focus:border-blue-500">
            <option value="popular">Recommended</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="n in 6" :key="n" class="h-64 bg-gray-200 animate-pulse rounded-2xl"></div>
      </div>

      <div v-else>
        <div v-if="searchQuery" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard v-for="service in filteredResults" :key="service.$id" :service="service"
            class="hover:shadow-xl transition-shadow border border-gray-100" @book="goToBooking(service.title)"
            @details="goToServiceDetails(service.title, service.desc, service.category)" />
          <div v-if="filteredResults.length === 0" class="col-span-full text-center py-20">
            <img src="https://illustrations.popsy.co/blue/searching-for-a-solution.svg" class="w-48 mx-auto mb-4" />
            <p class="text-gray-500">No services found matching your search.</p>
          </div>
        </div>

        <div v-else class="space-y-12">
          <div v-for="category in displayedGroups" :key="category.title">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-gray-800">{{ category.title }}</h3>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard v-for="service in category.items" :key="service.$id" :service="service"
                class="hover:shadow-xl transition-shadow border border-gray-100" @book="goToBooking(service.title)"
                @details="goToServiceDetails(service.title, service.desc, category.title)" />
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-white border-t mt-20 py-12 px-4">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h4 class="font-bold mb-4">100% Quality Assured</h4>
          <p class="text-gray-500 text-sm">Every professional is background checked and trained.</p>
        </div>
        <div>
          <h4 class="font-bold mb-4">Transparent Pricing</h4>
          <p class="text-gray-500 text-sm">No hidden costs. Pay only for the service you get.</p>
        </div>
        <div>
          <h4 class="font-bold mb-4">SkillLink Support</h4>
          <p class="text-gray-500 text-sm">24/7 dedicated support for all your bookings.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { databases, APPWRITE_CONFIG } from '@/appwrite';
import { Query } from 'appwrite';
import ServiceCard from '@/components/ServiceCard.vue';
import AppNavbar from '@/components/AppNavbar.vue';

const router = useRouter();
const searchQuery = ref('');
const sortBy = ref('popular');
const selectedCategory = ref('All');
const rawServices = ref([]);
const loading = ref(true);

const fetchServices = async () => {
  try {
    loading.value = true;
    const res = await databases.listDocuments(APPWRITE_CONFIG.dbId, 'services', [Query.limit(100)]);
    rawServices.value = res.documents;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchServices);

const availableCategories = computed(() => {
  const cats = new Set(rawServices.value.map(s => s.category));
  return Array.from(cats).sort();
});

const sortLogic = (list) => {
  if (sortBy.value === 'priceLow') return [...list].sort((a, b) => a.price - b.price);
  if (sortBy.value === 'priceHigh') return [...list].sort((a, b) => b.price - a.price);
  return list;
};

const filteredResults = computed(() => {
  const query = searchQuery.value.toLowerCase();
  let list = rawServices.value.filter(s =>
    s.title.toLowerCase().includes(query) ||
    s.desc.toLowerCase().includes(query)
  );
  return sortLogic(list);
});

const displayedGroups = computed(() => {
  const groups = {};
  rawServices.value.forEach(s => {
    if (selectedCategory.value !== 'All' && s.category !== selectedCategory.value) return;

    if (!groups[s.category]) groups[s.category] = { title: s.category, items: [] };
    groups[s.category].items.push(s);
  });

  return Object.values(groups).map(g => ({
    ...g,
    items: sortLogic(g.items)
  }));
});

const goToBooking = (t) => router.push({ path: '/booking', query: { service: t } });
const goToServiceDetails = (title, desc, category) => {
  router.push({ name: 'ServiceDetails', query: { title, desc, category } });
};
</script>
