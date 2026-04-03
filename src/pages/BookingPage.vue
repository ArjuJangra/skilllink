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
        <router-link to="/services"
          class="bg-[#0289b7] text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-[#005f6b] transition-all">
          Book Another Service
        </router-link>
        <router-link to="/dashboard"
          class="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all">
          View Dashboard
        </router-link>
      </div>
    </div>

    <div class="max-w-6xl mx-auto py-12 px-6">
      <div class="mb-12">
        <div class="flex items-center justify-between max-w-2xl mx-auto relative">
          <div v-for="n in 2" :key="n" class="z-10 flex flex-col items-center">
            <div :class="[
              'w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition-all duration-500 border-2',
              step >= n ? 'bg-[#0289b7] text-white border-[#0289b7] shadow-xl shadow-blue-100' : 'bg-white text-slate-300 border-slate-100'
            ]">
              <i v-if="step > n" class="fas fa-check text-sm"></i>
              <span v-else class="text-sm">{{ n }}</span>
            </div>
            <span
              :class="['text-[10px] mt-3 font-bold uppercase tracking-[0.15em]', step >= n ? 'text-[#0289b7]' : 'text-slate-400']">
              {{ n === 1 ? 'Details' : 'Payment' }}
            </span>
          </div>
          <div class="absolute top-6 left-0 w-full h-[2px] bg-slate-100 -z-0">
            <div class="h-full bg-[#0289b7] transition-all duration-700"
              :style="{ width: ((step - 1) / 1) * 100 + '%' }"></div>
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
                <input type="text" v-model="name" class="premium-input w-full p-4 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none" placeholder="Full Name" />
              </div>
              <div class="space-y-2">
                <label class="text-[11px] font-bold text-slate-400 uppercase ml-1">Contact Number</label>
                <input type="tel" v-model="contact" class="premium-input w-full p-4 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none" placeholder="Phone Number" />
              </div>
              <div class="md:col-span-2 space-y-2">
                <label class="text-[11px] font-bold text-slate-400 uppercase ml-1">Service Address</label>
                <textarea v-model="address" rows="2" class="premium-input w-full p-4 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none" placeholder="Detailed Address"></textarea>
              </div>
            </div>

            <div class="pt-8 border-t border-slate-50">
              <label class="text-xs font-bold text-slate-500 uppercase mb-6 block">Select Expert</label>
              <div v-if="loading" class="space-y-4">
                <div v-for="i in 3" :key="i" class="h-24 bg-slate-50 rounded-3xl animate-pulse"></div>
              </div>
              <div v-else class="space-y-4">
                <div v-for="provider in providers" :key="provider.$id" @click="getProviderDetails(provider.$id)"
                  class="p-5 rounded-3xl border-2 cursor-pointer transition-all" :class="selectedProviderId === provider.$id ? 'border-[#0289b7] bg-blue-50/40' : 'border-slate-100 hover:border-slate-200'">
                  <div class="flex justify-between items-center">
                    <div>
                      <p class="font-bold text-slate-900">{{ provider.name }}</p>
                      <p class="text-xs text-slate-400">{{ provider.area }}</p>
                    </div>
                    <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                      :class="selectedProviderId === provider.$id ? 'bg-[#0289b7] border-[#0289b7]' : 'border-slate-200'">
                      <i v-if="selectedProviderId === provider.$id" class="fas fa-check text-white text-[10px]"></i>
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
                <i class="fas fa-wallet"></i>
              </div>
              <h3 class="text-xl font-black text-slate-900">Choose Payment Method</h3>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              <div @click="paymentMethod = 'razorpay'"
                :class="paymentMethod === 'razorpay' ? 'border-[#0289b7] bg-blue-50/50 shadow-lg shadow-blue-50' : 'border-slate-50 bg-slate-50/20'"
                class="border-2 p-6 rounded-3xl cursor-pointer transition-all flex items-center gap-5 relative overflow-hidden group">
                <div class="text-3xl transition-transform group-hover:scale-110">💳</div>
                <div>
                  <p class="font-bold text-slate-900">Pay Online</p>
                  <p class="text-[10px] text-[#0289b7] uppercase font-black tracking-widest">Cards / UPI / Netbanking</p>
                </div>
                <div v-if="paymentMethod === 'razorpay'" class="absolute -right-2 -top-2 bg-[#0289b7] text-white p-2 rounded-bl-xl">
                  <i class="fas fa-check text-[10px]"></i>
                </div>
              </div>

              <div @click="paymentMethod = 'cash'"
                :class="paymentMethod === 'cash' ? 'border-slate-900 bg-slate-50' : 'border-slate-50 bg-slate-50/20'"
                class="border-2 p-6 rounded-3xl cursor-pointer transition-all flex items-center gap-5 relative overflow-hidden group">
                <div class="text-3xl transition-transform group-hover:scale-110">💵</div>
                <div>
                  <p class="font-bold text-slate-900">Cash After Service</p>
                  
                </div>
                <div v-if="paymentMethod === 'cash'" class="absolute -right-2 -top-2 bg-slate-900 text-white p-2 rounded-bl-xl">
                  <i class="fas fa-check text-[10px]"></i>
                </div>
              </div>
            </div>

            <div class="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center gap-4">
              <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-500 shadow-sm">
                <i class="fas fa-lock"></i>
              </div>
              <div>
                <p class="text-xs font-bold text-slate-800">Secure Checkout</p>
                <p class="text-[10px] text-slate-500">Your transaction is encrypted and secured by Razorpay & SkillLink Guarantee.</p>
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center pt-6 px-2">
            <button v-if="step > 1" @click="step--"
              class="text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-900 transition flex items-center gap-2">
              <i class="fas fa-chevron-left"></i> Go Back
            </button>
            <div v-else></div>

            <button v-if="step === 1" @click="nextStep" :disabled="!isStepValid"
              class="bg-[#0289b7] text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-blue-100 hover:shadow-blue-200 hover:-translate-y-0.5 transition-all disabled:opacity-30">
              Select Payment Method <i class="fas fa-chevron-right ml-2 text-[10px]"></i>
            </button>

            <button v-else @click="confirmBooking" :disabled="loading || !isFormValid()"
              :class="paymentMethod === 'razorpay' ? 'bg-[#0289b7]' : 'bg-slate-900'"
              class="text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-widest shadow-2xl transition-all disabled:opacity-30 flex items-center gap-3">
              <i v-if="loading" class="fas fa-spinner fa-spin"></i>
              <i v-else :class="paymentMethod === 'razorpay' ? 'fas fa-credit-card' : 'fas fa-check-circle'"></i>
              {{ loading ? 'Securing...' : (paymentMethod === 'razorpay' ? 'Pay & Book' : 'Confirm COD') }}
            </button>
          </div>
        </div>

        <div class="lg:col-span-4">
          <div class="bg-white rounded-[2.5rem] border border-slate-100 p-8 sticky top-24 shadow-sm">
            <h4 class="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-8 pb-4 border-b border-slate-50">Summary</h4>

            <div class="space-y-6">
              <div>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Service</p>
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
                Verified professionals only. No hidden charges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { databases, account, APPWRITE_CONFIG, ID } from '@/appwrite'
