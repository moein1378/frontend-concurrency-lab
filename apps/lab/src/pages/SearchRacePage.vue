<script setup lang="ts">
import SearchRaceLab from '../modules/search-race/SearchRaceLab.vue'
</script>

<template>
  <section class="detail-hero">
    <a class="back-link" href="/scenarios">← Scenario catalog</a>
    <div class="detail-title">
      <div><p class="eyebrow">Scenario 01 · Race condition</p><h1>Stale search response</h1></div>
      <span class="failure-badge">✕ Intentionally broken</span>
    </div>
    <p>Watch a valid response become stale while it is in flight—then arrive late enough to overwrite the newest search.</p>
  </section>
  <SearchRaceLab />
</template>
