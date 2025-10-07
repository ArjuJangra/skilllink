<template>
  <div class="min-h-screen flex flex-col bg-gray-100 relative">

    <!-- Navbar fixed at top -->
    <div class="w-full fixed top-0 left-0 z-50">
      <AppNavbar />
    </div>

    <!-- Login Card Centered -->
    <div class="flex flex-1 items-center justify-center pt-20 pb-1 px-4">
      <transition name="fade">
        <div v-if="!showSplash" class="w-full max-w-sm bg-white p-8 rounded-2xl shadow-md z-10">
          <div class="flex justify-center mb-6">
            <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-24 rounded-lg" />
          </div>

          <h2
            class="text-center text-2xl font-bold bg-gradient-to-r from-[#3B8D99] to-[#f46675] bg-clip-text text-transparent mb-6">
            Welcome Back to SkillLink
          </h2>

          <!-- Login Form -->
          <form @submit.prevent="handleLogin" class="space-y-4">

            <!-- Email or Phone Input -->
            <input v-model="loginForm.contact" type="text" placeholder="Email or 10-digit phone" required
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition" />

            <div class="relative">
              <input :type="showPassword ? 'text' : 'password'" v-model="loginForm.password" placeholder="Password"
                required
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
            <p class="text-center text-gray-500 text-sm mt-4"> Don’t have an account? <router-link to="/signup" class="text-[#0073b1] font-medium hover:underline">Sign up</router-link> </p>

          </form>

        </div>
      </transition>
    </div>

    <!-- Splash Screen -->
    <transition name="overlay-fade">
      <div v-if="showSplash" class="absolute inset-0 flex flex-col items-center justify-center bg-white z-50">
        <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-32 mb-4 animate-scale-bounce" />
        <p class="text-gray-700 font-medium text-lg animate-pulse">Loading...</p>
      </div>
    </transition>

  </div>
</template>

<script setup>

import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import API from '@/api';
import { auth, loginUser } from '@/stores/auth';
import { toast } from 'vue3-toastify';
import AppNavbar from '@/components/AppNavbar.vue';

//import jwt_decode from 'jwt-decode';

const router = useRouter();
const loginForm = reactive({ contact: '', password: '', role: 'user', remember: false });
const showPassword = ref(false);
const loading = ref(false);
const errorMessage = ref('');
const showSplash = ref(false);

// Normal Email/Password Login
const handleLogin = async () => {
  errorMessage.value = '';
  loading.value = true;
  const isEmail = (value) => /\S+@\S+\.\S+/.test(value);
  const isPhone = (value) => /^[0-9]{10}$/.test(value);

  if (!isEmail(loginForm.contact) && !isPhone(loginForm.contact)) {
    errorMessage.value = 'Enter a valid email or 10-digit phone number.';
    loading.value = false;
    return;
  }

  try {
    const payload = {
      role: loginForm.role,
      password: loginForm.password,
      ...(isEmail(loginForm.contact) ? { email: loginForm.contact } : { phone: loginForm.contact })
    };

    const res = await API.post('/auth/login', payload);

    const { token, user } = res.data;

    loginUser(token, user);
    auth.isLoggedIn = true;
    auth.user = {
      ...user,
      avatar: user.profilePic
        ? `${API.defaults.baseURL}/uploads/${user.profilePic}`
        : require('@/assets/user.png'),
    };

    localStorage.setItem('token', token);
    localStorage.setItem('userId', user._id);
    localStorage.setItem('user', JSON.stringify(user));

    showSplash.value = true;
    setTimeout(() => {
      showSplash.value = false;
      router.push(user.role === 'provider' ? '/ServiceProvider' : '/homelogged');
    }, 1500);

  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Login failed.';
    toast.error(`❌ ${errorMessage.value}`, { autoClose: 3000 });
  } finally {
    loading.value = false;
  }
};


</script>

<style scoped>
/* Removed invalid JavaScript from CSS block */

/* Fade for overlay */
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Logo bounce-scale animation */
@keyframes scale-bounce {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
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

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>