import { Query } from 'appwrite'
import { toast } from 'vue3-toastify'
// Removed QRCode import as we are moving to Razorpay
import AppNavbar from '@/components/AppNavbar.vue'

// --- CONFIG & ROUTING ---
const router = useRouter()
const route = useRoute()
const DB_ID = APPWRITE_CONFIG.dbId
const BOOKINGS_COLLECTION = "bookings"
const PROVIDERS_COLLECTION = APPWRITE_CONFIG.providersCollection

// --- STATE ---
const step = ref(1)
const loading = ref(false)
const loadingProvider = ref(false)
const currentUser = ref(null)

// Service Selection
const selectedServices = ref([]) 
const providerOfferedServices = ref([])
const providers = ref([]) 
const selectedProviderId = ref('')
const selectedProviderDoc = ref(null)

// User Info
const name = ref('')
const contact = ref('')
const address = ref('')
const selectedDate = ref(route.query.date || '')
const selectedTime = ref(route.query.time ? decodeURIComponent(route.query.time) : '')

// Payment - UPDATED for Razorpay/Cash
const paymentMethod = ref('cash') 

// DATA MAP (Pricing from 2026 Noida market rates)
const servicePrices = {
  Plumber: 199,
  Electrician: 249,
  "AC Repair": 399,
  Carpenter: 299,
  Cleaner: 149,
  Mechanic: 349,
  Welder: 499,
  "House Cleaner": 449,
}

// --- COMPUTED ---

const selectedProvider = computed(() => {
  return selectedProviderDoc.value || { name: 'Expert', services: [] };
});

