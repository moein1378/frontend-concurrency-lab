<script setup lang="ts">
import { ref } from 'vue'

const sections = [
  { label: 'Controls', selector: '.comparison-controls' },
  { label: 'Why?', selector: '.why-panel' },
  { label: 'Result', selector: '.comparison-results' },
] as const
const activeSection = ref<string>(sections[0].selector)

function move(event: MouseEvent, selector: string) {
  const workspace = (event.currentTarget as HTMLElement).closest('.simulator-workspace')
    ?? document.querySelector('.simulator-workspace')
  const target = workspace?.querySelector<HTMLElement>(selector)
  if (!target) return

  activeSection.value = selector
  target.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'start',
  })
}
</script>

<template>
  <nav class="workspace-navigator" aria-label="Simulator sections">
    <button
      v-for="section in sections"
      :key="section.selector"
      type="button"
      :class="{ 'is-active': activeSection === section.selector }"
      :aria-current="activeSection === section.selector ? 'location' : undefined"
      @click="move($event, section.selector)"
    >{{ section.label }}</button>
  </nav>
</template>
