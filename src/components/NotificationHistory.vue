<template>
  <div class="p-6 bg-white rounded-2xl shadow-lg max-w-3xl mx-auto mt-6 relative">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold text-[#007EA7] flex items-center gap-2">
        <i class="fas fa-bell text-[#007EA7]" aria-hidden="true"></i>
        <span>Notifications</span>
      </h2>
      <button
        @click="markAllRead"
        class="text-sm text-[#007EA7] hover:underline focus:outline-none"
        v-if="notifications.length"
        aria-label="Mark all notifications as read"
      >
        Mark all as read
      </button>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="space-y-4">
      <div class="h-5 bg-gray-200 rounded animate-pulse w-2/3"></div>
      <div class="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
    </div>

    <!-- Notifications Grouped by Date -->
    <div v-else>
      <div v-for="(notes, groupName) in nonEmptyGroups" :key="groupName" class="mb-6">
        <h3 class="text-base font-semibold text-gray-600 mb-2">{{ groupName }}</h3>

        <div class="space-y-4">
          <div
            v-for="note in notes"
            :key="note._id"
            class="border-l-4 border-[#00A8E8] bg-[#F0F9FF] p-4 rounded-md shadow-sm hover:shadow-md transition group relative"
              @click="markAsRead(note)"
          >
            <div class="flex justify-between">
              <!-- Icon and message -->
              <div class="flex items-start gap-2">
                <i :class="getIconClass(note.type)" class="text-[#007EA7] mt-0.5" aria-hidden="true"></i>
                <div>
                  <p class="text-gray-800 text-sm sm:text-base font-medium leading-relaxed">
                    {{ note.message }}
                    <span
                      v-if="!note.read"
                      class="ml-2 bg-[#00A8E8] text-white text-[10px] px-2 py-0.5 rounded-full"
                      aria-label="New notification"
                    >
                      New
                    </span>
                  </p>
                  <p class="text-xs text-gray-500 mt-2">
                    {{ formatTime(note.createdAt) }}
                  </p>
                </div>
              </div>

              <!-- Delete button -->
              <button
                @click.stop="deleteNotification(note._id)"
                class="text-gray-400 hover:text-red-500 transition focus:outline-none"
                aria-label="Delete notification"
                title="Delete notification"
              >
                <i class="fas fa-times text-sm" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!notifications.length" class="text-gray-500 text-center py-12 text-base sm:text-lg">
        No notifications yet. 🎉
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { isToday, isYesterday, parseISO } from 'date-fns';

const notifications = ref([]);
const loading = ref(true);

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
  } finally {
    loading.value = false;
  }
};

onMounted(fetchNotifications);

const formatTime = (time) => new Date(time).toLocaleString();

const groupedNotifications = computed(() => {
  const groups = { Today: [], Yesterday: [], Earlier: [] };
  for (const note of notifications.value) {
    const date = parseISO(note.createdAt);
    if (isToday(date)) groups.Today.push(note);
    else if (isYesterday(date)) groups.Yesterday.push(note);
    else groups.Earlier.push(note);
  }
  return groups;
});

const nonEmptyGroups = computed(() => {
  return Object.fromEntries(
    Object.entries(groupedNotifications.value).filter(([, notes]) => notes.length > 0)

  );
});


const deleteNotification = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/api/notifications/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    notifications.value = notifications.value.filter(note => note._id !== id);
  } catch (error) {
    console.error('❌ Failed to delete notification:', error);
  }
};

const markAllRead = async () => {
  try {
    const token = localStorage.getItem('token');
    await axios.patch(`http://localhost:5000/api/notifications/mark-all-read`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchNotifications();
  } catch (error) {
    console.error('❌ Failed to mark as read:', error);
  }
};

const getIconClass = (type) => {
  switch (type) {
    case 'booking':
      return 'fas fa-calendar-check';
    case 'message':
      return 'fas fa-comment-dots';
    case 'payment':
      return 'fas fa-credit-card';
    default:
      return 'fas fa-info-circle';
  }
};

const markAsRead = async (note) => {
  if (note.read) return; // already read

  try {
    const token = localStorage.getItem('token');
    await axios.patch(`http://localhost:5000/api/notifications/${note._id}/read`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Update the local state without re-fetching everything
    note.read = true;
  } catch (error) {
    console.error('❌ Failed to mark notification as read:', error);
  }
};

</script>

<style scoped>
/* Removed unused style */
</style>
