<script setup lang="ts">
import MutualExclusionLab from '../modules/mutual-exclusion/MutualExclusionLab.vue'
import ScenarioShell from '../components/ScenarioShell.vue'
</script>
<template><ScenarioShell scenario="mutual-exclusion" back-href="/scenarios" eyebrow="Scenario 02 · Mutual exclusion" title="Stop double submits from creating double effects" summary="See two clicks overlap, then use a FIFO mutex for local ownership and an idempotency key for the remote effect."><MutualExclusionLab /></ScenarioShell></template>
