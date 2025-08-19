<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative">

    <!-- Login Card -->
    <transition name="fade">
      <div v-if="!showSplash" class="w-full max-w-sm bg-white p-8 rounded-2xl shadow-md z-10">
        <div class="flex justify-center mb-6">
          <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-24" />
        </div>

        <h2 class="text-center text-2xl font-bold text-[#0073b1] mb-6">Welcome Back to SkillLink</h2>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <input v-model="loginForm.email" type="email" placeholder="Email" required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition" />

          <div class="relative">
            <input :type="showPassword ? 'text' : 'password'" v-model="loginForm.password" placeholder="Password" required
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition" />
            <button type="button" @click="showPassword = !showPassword"
              class="absolute right-3 top-2 text-gray-500 text-sm focus:outline-none">
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>

          <select v-model="loginForm.role"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition">
            <option value="user">User</option>
            <option value="provider">Service Provider</option>
          </select>

          <div class="flex items-center text-sm">
            <input type="checkbox" v-model="loginForm.remember" id="remember" class="mr-2" />
            <label for="remember" class="text-gray-600">Remember me</label>
          </div>

          <div v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</div>

          <button :disabled="loading" type="submit"
            class="w-full py-2 rounded-lg text-white font-semibold transition bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 disabled:opacity-50 flex justify-center items-center gap-2">
            <span>Login</span>
            <svg v-if="loading" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          </button>

          <p class="text-center text-gray-500 text-sm mt-4">
            Don’t have an account?
            <router-link to="/signup" class="text-[#0073b1] font-medium hover:underline">Sign up</router-link>
          </p>
        </form>
      </div>
    </transition>

    <!-- Splash Screen -->
    <transition name="overlay-fade">
      <div v-if="showSplash" class="absolute inset-0 flex flex-col items-center justify-center bg-white z-20">
        <img src="@/assets/skilllogo.png" alt="SkillLink Logo"
          class="w-32 mb-4 animate-scale-bounce" />
        <p class="text-gray-700 font-medium text-lg animate-pulse">Loading...</p>
      </div>
    </transition>

  </div>
</template>

<script setup>
 import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { auth, loginUser } from '@/stores/auth';
import { toast } from 'vue3-toastify';

 const router = useRouter();
const loginForm = reactive({ email: '', password: '', role: 'user', remember: false });
const showPassword = ref(false);
const loading = ref(false);
const errorMessage = ref('');
const showSplash = ref(false); // splash triggered on login

const handleLogin = async () => {
  errorMessage.value = '';
  loading.value = true;

  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', { ...loginForm });
    const { token, user } = res.data;

    loginUser(token, user);
    auth.isLoggedIn = true;
    auth.user = { ...user, avatar: user.profilePic ? `http://localhost:5000/uploads/${user.profilePic}` : require('@/assets/user.png') };

    localStorage.setItem('token', token);
    localStorage.setItem('userId', user._id);
    localStorage.setItem('user', JSON.stringify(user));

    // Show splash after clicking login
    showSplash.value = true;

    // Hide login card and show splash for 1.5s, then redirect
    setTimeout(() => {
      showSplash.value = false;
      router.push(user.role === 'provider' ? '/ServiceProvider' : '/homelogged');
    }, 1500);

  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Login failed.';
    toast.error(`❌ ${errorMessage.value}`, { className: 'toast-custom toast-error', autoClose: 3000 });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>

/* Fade for overlay */
.overlay-fade-enter-active, .overlay-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.overlay-fade-enter-from, .overlay-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Logo bounce-scale animation */
@keyframes scale-bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
.animate-scale-bounce {
  animation: scale-bounce 1s infinite;
}

/* toast.css or global styles */
.toast-custom {
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  transform-origin: top center;
  animation: toast-slide-in 0.4s ease forwards;
}

.toast-success {
  background-color: #007EA7;
  color: #fff;
}

.toast-error {
  background-color: #D9534F;
  color: #fff;
}

.toast-loading {
  background-color: #f0f8ff;
  color: #0073b1;
}

/* Animation for entry */
@keyframes toast-slide-in {
  0% {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Optional exit animation using Vue3-toastify transitions */
@keyframes toast-slide-out {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
}


.animate-pulse {
  animation: pulse 1s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>  