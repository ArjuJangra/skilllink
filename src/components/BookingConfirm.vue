<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#E0F7FA] to-[#F0F9FF] px-4 text-center">
    <div class="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full transition-all">
      <!-- Animation or Icon -->
      <img src="@/assets/confirmation.svg" alt="Confirmed" class="w-28 mx-auto mb-6 animate-pulse" />

      <!-- Heading -->
      <h2 class="text-2xl font-extrabold text-[#007EA7] mb-2">Booking Confirmed!</h2>

      <!-- Description -->
      <p class="text-gray-600 mb-4">
        Thank you for booking with <span class="font-medium text-[#007EA7]">SkillLink</span>.
        Our service provider will contact you shortly.
      </p>

      <!-- Booking Details -->
      <div class="bg-gray-50 rounded-lg p-4 mb-4 text-sm text-left">
        <p><strong>Service:</strong> {{ serviceName }}</p>
        <p><strong>Amount Paid:</strong> ₹{{ amount }}</p>
        <p><strong>Provider:</strong> {{ provider.name }}</p>
      </div>
      <!-- Manual Button -->
      <router-link to="/dashboard"
        class="inline-block bg-[#007EA7] text-white px-6 py-2 rounded hover:bg-[#005f78] transition">
        Go to Dashboard
      </router-link>

      <!-- Provider card -->
      <div class="bg-white rounded-2xl shadow p-6 mt-6">
        <h2 class="text-xl font-bold text-gray-900 mb-4">About the Provider</h2>
        <div class="flex items-center gap-4">
          <img :src="provider.avatar || defaultAvatar" @error="e => e.target.src = defaultAvatar"
            class="w-16 h-16 rounded-full object-cover border" alt="Provider" />
          <div class="flex-1 text-left">
            <div class="flex items-center gap-2">
              <div class="font-semibold text-gray-900">{{ provider.name }}</div>
              <span
                class="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.293-5.707a1 1 0 011.414 0l5-5a1 1 0 10-1.414-1.414L11 14.586l-2.293-2.293a1 1 0 10-1.414 1.414l3 3z"
                    clip-rule="evenodd" />
                </svg>
                Verified
              </span>
            </div>
            <div class="text-sm text-gray-600">{{ provider.bio }}</div>
            <div class="text-xs text-gray-500 mt-1">
              {{ provider.years }} yrs experience • {{ provider.orders }} jobs completed
            </div>
          </div>
          <div class="text-right">
            <div class="text-amber-500 font-bold">{{ rating.toFixed(1) }} ★</div>
            <div class="text-xs text-gray-500">{{ reviews.length }} reviews</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import API from '@/api'   // Axios instance
import defaultAvatarFile from '@/assets/default-provider.png';
//const router = useRouter();
const route = useRoute();
const defaultAvatar = defaultAvatarFile;
const booking = ref(null)

// Booking details from route query
const serviceName = ref(route.query.service || 'Your Selected Service');
const amount = ref(route.query.amount || '0.00');

// Provider info from route query or default
const provider = ref({
  name: route.query.providerName || 'Assigned Expert',
  avatar: route.query.providerAvatar || defaultAvatar,
  bio: route.query.providerBio || 'Experienced professional',
  years: Number(route.query.providerYears) || 0,
  jobs: Number(route.query.providerJobs) || 0,
});

// Reviews and rating
const reviews = ref(route.query.reviews ? JSON.parse(route.query.reviews) : []);
const rating = ref(route.query.rating ? Number(route.query.rating) : 0);

onMounted(async () => {
  try {
    const bookingId = route.query.bookingId;
    if (bookingId) {
      const { data } = await API.get(`/bookings/${bookingId}`, { 
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      booking.value = data;
      serviceName.value = data.service;
      amount.value = data.price;
      provider.value = data.providerId; // populated provider
    }
  } catch (err) {
    console.error('Failed to load booking details:', err);
  }
});

</script>

<style scoped>
.animate-pulse {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.9;
  }

  50% {
    transform: scale(1.05);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 0.9;
  }
}
</style>
