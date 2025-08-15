<template>
  <div   @click="goToDetails"
    class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300 flex flex-col overflow-hidden  cursor-pointer max-w-sm w-full"
  >
    <!-- Optional Category Badge -->
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
        @click="goToDetails"
        :title="service.title"
      >
        {{ service.title }}
      </h3>
      <p class="text-gray-600 text-sm mt-1 line-clamp-3">
        {{ service.desc }}
      </p>
    </div>

    <!-- Footer: Price & Action Button -->
    <div
      class=" px-4 py-3 border-t border-gray-100 flex items-center justify-end bg-gray-50"
    >
      
      <button
        @click="goToDetails"
        class="bg-[#007EA7] flex items-center  text-white font-medium px-4 py-2 rounded-lg hover:bg-[#005f6b] transition duration-200 shadow-sm hover:shadow-md"
      >
        View Details
         <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4 ml-1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.25 8.25L21 12l-3.75 3.75M21 12H3"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

// Props
const props = defineProps({
  service: {
    type: Object,
    required: true
  }
})

const router = useRouter()

// Navigate to ServiceDetails page
const goToDetails = () => {
  const s = props.service
  router.push({
    name: 'ServiceDetails',
    query: {
      title: s.title,
      desc: s.desc,
      category: s.category,
      price: s.price || '299'
    }
  })
}
</script>

<style scoped>
/* Limit description text to 3 lines */
.line-clamp-3 {
  display: -webkit-box;
  display: box; /* Legacy spec for older browsers */
  -webkit-box-orient: vertical;
  box-orient: vertical; /* Legacy spec */
  -webkit-line-clamp: 3; /* Chrome, Safari, Edge */
  line-clamp: 3; /* Standard property */
  overflow: hidden;
}

</style>


