<template>
  <div class="min-h-screen bg-[#F0F9FF] text-gray-800">
    
    <header class="fixed top-0 left-0 right-0 z-50 bg-white shadow-md h-20 flex items-center">
      <div class="max-w-screen-lg mx-auto px-4 flex justify-between items-center w-full">
        
        <div class="flex items-center space-x-2">
          <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="h-12 w-12 object-contain" />
          <h1 class="text-2xl font-bold text-[#0073b1]">SkillLink</h1>
        </div>

    
        <nav class="flex items-center space-x-4 text-base">
          <router-link to="/serviceprovider" class="text-[#0073b1] font-bold hover:underline">Home</router-link>
          <router-link to="/provider/orders" class="text-[#0073b1] font-bold hover:underline">Orders</router-link>
          <router-link to="/provider/policies" class="text-[#0073b1] font-bold hover:underline">Policies</router-link>
          <router-link to="/provider/about" class="text-[#0073b1] font-bold hover:underline">About</router-link>
          <router-link to="/provider/contact" class="text-[#0073b1] font-bold hover:underline">Contact</router-link>

          <router-link to="/profile">
            <img v-if="user && user.profilePic"
              :src="`http://localhost:5000/uploads/${user.profilePic}`"
              alt="User DP"
              class="w-10 h-10 rounded-full object-cover border-2 border-[#0073b1] cursor-pointer" />
            <img v-else
              src="@/assets/user.png"
              alt="Default User DP"
              class="w-10 h-10 rounded-full object-cover border-2 border-[#0073b1] cursor-pointer" />
          </router-link>
        </nav>
      </div>
    </header>

    <main class="pt-32 max-w-5xl mx-auto px-4">
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-3xl font-bold text-[#0073b1] mb-4 text-center">Policies</h2>
        <p class="text-gray-700 mb-4">
          Below are the service policies that providers and users must follow to ensure a smooth experience:
        </p>

        <ul class="space-y-4 text-gray-700">
          <li>
            <h3 class="font-semibold text-lg text-[#0073b1]">1. Service Timeliness</h3>
            <p>Providers must reach the service location on time. If delayed, inform the user in advance.</p>
          </li>
          <li>
            <h3 class="font-semibold text-lg text-[#0073b1]">2. Cancellations</h3>
            <p>Cancellations must be made at least 2 hours before the scheduled time to avoid penalties.</p>
          </li>
          <li>
            <h3 class="font-semibold text-lg text-[#0073b1]">3. Service Quality</h3>
            <p>Ensure that service is done professionally, using the proper tools and methods agreed upon.</p>
          </li>
          <li>
            <h3 class="font-semibold text-lg text-[#0073b1]">4. Payment Policy</h3>
            <p>Payments are processed after service completion. Any dispute must be raised within 24 hours.</p>
          </li>
          <li>
            <h3 class="font-semibold text-lg text-[#0073b1]">5. Safety & Conduct</h3>
            <p>Respect the customer’s property. Any misconduct or inappropriate behavior will result in a ban.</p>
          </li>
        </ul>
      </div>
       <!-- Important Notes -->
      <div class="mt-8 bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold text-yellow-700 mb-2 text-center">Important Notes</h3>
        <ul class="list-disc pl-5 text-yellow-800 space-y-1">
          <li>Keep your profile and contact details updated.</li>
          <li>Maintain transparency and clear communication with clients.</li>
          <li>Report any suspicious or fraudulent activity immediately.</li>
          <li>Ensure you follow SkillLink’s safety guidelines and hygiene protocols.</li>
        </ul>
      </div>
    </main>
     <!-- Footer -->
    <footer class="text-center py-6 text-sm text-gray-500 mt-10">
      © 2025 SkillLink Provider Portal. All rights reserved.
    </footer>
  </div>
</template>

<script>
export default {
  name: 'PoliciesPage',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')) || null
    };
  }
};
</script>

<style scoped>
</style>
