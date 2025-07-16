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
          <input v-model="loginForm.email" type="email" required
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0073b1]"
            placeholder="Enter your email" />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-semibold text-gray-700">Password</label>
          <input v-model="loginForm.password" type="password" required
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0073b1]"
            placeholder="Enter your password" />
        </div>

        <!-- Submit -->
        <button type="submit"
          class="w-full mt-2 bg-[#0073b1] text-white py-2 rounded-lg hover:bg-[#005f91] transition duration-200">
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
import { reactive } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios';
import { auth } from '@/stores/auth';
import { loginUser } from '@/stores/auth'
import { toast } from 'vue3-toastify'

const router = useRouter();

const loginForm = reactive({
  email: '',
  password: ''
})

const handleLogin = async () => {
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

  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email: loginForm.email,
      password: loginForm.password,
    });

    const { token, user } = res.data;
    // You can now store user info from response
    loginUser(token, user);
    auth.isLoggedIn = true;
    auth.user.name = user.name;
    auth.user.avatar = require('@/assets/user.png');
    auth.user.email = user.email;
    auth.user.role = user.role;

    localStorage.setItem('userId', user._id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
     toast.update(toastId, {
      render: 'Login Successful!',
      type: 'success',
      isLoading: false,
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      style: {
        fontSize: '15px',
        background: '#e6f4ea',
        color: '#0073b1',
        borderRadius: '12px',
      }
    });
    
   setTimeout(() => {
      router.push('/homelogged');
    }, 1000);


  } catch (error) {
      toast.update(toastId, {
      render: error.response?.data?.error || 'Login failed. Please check credentials.',
      type: 'error',
      isLoading: false,
      autoClose: 3000,
      theme: 'colored'
    });
  }
};
</script>
