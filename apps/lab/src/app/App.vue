<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import LabHeader from '../components/LabHeader.vue'
import ScenarioCatalogPage from '../pages/ScenarioCatalogPage.vue'
import SearchRacePage from '../pages/SearchRacePage.vue'
import MutualExclusionPage from '../pages/MutualExclusionPage.vue'
import BoundedConcurrencyPage from '../pages/BoundedConcurrencyPage.vue'
import SingleFlightPage from '../pages/SingleFlightPage.vue'
import PrimitivesPage from '../pages/PrimitivesPage.vue'
import CrossTabPage from '../pages/CrossTabPage.vue'

const path = ref(window.location.pathname)
const { locale, t } = useI18n()
let timelineObserver: MutationObserver | undefined

function syncPath() {
  path.value = window.location.pathname
}

function prepareTimelines() {
  document.querySelectorAll<HTMLElement>('.timeline').forEach((timeline) => {
    timeline.tabIndex = 0
    const label = document.documentElement.lang === 'fa' ? 'خط زمانی رویداد؛ برای بررسی از کلیدهای بالا و پایین استفاده کنید' : 'Event timeline; use Up and Down arrows to inspect events'
    timeline.setAttribute('aria-label', label)
    timeline.querySelectorAll<HTMLElement>('li').forEach((item) => {
      item.tabIndex = -1
      const strong = item.querySelector<HTMLElement>('strong'); const kind = item.querySelector('.event-kind')?.textContent?.trim() ?? ''
      if (!strong) return
      strong.dataset.englishLabel ??= strong.textContent ?? ''
      const persianKinds: Record<string, string> = { request: 'درخواست ثبت شد', abort: 'کار منسوخ لغو شد', response: 'پاسخ رسید', commit: 'نتیجه ثبت شد', discard: 'نتیجهٔ تکراری یا قدیمی کنار گذاشته شد', queued: 'کار در صف قرار گرفت', acquire: 'مالکیت یا permit گرفته شد', enter: 'کار وارد بخش بحرانی شد', fail: 'کار با خطا پایان یافت', timeout: 'مهلت کار پایان یافت', cancel: 'کار لغو شد', release: 'مالکیت یا permit آزاد شد', invariant: 'قانون ارزیابی شد' }
      strong.textContent = document.documentElement.lang === 'fa' ? (persianKinds[kind] ?? kind) : strong.dataset.englishLabel
    })
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

function downloadVisibleTrace() {
  const timelines = [...document.querySelectorAll<HTMLElement>('.timeline')].map((timeline, lane) => ({ lane: lane + 1, label: timeline.getAttribute('aria-label'), events: [...timeline.querySelectorAll('li')].map((item) => ({ sequence: Number(item.querySelector('.sequence')?.textContent), timestampMs: Number(item.querySelector('.event-time')?.textContent?.replace('ms', '')), kind: item.querySelector('.event-kind')?.textContent?.trim(), label: item.querySelector('strong')?.textContent?.trim() })) }))
  const controls = [...document.querySelectorAll<HTMLInputElement | HTMLSelectElement>('.comparison-controls input, .comparison-controls select')].map((control) => ({ name: control.name || control.getAttribute('aria-label') || control.type, value: control instanceof HTMLInputElement && (control.type === 'checkbox' || control.type === 'radio') ? control.checked : control.value }))
  const invariants = [...document.querySelectorAll<HTMLElement>('.pass-label, .failure-badge')].map((element) => element.textContent?.trim() ?? '')
  const payload = { format: 'frontend-concurrency-lab-trace-v1', scenario: window.location.pathname.split('/').filter(Boolean).at(-2) ?? 'catalog', route: window.location.pathname, locale: document.documentElement.lang, deterministic: true, controls, invariants, timelines }
  const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }))
  const anchor = document.createElement('a')
  anchor.href = url; anchor.download = `concurrency-trace-${window.location.pathname.split('/').filter(Boolean).at(-2) ?? 'catalog'}.json`; anchor.click(); URL.revokeObjectURL(url)
}

onMounted(() => { window.addEventListener('popstate', syncPath); document.addEventListener('keydown', navigateTimeline); prepareTimelines(); timelineObserver = new MutationObserver(prepareTimelines); timelineObserver.observe(document.body, { childList: true, subtree: true }) })
onBeforeUnmount(() => { window.removeEventListener('popstate', syncPath); document.removeEventListener('keydown', navigateTimeline); timelineObserver?.disconnect() })
watch(locale, async () => { await nextTick(); prepareTimelines() })
</script>

<template>
  <a class="skip-link" href="#main">{{ t('common.skipContent') }}</a>
  <LabHeader />
  <main id="main">
    <SearchRacePage v-if="path.includes('/scenario/search-race')" />
    <MutualExclusionPage v-else-if="path.includes('/scenario/mutual-exclusion')" />
    <BoundedConcurrencyPage v-else-if="path.includes('/scenario/bounded-concurrency')" />
    <SingleFlightPage v-else-if="path.includes('/scenario/single-flight')" />
    <PrimitivesPage v-else-if="path.includes('/primitives')" />
    <CrossTabPage v-else-if="path.includes('/scenario/cross-tab')" />
    <ScenarioCatalogPage v-else />
  </main>
  <footer><span>{{ t('footer.name') }}</span><button class="trace-download" type="button" @click="downloadVisibleTrace">{{ t('common.downloadTrace') }}</button><span>{{ t('footer.status') }}</span></footer>
</template>
