<template>
  <div class="min-h-screen p-6 bg-gray-100">
    <div class="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md">
      <h2 class="text-2xl font-bold text-center mb-6 text-[#0073b1]">Add New Service</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-gray-700 font-medium mb-1">Service Name</label>
          <input v-model="service.name" type="text" placeholder="Enter service name"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-1">Description</label>
          <textarea v-model="service.description" rows="3" placeholder="Service description"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-1">Category</label>
          <input v-model="service.category" type="text" placeholder="e.g., Cleaning, Tutoring"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-1">Price</label>
          <input v-model.number="service.price" type="number" placeholder="Enter price in ₹"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>

        <button :disabled="loading" type="submit"
          class="w-full py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 disabled:opacity-50">
          <span v-if="!loading">Add Service</span>
          <span v-else>Adding...</span>
        </button>
      </form>

      <div v-if="successMessage" class="mt-4 text-green-600 font-medium text-center">{{ successMessage }}</div>
      <div v-if="errorMessage" class="mt-4 text-red-600 font-medium text-center">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import API from '@/api'; 

const service = reactive({
  name: '',
  description: '',
  category: '',
  price: 0,
});

const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const handleSubmit = async () => {
  loading.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  try {
    const token = localStorage.getItem('token');
    const res = await API.post('/api/provider/services', service, {  // <-- Use API instead of axios directly
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(res.data);
    successMessage.value = 'Service added successfully!';

    // Reset form
    service.name = '';
    service.description = '';
    service.category = '';
    service.price = 0;

  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Failed to add service.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};
</script>


<style scoped>
/* Optional: fade animation for success/error messages */
</style>
