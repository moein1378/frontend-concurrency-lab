<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

const dark = ref(false)
const themeStorageKey = 'concurrency-lab-theme'
const baseUrl = import.meta.env.BASE_URL
const faviconUrl = `${baseUrl}favicon.svg`
onMounted(() => {
  dark.value = window.localStorage.getItem(themeStorageKey) === 'dark'
  document.documentElement.dataset.theme = dark.value ? 'dark' : 'light'
  theme.change(dark.value ? 'labDark' : 'labLight')
})

function toggleTheme() {
  dark.value = !dark.value
  document.documentElement.dataset.theme = dark.value ? 'dark' : 'light'
  window.localStorage.setItem(themeStorageKey, dark.value ? 'dark' : 'light')
  theme.change(dark.value ? 'labDark' : 'labLight')
}

</script>

<template>
  <header class="site-header"><div class="header-inner">
    <RouterLink class="brand" to="/scenarios" aria-label="Scenarios">
      <img :src="faviconUrl" width="34" height="34" alt="" />
      <span>Concurrency Lab</span>
    </RouterLink>
    <nav aria-label="Primary navigation">
      <RouterLink to="/scenarios">Scenarios</RouterLink>
    </nav>
    <div class="header-actions">
      <button class="icon-button" type="button" :aria-label="dark ? 'Use light theme' : 'Use dark theme'" @click="toggleTheme">
        <span aria-hidden="true">{{ dark ? '☀' : '☾' }}</span>
        <span>{{ dark ? 'Light theme' : 'Dark theme' }}</span>
      </button>
    </div>
  </div></header>
</template>
