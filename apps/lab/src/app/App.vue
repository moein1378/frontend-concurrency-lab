<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import LabHeader from '../components/LabHeader.vue'
import ScenarioCatalogPage from '../pages/ScenarioCatalogPage.vue'
import SearchRacePage from '../pages/SearchRacePage.vue'
import MutualExclusionPage from '../pages/MutualExclusionPage.vue'
import BoundedConcurrencyPage from '../pages/BoundedConcurrencyPage.vue'
import SingleFlightPage from '../pages/SingleFlightPage.vue'

const path = ref(window.location.pathname)
const { t } = useI18n()
let timelineObserver: MutationObserver | undefined

function syncPath() {
  path.value = window.location.pathname
}

function prepareTimelines() {
  document.querySelectorAll<HTMLElement>('.timeline').forEach((timeline) => {
    timeline.tabIndex = 0
    if (!timeline.getAttribute('aria-label')) timeline.setAttribute('aria-label', 'Event timeline; use Up and Down arrows to inspect events')
    timeline.querySelectorAll<HTMLElement>('li').forEach((item) => { item.tabIndex = -1 })
  })
}

function navigateTimeline(event: KeyboardEvent) {
  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
  const timeline = (event.target as HTMLElement).closest<HTMLElement>('.timeline')
  if (!timeline) return
  const items = [...timeline.querySelectorAll<HTMLElement>('li')]
  if (items.length === 0) return
  const current = items.indexOf(document.activeElement as HTMLElement)
  const next = event.key === 'ArrowDown' ? Math.min(items.length - 1, current + 1) : Math.max(0, current <= 0 ? 0 : current - 1)
  event.preventDefault(); items[next]?.focus()
}

onMounted(() => { window.addEventListener('popstate', syncPath); document.addEventListener('keydown', navigateTimeline); prepareTimelines(); timelineObserver = new MutationObserver(prepareTimelines); timelineObserver.observe(document.body, { childList: true, subtree: true }) })
onBeforeUnmount(() => { window.removeEventListener('popstate', syncPath); document.removeEventListener('keydown', navigateTimeline); timelineObserver?.disconnect() })
</script>

<template>
  <a class="skip-link" href="#main">{{ t('common.skipContent') }}</a>
  <LabHeader />
  <main id="main">
    <SearchRacePage v-if="path.includes('/scenario/search-race')" />
    <MutualExclusionPage v-else-if="path.includes('/scenario/mutual-exclusion')" />
    <BoundedConcurrencyPage v-else-if="path.includes('/scenario/bounded-concurrency')" />
    <SingleFlightPage v-else-if="path.includes('/scenario/single-flight')" />
    <ScenarioCatalogPage v-else />
  </main>
  <footer><span>{{ t('footer.name') }}</span><span>{{ t('footer.status') }}</span></footer>
</template>
