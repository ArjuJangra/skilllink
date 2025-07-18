<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-[#F0F9FF] text-center px-4">
    <div class="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
      <img src="@/assets/confirmation.svg" alt="Confirmed" class="w-24 mx-auto mb-4" />
      <h2 class="text-2xl font-bold text-[#007EA7] mb-2">Booking Confirmed!</h2>
      <p class="text-gray-600 mb-4">
        Thank you for booking with SkillLink. Our service provider will contact you soon.
      </p>
      <router-link
        to="/dashboard"
        class="inline-block mt-4 bg-[#007EA7] text-white px-6 py-2 rounded hover:bg-[#005f78] transition"
      >
        Go to Dashboard
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    router.push({ path: '/dashboard', hash: '#bookings' });  // Redirect to My Bookings tab
  }, 2000); // Wait 3 seconds
});
</script>