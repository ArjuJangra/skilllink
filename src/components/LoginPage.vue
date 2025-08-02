<template>
  <div class="min-h-screen flex items-center justify-center bg-[#f4f6f8] px-4">
    <transition name="fade" appear>
      <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <div class="text-center mb-6">
          <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-20 mx-auto mb-4" />
          <h2 class="text-2xl font-bold text-[#0073b1]">Welcome Back to SkillLink</h2>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Email -->
          <div>
            <label class="block text-sm font-semibold text-gray-700" for="email">Email</label>
            <input id="email" v-model="loginForm.email" type="email" required autofocus
              aria-label="Email address"
              class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0073b1]"
              placeholder="Enter your email" />
          </div>

          <!-- Password with toggle -->
          <div class="relative">
            <label class="block text-sm font-semibold text-gray-700" for="password">Password</label>
            <input :type="showPassword ? 'text' : 'password'" id="password"
              v-model="loginForm.password" required aria-label="Password"
              class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0073b1]"
              placeholder="Enter your password" />
            <button type="button" @click="showPassword = !showPassword"
              class="absolute right-3 top-9 text-gray-500 text-sm focus:outline-none">
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>

          <!-- Role -->
          <div>
            <label class="block text-sm font-semibold text-gray-700">Login as</label>
            <select v-model="loginForm.role" required aria-label="User role"
              class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#0073b1]">
              <option value="user">User</option>
              <option value="provider">Service Provider</option>
            </select>
          </div>

          <!-- Remember Me -->
          <div class="flex items-center">
            <input type="checkbox" v-model="loginForm.remember" id="remember"
              class="h-4 w-4 text-[#0073b1] border-gray-300 rounded" />
            <label for="remember" class="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="text-red-600 text-sm">
            {{ errorMessage }}
          </div>

          <!-- Submit -->
          <button :disabled="loading" type="submit"
            class="w-full mt-2 flex justify-center items-center gap-2 bg-[#0073b1] text-white py-2 rounded-lg hover:bg-[#005f91] transition duration-200 disabled:opacity-50">
            <span>Login</span>
            <svg v-if="loading" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          </button>

          <!-- Signup Link -->
          <div class="text-center mt-4 text-sm text-gray-600">
            Don’t have an account?
            <router-link to="/signup" class="text-[#0073b1] font-medium hover:underline">Sign up</router-link>
          </div>
        </form>
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

const loginForm = reactive({
  email: '',
  password: '',
  role: 'user',
  remember: false
});

const showPassword = ref(false);
const loading = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
  errorMessage.value = '';
  const toastId = toast.loading("Logging in...", {
    position: 'top-center',
    theme: 'light',
    style: {
      fontSize: '15px',
      borderRadius: '50px',
      background: '#f0f8ff',
      color: '#0073b1',
    }
  });

  loading.value = true;
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email: loginForm.email,
      password: loginForm.password,
      role: loginForm.role,
      remember: loginForm.remember
    });

    const { token, user } = res.data;

    loginUser(token, user);
    auth.isLoggedIn = true;
    auth.user.name = user.name;
    auth.user.email = user.email;
    auth.user.role = user.role;
    auth.user.avatar = user.profilePic
      ? `http://localhost:5000/uploads/${user.profilePic}`
      : require('@/assets/user.png');

    localStorage.setItem('token', token);
    localStorage.setItem('userId', user._id);
    localStorage.setItem('user', JSON.stringify(user));

    toast.update(toastId, {
      render: 'Login Successful!',
      type: 'success',
      isLoading: false,
      autoClose: 1200,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      style: {
        fontSize: '15px',
        background: '#007EA7',
        color: '#ffffff',
        borderRadius: '12px',
      }
    });

    setTimeout(() => {
      if (user.role === 'provider') {
        router.push('/ServiceProvider');
      } else {
        router.push('/homelogged');
      }
    }, 1000);
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Login failed. Please check credentials.';
    toast.update(toastId, {
      render: errorMessage.value,
      type: 'error',
      isLoading: false,
      autoClose: 3000,
      theme: 'colored'
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

