<template>
  <div
    class="p-6 bg-gray-50 rounded-2xl shadow-lg max-w-3xl mx-auto relative border border-gray-200"
  >
    <!-- Header -->
    <div class="flex justify-between items-center mb-6 border-b pb-3">
      <h2 class="text-2xl font-bold text-[#0073b1] flex items-center gap-3">
        <i class="fas fa-bell text-[#0073b1] text-xl"></i>
        Notifications
      </h2>
      <button
        v-if="notifications.length"
        @click="markAllRead"
        aria-label="Mark all notifications as read"
        class="text-sm font-medium text-blue-600 hover:underline transition"
      >
        Mark all as read
      </button>
    </div>

    <!-- Filters -->
    <div class="flex gap-3 mb-6">
      <button
        v-for="filter in ['all', 'unread', 'read']"
        :key="filter"
        @click="currentFilter = filter"
        :class="[
          'text-sm font-medium px-4 py-1.5 rounded-full transition',
          currentFilter === filter
            ? 'bg-[#0073b1] text-white shadow-sm'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        ]"
      >
        {{ filter.charAt(0).toUpperCase() + filter.slice(1) }}
      </button>
    </div>

    <!-- Loading Skeletons -->
    <div v-if="loading" class="space-y-4">
      <div v-for="n in 3" :key="n" class="flex gap-3 animate-pulse">
        <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div class="flex-1 space-y-2">
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="h-3 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    </div>

    <!-- Notifications -->
    <div v-else role="list">
      <div
        v-for="(notes, groupName) in filteredGroups"
        :key="groupName"
        class="mb-6"
      >
        <h3 class="text-sm font-semibold text-[#0073b1] uppercase mb-3">
          {{ groupName }}
        </h3>

        <div class="space-y-3">
          <div
            v-for="notification in notes"
            :key="notification._id"
            role="listitem"
            :class="[
              'p-2 rounded-xl border transition flex gap-3 items-start relative group duration-200 cursor-pointer',
              notification.read
                ? 'border-gray-200 bg-white hover:shadow-md'
                : 'border-blue-300 bg-blue-50 shadow-sm hover:shadow-md'
            ]"
            @click="markAsRead(notification)"
          >
            <!-- Icon Avatar -->
            <div class="flex-shrink-0">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center"
                :class="notification.read ? 'bg-gray-100' : 'bg-blue-100'"
              >
                <i
                  :class="[getIconClass(notification.type), notification.read ? 'text-[#0073b1]' : 'text-blue-600']"
                  class="text-lg"
                ></i>
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <p class="text-sm sm:text-base font-medium text-gray-800 leading-relaxed">
                {{ notification.message }}
              </p>
              <p class="text-xs text-gray-500 mt-1">
                {{ formatTime(notification.createdAt) }}
              </p>
            </div>

            <!-- Unread Dot -->
            <span
              v-if="!notification.read"
              class="absolute top-3 right-9 w-2.5 h-2.5 bg-blue-600 rounded-full"
            ></span>

            <!-- Delete -->
            <button
              @click.stop="deleteNotification(notification._id)"
              aria-label="Delete notification"
              class="opacity-0 group-hover:opacity-100 absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
            >
              <i class="fas fa-times text-sm"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div v-if="hasMore" class="text-center mt-6">
        <button
          @click="loadMore"
          :disabled="isLoadingMore"
          class="px-5 py-2 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition disabled:opacity-50"
        >
          <span v-if="isLoadingMore">Loading...</span>
          <span v-else>Load More</span>
        </button>
      </div>

      <!-- Empty State -->
      <div
        v-if="!filteredNotifications.length && !loading"
        class="text-gray-500 text-center py-12 text-base sm:text-lg"
      >
        <i class="fas fa-inbox text-2xl mb-2 block text-gray-400"></i>
        No {{ currentFilter }} notifications 🎉
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import API from "@/api";
import {
  isToday,
  isYesterday,
  isThisWeek,
  parseISO,
  differenceInCalendarDays,
  formatDistanceToNow,
} from "date-fns";

