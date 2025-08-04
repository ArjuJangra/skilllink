<template>
    <div class="min-h-screen bg-[#F0F9FF] px-4 py-8">
        <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <!-- ✅ Image Section -->
            <img v-if="service.image" :src="service.image" :alt="service.title"
                class="w-full h-64 object-cover rounded-lg shadow-md mb-6" @error="handleImageError" />

            <!-- ✅ Service Info -->
            <h1 class="text-2xl font-bold text-[#007EA7] mb-4">{{ service.title }}</h1>
            <p class="text-gray-700 mb-2">{{ service.desc }}</p>
            <p class="text-sm italic text-gray-500 mb-6">Category: {{ service.category }}</p>

            <!-- ✅ Service Meta -->
            <div class="space-y-2 text-sm text-gray-700">
                <p><strong>Estimated Time:</strong> 30–60 minutes</p>
                <p><strong>Typical Cost:</strong> ₹300 – ₹800</p>
                <p><strong>What's Included:</strong> On-site visit, inspection, basic service</p>
            </div>

            <!-- ✅ Buttons -->
            <div class="mt-6 flex space-x-4">
                <button @click="$router.push('/home')"
                    class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                    ← Back to Services
                </button>

                <button @click="goToBooking" class="px-4 py-2 bg-[#007EA7] text-white rounded hover:bg-[#005f6b]">
                    Book Now
                </button>
            </div>
        </div>
    </div>
</template>


<script>
import { services } from '@/data/services'

export default {
    data() {
        return {
            service: {
                title: '',
                desc: '',
                category: '',
                image: ''
            },
            title: this.$route.params.title
        }
    },
    methods: {
        goToBooking() {
            this.$router.push(`/book?service=${encodeURIComponent(this.service.title)}`);
        }
    },
    mounted() {
        let found = false;
        for (const category of services) {
            const item = category.items.find(item => item.title === this.title);
            if (item) {
                this.service = {
                    ...item,
                    category: category.title,
                    image: item.image || `https://source.unsplash.com/800x400/?${item.title.toLowerCase()}`
                };
                found = true;
                console.log("✅ Loaded service:", this.service);
                break;
            }
        }
        if (!found) {
            this.service = {
                title: 'Not Found',
                desc: 'This service could not be found.',
                category: 'Unknown',
                image: 'https://via.placeholder.com/800x300?text=Service+Not+Found'
            };
        }
    }
}
</script>


<style scoped>
/* Optional: Slight fade-in animation */
.fade-in {
    animation: fadeIn 0.6s ease-in-out;
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
