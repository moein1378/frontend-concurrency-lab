<script setup lang="ts">
import ScenarioLearning from './ScenarioLearning.vue'
defineProps<{
  backHref: string
  eyebrow: string
  title: string
  summary: string
  scenario: 'search-race' | 'mutual-exclusion' | 'bounded-concurrency' | 'single-flight' | 'cross-tab'
}>()
const base = import.meta.env.BASE_URL
</script>

<template>
  <article class="scenario-shell">
    <VContainer tag="header" class="detail-hero">
      <RouterLink class="back-link" :to="backHref">← Scenario catalog</RouterLink>
      <div class="detail-hero-grid">
      <div class="detail-hero-copy">
      <div class="detail-title">
        <div>
          <p class="eyebrow">{{ eyebrow }}</p>
          <h1>{{ title }}</h1>
        </div>
      </div>
      <p>{{ summary }}</p>
      </div>
      <img class="scenario-hero-image" :src="`${base}scenarios/${scenario}.png`" :alt="`${title} concept illustration`" />
      </div>
    </VContainer>

    <ScenarioLearning :scenario="scenario"><slot /></ScenarioLearning>
  </article>
</template>
