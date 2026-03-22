<template>
  <div @click="goToDetails"
    class="group relative bg-white rounded-3xl p-3 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,115,177,0.2)] cursor-pointer border border-gray-100 flex flex-col h-full">
    <div class="relative h-52 w-full overflow-hidden rounded-2xl bg-gray-50">
      <img :src="resolvedImage" :alt="service.title"
        class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        @error="handleImageError" />

      <div class="absolute top-3 left-3 flex flex-col gap-2">
        <span v-if="service.oldPrice"
          class="bg-red-600 text-white text-[9px] font-black px-2 py-1 rounded-md shadow-lg uppercase tracking-wider">
          Save ₹{{ service.oldPrice - (service.price || 399) }}
        </span>
        <span
          class="bg-white/90 backdrop-blur text-gray-900 text-[9px] font-bold px-2 py-1 rounded-md shadow-sm uppercase">
          Verified
        </span>
      </div>

      <div
        class="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-sm">
        <i class="far fa-heart"></i>
      </div>
    </div>

    <div class="p-4 flex-1 flex flex-col">
      <div class="flex justify-between items-start mb-2">
        <span class="text-[10px] font-bold uppercase tracking-widest text-[#007EA7] bg-blue-50 px-2 py-0.5 rounded">
          {{ service.category || 'Expert' }}
        </span>
        <div class="flex items-center gap-1 text-[10px] font-bold text-gray-500">
          <i class="fas fa-star text-amber-400"></i> 4.9
        </div>
      </div>

      <h4 class="text-lg font-black text-gray-900 leading-tight mb-3 group-hover:text-[#007EA7] transition-colors">
        {{ service.title || service.name }}
      </h4>

      <p class="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">
        {{ service.desc || 'Professional service provided by verified SkillLink experts.' }}
      </p>

      <div class="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
        <div class="flex flex-col">
          <span v-if="service.oldPrice" class="text-[10px] text-gray-400 line-through">₹{{ service.oldPrice }}</span>
          <span class="text-xl font-black text-gray-900">₹{{ displayPrice }}</span>
        </div>

        <button @click.stop="goToDetails"
          class="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl hover:bg-[#007EA7] transition-all duration-300 shadow-md active:scale-95 group/btn">
          <span class="text-[10px] font-black uppercase tracking-widest">Book Now</span>
          <i class="fas fa-arrow-right text-[10px] transition-transform group-hover/btn:translate-x-1"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  service: { type: Object, required: true }
});

const router = useRouter();

// 1. CLEAN IMAGE LOGIC (FROM APPWRITE)
const resolvedImage = computed(() => {
  return props.service.image || "/images/default-service.jpg";
});

//  2. PRICING LOGIC
const displayPrice = computed(() => {
  return props.service.price || 399;
});

//  3. NAVIGATION (ONLY PASS ID)
const goToDetails = () => {
  router.push({
    name: "ServiceDetails",
    query: {
      id: props.service.$id
    }
  });
};

// 4. IMAGE FALLBACK
const handleImageError = (e) => {
  e.target.src = "/images/default-service.jpg";
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rounded-3xl {
  border-radius: 2rem;
}
</style>