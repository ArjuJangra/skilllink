<template>
  <header
    class="flex sticky top-0 z-50 justify-between items-center px-4 sm:px-6 py-4 bg-white max-w-7xl mx-auto"
  >
    <!-- Logo -->
    <div class="flex items-center gap-2">
      <img
        src="@/assets/skilllogo.png"
        alt="SkillLink Logo"
        class="w-10 h-10 sm:w-12 sm:h-12"
      />
      <h1 class="text-xl sm:text-2xl font-bold text-[#0073b1]">SkillLink</h1>
    </div>

    <!-- Desktop Nav -->
    <nav class="hidden sm:flex items-center gap-3">
      <router-link
        to="/about"
        class="text-sm sm:text-lg font-semibold text-gray-600 hover:text-[#0073b1] px-3 py-2 rounded-lg transition hover:scale-105"
      >
        About Us
      </router-link>
      <router-link
        to="/contact"
        class="text-sm sm:text-lg font-semibold text-gray-600 hover:text-[#0073b1] px-3 py-2 rounded-lg transition hover:scale-105"
      >
        Contact
      </router-link>
      <router-link
        :to="{ path: '/help', query: { from: 'homelogged' } }"
        class="text-sm sm:text-lg font-semibold text-gray-600 hover:text-[#0073b1] px-3 py-2 rounded-lg transition hover:scale-105"
      >
        Help
      </router-link>
      <router-link :to="{ path: '/home', query: { disableBooking: true } }">
        <button
          class="flex items-center gap-2 px-4 py-2 text-gray-600 font-bold rounded-lg hover:ring-1 hover:text-[#0073b1] hover:ring-[#0073b1] transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="w-6 h-6"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 22c5.421 0 10-4.579 10-10S17.421 2 12 2 2 6.579 2 12s4.579 10 10 10zm0-18c4.336 0 8 3.664 8 8s-3.664 8-8 8-8-3.664-8-8 3.664-8 8-8zm1 12h-2v-6h2v6zm0-8h-2V8h2v2z"
            />
          </svg>
          Book Service
        </button>
      </router-link>

      <!-- Conditional Rendering -->
      <template v-if="isLoggedIn">
        <!-- Notification -->
        <button class="relative p-2 hover:bg-gray-100 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405C18.21 14.79 18 13.918 18 13V9a6 6 0 00-9.33-5.018M9 21h6"
            />
          </svg>
        </button>
        <!-- Profile -->
        <router-link to="/profile">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            class="w-10 h-10 rounded-full border"
          />
        </router-link>
      </template>
      <template v-else>
        <router-link to="/login">
          <button
            class="px-4 py-2 bg-[#0073b1] text-white font-semibold rounded-lg hover:bg-[#005f91] transition"
          >
            Login/Sign Up
          </button>
        </router-link>
      </template>
    </nav>

    <!-- Hamburger Icon for Mobile -->
    <button
      class="sm:hidden flex flex-col gap-1 focus:outline-none"
      @click="isOpen = !isOpen"
    >
      <span
        class="block w-6 h-0.5 bg-gray-800 transition-transform"
        :class="{ 'rotate-45 translate-y-1.5': isOpen }"
      ></span>
      <span
        class="block w-6 h-0.5 bg-gray-800 transition-opacity"
        :class="{ 'opacity-0': isOpen }"
      ></span>
      <span
        class="block w-6 h-0.5 bg-gray-800 transition-transform"
        :class="{ '-rotate-45 -translate-y-1.5': isOpen }"
      ></span>
    </button>
  </header>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);
const isLoggedIn = ref(false); // yahi check karega ki user logged hai ya nahi
</script>
