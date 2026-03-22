<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF] px-4 text-center">

    <div v-if="loading" class="flex flex-col items-center gap-4">
      <div class="w-12 h-12 border-4 border-[#0289b7] border-t-transparent rounded-full animate-spin"></div>
      <p class="text-slate-500 font-bold animate-pulse">Fetching your booking details...</p>
    </div>

    <div v-else-if="booking"
      class="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 max-w-xl w-full animate-fade-in">

      <div class="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <i class="fas fa-check-circle text-5xl text-green-500"></i>
      </div>

      <h2 class="text-3xl font-black text-slate-900 mb-2">Booking Confirmed!</h2>
      <p class="text-slate-500 mb-8 leading-relaxed">
        Great news! Your booking has been successfully placed.
        Our expert will reach out to you at <span class="text-[#0289b7] font-bold">{{ booking.contact }}</span> shortly.
      </p>

      <div class="bg-slate-50 rounded-3xl p-6 mb-8 text-sm text-left border border-slate-100 space-y-3">
        <div class="flex justify-between">
          <span class="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Service</span>
          <span class="font-bold text-slate-800">{{ booking.service }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Amount Paid</span>
          <span class="font-bold text-[#0289b7]">₹{{ booking.price }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Schedule</span>
          <span class="font-bold text-slate-800">{{ booking.date }} at {{ booking.time }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Status</span>
          <span class="px-2 py-0.5 bg-blue-100 text-[#0289b7] rounded text-[10px] font-black uppercase">
            {{ booking.paymentStatus }}
          </span>
        </div>
      </div>

      <div class="border-t border-slate-100 pt-8 text-left">
        <h3 class="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Your Assigned Expert</h3>
        <div class="flex items-center gap-5 p-4 rounded-2xl bg-white border border-slate-50 shadow-sm">
          <div class="w-14 h-14 rounded-xl bg-[#0289b7] flex items-center justify-center text-white font-black text-xl">
            {{ booking.providerName?.charAt(0) || 'E' }}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <p class="font-bold text-slate-900">{{ booking.providerName }}</p>
              <span class="bg-blue-50 text-[#0289b7] text-[10px] px-2 py-0.5 rounded-full font-bold">Verified</span>
            </div>
            <p class="text-xs text-slate-500 mt-1">Professional Provider on SkillLink</p>
          </div>
        </div>
      </div>

      <div class="mt-10">
        <router-link to="/dashboard"
          class="inline-block w-full bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#0289b7] transition-all shadow-lg shadow-blue-100">
          Go to Dashboard
        </router-link>
      </div>
    </div>

    <div v-else class="text-center">
      <p class="text-red-500 font-bold">Booking ID not found.</p>
      <router-link to="/" class="text-[#0289b7] underline mt-4 inline-block">Return Home</router-link>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { databases, APPWRITE_CONFIG } from '@/appwrite'; // Use your Appwrite setup
import { toast } from 'vue3-toastify';

const route = useRoute();
const loading = ref(true);
const booking = ref(null);

const DB_ID = APPWRITE_CONFIG.dbId;
const BOOKINGS_COLLECTION = "bookings";

onMounted(async () => {
  const bookingId = route.query.bookingId;

  if (!bookingId) {
    loading.value = false;
    toast.error("Invalid Booking Reference");
    return;
  }

  try {
    // Fetch directly from Appwrite using the ID from the URL
    const response = await databases.getDocument(DB_ID, BOOKINGS_COLLECTION, bookingId);
    booking.value = response;
  } catch (err) {
    console.error('Appwrite Error:', err);
    toast.error("Could not load booking details");
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>