// State
const notifications = ref([]);
const loading = ref(true);
const currentFilter = ref("all");
const itemsPerPage = ref(5);
const currentPage = ref(1);
const isLoadingMore = ref(false);

// Auth header (reused in all requests)
const token = localStorage.getItem("token");
const authHeader = { Authorization: `Bearer ${token}` };

// Pagination
const paginatedNotifications = computed(() => {
  const end = currentPage.value * itemsPerPage.value;
  return filteredNotifications.value.slice(0, end);
});
const hasMore = computed(() => {
  return filteredNotifications.value.length > currentPage.value * itemsPerPage.value;
});
const loadMore = () => {
  if (hasMore.value && !isLoadingMore.value) {
    isLoadingMore.value = true;
    setTimeout(() => {
      currentPage.value++;
      isLoadingMore.value = false;
    }, 500);
  }
};

// Scroll Handler (debounced)
let scrollTimeout;
const handleScroll = () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const bottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    if (bottom && hasMore.value && !loading.value && !isLoadingMore.value) {
      loadMore();
    }
  }, 100);
};

// Fetch Notifications
const fetchNotifications = async () => {
  try {
    const res = await API.get("/notifications", { headers: authHeader });
    notifications.value = res.data;
  } catch (error) {
    console.error("❌ Failed to load notifications:", error);
  } finally {
    loading.value = false;
  }
};

// Lifecycle
onMounted(() => {
  fetchNotifications();
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// Utils
const formatTime = (time) =>
  formatDistanceToNow(new Date(time), { addSuffix: true });

const isLastWeek = (date) => {
  const daysDiff = differenceInCalendarDays(new Date(), date);
  return daysDiff >= 7 && daysDiff <= 13;
};

// Filtering
const filteredNotifications = computed(() => {
  if (currentFilter.value === "unread")
    return notifications.value.filter((n) => !n.read);
  if (currentFilter.value === "read")
    return notifications.value.filter((n) => n.read);
  return notifications.value;
});

// Grouping
const groupedNotifications = computed(() => {
  const groups = {
    Today: [],
    Yesterday: [],
    "This Week": [],
    "Last Week": [],
    Earlier: [],
  };
  for (const notification of paginatedNotifications.value) {
    const date = parseISO(notification.createdAt);
    if (isToday(date)) groups.Today.push(notification);
    else if (isYesterday(date)) groups.Yesterday.push(notification);
    else if (isThisWeek(date)) groups["This Week"].push(notification);
    else if (isLastWeek(date)) groups["Last Week"].push(notification);
    else groups.Earlier.push(notification);
  }
  return groups;
});
const filteredGroups = computed(() =>
  Object.fromEntries(
    Object.entries(groupedNotifications.value).filter(([, notes]) => notes.length > 0)
  )
);

// Actions
const deleteNotification = async (id) => {
  try {
    await API.delete(`/notifications/${id}`, { headers: authHeader });
    notifications.value = notifications.value.filter((n) => n._id !== id);
  } catch (error) {
    console.error("❌ Failed to delete notification:", error);
  }
};
const markAllRead = async () => {
  try {
    await API.patch(`/notifications/mark-all-read`, {}, { headers: authHeader });
    notifications.value = notifications.value.map((n) => ({ ...n, read: true }));
  } catch (error) {
    console.error("❌ Failed to mark all as read:", error);
  }
};
const markAsRead = async (notification) => {
  if (notification.read) return;
  try {
    await API.patch(`/notifications/${notification._id}/read`, {}, { headers: authHeader });
    notification.read = true;
  } catch (error) {
    console.error("❌ Failed to mark notification as read:", error);
  }
};
const getIconClass = (type) => {
  switch (type) {
    case "booking":
      return "fas fa-calendar-check";
    case "message":
      return "fas fa-comment-dots";
    case "payment":
      return "fas fa-credit-card";
    default:
      return "fas fa-info-circle";
  }
};
</script>
