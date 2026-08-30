<script setup lang="ts">
export type StepTone = 'neutral' | 'warning' | 'error' | 'retry'

const props = defineProps<{
  steps: readonly string[]
  current: number
  reason: string
  tone?: StepTone
  skipped?: readonly number[]
}>()

function status(index: number) {
  if (props.skipped?.includes(index)) return 'skipped'
  if (index < props.current) return 'completed'
  if (index > props.current) return 'upcoming'
  return props.tone && props.tone !== 'neutral' ? props.tone : 'current'
}
</script>

<template>
  <section class="scenario-stepper" :data-current-step="current" :data-step-tone="tone ?? 'neutral'" aria-live="polite">
    <div class="stepper-heading">
      <div>
        <p class="kicker">Interaction state</p>
        <h3>Where are you in the flow?</h3>
      </div>
      <span class="state-reason">{{ reason }}</span>
    </div>
    <ol>
      <li v-for="(step, index) in steps" :key="step" :data-status="status(index)" :aria-current="index === current ? 'step' : undefined">
        <span class="step-marker" aria-hidden="true">{{ status(index) === 'completed' ? '✓' : index + 1 }}</span>
        <span>{{ step }}</span>
        <small>{{ status(index) }}</small>
      </li>
    </ol>
  </section>
</template>
