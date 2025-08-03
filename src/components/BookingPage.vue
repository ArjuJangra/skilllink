<template>
  <div class="min-h-screen bg-[#F0F9FF] flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <!-- Logo & Name -->
      <div class="flex flex-col items-center mb-6">
        <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-16 h-16 mb-2" />
      </div>

      <!-- Heading -->
      <h2 class="text-xl font-bold text-[#007EA7] mb-6 text-center">
        Book a Service
      </h2>

      <!-- Service Selection -->
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-1">Select a Service</label>
        <select
          v-model="selectedService"
          @change="fetchProviders"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
        >
          <option disabled value="">-- Select a Service --</option>
          <option v-for="service in availableServices" :key="service" :value="service">
            {{ service }}
          </option>
        </select>
      </div>

      <!-- Provider Selection -->
      <div v-if="providers.length" class="mb-4">
        <label class="block text-gray-700 font-medium mb-1">Select Provider</label>
        <select
          v-model="selectedProviderId"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
        >
          <option disabled value="">-- Select a Provider --</option>
          <option v-for="provider in providers" :key="provider._id" :value="provider._id">
            {{ provider.name }} ({{ provider.address }})
          </option>
        </select>
      </div>

      <!-- Name -->
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-1">Your Name</label>
        <input
          type="text"
          v-model="name"
          placeholder="Enter your name"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
        />
      </div>

      <!-- Contact Number -->
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-1">Contact Number</label>
        <input
          type="tel"
          v-model="contact"
          placeholder="Enter your phone number"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
        />
      </div>

      <!-- Address -->
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-1">Address</label>
        <textarea
          v-model="address"
          placeholder="Enter your address"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
        ></textarea>
      </div>

      <!-- Confirm Booking -->
      <button
        :disabled="loading"
        @click="openFakePayment"
        class="w-full bg-[#007EA7] text-white py-2 rounded hover:bg-[#005f6b] disabled:opacity-50"
      >
        {{ loading ? 'Processing...' : `Pay ₹${getSelectedPrice() || '---'} & Book` }}
      </button>
    </div>

    <!-- Fake Payment Modal -->
    <div v-if="showFakeModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded shadow-lg w-80">
        <h2 class="text-lg font-semibold mb-4">Simulated Payment</h2>
        <p class="mb-4">Simulated payment amount: <strong>₹{{ getSelectedPrice() }}</strong></p>
        <div class="flex justify-end gap-4">
          <button @click="confirmFakePayment" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Confirm
          </button>
          <button @click="showFakeModal = false" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const router = useRouter()

const loading = ref(false)
const showFakeModal = ref(false)

const selectedService = ref('')
const selectedProviderId = ref('')
const name = ref('')
const contact = ref('')
const address = ref('')

const availableServices = ref([])
const providers = ref([])
const location = ref({ latitude: null, longitude: null })

// Simulated service prices
const servicePrices = {
  "Plumber": 199,
  "Electrician": 249,
  "AC Repair": 399,
  "Carpenter": 299,
  "Cleaner": 149,
  "Mechanic": 349
}

const getSelectedPrice = () => {
  return servicePrices[selectedService.value] || 199
}

const openFakePayment = () => {
  if (!name.value || !contact.value || !address.value || !selectedService.value || !selectedProviderId.value) {
    toast.error('Please fill in all fields.')
    return
  }
  showFakeModal.value = true
}

const confirmFakePayment = async () => {
  showFakeModal.value = false
  loading.value = true

  const token = localStorage.getItem('token')

  try {
    await axios.post('http://localhost:5000/api/bookings', {
      service: selectedService.value,
      providerId: selectedProviderId.value,
      name: name.value,
      contact: contact.value,
      address: address.value,
      amount: getSelectedPrice(),
      paymentStatus: 'paid' // Simulated paid
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    toast.success('✅ Booking confirmed with payment!')
    router.push('/booking-confirm')

    name.value = ''
    contact.value = ''
    address.value = ''
    selectedService.value = ''
    selectedProviderId.value = ''
    providers.value = []
  } catch (err) {
    const message = err.response?.data?.message || 'Booking failed.'
    toast.error(message)
    console.error('❌ Booking error:', err)
  } finally {
    loading.value = false
  }
}

// Fetch providers when service is selected
const fetchProviders = async () => {
  const token = localStorage.getItem('token')
  try {
    const res = await axios.post('http://localhost:5000/api/services/nearby', {
      latitude: location.value.latitude,
      longitude: location.value.longitude,
      service: selectedService.value
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    providers.value = res.data || []
  } catch (err) {
    toast.error('Failed to fetch providers')
    console.error(err)
  }
}

// On mount: Get user location and available services nearby
onMounted(async () => {
  const token = localStorage.getItem('token')

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords
      location.value = { latitude, longitude }

      try {
        const res = await axios.post('http://localhost:5000/api/services/nearby', {
          latitude,
          longitude,
          service: null
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const servicesSet = new Set(res.data.flatMap(p => p.services || []))
        availableServices.value = Array.from(servicesSet)

      } catch (err) {
        toast.error('Failed to fetch nearby services')
        console.error(err)
      }
    }, () => {
      toast.error('Geolocation denied or unavailable')
    })
  } else {
    toast.error('Geolocation is not supported')
  }
})
</script>
