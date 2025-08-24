<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <header
      class="sticky top-0 z-50 w-full backdrop-blur-md bg-gradient-to-r from-white via-[#f1faff] to-[#f5fafe] shadow-md">
      <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        <!-- Logo -->
        <div class="flex items-center gap-2">
          <img src="@/assets/skilllogo.png" alt="SkillLink Logo"
            class="w-10 h-10 sm:w-12 sm:h-12 transition-transform hover:rotate-12" loading="lazy" />
          <h1 class="text-xl sm:text-2xl font-bold text-[#0073b1]">SkillLink</h1>
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
        <button class="sm:hidden flex flex-col gap-1 focus:outline-none" @click="isOpen = !isOpen">
          <span :class="{ 'rotate-45 translate-y-1.5': isOpen }"
            class="block w-6 h-0.5 bg-gray-800 transition-transform"></span>
          <span :class="{ 'opacity-0': isOpen }" class="block w-6 h-0.5 bg-gray-800 transition-opacity"></span>
          <span :class="{ '-rotate-45 -translate-y-1.5': isOpen }"
            class="block w-6 h-0.5 bg-gray-800 transition-transform"></span>
        </button>

      </div>


      <!-- Mobile Drawer -->
      <transition enter-active-class="transition-transform duration-300 ease-out" enter-from-class="translate-x-full"
        enter-to-class="translate-x-0" leave-active-class="transition-transform duration-300 ease-in"
        leave-from-class="translate-x-0" leave-to-class="translate-x-full">
        <div v-if="isOpen" class="fixed inset-0 z-50 bg-white flex flex-col">
          <!-- Overlay -->
          <transition enter-active-class="transition-opacity duration-300 ease-out" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition-opacity duration-300 ease-in"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="isOpen" class="flex-1 bg-black bg-opacity-40" @click="closeMenu"></div>
          </transition>

          <div class="w-64 h-full bg-white shadow-lg flex flex-col px-6 py-6 space-y-6 relative">
            <!-- Close Button -->
            <button class="absolute top-4 right-4 text-gray-600 hover:text-[#0073b1] transition" @click="closeMenu">
              <!-- Close Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Nav Links -->
            <router-link to="/about" class="text-lg font-semibold text-gray-600 hover:text-[#0073b1]"
              @click="closeMenu">About Us</router-link>
            <router-link to="/contact" class="text-lg font-semibold text-gray-600 hover:text-[#0073b1]"
              @click="closeMenu">Contact</router-link>
            <router-link :to="{ path: '/help', query: { from: 'homelogged' } }"
              class="text-lg font-semibold text-gray-600 hover:text-[#0073b1]" @click="closeMenu">Help</router-link>
            <router-link to="/notifications" class="text-lg font-semibold text-gray-600 hover:text-[#0073b1]"
              @click="closeMenu">Notifications</router-link>
            <router-link to="/profile" class="text-lg font-semibold text-gray-600 hover:text-[#0073b1]"
              @click="closeMenu">Profile</router-link>
          </div>
        </div>
      </transition>

    </header>

    <!-- Hero Section -->
    <section class="text-center py-10 px-4 bg-gradient-to-br from-blue-100 to-white">
      <div class="max-w-[1300px] mx-auto">
        <h2
          class="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#3B8D99] to-[#f46675] bg-clip-text text-transparent mb-4">
          Connecting You to Trusted Local Experts
        </h2>
        <p class="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
          Book skilled professionals like plumbers, electricians, makeup artists, and more — all in one platform.
        </p>
      </div>
    </section>

    <!-- Services Section -->
    <section class="bg-white py-12 px-4">
      <div class="max-w-[1300px] mx-auto">
        <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center">Services We Provide</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6"> <router-link
            v-for="service in services" :key="service" :to="{ path: '/booking', query: { service: service } }"
            class="bg-[#0073b1] text-white p-4 rounded-lg shadow text-center font-semibold transform hover:scale-105 hover:shadow-lg transition duration-300">
            {{ service }} </router-link> </div>
      </div>
    </section>

    <!-- Solved Cases Section -->
    <section class="bg-blue-50 py-12 px-4">
      <div class="max-w-[1300px] mx-auto">
        <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center">
          Some Cases We've Solved
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div v-for="caseItem in solvedCases" :key="caseItem.title"
            class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <div class="w-full h-auto bg-gray-100 overflow-hidden">
              <img :src="caseItem.image" :alt="caseItem.title" class="w-full h-full object-cover object-top"
                loading="lazy" />
            </div>
            <div class="p-4 flex-1">
              <h4 class="text-lg font-bold text-[#0073b1] mb-2">{{ caseItem.title }}</h4>
              <p class="text-gray-700 text-sm">{{ caseItem.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- About Section -->
    <section class="relative py-20 px-4 bg-gradient-to-br from-[#F0F9FF] via-white to-[#E6F4F9] overflow-hidden">
      <!-- SVG Background -->
      <div class="absolute inset-0 z-0 pointer-events-none">
        <svg class="absolute top-0 left-0 opacity-20 w-[600px]" viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="300" fill="#0073b1" fill-opacity="0.05" />
        </svg>
        <svg class="absolute bottom-0 right-0 opacity-10 w-[400px]" viewBox="0 0 400 400" fill="none">
          <rect x="0" y="0" width="400" height="400" fill="#00BFFF" fill-opacity="0.04" rx="80" />
        </svg>
      </div>

      <div class="relative z-10 max-w-screen-xl mx-auto text-center" data-aos="fade-up">
        <h3 class="text-4xl font-extrabold text-[#0073b1] mb-6">About SkillLink</h3>
        <p class="max-w-3xl mx-auto text-gray-700 leading-relaxed text-lg sm:text-xl mb-10">
          SkillLink is your trusted platform to connect with skilled professionals across a wide range of services.
          Whether it's urgent home repairs or lifestyle services — we bring verified experts right to your doorstep.
        </p>

        <!-- Services Grid -->
        <div class="bg-white shadow-xl rounded-xl p-8 mt-6" data-aos="fade-up" data-aos-delay="100">
          <h4 class="text-2xl font-semibold text-[#0073b1] mb-6">Our Available Services</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left text-gray-800 text-base">
            <ul class="space-y-3">
              <li><i class="fas fa-tools text-[#0073b1] mr-2"></i>Plumber</li>
              <li><i class="fas fa-bolt text-[#0073b1] mr-2"></i>Electrician</li>
              <li><i class="fas fa-car text-[#0073b1] mr-2"></i>Mechanic</li>
              <li><i class="fas fa-hammer text-[#0073b1] mr-2"></i>Carpenter</li>
              <li><i class="fas fa-wind text-[#0073b1] mr-2"></i>AC Repair</li>
              <li><i class="fas fa-paint-roller text-[#0073b1] mr-2"></i>Painter</li>
            </ul>
            <ul class="space-y-3">
              <li><i class="fas fa-wrench text-[#0073b1] mr-2"></i>Welder</li>
              <li><i class="fas fa-magic text-[#0073b1] mr-2"></i>Makeup Artist</li>
              <li><i class="fas fa-broom text-[#0073b1] mr-2"></i>Cleaner</li>
              <li><i class="fas fa-seedling text-[#0073b1] mr-2"></i>Gardener</li>
              <li><i class="fas fa-mobile-alt text-[#0073b1] mr-2"></i>Mobile Technician</li>
              <li><i class="fas fa-desktop text-[#0073b1] mr-2"></i>Computer Technician</li>
            </ul>
            <ul class="space-y-3">
              <li><i class="fas fa-cogs text-[#0073b1] mr-2"></i>Home Appliance Repair</li>
              <li><i class="fas fa-bug text-[#0073b1] mr-2"></i>Pest Control</li>
              <li><i class="fas fa-tshirt text-[#0073b1] mr-2"></i>Laundry Services</li>
              <li><i class="fas fa-water text-[#0073b1] mr-2"></i>Water Purifier Technician</li>
              <li><i class="fas fa-pencil-ruler text-[#0073b1] mr-2"></i>Interior Designer</li>
              <li><i class="fas fa-truck-moving text-[#0073b1] mr-2"></i>Packers & Movers</li>
              <li><i class="fas fa-gem text-[#0073b1] mr-2"></i>Event Decorators</li>
            </ul>
          </div>
        </div>

        <!-- Why SkillLink -->
        <div class="mt-16" data-aos="fade-up" data-aos-delay="200">
          <h4 class="text-2xl font-semibold text-[#0073b1] mb-6">Why Choose SkillLink?</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
            <div class="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition" data-aos="zoom-in">
              <h5 class="text-lg font-semibold text-gray-800 mb-2">
                <i class="fas fa-check-circle text-[#0073b1] mr-2"></i>Verified Professionals
              </h5>
              <p class="text-gray-600 text-sm">All providers are background-checked and verified for your peace of mind.
              </p>
            </div>
            <div class="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition" data-aos="zoom-in"
              data-aos-delay="100">
              <h5 class="text-lg font-semibold text-gray-800 mb-2">
                <i class="fas fa-bolt text-[#0073b1] mr-2"></i>Fast & Reliable
              </h5>
              <p class="text-gray-600 text-sm">Get prompt responses and quality service on every request.</p>
            </div>
            <div class="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition" data-aos="zoom-in"
              data-aos-delay="200">
              <h5 class="text-lg font-semibold text-gray-800 mb-2">
                <i class="fas fa-wallet text-[#0073b1] mr-2"></i>Transparent Pricing
              </h5>
              <p class="text-gray-600 text-sm">No hidden costs — know what you pay for, always.</p>
            </div>
          </div>
        </div>

        <!-- Closing Note -->
        <p class="max-w-3xl mx-auto text-gray-700 leading-relaxed text-lg sm:text-xl mt-14" data-aos="fade-up"
          data-aos-delay="300">
          With SkillLink, expert help is just a few taps away — fast, safe, and reliable. Join thousands of happy users
          today.
        </p>
      </div>
    </section>
    <!-- Service Area Map Section -->
    <section class="py-12 bg-blue-50 px-4">
      <div class="max-w-screen-xl mx-auto text-center">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Service Coverage Area</h2>
        <ServiceMap />
      </div>
    </section>
    <!-- Contact Section -->
    <section class="bg-blue-50 py-4 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Title -->
        <h3 class="text-2xl font-bold text-gray-800 mb-4">Contact Us</h3>
        <p class="text-gray-600 mb-8">
          Need help? Reach out to our team quickly and easily.
        </p>

        <!-- Contact Info Row -->
        <div class="flex flex-col sm:flex-row justify-center gap-6 mb-6">
          <!-- Email -->
          <div class="flex items-center gap-2 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#0073b1]" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 12H8m0 0l4-4m0 8l-4-4m12-4v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h12a2 2 0 012 2z" />
            </svg>
            <a href="mailto:connectteamskilllink@gmail.com" class="hover:underline">
              connectteamskilllink@gmail.com
            </a>
          </div>

          <!-- Phone -->
          <div class="flex items-center gap-2 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#0073b1]" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 5a2 2 0 012-2h2l1 5-1 1c.5.5 2.5 2.5 3 3l1-1 5 1v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
            </svg>
            <span>+91-9876543210</span>
          </div>

          <!-- Hours -->
          <div class="flex items-center gap-2 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#0073b1]" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Mon – Sat, 9 AM – 7 PM</span>
          </div>
        </div>

        <!-- Call to Action -->
        <router-link to="/contact"
          class="inline-block bg-[#0073b1] text-white font-semibold px-6 py-2 rounded hover:bg-[#005f91] transition">
          Send a Message
        </router-link>
      </div>
    </section>
    <!-- Footer -->
    <footer class="bg-[#ecf0f4] text-gray-600 border-t">
      <div class="max-w-6xl mx-auto px-6 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        <!-- Logo & Tagline -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-10 h-10" />
            <span class="text-xl font-extrabold text-[#0073b1]">SkillLink</span>
          </div>
          <p class="text-sm leading-relaxed">
            Connecting skilled professionals with customers quickly, easily, and reliably.
          </p>

          <!-- Socials -->
          <div class="flex items-center gap-4 pt-2">
            <a href="#" class="hover:text-[#00A8E8] transition-colors">
              <!-- Twitter -->
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M22.46 6c-.77.35-1.6.59-2.46.69a4.26 4.26 0 001.88-2.36 8.5 8.5 0 01-2.7 1.03 4.24 4.24 0 00-7.23 3.86A12.04 12.04 0 013.9 4.78a4.24 4.24 0 001.31 5.66A4.2 4.2 0 014 10.9v.05a4.24 4.24 0 003.39 4.15c-.8.21-1.61.25-2.39.1a4.24 4.24 0 003.96 2.95A8.5 8.5 0 012 19.54 12 12 0 008.29 21.4c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.34 8.34 0 0024 4.56a8.19 8.19 0 01-2.36.65A4.18 4.18 0 0022.46 6z" />
              </svg>
            </a>
            <a href="#" class="hover:text-[#00A8E8] transition-colors">
              <!-- Facebook -->
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h10.96v-9.33H9.69V11h2.99V8.41c0-2.96 1.8-4.57 4.44-4.57 1.26 0 2.34.09 2.66.13v3.08h-1.83c-1.44 0-1.72.68-1.72 1.68V11h3.44l-.45 3.67h-2.99V24h5.88c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
              </svg>
            </a>
            <a href="#" class="hover:text-[#00A8E8] transition-colors">
              <!-- GitHub -->
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2.04c-5.52 0-10 4.48-10 10 0 4.42 2.87 8.18 6.84 9.51.5.09.68-.22.68-.48v-1.69c-2.78.61-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.64-1.33-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.57 9.57 0 0112 6.8c.85 0 1.71.11 2.51.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.91.68 1.84v2.73c0 .26.18.57.69.48A10 10 0 0022 12.04c0-5.52-4.48-10-10-10z" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-3">
          <h3 class="text-base font-bold text-gray-800">Quick Links</h3>
          <router-link to="/about" class="flex items-center gap-2 hover:text-[#00A8E8] transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>About Us</span>
          </router-link>
          <router-link to="/home" class="flex items-center gap-2 hover:text-[#00A8E8] transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
            </svg>
            <span>Services</span>
          </router-link>
          <router-link to="/help" class="flex items-center gap-2 hover:text-[#00A8E8] transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 18h.01M12 6a9 9 0 100 18 9 9 0 000-18zm0 4v4" />
            </svg>
            <span>FAQ</span>
          </router-link>
        </div>

        <!-- Support -->
        <div class="space-y-3 flex flex-col">
          <h3 class="text-base font-bold text-gray-800">Support</h3>

          <!-- Contact Us -->
          <router-link to="/contact" class="flex items-center gap-2 hover:text-[#00A8E8] transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75zm2.334-.75L12 11.327 19.416 6h-14.832zm15.166 1.635-7.731 5.154a.75.75 0 0 1-.838 0L3.45 7.635v9.615c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75V7.635z" />
            </svg>
            <span>Contact Us</span>
          </router-link>


          <!-- Privacy Policy -->
          <router-link to="/privacy" class="flex items-center gap-2 hover:text-[#00A8E8] transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1l9 4v6c0 5-3.6 9.7-9 11-5.4-1.3-9-6-9-11V5l9-4zM7 9v2h10V9H7z" />
            </svg>
            <span>Privacy Policy</span>
          </router-link>

          <!-- Terms & Conditions -->
          <router-link to="/terms" class="flex items-center gap-2 hover:text-[#00A8E8] transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"
              aria-hidden="true">
              <!-- finial + crossbar -->
              <path
                d="M11 2a1 1 0 0 1 2 0v2h3a1 1 0 1 1 0 2h-1.6l3.86 7A3.75 3.75 0 1 1 14.5 16h-.5V7h-4v9h-.5A3.75 3.75 0 1 1 4.74 13l3.86-7H7A1 1 0 1 1 7 4h4V2zM7.2 9.2 5 13h4L7.2 9.2zm11.8 3.8h-4l2.2-3.8 1.8 3.8z" />
              <!-- base -->
              <path d="M10 19h4v2h-4z" />
            </svg>
            <span>Terms & Conditions</span>
          </router-link>
        </div>

        <!-- Reach Us -->
        <div class="space-y-3">
          <h3 class="text-base font-bold text-gray-800">Reach Us</h3>
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 11c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3 1.344 3 3 3zM12 2C8.686 2 6 5.686 6 11c0 5.313 6 11 6 11s6-5.687 6-11c0-5.314-2.686-9-6-9z" />
            </svg>
            <span>Sector 41, Gurugram</span>
          </div>
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75zm2.334-.75L12 11.327 19.416 6h-14.832zm15.166 1.635-7.731 5.154a.75.75 0 0 1-.838 0L3.45 7.635v9.615c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75V7.635z" />
            </svg>
            <a href="mailto:connectteamskilllink@gmail.com" class="hover:underline">connectteamskilllink@gmail.com</a>
          </div>
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.05 11.05 0 003.47.55 1 1 0 011 1V20a1 1 0 01-1 1C10.42 21 3 13.58 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.2.19 2.38.55 3.47a1 1 0 01-.21 1.11l-2.22 2.21z" />
            </svg>

            <span>+91 98765 43210</span>
          </div>
        </div>
      </div>
      <!--Bottom Bar-->
      <div class="border-t border-gray-200 mt-6 py-4 text-center text-sm text-gray-500">
        © 2025 <span
          class="font-semibold bg-gradient-to-r from-[#00A8E8] to-[#007EA7] bg-clip-text text-transparent">SkillLink</span>.
        All rights reserved.
      </div>

    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import API from '@/api';
import ServiceMap from '@/components/ServiceMap.vue';

// Reactive state
const user = ref(null);
const unreadCount = ref(0);
const isOpen = ref(false);
// Fetch unread notifications
const fetchUnreadCount = async () => {
  try {
    const response = await API.get('/notifications/unread-count');
    unreadCount.value = response.data.count;
  } catch (error) {
    console.error('❌ Failed to fetch unread count:', error);
  }
};

// Fetch logged-in user profile
const fetchUserProfile = async () => {
  try {
    const { data } = await API.get('/user/profile');
    user.value = data;
  } catch (error) {
    console.error('❌ Failed to fetch user profile:', error);
  }
};

const closeMenu = () => {
  isOpen.value = false;
};

// Lifecycle hook
onMounted(() => {
  fetchUserProfile();
  fetchUnreadCount();
});

// Services list
const services = [
  'Plumber', 'Electrician', 'Mechanic', 'Carpenter',
  'AC Repair', 'Painter', 'Welder', 'Makeup Artist'
];

// Solved cases (static images)
const solvedCases = [
  {
    title: 'Leaking Pipe Fixed',
    image: require('@/assets/plumber.jpeg'),
    description: '"Emergency plumbing at night! SkillLink saved the day." – Rajesh, Delhi'
  },
  {
    title: 'Wiring Issue Resolved',
    image: require('@/assets/electician.jpg'),
    description: '"The electrician came on time and solved everything!" – Priya, Mumbai'
  },
  {
    title: 'Wedding Makeup Expert',
    image: require('@/assets/makeup.webp'),
    description: '"Booked for a wedding. Amazing experience!" – Sneha, Jaipur'
  }
];
</script>
