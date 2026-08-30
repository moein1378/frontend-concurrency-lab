<script setup lang="ts">
import BoundedConcurrencyLab from '../modules/bounded-concurrency/BoundedConcurrencyLab.vue'
import ScenarioShell from '../components/ScenarioShell.vue'
</script>
<template><ScenarioShell scenario="bounded-concurrency" back-href="/scenarios" eyebrow="Scenario 03 · Bounded concurrency" title="Keep upload bursts within capacity" summary="See an uncontrolled batch overload active work, then use a semaphore queue to protect the dependency."><BoundedConcurrencyLab /></ScenarioShell></template>
