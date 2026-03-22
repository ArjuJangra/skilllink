<template>
  <div class="min-h-screen bg-[#FBFDFF] pb-20">
    <AppNavbar />

    <div v-if="!selectedServices.length && !loadingProvider" 
         class="max-w-xl mx-auto py-24 px-6 text-center animate-fade-in">
      <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
        <i class="fas fa-calendar-plus text-slate-300 text-3xl"></i>
      </div>
      <h2 class="text-3xl font-black text-slate-900 mb-4">Ready for something new?</h2>
      <p class="text-slate-500 mb-10 leading-relaxed">
        Your previous booking is being processed. You can start a new booking or check your status in the dashboard.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link to="/services" class="bg-[#0289b7] text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-[#005f6b] transition-all">
          Book Another Service
        </router-link>
        <router-link to="/dashboard" class="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all">
          View Dashboard
        </router-link>
      </div>
    </div>

    <div v-else class="max-w-6xl mx-auto py-12 px-6">
      <div class="mb-12">
        <div class="flex items-center justify-between max-w-2xl mx-auto relative">
          <div v-for="n in 3" :key="n" class="z-10 flex flex-col items-center">
            <div :class="[
              'w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition-all duration-500 border-2',
              step >= n ? 'bg-[#0289b7] text-white border-[#0289b7] shadow-xl shadow-blue-100' : 'bg-white text-slate-300 border-slate-100'
            ]">
              <i v-if="step > n" class="fas fa-check text-sm"></i>
              <span v-else class="text-sm">{{ n }}</span>
            </div>
            <span
              :class="['text-[10px] mt-3 font-bold uppercase tracking-[0.15em]', step >= n ? 'text-[#0289b7]' : 'text-slate-400']">
              {{ n === 1 ? 'Details' : n === 2 ? 'Expert' : 'Payment' }}
            </span>
          </div>
          <div class="absolute top-6 left-0 w-full h-[2px] bg-slate-100 -z-0">
            <div class="h-full bg-[#0289b7] transition-all duration-700"
              :style="{ width: ((step - 1) / 2) * 100 + '%' }"></div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div class="lg:col-span-8 space-y-8">

          <div v-if="step === 1"
            class="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm animate-fade-in">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-10 h-10 bg-blue-50 text-[#0289b7] rounded-xl flex items-center justify-center">
                <i class="fas fa-user-edit"></i>
              </div>
              <h3 class="text-xl font-black text-slate-900">Booking Details</h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div class="space-y-2">
                <label class="text-[11px] font-bold text-slate-400 uppercase ml-1">Your Name</label>
                <input type="text" v-model="name" class="premium-input" placeholder="Full Name" />
              </div>
              <div class="space-y-2">
                <label class="text-[11px] font-bold text-slate-400 uppercase ml-1">Contact Number</label>
                <input type="tel" v-model="contact" class="premium-input" placeholder="Phone Number" />
              </div>
              <div class="md:col-span-2 space-y-2">
                <label class="text-[11px] font-bold text-slate-400 uppercase ml-1">Service Address</label>
                <textarea v-model="address" rows="2" class="premium-input" placeholder="Detailed Address"></textarea>
              </div>
            </div>

            <div class="pt-8 border-t border-slate-50">
              <label class="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-6">
                Available Services from <span class="text-[#0289b7]">{{ selectedProvider?.name || 'Expert' }}</span>
              </label>

              <div v-if="loadingProvider" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div v-for="i in 2" :key="i" class="h-20 bg-slate-50 animate-pulse rounded-2xl"></div>
              </div>

              <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div v-for="serviceName in providerOfferedServices" :key="serviceName"
                  @click="toggleService(serviceName)"
                  :class="selectedServices.includes(serviceName) ? 'border-[#0289b7] bg-blue-50/50' : 'border-slate-100 hover:border-slate-200 bg-slate-50/30'"
                  class="border-2 p-5 rounded-2xl cursor-pointer transition-all flex items-center justify-between group">
                  <div class="flex items-center gap-4">
                    <div
                      :class="selectedServices.includes(serviceName) ? 'bg-[#0289b7] border-[#0289b7]' : 'bg-white border-slate-200'"
                      class="w-6 h-6 rounded-lg border flex items-center justify-center transition-all">
                      <i v-if="selectedServices.includes(serviceName)" class="fas fa-check text-white text-[10px]"></i>
                    </div>
                    <div>
                      <p class="font-bold text-sm text-slate-800">{{ serviceName }}</p>
                      <p class="text-xs text-[#0289b7] font-black mt-0.5">₹{{ servicePrices[serviceName] || '299' }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="step === 2"
            class="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm animate-fade-in">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-10 h-10 bg-blue-50 text-[#0289b7] rounded-xl flex items-center justify-center">
                <i class="fas fa-user-shield"></i>
              </div>
              <h3 class="text-xl font-black text-slate-900">Select Your Expert</h3>
            </div>

            <div v-if="loading" class="space-y-4">
              <div v-for="i in 3" :key="i" class="h-24 bg-slate-50 rounded-3xl animate-pulse"></div>
            </div>

            <div v-else-if="providers.length" class="space-y-4">
              <div v-for="provider in providers" :key="provider.$id" @click="selectedProviderId = provider.$id"
                class="group p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 flex justify-between items-center"
                :class="selectedProviderId === provider.$id ? 'border-[#0289b7] bg-blue-50/50' : 'border-slate-50 hover:border-slate-100 bg-slate-50/20'">
                <div class="flex items-center gap-5">
                  <div
                    class="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-[#0289b7] font-black text-xl shadow-sm">
                    {{ provider.name.charAt(0) }}
                  </div>
                  <div>
                    <p class="font-bold text-slate-900">{{ provider.name }}</p>
                    <div class="flex items-center gap-4 text-[10px] text-slate-500 font-bold uppercase mt-1">
                      <span><i class="fas fa-star text-amber-400 mr-1"></i> 4.9</span>
                      <span><i class="fas fa-map-marker-alt mr-1"></i> {{ provider.area }}</span>
                    </div>
                  </div>
                </div>
                <div class="w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all"
                  :class="selectedProviderId === provider.$id ? 'border-[#0289b7] bg-[#0289b7]' : 'border-slate-200'">
                  <i v-if="selectedProviderId === provider.$id" class="fas fa-check text-white text-[10px]"></i>
                </div>
              </div>
            </div>
          </div>

          <div v-if="step === 3"
            class="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm animate-fade-in">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-10 h-10 bg-blue-50 text-[#0289b7] rounded-xl flex items-center justify-center">
                <i class="fas fa-wallet"></i>
              </div>
              <h3 class="text-xl font-black text-slate-900">Payment Method</h3>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              <div @click="paymentMethod = 'cash'"
                :class="paymentMethod === 'cash' ? 'border-[#0289b7] bg-blue-50/50' : 'border-slate-50 bg-slate-50/20'"
                class="border-2 p-6 rounded-3xl cursor-pointer transition-all flex items-center gap-5">
                <div class="text-2xl">💵</div>
                <div>
                  <p class="font-bold text-slate-900">Cash After Service</p>
                  <p class="text-[10px] text-slate-400 uppercase font-black">Pay at home</p>
                </div>
              </div>
              <div @click="paymentMethod = 'upi'"
                :class="paymentMethod === 'upi' ? 'border-[#0289b7] bg-blue-50/50' : 'border-slate-50 bg-slate-50/20'"
                class="border-2 p-6 rounded-3xl cursor-pointer transition-all flex items-center gap-5">
                <div class="text-2xl">🏦</div>
                <div>
                  <p class="font-bold text-slate-900">UPI / QR Scan</p>
                  <p class="text-[10px] text-slate-400 uppercase font-black">Fast Confirmation</p>
                </div>
              </div>
            </div>

            <div v-if="paymentMethod === 'upi'"
              class="p-8 bg-slate-50/50 rounded-[2rem] border border-slate-100 space-y-6">
              <div class="flex flex-col md:flex-row gap-8 items-center">
                <div class="p-4 bg-white rounded-3xl shadow-sm border border-slate-100">
                  <img :src="upiQr" class="w-32 h-32" alt="QR Code" />
                </div>
                <div class="text-sm space-y-3 text-slate-600 font-medium">
                  <p>1. Scan QR to pay <span class="text-slate-900 font-bold">₹{{ totalAmount }}</span></p>
                  <p>2. Remark: <span class="text-slate-900 font-bold">{{ contact || 'SkillLink' }}</span></p>
                  <p>3. Upload the confirmation screenshot below</p>
                </div>
              </div>

              <label
                class="flex flex-col items-center justify-center gap-3 w-full p-8 bg-white border-2 border-dashed border-slate-200 rounded-3xl cursor-pointer hover:border-[#0289b7] transition-all group">
                <i class="fas fa-cloud-upload-alt text-2xl text-slate-300 group-hover:text-[#0289b7]"></i>
                <span class="text-xs font-bold text-slate-400 group-hover:text-[#0289b7]">
                  {{ upiScreenshot ? '✅ Screenshot Attached' : 'Click to Upload Payment Proof' }}
                </span>
                <input type="file" @change="onUPIScreenshotChange" class="hidden" accept="image/*" />
              </label>
            </div>
          </div>

          <div class="flex justify-between items-center pt-6 px-2">
            <button v-if="step > 1" @click="step--"
              class="text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-900 transition flex items-center gap-2">
              <i class="fas fa-chevron-left"></i> Go Back
            </button>
            <div v-else></div>

            <button v-if="step < 3" @click="nextStep" :disabled="!isStepValid"
              class="bg-[#0289b7] text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-blue-100 hover:shadow-blue-200 hover:-translate-y-0.5 transition-all disabled:opacity-30">
              Next Step <i class="fas fa-chevron-right ml-2 text-[10px]"></i>
            </button>
            <button v-else @click="confirmBooking" :disabled="loading || !isFormValid()"
              class="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-widest shadow-2xl hover:bg-black transition-all disabled:opacity-30 flex items-center gap-3">
              <i v-if="loading" class="fas fa-spinner fa-spin"></i>
              {{ loading ? 'Securing...' : 'Complete Booking' }}
            </button>
          </div>
        </div>

        <div class="lg:col-span-4">
          <div class="bg-white rounded-[2.5rem] border border-slate-100 p-8 sticky top-24 shadow-sm">
            <h4 class="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-8 pb-4 border-b border-slate-50">
              Summary</h4>

            <div class="space-y-6">
              <div>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Selected Services</p>
                <div v-if="selectedServices.length === 0" class="text-sm text-slate-300 italic">No services added</div>
                <div v-for="s in selectedServices" :key="s" class="flex justify-between items-center mb-3">
                  <span class="text-sm font-bold text-slate-700">{{ s }}</span>
                  <span class="text-sm font-medium text-slate-400">₹{{ servicePrices[s] || 0 }}</span>
                </div>
              </div>

              <div class="pt-6 border-t border-slate-50">
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Schedule</p>
                <p class="text-sm font-bold text-slate-800">{{ selectedDate || 'Not set' }}</p>
                <p class="text-xs text-slate-400 font-medium">{{ selectedTime || 'Time not selected' }}</p>
              </div>

              <div v-if="selectedProvider?.name" class="pt-6 border-t border-slate-50">
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Expert</p>
                <p class="text-sm font-bold text-slate-800">{{ selectedProvider.name }}</p>
              </div>

              <div class="pt-8 mt-8 border-t border-dashed border-slate-200">
                <div class="flex justify-between items-end">
                  <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Payable</p>
                  <p class="text-3xl font-black text-[#0289b7]">₹{{ totalAmount }}</p>
                </div>
              </div>
            </div>

            <div class="mt-10 p-5 bg-blue-50/30 rounded-3xl border border-blue-50 flex gap-3">
              <i class="fas fa-shield-check text-[#0289b7] mt-1"></i>
              <p class="text-[10px] text-slate-500 leading-relaxed font-medium">
                Protected by SkillLink Guarantee. Your expert is verified and insured.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { databases, storage, account, APPWRITE_CONFIG, ID } from '@/appwrite'
import { Query } from 'appwrite' // Import Query for fetching lists
import { toast } from 'vue3-toastify'
import QRCode from 'qrcode'
import AppNavbar from '@/components/AppNavbar.vue'

// --- CONFIG & ROUTING ---
const router = useRouter()
const route = useRoute()
const DB_ID = APPWRITE_CONFIG.dbId
const BOOKINGS_COLLECTION = "bookings"
const PROVIDERS_COLLECTION = APPWRITE_CONFIG.providersCollection
const BUCKET_ID = APPWRITE_CONFIG.storageBucket

// --- STATE ---
const step = ref(1)
const loading = ref(false)
const loadingProvider = ref(false)
const currentUser = ref(null)

// Service Selection
const selectedServices = ref([]) // Initialized as empty array to prevent .length error
const providerOfferedServices = ref([])
const providers = ref([]) // ADDED: This was missing and caused the loop error
const selectedProviderId = ref('')
const selectedProviderDoc = ref(null)

// User Info
const name = ref('')
const contact = ref('')
const address = ref('')
const selectedDate = ref(route.query.date || '')
const selectedTime = ref(route.query.time ? decodeURIComponent(route.query.time) : '')

// Payment
const paymentMethod = ref('cash')
const upiId = ref('parveendhillo08-1@okaxis')
const upiScreenshot = ref(null)
const upiQr = ref('')

// DATA MAP
const servicePrices = {
  Plumber: 199,
  Electrician: 249,
  "AC Repair": 399,
  Carpenter: 299,
  Cleaner: 149,
  Mechanic: 349
}

// --- COMPUTED ---

const selectedProvider = computed(() => {
  return selectedProviderDoc.value || { name: 'Expert', services: [] };
});

const totalAmount = computed(() => {
  if (!selectedServices.value) return 0;
  return selectedServices.value.reduce((acc, curr) => acc + (servicePrices[curr] || 0), 0)
})

const isStepValid = computed(() => {
  if (step.value === 1) {
    return name.value && contact.value && address.value && selectedServices.value?.length > 0;
  }
  if (step.value === 2) return !!selectedProviderId.value;
  return true;
})

// --- METHODS ---

// New Method: Fetch all providers for Step 2
const fetchAllProviders = async () => {
  try {
    loading.value = true;

    // Example: Only fetch providers who offer the FIRST selected service
    const currentService = selectedServices.value[0];

    const res = await databases.listDocuments(
      DB_ID,
      PROVIDERS_COLLECTION,
      currentService ? [Query.contains('services', currentService)] : []
    );

    providers.value = res.documents;
  } catch (err) {
    console.error("Fetch Providers Error:", err);
  } finally {
    loading.value = false;
  }
}

const toggleService = (service) => {
  const index = selectedServices.value.indexOf(service)
  if (index > -1) {
    if (selectedServices.value.length > 1) {
      selectedServices.value.splice(index, 1)
    } else {
      toast.info("At least one service must be selected.")
    }
  } else {
    selectedServices.value.push(service)
  }
}

const getProviderDetails = async (id) => {
  if (!id) return;
  try {
    loadingProvider.value = true;
    const doc = await databases.getDocument(DB_ID, PROVIDERS_COLLECTION, id);
    selectedProviderDoc.value = doc;
    selectedProviderId.value = id;
    providerOfferedServices.value = doc.services || [];
  } catch (err) {
    console.error("Fetch Provider Error:", err);
  } finally {
    loadingProvider.value = false;
  }
}

const generateUPIQR = async () => {
  if (paymentMethod.value !== 'upi') return
  const remark = `SkillLink-${contact.value || 'Booking'}`
  const upiURL = `upi://pay?pa=${upiId.value}&pn=SkillLink&am=${totalAmount.value}&cu=INR&tn=${remark}`
  try {
    upiQr.value = await QRCode.toDataURL(upiURL)
  } catch (err) {
    console.error("QR Error:", err)
  }
}

watch([totalAmount, paymentMethod], generateUPIQR)

// Watch for provider change to update details
watch(selectedProviderId, (newId) => {
  if (newId) getProviderDetails(newId);
})

const nextStep = () => {
  if (isStepValid.value) step.value++
}

const onUPIScreenshotChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    upiScreenshot.value = file
    toast.success("Screenshot attached!")
  }
}

const isFormValid = () => {
  return name.value && contact.value && address.value &&
    selectedServices.value?.length > 0 &&
    selectedDate.value && selectedTime.value &&
    selectedProviderId.value &&
    (paymentMethod.value === 'cash' || upiScreenshot.value);
}

const confirmBooking = async () => {
  if (!isFormValid()) return toast.warn("Please complete all details.")

  loading.value = true
  try {
    const user = await account.get()
    let fileId = null

    if (paymentMethod.value === 'upi' && upiScreenshot.value) {
      const upload = await storage.createFile(BUCKET_ID, ID.unique(), upiScreenshot.value)
      fileId = upload.$id
    }

    const bookingData = {
      userId: user.$id,
      userName: name.value,
      contact: contact.value,
      address: address.value,
      service: selectedServices.value.join(', '),
      providerId: selectedProviderId.value,
      providerName: selectedProvider.value.name,
      price: totalAmount.value,
      date: selectedDate.value,
      time: selectedTime.value,
      paymentMethod: paymentMethod.value,
      paymentStatus: paymentMethod.value === 'cash' ? 'pending' : 'awaiting_verification',
      screenshotId: fileId
    }

    const response = await databases.createDocument(DB_ID, BOOKINGS_COLLECTION, ID.unique(), bookingData)
    toast.success("Booking Confirmed!")

    // CRITICAL CHANGE: Use .replace() instead of .push()
    // This removes the "Form" from the browser's back-button history.
    router.replace({
      name: 'BookingConfirm',
      query: { bookingId: response.$id }
    })

  } catch (err) {
    toast.error("Booking failed: " + err.message)
  } finally {
    loading.value = false
  }
}

// --- LIFECYCLE ---
onMounted(async () => {
  // Check Auth
  try {
    const user = await account.get()
    currentUser.value = user
    if (!name.value) name.value = user.name
  } catch {
    router.push('/login')
    return
  }

  // Handle Query Params
  const { service, providerId } = route.query
  if (service) selectedServices.value = [service]

  // Always fetch provider list so Step 2 isn't empty
  await fetchAllProviders();

  if (providerId) {
    await getProviderDetails(providerId)
  }
})
</script>
<style scoped>
.premium-input {
  @apply w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-medium transition-all focus:bg-white focus:border-[#0289b7] focus:ring-4 focus:ring-blue-50/50 outline-none placeholder:text-slate-300;
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>