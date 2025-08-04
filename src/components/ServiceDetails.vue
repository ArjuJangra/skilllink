<template>
  <div class="min-h-screen bg-[#F0F9FF] px-4 py-8">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-2xl font-bold text-[#007EA7] mb-4">{{ service.title }}</h1>
      <p class="text-gray-700 mb-2">{{ service.desc }}</p>
      <p class="text-sm italic text-gray-500 mb-6">Category: {{ service.category }}</p>

      <div class="space-y-2 text-sm text-gray-700">
        <p><strong>Estimated Time:</strong> 30–60 minutes</p>
        <p><strong>Typical Cost:</strong> ₹300 – ₹800</p>
        <p><strong>What's Included:</strong> On-site visit, inspection, basic service</p>
      </div>

      <!-- Action Buttons -->
      <div class="mt-6 flex space-x-4">
        <button
          @click="$router.push('/home')"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          ← Back to Services
        </button>

        <button
          @click="goToBooking"
          class="px-4 py-2 bg-[#007EA7] text-white rounded hover:bg-[#005f6b]"
        >
          Book Now
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { services } from '@/data/services'; // adjust the path if needed

export default {
  data() {
    return {
      service: {
        desc: '',
        category: ''
      },
      title: this.$route.params.title  // ✅ Get the title from route param
    };
  },

 mounted() {
  let found = false;
  for (const category of services) {
    const item = category.items.find(item => item.title === this.title);
    if (item) {
      this.service = { ...item, category: category.title };
      found = true;
      break;
    }
  }
  if (!found) {
    this.service = {
      desc: 'This service could not be found.',
      category: 'Unknown'
    };
  }
}


};
</script>
