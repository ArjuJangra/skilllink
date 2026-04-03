<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-4xl mx-auto">
      <button @click="$router.back()" class="flex items-center gap-2 text-gray-600 hover:text-[#0073b1] mb-6 transition-colors">
        <i class="fas fa-arrow-left"></i>
        <span class="font-bold">Back to Service</span>
      </button>

      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-8">
          <h1 class="text-3xl font-black text-gray-900 mb-2">Customer Reviews</h1>
          <p class="text-gray-500 mb-8">Real feedback from the SkillLink community for {{ serviceTitle }}</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12 bg-slate-50 p-6 rounded-2xl">
            <div class="flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 pb-6 md:pb-0">
              <div class="text-5xl font-black text-gray-900">{{ averageRating.toFixed(1) }}</div>
              <div class="flex text-amber-400 my-2">
                <i v-for="n in 5" :key="n" :class="n <= Math.round(averageRating) ? 'fas fa-star' : 'far fa-star'"></i>
              </div>
              <div class="text-sm font-bold text-gray-400 uppercase tracking-widest">{{ reviews.length }} Reviews</div>
            </div>

            <div class="space-y-2">
              <div v-for="star in [5, 4, 3, 2, 1]" :key="star" class="flex items-center gap-3">
                <div class="w-8 text-xs font-bold text-gray-600">{{ star }}★</div>
                <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-2 bg-amber-400 duration-500" :style="{ width: getBarWidth(star) + '%' }"></div>
                </div>
                <div class="w-10 text-right text-xs text-gray-400">{{ ratingCounts[star] || 0 }}</div>
              </div>
            </div>
          </div>

          <div class="mb-12">
            <h3 class="text-lg font-bold text-gray-800 mb-4">Write a Review</h3>
            <div class="space-y-4 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input v-model="newReview.user" placeholder="Your Name" class="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-100 outline-none" />
                <div class="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl">
                   <span class="text-sm text-gray-400 mr-2">Your Rating:</span>
                   <i v-for="n in 5" :key="n" @click="newReview.stars = n" 
                      :class="n <= newReview.stars ? 'fas fa-star text-amber-400' : 'far fa-star text-gray-300'"
                      class="cursor-pointer text-lg transition-transform active:scale-125"></i>
                </div>
              </div>
              <textarea v-model="newReview.text" rows="3" placeholder="Tell others about your experience..." 
                class="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-100 outline-none"></textarea>
              <button @click="submitReview" :disabled="submitting || !newReview.user || !newReview.stars"
                class="w-full py-4 bg-[#0073b1] text-white font-bold rounded-xl shadow-lg shadow-blue-100 hover:bg-[#005c8e] transition-all disabled:opacity-50">
                {{ submitting ? 'Posting...' : 'Submit Review' }}
              </button>
            </div>
          </div>

          <div v-if="loading" class="space-y-6">
            <div v-for="n in 3" :key="n" class="h-32 bg-gray-50 animate-pulse rounded-2xl"></div>
          </div>

          <div v-else-if="reviews.length" class="space-y-8">
            <div v-for="r in reviews" :key="r.$id" class="flex items-start gap-5 p-2 animate-fade-in">
              <div class="w-12 h-12 rounded-full bg-[#0073b1] flex items-center justify-center text-white font-bold text-lg shrink-0">
                {{ r.user.charAt(0).toUpperCase() }}
              </div>
              <div class="flex-1 border-b border-gray-50 pb-6">
                <div class="flex items-center justify-between mb-1">
                  <h4 class="font-bold text-gray-900">{{ r.user }}</h4>
                  <span class="text-xs text-gray-400">{{ r.date }}</span>
                </div>
                <div class="flex text-amber-400 text-xs mb-3">
                  <i v-for="n in 5" :key="n" :class="n <= r.stars ? 'fas fa-star' : 'far fa-star'"></i>
                </div>
                <p class="text-gray-600 leading-relaxed text-sm">{{ r.text }}</p>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-20">
            <div class="text-gray-300 text-6xl mb-4">
               <i class="far fa-comment-dots"></i>
            </div>
            <p class="text-gray-500 font-medium">No reviews yet. Be the first to help others!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { databases, APPWRITE_CONFIG } from '@/appwrite';
import { ID, Query } from 'appwrite';

const route = useRoute();
const serviceId = route.query.id; // Expecting service ID in URL
const serviceTitle = route.query.title || 'Service';

const reviews = ref([]);
const loading = ref(true);
const submitting = ref(false);

const newReview = ref({
  user: '',
  stars: 0,
  text: ''
});

// Calculate Average
const averageRating = computed(() => {
  if (!reviews.value.length) return 0;
  const sum = reviews.value.reduce((acc, r) => acc + r.stars, 0);
  return sum / reviews.value.length;
});

// Calculate Counts for Bar UI
const ratingCounts = computed(() => {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  reviews.value.forEach(r => counts[r.stars]++);
  return counts;
});

const getBarWidth = (star) => {
  if (!reviews.value.length) return 0;
  return (ratingCounts.value[star] / reviews.value.length) * 100;
};

// Fetch from Appwrite
const fetchReviews = async () => {
  try {
    loading.value = true;
    const res = await databases.listDocuments(
      APPWRITE_CONFIG.dbId,
      'reviews',
      [Query.equal('serviceId', serviceId), Query.orderDesc('$createdAt')]
    );
    reviews.value = res.documents;
  } catch (err) {
    console.error("Fetch reviews error:", err);
  } finally {
    loading.value = false;
  }
};

// Submit to Appwrite
const submitReview = async () => {
  try {
    submitting.value = true;
    
    const reviewData = {
      serviceId: serviceId, // This is already a constant from route.query
      user: newReview.value.user,   // ADD .value HERE
      stars: newReview.value.stars, // ADD .value HERE
      text: newReview.value.text,   // ADD .value HERE
      date: new Date().toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      })
    };

    const res = await databases.createDocument(
      APPWRITE_CONFIG.dbId,
      'reviews',
      ID.unique(),
      reviewData
    );

    reviews.value.unshift(res); // Add to local list
    newReview.value = { user: '', stars: 0, text: '' }; // Reset form
  } catch (err) {
    alert("Error submitting review. Please try again.");
    console.error(err);
  } finally {
    submitting.value = false;
  }
};

onMounted(fetchReviews);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>