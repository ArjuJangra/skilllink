<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#E0F7FA] to-[#F0F9FF] px-4 text-center">
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

      <!-- Optional Booking Details (static placeholders for now) -->
      <div class="bg-gray-50 rounded-lg p-4 mb-4 text-sm text-left">
        <p><strong>Service:</strong> {{ serviceName || 'Your Selected Service' }}</p>
        <p><strong>Amount Paid:</strong> ₹{{ amount || '0.00' }}</p>
        <p><strong>Provider:</strong> {{ providerName || 'Assigned Expert' }}</p>
      </div>

      <!-- Countdown Notice -->
      <p class="text-sm text-gray-400 mb-4">Redirecting to dashboard in {{ countdown }}s...</p>

      <!-- Manual Button -->
      <router-link
        to="/dashboard"
        class="inline-block bg-[#007EA7] text-white px-6 py-2 rounded hover:bg-[#005f78] transition"
      >
        Go to Dashboard
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const countdown = ref(3);

// Optional placeholders (can be populated via props or state later)
const serviceName = ref('');
const amount = ref('');
const providerName = ref('');

onMounted(() => {
  const timer = setInterval(() => {
    countdown.value -= 1;
    if (countdown.value === 0) {
      clearInterval(timer);
      router.replace({ path: '/dashboard', hash: '#bookings' });
    }
  }, 1000);
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
