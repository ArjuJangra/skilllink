<template>
  <div class="min-h-screen bg-[#F0F9FF] flex justify-center py-8 px-4">
    <div class="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6">

      <!-- Logo -->
      <div class="flex justify-center mb-2">
        <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-20 h-20" />
      </div>
      <h2
        class="text-3xl sm:text-3xl font-bold bg-gradient-to-r from-[#3B8D99] to-[#f46675] bg-clip-text text-transparent text-center mb-6">
        Your Expert is a Click Away
      </h2>

      <!-- Service Selection -->
      <div v-if="!hasPrefilledService">
        <label class="block text-gray-700 font-medium mb-2">Select a Service</label>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="service in availableServices" :key="service" @click="selectedService = service; fetchProviders()"
            :class="selectedService === service ? 'border-blue-600 bg-blue-50 shadow-lg' : 'border-gray-300 hover:shadow-md'"
            class="border p-3 rounded-xl text-center cursor-pointer transition">
            <p class="font-medium">{{ service }}</p>
            <p class="text-sm text-gray-500">₹{{ servicePrices[service] || '---' }}</p>
          </div>
        </div>
      </div>

      <!-- Provider Selection -->
<div v-if="!hasPrefilledProvider && providers.length">
  <label class="block text-gray-700 font-semibold mb-3 text-lg">
    Select Provider
  </label>

  <div class="flex flex-col gap-4">
    <div
      v-for="provider in providers"
      :key="provider._id"
      @click="selectedProviderId = provider._id"
      class="p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex justify-between items-center
            shadow-sm hover:shadow-lg bg-white"
      :class="selectedProviderId === provider._id
        ? 'border-blue-600 bg-blue-50 scale-[1.02]'
        : 'border-gray-300 hover:border-blue-400'"
    >
      <div>
        <p class="font-semibold text-gray-800 text-base">
          {{ provider.name }}
        </p>
        <p class="text-sm text-gray-500 mt-1">
          {{ provider.address }}
        </p>
      </div>

      <!-- Selection Indicator -->
      <div
        class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition"
        :class="selectedProviderId === provider._id ? 'border-blue-600' : 'border-gray-400'"
      >
        <div
          v-if="selectedProviderId === provider._id"
          class="w-3 h-3 bg-blue-600 rounded-full"
        ></div>
      </div>
    </div>
  </div>
