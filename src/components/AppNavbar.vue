<template>
  <header class="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 h-16  flex items-center justify-between gap-4">

      <router-link :to="isLoggedIn ? '/homelogged' : '/homeboard'"
        class="flex items-center gap-2.5 shrink-0 group transition-all active:scale-95">
        <div class="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center 
          shadow-sm border border-slate-100 group-hover:border-[#00A8E8]/30 transition-all overflow-hidden">
          <img src="@/assets/skilllogo.png" class="w-full h-full object-cover " alt="SkillLink" />
        </div>
        <span
          class="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-tr from-[#00A8E8] to-[#007EA7] bg-clip-text text-transparent">
          SkillLink
        </span>
      </router-link>

      <div v-if="shouldShowSearch" class="hidden md:flex flex-1 max-w-md relative group px-4">
        <SearchIcon
          class="absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#00A8E8] transition-colors" />
        <input v-model="searchQuery" type="text" placeholder="Search for skills..."
          class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#00A8E8]/5 focus:border-[#00A8E8]/50 transition-all outline-none" />
      </div>

      <div class="flex items-center gap-2 sm:gap-4">

        <nav class="hidden lg:flex items-center gap-1 mr-2">
          <router-link to="/about" class="nav-link">About</router-link>
          <router-link to="/contact" class="nav-link">Contact</router-link>
        </nav>

        <template v-if="!isLoggedIn">
          <router-link to="/login">
            <button
              class="px-5 py-2.5 bg-gradient-to-br from-[#00A8E8] to-[#007EA7]  text-white text-sm font-bold rounded-xl hover:bg-[#007EA7] transition-all active:scale-95 shadow-lg shadow-blue-100">
              Login | Signup
            </button>
          </router-link>
        </template>

        <template v-else>
          <router-link to="/home"
            class="flex items-center gap-2 px-3 py-2.5 sm:px-5 border rounded-xl transition-all duration-300 active:scale-95"
            :class="route.path === '/home'
              ? 'bg-[#00A8E8] border-[#00A8E8] text-white shadow-md'
              : 'bg-white border-slate-200 text-slate-700 hover:border-[#00A8E8] hover:text-[#00A8E8]'">
            <ShoppingBagIcon class="w-5 h-5" />
            <span class="hidden sm:inline font-bold text-sm">Book Service</span>
          </router-link>

          <router-link to="/notifications"
            class="hidden md:block relative p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">
            <BellIcon class="w-6 h-6" />
            <span v-if="unreadCount"
              class="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </router-link>

          <div class="hidden md:block relative">
            <button @click="toggleDropdown"
              class="flex items-center gap-2 p-1 border border-slate-200 rounded-full hover:shadow-sm transition-all">
              <img :src="user?.profilePic || defaultAvatar" class="w-8 h-8 rounded-full object-cover" />
              <ChevronDownIcon class="w-4 h-4 text-slate-400 mr-1 transition-transform"
                :class="{ 'rotate-180': showDropdown }" />
            </button>

            <transition name="dropdown">
              <div v-if="showDropdown"
                class="absolute right-0 mt-3 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-[110]">
                <div class="px-4 py-2 mb-1 border-b border-slate-50">
                  <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Signed in as</p>
                  <p class="text-sm font-bold text-slate-800 truncate">{{ user?.name || 'User' }}</p>
                </div>
                <router-link @click="showDropdown = false" to="/dashboard" class="dropdown-item">
                  <LayoutDashboardIcon class="w-4 h-4" /> Dashboard
                </router-link>
                <router-link @click="showDropdown = false" to="/profile" class="dropdown-item">
                  <UserIcon class="w-4 h-4" /> My Profile
                </router-link>
                <div class="h-px bg-slate-100 my-1"></div>
                <button @click="showLogoutModal = true; showDropdown = false" class="dropdown-item text-red-500 w-full">
                  <LogOutIcon class="w-4 h-4" /> Logout
                </button>
              </div>
            </transition>
          </div>
        </template>

        <button @click="mobileMenu = !mobileMenu"
          class="md:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
          <MenuIcon v-if="!mobileMenu" class="w-7 h-7" />
          <XIcon v-else class="w-7 h-7" />
        </button>
      </div>
    </div>

    <transition name="mobile-menu">
      <div v-if="mobileMenu" class="fixed inset-0 top-[64px] sm:top-[80px] bg-white z-[90] md:hidden overflow-y-auto">
        <div class="p-6 flex flex-col gap-8">

          <div v-if="isLoggedIn" class="flex items-center gap-4 p-5 bg-slate-50 rounded-3xl border border-slate-100">
            <img :src="user?.profilePic || defaultAvatar" class="w-14 h-14 rounded-2xl object-cover shadow-sm" />
            <div class="flex-1">
              <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Welcome back,</p>
              <p class="text-lg font-black text-slate-900 leading-tight">{{ user?.name || 'Account' }}</p>
            </div>
          </div>

          <div v-if="shouldShowSearch" class="relative">
            <SearchIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input v-model="searchQuery" type="text" placeholder="What are you looking for?"
              class="w-full pl-12 pr-4 py-4 bg-slate-100 border-none rounded-2xl text-base outline-none focus:ring-2 focus:ring-[#00A8E8]/20" />
          </div>

          <div class="space-y-1">
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">Main Menu</p>
            <router-link @click="mobileMenu = false" to="/dashboard" class="mobile-nav-item">
              <LayoutDashboardIcon class="w-6 h-6 text-[#00A8E8]" /> Dashboard
            </router-link>
            <router-link @click="mobileMenu = false" to="/profile" class="mobile-nav-item">
              <UserIcon class="w-6 h-6 text-[#00A8E8]" /> My Profile
            </router-link>
            <router-link @click="mobileMenu = false" to="/notifications" class="mobile-nav-item">
              <BellIcon class="w-6 h-6 text-[#00A8E8]" /> Notifications
            </router-link>
            <div class="h-px bg-slate-50 my-4"></div>
            <router-link @click="mobileMenu = false" to="/about" class="mobile-nav-item">
              <HelpCircleIcon class="w-6 h-6 text-slate-400" /> About SkillLink
            </router-link>
            <router-link @click="mobileMenu = false" to="/contact" class="mobile-nav-item">
              <MailIcon class="w-6 h-6 text-slate-400" /> Help & Support
            </router-link>
          </div>

          <div class="pt-4 border-t border-slate-100">
            <button v-if="isLoggedIn" @click="showLogoutModal = true; mobileMenu = false"
              class="w-full py-4 text-red-500 font-bold bg-red-50 rounded-2xl flex items-center justify-center gap-2">
              <LogOutIcon class="w-5 h-5" /> Sign Out
            </button>
            <router-link v-else to="/login" @click="mobileMenu = false"
              class="w-full py-4 bg-[#00A8E8] text-white font-bold rounded-2xl text-center shadow-lg shadow-blue-100">
              Sign In / Register
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </header>

  <transition name="modal-fade">
    <div v-if="showLogoutModal"
      class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[200] px-4">
      <div class="bg-white p-8 rounded-[2rem] w-full max-w-sm shadow-2xl overflow-hidden relative">
        <div class="absolute top-0 left-0 w-full h-1.5 bg-red-500"></div>
        <h2 class="text-xl font-bold text-center text-slate-800 mb-2">Confirm Logout</h2>
        <p class="text-slate-500 text-center mb-8 text-sm">You will need to log back in to access your bookings and
          profile.</p>
        <div class="grid grid-cols-2 gap-3">
          <button @click="showLogoutModal = false"
            class="py-3.5 font-bold text-slate-600 bg-slate-100 rounded-2xl hover:bg-slate-200 transition-colors">Cancel</button>
          <button @click="logout"
            class="py-3.5 font-bold text-white bg-red-500 rounded-2xl shadow-lg shadow-red-100 active:scale-95 transition-all">Logout</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
// 1. Import your central auth store and the global logout function
import { auth, logoutUser } from "@/stores/auth" 
import {
  SearchIcon, BellIcon, MenuIcon, XIcon, ShoppingBagIcon, MailIcon, HelpCircleIcon,
  ChevronDownIcon, LayoutDashboardIcon, UserIcon, LogOutIcon
} from "lucide-vue-next"

import defaultAvatarFile from "@/assets/user.png"

const router = useRouter()
const route = useRoute()

// 2. Map local variables to the Global Store
// This ensures that when auth.js updates, the Navbar updates instantly
const user = computed(() => auth.user)
const isLoggedIn = computed(() => auth.isLoggedIn)

const unreadCount = ref(3) 
const showDropdown = ref(false)
const mobileMenu = ref(false)
const showLogoutModal = ref(false)
const searchQuery = ref("")
const defaultAvatar = defaultAvatarFile

// 3. Simplified Logout using your central logic
const logout = async () => {
  try {
    await logoutUser() // This handles Appwrite, LocalStorage, and Store cleanup
    showLogoutModal.value = false
    router.push("/homeboard")
  } catch (error) { 
    console.error("Logout failed:", error) 
  }
}

const toggleDropdown = () => (showDropdown.value = !showDropdown.value)
const shouldShowSearch = computed(() => !["/login", "/signup"].includes(route.path))

// 4. REMOVED: onMounted(checkUserStatus) 
// We don't check here anymore. initAuth() should be called in App.vue 
// so the check happens only ONCE per session, not every time you change pages.
</script>

<style scoped>
.nav-link {
  @apply px-4 py-2 text-sm font-semibold text-slate-600 hover:text-[#00A8E8] transition-colors rounded-xl;
}

.dropdown-item {
  @apply flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer;
}

.mobile-nav-item {
  @apply flex items-center gap-4 px-4 py-4 text-base font-bold text-slate-700 hover:bg-slate-50 rounded-2xl transition-all;
}

/* Dropdown Animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease-out;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}

/* Mobile Menu Animation */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* Fade Animation */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>