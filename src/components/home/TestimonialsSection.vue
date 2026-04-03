<template>
  <section class="py-16 px-4 bg-gray-50/50">
    <div class="max-w-[1300px] mx-auto">
      <div class="text-center mb-12" data-aos="fade-up">
        <h3 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Real Stories, Real Impact
        </h3>
        <div class="w-20 h-1.5 bg-[#0073b1] mx-auto rounded-full mb-6"></div>
        <p class="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
          See how SkillLink helped users solve everyday challenges — fast, reliable, and stress-free.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div 
          v-for="(caseItem, index) in solvedCases" 
          :key="index"
          class="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-500 transform hover:-translate-y-2"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div class="relative w-full h-52 overflow-hidden bg-gray-200">
            <img 
              :src="caseItem.image" 
              :alt="caseItem.title" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy" 
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          <div class="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h4 class="text-xl font-bold text-[#0073b1] mb-3 group-hover:text-[#00A8E8] transition-colors">
                {{ caseItem.title }}
              </h4>
              <p class="text-gray-700 text-sm italic leading-relaxed relative">
                {{ caseItem.description }}
              </p>
            </div>
            
            <div class="mt-6 flex items-center justify-between border-t border-gray-50 pt-4">
              <div class="flex items-center gap-1 text-yellow-400">
                <i v-for="star in 5" :key="star" class="fas fa-star text-[10px]"></i>
              </div>
              <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verified Expert</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

// The data is now inside the component itself
const solvedCases = ref([
  {
    title: 'Leaking Pipe Fixed',
    image: require('@/assets/plumber2.jpg'),
    description: '"Emergency plumbing at night! SkillLink saved the day." – Rajesh, Delhi'
  },
  {
    title: 'Wiring Issue Resolved',
    image: require('@/assets/electician.jpg'),
    description: '"The electrician came on time and solved everything!" – Priya, Mumbai'
  },
  {
    title: 'Wedding Makeup Expert',
    image: require('@/assets/makeup2.jpg'),
    description: '"Booked for a wedding. Amazing experience!" – Sneha, Jaipur'
  }
]);
</script>

<style scoped>
/* Ensures consistent layout regardless of image size */
img {
  aspect-ratio: 16 / 10;
}
</style>