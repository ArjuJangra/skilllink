<template>
  <div class ="min-h-screen bg-[#F0F9FF] flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <!-- Logo & Name -->
      <div class="flex flex-col items-center mb-6">
        <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-16 h-16 mb-2" />
        
      </div>

      <!-- Heading -->
      <h2 class="text-xl font-bold text-[#007EA7] mb-6 text-center">
        Book a Service
      </h2>

      <!-- Selected Service -->
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-1">Selected Service</label>
        <input
          type="text"
          v-model="selectedService"
          class="w-full px-4 py-2 border rounded-md bg-gray-100"
          readonly
        />
      </div>

      <!-- Name -->
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-1">Your Name</label>
        <input
          type="text"
          v-model="name"
          placeholder="Enter your name"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
        />
      </div>

      <!-- Contact Number -->
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-1">Contact Number</label>
        <input
          type="tel"
          v-model="contact"
          placeholder="Enter your phone number"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
        />
      </div>

      <!-- Address -->
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-1">Address</label>
        <textarea
          v-model="address"
          placeholder="Enter your address"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
        ></textarea>
      </div>

      <!-- Submit Button -->
      <button
        :disabled="loading"
        @click="submitBooking"
        class="w-full bg-[#007EA7] text-white py-2 rounded hover:bg-[#005f6b] disabled:opacity-50"
      >
       {{ loading ? 'Booking...' : 'Confirm Booking' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const loading = ref(false);
const selectedService = ref('');
const name = ref('');
const contact = ref('');
const address = ref('');

onMounted(() => {
  selectedService.value = route.query.service || '';
});

const submitBooking = async () => {
  if (!name.value || !contact.value || !address.value) {
    toast.error('Please fill in all fields.');
    return;
  }
   loading.value = true;
  const token = localStorage.getItem('token');

  try {
    await axios.post(
      'http://localhost:5000/api/bookings',
      {
        service: selectedService.value,
        name: name.value,
        contact: contact.value,
        address: address.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

   
    router.push('/booking-confirm');

    
    // Clear form
    name.value = '';
    contact.value = '';
    address.value = '';

  } catch (err) {
     toast.error(err.response?.data?.message || 'Booking failed.');
  } finally {
    loading.value = false;
  }
};
</script>
