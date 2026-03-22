<template>
  <div>
    <SpeedInsights />
    <router-view />
    <Analytics />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { SpeedInsights } from '@vercel/speed-insights/vue';
import { Analytics } from '@vercel/analytics/vue';
import { initAuth } from '@/stores/auth'; // Import your global init function

// This runs once when the entire website loads
onMounted(async () => {
  try {
    await initAuth();
    console.log("Auth initialized successfully");
  } catch (error) {
    console.error("Auth initialization failed:", error);
  }
});
</script>