<template>
     <!-- Conditional rendering based on mode prop -->
    <!--Default Navbar-->
  <header v-if="props.mode !== 'homelogged'" class="sticky top-0 z-50 w-full bg-gradient-to-r from-white via-[#f1faff] to-[#f5fafe] shadow-md">
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

   <!--Homelogged Navbar -->
    <header v-else class="sticky top-0 z-50 w-full bg-gradient-to-r from-white via-[#f1faff] to-[#f5fafe] shadow-md">
      <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <img src="@/assets/skilllogo.png" alt="SkillLink Logo"
            class="w-10 h-10 sm:w-12 sm:h-12 transition-transform hover:rotate-12" loading="lazy" />
          <h1 class="text-xl sm:text-2xl font-bold text-[#0073b1]">SkillLink</h1>
        </div>
        <div class="sm:hidden flex justify-end flex-1">
          <router-link :to="{ path: '/home', query: { disableBooking: true } }" class="ml-auto">
            <button
              class="btn-secondary flex items-center gap-2 px-3 py-1.5 text-gray-700 font-semibold rounded-lg hover:ring-1 hover:text-[#0073b1] hover:ring-[#0073b1] transition  text-sm sm:text-base">
              <!-- SVG icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 1024 1024"
                fill="#000000" class="w-5 sm:w-6 h-5 sm:h-6 fill-current">
                <path
                  d="M959.018 208.158c0.23-2.721 0.34-5.45 0.34-8.172 0-74.93-60.96-135.89-135.89-135.89-1.54 0-3.036 0.06-6.522 0.213l-611.757-0.043c-1.768-0.085-3.563-0.17-5.424-0.17-74.812 0-135.67 60.84-135.67 135.712l0.188 10.952h-0.306l0.391 594.972-0.162 20.382c0 74.03 60.22 134.25 134.24 134.25 1.668 0 7.007-0.239 7.1-0.239l608.934 0.085c2.985 0.357 6.216 0.468 9.55 0.468 35.815 0 69.514-13.954 94.879-39.302 25.373-25.34 39.344-58.987 39.344-94.794l-0.145-12.015h0.918l-0.008-606.41z m-757.655 693.82l-2.585-0.203c-42.524 0-76.146-34.863-76.537-79.309V332.671H900.79l0.46 485.186-0.885 2.865c-0.535 1.837-0.8 3.58-0.8 5.17 0 40.382-31.555 73.766-71.852 76.002l-10.816 0.621v-0.527l-615.533-0.01zM900.78 274.424H122.3l-0.375-65.934 0.85-2.924c0.52-1.82 0.782-3.63 0.782-5.247 0-42.236 34.727-76.665 78.179-76.809l0.45-0.068 618.177 0.018 2.662 0.203c42.329 0 76.767 34.439 76.767 76.768 0 1.326 0.196 2.687 0.655 4.532l0.332 0.884v68.577z" />
                <path
                  d="M697.67 471.435c-7.882 0-15.314 3.078-20.918 8.682l-223.43 223.439L346.599 596.84c-5.544-5.603-12.95-8.69-20.842-8.69s-15.323 3.078-20.918 8.665c-5.578 5.518-8.674 12.9-8.7 20.79-0.017 7.908 3.07 15.357 8.69 20.994l127.55 127.558c5.57 5.56 13.01 8.622 20.943 8.622 7.925 0 15.364-3.06 20.934-8.63l244.247-244.247c5.578-5.511 8.674-12.883 8.7-20.783 0.017-7.942-3.079-15.408-8.682-20.986-5.552-5.612-12.958-8.698-20.85-8.698z" />
              </svg>
              Book Service
            </button>
          </router-link>
        </div>

        <!-- Desktop Nav -->
        <nav class="hidden sm:flex items-center gap-4">

          <!-- Book Service Button -->
          <router-link to="/home"
            class="relative flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-600 font-semibold text-sm sm:text-base rounded-lg hover:text-[#0073b1] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#0073b1] focus:ring-offset-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 1024 1024" fill="#000000"
              class="w-5 sm:w-6 h-5 sm:h-6 fill-current">
              <path
                d="M959.018 208.158c0.23-2.721 0.34-5.45 0.34-8.172 0-74.93-60.96-135.89-135.89-135.89-1.54 0-3.036 0.06-6.522 0.213l-611.757-0.043c-1.768-0.085-3.563-0.17-5.424-0.17-74.812 0-135.67 60.84-135.67 135.712l0.188 10.952h-0.306l0.391 594.972-0.162 20.382c0 74.03 60.22 134.25 134.24 134.25 1.668 0 7.007-0.239 7.1-0.239l608.934 0.085c2.985 0.357 6.216 0.468 9.55 0.468 35.815 0 69.514-13.954 94.879-39.302 25.373-25.34 39.344-58.987 39.344-94.794l-0.145-12.015h0.918l-0.008-606.41z m-757.655 693.82l-2.585-0.203c-42.524 0-76.146-34.863-76.537-79.309V332.671H900.79l0.46 485.186-0.885 2.865c-0.535 1.837-0.8 3.58-0.8 5.17 0 40.382-31.555 73.766-71.852 76.002l-10.816 0.621v-0.527l-615.533-0.01zM900.78 274.424H122.3l-0.375-65.934 0.85-2.924c0.52-1.82 0.782-3.63 0.782-5.247 0-42.236 34.727-76.665 78.179-76.809l0.45-0.068 618.177 0.018 2.662 0.203c42.329 0 76.767 34.439 76.767 76.768 0 1.326 0.196 2.687 0.655 4.532l0.332 0.884v68.577z" />
              <path
                d="M697.67 471.435c-7.882 0-15.314 3.078-20.918 8.682l-223.43 223.439L346.599 596.84c-5.544-5.603-12.95-8.69-20.842-8.69s-15.323 3.078-20.918 8.665c-5.578 5.518-8.674 12.9-8.7 20.79-0.017 7.908 3.07 15.357 8.69 20.994l127.55 127.558c5.57 5.56 13.01 8.622 20.943 8.622 7.925 0 15.364-3.06 20.934-8.63l244.247-244.247c5.578-5.511 8.674-12.883 8.7-20.783 0.017-7.942-3.079-15.408-8.682-20.986-5.552-5.612-12.958-8.698-20.85-8.698z" />
            </svg> <span>Book Service</span> </router-link>

          <!-- Notification Bell -->
          <router-link to="/notifications"
            class="relative w-10 h-10 flex items-center justify-center rounded-full hover:text-[#0073b1] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#0073b1] focus:ring-offset-2">
            <svg class="w-7 h-7 text-gray-700 hover:text-[#0073b1]" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg> <!-- 🔴 Badge --> <span v-if="unreadCount > 0"
              class="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {{ unreadCount }} </span> </router-link>

          <!-- Profile -->
          <router-link to="/dashboard">
            <img v-if="user && user.profilePic" :src="API.getImageUrl(user.profilePic)" alt="User Profile"
              class="w-10 h-10 rounded-full object-cover border-2 border-[#0073b1] hover:ring-1 hover:ring-[#0073b1]"
              loading="lazy" />
            <img v-else src="@/assets/user.png" alt="Default Profile"
              class="w-10 h-10 rounded-full object-cover border-2 border-[#0073b1] hover:ring-2 hover:ring-[#0073b1]"
              loading="lazy" />
          </router-link>
        </nav>
        <!-- Mobile Hamburger -->
        <button class="sm:hidden relative z-50 flex flex-col gap-1 focus:outline-none" @click="isOpen = !isOpen">
          <span :class="{ 'rotate-45 translate-y-2': isOpen }"
            class="block w-7 h-0.5 bg-gray-800 transition-all duration-300"></span>
          <span :class="{ 'opacity-0': isOpen }" class="block w-7 h-0.5 bg-gray-800 transition-all duration-300"></span>
          <span :class="{ '-rotate-45 -translate-y-1.5': isOpen }"
            class="block w-7 h-0.5 bg-gray-800 transition-all duration-300"></span>
        </button>
      </div>

      <!-- Mobile Drawer -->
      <transition enter-active-class="transition-transform duration-300 ease-out" enter-from-class="translate-x-full"
        enter-to-class="translate-x-0" leave-active-class="transition-transform duration-300 ease-in"
        leave-from-class="translate-x-0" leave-to-class="translate-x-full">
        <div v-if="isOpen" class="fixed inset-0 z-40 flex justify-end">
          <!-- Overlay -->
          <transition enter-active-class="transition-opacity duration-300 ease-out" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition-opacity duration-300 ease-in"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="isOpen" class="flex-1 bg-black bg-opacity-40" @click="closeMenu"></div>
          </transition>

          <div class="w-72 h-full bg-white shadow-xl flex flex-col px-6 py-6">

            <!-- Profile Section -->
            <div class="flex items-center gap-4">
              <router-link to="/dashboard" @click="closeMenu">
                <img v-if="user && user.profilePic" :src="API.getImageUrl(user.profilePic)" alt="User Profile"
                  class="w-14 h-14 rounded-full object-cover border-2 border-[#0073b1] hover:ring-2 hover:ring-[#0073b1] transition"
                  loading="lazy" />
                <img v-else src="@/assets/user.png" alt="Default Profile"
                  class="w-14 h-14 rounded-full object-cover border-2 border-[#0073b1] hover:ring-2 hover:ring-[#0073b1] transition"
                  loading="lazy" />
              </router-link>
              <div>
                <p class="text-gray-800 font-semibold">{{ user?.name || 'Welcome!' }}</p>
                <router-link to="/dashboard" class="text-sm text-[#0073b1] hover:underline" @click="closeMenu">
                  View Dashboard
                </router-link>
              </div>
            </div>

            <hr class="border-gray-200 my-6" />

            <!-- Navigation -->
            <div class="flex-1 space-y-3">
              <router-link to="/notifications"
                class="flex px-3 gap-2 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 hover:text-[#0073b1] transition"
                @click="closeMenu">
                <svg class="w-7 h-7 text-gray-700 hover:text-[#0073b1]" fill="none" stroke="currentColor"
                  stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg><span> Notifications</span>
              </router-link>

              <router-link to="/about"
                class="flex gap-2 px-3 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 hover:text-[#0073b1] transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>About Us</span>
              </router-link>

              <router-link to="/contact"
                class="flex gap-2 px-3 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 hover:text-[#0073b1] transition"
                @click="closeMenu">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.05 11.05 0 003.47.55 1 1 0 011 1V20a1 1 0 01-1 1C10.42 21 3 13.58 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.2.19 2.38.55 3.47a1 1 0 01-.21 1.11l-2.22 2.21z" />
                </svg> <span> Contact</span>
              </router-link>

              <router-link :to="{ path: '/help', query: { from: 'homelogged' } }"
                class="flex gap-2 px-3 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 hover:text-[#0073b1] transition"
                @click="closeMenu">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="currentcolor">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM12.75 15V16.5H11.25V15H12.75ZM10.5 10.4318C10.5 9.66263 11.1497 9 12 9C12.8503 9 13.5 9.66263 13.5 10.4318C13.5 10.739 13.3151 11.1031 12.9076 11.5159C12.5126 11.9161 12.0104 12.2593 11.5928 12.5292L11.25 12.7509V14.25H12.75V13.5623C13.1312 13.303 13.5828 12.9671 13.9752 12.5696C14.4818 12.0564 15 11.3296 15 10.4318C15 8.79103 13.6349 7.5 12 7.5C10.3651 7.5 9 8.79103 9 10.4318H10.5Z"
                    fill="#080341" />
                </svg> <span>Help</span>
              </router-link>
            </div>

            <!-- Logout -->
            <div>
              <button @click="showLogoutModal = true" class="btn-red">Logout</button>
            </div>
            <!-- Logout Modal -->
            <transition name="fade-zoom">
              <div v-if="showLogoutModal"
                class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div class="bg-white p-6 rounded-xl shadow-xl w-80">
                  <h2 class="text-lg font-semibold mb-2">Confirm Logout</h2>
                  <p class="text-gray-600 mb-4">Are you sure you want to logout?</p>
                  <div class="flex justify-end space-x-3">
                    <button @click="showLogoutModal = false" class="btn-gray">Cancel</button>
                    <button @click="confirmLogout" class="btn-red">Logout</button>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </transition>
    </header>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from 'vue-router';
