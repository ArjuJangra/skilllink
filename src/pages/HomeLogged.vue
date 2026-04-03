<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <header class="bg-white shadow sticky top-0 z-50">
      <AppNavbar mode="homelogged" />
    </header>

    <!--Hero -->
    <section class="max-w-screen-xl relative h-[500px] flex items-center overflow-hidden bg-gray-900 mt-[-1px]">

      <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80"
        class="absolute inset-0 w-full h-full object-cover opacity-60" />
      <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-2xl space-y-5">
          <span
            class="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold tracking-widest uppercase rounded">
            Trusted by 10k+ Households
          </span>
          <h1 class="text-4xl md:text-6xl font-black text-white leading-tight">
            Connecting You to <br /> <span class="text-[#00A8E8]">Trusted Local Experts</span>
          </h1>
          <p class="text-gray-300 text-lg max-w-md">
            Verified experts for home repairs, lifestyle services, and technical tasks — fast, safe, and reliable.
          </p>
          <div class="flex gap-4">
            <router-link to="/home"
              class="inline-block px-8 py-3 font-semibold text-[#0073b1] rounded-lg border-2 border-[#0073b1] hover:bg-[#0073b1] hover:text-white transition duration-300">
              Explore Services
            </router-link>

          </div>
        </div>
      </div>
    </section>

    <ServicesSection />
    <PromoBanner />
    <BestDeals @book="goToBooking" />
    <TestimonialsSection />
    <AboutSection />

    <section class="py-16 px-6 bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col lg:flex-row gap-12 items-center">

          <div class="w-full lg:w-5/12 space-y-6" data-aos="fade-right">
            <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest">
              <span class="relative flex h-2 w-2">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Live Network Status
            </div>

            <h2 class="text-4xl font-black text-gray-900 leading-tight">
              Hyper-Local Experts <br />
              <span class="text-[#00A8E8]">Within 50km of You</span>
            </h2>

            <p class="text-gray-600 text-lg leading-relaxed">
              Our smart-radius technology ensures you only see professionals who can actually reach you. By limiting
              results to a 50km range, we guarantee faster arrival times and reliable service.
            </p>

            <div class="grid grid-cols-1 gap-4 pt-4">
              <div
                class="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-200 transition">
                <div class="w-12 h-12 bg-white shadow-sm rounded-xl flex items-center justify-center text-blue-600">
                  <i class="fas fa-location-arrow"></i>
                </div>
                <div>
                  <p class="font-bold text-gray-800">Precision Sourcing</p>
                  <p class="text-sm text-gray-500">Real-time GPS provider matching.</p>
                </div>
              </div>
              <div
                class="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-200 transition">
                <div class="w-12 h-12 bg-white shadow-sm rounded-xl flex items-center justify-center text-green-600">
                  <i class="fas fa-bolt"></i>
                </div>
                <div>
                  <p class="font-bold text-gray-800">Instant Connectivity</p>
                  <p class="text-sm text-gray-500">Average arrival under 60 minutes.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full lg:w-7/12 relative" data-aos="fade-left">
            <div class="absolute -top-10 -right-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60"></div>

            <div class="relative p-3 bg-gray-100 rounded-[2.5rem] shadow-inner border border-gray-200">
              <div class="bg-white rounded-[2rem] overflow-hidden shadow-2xl h-[450px] relative border border-gray-200">

                <ServiceMap class="w-full h-full" />

                <div
                  class="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-blue-100 flex items-center gap-2">
                  <div class="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></div>
                  <span class="text-xs font-bold text-gray-700 tracking-wide uppercase">Active Radius: 50km</span>
                </div>

                <div
                  class="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-2xl flex items-center justify-between border border-gray-100">
                  <div class="flex items-center gap-4">
                    <div
                      class="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-black/20">
                      <i class="fas fa-street-view text-lg"></i>
                    </div>
                    <div>
                      <p class="text-[10px] uppercase text-blue-600 font-black tracking-tighter">Current Hub</p>
                      <p class="text-base font-bold text-gray-800">Greater Noida, India</p>
                    </div>
                  </div>
                  <div class="text-right border-l pl-6 border-gray-100">
                    <p class="text-xl font-black text-gray-900">150+</p>
                    <p class="text-[10px] font-bold text-gray-400 uppercase">Experts Nearby</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!--Contact-->
    <section class=" py-6 px-6">
      <div class="max-w-4xl mx-auto text-center" data-aos="fade-up">
        <!-- Title -->
        <h3 class="text-3xl font-bold text-gray-800 mb-4">Contact Us</h3>
        <p class="text-gray-600 mb-10 text-lg">
          Need help? Reach out to our support team — we’re here to assist you.
        </p>

        <!-- Contact Info Cards -->
        <div class="flex flex-col sm:flex-row justify-center items-stretch gap-6 mb-10">
          <!-- Email -->
          <div
            class="flex-1 bg-white shadow-md rounded-xl p-5 flex items-center gap-3 text-gray-700 hover:shadow-lg transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" viewBox="0 0 24 24"
              fill="currentColor">
              <path
                d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75zm2.334-.75L12 11.327 19.416 6h-14.832z" />
            </svg>
            <a href="mailto:connectteamskilllink@gmail.com" class="font-medium hover:text-blue-600 transition">
              connectteamskilllink@gmail.com
            </a>
          </div>

          <!-- Phone -->
          <div
            class="flex-1 bg-white shadow-md rounded-xl p-5 flex items-center gap-3 text-gray-700 hover:shadow-lg transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-600" viewBox="0 0 24 24"
              fill="currentColor">
              <path
                d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.05 11.05 0 003.47.55 1 1 0 011 1V20a1 1 0 01-1 1C10.42 21 3 13.58 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.2.19 2.38.55 3.47a1 1 0 01-.21 1.11l-2.22 2.21z" />
            </svg>
            <span class="font-medium">+91-7404227877</span>
          </div>

          <!-- Hours -->
          <div
            class="flex-1 bg-white shadow-md rounded-xl p-5 flex items-center gap-3 text-gray-700 hover:shadow-lg transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-700" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="font-medium">Mon – Sat, 9 AM – 7 PM</span>
          </div>
        </div>

        <!-- CTA -->
        <router-link to="/contact"
          class="inline-block bg-gradient-to-r from-[#00A8E8] to-[#007EA7] text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transform transition">
          Send a Message
        </router-link>
      </div>
    </section>
    <AppFooter />

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import API from '@/api';
import { databases } from '@/appwrite'; // Ensure your appwrite.js exports 'databases'
import { Query } from 'appwrite';
import ServiceMap from '@/components/ServiceMap.vue';
import AppNavbar from '@/components/AppNavbar.vue'
import BestDeals from '@/components/home/BestDeals.vue';
import PromoBanner from '@/components/home/PromoBanners.vue'
import ServicesSection from '@/components/home/ServiceSection.vue';
import TestimonialsSection from '@/components/home/TestimonialsSection.vue';
import AboutSection from '@/components/home/AboutSection.vue';
import AppFooter from '@/components/AppFooter.vue';
// Reactive state
const topServices = ref([]);
const loading = ref(true);
const socket = ref(null);
const unreadCount = ref(0);

// Fetch unread notifications
const fetchUnreadCount = async () => {
  try {
    const response = await API.get('/notifications/unread-count');
    unreadCount.value = response.data.count;
  } catch (error) {
    console.error('❌ Failed to fetch unread count:', error);
  }
};

const fetchTopServices = async () => {
  try {
    const response = await databases.listDocuments(
      '69bc1ae900174fd0a3c6', // Remove brackets
      'services',
      [
        Query.limit(4), // Get only the top 4 for the "Best Deals" grid
        Query.orderDesc('$createdAt') // Or order by a 'rating' field if you have one
      ]
    );
    // FIX 1: Use .value to assign the data to the ref
    topServices.value = response.documents;
  } catch (error) {
    console.error('Error fetching services from Appwrite:', error);
  } finally {
    // FIX 2: Use .value to update the boolean state
    loading.value = false;
  }
};

// Lifecycle hook
onMounted(() => {
  fetchTopServices();
  fetchUnreadCount();
});
onUnmounted(() => socket.value?.disconnect());

</script>
