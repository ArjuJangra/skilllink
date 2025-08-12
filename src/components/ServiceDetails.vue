<template>
  <div class="min-h-screen bg-[#F0F9FF] px-4 py-10">
    <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <!-- ✅ Image Section -->
      <div class="h-64 w-full overflow-hidden">
        <img v-if="image" :src="image" :alt="title"
          class="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
          @error="handleImageError" />
      </div>

      <!-- ✅ Content Section -->
      <div class="p-8 sm:p-10">
        <!-- Title -->
        <h1 class="text-3xl font-extrabold text-[#007EA7] mb-3">{{ title }}</h1>

        <!-- Description -->
        <p class="text-gray-700 text-base mb-4 leading-relaxed">
          {{ desc }}
        </p>

        <!-- Category -->
        <p class="text-sm font-medium text-gray-500 mb-6">
          📂 Category: <span class="italic">{{ category }}</span>
        </p>

        <!-- Meta Information -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-800 mb-8">
          <div class="bg-gray-100 rounded-lg p-4">
            <p class="font-semibold">Estimated Time</p>
            <p>30–60 minutes</p>
          </div>
          <div class="bg-gray-100 rounded-lg p-4">
            <p class="font-semibold">Typical Cost</p>
            <p>₹300 – ₹800</p>
          </div>
          <div class="bg-gray-100 rounded-lg p-4">
            <p class="font-semibold">What's Included</p>
            <p>Visit, Inspection, Basic Service</p>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex flex-col sm:flex-row justify-start gap-4">
          <button @click="$router.push('/home')"
            class="inline-flex items-center justify-center px-5 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md font-medium transition">
            ← Back to Services
          </button>

          <button @click="goToBooking"
            class="inline-flex items-center justify-center px-5 py-2 bg-[#007EA7] text-white hover:bg-[#005f6b] rounded-md font-medium transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      desc: '',
      category: '',
      image: ''
    };
  },
  methods: {
    goToBooking() {
      this.$router.push(`/booking?service=${encodeURIComponent(this.title)}`);
    },
    handleImageError(event) {
      event.target.src = '/images/default-service.jpg';
    }
  },

mounted() {
  const { title, desc, category } = this.$route.query;

  if (title && desc && category) {
    this.title = title;
    this.desc = desc;
    this.category = category;

    const lowerTitle = title.toLowerCase().replace(/\s+/g, '-'); // for safer file names
    this.image = `/images/${lowerTitle}.jpg`;
  } else {
    this.title = 'Not Found';
    this.desc = 'This service could not be found.';
    this.category = 'Unknown';
    this.image = '/images/default-service.jpg';
  }
}


};
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
