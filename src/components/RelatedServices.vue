<template>
  <div v-if="related.length > 0" class="mt-12 mb-8">
    <div class="flex items-center justify-between mb-6 px-2">
      <h2 class="text-2xl font-black text-gray-900 tracking-tight">You might also like</h2>
      <div class="h-1 flex-1 bg-gray-100 mx-6 rounded-full hidden sm:block"></div>
      <span class="text-[#007EA7] text-xs font-bold uppercase tracking-widest">Recommended</span>
    </div>

    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 3" :key="i" class="bg-gray-100 h-96 rounded-3xl animate-pulse border border-gray-50"></div>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ServiceCard 
        v-for="item in related" 
        :key="item.$id" 
        :service="item" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { databases, storage, APPWRITE_CONFIG } from '@/appwrite';
import { Query } from 'appwrite';
import ServiceCard from '@/components/ServiceCard.vue'; // Ensure the path is correct

const props = defineProps({
  category: { type: String, required: true },
  currentServiceId: { type: String, required: true }
});

const related = ref([]);
const loading = ref(true);

const fetchRelated = async () => {
  if (!props.category) return;
  
  try {
    loading.value = true;
    const response = await databases.listDocuments(
      APPWRITE_CONFIG.dbId,
      APPWRITE_CONFIG.servicesCollection,
      [
        Query.equal('category', props.category),
        Query.notEqual('$id', props.currentServiceId),
        Query.limit(3)
      ]
    );

    // DEBUG: Log this to see if Appwrite is actually sending data
    console.log("Related Services Found:", response.documents);

    related.value = response.documents.map(doc => ({
      ...doc,
      // Ensure these match exactly what your ServiceCard expects
      title: doc.title || doc.name, 
      desc: doc.description || doc.desc,
      price: doc.price || 399,
      image: doc.imageIds?.length > 0 
        ? storage.getFilePreview(APPWRITE_CONFIG.storageBucket, doc.imageIds[0]) 
        : (doc.imageUrl || "/images/default-service.jpg")
    }));
    
  } catch (error) {
    console.error("Related Services Error:", error);
  } finally {
    loading.value = false;
  }
};

// Re-run the fetch if the user clicks a related service (ID change)
watch(() => props.currentServiceId, fetchRelated, { immediate: true });
</script>