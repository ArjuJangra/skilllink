<template>
  <div :class="{ 'dark': isDark }">
    <button @click="toggleDarkMode">Toggle Dark Mode</button>

    <router-view />
<DarkModeToggle />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

onMounted(() => {
  isDark.value = localStorage.getItem('theme') === 'dark'
  document.documentElement.classList.toggle('dark', isDark.value)
})

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}
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


