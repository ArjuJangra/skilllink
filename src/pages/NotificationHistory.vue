<template>
  <div class="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6">
    <div class="max-w-3xl mx-auto">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 class="text-3xl font-black text-slate-900 flex items-center gap-3">
            <div class="p-2 bg-blue-50 rounded-lg">
              <i class="fas fa-bell text-[#0073b1]"></i>
            </div>
            Activity
          </h1>
          <p class="text-slate-500 mt-1">Stay updated with your latest service requests.</p>
        </div>

        <button v-if="hasUnread" @click="markAllRead"
          class="flex items-center gap-2 px-4 py-2 bg-white text-[#0073b1] border border-blue-100 rounded-xl font-bold hover:bg-blue-50 transition shadow-sm">
          <i class="fas fa-check-double text-xs"></i>
          Mark all as read
        </button>
      </div>

      <div class="flex gap-2 mb-8 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 w-fit">
        <button v-for="filter in ['all', 'unread', 'read']" :key="filter" @click="currentFilter = filter" :class="[
          'px-6 py-2 rounded-xl text-sm font-bold transition-all duration-200',
          currentFilter === filter
            ? 'bg-[#0073b1] text-white shadow-md'
            : 'text-slate-500 hover:bg-slate-50'
        ]">
          {{ filter.charAt(0).toUpperCase() + filter.slice(1) }}
        </button>
      </div>

      <div v-if="loading" class="space-y-4">
        <div v-for="n in 3" :key="n"
          class="bg-white p-6 rounded-[2rem] border border-slate-100 animate-pulse flex gap-4">
          <div class="w-12 h-12 bg-slate-100 rounded-2xl"></div>
          <div class="flex-1 space-y-3">
            <div class="h-4 bg-slate-100 rounded w-3/4"></div>
            <div class="h-3 bg-slate-100 rounded w-1/4"></div>
          </div>
        </div>
      </div>

      <div v-else>
        <div v-for="(notes, groupName) in filteredGroups" :key="groupName" class="mb-10">
          <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 ml-2">{{ groupName }}</h3>

          <div class="space-y-4">
            <div v-for="notification in notes" :key="notification.$id" @click="markAsRead(notification)" :class="[
              'group relative flex gap-5 p-5 rounded-[2rem] border-2 transition-all duration-300 cursor-pointer',
              notification.read
                ? 'bg-white border-transparent grayscale-[0.5] opacity-80'
                : 'bg-white border-blue-100 shadow-xl shadow-blue-50/50 scale-[1.02]'
            ]">
              <div class="flex-shrink-0">
                <div
                  class="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                  :class="getIconBg(notification.type, notification.read)">
                  <i :class="[getIconClass(notification.type), notification.read ? 'text-slate-400' : '']"
                    class="text-xl"></i>
                </div>
              </div>

              <div class="flex-1 pr-8">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-[10px] font-black uppercase tracking-tighter text-blue-500"
                    v-if="!notification.read">New Update</span>
                  <span class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{{ notification.type ||
                    'System' }}</span>
                </div>
                <p class="text-slate-800 font-bold leading-snug group-hover:text-[#0073b1] transition-colors">
                  {{ notification.message }}
                </p>
                <p class="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                  <i class="far fa-clock"></i> {{ formatTime(notification.$createdAt) }}
                </p>
              </div>

              <div v-if="!notification.read" class="absolute top-6 right-6">
                <span class="flex h-3 w-3">
                  <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                </span>
              </div>

              <button @click.stop="deleteNotification(notification.$id)"
                class="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                <i class="fas fa-trash-alt text-sm"></i>
              </button>
            </div>
          </div>
        </div>

        <div v-if="notifications.length === 0"
          class="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
          <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-ghost text-slate-200 text-3xl"></i>
          </div>
          <h3 class="text-xl font-black text-slate-900">All caught up!</h3>
          <p class="text-slate-400 mt-1">No {{ currentFilter }} notifications to show right now.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import { databases, client, account } from "@/appwrite";
import { Query } from "appwrite";
import { formatDistanceToNow, isToday, isYesterday, isThisWeek, parseISO } from "date-fns";

const DATABASE_ID = "69bc1ae900174fd0a3c6";
const COLLECTION_ID = "notifications";

const notifications = ref([]);
const loading = ref(true);
const currentFilter = ref("all");
const user = ref(null);
let unsubscribe = null;

const hasUnread = computed(() => notifications.value.some(n => !n.read));

const fetchNotifications = async () => {
  try {
    loading.value = true;
    const session = await account.get();
    user.value = session;

    const queries = [
      Query.equal("userId", session.$id),
      Query.orderDesc("$createdAt"),
      Query.limit(30)
    ];

    if (currentFilter.value === "unread") queries.push(Query.equal("read", false));
    if (currentFilter.value === "read") queries.push(Query.equal("read", true));

    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, queries);
    notifications.value = response.documents;
  } catch (error) {
    console.error("Fetch Error:", error);
  } finally {
    loading.value = false;
  }
};

const markAsRead = async (notification) => {
  if (notification.read) return;
  const originalState = notification.read;
  notification.read = true; // Optimistic UI update

  try {
    await databases.updateDocument(DATABASE_ID, COLLECTION_ID, notification.$id, { read: true });
  } catch (error) {
    notification.read = originalState; // Revert if failed
    console.error("Update Failed:", error);
  }
};

const markAllRead = async () => {
  const unreadOnes = notifications.value.filter(n => !n.read);
  // Update UI immediately
  unreadOnes.forEach(n => n.read = true);

  // Update Appwrite in background
  try {
    await Promise.all(unreadOnes.map(n =>
      databases.updateDocument(DATABASE_ID, COLLECTION_ID, n.$id, { read: true })
    ));
  } catch (error) {
    console.error("Bulk Update Error:", error);
  }
};

const getIconBg = (type, isRead) => {
  if (isRead) return 'bg-slate-50 text-slate-400';
  const bgs = {
    booking: "bg-green-50 text-green-600",
    message: "bg-blue-50 text-blue-600",
    payment: "bg-purple-50 text-purple-600"
  };
  return bgs[type] || "bg-amber-50 text-amber-600";
};

const getIconClass = (type) => {
  const icons = {
    booking: "fas fa-calendar-check",
    message: "fas fa-comment-dots",
    payment: "fas fa-receipt"
  };
  return icons[type] || "fas fa-bell";
};

// ... keep formatTime and filteredGroups from your original script ...

watch(currentFilter, fetchNotifications);

onMounted(() => {
  fetchNotifications();

  // Better Realtime Subscription
  unsubscribe = client.subscribe(
    `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`,
    (res) => {
      const isForMe = res.payload.userId === user.value?.$id;
      if (!isForMe) return;

      if (res.events.some(e => e.includes('.create'))) {
        notifications.value.unshift(res.payload);
        // Play notification sound
        new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play().catch(() => { });
      }

      if (res.events.some(e => e.includes('.delete'))) {
        notifications.value = notifications.value.filter(n => n.$id !== res.payload.$id);
      }
    }
  );
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});




const deleteNotification = async (id) => {
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    notifications.value = notifications.value.filter((n) => n.$id !== id);
  } catch (error) {
    console.error("❌ Failed to delete:", error);
  }
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