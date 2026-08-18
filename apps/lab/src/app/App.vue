<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import LabHeader from '../components/LabHeader.vue'
import ScenarioCatalogPage from '../pages/ScenarioCatalogPage.vue'
import SearchRacePage from '../pages/SearchRacePage.vue'

const path = ref(window.location.pathname)

function syncPath() {
  path.value = window.location.pathname
}

onMounted(() => window.addEventListener('popstate', syncPath))
onBeforeUnmount(() => window.removeEventListener('popstate', syncPath))
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <LabHeader />
  <main id="main">
    <SearchRacePage v-if="path.includes('/scenario/search-race')" />
    <ScenarioCatalogPage v-else />
  </main>
  <footer><span>Frontend Concurrency Lab</span><span>Fixture mode · v0.1.0</span></footer>
</template>
