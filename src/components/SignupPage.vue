<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8 relative">

    <!-- Signup Form Card -->
    <transition name="fade">
      <div v-if="!showSplash" class="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-xl z-10">

        <!-- Header -->
        <div class="text-center mb-6">
          <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-20 h-20 mx-auto mb-4" />
          <h2 class="text-2xl font-bold bg-gradient-to-r from-[#3B8D99] to-[#f46675] bg-clip-text text-transparent">
            Create Your SkillLink Account
          </h2>
          <p class="text-gray-500 text-sm mt-2">Join us and start your journey today</p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-5">

          <!-- Role Selection -->
          <div>
            <label class="block text-lg font-semibold text-gray-800 mb-2">Register as:</label>
            <div class="flex gap-6">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input type="radio" value="user" v-model="form.role" @change="resetFields" class="accent-[#0073b1]" />
                <span class="text-gray-800">User</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input type="radio" value="provider" v-model="form.role" @change="resetFields"
                  class="accent-[#0073b1]" />
                <span class="text-gray-800">Service Provider</span>
              </label>
            </div>
          </div>

          <!-- Full Name -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input v-model="form.name" type="text" placeholder="Your Name" required
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0073b1] transition" />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input v-model="form.email" type="email" placeholder="you@example.com" required
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0073b1] transition" />
          </div>

          <!-- Password -->
          <div class="relative">
            <label class="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" required
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 pr-12 transition" :class="{
                'border-red-500': form.password.length > 0 && form.password.length < 6,
                'border-gray-300': form.password.length >= 6 || form.password.length === 0
              }" />
            <button type="button" @click="showPassword = !showPassword"
              class="absolute right-3 bottom-2 top-10 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition">
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
            <p v-if="form.password.length > 0 && form.password.length < 6" class="text-red-500 text-sm mt-1">
              Password must be at least 6 characters.
            </p>
          </div>
          <!-- Provider Fields -->
          <div v-if="form.role === 'provider'" class="space-y-4">

            <!-- Services -->
            <div class="relative">
              <label class="block text-sm font-semibold text-gray-700 mb-1">Select up to 3 Services</label>
              <Multiselect v-model="form.services" :options="availableServices" :multiple="true" :max="3"
                placeholder="Select up to 3 services" class="w-full text-gray-700" :show-labels="false"
                :allow-empty="true" track-by="" label="" :custom-label="(option) => option" append-to-body
                direction="bottom" @open="dropdownOpen = true" @close="dropdownOpen = false" />
            </div>

            <!-- Experience -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Years of Experience</label>
              <input v-model="form.experience" type="number" min="0"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition" />
            </div>
            <!-- Area -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Area (Location)</label>
              <input v-model="form.area" type="text" placeholder="e.g., Sector 14, Rohini" required
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition" />
              <small class="text-gray-500">Helps users find you nearby.</small>
            </div>

            <!-- Geolocation -->
            <div class="mt-2">
              <button type="button" @click="getLocation"
                class="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Use My Current Location
              </button>
            </div>

            <!-- Address -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Address</label>
              <textarea v-model="form.address" rows="3"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition"></textarea>
            </div>

          </div>

          <!-- Submit Button -->
          <button :disabled="loading" type="submit"
            class="w-full py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition flex justify-center items-center gap-2 relative">
            <span v-if="!loading">Sign Up</span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              Signing up...
            </span>
          </button>

          <!-- Login Link -->
          <p class="text-center text-gray-500 text-sm mt-3">
            Already have an account?
            <router-link to="/login" class="text-[#0073b1] font-medium hover:underline">Login here</router-link>
          </p>

        </form>
      </div>
    </transition>

    <!-- Splash Screen -->
    <transition name="overlay-fade">
      <div v-if="showSplash" class="absolute inset-0 flex flex-col items-center justify-center bg-white z-20">
        <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-32 mb-4 animate-scale-bounce" />
        <p class="text-gray-700 font-medium text-lg animate-pulse">Signing Up...</p>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import { loginUser } from '@/stores/auth';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';

const router = useRouter();
const loading = ref(false);
const showSplash = ref(false);
const showPassword = ref(false);

const form = reactive({
  name: '',
  role: '',
  email: '',
  password: '',
  services: [],
  experience: '',
  address: '',
  area: '',
  latitude: null,
  longitude: null,
  city: ''
});

const availableServices = [
  'Plumber', 'Electrician', 'Mechanic', 'Carpenter', 'AC/Appliance Repair',
  'Painter', 'Welder', 'House Cleaner', 'Sofa/Curtain Cleaner', 'Water Tank Cleaner',
  'Pest Cleaner', 'Gardener', 'Security Guard', 'Driver on Call', 'Cook/Chef',
  'Beautician', 'Massage Therapist', 'Fitness Trainer', 'Babysitter', 'Laptop/PC Repair',
  'CCTV Installation', 'Mobile Technician', 'Internet Technician', 'Courier Pickup/Delivery',
  'House Shifting/Packers', 'Tailor', 'Event Decorator', 'Pet Groomer'
];

const resetFields = () => {
  form.email = '';
  form.password = '';
  form.services = [];
  form.experience = '';
  form.address = '';
  form.area = '';
  form.latitude = null;
  form.longitude = null;
  form.city = '';
};

const getLocation = () => {
  if (!navigator.geolocation) {
    toast.error('Geolocation is not supported by your browser.');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      form.latitude = position.coords.latitude;
      form.longitude = position.coords.longitude;

      try {
        // Use Nominatim API to get human-readable address
        const res = await axios.get('https://nominatim.openstreetmap.org/reverse', {
          params: {
            lat: form.latitude,
            lon: form.longitude,
            format: 'json'
          }
        });
        if (res.data && res.data.address) {
          // Fill the Area field with city/neighborhood
          form.area = res.data.address.suburb || res.data.address.neighbourhood || res.data.address.city || '';
          toast.success('Location detected and filled automatically!');
        }
      } catch (err) {
        toast.error('Failed to fetch address from coordinates.');
      }
    },
    () => {
      toast.error('Enable location access for this feature.');
    }
  );
};

const handleSubmit = async () => {
  if (!form.role) {
    toast.error('Please select a role');
    return;
  }

  try {
    loading.value = true;
    const endpoint = 'http://localhost:5000/api/auth/signup';
    // Prepare payload
    const payload = form.role === 'user'
      ? { name: form.name, email: form.email, password: form.password, role: form.role }
      : { ...form };

    const response = await axios.post(endpoint, form, payload);

    loginUser(response.data.token, response.data.user);

    showSplash.value = true;

    setTimeout(() => {
      showSplash.value = false;
      router.push(form.role === 'user' ? '/homelogged' : '/serviceprovider');
      //toast.success(`Welcome, ${response.data.user?.name || 'User'}!`, { theme: 'colored', autoClose: 2000 });
    }, 1500);

  } catch (err) {
    toast.error(err.response?.data?.message || 'Signup failed. Try again.', { theme: 'colored' });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Fade animation for form */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Splash animations */
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

.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
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

.animate-pulse {
  animation: pulse 1s infinite;
}

/* Ensure dropdown stays above other elements */
.multiselect__content {
  max-height: 200px;
  overflow-y: auto;
  z-index: 50;
}

/* Add little spacing if needed */
.multiselect__content-wrapper {
  margin-top: 4px;
  /* push dropdown slightly downward */
}
</style>
