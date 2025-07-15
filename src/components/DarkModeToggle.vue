<template>
  <button @click="toggleDarkMode" class="px-3 py-1 rounded border border-gray-400 text-sm">
    {{ isDark ? '☀️ Light' : '🌙 Dark' }}
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

onMounted(() => {
  isDark.value = localStorage.getItem('theme') === 'dark'
})

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}
</script>
