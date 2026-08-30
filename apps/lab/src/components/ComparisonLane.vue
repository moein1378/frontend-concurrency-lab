<script setup lang="ts">
defineProps<{
  variant: 'broken' | 'fixed'
  title: string
  statusLabel: string
  status: 'pass' | 'fail'
}>()
</script>

<template>
  <VCard
    tag="article"
    class="result-panel"
    :class="variant === 'broken' ? 'lane-broken' : 'lane-fixed'"
    height="100%"
  >
    <VCardTitle tag="h2">{{ title }}</VCardTitle>
    <VCardText>
      <p
        class="lane-status"
        :class="status === 'pass' ? 'pass-label' : 'failure-badge'"
        role="status"
      >
        <span aria-hidden="true">{{ status === 'pass' ? '✓' : '!' }}</span>
        <span>{{ statusLabel }}</span>
      </p>

      <slot name="metrics" />
      <slot />
      <slot name="timeline" />
    </VCardText>
  </VCard>
</template>
