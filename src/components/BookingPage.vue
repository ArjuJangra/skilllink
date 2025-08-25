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
        <label class="block text-gray-700 font-medium mb-2">Select Provider</label>
        <div class="flex flex-col gap-3">
          <div v-for="provider in providers" :key="provider._id" @click="selectedProviderId = provider._id"
            :class="selectedProviderId === provider._id ? 'border-blue-600 bg-blue-50 shadow-lg' : 'border-gray-300 hover:shadow-md'"
            class="border p-3 rounded-xl cursor-pointer transition flex justify-between items-center">
            <div>
              <p class="font-medium">{{ provider.name }}</p>
              <p class="text-sm text-gray-500">{{ provider.address }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Personal Details -->
      <div class="flex flex-col gap-4">
        <!-- Name -->
        <input type="text" v-model="name" placeholder="Your Name"
          class="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]" />

        <!-- Contact -->
        <input type="tel" v-model="contact" placeholder="Contact Number"
          class="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]" />

        <!-- Address -->
        <textarea v-model="address" placeholder="Address" rows="2"
          class="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"></textarea>
      </div>


      <!-- Payment Method -->
      <div>
        <label class="block text-gray-700 font-medium mb-2">Payment Method</label>
        <div class="flex gap-4">
          <div @click="paymentMethod = 'cash'"
            :class="paymentMethod === 'cash' ? 'bg-blue-50 border-blue-600 shadow-lg' : 'border-gray-300 hover:shadow-md'"
            class="flex-1 p-3 rounded-xl text-center cursor-pointer flex flex-col items-center gap-1 transition">
            <span class="text-xl">💵</span>
            <span>Cash on Service</span>
          </div>

          <div @click="paymentMethod = 'upi'"
            :class="paymentMethod === 'upi' ? 'border-blue-600 bg-blue-50 shadow-lg' : 'border-gray-300 hover:shadow-md'"
            class="flex-1 p-3 rounded-xl text-center cursor-pointer flex flex-col items-center gap-1 transition">
            🏦 UPI / Bank Transfer
          </div>
        </div>

        <div v-if="paymentMethod === 'upi'" class="mt-3 p-3 border rounded-xl bg-gray-50 text-center">
          <p class="text-sm mb-1">Send payment to:</p>
          <p class="font-semibold text-blue-700">{{ upiId }}</p>
          <img :src="upiQr" alt="UPI QR Code" class="w-32 h-32 mx-auto mt-2" />
          <p class="text-xs text-gray-500 mt-1">After payment, click "Book ₹{{ getSelectedPrice() }}"</p>
        </div>
      </div>

      <!-- Booking Summary -->
      <div class="p-3 border rounded-xl bg-gray-50 flex flex-col gap-1">
        <p><strong>Service:</strong> {{ selectedService || '-' }}</p>
        <p><strong>Provider:</strong> {{providers.find(p => p._id === selectedProviderId)?.name || '-'}}</p>
        <p><strong>Price:</strong> ₹{{ getSelectedPrice() }}</p>
        <p><strong>Payment:</strong> {{ paymentMethod === 'cash' ? 'Cash' : 'UPI / Bank' }}</p>
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
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import API from '@/api'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import upiQrImg from '@/assets/upi-qr.jpg'

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

// Payment
const paymentMethod = ref('cash')
const upiId = ref('parveendhillo08-1@okaxis')
const upiQr = ref(upiQrImg)

// Prices
const servicePrices = {
  Plumber: 199,
  Electrician: 249,
  "AC Repair": 399,
  Carpenter: 299,
  Cleaner: 149,
  Mechanic: 349
}

const getSelectedPrice = () => total.value || servicePrices[selectedService.value] || 0

const hasPrefilledService = computed(() => !!route.query.service)
const hasPrefilledProvider = computed(() => !!route.query.providerId)

const isFormValid = () => name.value && contact.value && address.value && selectedService.value && selectedProviderId.value && getSelectedPrice() > 0 && selectedDate.value && selectedTime.value

// Booking
const confirmBooking = async () => {
  if (!isFormValid()) {
    toast.error('Please fill in all required fields.')
    return
  }

  loading.value = true
  const token = localStorage.getItem('token')

  try {
    await API.post(
      '/bookings',
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
        price: getSelectedPrice(),
        coupon: couponCode.value,
        paymentMethod: paymentMethod.value,
        paymentStatus: paymentMethod.value === 'cash' ? 'pending' : 'initiated'
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    router.push({
      path: '/booking-confirm',
      query: {
        service: selectedService.value,
        providerName:
          providers.value.find(p => p._id === selectedProviderId.value)?.name || 'Assigned Expert',
        amount: getSelectedPrice(),
        paymentMethod: paymentMethod.value
      }
    })

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
    paymentMethod.value = 'cash'
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

// Nearby services
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

// Prefill
onMounted(() => {
  const { service, providerId, tier, addons, qty: q, date, time, total: t, coupon } = route.query

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
        location.value = { latitude: pos.coords.latitude, longitude: pos.coords.longitude }
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
