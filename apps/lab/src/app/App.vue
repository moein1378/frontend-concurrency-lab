<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import LabHeader from '../components/LabHeader.vue'

const route = useRoute()

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
  const scenario = route.path.split('/').filter(Boolean).at(-2) ?? 'catalog'
  const payload = { format: 'frontend-concurrency-lab-trace-v1', scenario, route: route.fullPath, deterministic: true, controls, invariants, timelines }
  const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }))
  const anchor = document.createElement('a')
  anchor.href = url; anchor.download = `concurrency-trace-${scenario}.json`; anchor.click(); URL.revokeObjectURL(url)
}

onMounted(() => document.addEventListener('keydown', navigateTimeline))
onBeforeUnmount(() => document.removeEventListener('keydown', navigateTimeline))
</script>

<template>
  <v-app>
    <a class="skip-link" href="#main">Skip to content</a>
    <LabHeader />
    <v-main id="main">
      <RouterView />
    </v-main>
    <v-footer class="app-footer"><span>Frontend Concurrency Lab</span><button class="trace-download" type="button" @click="downloadVisibleTrace">Download visible trace</button><span>Interactive lessons · v1.0.0</span></v-footer>
  </v-app>
</template>
