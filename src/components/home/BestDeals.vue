<template>
  <section class="py-16 bg-gray-50">
    <div class="max-w-screen-xl mx-auto px-6">
      <div class="flex justify-between items-end mb-10">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="h-1 w-8 bg-[#007EA7] rounded-full"></span>
            <span class="text-[#007EA7] text-xs font-black uppercase tracking-[0.2em]">Exclusives</span>
          </div>
          <h2 class="text-4xl font-black text-gray-900 uppercase tracking-tight">Best Deals</h2>
          <p class="text-gray-500 text-sm">Hand-picked services with verified experts</p>
        </div>
        
        <router-link to="/home" class="group flex items-center gap-2 text-[#007EA7] font-bold">
          <span class="border-b-2 border-transparent group-hover:border-[#007EA7] transition-all">View All</span>
          <i class="fas fa-chevron-right text-xs transition-transform group-hover:translate-x-1"></i>
        </router-link>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <template v-if="loading">
          <div v-for="n in 4" :key="n" class="bg-white rounded-3xl p-4 h-[380px] shadow-sm animate-pulse">
            <div class="bg-gray-200 rounded-2xl h-48 mb-4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
            <div class="h-6 bg-gray-200 rounded w-3/4"></div>
          </div>
        </template>

        <template v-else>
          <ServiceCard 
            v-for="service in topServices" 
            :key="service.$id" 
            :service="service"
            @book="goToBooking"
            @click="goToServiceDetails(service)"
          />
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { databases } from '@/appwrite'; 
import { Query } from 'appwrite';
import { useRouter } from 'vue-router';
import ServiceCard from '@/components/ServiceCard.vue'; // Import the new card

const router = useRouter();
const topServices = ref([]);
const loading = ref(true);

const fetchTopServices = async () => {
  try {
    const response = await databases.listDocuments(
      '69bc1ae900174fd0a3c6', 
      'services',
      [
        Query.limit(4), 
        Query.orderDesc('$createdAt')
      ]
    );
    topServices.value = response.documents;
  } catch (error) {
    console.error('Appwrite Fetch Error:', error);
  } finally {
    loading.value = false;
  }
};

const goToBooking = (id) => {
  router.push(`/booking/${id}`);
};

const goToServiceDetails = (service) => {
  router.push({
    name: "ServiceDetails",
    query: { title: service.name || service.title, id: service.$id }
  });
};

onMounted(fetchTopServices);
</script>