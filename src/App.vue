<template>
  <div>
   
       <SpeedInsights />
    <router-view />


  </div>
</template>

<script setup>

import { SpeedInsights } from '@vercel/speed-insights/vue';

 

// import LoginPage from './components/LoginPage.vue';
// import SignupPage from './components/SignupPage.vue';

// export default {
//   name: 'App',
//   components: {
//     LoginPage,
//     SignupPage

//   }
// }
</script>

