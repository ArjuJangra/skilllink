<template>
  <div @click="goToDetails"
    class="group relative bg-white rounded-3xl transition-all duration-500 hover:-translate-y-2 flex flex-col overflow-hidden cursor-pointer border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,115,177,0.1)] w-full">
    <div class="relative h-52 overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      </div>

      <img v-if="resolvedImage" :src="resolvedImage" :alt="service.title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        @error="handleImageError" />
      <div v-else class="w-full h-full bg-slate-100 flex items-center justify-center">
        <i class="fas fa-image text-slate-300 text-3xl"></i>
      </div>

      <div class="absolute top-4 right-4 z-20">
        <span
          class="bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
          Verified
        </span>
      </div>
    </div>

    <div class="p-5 flex-1 flex flex-col">
      <div class="flex items-center justify-between mb-3">
        <span class="text-[10px] font-bold uppercase tracking-widest text-[#007EA7] bg-blue-50 px-2.5 py-1 rounded-lg">
          {{ service.category || 'General' }}
        </span>
        <div class="flex items-center text-amber-400 text-xs">
          <i class="fas fa-star mr-1"></i>
          <span class="text-gray-700 font-bold">4.8</span>
        </div>
      </div>

      <h3
        class="text-xl font-bold text-gray-900 group-hover:text-[#007EA7] transition-colors duration-300 leading-tight mb-2">
        {{ service.title }}
      </h3>

      <p class="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
        {{ service.desc }}
      </p>

      <div class="flex-1"></div>

      <div class="pt-4 border-t border-gray-50 flex items-center justify-between">
        <div>
          <p class="text-[10px] text-gray-400 uppercase font-medium">Starting at</p>
          <p class="text-lg font-black text-gray-900">₹{{ displayPrice }}</p>
        </div>

        <div
          class="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#007EA7] group-hover:bg-[#007EA7] group-hover:text-white transition-all duration-300">
          <i class="fas fa-arrow-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  service: { type: Object, required: true }
});

const router = useRouter();
const resolvedImage = ref("/images/default-service.jpg");

// Handle Price logic from Appwrite or Fallback
const displayPrice = computed(() => {
  return props.service.price || 399;
});

const buildImage = async () => {
  if (!props.service.title) return;

  // 1. Manual Overrides for tricky names
  const manualMap = {
    "AC-Appliance Repair": "/images/ac-appliance-repair.jpeg",
    "Laptop-PC Repair": "/images/laptoprepair2.jpeg",
    "Cook-Chef": "/images/cook-chef.jpg",
    "Babysitter": "/images/babysitter2.jpeg",
    "Tailor": "/images/tailor.avif",
    "Courier Pickup-Delivery": "/images/courier-pickup-delivery.webp",
    "Event Decorator": "/images/event-decorator.avif"
  };

  if (manualMap[props.service.title]) {
    resolvedImage.value = manualMap[props.service.title];
    return;
  }

  // 2. Default Slug Logic (Your existing code)
  const slug = props.service.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Removes emojis and special chars correctly
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const exts = ["webp", "jpg", "jpeg", "png"];

  for (const ext of exts) {
    const src = `/images/${slug}.${ext}`;
    const img = new Image();

    const isLoaded = await new Promise((resolve) => {
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });

    if (isLoaded) {
      resolvedImage.value = src;
      break;
    }
  }
};

onMounted(buildImage);

const goToDetails = () => {
  router.push({
    name: "ServiceDetails",
    query: {
      title: props.service.title,
      desc: props.service.desc,
      category: props.service.category,
      price: displayPrice.value
    }
  });
};

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
</style>