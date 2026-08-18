<script setup lang="ts">
import { onMounted, ref } from 'vue'

const dark = ref(false)
onMounted(() => { dark.value = document.documentElement.dataset.theme === 'dark' })

function toggleTheme() {
  dark.value = !dark.value
  document.documentElement.dataset.theme = dark.value ? 'dark' : 'light'
}
</script>

<template>
  <header class="site-header">
    <a class="brand" href="/scenarios" aria-label="Frontend Concurrency Lab scenario catalog">
      <img src="/favicon.svg" width="34" height="34" alt="" />
      <span>Concurrency <strong>Lab</strong></span>
    </a>
    <nav aria-label="Primary navigation">
      <a href="/scenarios">Scenarios</a>
      <span aria-disabled="true">Primitives · soon</span>
    </nav>
    <div class="header-actions">
      <span class="mode-badge"><span aria-hidden="true">●</span> Fixture</span>
      <button class="icon-button" type="button" :aria-label="dark ? 'Use light theme' : 'Use dark theme'" @click="toggleTheme">
        {{ dark ? '☀' : '◐' }}
      </button>
    </div>
  </header>
</template>
