<script setup lang="ts">
interface EventTimelineItem {
  sequence: number
  timestamp: number
  kind: string
  label: string
}

const props = defineProps<{
  events: readonly EventTimelineItem[]
  ariaLabel: string
  emptyLabel?: string
}>()
</script>

<template>
  <ol class="timeline" tabindex="0" :aria-label="ariaLabel" aria-live="polite">
    <li
      v-for="event in props.events"
      :key="event.sequence"
      tabindex="-1"
      :class="`event-${event.kind}`"
    >
      <span class="sequence">{{ String(event.sequence).padStart(2, '0') }}</span>
      <span class="event-time" dir="ltr">{{ event.timestamp }}ms</span>
      <strong>{{ event.label }}</strong>
      <span class="event-kind">{{ event.kind }}</span>
    </li>
  </ol>
  <p v-if="props.events.length === 0 && emptyLabel" class="timeline-empty" role="status">
    {{ emptyLabel }}
  </p>
</template>
