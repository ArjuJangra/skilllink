<template>
    <div class="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50">
        <header class="bg-white shadow sticky top-0 z-50">
            <div class="ml-auto flex justify-between">
                <!-- Logo -->
                <div class="flex items-center space-x-2 px-4">
                    <img src="@/assets/skilllogo.png" alt="SkillLink Logo"
                        class="w-10 h-10 sm:w-12 sm:h-12 transition-transform hover:rotate-12 shadow-lg rounded-s"
                        loading="lazy" />

                    <h1
                        class="text-xl sm:text-2xl font-bold text-gradient bg-gradient-to-b from-[#00A8E8] to-[#007EA7] bg-clip-text text-transparent relative text-shadow-md">
                        SkillLink</h1>
                </div>
                <router-link :to="'/homelogged'" class="ml-auto">
                    <button
                        class="flex gap-1 items-center text-white px-3 py-2 rounded-lg hover:text-[#eff9fe] transition hover:scale-105">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28"
                            class="w-7 h-7 text-[#0073b1]  fill-current">
                            <path
                                d="M12 3l8 7v10a2 2 0 0 1-2 2h-4a1 1 0 0 1-1-1v-5H11v5a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V10l8-7z" />
                        </svg>
                    </button>
                </router-link>
            </div>

        </header>
        <!-- Hero Section -->
        <section
            class="bg-gradient-to-r from-blue-50 via-white to-blue-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
                <!-- Left: Text -->
                <div class="text-center md:text-left max-w-lg space-y-6">
                    <h1
                        class="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#3B8D99] to-[#f46675] bg-clip-text text-transparent leading-tight">
                        Become a SkillLink Service Provider
                    </h1>
                    <p class="text-gray-700 text-lg sm:text-xl">
                        Join thousands of trusted professionals connecting with customers for home repairs, lifestyle
                        services, and more. Grow your business, earn more, and work flexibly.
                    </p>
                    <router-link to="/signup"
                        class="inline-block mt-4 px-8 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                        Register as Provider
                    </router-link>
                </div>

                <!-- Right: Illustration -->
                <div class="max-w-md w-full mx-auto md:mx-0">
                    <img src="@/assets/provider-hero.jpg" alt="Service Provider Illustration"
                        class="w-full rounded-xl shadow-lg object-contain" />
                </div>
            </div>
        </section>

        <!-- Benefits for Providers -->
        <section class="py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div class="max-w-5xl mx-auto text-center space-y-10">
                <h2 class="text-3xl sm:text-4xl font-bold text-gray-800">Why Join SkillLink?</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    <div class="bg-blue-50 p-8 rounded-xl shadow hover:shadow-lg transition">
                        <h3 class="font-semibold text-xl mb-2">Flexible Earnings</h3>
                        <p class="text-gray-700 text-sm">Choose your working hours and increase your income on your
                            terms.</p>
                    </div>
                    <div class="bg-blue-50 p-8 rounded-xl shadow hover:shadow-lg transition">
                        <h3 class="font-semibold text-xl mb-2">Verified Customers</h3>
                        <p class="text-gray-700 text-sm">We connect you with real, verified customers looking for your
                            services.</p>
                    </div>
                    <div class="bg-blue-50 p-8 rounded-xl shadow hover:shadow-lg transition">
                        <h3 class="font-semibold text-xl mb-2">Grow Your Business</h3>
                        <p class="text-gray-700 text-sm">Get more leads, better visibility, and opportunities to expand
                            your service area.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- How It Works -->
        <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 via-white to-blue-50">
            <div class="max-w-5xl mx-auto text-center space-y-10">
                <h2 class="text-3xl sm:text-4xl font-bold text-gray-800">How It Works</h2>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    <div
                        class="bg-white rounded-xl shadow p-8 hover:shadow-lg transition flex flex-col items-center space-y-4">
                        <img src="@/assets/signup-icon.png" class="w-16 h-16" alt="Sign Up Icon" />
                        <h3 class="font-semibold text-lg">Sign Up</h3>
                        <p class="text-gray-600 text-sm text-center">Create your provider account and list your services
                            quickly.</p>
                    </div>
                    <div
                        class="bg-white rounded-xl shadow p-8 hover:shadow-lg transition flex flex-col items-center space-y-4">
                        <img src="@/assets/verify-icon.png" class="w-16 h-16" alt="Verify Icon" />
                        <h3 class="font-semibold text-lg">Get Verified</h3>
                        <p class="text-gray-600 text-sm text-center">We verify your credentials so customers can trust
                            your services.</p>
                    </div>
                    <div
                        class="bg-white rounded-xl shadow p-8 hover:shadow-lg transition flex flex-col items-center space-y-4">
                        <img src="@/assets/earn-icon.png" class="w-16 h-16" alt="Earn Icon" />
                        <h3 class="font-semibold text-lg">Start Earning</h3>
                        <p class="text-gray-600 text-sm text-center">Accept service requests, complete jobs, and earn
                            money seamlessly.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#00A8E8] to-[#007EA7] text-white">
            <div class="max-w-4xl mx-auto text-center space-y-4">
                <h2 class="text-3xl sm:text-4xl font-bold">Ready to Join SkillLink?</h2>
                <p class="text-lg">Sign up today and start offering your services to customers near you.</p>
                <router-link to="/signup"
                    class="inline-block px-8 py-3 font-semibold bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition">
                    Register Now
                </router-link>
            </div>
        </section>
    </div>
</template>

<script setup>
</script>
