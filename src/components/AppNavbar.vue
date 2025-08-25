<template>
  <header class="sticky top-0 z-50 w-full bg-gradient-to-r from-white via-[#f1faff] to-[#f5fafe] shadow-md">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      
      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <img src="@/assets/skilllogo.png" alt="SkillLink Logo"
             class="w-10 h-10 sm:w-12 sm:h-12 transition-transform hover:rotate-12" loading="lazy" />
        <h1 class="text-xl sm:text-2xl font-bold text-[#0073b1]">SkillLink</h1>
      </div>

      <!-- Mobile Book Service -->
      <div class="sm:hidden flex justify-end flex-1">
        <router-link :to="{ path: '/home', query: { disableBooking: true } }" class="ml-auto">
          <button class="btn-secondary flex items-center gap-2 px-3 py-1.5 text-gray-700 font-semibold rounded-lg hover:ring-1 hover:text-[#0073b1] hover:ring-[#0073b1] transition text-sm sm:text-base">
            Book Service
          </button>
        </router-link>
      </div>

      <!-- Desktop Nav -->
      <nav class="hidden sm:flex items-center gap-3">
        <router-link to="/about" class="nav-link text-sm sm:text-lg font-semibold text-gray-600 hover:text-[#0073b1] px-3 py-2 rounded-lg transition hover:scale-105">About Us</router-link>
        <router-link to="/contact" class="nav-link text-sm sm:text-lg font-semibold text-gray-600 hover:text-[#0073b1] px-3 py-2 rounded-lg transition hover:scale-105">Contact</router-link>
        <router-link :to="{ path: '/help', query: { from: 'homelogged' } }" class="nav-link text-sm sm:text-lg font-semibold text-gray-600 hover:text-[#0073b1] px-3 py-2 rounded-lg transition hover:scale-105">Help</router-link>

        <!-- Home / Login / Profile -->
        <template v-if="showButton === 'home'">
          <router-link :to="auth?.isLoggedIn ? '/homelogged' : '/homeboard'" class="ml-auto">
            <button class="bg-[#0073b1] flex gap-1 items-center text-white px-4 py-2 rounded-lg hover:bg-[#005f91] transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3l8 7v10a2 2 0 0 1-2 2h-4a1 1 0 0 1-1-1v-5H11v5a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V10l8-7z" />
              </svg>
              <span class="font-semibold">Home</span>
            </button>
          </router-link>
        </template>

        <template v-else-if="showButton === 'login'">
          <router-link to="/login" class="ml-auto">
            <button class="btn-primary px-4 py-2 bg-[#0073b1] text-white font-semibold rounded-lg hover:bg-[#005f91] transition">
              Login / Sign Up
            </button>
          </router-link>
        </template>

        <template v-else>
          <div class="flex items-center gap-3 ml-auto">
            <!-- Notification Bell -->
            <router-link to="/notifications" class="relative w-10 h-10 flex items-center justify-center rounded-full hover:text-[#0073b1] transition duration-200">
              <svg class="w-7 h-7 text-gray-700 hover:text-[#0073b1]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span v-if="unreadCount > 0" class="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {{ unreadCount }}
              </span>
            </router-link>

            <!-- Profile Avatar -->
            <router-link to="/dashboard">
              <img :src="auth.user?.profilePic ? getImageUrl(auth.user.profilePic) : defaultAvatar"
                   alt="User Profile"
                   class="w-10 h-10 rounded-full object-cover border-2 border-[#0073b1] hover:ring-1 hover:ring-[#0073b1]" />
            </router-link>
          </div>
        </template>
      </nav>

      <!-- Mobile Hamburger -->
      <button class="sm:hidden relative z-50 flex flex-col gap-1 focus:outline-none" @click="isOpen = !isOpen">
        <span :class="{ 'rotate-45 translate-y-2': isOpen }" class="block w-7 h-0.5 bg-gray-800 transition-all duration-300"></span>
        <span :class="{ 'opacity-0': isOpen }" class="block w-7 h-0.5 bg-gray-800 transition-all duration-300"></span>
        <span :class="{ '-rotate-45 -translate-y-1.5': isOpen }" class="block w-7 h-0.5 bg-gray-800 transition-all duration-300"></span>
      </button>
    </div>

    <!-- Mobile Drawer -->
    <transition enter-active-class="transition-transform duration-300 ease-out"
                enter-from-class="translate-x-full" enter-to-class="translate-x-0"
                leave-active-class="transition-transform duration-300 ease-in"
                leave-from-class="translate-x-0" leave-to-class="translate-x-full">
      <div v-if="isOpen" class="fixed inset-0 z-40 flex justify-end">
        <div class="flex-1 bg-black bg-opacity-40" @click="closeMenu"></div>
        <div class="w-72 h-full bg-white shadow-xl flex flex-col px-6 py-8 space-y-6 pt-12">
          <template v-if="showButton === 'login'">
            <router-link to="/login" @click="closeMenu">
              <button class="w-full px-4 py-2 bg-[#0073b1] text-white font-semibold rounded-lg hover:bg-[#005f91] transition duration-200">
                Login / Sign Up
              </button>
            </router-link>
          </template>

          <template v-else-if="showButton === 'home'">
            <router-link :to="auth?.isLoggedIn ? '/homelogged' : '/homeboard'" @click="closeMenu">
              <button class="w-full px-4 py-2 bg-[#0074B7] text-white font-semibold rounded-lg hover:bg-[#005f91] transition duration-200">
                Home
              </button>
            </router-link>
          </template>

          <template v-else>
            <div class="flex items-center gap-3">
              <router-link to="/dashboard" @click="closeMenu">
                <img :src="auth.user?.profilePic ? getImageUrl(auth.user.profilePic) : defaultAvatar"
                     alt="Profile" class="w-12 h-12 rounded-full border-2 border-[#0073b1]" />
              </router-link>
              <button @click="() => { logout(); closeMenu(); }" class="w-full px-4 py-2 text-gray-600 font-semibold rounded-lg hover:ring-1 hover:text-[#0073b1] hover:ring-[#0073b1] transition duration-200">
                Logout
              </button>
            </div>
          </template>

          <hr class="border-gray-200 my-4" />
          <router-link to="/about" class="drawer-link" @click="closeMenu">About Us</router-link>
          <router-link to="/contact" class="drawer-link" @click="closeMenu">Contact</router-link>
          <router-link :to="{ path: '/help', query: { from: 'homelogged' } }" class="drawer-link" @click="closeMenu">Help</router-link>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { auth, logoutUser } from "@/stores/auth";
import API from "@/api";

const isOpen = ref(false);
const defaultAvatar = "/assets/user.png";

const route = useRoute();

const closeMenu = () => { isOpen.value = false; }
const logout = () => { logoutUser(); }

// Fallback for API.getImageUrl
const getImageUrl = (path) => API?.getImageUrl ? API.getImageUrl(path) : path;

// Determine which button to show
const showButton = computed(() => {
  const homePages = ["/about", "/contact", "/help"];
  if (homePages.includes(route.path)) return "home";
  if (!auth?.isLoggedIn) return "login";
  return "profile";
});
</script>

<style scoped>
.drawer-link {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    font-weight: 600;
    color: #4B5563;
    border-radius: 0.5rem;
    transition: all 0.2s;
}

.drawer-link:hover {
    color: #0073b1;
    box-shadow: 0 0 0 1px #0073b1;
}
</style>
