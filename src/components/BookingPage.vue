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

      <!-- Confirm Booking Button -->
      <button
        :disabled="loading || !isFormValid()"
        @click="confirmBooking"
        class="w-full bg-[#007EA7] text-white py-2 rounded hover:bg-[#005f6b] disabled:opacity-50"
      >
        {{ loading ? 'Processing...' : `Pay ₹${total || '---'} & Book` }}
      </button>

      <!-- Info -->
      <p class="text-xs text-gray-500 mt-2">
        No advance charged. Pay after service confirmation.
      </p>
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

const selectedService = ref('')
const selectedProviderId = ref('')
const name = ref('')
const contact = ref('')
const address = ref('')
const selectedTier = ref({ name: '', price: 0 })
const selectedAddons = ref([])
const qty = ref(1)
const selectedDate = ref('')
const selectedTime = ref('')
const couponCode = ref('')
const total = ref(0)

const availableServices = ref([])
const providers = ref([])
const location = ref({ latitude: null, longitude: null })

// Static fallback prices (optional, for selection if needed)
const servicePrices = {
  Plumber: 199,
  Electrician: 249,
  "AC Repair": 399,
  Carpenter: 299,
  Cleaner: 149,
  Mechanic: 349
}

const getSelectedPrice = () => {
  // Use `total.value` if already computed
  return total.value || servicePrices[selectedService.value] || 0
}


const hasPrefilledService = computed(() => !!route.query.service)
const hasPrefilledProvider = computed(() => !!route.query.providerId)

const isFormValid = () => {
  return (
    name.value &&
    contact.value &&
    address.value &&
    selectedService.value &&
    selectedProviderId.value &&
    total.value > 0 &&
    selectedDate.value &&
    selectedTime.value
  )
}

// Booking submit method
const confirmBooking = async () => {
  if (!isFormValid()) {
    toast.error('Please fill in all required fields.')
    return
  }

  loading.value = true
  const token = localStorage.getItem('token')

  try {
    await axios.post(
      'http://localhost:5000/api/bookings',
      {
        service: selectedService.value,
        providerId: selectedProviderId.value,
        tier: selectedTier.value.name,
        addons: selectedAddons.value.map(a => a.key),
        qty: qty.value,
        date: selectedDate.value,
        time: selectedTime.value,
        name: name.value,
        contact: contact.value,
        address: address.value,
        total: total.value,
        coupon: couponCode.value,
        paymentStatus: 'paid'
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    toast.success('✅ Booking confirmed!')
   router.push({
  path: '/booking-confirm',
  query: {
    service: selectedService.value,
    providerName: providers.value.find(p => p._id === selectedProviderId.value)?.name || 'Assigned Expert',
    amount: getSelectedPrice()
  }
});


    // Reset form
    name.value = ''
    contact.value = ''
    address.value = ''
    selectedService.value = ''
    selectedProviderId.value = ''
    selectedTier.value = { name: '', price: 0 }
    selectedAddons.value = []
    qty.value = 1
    selectedDate.value = ''
    selectedTime.value = ''
    couponCode.value = ''
    total.value = 0
  } catch (err) {
    toast.error(err.response?.data?.message || 'Booking failed.')
  } finally {
    loading.value = false
  }
}

// Fetch providers based on selected service and location
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

// Load nearby services (optional)
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

// Prefill form from query params
onMounted(() => {
  const {
    service,
    providerId,
    tier,
    addons,
    qty: q,
    date,
    time,
    total: t,
    coupon
  } = route.query

  if (service) selectedService.value = service
  if (providerId) selectedProviderId.value = providerId
  if (tier) selectedTier.value.name = tier
  if (addons) selectedAddons.value = addons.split(',').map(k => ({ key: k, label: k }))
  if (q) qty.value = Number(q)
  if (date) selectedDate.value = date
  if (time) selectedTime.value = time
  if (t) total.value = Number(t)
  if (coupon) couponCode.value = coupon

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async pos => {
        location.value = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        }
        await loadNearbyServices(pos.coords.latitude, pos.coords.longitude)
        if (selectedService.value) await fetchProviders()
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




