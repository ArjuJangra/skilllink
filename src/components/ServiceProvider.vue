<template>
  <div class="min-h-screen bg-[#F0F9FF] text-gray-800">
    <!-- Navbar -->
    <header class="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-[#0073b1]">SkillLink Provider</h1>
      <nav class="space-x-4 text-sm md:text-base">
        <a href="#home" class="text-[#0073b1] hover:underline">Home</a>
        <a href="#orders" class="text-[#0073b1] hover:underline">Orders</a>
        <a href="#policies" class="text-[#0073b1] hover:underline">Policies</a>
        <a href="#about" class="text-[#0073b1] hover:underline">About</a>
        <a href="#contact" class="text-[#0073b1] hover:underline">Contact</a>
        <button class="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Logout</button>
      </nav>
    </header>

    <!-- Hero / Welcome Section -->
    <section id="home" class="px-6 py-10 text-center bg-white shadow-md mt-4 mx-4 rounded-xl">
      <h2 class="text-3xl font-bold text-[#0073b1] mb-4">Welcome to SkillLink, Provider!</h2>
      <p class="text-gray-600 max-w-2xl mx-auto">
        Thank you for joining us! Here you can accept service requests, manage orders, and grow your reach with SkillLink.
      </p>
    </section>

    <!-- Orders Info Section -->
    <section id="orders" class="px-6 py-10 mt-10">
      <h3 class="text-2xl font-semibold text-[#0073b1] mb-4">How Orders Work</h3>
      <ul class="list-disc list-inside space-y-2 text-gray-700">
        <li>You will receive order notifications based on your listed services.</li>
        <li>You can Accept or Reject incoming requests in your dashboard.</li>
        <li>After accepting, update the status to "Completed" once the service is delivered.</li>
        <li>Timely service and good ratings will increase your visibility on the platform.</li>
      </ul>
    </section>

    <!-- Policies Section -->
    <section id="policies" class="px-6 py-10 bg-white mt-6 shadow-sm rounded-lg mx-4">
      <h3 class="text-2xl font-semibold text-[#0073b1] mb-4">Our Policies</h3>
      <ul class="list-disc list-inside text-gray-700 space-y-2">
        <li>Respect customer privacy and property.</li>
        <li>No advance payments should be demanded from customers.</li>
        <li>Misuse of platform leads to account suspension.</li>
        <li>All disputes must be reported to SkillLink Support.</li>
      </ul>
    </section>

    <!-- About Section -->
    <section id="about" class="px-6 py-10 mt-10">
      <h3 class="text-2xl font-semibold text-[#0073b1] mb-4">About SkillLink</h3>
      <p class="text-gray-700 max-w-2xl">
        SkillLink is a platform that connects verified service providers like you to customers in need of trustworthy repair, maintenance, and support services.
        We aim to empower local professionals and streamline home and field service delivery.
      </p>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="px-6 py-10 mt-10 bg-[#e6f4fa]">
      <h3 class="text-2xl font-semibold text-[#0073b1] mb-4">Contact Us</h3>
      <p class="text-gray-700">
        Have any questions or need help? Reach out to our support team at <strong>support@skilllink.com</strong> or call us at <strong>+91 98765 43210</strong>.
      </p>
    </section>

    <!-- Footer -->
    <footer class="text-center py-6 text-sm text-gray-500 mt-10">
      © 2025 SkillLink Provider Portal. All rights reserved.
    </footer>
  </div>
</template>

<script>
export default {
  name: "ProviderWelcome",
};
</script>
