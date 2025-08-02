<template>
  <div class="p-6 bg-white rounded-xl shadow-md max-w-3xl mx-auto">
    <h2 class="text-2xl font-semibold text-[#007EA7] mb-6 flex items-center gap-2">
      <span></span> Notifications
    </h2>

    <div v-if="notifications.length" class="space-y-4">
      <div
        v-for="note in notifications"
        :key="note._id"
        class="border-l-4 border-blue-400 bg-blue-50 p-4 rounded-md shadow-sm hover:shadow-md transition duration-200"
      >
        <p class="text-base text-gray-800">{{ note.message }}</p>
        <p class="text-sm text-gray-500 mt-1">{{ formatTime(note.createdAt) }}</p>
      </div>
    </div>

    <div v-else class="text-gray-500 text-center py-8">
      No notifications yet. 🎉
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const notifications = ref([]);

const fetchNotifications = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/notifications', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    notifications.value = res.data;
  } catch (error) {
    console.error('❌ Failed to load notifications:', error);
  }
};

onMounted(fetchNotifications);

const formatTime = (time) => new Date(time).toLocaleString();
</script>

