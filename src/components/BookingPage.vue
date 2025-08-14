
<template>
  <div class="min-h-screen bg-[#F0F9FF] flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <!-- Logo -->
      <div class="flex flex-col items-center mb-6">
        <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-16 h-16 mb-2" />
      </div>

      <h2 class="text-xl font-bold text-[#007EA7] mb-6 text-center">Book a Service</h2>

      <!-- Service Selection -->
      <div v-if="!hasPrefilledService" class="mb-4">
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
      <div v-if="!hasPrefilledProvider && providers.length" class="mb-4">
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
    <div
      v-if="showFakeModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
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
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const router = useRouter()
const route = useRoute()

const loading = ref(false)
const showFakeModal = ref(false)

const selectedService = ref('')
const selectedProviderId = ref('')
const prefilledPrice = ref(null) // for price passed from query
const name = ref('')
const contact = ref('')
const address = ref('')

const availableServices = ref([])
const providers = ref([])
const location = ref({ latitude: null, longitude: null })

// Static fallback prices
const servicePrices = {
  Plumber: 199,
  Electrician: 249,
  "AC Repair": 399,
  Carpenter: 299,
  Cleaner: 149,
  Mechanic: 349
}

const hasPrefilledService = computed(() => !!route.query.service)
const hasPrefilledProvider = computed(() => !!route.query.providerId)

const getSelectedPrice = () => {
  // Prefer price from query if available
  if (prefilledPrice.value) return prefilledPrice.value
  return servicePrices[selectedService.value] ?? null
}

const isFormValid = () => {
  return (
    name.value &&
    contact.value &&
    address.value &&
    selectedService.value &&
    selectedProviderId.value &&
    getSelectedPrice() !== null
  )
}

const openFakePayment = () => {
  if (!isFormValid()) {
    toast.error('Please fill in all fields correctly.')
    return
  }
  showFakeModal.value = true
}

const confirmFakePayment = async () => {
  showFakeModal.value = false
  loading.value = true
  const token = localStorage.getItem('token')

  try {
    await axios.post(
      'http://localhost:5000/api/bookings',
      {
        service: selectedService.value,
        providerId: selectedProviderId.value,
        name: name.value,
        contact: contact.value,
        address: address.value,
        price: getSelectedPrice(),
        paymentStatus: 'paid'
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    toast.success('✅ Booking confirmed with payment!')
    router.push('/booking-confirm')

    // Reset form
    name.value = ''
    contact.value = ''
    address.value = ''
    selectedService.value = ''
    selectedProviderId.value = ''
    providers.value = []
    prefilledPrice.value = null
  } catch (err) {
    toast.error(err.response?.data?.message || 'Booking failed.')
  } finally {
    loading.value = false
  }
}

const fetchProviders = async () => {
  if (!location.value.latitude || !location.value.longitude) return
  const token = localStorage.getItem('token')
  try {
    const res = await axios.post(
      'http://localhost:5000/api/services/nearby',
      {
        latitude: location.value.latitude,
        longitude: location.value.longitude,
        service: selectedService.value
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    providers.value = res.data || []
  } catch {
    toast.error('Failed to fetch providers')
  }
}

const loadNearbyServices = async (latitude, longitude) => {
  const token = localStorage.getItem('token')
  try {
    const res = await axios.post(
      'http://localhost:5000/api/services/nearby',
      { latitude, longitude, service: null },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    const servicesSet = new Set(res.data.flatMap(p => p.services || []))
    availableServices.value = Array.from(servicesSet)
  } catch {
    toast.error('Failed to fetch nearby services')
    availableServices.value = Object.keys(servicePrices)
  }
}

onMounted(() => {
  const { service, providerId, price } = route.query

  if (service) selectedService.value = service
  if (providerId) selectedProviderId.value = providerId
  if (price) prefilledPrice.value = Number(price)

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async pos => {
        location.value = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        }
        await loadNearbyServices(pos.coords.latitude, pos.coords.longitude)

        // Fetch providers even if providerId is already set
        if (selectedService.value) {
          await fetchProviders()
        }
      },
      async () => {
        toast.error('Geolocation denied. Showing all services.')
        availableServices.value = Object.keys(servicePrices)
        if (selectedService.value) await fetchProviders()
      }
    )
  } else {
    toast.error('Geolocation not supported.')
    availableServices.value = Object.keys(servicePrices)
    if (selectedService.value) fetchProviders()
  }
})
</script>