</div>

      <!-- Personal Details -->
      <div class="flex flex-col gap-4">
        <input type="text" v-model="name" placeholder="Your Name"
          class="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]" />
        <input type="tel" v-model="contact" placeholder="Contact Number"
          class="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]" />
        <textarea v-model="address" placeholder="Address" rows="2"
          class="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"></textarea>
      </div>

      <!-- Payment Method -->
      <div>
        <label class="block text-gray-700 font-medium mb-2">Payment Method</label>
        <div class="flex gap-4">
          <!-- Cash -->
          <div @click="paymentMethod = 'cash'"
            :class="paymentMethod === 'cash' ? 'bg-blue-50 border-blue-600 shadow-lg' : 'border-gray-300 hover:shadow-md'"
            class="flex-1 p-3 rounded-xl text-center cursor-pointer flex flex-col items-center gap-1 transition">
            <span class="text-xl">💵</span>
            <span>Cash on Service</span>
          </div>

          <!-- UPI -->
          <div @click="paymentMethod = 'upi'"
            :class="paymentMethod === 'upi' ? 'border-blue-600 bg-blue-50 shadow-lg' : 'border-gray-300 hover:shadow-md'"
            class="flex-1 p-3 rounded-xl text-center cursor-pointer flex flex-col items-center gap-1 transition">
            🏦 UPI / Bank Transfer
          </div>
        </div>

        <!-- UPI Instructions -->
        <div v-if="paymentMethod === 'upi'" class="mt-3 p-4 border rounded-xl bg-gray-50 text-center space-y-3">

          <!-- Step Instructions -->
          <p class="text-sm text-gray-700">
            Step 1: Send ₹<strong>{{ getSelectedPrice() }}</strong> to UPI ID: <strong>{{ upiId }}</strong><br>
            Step 2: Include Booking ID <strong>{{ bookingId }}</strong> in UPI remarks<br>
            Step 3: Upload payment screenshot for verification
          </p>

          <!-- Booking ID with copy button -->
          <div class="flex justify-center items-center gap-2 mt-2">
            <span class="text-sm text-gray-700">Booking ID: <strong>{{ bookingId }}</strong></span>
            <button @click="copyBookingId" class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs">
              Copy
            </button>
          </div>

          <!-- QR Code -->
          <img :src="upiQr" alt="UPI QR Code" class="w-40 h-40 mx-auto mt-2 rounded-lg border" />

          <!-- Screenshot Upload -->
          <label class="mt-2 cursor-pointer text-sm text-gray-700 bg-gray-100 p-2 rounded-lg hover:bg-gray-200">
            Upload Screenshot After Payment
            <input type="file" @change="onUPIScreenshotChange" class="hidden" />
          </label>

          <!-- Screenshot Preview -->
          <div v-if="upiScreenshotURL" class="mt-2 text-sm text-green-700">
            Screenshot selected: {{ upiScreenshot.name }}
            <img :src="upiScreenshotURL" alt="Payment Screenshot" class="w-32 h-32 mt-1 mx-auto rounded-md border" />
          </div>

        </div>

      </div>

      <!-- Booking Summary -->
      <div class="p-3 border rounded-xl bg-gray-50 flex flex-col gap-1">
        <p><strong>Service:</strong> {{ selectedService || '-' }}</p>
        <p><strong>Provider:</strong> {{ selectedProvider.name || '-' }}</p>
        <p><strong>Price:</strong> ₹{{ getSelectedPrice() }}</p>
        <p><strong>Payment:</strong> {{ paymentMethod === 'cash' ? 'Cash' : 'UPI / Bank' }}</p>
        <p><strong>Scheduled:</strong> {{ selectedDate }} at {{ selectedTime }}</p>
      </div>
      <!-- Confirm Booking -->
      <button :disabled="loading || !isFormValid()" @click="confirmBooking"
        class="w-full bg-[#0289b7] text-white py-3 rounded-xl hover:bg-[#005f6b] disabled:opacity-50 transition">
        {{ loading ? 'Processing...' : `Book ₹${getSelectedPrice()}` }}
      </button>

      <p class="text-xs text-gray-500 text-center mt-1">
        No advance charged for cash. For UPI/Bank, confirm after payment.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import API from '@/api'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import QRCode from 'qrcode'

// Router
const router = useRouter()
const route = useRoute()

// State
const loading = ref(false)
const selectedService = ref('')
const selectedProviderId = ref('')
const name = ref('')
const contact = ref('')
const address = ref('')
const selectedDate = ref('')
const selectedTime = ref('')
const total = ref(0)
const availableServices = ref([])
const providers = ref([])
const location = ref({ latitude: null, longitude: null })

// Payment
const paymentMethod = ref('cash')
const upiId = ref('parveendhillo08-1@okaxis')
const bookingId = ref(`BK-${Date.now()}-${Math.floor(Math.random() * 1000)}`)
const upiScreenshot = ref(null)
const upiScreenshotURL = ref(null) // NEW: reactive URL for preview
const upiQr = ref('')

// Screenshot change handler
const onUPIScreenshotChange = (e) => {
  const file = e.target.files?.[0] || null
  upiScreenshot.value = file

  // revoke previous URL
  if (upiScreenshotURL.value) URL.revokeObjectURL(upiScreenshotURL.value)
  upiScreenshotURL.value = file ? URL.createObjectURL(file) : null
}

// Copy booking ID
const copyBookingId = () => {
  navigator.clipboard.writeText(bookingId.value)
    .then(() => toast.success('Booking ID copied!'))
    .catch(() => toast.error('Failed to copy Booking ID'))
}


// Prices
const servicePrices = { Plumber: 199, Electrician: 249, "AC Repair": 399, Carpenter: 299, Cleaner: 149, Mechanic: 349 }
const getSelectedPrice = () => total.value || servicePrices[selectedService.value] || 0

// Generate UPI QR dynamically
const generateUPIQR = async () => {
  if (paymentMethod.value !== 'upi') return
  const amount = getSelectedPrice()
  const upiURL = `upi://pay?pa=${upiId.value}&pn=SkillLink&am=${amount}&cu=INR&tn=${bookingId.value}`
  upiQr.value = await QRCode.toDataURL(upiURL)
}

