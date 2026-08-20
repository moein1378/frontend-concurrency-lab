<script setup lang="ts">
import SearchRaceLab from '../modules/search-race/SearchRaceLab.vue'

const catalogUrl = `${import.meta.env.BASE_URL}scenarios`
</script>

<template>
  <section class="detail-hero">
    <a class="back-link" :href="catalogUrl">← Scenario catalog</a>
    <div class="detail-title">
      <div><p class="eyebrow">Scenario 01 · Race condition</p><h1>Stale search response</h1></div>
      <span class="comparison-badge">⇄ Broken vs fixed</span>
    </div>
    <p>Replay identical request timing on both lanes, then inspect how cancellation or a freshness guard protects the newest search.</p>
  </section>
  <SearchRaceLab />
</template>
