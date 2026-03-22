<template>

  <div class="min-h-screen bg-gradient-to-b from-[#EAF6FF] to-white">
    <div class="sticky top-0 z-30 h-1 w-full bg-gradient-to-r from-[#00B4D8] via-[#48CAE4] to-[#0096C7]"></div>
    <AppNavbar />

    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-6 lg:py-10">
      <!-- Header / Breadcrumb -->
      <div class="text-sm text-gray-500 mb-4 flex items-center gap-2 flex-wrap">
        <router-link to="/home"
          class="hover:text-[#007EA7] transition-colors duration-200 font-medium flex items-center gap-1">
          <i class="fas fa-home text-xs"></i> Home
        </router-link>
        <span class="text-gray-400">/</span>
        <span class="capitalize font-medium text-gray-500">
          {{ category || 'Service' }}
        </span>
        <span class="text-gray-400">/</span>
        <span class="text-gray-700 font-semibold line-clamp-1" :title="title || 'Detail'">
          {{ title || 'Detail' }}
        </span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- LEFT: Gallery + Overview + tiers + addons + reviews etc -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Image / Carousel -->
          <div class="service-gallery group/container max-w-4xl mx-auto">
            <div
              class="relative overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl">

              <div class="absolute top-5 left-5 z-20 flex flex-col gap-2">
                <span
                  class="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-md border border-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest text-[#FF3F6C] shadow-sm">
                  <i class="fas fa-award mr-1.5"></i> Top Rated
                </span>
                <span
                  class="inline-flex items-center px-3 py-1 bg-[#14C2AD] text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                  Bestseller
                </span>
              </div>

              <div class="relative aspect-square sm:aspect-video lg:aspect-[3/2] max-h-[650px] overflow-hidden">
                <transition name="fade-slide" mode="out-in">
                  <img :key="currentIndex" v-if="activeMedia?.src" :src="activeMedia.src" :alt="title"
                    class="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover/container:scale-105"
                    @error="handleImageError" />
                </transition>

                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80">
                </div>

                <div
                  class="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover/container:opacity-100 transition-opacity duration-300">
                  <button @click="prevMedia" class="nav-arrow-btn">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button @click="nextMedia" class="nav-arrow-btn">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div class="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div class="space-y-1">
                    <p class="text-[10px] text-white/70 font-black uppercase tracking-[0.2em]">Service Insight</p>
                    <h1 class="text-white text-2xl md:text-3xl font-black uppercase tracking-tight">{{ title }}</h1>
                  </div>

                  <div
                    class="px-3 py-1 bg-black/30 backdrop-blur-md rounded-full text-white/90 text-[11px] font-bold tracking-tighter">
                    {{ currentIndex + 1 }} / {{ media.length }}
                  </div>
                </div>
              </div>
            </div>

            <div class="flex gap-3 mt-4 overflow-x-auto no-scrollbar pb-2">
              <button v-for="(m, i) in media" :key="m.key" @click="currentIndex = i"
                class="relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300"
                :class="currentIndex === i ? 'border-[#FF3F6C] scale-95 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'">
                <img :src="m.src" class="w-full h-full object-cover" />
                <div v-if="currentIndex === i" class="absolute inset-0 bg-[#FF3F6C]/10"></div>
              </button>
            </div>
          </div>

          <!-- Overview Section -->
          <div class="bg-white rounded-2xl shadow p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-2">Overview</h2>
            <p class="text-gray-700 leading-relaxed mb-4">{{ desc }}</p>

            <!-- 🔽 Sub-Services Section -->
            <div v-if="subServices.length" class="mt-4">
              <h3 class="text-lg font-semibold text-gray-800 mb-3">Available Sub-Services</h3>

              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <button v-for="(item, idx) in subServices" :key="idx" @click="selectSubService(item)"
                  class="p-4 rounded-xl border text-left transition hover:shadow-md" :class="selectedSubService?.id === item.id
                    ? 'border-[#00B4D8] bg-[#E0F7FF]'
                    : 'border-gray-200 bg-white'">
                  <div class="font-semibold text-gray-800">{{ item.name }}</div>
                  <p class="text-xs text-gray-600 mt-1 line-clamp-2">
                    {{ item.description }}
                  </p>
                  <div class="mt-2 text-[#00B4D8] font-medium text-sm">
                    Starting ₹{{ item.tiers[0]?.price || item.price }}
                  </div>
                </button>
              </div>

              <!--  Selected Sub-Service Summary -->
              <div v-if="selectedSubService"
                class="mt-4 bg-[#E0F7FF] border border-[#00B4D8] text-gray-800 rounded-xl p-4">
                <div class="font-semibold text-lg">
                  Selected: {{ selectedSubService.name }}
                </div>
                <p class="text-sm text-gray-600 mt-1">
                  {{ selectedSubService.description }}
                </p>
                <div class="text-[#00B4D8] font-medium mt-1">
                  Starting ₹{{ selectedSubService.tiers[0]?.price || selectedSubService.price }}
                </div>
              </div>
            </div>

            <div v-else class="text-gray-400 text-sm text-center py-3">
              No sub-services available for {{ category }}
            </div>

            <!-- Rest of Overview -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div class="card-soft">
                <div class="card-title">Estimated Time</div>
                <div class="card-text">60–100 minutes</div>
              </div>
              <div class="card-soft">
                <div class="card-title">Typical Cost</div>
                <div class="card-text">₹300 – ₹1000</div>
              </div>
              <div class="card-soft">
                <div class="card-title">Included</div>
                <div class="card-text">Visit, Inspection, Basic Service</div>
              </div>
            </div>
          </div>

          <!-- Package / Tier Selection -->
          <div class="bg-white rounded-2xl shadow p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-gray-900">Packages</h2>
              <span class="text-xs text-gray-500">Tap to select</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button v-for="tier in tiers" :key="tier.name" @click="selectTier(tier)"
                class="tier p-5 rounded-xl border transition-transform duration-200 hover:scale-105 focus:outline-none"
                :class="selectedTier.name === tier.name
                  ? 'ring-2 ring-[#00B4D8] bg-[#E0F7FF] shadow-lg'
                  : 'border-gray-200 hover:shadow-md'">
                <div class="flex items-center justify-between mb-2">
                  <div class="text-lg font-semibold text-gray-800">{{ tier.name }}</div>
                  <div class="text-gray-900 font-bold">₹{{ tier.price }}</div>
                </div>
                <ul class="space-y-1 text-sm text-gray-600">
                  <li v-for="p in tier.points" :key="p" class="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mt-1 text-emerald-500" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{{ p }}</span>
                  </li>
                </ul>
              </button>
            </div>

            <!-- Addons & Quantity -->
            <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 rounded-xl bg-gray-50 space-y-2">
                <div class="font-semibold text-gray-800 mb-2">Add-ons</div>
                <label v-for="addon in addons" :key="addon.key"
                  class="flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors duration-150"
                  :class="addon.selected ? 'bg-gray-100 border border-[#00B4D8]' : 'hover:bg-gray-100'">
                  <div class="flex items-center gap-3">
                    <input type="checkbox" v-model="addon.selected" class="accent-[#37adf6]" />
                    <span class="text-gray-700">{{ addon.label }}</span>
                  </div>
                  <span class="text-gray-800 font-medium">+ ₹{{ addon.price }}</span>
                </label>
              </div>

              <div class="p-4 rounded-xl bg-gray-50">
                <div class="font-semibold text-gray-800 mb-2">Quantity</div>
                <div class="flex items-center gap-3">
                  <button @click="qty = Math.max(1, qty - 1)"
                    class="w-8 h-8 rounded-lg border text-gray-700 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed">−</button>
                  <div class="w-12 text-center font-semibold">{{ qty }}</div>
                  <button @click="qty++"
                    class="w-8 h-8 rounded-lg border text-gray-700 hover:bg-gray-100 transition">+</button>
                </div>

                <div class="mt-4">
                  <label class="block text-sm text-gray-600 mb-1">Coupon</label>
                  <div class="flex gap-2">
                    <input v-model="couponCode" placeholder="e.g. WELCOME10" class="input flex-1" />
                    <button @click="applyCoupon" class="btn-secondary px-4">Apply</button>
                  </div>
                  <p v-if="couponMessage" class="text-xs mt-1 font-medium"
                    :class="couponValid ? 'text-green-600' : 'text-red-600'">
                    {{ couponMessage }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Availability / Slot Selection -->
          <div class="bg-white rounded-2xl shadow p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Availability</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-gray-600 mb-1">Select Date</label>
                <input type="date" class="input w-full" :min="today" :max="maxDate" v-model="selectedDate" />
              </div>

              <div>
                <label class="block text-sm text-gray-600 mb-1">Select Time</label>
                <select class="input w-full" v-model="selectedTime" :disabled="!selectedDate" @change="calculateSurge">
                  <option disabled value="">Choose a slot</option>
                  <option v-for="slot in timeSlots" :key="slot" :value="slot" :disabled="isSlotBooked(slot)"
                    :class="isSlotBooked(slot) ? 'text-gray-400 line-through' : ''">
                    {{ slot }}
                  </option>
                </select>
              </div>
            </div>
            <p v-if="selectedDate && selectedTime" class="text-sm text-gray-700 mt-2">
              You selected: <strong>{{ selectedDate }}</strong> at <strong>{{ selectedTime }}</strong>
            </p>
            <p class="text-xs text-gray-500 mt-2">* Real-time slots can be fetched from your API later.</p>
          </div>

          <!-- Reviews & Ratings -->
          <div class="bg-white rounded-2xl shadow p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Customer Reviews</h2>

            <section class="reviews mt-8">
              <div class="flex items-center gap-2 mb-4">
                <div class="text-2xl font-extrabold text-amber-500">{{ rating.toFixed(1) }} ★</div>
                <div class="text-xs text-gray-500">Based on {{ reviews.length }} reviews</div>
              </div>

              <div class="mb-6 p-4 bg-gray-50 rounded-xl space-y-3">
                <div class="flex items-center gap-2">
                  <input v-model="newReview.user" placeholder="Your Name" class="input w-full" />
                  <input type="file" @change="onFileChange" />
                </div>
                <div class="flex items-center gap-1">
                  <span v-for="n in 5" :key="n" @click="setStarRating(n)" class="cursor-pointer text-amber-400 text-xl">
                    {{ n <= newReview.stars ? '★' : '☆' }} </span>
                </div>
                <textarea v-model="newReview.text" placeholder="Write your review..." class="input w-full"></textarea>
                <button @click="submitReview" :disabled="!newReview.user || !newReview.stars || !newReview.text"
                  class="btn-primary w-80 disabled:opacity-50">
                  Submit Review
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div class="space-y-2">
                  <div v-for="star in [5, 4, 3, 2, 1]" :key="star" class="flex items-center gap-3">
                    <div class="w-12 text-sm text-gray-600">{{ star }}★</div>
                    <div class="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div class="h-2 bg-amber-400 duration-500" :style="{ width: ratingBarWidth(star) + '%' }"></div>
                    </div>
                    <div class="w-10 text-right text-xs text-gray-500">{{ ratingCounts[star] || 0 }}</div>
                  </div>
                </div>
                <div class="p-4 rounded-xl bg-gray-50">
                  <div class="font-semibold text-gray-800 mb-2">What people like</div>
                  <ul class="text-sm text-gray-700 space-y-1">
                    <li v-for="pro in reviewPros" :key="pro">• {{ pro }}</li>
                  </ul>
                </div>
              </div>

              <div v-if="reviews.length">
                <div v-for="r in filteredReviews" :key="r.id"
                  class="flex items-start gap-4 p-4 border-b border-gray-200">
                  <img :src="r.userAvatar || defaultAvatar" alt="User Avatar"
                    class="w-12 h-12 rounded-full object-cover" @error="handleImageError" />
                  <div class="flex-1">
                    <div class="flex items-center justify-between">
                      <h3 class="font-medium">{{ r.user }}</h3>
                      <span class="text-sm text-gray-500">{{ r.date }}</span>
                    </div>
                    <div class="flex items-center mt-1 text-yellow-500">
                      <span v-for="s in 5" :key="s">
                        <i :class="s <= r.stars ? 'fas fa-star' : 'far fa-star'"></i>
                      </span>
                    </div>
                    <p class="mt-2 text-gray-700">{{ r.text }}</p>
                  </div>
                </div>
                <div v-if="showAllReviewsBtn" class="text-center mt-2">
                  <button @click="showAllReviews = true" class="text-blue-500 hover:underline">
                    Show all reviews
                  </button>
                </div>
              </div>
              <div v-else class="text-gray-500 italic">No reviews yet. Be the first to add one!</div>
            </section>
          </div>
          
          <RelatedServices v-if="category" :category="category" :currentServiceId="$route.query.id" />

          <div class="h-20"></div>
        </div>

        <!-- RIGHT: Booking summary / cost -->
        <div class="lg:col-span-1">
          <div class="sticky top-4">
            <div class="bg-white rounded-2xl shadow p-6">
              <div class="flex items-center justify-between">
                <div class="text-lg font-bold text-gray-900">Your Selection</div>
                <div class="text-sm text-gray-500 capitalize">{{ category }}</div>
              </div>

              <div class="mt-4 space-y-2 text-sm text-gray-700">
                <div class="flex justify-between">
                  <span>Tier</span>
                  <span class="font-medium">{{ selectedTier.name || "Not selected" }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Quantity</span>
                  <span class="font-medium">{{ qty }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Add-ons</span>
                  <span class="font-medium">
                    <template v-if="selectedAddons.length">{{selectedAddons.map(a => a.label).join(', ')}}</template>
                    <template v-else>None</template>
                  </span>
                </div>
                <div class="flex justify-between">
                  <span>Date</span>
                  <span class="font-medium">{{ selectedDate || 'Not set' }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Time</span>
                  <span class="font-medium">{{ selectedTime || 'Not set' }}</span>
                </div>
              </div>

              <div class="border-t mt-4 pt-4 space-y-2 text-sm">
                <div class="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{{ subtotal }}</span>
                </div>
                <div class="flex justify-between" v-if="discountAmount > 0">
                  <span>Discount</span>
                  <span class="text-emerald-600">− ₹{{ discountAmount }}</span>
                </div>
                <div class="flex justify-between font-bold text-gray-900 text-base">
                  <span>Total</span>
                  <span>₹{{ total }}</span>
                </div>
              </div>

              <button class="mt-4 btn-primary w-full" :disabled="!canBook" @click="goToBooking">
                Proceed To Booking — ₹{{ total }}
              </button>

              <p v-if="!canBook" class="text-xs text-red-600 mt-2">Please pick a package, date & time to continue.</p>

              <div class="text-xs text-gray-500 mt-3">No advance charged. Pay after service confirmation.</div>
            </div>
          </div>
        </div>


      </div>

    </div>

    <!-- Sticky bottom CTA on mobile -->
    <div class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t">
      <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <div class="text-xs text-gray-500">Total</div>
          <div class="text-lg font-bold">₹{{ total }}</div>
        </div>
        <button class="btn-primary" :disabled="!canBook" @click="goToBooking">
          Proceed to Booking
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AppNavbar from '@/components/AppNavbar.vue';
import RelatedServices from '@/components/RelatedServices.vue';
import { databases, storage, APPWRITE_CONFIG } from '@/appwrite';
//import { Query } from 'appwrite';

export default {
  components: {
    AppNavbar,
    RelatedServices
  },
  name: "ServiceDetail",
  props: {
    defaultAvatar: { type: String, default: "/images/default-user.png" },
  },

  data() {
    return {
      // Appwrite State
      loading: true,
      serviceId: null,

      // Core Service Data
      title: "",
      desc: "",
      category: "",
      media: [],
      currentIndex: 0,

      // Pricing tiers (preserved)
      tiers: [
        { name: "Basic", price: 399, points: ["Inspection", "Minor fixes", "30-day support"] },
        { name: "Standard", price: 699, points: ["Includes Basic", "Material support", "Priority scheduling"] },
        { name: "Premium", price: 999, points: ["Includes Standard", "Deep service", "90-day support"] },
      ],
      subServices: [
        {
          id: 1,
          category: "Carpenter",
          name: "Door Installation",
          description: "Install a single wooden door (labor only)",
          price: 299,
          tiers: [
            { name: "Basic", price: 299 },
            { name: "Premium", price: 499 },
          ],
        },
        {
          id: 2,
          category: "Carpenter",
          name: "Bed Repair",
          description: "Fix broken joints or tighten loose slats.",
          price: 249,
          tiers: [
            { name: "Basic", price: 249 },
            { name: "Premium", price: 449 },
          ],
        },
        {
          id: 3,
          category: "Carpenter",
          name: "Cupboard Hinge Fixing",
          description: "Adjust or replace cabinet hinges for smooth movement.",
          price: 199,
          tiers: [
            { name: "Basic", price: 199 },
            { name: "Premium", price: 399 },
          ],
        },
      ],

      selectedTier: { name: "", price: 0, points: [] },
      pricingCatalog: {
        "Carpenter": {
          tiers: [
            { name: "Basic", price: 249, details: ["1-hour visit", "Minor furniture fix"] },
            { name: "Standard", price: 499, details: ["Up to 3-hour service", "Includes tools & materials"] },
            { name: "Premium", price: 799, details: ["Full-day carpenter", "Custom furniture repair"] }
          ],
          addons: [
            { key: "material", label: "Material cost (per use)", price: 99 },
            { key: "urgent", label: "Same-day booking", price: 149 }
          ]
        },

        "Electrician": {
          tiers: [
            { name: "Inspection", price: 149, details: ["1-hour visit", "Basic check-up & estimate"] },
            { name: "Repair", price: 299, details: ["Switch, fan, light, socket repairs"] },
            { name: "Full Setup", price: 599, details: ["New wiring, inverter, heavy appliances"] }
          ],
          addons: [
            { key: "material", label: "Extra materials", price: 99 },
            { key: "urgent", label: "Emergency call (within 2hr)", price: 199 }
          ]
        },

        "Plumber": {
          tiers: [
            { name: "Basic", price: 199, details: ["Minor leak, tap fix"] },
            { name: "Standard", price: 349, details: ["Fittings, pipe replacement"] },
            { name: "Premium", price: 599, details: ["Bathroom repair, water tank, motor fix"] }
          ],
          addons: [
            { key: "material", label: "Material charges", price: 149 },
            { key: "urgent", label: "Express plumber", price: 199 }
          ]
        },

        "AC-Appliance Repair": {
          tiers: [
            { name: "Inspection", price: 199, details: ["Basic inspection & diagnosis"] },
            { name: "Service", price: 399, details: ["General service & filter cleaning"] },
            { name: "Repair", price: 799, details: ["Gas refill / part replacement"] }
          ],
          addons: [
            { key: "gas", label: "Gas refill", price: 499 },
            { key: "urgent", label: "Same-day repair", price: 249 }
          ]
        },

        "House Cleaner": {
          tiers: [
            { name: "Basic Clean", price: 199, details: ["1BHK - broom, mop, dusting"] },
            { name: "Deep Clean", price: 399, details: ["Includes bathroom & kitchen cleaning"] },
            { name: "Premium Clean", price: 699, details: ["Full home sanitation + sofa cleaning"] }
          ],
          addons: [
            { key: "disinfection", label: "Add disinfection", price: 199 },
            { key: "kitchen", label: "Add kitchen deep clean", price: 299 }
          ]
        },

        "Beautician": {
          tiers: [
            { name: "Basic", price: 249, details: ["Facial / Threading / Hair trim"] },
            { name: "Salon Combo", price: 499, details: ["Facial + Manicure + Pedicure"] },
            { name: "Bridal Package", price: 1499, details: ["Bridal makeup & full-body spa"] }
          ],
          addons: [
            { key: "homevisit", label: "Home visit convenience", price: 99 },
            { key: "premiumproducts", label: "Premium brand products", price: 199 }
          ]
        },

        "CCTV Installation": {
          tiers: [
            { name: "2-Camera Setup", price: 499, details: ["Includes mounting & wiring"] },
            { name: "4-Camera Setup", price: 899, details: ["CCTV + DVR configuration"] },
            { name: "Advanced Setup", price: 1299, details: ["Full home/office coverage"] }
          ],
          addons: [
            { key: "extraCable", label: "Extra cable (per 10m)", price: 99 },
            { key: "support", label: "1-month support", price: 199 }
          ]
        }
      },

      addons: [
        { key: "fast", label: "Fast service (same-day)", price: 99, selected: false },
        { key: "eco", label: "Eco-friendly materials", price: 49, selected: false },
        { key: "extra", label: "Extra task (+30 mins)", price: 149, selected: false },
      ],
      qty: 1,
      couponCode: "",
      couponValid: false,
      couponMessage: "",

      // Availability / slots
      selectedDate: "",
      selectedTime: "",
      timeSlots: ["09:00 AM", "10:30 AM", "12:00 PM", "01:00 PM", "03:00 PM", "04:00 PM"],
      bookedSlots: {
        "2025-08-24": ["09:00 AM", "01:00 PM"],
        "2025-08-25": ["12:00 PM"],
      },

      // Reviews / ratings
      reviews: [
        { id: 1, user: "Ankita Sharma", userAvatar: "/images/u1.jpg", stars: 5, text: "Professional and quick. Fixed my issue in one visit.", date: "Jun 2025" },
        { id: 2, user: "Sneha Kulkarni", userAvatar: "/images/u2.jpg", stars: 4, text: "On time and polite. Good value.", date: "May 2025" },
        { id: 3, user: "Rakshita Gupta", userAvatar: "/images/u3.jpg", stars: 5, text: "Great experience! Highly recommend.", date: "Apr 2025" },
      ],
      ratingCounts: { 5: 18, 4: 7, 3: 2, 2: 1, 1: 0 },

      // Reviews UI state
      selectedStar: "",
      newReview: {
        user: "", userAvatar: this.defaultAvatar, stars: 0,
        text: "", date: "",
      },
      reviewMessage: "",
      reviewSuccess: false,
      showAllReviews: false,
      related: [],

      // === NEW / ADDED FIELDS & enhancements ===

      // Membership / subscription discount logic
      isMember: false,
      membershipDiscountPct: 10,  // 10% discount for members
      membershipMaxDiscount: 300,  // cap of ₹300 discount

      // Distance / travel fee
      travelDistanceKm: 0,  // to be computed from user/provider location
      travelFeePerKm: 20,   // e.g. ₹20 per km
      travelFee: 0,

      // Surge / peak time multiplier
      surgeMultiplier: 1.0,

      // Provider / partner info
      provider: {
        id: null,
        name: "",
        rating: 0,
        experienceYears: 0,
        verified: false,
        baseCity: "",
      },
    };
  },

  computed: {
    today() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    maxDate() {
      const d = new Date();
      d.setMonth(d.getMonth() + 3);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    activeMedia() {
      return this.media[this.currentIndex] || {};
    },
    selectedAddons() {
      return this.addons.filter(a => a.selected);
    },
    // Enhanced subtotal with travel fee & surge
    subtotal() {
      if (!this.selectedTier.name) return 0;
      let base = this.selectedTier.price + this.selectedAddons.reduce((s, a) => s + a.price, 0);
      base += this.travelFee;
      base = Math.round(base * this.surgeMultiplier);
      return base * this.qty;
    },
    discountAmount() {
      let disc = 0;
      if (this.couponValid) {
        disc += Math.round(this.subtotal * 0.1);  // 10% from coupon
      }
      if (this.isMember) {
        const servicePart =
          (this.selectedTier.price + this.selectedAddons.reduce((s, a) => s + a.price, 0)) * this.qty;
        let memberDisc = Math.round(servicePart * (this.membershipDiscountPct / 100));
        if (memberDisc > this.membershipMaxDiscount) {
          memberDisc = this.membershipMaxDiscount;
        }
        disc += memberDisc;
      }
      return Math.min(disc, this.subtotal);
    },
    total() {
      return Math.max(0, this.subtotal - this.discountAmount);
    },
    rating() {
      const total = Object.values(this.ratingCounts).reduce((s, n) => s + n, 0) || 1;
      const weighted = Object.entries(this.ratingCounts).reduce((s, [k, v]) => s + k * v, 0);
      return weighted / total;
    },
    canBook() {
      return !!(this.selectedTier.name && this.selectedDate && this.selectedTime);
    },
    filteredReviews() {
      let filtered = this.reviews;
      if (this.selectedStar) filtered = filtered.filter(r => r.stars === Number(this.selectedStar));
      if (!this.showAllReviews) filtered = filtered.slice(0, 5);
      return filtered;
    },
    reviewPros() {
      return ["On-time service", "Professional & polite", "Good value for money"];
    },
    showAllReviewsBtn() {
      return !this.showAllReviews && this.reviews.length > 5;
    },
  },

  methods: {

    async fetchServiceData() {
      const id = this.$route.query.id;
      if (!id) {
        this.loading = false;
        return;
      }

      try {
        this.loading = true;

        // Pointing to servicesCollection instead of providers
        const response = await databases.getDocument(
          APPWRITE_CONFIG.dbId,
          APPWRITE_CONFIG.servicesCollection,
          id
        );

        // Mapping fields from your 'services' collection
        // Adjust these keys (title, description, price) to match your Appwrite attributes
        this.title = response.title || this.title;
        this.desc = response.description || this.desc;
        this.category = response.category || this.category;

        // If you store tiers as a JSON string in a 'tiers' attribute
        if (response.tiers) {
          try {
            this.tiers = typeof response.tiers === 'string' ? JSON.parse(response.tiers) : response.tiers;
            this.selectedTier = this.tiers[0] || { name: "", price: 0 };
          } catch (e) {
            console.error("Error parsing tiers JSON", e);
          }
        }

        // Handle Images from Appwrite Storage
        if (response.imageIds && response.imageIds.length > 0) {
          this.media = response.imageIds.map(fileId => ({
            type: "image",
            src: storage.getFilePreview(APPWRITE_CONFIG.storageBucket, fileId)
          }));
        } else if (response.imageUrl) {
          // If you store a single URL instead of multiple IDs
          this.media = [{ type: "image", src: response.imageUrl }];
        } else {
          await this.buildMediaFromTitle();
        }

        // Apply any logic that depends on the category fetched
        this.updatePricingForService();

      } catch (error) {
        console.error("Service not found in 'services' collection:", error.message);
        // Fallback so the page still shows the query-param data
        await this.buildMediaFromTitle();
        this.updatePricingForService();
      } finally {
        this.loading = false;
      }
    },

    async loadMembershipStatus() {
      // Logic to check if the current logged-in user is a member
      // This usually involves checking the 'users' collection
      this.isMember = false;
    },


    handleImageError(e) {
      e.target.src = this.defaultAvatar;
    },
    onFileChange(e) {
      const file = e.target.files?.[0];
      if (!file) return;
      if (this.newReview.userAvatar) URL.revokeObjectURL(this.newReview.userAvatar);
      this.newReview.userAvatar = URL.createObjectURL(file);
    },
    nextMedia() {
      this.currentIndex = (this.currentIndex + 1) % this.media.length;
    },
    prevMedia() {
      this.currentIndex = (this.currentIndex - 1 + this.media.length) % this.media.length;
    },
    selectTier(t) {
      this.selectedTier = t;
      this.updateTravelFee();
    },
    applyCoupon() {
      if (!this.couponCode) {
        this.couponValid = false;
        this.couponMessage = "Enter a coupon code";
        return;
      }
      const code = this.couponCode.trim().toUpperCase();
      if (["WELCOME10", "SAVE10", "NEW10"].includes(code)) {
        this.couponValid = true;
        this.couponMessage = "Coupon applied ✔ 10% off";
      } else {
        this.couponValid = false;
        this.couponMessage = "Invalid coupon";
      }
    },
    isSlotBooked(slot) {
      return this.bookedSlots[this.selectedDate]?.includes(slot) || false;
    },
    ratingBarWidth(star) {
      const total = Object.values(this.ratingCounts).reduce((s, n) => s + n, 0) || 1;
      return ((this.ratingCounts[star] || 0) / total) * 100;
    },
    goToBooking() {
      const q = new URLSearchParams({
        service: this.title,
        date: this.selectedDate,
        time: this.selectedTime,
        tier: this.selectedTier.name,
        total: this.total,
        qty: this.qty,
        addons: this.selectedAddons.map(a => a.key).join(","),
        coupon: this.couponValid ? this.couponCode : "",
      });
      this.$router.push(`/booking?${q}`);
    },
    buildRelated() {
      this.related = [
        { title: "AC Cleaning", category: "AC Repair", desc: "Complete cleaning & sanitization", image: "/images/related-1.jpg" },
        { title: "Electrical Checkup", category: "Electrician", desc: "Home safety audit", image: "/images/related-2.jpg" },
        { title: "Appliance Diagnosis", category: "Home Appliance", desc: "Quick issue identification", image: "/images/related-3.jpg" },
      ];
    },
    async buildMediaFromTitle() {
      const slug = (this.title || "service")
        .toLowerCase()
        .replace(/[\\?%*:|"<>]/g, "-")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      const exts = ["jpg", "webp", "avif", "jpeg", "png"];
      const media = [];

      const loadImage = (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = src;
        });

      for (let i = 1; i <= 3; i++) {
        const base = `/images/${slug}${i > 1 ? `-${i}` : ""}`;
        let foundSrc = "/images/default-service.jpg";
        for (const ext of exts) {
          const src = `${base}.${ext}`;
          if (await loadImage(src)) {
            foundSrc = src;
            break;
          }
        }
        media.push({ key: `img${i}`, type: "image", src: foundSrc });
      }

      this.media = media;
    },

    submitReview() {
      if (!this.newReview.user || !this.newReview.stars || !this.newReview.text) {
        alert("Please fill all fields and give a star rating.");
        return;
      }
      const today = new Date();
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[today.getMonth()];
      const year = today.getFullYear();

      this.newReview.date = `${month} ${year}`;

      this.reviews.unshift({
        ...this.newReview,
        id: Date.now(),
        userAvatar: this.newReview.userAvatar,
      });

      this.ratingCounts[this.newReview.stars] = (this.ratingCounts[this.newReview.stars] || 0) + 1;

      this.newReview = { user: "", userAvatar: this.defaultAvatar, stars: 0, text: "", date: "" };
    },

    updatePricingForService() {
      const key = this.category || this.title;
      const pricing = this.pricingCatalog[key];

      if (pricing && this.tiers.length === 0) {
        this.tiers = pricing.tiers;
        this.addons = pricing.addons.map(a => ({ ...a, selected: false }));
        this.selectedTier = this.tiers[0];
      }
    },

    setStarRating(value) {
      this.newReview.stars = value;
    },

    formatDate(d) {
      if (!d) return "";
      const date = new Date(d);
      return date.toLocaleDateString();
    }, selectSubService(item) {
      this.selectedSubService = item;
    },

    updateTravelFee() {
      this.travelFee = this.travelDistanceKm * this.travelFeePerKm;
    },

    calculateSurge() {
      const peakSlots = ["12:00 PM", "03:00 PM", "04:00 PM"];
      if (peakSlots.includes(this.selectedTime)) {
        this.surgeMultiplier = 1.2;
      } else {
        this.surgeMultiplier = 1.0;
      }
    },

    onTimeSlotSelect(slot) {
      this.selectedTime = slot;
      this.calculateSurge();
    },


  },

  async mounted() {
    // 1. Initial local state from query params for fast perceived performance
    const { title, desc, category } = this.$route.query;
    this.title = title || "Service Detail";
    this.desc = desc || "";
    this.category = category || "General";

    // 2. Fetch real-time data from Appwrite
    await this.fetchServiceData();

    // 3. Initialize UI helpers
    this.buildRelated();
    this.loadMembershipStatus();
  },
};
</script>
