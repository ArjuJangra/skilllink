<template>
    <div class="max-w-screen-xl mx-auto px-2 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10">

        <div
            class="relative overflow-hidden group bg-[#00171F] rounded-[2.5rem] p-10 flex flex-col justify-center min-h-[320px] shadow-2xl transition-all duration-700 hover:-translate-y-2 hover:shadow-[#003459]/20">
            <div
                class="absolute -top-24 -left-24 w-64 h-64 bg-[#007EA7] rounded-full blur-[120px] opacity-40 group-hover:opacity-60 transition-opacity">
            </div>

            <div class="relative z-10 max-w-[70%]">
                <div class="flex items-center gap-2 mb-4">
                    <span class="h-[2px] w-8 bg-[#00A8E8]"></span>
                    <span class="text-[#00A8E8] font-black text-[10px] uppercase tracking-[0.3em]">Exclusive
                        Membership</span>
                </div>

                <h3 class="text-4xl font-black text-white leading-tight">
                    SkillLink <br />
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#00A8E8] to-white">Premium
                        Plus</span>
                </h3>

                <p class="mt-4 text-gray-400 text-sm font-medium leading-relaxed">
                    Get priority booking, zero service fees, and <span class="text-white font-bold">flat 20% off</span>
                    on all home repairs.
                </p>

                <button class="mt-8 relative group/btn flex items-center gap-3">
                    <div
                        class="bg-white text-black px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all duration-300 group-hover/btn:bg-[#00A8E8] group-hover/btn:text-white shadow-xl">
                        Join Now
                    </div>
                    <div
                        class="w-12 h-12 rounded-2xl border border-white/20 flex items-center justify-center text-white transition-all duration-300 group-hover/btn:border-[#00A8E8] group-hover/btn:bg-[#00A8E8]">
                        <i class="fas fa-chevron-right text-xs"></i>
                    </div>
                </button>
            </div>

            <div
                class="absolute -right-10 bottom-0 opacity-20 transform translate-y-10 group-hover:translate-y-0 group-hover:rotate-[-10deg] transition-all duration-1000">
                <i class="fas fa-crown text-[240px] text-white"></i>
            </div>
        </div>

        <div
            class="relative overflow-hidden group bg-white rounded-[2.5rem] p-10 flex flex-col justify-center min-h-[320px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-700 hover:-translate-y-2 hover:shadow-xl">
            <div class="relative z-10">
                <div class="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full mb-6">
                    <i class="fas fa-bolt text-amber-500 text-[10px]"></i>
                    <span class="text-amber-700 font-black text-[9px] uppercase tracking-widest">Trending Flash
                        Deal</span>
                </div>

                <h3 class="text-4xl font-black text-gray-900 leading-[1.1] tracking-tight">
                    Smart Home <br /> Installation
                </h3>

                <p class="mt-4 text-gray-500 font-medium text-sm">
                    <i class="fas fa-user-check text-[#007EA7] mr-2"></i> Verified Electricians • 1 Hour Service
                </p>

                <div class="mt-8 flex items-center gap-4">
                    <div class="flex flex-col">
                        <span class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Starting At</span>
                        <div class="text-4xl font-black text-[#007EA7]">₹999</div>
                    </div>
                    <div class="h-10 w-[1px] bg-gray-100 mx-2"></div>
                    <div class="flex flex-col">
                        <span class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Was</span>
                        <div class="text-xl text-gray-300 font-bold line-through">₹1,500</div>
                    </div>
                </div>

                <button @click="handleClaimDeal"
                    class="mt-8 bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#007EA7] transition-all duration-300 shadow-lg active:scale-95">
                    Claim This Deal
                </button>
            </div>

            <img src="https://via.placeholder.com/400x400?text=Smart+Home"
                class="absolute -right-16 bottom-0 w-80 h-80 object-contain drop-shadow-2xl transition-all duration-1000 group-hover:scale-110 group-hover:-translate-x-4 opacity-30 md:opacity-100" />
        </div>

    </div>
</template>

<script setup>
const handleClaimDeal = () => {
    console.log("Deal Claimed!");
    // Add navigation or logic here
};
</script>

<style scoped>
/* Smooth float animation for images/icons */
@keyframes float {
    0% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-15px);
    }

    100% {
        transform: translateY(0px);
    }
}

.group:hover img {
    animation: float 4s ease-in-out infinite;
}
</style>