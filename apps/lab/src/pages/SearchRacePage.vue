<script setup lang="ts">
import SearchRaceLab from '../modules/search-race/SearchRaceLab.vue'
import ScenarioShell from '../components/ScenarioShell.vue'

const catalogUrl = '/scenarios'
</script>

<template>
  <ScenarioShell scenario="search-race" :back-href="catalogUrl" eyebrow="Scenario 01 · Race condition" title="Keep stale search results off the screen" summary="See an older request overwrite newer intent, then protect the result with cancellation or a freshness check."><SearchRaceLab /></ScenarioShell>
</template>
