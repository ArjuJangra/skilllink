<template>
    <section class="relative pt-16 bg-[#F8FAFC] overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent"></div>

        <div class="max-w-screen-xl mx-auto px-6 relative z-10">

            <div class="relative mb-4">

                <div class="absolute -top-10 left-0">
                    <div
                        class="flex items-center gap-2 px-4 py-1.5 bg-gray-900 border border-gray-800 rounded-2xl rounded-bl-2xl shadow-xl">
                        <span class="relative flex h-2 w-2">
                            <span
                                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        <span class="text-white text-[10px] font-black uppercase tracking-[0.2em]">Latest
                            Additions</span>
                    </div>
                </div>

                <div class="text-center ">
                    <h2 class="text-5xl font-black text-gray-900 tracking-[ -0.05em] leading-tight">
                        What's <span
                            class="text-transparent bg-clip-text bg-gradient-to-br from-[#007EA7] to-blue-400">New</span>
                    </h2>
                    <div class="flex justify-center gap-1.5 mt-4">
                        <div class="w-8 h-1 bg-blue-500 rounded-full"></div>
                        <div class="w-2 h-1 bg-gray-200 rounded-full"></div>
                    </div>
                </div>
            </div>

            <div class="flex justify-center mb-12">
                <div class="inline-flex p-1.5 bg-white border border-gray-200 rounded-2xl shadow-sm backdrop-blur-md">
                    <button v-for="cat in limitedCategories" :key="cat" @click="activeCategory = cat" :class="[
                        'px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300',
                        activeCategory === cat
                            ? 'bg-[#007EA7] text-white shadow-lg shadow-blue-200 -translate-y-0.5'
                            : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
                    ]">
                        {{ cleanCategoryName(cat) }}
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <template v-if="loading">
                    <div v-for="n in 4" :key="n" class="h-96 bg-white border border-gray-100 rounded-3xl animate-pulse">
                    </div>
                </template>

                <template v-else>
                    <ServiceCard v-for="(service, index) in filteredServices" :key="service.$id" :service="service"
                        :style="{ transitionDelay: `${index * 50}ms` }" class="animate-fade-in" />
                </template>
            </div>

            <div v-if="!loading && filteredServices.length === 0"
                class="text-center py-20 bg-white border border-gray-100 rounded-[2.5rem] mt-10">
                <p class="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Registry empty in {{
                    activeCategory }}</p>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { databases } from '@/appwrite';
import { Query } from 'appwrite';
import ServiceCard from '@/components/ServiceCard.vue';

const services = ref([]);
const loading = ref(true);
const activeCategory = ref('All');

const fetchServicesFromAppwrite = async () => {
    try {
        loading.value = true;
        const response = await databases.listDocuments(
            '69bc1ae900174fd0a3c6',
            'services',
            // Fetch more to ensure we have variety to pick from
            [Query.limit(100), Query.orderDesc('$createdAt')]
        );
        services.value = response.documents;
    } catch (error) {
        console.error('Appwrite Error:', error);
    } finally {
        loading.value = false;
    }
};

const cleanCategoryName = (name) => {
    if (name === 'All') return name;
    return name.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
};

const limitedCategories = computed(() => {
    const fromDB = services.value.map(s => s.category).filter(Boolean);
    const unique = ['All', ...new Set(fromDB)];

    // INCREASED TO 5: This gives you "All" + 4 specific categories
    return unique.slice(0, 5);
});

const filteredServices = computed(() => {
    // If user clicks a specific tab (e.g., "Cleaning"), show everything in that cat
    if (activeCategory.value !== 'All') {
        return services.value.filter(s => s.category === activeCategory.value);
    }

    // IF "ALL" IS SELECTED:
    const results = [];
    // Get the 4 specific categories (excluding 'All')
    const categoryTabs = limitedCategories.value.filter(c => c !== 'All');

    categoryTabs.forEach(cat => {
        const matches = services.value.filter(s => s.category === cat);
        // Take up to 2 services from each of these 4 categories
        results.push(...matches.slice(0, 2));
    });

    // Final check: if we have 4 categories, this will now show 8 services total (2x4)
    return results;
});

onMounted(fetchServicesFromAppwrite);
</script>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fadeIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
</style>