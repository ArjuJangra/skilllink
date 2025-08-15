<template>
  <div class="bg-white rounded-xl shadow-md p-4 flex flex-col hover:shadow-lg transition transform hover:-translate-y-1">
    <!-- Title -->
    <h3 class="text-lg font-semibold text-[#007EA7] hover:underline cursor-pointer" @click="goToDetails">
      {{ service.title }}
    </h3>

    <!-- Description -->
    <p class="text-sm text-gray-600 mt-1">{{ service.desc }}</p>

    <!-- Category -->
    <p class="text-xs text-gray-400 mt-1 italic">{{ service.category }}</p>

    <!-- Price & Button -->
    <div class="mt-auto flex items-center justify-between">
      <span class="text-[#007EA7] font-semibold">₹{{ service.price || '199' }}</span>
      <button @click="goToDetails"
        class="px-3 py-1 rounded transition bg-[#007EA7] text-white hover:bg-[#005f6b]">
        Book Now
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

// Destructure props properly
const props = defineProps({
  service: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const goToDetails = () => {
  const s = props.service  // use props.service here
  router.push({
    name: 'ServiceDetails',
    query: {
      title: s.title,
      desc: s.desc,
      category: s.category,
      price: s.price || '199'
    }
  })
}
</script>

