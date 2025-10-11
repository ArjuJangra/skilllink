<template>
  <div
    @click="goToDetails"
    class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300 flex flex-col overflow-hidden cursor-pointer max-w-sm w-full"
  >
    <!-- Service Image -->
    <img
      v-if="resolvedImage"
      :src="resolvedImage"
      :alt="service.title + ' image'"
      class="w-full h-40 sm:h-48 object-cover"
      @error="handleImageError"
    />
    <div v-else class="w-full h-40 sm:h-48 bg-gray-200 flex items-center justify-center text-gray-400">
      No Image
    </div>

    <!-- Category Badge -->
    <div class="px-4 pt-4">
      <span
        v-if="service.category"
        class="inline-block bg-[#E0F2FE] text-[#007EA7] text-xs font-semibold px-2 py-1 rounded-full"
      >
        {{ service.category }}
      </span>
    </div>

    <!-- Title & Description -->
    <div class="px-4 py-3 flex-1">
      <h3
        class="text-lg font-semibold text-gray-800 hover:text-[#007EA7] cursor-pointer truncate"
        :title="service.title"
      >
        {{ service.title }}
      </h3>
      <p class="text-gray-600 text-sm mt-1 line-clamp-3">
        {{ service.desc }}
      </p>
    </div>

    <!-- Footer: Price & Action -->
    <div class="px-4 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50">
      <div class="text-gray-900 font-bold text-sm">
        Starting from ₹{{ startingPrice }}
      </div>
      <button
        @click.stop="goToDetails"
        class="text-[#007EA7] flex items-center font-medium px-4 py-2 rounded-lg hover:text-[#2094e7] transition duration-200 shadow-sm hover:shadow-md"
      >
        View Details
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ml-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12l-3.75 3.75M21 12H3"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  service: { type: Object, required: true }
});

const router = useRouter();
const resolvedImage = ref("/images/default-service.jpg");

// Load only the first image (e.g., plumber, plumber2, plumber3 -> pick plumber)
const buildImage = async () => {
  if (!props.service.title) return;

  const slug = props.service.title
    .toLowerCase()
    .replace(/[\\?%*:|"<>]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const exts = ["jpg", "webp", "avif", "jpeg", "png"];

  for (const ext of exts) {
    const src = `/images/${slug}.${ext}`; // only the first image
    const img = new Image();
    img.src = src;
    img.onload = () => { resolvedImage.value = src; };
    img.onerror = () => {};
  }
};

onMounted(buildImage);

const startingPrice = props.service.tiers?.length
  ? Math.min(...props.service.tiers.map(t => t.price))
  : 399;

const goToDetails = () => {
  const s = props.service;
  router.push({
    name: "ServiceDetails",
    query: {
      title: s.title,
      desc: s.desc,
      category: s.category,
      price: startingPrice
    }
  });
};

const handleImageError = (e) => {
  e.target.src = "/images/default-service.jpg";
};
</script>



<style scoped>
div.relative:hover img {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
/* Limit description text to 3 lines */
.line-clamp-3 {
  display: -webkit-box;
  display: flex; /* Legacy spec for older browsers */
  -webkit-box-orient: vertical;
  box-orient: vertical; /* Legacy spec */
  -webkit-line-clamp: 3; /* Chrome, Safari, Edge */
  line-clamp: 3; /* Standard property */
  overflow: hidden;
}

</style>