import { auth, logoutUser } from "@/stores/auth";
import API from "@/api";
const props = defineProps({
  mode: { type: String, default: 'default' } // 'default' or 'homelogged'
});
const user = ref(null);
const isOpen = ref(false);
const defaultAvatar = "/assets/user.png";
 const router = useRouter();
 const socket = ref(null);
const route = useRoute();
const showLogoutModal = ref(false)
const closeMenu = () => { isOpen.value = false; }

// Fallback for API.getImageUrl
const getImageUrl = (path) => API?.getImageUrl ? API.getImageUrl(path) : path;
// Fetch logged-in user profile
const fetchUserProfile = async () => {
  try {
    const { data } = await API.get('/user/profile');
    user.value = data;
  } catch (error) {
    console.error('❌ Failed to fetch user profile:', error);
  }
};
// Determine which button to show
const showButton = computed(() => {
  const homePages = ["/about", "/contact", "/help"];
  if (homePages.includes(route.path)) return "home";
  if (!auth?.isLoggedIn) return "login";
  return "profile";
});
// --- Logout ---
const logout = () => { logoutUser(); user.value = { name: '', email: '', phone: '', bio: '', profilePic: '' }; socket.value?.disconnect?.(); router.push('/homeboard'); };
const confirmLogout = () => { logout(); showLogoutModal.value = false; };
onMounted(() =>{
    fetchUserProfile();
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
