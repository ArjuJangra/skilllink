<template>
  <section class="py-20 bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-6">
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div data-aos="fade-right">
          <h2 class="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">Professional Excellence</h2>
          <h3 class="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
            The reliable way to get <span class="text-[#00A8E8]">everything</span> done.
          </h3>
          <p class="text-gray-600 text-lg mb-8 leading-relaxed">
            SkillLink isn't just a directory; it's your personal task force. We've vetted the best local experts so you don't have to spend hours searching. From leaky pipes to digital help, we've got you covered.
          </p>
          
          <div class="space-y-4">
            <div v-for="feature in features" :key="feature.title" class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition">
              <div class="flex-shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                <i :class="feature.icon" class="text-xl"></i>
              </div>
              <div>
                <h4 class="font-bold text-gray-800">{{ feature.title }}</h4>
                <p class="text-gray-500 text-sm">{{ feature.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="relative" data-aos="fade-left">
          <div class="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
          <div class="relative bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80" alt="Professional at work" class="opacity-80 object-cover w-full h-[500px]" />
            <div class="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-white">
              <p class="italic text-lg">“Expert help, a tap away — where convenience meets trust.”</p>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mb-12" data-aos="fade-up">
        <h3 class="text-3xl font-bold text-gray-900 mb-4">Explore Our Services</h3>
        <p class="text-gray-500">Premium solutions for every household need</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" data-aos="fade-up">
        <div v-for="service in categories" :key="service.name" 
             class="group cursor-pointer bg-gray-50 border border-gray-100 p-6 rounded-2xl text-center hover:bg-white hover:shadow-xl hover:border-blue-400 transition-all duration-300">
          <div class="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <i :class="[service.icon, 'text-2xl text-blue-600']"></i>
          </div>
          <span class="text-sm font-bold text-gray-700 block">{{ service.name }}</span>
        </div>
      </div>

      <div class="mt-20 py-8 border-t border-gray-100 flex flex-wrap justify-center gap-12 grayscale opacity-60">
        <div class="flex items-center gap-2 font-bold text-xl"><i class="fas fa-shield-alt text-blue-600"></i> Secure Payments</div>
        <div class="flex items-center gap-2 font-bold text-xl"><i class="fas fa-user-check text-blue-600"></i> Verified Experts</div>
        <div class="flex items-center gap-2 font-bold text-xl"><i class="fas fa-history text-blue-600"></i> 24/7 Support</div>
      </div>

    </div>
  </section>
</template>

<script setup>
const features = [
  { icon: 'fas fa-check-double', title: 'Verified Professionals', desc: 'Every expert undergoes a rigorous 5-step background check.' },
  { icon: 'fas fa-bolt', title: 'On-Demand Service', desc: 'Book in 60 seconds and get help at your doorstep within 2 hours.' },
  { icon: 'fas fa-tag', title: 'Transparent Pricing', desc: 'Upfront quotes. No hidden fees. Pay only after the job is done.' }
];

const categories = [
  { name: 'Plumbing', icon: 'fas fa-faucet' },
  { name: 'Electrical', icon: 'fas fa-plug' },
  { name: 'AC Repair', icon: 'fas fa-snowflake' },
  { name: 'Cleaning', icon: 'fas fa-broom' },
  { name: 'Painting', icon: 'fas fa-paint-roller' },
  { name: 'Appliance', icon: 'fas fa-tv' },
  { name: 'Carpentry', icon: 'fas fa-hammer' },
  { name: 'Pest Control', icon: 'fas fa-bug' },
  { name: 'Makeup', icon: 'fas fa-cosmetic-brush' },
  { name: 'Gardening', icon: 'fas fa-leaf' },
  { name: 'Laundry', icon: 'fas fa-tshirt' },
  { name: 'More', icon: 'fas fa-ellipsis-h' }
];
</script>