const totalAmount = computed(() => {
  if (!selectedServices.value || selectedServices.value.length === 0) return 0;
  return selectedServices.value.reduce((acc, curr) => {
    const price = servicePrices[curr] || 0;
    return acc + price;
  }, 0);
})

const isStepValid = computed(() => {
  if (step.value === 1) {
    return name.value && 
           contact.value && 
           address.value &&
           selectedProviderId.value && // Did you click on an expert's name?
           selectedServices.value.length > 0 // Is at least one service selected?
  }
  return true
})

const nextStep = () => {
  if (!isStepValid.value) {
    toast.warn("Please select an expert and fill all details.");
    return;
  }
  step.value = 2; // This is what actually changes the screen
}

// --- METHODS ---

const fetchAllProviders = async () => {
  try {
    loading.value = true;
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

// --- RAZORPAY INTEGRATION ---
const initRazorpayPayment = () => {
  return new Promise((resolve, reject) => {
    // 1. Check if Razorpay script is loaded
    if (!window.Razorpay) {
      toast.error("Razorpay SDK failed to load. Check your internet connection.");
      reject(new Error("Razorpay SDK not found"));
      return;
    }

    const options = {
      key: "rzp_test_SZ7GYtrvpS6XK1", // Replace with your ACTUAL Test Key ID
      amount: totalAmount.value * 100, // Razorpay expects paise (₹1 = 100 paise)
      currency: "INR",
      name: "SkillLink Noida",
      description: `Booking for ${selectedServices.value.join(', ')}`,
      image: "https://your-logo-url.com/logo.png", // Optional: link to your logo
      
      // The handler function runs after a successful payment
      handler: (response) => {
        console.log("Payment Successful:", response.razorpay_payment_id);
        resolve(response.razorpay_payment_id);
      },
      
      // Prefill user data so they don't have to type it again in the popup
      prefill: {
        name: name.value,
        contact: contact.value,
        email: currentUser.value?.email || "test@example.com"
      },
      
      notes: {
        address: address.value,
        provider_id: selectedProviderId.value
      },
      
      theme: {
        color: "#0289b7" // Your SkillLink Brand Blue
      },
      
      modal: {
        ondismiss: () => {
          loading.value = false;
          toast.info("Payment cancelled. You can try again or choose Cash.");
          reject(new Error("User cancelled payment"));
        }
      }
    };

    try {
      const rzp = new window.Razorpay(options);
      
      // Handle payment failures (e.g., wrong OTP, insufficient funds)
      rzp.on('payment.failed', (response) => {
        toast.error(`Payment Failed: ${response.error.description}`);
        reject(new Error(response.error.description));
      });

      rzp.open();
    } catch (err) {
      console.error("Razorpay initialization error:", err);
      reject(err);
    }
  });
};

const isFormValid = () => {
  return name.value && contact.value && address.value &&
    selectedServices.value?.length > 0 &&
    selectedDate.value && selectedTime.value &&
    selectedProviderId.value;
}

const confirmBooking = async () => {
  if (!isFormValid()) return toast.warn("Please complete all details.")

  loading.value = true
  try {
    let paymentId = null;
    let paymentStatus = 'pending';

    // Logic Switch: Razorpay vs Cash
    if (paymentMethod.value === 'razorpay') {
      paymentId = await initRazorpayPayment();
      paymentStatus = 'paid';
    } else {
      // Cash on Delivery
      paymentStatus = 'cod_pending';
    }

    const bookingData = {
      userId: currentUser.value.$id,
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
      paymentStatus: paymentStatus,
      razorpayPaymentId: paymentId, // Store the reference
      status: 'Pending'
    }

    const response = await databases.createDocument(DB_ID, BOOKINGS_COLLECTION, ID.unique(), bookingData)
    toast.success("Booking Confirmed!")

    router.replace({
      name: 'BookingConfirm',
      query: { bookingId: response.$id }
    })

  } catch (err) {
    console.error(err);
    toast.error("Booking failed: " + err.message)
  } finally {
    loading.value = false
  }
}

// --- LIFECYCLE ---
onMounted(async () => {
  try {
    const user = await account.get()
    currentUser.value = user
    if (!name.value) name.value = user.name
  } catch {
    router.push('/login')
    return
  }

  const { service, total, providerId, date, time } = route.query

  if (service) {
    selectedServices.value = [service]
    if (total) {
      servicePrices[service] = parseFloat(total)
    }
  }

  if (date) selectedDate.value = date
  if (time) selectedTime.value = decodeURIComponent(time)

  await fetchAllProviders()

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