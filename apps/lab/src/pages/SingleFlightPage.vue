<script setup lang="ts">
import SingleFlightLab from '../modules/single-flight/SingleFlightLab.vue'
import ScenarioShell from '../components/ScenarioShell.vue'
</script>
<template><ScenarioShell scenario="single-flight" back-href="/scenarios" eyebrow="Scenario 04 · Single-flight" title="Share one request across matching callers" summary="See concurrent cache misses duplicate work, then join callers to one in-flight producer."><SingleFlightLab /></ScenarioShell></template>
