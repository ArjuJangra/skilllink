<template>
  <div class="h-screen bg-[#F6F9FC] overflow-hidden">
    <!-- Fixed Header -->
    <AppNavbar />

    <!-- Hero Section -->
    <section class="relative bg-[#F6F9FC] pt-32 pb-16">
      <div class="max-w-[1120px] mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <!-- Left Content -->
        <div>
          <h1 class="text-4xl font-bold text-gray-900 leading-tight mb-4">
            Find Trusted Helpers <br />
            Anytime, Anywhere
          </h1>
          <p class="text-gray-600 text-lg mb-6">
            Connect with skilled professionals near you for quick and reliable services.
          </p>
          <div class="flex space-x-4">
            <button
              class="bg-[#0073b1] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#005582] transition"
            >
              Get Started
            </button>
            <button
              class="border border-[#0073b1] text-[#0073b1] px-6 py-3 rounded-lg hover:bg-[#0073b1] hover:text-white transition"
            >
              Learn More
            </button>
          </div>
        </div>

        <!-- Right Image -->
        <div class="relative">
          <img
            src="https://img.freepik.com/free-vector/online-service-concept-illustration_114360-7969.jpg"
            alt="Helpers"
            class="w-full rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="bg-white py-16">
      <div class="max-w-[1120px] mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          Our Popular Services
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Card 1 -->
          <div
            class="bg-[#F6F9FC] p-6 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <img
              src="https://img.icons8.com/color/96/000000/plumber.png"
              alt="Plumber"
              class="w-20 mx-auto mb-4"
            />
            <h3 class="text-xl font-semibold text-center mb-2">Plumbing</h3>
            <p class="text-gray-600 text-center">
              Fix leaks, install fixtures, and solve all plumbing issues.
            </p>
          </div>

          <!-- Card 2 -->
          <div
            class="bg-[#F6F9FC] p-6 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <img
              src="https://img.icons8.com/color/96/000000/maintenance.png"
              alt="Mechanic"
              class="w-20 mx-auto mb-4"
            />
            <h3 class="text-xl font-semibold text-center mb-2">Mechanic</h3>
            <p class="text-gray-600 text-center">
              Car, bike, or any vehicle repair with expert mechanics.
            </p>
          </div>

          <!-- Card 3 -->
          <div
            class="bg-[#F6F9FC] p-6 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <img
              src="https://img.icons8.com/color/96/000000/hammer.png"
              alt="Carpenter"
              class="w-20 mx-auto mb-4"
            />
            <h3 class="text-xl font-semibold text-center mb-2">Carpentry</h3>
            <p class="text-gray-600 text-center">
              Furniture repair, woodwork, and custom designs at your doorstep.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-[#0073b1] text-white py-6 mt-16">
      <div
        class="max-w-[1120px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center"
      >
        <p>&copy; 2025 SkillLink. All rights reserved.</p>
        <div class="flex space-x-4 mt-4 md:mt-0">
          <a href="#" class="hover:underline">Privacy Policy</a>
          <a href="#" class="hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import AppNavbar from "./AppNavbar.vue";


export default {
  name: "HomeBoard",
  components: {
    AppNavbar,
  },
};
</script>
