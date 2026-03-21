<template>
  <div class="min-h-screen bg-[#F0F9FF] flex justify-center py-8 px-4">
    <div class="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6">

      <div class="flex justify-center mb-2">
        <img src="@/assets/skilllogo.png" alt="SkillLink Logo" class="w-20 h-20" />
      </div>
      <h2 class="text-3xl font-bold bg-gradient-to-r from-[#3B8D99] to-[#f46675] bg-clip-text text-transparent text-center mb-6">
        Your Expert is a Click Away
      </h2>

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

      <div v-if="!hasPrefilledProvider && providers.length">
        <label class="block text-gray-700 font-semibold mb-3 text-lg">Select Provider</label>
        <div class="flex flex-col gap-4">
          <div v-for="provider in providers" :key="provider.$id" @click="selectedProviderId = provider.$id" 
            class="p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex justify-between items-center shadow-sm hover:shadow-lg bg-white" 
            :class="selectedProviderId === provider.$id ? 'border-blue-600 bg-blue-50 scale-[1.02]' : 'border-gray-300 hover:border-blue-400'">
            <div>
              <p class="font-semibold text-gray-800 text-base">{{ provider.name }}</p>
              <p class="text-sm text-gray-500 mt-1">{{ provider.address }}</p>
            </div>
            <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition"
              :class="selectedProviderId === provider.$id ? 'border-blue-600' : 'border-gray-400'">
              <div v-if="selectedProviderId === provider.$id" class="w-3 h-3 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <input type="text" v-model="name" placeholder="Your Name" class="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]" />
        <input type="tel" v-model="contact" placeholder="Contact Number" class="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]" />
        <textarea v-model="address" placeholder="Address" rows="2" class="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"></textarea>
      </div>

      <div>
        <label class="block text-gray-700 font-medium mb-2">Payment Method</label>
        <div class="flex gap-4">
          <div @click="paymentMethod = 'cash'" :class="paymentMethod === 'cash' ? 'bg-blue-50 border-blue-600 shadow-lg' : 'border-gray-300 hover:shadow-md'"
            class="flex-1 p-3 rounded-xl text-center cursor-pointer flex flex-col items-center gap-1 transition">
            <span class="text-xl">💵</span>
            <span>Cash on Service</span>
          </div>
          <div @click="paymentMethod = 'upi'" :class="paymentMethod === 'upi' ? 'border-blue-600 bg-blue-50 shadow-lg' : 'border-gray-300 hover:shadow-md'"
            class="flex-1 p-3 rounded-xl text-center cursor-pointer flex flex-col items-center gap-1 transition">
            <span>🏦 UPI / Bank</span>
          </div>
        </div>

        <div v-if="paymentMethod === 'upi'" class="mt-3 p-4 border rounded-xl bg-gray-50 text-center space-y-3">
          <p class="text-sm text-gray-700">
            Step 1: Send ₹<strong>{{ getSelectedPrice() }}</strong> to UPI: <strong>{{ upiId }}</strong><br>
            Step 2: Add Remark: <strong>{{ contact || 'Your Phone' }}</strong><br>
            Step 3: Upload payment screenshot
          </p>

          <img :src="upiQr" alt="UPI QR Code" class="w-40 h-40 mx-auto mt-2 rounded-lg border bg-white" />

          <label class="mt-2 block cursor-pointer text-sm text-[#0073b1] font-semibold bg-blue-50 p-3 rounded-lg border border-blue-200 hover:bg-blue-100 transition">
            <i class="fas fa-upload mr-2"></i> Upload Screenshot
            <input type="file" @change="onUPIScreenshotChange" class="hidden" accept="image/*" />
          </label>

          <div v-if="upiScreenshotURL" class="mt-2 p-2 bg-white rounded-lg border">
            <p class="text-xs text-gray-500 mb-1">Preview:</p>
            <img :src="upiScreenshotURL" class="w-32 h-32 mx-auto rounded-md object-cover border" />
          </div>
        </div>
      </div>

      <div class="p-4 border rounded-xl bg-gray-50 space-y-2 text-sm">
        <div class="flex justify-between">
          <span class="text-gray-500">Service:</span>
          <span class="font-semibold text-gray-800">{{ selectedService || '-' }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">Provider:</span>
          <span class="font-semibold text-gray-800">{{ selectedProvider.name || '-' }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">Schedule:</span>
          <span class="font-semibold text-gray-800">{{ selectedDate }} | {{ selectedTime }}</span>
        </div>
        <div class="border-t pt-2 flex justify-between text-base">
          <span class="font-bold text-gray-700">Total:</span>
          <span class="font-bold text-[#0289b7]">₹{{ getSelectedPrice() }}</span>
        </div>
      </div>

      <button :disabled="loading || !isFormValid()" @click="confirmBooking"
        class="w-full bg-[#0289b7] text-white py-4 rounded-xl font-bold hover:bg-[#005f6b] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md">
        <i v-if="loading" class="fas fa-spinner fa-spin mr-2"></i>
        {{ loading ? 'Securing Booking...' : `Confirm & Book Now` }}
      </button>

      <p class="text-xs text-gray-400 text-center">
        By clicking, you agree to our service terms. No advance is charged for Cash on Service.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { databases, storage, account, APPWRITE_CONFIG, ID } from '@/appwrite' // Your config
import { Query } from 'appwrite'
import { toast } from 'vue3-toastify'
import QRCode from 'qrcode'

// IDs from your Appwrite Console
const DB_ID = APPWRITE_CONFIG.dbId
const BOOKINGS_COLLECTION = "bookings"; // Change to your actual ID
const PROVIDERS_COLLECTION = APPWRITE_CONFIG.providersCollection;
const BUCKET_ID = APPWRITE_CONFIG.storageBucket;

const router = useRouter()
const route = useRoute()

// State
const loading = ref(false)
const currentUser = ref(null)
const selectedService = ref('')
const selectedProviderId = ref('')
const name = ref('')
const contact = ref('')
const address = ref('')
const selectedDate = ref('')
const selectedTime = ref('')
const total = ref(0)
const availableServices = ref(['Plumber', 'Electrician', 'AC Repair', 'Carpenter', 'Cleaner', 'Mechanic'])
const providers = ref([])

// Payment State
const paymentMethod = ref('cash')
const upiId = ref('parveendhillo08-1@okaxis')
const upiScreenshot = ref(null)
const upiScreenshotURL = ref(null)
const upiQr = ref('')

const servicePrices = { Plumber: 199, Electrician: 249, "AC Repair": 399, Carpenter: 299, Cleaner: 149, Mechanic: 349 }
const getSelectedPrice = () => total.value || servicePrices[selectedService.value] || 0

// QR Generation
const generateUPIQR = async () => {
  if (paymentMethod.value !== 'upi') return
  // Use Contact Number as the remark since $id isn't ready yet
  const remark = `Service-${contact.value}`;
  const upiURL = `upi://pay?pa=${upiId.value}&pn=SkillLink&am=${getSelectedPrice()}&cu=INR&tn=${remark}`
  upiQr.value = await QRCode.toDataURL(upiURL)
}
watch([selectedService, paymentMethod], generateUPIQR)

// Fetch Providers from Appwrite
const fetchProviders = async () => {
  if (!selectedService.value) return;
  
  try {
    loading.value = true;
    
    // We search the 'services' column for the name of the service (e.g., "Painter")
    const res = await databases.listDocuments(
      DB_ID, 
      PROVIDERS_COLLECTION, 
      [
        Query.contains('services', selectedService.value) 
      ]
    );

    providers.value = res.documents;

    // OPTIONAL: Auto-select the first provider if one is found
    // This will fix your "button disabled" issue immediately
    if (providers.value.length > 0 && !selectedProviderId.value) {
      selectedProviderId.value = providers.value[0].$id;
    }

  } catch (err) {
    console.error("Fetch Providers Error:", err);
    toast.error("Could not load providers.");
  } finally {
    loading.value = false;
  }
};

// Function to validate the form before allowing a booking
const isFormValid = () => {
  // Basic Info
  const hasBasicInfo = name.value && contact.value && address.value;
  
  // Service & Provider
  const hasServiceSelection = selectedService.value && selectedProviderId.value;
  
  // Date & Time
  const hasSchedule = selectedDate.value && selectedTime.value;
  
  // Payment Validation
  let isPaymentValid = false;
  if (paymentMethod.value === 'cash') {
    isPaymentValid = true;
  } else if (paymentMethod.value === 'upi') {
    // If UPI, they MUST have uploaded a screenshot
    isPaymentValid = upiScreenshot.value !== null;
  }

  return hasBasicInfo && hasServiceSelection && hasSchedule && isPaymentValid;
};

const confirmBooking = async () => {
  loading.value = true;
  try {
    const user = await account.get();
    let fileId = null;

    // 1. Upload Screenshot if UPI
    if (paymentMethod.value === 'upi' && upiScreenshot.value) {
      const upload = await storage.createFile(BUCKET_ID, ID.unique(), upiScreenshot.value);
      fileId = upload.$id;
    }

    // 2. Create Booking Document
    // Notice: We removed 'bookingId' from this object
    const bookingData = {
      userId: user.$id,
      userName: name.value,
      contact: contact.value,
      address: address.value,
      service: selectedService.value,
      providerId: selectedProviderId.value,
      providerName: selectedProvider.value.name || 'Expert',
      price: getSelectedPrice(),
      date: selectedDate.value,
      time: selectedTime.value,
      paymentMethod: paymentMethod.value,
      paymentStatus: paymentMethod.value === 'cash' ? 'pending' : 'awaiting_verification',
      screenshotId: fileId
    };

    // ID.unique() tells Appwrite to generate the $id for us
    const response = await databases.createDocument(DB_ID, BOOKINGS_COLLECTION, ID.unique(), bookingData);

    // 3. Use response.$id for the success message and routing
    toast.success(`Booking Confirmed! ID: ${response.$id}`);

    router.push({
      name: 'BookingConfirm',
      query: { bookingId: response.$id }
    });

  } catch (err) {
    toast.error("Booking failed: " + err.message);
  } finally {
    loading.value = false;
  }
}

const selectedProvider = computed(() => providers.value.find(p => p.$id === selectedProviderId.value) || {})

onMounted(async () => {
  // 1. Auth Check
  try {
    const user = await account.get();
    currentUser.value = user;
    if (!name.value) name.value = user.name;
  } catch {
    router.push('/login');
  }

  // 2. Extract from your specific URL: 
  // http://localhost:8080/booking?service=Painter&date=2026-03-28&time=10%3A30+AM&total=699...
  const { service, date, time, total: urlTotal, providerId } = route.query;

  if (service) selectedService.value = service;
  if (date) selectedDate.value = date;
  if (time) selectedTime.value = decodeURIComponent(time); // Handles the %3A (colon) and + (space)
  if (urlTotal) total.value = Number(urlTotal);
  
  // If a provider was already selected in the previous page
  if (providerId) {
    selectedProviderId.value = providerId;
  }

  // 3. Fetch the list of providers so the user can select one (if not prefilled)
  if (selectedService.value) {
    await fetchProviders();
  }

  generateUPIQR();
});
</script>