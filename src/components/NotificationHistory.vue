<template>
  <div class="p-6 bg-gray-50 rounded-2xl shadow-lg max-w-3xl mx-auto relative border border-gray-200">
    <div class="flex justify-between items-center mb-6 border-b pb-3">
      <h2 class="text-2xl font-bold text-[#0073b1] flex items-center gap-3">
        <i class="fas fa-bell text-[#0073b1] text-xl"></i>
        Notifications
      </h2>
      <button
        v-if="notifications.length"
        @click="markAllRead"
        class="text-sm font-medium text-blue-600 hover:underline transition"
      >
        Mark all as read
      </button>
    </div>

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

    <div v-if="loading" class="space-y-4">
      <div v-for="n in 3" :key="n" class="flex gap-3 animate-pulse">
        <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div class="flex-1 space-y-2">
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="h-3 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    </div>

    <div v-else>
      <div v-for="(notes, groupName) in filteredGroups" :key="groupName" class="mb-6">
        <h3 class="text-sm font-semibold text-[#0073b1] uppercase mb-3">{{ groupName }}</h3>
        <div class="space-y-3">
          <div
            v-for="notification in notes"
            :key="notification.$id"
            :class="[
              'p-2 rounded-xl border transition flex gap-3 items-start relative group duration-200 cursor-pointer',
              notification.read ? 'border-gray-200 bg-white hover:shadow-md' : 'border-blue-300 bg-blue-50 shadow-sm hover:shadow-md'
            ]"
            @click="markAsRead(notification)"
          >
            <div class="flex-shrink-0">
              <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="notification.read ? 'bg-gray-100' : 'bg-blue-100'">
                <i :class="[getIconClass(notification.type), notification.read ? 'text-[#0073b1]' : 'text-blue-600']" class="text-lg"></i>
              </div>
            </div>

            <div class="flex-1 min-w-0">
              <p class="text-sm sm:text-base font-medium text-gray-800 leading-relaxed">{{ notification.message }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ formatTime(notification.$createdAt) }}</p>
            </div>

            <span v-if="!notification.read" class="absolute top-3 right-9 w-2.5 h-2.5 bg-blue-600 rounded-full"></span>

            <button @click.stop="deleteNotification(notification.$id)" class="opacity-0 group-hover:opacity-100 absolute top-2 right-2 text-gray-400 hover:text-red-500 transition">
              <i class="fas fa-times text-sm"></i>
            </button>
          </div>
        </div>
      </div>

      <div v-if="notifications.length === 0" class="text-gray-500 text-center py-12">
        <i class="fas fa-inbox text-2xl mb-2 block text-gray-400"></i>
        No {{ currentFilter }} notifications 🎉
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { databases, client, account } from "@/appwrite";
import { Query } from "appwrite";
import { formatDistanceToNow, isToday, isYesterday, isThisWeek, parseISO } from "date-fns";

// Replace these with your actual IDs from Appwrite Console
const DATABASE_ID = "69bc1ae900174fd0a3c6"; 
const COLLECTION_ID = "notifications";

const notifications = ref([]);
const loading = ref(true);
const currentFilter = ref("all");
const user = ref(null);

const fetchNotifications = async () => {
  try {
    loading.value = true;
    const session = await account.get();
    user.value = session;

    const queries = [
      Query.equal("userId", session.$id),
      Query.orderDesc("$createdAt"),
      Query.limit(20)
    ];

    if (currentFilter.value === "unread") queries.push(Query.equal("read", false));
    if (currentFilter.value === "read") queries.push(Query.equal("read", true));

    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, queries);
    notifications.value = response.documents;
  } catch (error) {
    console.error("❌ Appwrite Fetch Error:", error);
  } finally {
    loading.value = false;
  }
};

const markAsRead = async (notification) => {
  if (notification.read) return;
  try {
    await databases.updateDocument(DATABASE_ID, COLLECTION_ID, notification.$id, { read: true });
    notification.read = true;
  } catch (error) {
    console.error("❌ Failed to update:", error);
  }
};

const deleteNotification = async (id) => {
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    notifications.value = notifications.value.filter((n) => n.$id !== id);
  } catch (error) {
    console.error("❌ Failed to delete:", error);
  }
};

const markAllRead = async () => {
  const unread = notifications.value.filter(n => !n.read);
  for (const n of unread) {
    await markAsRead(n);
  }
};

const getIconClass = (type) => {
  const icons = { booking: "fas fa-calendar-check", message: "fas fa-comment-dots", payment: "fas fa-credit-card" };
  return icons[type] || "fas fa-info-circle";
};

const formatTime = (time) => formatDistanceToNow(new Date(time), { addSuffix: true });

// Grouping Logic
const filteredGroups = computed(() => {
  const groups = { Today: [], Yesterday: [], "This Week": [], Earlier: [] };
  notifications.value.forEach(n => {
    const date = parseISO(n.$createdAt);
    if (isToday(date)) groups.Today.push(n);
    else if (isYesterday(date)) groups.Yesterday.push(n);
    else if (isThisWeek(date)) groups["This Week"].push(n);
    else groups.Earlier.push(n);
  });
  return Object.fromEntries(Object.entries(groups).filter(([, notes]) => notes.length > 0));
});

watch(currentFilter, fetchNotifications);

onMounted(() => {
  fetchNotifications();
  // Realtime listener
  const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`, (res) => {
    if (res.events.includes("databases.*.create") && res.payload.userId === user.value?.$id) {
      notifications.value.unshift(res.payload);
    }
  });
  return () => unsubscribe();
});
</script>