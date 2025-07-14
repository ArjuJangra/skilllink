<template>
  <div class="min-h-screen flex items-center justify-center bg-[#f4f6f8] px-4">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
      <div class="text-center mb-6">
        <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-20 mx-auto mb-4" />
        <h2 class="text-2xl font-bold text-[#0073b1]">Welcome Back to SkillLink</h2>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <!-- Email -->
        <div>
          <label class="block text-sm font-semibold text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0073b1]"
            placeholder="Enter your email"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-semibold text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0073b1]"
            placeholder="Enter your password"
          />
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full mt-2 bg-[#0073b1] text-white py-2 rounded-lg hover:bg-[#005f91] transition duration-200"
        >
          Login
        </button>

        <!-- Signup Link -->
        <div class="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?
          <router-link to="/signup" class="text-[#0073b1] font-medium hover:underline">Sign up</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '@/stores/auth';

const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = () => {
  // ✅ Dummy validation — replace with real backend check
  if (email.value === 'user@example.com' && password.value === '1234') {
    auth.isLoggedIn = true;
    auth.user.name = 'Arju';
    auth.user.avatar = require('@/assets/user.png');

    router.push('/homelogged');
  } else {
    alert('Invalid credentials!');
  }
};
</script>
