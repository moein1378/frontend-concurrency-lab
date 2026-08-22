<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import LabHeader from '../components/LabHeader.vue'
import ScenarioCatalogPage from '../pages/ScenarioCatalogPage.vue'
import SearchRacePage from '../pages/SearchRacePage.vue'
import MutualExclusionPage from '../pages/MutualExclusionPage.vue'
import BoundedConcurrencyPage from '../pages/BoundedConcurrencyPage.vue'

const path = ref(window.location.pathname)
const { t } = useI18n()

function syncPath() {
  path.value = window.location.pathname
}

onMounted(() => window.addEventListener('popstate', syncPath))
onBeforeUnmount(() => window.removeEventListener('popstate', syncPath))
</script>

<template>
  <a class="skip-link" href="#main">{{ t('common.skipContent') }}</a>
  <LabHeader />
  <main id="main">
    <SearchRacePage v-if="path.includes('/scenario/search-race')" />
    <MutualExclusionPage v-else-if="path.includes('/scenario/mutual-exclusion')" />
    <BoundedConcurrencyPage v-else-if="path.includes('/scenario/bounded-concurrency')" />
    <ScenarioCatalogPage v-else />
  </main>
  <footer><span>{{ t('footer.name') }}</span><span>{{ t('footer.status') }}</span></footer>
</template>
