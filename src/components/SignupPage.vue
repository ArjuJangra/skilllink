<template>
  <div class="min-h-screen flex items-center justify-center bg-[#f4f6f8] px-4">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
      <div class="text-center mb-6">
        <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-16 h-16 mx-auto mb-4" />
        <h2 class="text-2xl font-bold text-[#0073b1]">Create Your SkillLink Account</h2>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Role Selection -->
        <div>
          <label class="block text-lg font-bold text-gray-800 mb-2">Register as:</label>
          <div class="flex gap-6">
            <label class="flex items-center space-x-2">
              <input type="radio" value="user" v-model="form.role" @change="resetFields" class="accent-[#0073b1]" />
              <span class="text-gray-800">User</span>
            </label>
            <label class="flex items-center space-x-2">
              <input type="radio" value="provider" v-model="form.role" @change="resetFields" class="accent-[#0073b1]" />
              <span class="text-gray-800">Service Provider</span>
            </label>
          </div>
        </div>

        <!-- Full Name -->
        <div>
          <label class="block text-sm font-semibold text-gray-700">Full Name</label>
          <input v-model="form.name" type="text" required class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0073b1]" />
        </div>

        <!-- User Section -->
        <div v-if="form.role === 'user'" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700">Email</label>
            <input v-model="form.email" type="email" required class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="you@example.com"/>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700">Password</label>
            <input v-model="form.password" type="password" required class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="••••••••" />
          </div>
        </div>

        <!-- Service Provider Section -->
        <div v-if="form.role === 'provider'" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700">Email</label>
            <input v-model="form.email" type="email" required class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg" 
            placeholder="you@example.com"/>
          </div>
          <div>
          <label class="block text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            v-model="form.password"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0073b1]"
            placeholder="••••••••"
            required
          />
        </div>

          <!-- Services as Checkboxes -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Select up to 3 Services</label>
            <div class="grid grid-cols-2 gap-2">
              <label v-for="(option, index) in availableServices" :key="index" class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  :value="option"
                  :checked="form.services.includes(option)"
                  @change="toggleService(option)"
                  :disabled="!form.services.includes(option) && form.services.length >= 3"
                  class="accent-[#0073b1]"
                />
                <span class="text-gray-700">{{ option }}</span>
              </label>
            </div>
            <p v-if="form.services.length >= 3" class="text-sm text-red-500 mt-1">
              You can only select up to 3 services.
            </p>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700">Years of Experience</label>
            <input v-model="form.experience" type="number" min="0" class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg" />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700">Address</label>
            <textarea v-model="form.address" rows="3" class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"></textarea>
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit"
          class="w-full mt-4 bg-[#0073b1] text-white py-2 rounded-lg hover:bg-[#005f91] transition duration-200 cursor-pointer">
          Sign Up
        </button>

        <!-- Login Link -->
        <div class="text-center mt-4 text-sm text-gray-600">
          Already have an account?
          <router-link to="/login" class="text-[#0073b1] font-medium hover:underline">Login here</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const router = useRouter()

const form = reactive({
  name: '',
  role: '',
  email: '',
  password: '',
  services: [],
  experience: '',
  address: ''
})

const availableServices = [
  'Plumber', 'Electrician', 'Mechanic', 'Carpenter', 'AC/Appliance Repair',
  'Painter', 'Welder', 'House Cleaner', 'Sofa/Curtain Cleaner', 'Water Tank Cleaner',
  'Pest Cleaner', 'Gardener', 'Security Guard', 'Driver on Call', 'Cook/Chef',
  'Beautician', 'Massage Therapist', 'Fitness Trainer', 'Babysitter', 'Laptop/PC Repair',
  'CCTV Installation', 'Mobile Technician', 'Internet Technician', 'Courier Pickup/Delivery',
  'House Shifting/Packers', 'Tailor', 'Event Decorator', 'Pet Grommer'
]

const toggleService = (service) => {
  const exists = form.services.includes(service)
  if (exists) {
    form.services = form.services.filter(s => s !== service)
  } else if (form.services.length < 3) {
    form.services.push(service)
  }
}

const resetFields = () => {
  form.email = ''
  form.password = ''
  form.services = []
  form.experience = ''
  form.address = ''
}

const handleSubmit = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/signup', form)

    localStorage.setItem('token', response.data.token)

    toast.success(`Welcome, ${response.data.user?.name || 'User'}!`, {
      theme: 'colored'
    })

    if (form.role === 'user') {
      router.push('/homelogged')
    } else if (form.role === 'provider') {
      router.push('/serviceprovider')
    }
  } catch (error) {
    toast.error(error.response?.data?.error || 'Signup failed. Try again.', {
      theme: 'colored'
    })
  }
}
</script>
