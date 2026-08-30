<script setup lang="ts">
defineProps<{
  change: string
  system: string
  why: string
  result: string
  concept: string
  unchanged?: boolean
  flow?: readonly string[]
}>()
</script>

<template>
  <aside class="why-panel" aria-live="polite">
    <div class="why-heading"><span aria-hidden="true">↳</span><div><p class="kicker">Live tutor</p><h3>Why did this happen?</h3></div></div>
    <dl class="why-details">
      <div><dt>You changed</dt><dd>{{ change }}</dd></div>
      <div><dt>Internal effect</dt><dd>{{ system }}</dd></div>
      <div><dt>Why</dt><dd>{{ why }}</dd></div>
      <div :class="{ unchanged }"><dt>{{ unchanged ? 'Why the result stayed the same' : 'Result' }}</dt><dd>{{ result }}</dd></div>
      <div class="concept-row"><dt>Concept</dt><dd>{{ concept }}</dd></div>
    </dl>
  </aside>
</template>