// Regenerate QR when service, price, or booking ID changes
watch([selectedService, total, bookingId, paymentMethod], generateUPIQR)

// Prefilled flags
const hasPrefilledService = computed(() => !!route.query.service)
const hasPrefilledProvider = computed(() => !!route.query.providerId)

// Computed selected provider
const selectedProvider = computed(() =>
  providers.value.find(p => p._id === selectedProviderId.value) || {}
)

// Form validation
const isFormValid = () =>
  name.value && contact.value && address.value && selectedService.value &&
  selectedProviderId.value && getSelectedPrice() > 0 && selectedDate.value && selectedTime.value &&
  (paymentMethod.value === 'cash' || (paymentMethod.value === 'upi' && upiScreenshot.value))

// Confirm booking
const confirmBooking = async () => {
  if (!isFormValid()) {
    toast.error('Please fill in all required fields.')
    return
  }

  loading.value = true
  try {
    const formData = new FormData()
    formData.append('service', selectedService.value)
    formData.append('providerId', selectedProviderId.value)
    formData.append('date', selectedDate.value)
    formData.append('time', selectedTime.value)
    formData.append('name', name.value)
    formData.append('contact', contact.value)
    formData.append('address', address.value)
    formData.append('price', getSelectedPrice())
    formData.append('paymentMethod', paymentMethod.value)
    formData.append('paymentStatus', 'pending') // Always pending until verified
    formData.append('bookingId', bookingId.value)
    if (upiScreenshot.value) formData.append('upiScreenshot', upiScreenshot.value)

    const token = localStorage.getItem('token')
    await API.post('/bookings', formData, { headers: { Authorization: `Bearer ${token}` } })

    toast.success(`Booking submitted! Booking ID: ${bookingId.value}. Admin will verify payment.`)
    router.push({
      path: '/booking-confirm',
      query: {
        service: selectedService.value,
        providerId: selectedProvider.value._id,
        providerName: selectedProvider.value.name || 'Assigned Expert',
        amount: getSelectedPrice(),
        paymentMethod: paymentMethod.value
      }
    })
  } catch (err) {
    toast.error(err.response?.data?.message || 'Booking failed.')
  } finally {
    loading.value = false
  }
}

// Fetch providers
const fetchProviders = async () => {
  if (!selectedService.value) return
  const token = localStorage.getItem('token')
  try {
    const payload = { service: selectedService.value }
    if (location.value.latitude && location.value.longitude) {
      payload.latitude = location.value.latitude
      payload.longitude = location.value.longitude
    }
    const res = await API.post('/services/nearby', payload, { headers: { Authorization: `Bearer ${token}` } })
    providers.value = res.data || []
    if (!providers.value.length) toast.warn('No providers found for this service.')
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to fetch providers')
  }
}

// Load nearby services
const loadNearbyServices = async (latitude, longitude) => {
  const token = localStorage.getItem('token')
  try {
    const res = await API.post('/services/nearby', { latitude, longitude, service: null }, { headers: { Authorization: `Bearer ${token}` } })
    const servicesSet = new Set(res.data.flatMap(p => p.services || []))
    availableServices.value = Array.from(servicesSet)
  } catch {
    toast.error('Failed to fetch nearby services')
    availableServices.value = Object.keys(servicePrices)
  }
}

// Prefill query params and geolocation
onMounted(() => {
  const { service, providerId, date, time, total: t } = route.query
  if (service) selectedService.value = service
  if (providerId) selectedProviderId.value = providerId
  if (date) selectedDate.value = date
  if (time) selectedTime.value = time
  if (t) total.value = Number(t)

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async pos => {
      location.value = { latitude: pos.coords.latitude, longitude: pos.coords.longitude }
      await loadNearbyServices(pos.coords.latitude, pos.coords.longitude)
      if (selectedService.value) await fetchProviders()
    }, async () => {
      toast.error('Geolocation denied. Showing all services.')
      availableServices.value = Object.keys(servicePrices)
      if (selectedService.value) await fetchProviders()
    })
  } else {
    toast.error('Geolocation not supported.')
    availableServices.value = Object.keys(servicePrices)
    if (selectedService.value) fetchProviders()
  }

  // Generate initial QR
  generateUPIQR()
})
</script>
