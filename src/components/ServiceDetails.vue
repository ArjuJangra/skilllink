<template>
  <div class="min-h-screen bg-gradient-to-b from-[#EAF6FF] to-white">
    <!-- Sticky top gradient bar -->
    <div class="sticky top-0 z-30 h-1 w-full bg-gradient-to-r from-[#00B4D8] via-[#48CAE4] to-[#0096C7]"></div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-6 lg:py-10">
      <!-- Header breadcrumbs -->
      <div class="text-sm text-gray-500 mb-4 flex items-center gap-2 flex-wrap">
        <!-- Home link -->
        <router-link to="/home"
          class="hover:text-[#007EA7] transition-colors duration-200 font-medium flex items-center gap-1">
          <i class="fas fa-home text-xs"></i> Home
        </router-link>

        <!-- Separator -->
        <span class="text-gray-400">/</span>

        <!-- Category (just text) -->
        <span class="capitalize font-medium text-gray-500">
          {{ category || 'Service' }}
        </span>

        <!-- Separator -->
        <span class="text-gray-400">/</span>

        <!-- Current service -->
        <span class="text-gray-700 font-semibold line-clamp-1" :title="title || 'Detail'">
          {{ title || 'Detail' }}
        </span>
      </div>


      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- LEFT: Gallery + Overview -->
        <div class="lg:col-span-2 space-y-6">
          <!-- HERO: Carousel / Video -->
          <!-- HERO: Image Carousel -->
          <div class="relative rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
            <div class="group relative h-[280px] sm:h-[360px] md:h-[420px] bg-gray-100">
              <!-- Image -->
              <img v-if="activeMedia && activeMedia.src" :src="activeMedia.src" :alt="title"
                class="w-full h-full object-cover object-center" @error="handleImageError" />

              <!-- gradient overlay only if image is present -->
              <div v-if="activeMedia && activeMedia.src"
                class="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>

              <!-- badges -->
              <div class="absolute top-4 left-4 flex items-center gap-2">
                <span class="badge">Top Rated</span>
                <span class="badge bg-amber-500/90">Bestseller</span>
              </div>

              <!-- left/right controls -->
              <button @click="prevMedia" class="carousel-btn left-3" aria-label="Previous">‹</button>
              <button @click="nextMedia" class="carousel-btn right-3" aria-label="Next">›</button>

              <!-- dots -->
              <div class="absolute bottom-3 w-full flex justify-center gap-1.5">
                <button v-for="(m, i) in media" :key="m.key" @click="currentIndex = i"
                  class="h-1.5 rounded-full transition-all"
                  :class="currentIndex === i ? 'w-8 bg-white' : 'w-3 bg-white/60 hover:bg-white/80'"></button>
              </div>

              <!-- title overlay -->
              <h1 v-if="activeMedia && activeMedia.src"
                class="absolute bottom-5 left-5 text-white text-2xl sm:text-3xl md:text-4xl font-extrabold drop-shadow">
                {{ title }}
              </h1>
            </div>

            <!-- thumbs -->
            <div class="grid grid-cols-5 gap-2 p-3 bg-white">
              <button v-for="(m, i) in media" :key="m.key + '-thumb'" @click="currentIndex = i"
                class="relative rounded-xl overflow-hidden border transition hover:scale-[1.01]"
                :class="currentIndex === i ? 'border-[#00B4D8]' : 'border-gray-200'">
                <img v-if="m.type === 'image'" :src="m.src" class="h-16 w-full object-cover object-center" />
              </button>
            </div>
          </div>


          <!-- Overview -->
          <div class="bg-white rounded-2xl shadow p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-2">Overview</h2>
            <p class="text-gray-700 leading-relaxed">
              {{ desc }}
            </p>

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

          <!-- Pricing tiers -->
          <div class="bg-white rounded-2xl shadow p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-gray-900">Packages</h2>
              <span class="text-xs text-gray-500">Tap to select</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button v-for="tier in tiers" :key="tier.name" @click="selectTier(tier)" class="tier"
                :class="selectedTier.name === tier.name ? 'ring-2 ring-[#00B4D8]' : 'hover:shadow-md'">
                <div class="flex items-center justify-between">
                  <div class="text-lg font-semibold text-gray-800">{{ tier.name }}</div>
                  <div class="text-gray-900 font-bold">₹{{ tier.price }}</div>
                </div>
                <ul class="mt-2 space-y-1 text-sm text-gray-600">
                  <li v-for="p in tier.points" :key="p" class="flex items-start gap-2">
                    <span class="mt-1">✔</span>
                    <span>{{ p }}</span>
                  </li>
                </ul>
              </button>
            </div>

            <!-- Addons & quantity -->
            <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 rounded-xl bg-gray-50">
                <div class="font-semibold text-gray-800 mb-2">Add-ons</div>
                <label v-for="addon in addons" :key="addon.key" class="flex items-center justify-between py-2">
                  <div class="flex items-center gap-3">
                    <input type="checkbox" v-model="addon.selected" class="accent-[#00B4D8]" />
                    <span class="text-gray-700">{{ addon.label }}</span>
                  </div>
                  <span class="text-gray-800 font-medium">+ ₹{{ addon.price }}</span>
                </label>
              </div>
              <div class="p-4 rounded-xl bg-gray-50">
                <div class="font-semibold text-gray-800 mb-2">Quantity</div>
                <div class="flex items-center gap-3">
                  <button @click="qty = Math.max(1, qty - 1)" class="qty-btn">−</button>
                  <div class="w-12 text-center font-semibold">{{ qty }}</div>
                  <button @click="qty++" class="qty-btn">+</button>
                </div>

                <div class="mt-4">
                  <label class="block text-sm text-gray-600 mb-1">Coupon</label>
                  <div class="flex gap-2">
                    <input v-model="couponCode" placeholder="e.g. WELCOME10" class="input" />
                    <button @click="applyCoupon" class="btn-secondary">Apply</button>
                  </div>
                  <p v-if="couponMessage" class="text-xs mt-1" :class="couponValid ? 'text-green-600' : 'text-red-600'">
                    {{ couponMessage }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Availability -->
          <div class="bg-white rounded-2xl shadow p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Availability</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-gray-600 mb-1">Select Date</label>
                <input type="date" class="input w-full" :min="today" v-model="selectedDate" />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Select Time</label>
                <select class="input w-full" v-model="selectedTime">
                  <option disabled value="">Choose a slot</option>
                  <option v-for="slot in timeSlots" :key="slot" :value="slot">
                    {{ slot }}
                  </option>
                </select>
              </div>
            </div>
            <p class="text-xs text-gray-500 mt-2">* Real-time slots can be fetched from your API later.</p>
          </div>

          <!-- Provider card -->
          <div class="bg-white rounded-2xl shadow p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">About the Provider</h2>
            <div class="flex items-center gap-4">
              <img :src="provider.avatar" @error="e => e.target.src = defaultAvatar"
                class="w-16 h-16 rounded-full object-cover border" alt="Provider" />
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <div class="font-semibold text-gray-900">{{ provider.name }}</div>
                  <span
                    class="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.293-5.707a1 1 0 011.414 0l5-5a1 1 0 10-1.414-1.414L11 14.586l-2.293-2.293a1 1 0 10-1.414 1.414l3 3z"
                        clip-rule="evenodd" />
                    </svg>
                    Verified
                  </span>


                </div>
                <div class="text-sm text-gray-600">{{ provider.bio }}</div>
                <div class="text-xs text-gray-500 mt-1">
                  {{ provider.years }} yrs experience • {{ provider.jobs }} jobs completed
                </div>
              </div>
              <div class="text-right">
                <div class="text-amber-500 font-bold">{{ rating.toFixed(1) }} ★</div>
                <div class="text-xs text-gray-500">{{ reviews.length }} reviews</div>
              </div>
            </div>
          </div>

          <!-- Reviews -->
          <div class="bg-white rounded-2xl shadow p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-gray-900">Customer Reviews</h2>
              <div class="text-right">
                <div class="text-2xl font-extrabold text-amber-500">{{ rating.toFixed(1) }} ★</div>
                <div class="text-xs text-gray-500">Based on {{ reviews.length }} reviews</div>
              </div>
            </div>

            <!-- rating bars -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div class="space-y-2">
                <div v-for="star in [5, 4, 3, 2, 1]" :key="'bar-' + star" class="flex items-center gap-3">
                  <div class="w-12 text-sm text-gray-600">{{ star }}★</div>
                  <div class="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div class="h-2 bg-amber-400" :style="{ width: ratingBarWidth(star) + '%' }"></div>
                  </div>
                  <div class="w-10 text-right text-xs text-gray-500">{{ ratingCounts[star] || 0 }}</div>
                </div>
              </div>

              <!-- quick pros -->
              <div class="p-4 rounded-xl bg-gray-50">
                <div class="font-semibold text-gray-800 mb-2">What people like</div>
                <ul class="text-sm text-gray-700 space-y-1">
                  <li>• On-time service</li>
                  <li>• Professional & polite</li>
                  <li>• Good value for money</li>
                </ul>
              </div>
            </div>

            <!-- review list -->
            <div class="space-y-5">
              <div v-for="r in reviews" :key="r.id" class="p-4 border rounded-xl hover:shadow-sm transition">
                <div class="flex items-start gap-3">
                  <img :src="r.userAvatar" @error="e => e.target.src = defaultAvatar"
                    class="w-10 h-10 rounded-full object-cover" />
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      <div class="font-semibold text-gray-800">{{ r.user }}</div>
                      <div class="text-amber-500 text-sm">{{ '★'.repeat(r.stars) }}</div>
                      <div class="text-xs text-gray-500">— {{ r.date }}</div>
                    </div>
                    <p class="text-gray-700 text-sm mt-1">{{ r.text }}</p>
                    <img v-if="r.photo" :src="r.photo" class="mt-2 w-full max-w-xs rounded-lg border"
                      alt="Review proof" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Related services -->
          <div class="bg-white rounded-2xl shadow p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">You might also like</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <router-link v-for="s in related" :key="s.title"
                :to="`/service-details?title=${encodeURIComponent(s.title)}&desc=${encodeURIComponent(s.desc)}&category=${encodeURIComponent(s.category)}`"
                class="group rounded-xl border overflow-hidden hover:shadow-md transition">
                <img :src="s.image" class="h-36 w-full object-cover group-hover:scale-105 transition-transform" />
                <div class="p-3">
                  <div class="font-semibold text-gray-800 line-clamp-1">{{ s.title }}</div>
                  <div class="text-xs text-gray-500">{{ s.category }}</div>
                </div>
              </router-link>
            </div>
          </div>

          <div class="h-20"></div>
        </div>

        <!-- RIGHT: Booking summary card -->
        <div class="lg:col-span-1">
          <div class="sticky top-4">
            <div class="bg-white rounded-2xl shadow p-6">
              <div class="flex items-center justify-between">
                <div class="text-lg font-bold text-gray-900">Your Selection</div>
                <div class="text-sm text-gray-500 capitalize">{{ category }}</div>
              </div>
              <div class="mt-4 space-y-2 text-sm text-gray-700">
                <div class="flex justify-between"><span>Tier</span><span class="font-medium">{{ selectedTier.name
                }}</span></div>
                <div class="flex justify-between"><span>Quantity</span><span class="font-medium">{{ qty }}</span></div>
                <div class="flex justify-between">
                  <span>Add-ons</span>
                  <span class="font-medium">
                    <template v-if="selectedAddons.length">{{selectedAddons.map(a => a.label).join(', ')}}</template>
                    <template v-else>None</template>
                  </span>
                </div>
                <div class="flex justify-between"><span>Date</span><span class="font-medium">{{ selectedDate || `Not
                    set` }}</span>

                </div>
                <div class="flex justify-between">
                  <span>Time</span>
                  <span class="font-medium">{{ selectedTime || 'Not set' }}</span>
                </div>

              </div>

              <div class="border-t mt-4 pt-4 space-y-2 text-sm">
                <div class="flex justify-between"><span>Subtotal</span><span>₹{{ subtotal }}</span></div>
                <div class="flex justify-between" v-if="discountAmount > 0"><span>Discount</span><span
                    class="text-emerald-600">− ₹{{
                      discountAmount }}</span></div>
                <div class="flex justify-between font-bold text-gray-900 text-base"><span>Total</span><span>₹{{ total
                }}</span></div>
              </div>

              <button class="mt-4 btn-primary w-full" :disabled="!canBook" @click="goToBooking">
                Book Now — ₹{{ total }}
              </button>

              <p v-if="!canBook" class="text-xs text-red-600 mt-2">Please pick a date & time to continue.</p>

              <div class="text-xs text-gray-500 mt-3">No advance charged. Pay after service confirmation.</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sticky bottom CTA (mobile) -->
    <div class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t">
      <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <div class="text-xs text-gray-500">Total</div>
          <div class="text-lg font-bold">₹{{ total }}</div>
        </div>
        <button class="btn-primary" :disabled="!canBook" @click="goToBooking">Book Now</button>
      </div>
    </div>
  </div>
</template>

<script>
 export default {
  name: 'ServiceDetail',
  data() {
    return {
      title: '',
      desc: '',
      category: '',
      media: [],              // only images now
      currentIndex: 0,

      // pricing
      tiers: [
        { name: 'Basic', price: 399, points: ['Inspection', 'Minor fixes', '30-day support'] },
        { name: 'Standard', price: 699, points: ['Includes Basic', 'Material support', 'Priority scheduling'] },
        { name: 'Premium', price: 999, points: ['Includes Standard', 'Deep service', '90-day support'] },
      ],
      selectedTier: { name: 'Standard', price: 699, points: [] },
      addons: [
        { key: 'fast', label: 'Fast service (same-day)', price: 99, selected: false },
        { key: 'eco', label: 'Eco-friendly materials', price: 49, selected: false },
        { key: 'extra', label: 'Extra task (+30 mins)', price: 149, selected: false },
      ],
      qty: 1,
      couponCode: '',
      couponValid: false,
      couponMessage: '',

      // availability
      selectedDate: '',
      selectedTime: '',
      timeSlots: ['09:00 AM', '10:30 AM', '12:00 PM', '01:00 PM', '03:00 PM', '05:00 PM'],

      // provider
      provider: {
        name: 'Rahul Verma',
        avatar: '/images/provider.png',
        bio: 'Skilled and vetted professional with a passion for quality and punctuality.',
        years: 6,
        jobs: 1123,
      },
      defaultAvatar: '/images/default-user.png',

      // reviews
      reviews: [
        {
          id: 1,
          user: 'Ankita Sharma',
          userAvatar: '/images/u1.jpg',
          stars: 5,
          text: 'Professional and quick. Fixed my issue in one visit.',
          date: 'Jun 2025',
          photo: '/images/review1.jpg',
        },
        {
          id: 2,
          user: 'Sneha Kulkarni',
          userAvatar: '/images/u2.jpg',
          stars: 4,
          text: 'On time and polite. Good value.',
          date: 'May 2025',
        },
        {
          id: 3,
          user: 'Rakshita Gupta',
          userAvatar: '/images/u3.jpg',
          stars: 5,
          text: 'Great experience! Highly recommend.',
          date: 'Apr 2025',
        },
      ],
      ratingCounts: { 5: 18, 4: 7, 3: 2, 2: 1, 1: 0 },
      related: [],
    };
  },
  computed: {
    activeMedia() {
      return this.media[this.currentIndex] || {};
    },
    today() {
      const d = new Date();
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    },
    selectedAddons() {
      return this.addons.filter(a => a.selected);
    },
    subtotal() {
      const addonsSum = this.selectedAddons.reduce((s, a) => s + a.price, 0);
      return (this.selectedTier.price + addonsSum) * this.qty;
    },
    discountAmount() {
      if (!this.couponValid) return 0;
      return Math.round(this.subtotal * 0.1);
    },
    total() {
      return Math.max(0, this.subtotal - this.discountAmount);
    },
    rating() {
      const totalReviews = Object.values(this.ratingCounts).reduce((s, n) => s + n, 0) || 1;
      const weighted =
        5 * (this.ratingCounts[5] || 0) +
        4 * (this.ratingCounts[4] || 0) +
        3 * (this.ratingCounts[3] || 0) +
        2 * (this.ratingCounts[2] || 0) +
        1 * (this.ratingCounts[1] || 0);
      return weighted / totalReviews;
    },
    canBook() {
      return Boolean(this.selectedDate && this.selectedTime);
    },
  },
  methods: {
    handleImageError(e) {
      e.target.src = '/images/default-service.jpg';
    },
    nextMedia() {
      this.currentIndex = (this.currentIndex + 1) >= this.media.length ? 0 : this.currentIndex + 1;
    },
    prevMedia() {
      this.currentIndex = (this.currentIndex - 1) < 0 ? this.media.length - 1 : this.currentIndex - 1;
    },
    selectTier(tier) {
      this.selectedTier = tier;
    },
    applyCoupon() {
      if (!this.couponCode) {
        this.couponValid = false;
        this.couponMessage = 'Enter a coupon code';
        return;
      }
      const normalized = this.couponCode.trim().toUpperCase();
      if (['WELCOME10', 'SAVE10', 'NEW10'].includes(normalized)) {
        this.couponValid = true;
        this.couponMessage = 'Coupon applied ✔ 10% off';
      } else {
        this.couponValid = false;
        this.couponMessage = 'Invalid coupon';
      }
    },
    ratingBarWidth(star) {
      const total = Object.values(this.ratingCounts).reduce((s, n) => s + n, 0) || 1;
      return ((this.ratingCounts[star] || 0) / total) * 100;
    },

    goToBooking() {
      const q = new URLSearchParams({
        service: this.title,
        date: this.selectedDate || '',
        time: this.selectedTime || '',
        tier: this.selectedTier.name,
        total: String(this.total),
        qty: String(this.qty),
        addons: this.selectedAddons.map(a => a.key).join(','),
        coupon: this.couponValid ? this.couponCode : '',
      }).toString();
      this.$router.push(`/booking?${q}`);
    },
    buildRelated() {
      this.related = [
        { title: 'AC Cleaning', category: 'AC Repair', desc: 'Complete cleaning & sanitization', image: '/images/related-1.jpg' },
        { title: 'Electrical Checkup', category: 'Electrician', desc: 'Home safety audit', image: '/images/related-2.jpg' },
        { title: 'Appliance Diagnosis', category: 'Home Appliance', desc: 'Quick issue identification', image: '/images/related-3.jpg' },
      ];
    },
   buildMediaFromTitle() {
  const slug = (this.title || 'service')
    .toLowerCase()
    .replace(/[\\?%*:|"<>]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  const extensions = ['avif', 'jpg', 'jpeg', 'png', 'webp'];
  const media = [];

  const checkImage = async (src) => {
    try {
      const res = await fetch(src, { method: 'HEAD' });
      return res.ok;
    } catch {
      return false;
    }
  };

  const loadImages = async () => {
    for (let i = 1; i <= 3; i++) {
      const base = `/images/${slug}${i > 1 ? `-${i}` : ''}`;
      let found = false;

      for (let ext of extensions) {
        const src = `${base}.${ext}`;
        const exists = await checkImage(src);
        if (exists) {
          media.push({ key: `img${i}`, type: 'image', src });
          found = true;
          break; // stop checking other extensions
        }
      }

      // fallback if no image found
      if (!found) {
        media.push({ key: `img${i}`, type: 'image', src: '/images/default-service.jpg' });
      }
    }

    this.media = media; // reactive update
  };

  loadImages();
},
  },
  mounted() {
    const { title, desc, category } = this.$route.query;
    this.title = title || 'Service Detail';
    this.desc = desc || 'High-quality service at your doorstep with verified professionals.';
    this.category = category || 'General';

    this.buildMediaFromTitle();
    this.buildRelated();

    this.selectedTier = this.tiers[1]; // Standard
  },
};
</script>


<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  font-size: 0.75rem;
  /* text-xs */
  font-weight: 500;
  /* font-medium */
  padding-left: 0.5rem;
  /* px-2 */
  padding-right: 0.5rem;
  padding-top: 0.125rem;
  /* py-0.5 */
  padding-bottom: 0.125rem;
  border-radius: 9999px;
  /* rounded-full */
  background-color: rgba(255, 255, 255, 0.9);
  /* bg-white/90 */
  color: #1f2937;
  /* text-gray-800 */
}

/* Reusable cards */
.card-soft {
  border-radius: 0.75rem;
  /* rounded-xl */
  padding: 1rem;
  /* p-4 */
  background: linear-gradient(to bottom right, #f9fafb, #fff);
  /* bg-gradient-to-br from-gray-50 to-white */
  border: 1px solid #f3f4f6;
  /* border border-gray-100 */
}

.card-title {
  font-size: 0.875rem;
  /* text-sm */
  font-weight: 600;
  /* font-semibold */
  color: #1f2937;
  /* text-gray-800 */
}

.card-text {
  color: #4b5563;
  /* text-gray-600 */
  font-size: 0.875rem;
  /* text-sm */
}

/* Buttons & inputs */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  background-color: #007EA7;
  color: #fff;
  font-weight: 600;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  transition: background 0.2s, opacity 0.2s;
}

.btn-primary:hover {
  background-color: #006786;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: #111827;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  transition: opacity 0.2s;
}

.btn-secondary:hover {
  opacity: 0.9;
}

.input {
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input:focus {
  border-color: #00B4D8;
  box-shadow: 0 0 0 2px #00B4D833;
}

.qty-btn {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  font-weight: bold;
  font-size: 1.125rem;
  display: grid;
  place-content: center;
  transition: background 0.2s, transform 0.1s;
}

.qty-btn:hover {
  background: #f9fafb;
}

.qty-btn:active {
  transform: scale(0.95);
}

.tier {
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  padding: 1rem;
  text-align: left;
  transition: box-shadow 0.2s;
  background: #fff;
}

.tier:hover {
  box-shadow: 0 4px 12px 0 rgb(0 0 0 / 0.08);
}

/* Carousel buttons */
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 2.25rem;
  /* h-9 */
  width: 2.25rem;
  /* w-9 */
  border-radius: 9999px;
  /* rounded-full */
  background-color: rgba(255, 255, 255, 0.9);
  /* bg-white/90 */
  display: grid;
  /* grid */
  place-content: center;
  /* place-content-center */
  color: #374151;
  /* text-gray-700 */
  font-size: 1.25rem;
  /* text-xl */
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  /* shadow */
  border: 1px solid #e5e7eb;
  /* border */
  transition: background 0.2s;
}

.carousel-btn:hover {
  background-color: #fff;
  /* hover:bg-white */
}

/* Utilities */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
