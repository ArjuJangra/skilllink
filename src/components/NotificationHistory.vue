<template>
  <div
    class="p-6 bg-gray-50 rounded-2xl shadow-lg max-w-3xl mx-auto mt-6 relative border border-gray-200"
  >
    <!-- Header -->
    <div class="flex justify-between items-center mb-6 border-b pb-3">
      <h2 class="text-2xl font-bold text-blue-600 flex items-center gap-3">
        <i class="fas fa-bell text-blue-600 text-xl"></i>
        Notifications
      </h2>
      <button
        @click="markAllRead"
        v-if="notifications.length"
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
            ? 'bg-blue-600 text-white shadow-sm'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        ]"
      >
        {{ filter.charAt(0).toUpperCase() + filter.slice(1) }}
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-4">
      <div class="h-5 bg-gray-200 rounded animate-pulse w-2/3"></div>
      <div class="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
    </div>

    <!-- Notifications -->
    <div v-else>
      <div
        v-for="(notes, groupName) in filteredGroups"
        :key="groupName"
        class="mb-6"
      >
        <h3 class="text-sm font-semibold text-gray-500 uppercase mb-3">
          {{ groupName }}
        </h3>

        <div class="space-y-4">
          <div
            v-for="note in notes"
            :key="note._id"
            :class="[
              'p-4 rounded-xl border transition flex gap-3 items-start relative group duration-200',
              note.read
                ? 'border-gray-200 bg-white hover:shadow-md'
                : 'border-blue-300 bg-blue-50 shadow-sm hover:shadow-md'
            ]"
            @click="markAsRead(note)"
          >
            <!-- Icon Avatar -->
            <div class="flex-shrink-0">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center"
                :class="note.read ? 'bg-gray-100' : 'bg-blue-100'"
              >
                <i
                  :class="[getIconClass(note.type), note.read ? 'text-gray-400' : 'text-blue-600']"
                  class="text-lg"
                ></i>
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <p class="text-sm sm:text-base font-medium text-gray-800 leading-relaxed">
                {{ note.message }}
              </p>
              <p class="text-xs text-gray-500 mt-1">
                {{ formatTime(note.createdAt) }}
              </p>
            </div>

            <!-- Unread Dot -->
            <span
              v-if="!note.read"
              class="absolute top-3 right-9 w-2.5 h-2.5 bg-blue-600 rounded-full"
            ></span>

            <!-- Delete -->
            <button
              @click.stop="deleteNotification(note._id)"
              class="opacity-0 group-hover:opacity-100 absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
              title="Delete"
            >
              <i class="fas fa-times text-sm"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Infinite Scroll Loading -->
      <div v-if="isLoadingMore" class="text-center py-4 text-sm text-gray-500">
        Loading more...
      </div>

      <!-- Load More Button -->
      <div v-if="hasMore && !isLoadingMore" class="text-center mt-6">
        <button
          @click="loadMore"
          class="px-5 py-2 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          Load More
        </button>
      </div>

      <!-- Empty State -->
      <div
        v-if="!filteredNotifications.length"
        class="text-gray-500 text-center py-12 text-base sm:text-lg"
      >
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
} from "date-fns";

const notifications = ref([]);
const loading = ref(true);
const currentFilter = ref("all");

const itemsPerPage = ref(5);
const currentPage = ref(1);
const isLoadingMore = ref(false);

const isLastWeek = (date) => {
  const daysDiff = differenceInCalendarDays(new Date(), date);
  return daysDiff >= 7 && daysDiff <= 13;
};

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

const handleScroll = () => {
  const bottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
  if (bottom && hasMore.value && !loading.value && !isLoadingMore.value) {
    loadMore();
  }
};

const fetchNotifications = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await API.get("/notifications", {
      headers: { Authorization: `Bearer ${token}` },
    });
    notifications.value = res.data;
  } catch (error) {
    console.error("❌ Failed to load notifications:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchNotifications();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const formatTime = (time) => new Date(time).toLocaleString();

const filteredNotifications = computed(() => {
  if (currentFilter.value === "unread")
    return notifications.value.filter((n) => !n.read);
  if (currentFilter.value === "read")
    return notifications.value.filter((n) => n.read);
  return notifications.value;
});

const groupedNotifications = computed(() => {
  const groups = {
    Today: [],
    Yesterday: [],
    "This Week": [],
    "Last Week": [],
    Earlier: [],
  };
  for (const note of paginatedNotifications.value) {
    const date = parseISO(note.createdAt);
    if (isToday(date)) groups.Today.push(note);
    else if (isYesterday(date)) groups.Yesterday.push(note);
    else if (isThisWeek(date)) groups["This Week"].push(note);
    else if (isLastWeek(date)) groups["Last Week"].push(note);
    else groups.Earlier.push(note);
  }
  return groups;
});

const filteredGroups = computed(() => {
  return Object.fromEntries(
    Object.entries(groupedNotifications.value).filter(
      ([, notes]) => notes.length > 0
    )
  );
});

const deleteNotification = async (id) => {
  try {
    const token = localStorage.getItem("token");
    await API.delete(`/notifications/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    notifications.value = notifications.value.filter((note) => note._id !== id);
  } catch (error) {
    console.error("❌ Failed to delete notification:", error);
  }
};

const markAllRead = async () => {
  try {
    const token = localStorage.getItem("token");
    await API.patch(
      `/notifications/mark-all-read`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    notifications.value.forEach((note) => (note.read = true));
  } catch (error) {
    console.error("❌ Failed to mark all as read:", error);
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

const markAsRead = async (note) => {
  if (note.read) return;
  try {
    const token = localStorage.getItem("token");
    await API.patch(`/notifications/${note._id}/read`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    note.read = true;
  } catch (error) {
    console.error("❌ Failed to mark notification as read:", error);
  }
};
</script>

<style>
@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-slideIn {
  animation: slideIn 0.4s ease-out forwards;
}
</style>
