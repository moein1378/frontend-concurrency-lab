<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  runSearchRaceComparison,
  type SearchProtectionStrategy,
  type SearchRaceComparison,
  type SearchRaceRun,
} from '@concurrency-lab/scenario-engine'

const defaultSeed = import.meta.env.VITE_DEMO_SEED || 'concurrency-v1'
const seed = ref(defaultSeed)
const ordering = ref<'stale-last' | 'in-order'>('stale-last')
const strategy = ref<SearchProtectionStrategy>('abort')
const comparison = ref<SearchRaceComparison | null>(null)

const latencies = computed(() => ordering.value === 'stale-last'
  ? { firstLatency: 600, secondLatency: 180 }
  : { firstLatency: 180, secondLatency: 600 })

const strategyDescription = computed(() => strategy.value === 'abort'
  ? 'AbortSignal propagates when the newer request starts, so superseded work cannot respond.'
  : 'Both requests complete, but a monotonic sequence token discards the stale response before commit.')

function runScenario() {
  comparison.value = runSearchRaceComparison({
    seed: seed.value.trim() || defaultSeed,
    strategy: strategy.value,
    ...latencies.value,
  })
}

function resetScenario() {
  comparison.value = null
  ordering.value = 'stale-last'
  strategy.value = 'abort'
  seed.value = defaultSeed
}

function resultLabel(run: SearchRaceRun): string {
  return run.invariant.passed ? '✓ Invariant held' : '✕ Invariant violated'
}
</script>

<template>
  <section class="comparison-controls" aria-labelledby="experiment-title">
    <div class="panel-heading">
      <div><p class="kicker">Synchronized deterministic controls</p><h2 id="experiment-title">Run one race, compare both outcomes</h2></div>
      <span class="sync-label">↻ Same seed + timing</span>
    </div>
    <p class="panel-copy">The broken and fixed lanes receive identical requests. Only the selected protection changes.</p>
    <div class="controls comparison-control-grid">
      <label>Seed<input v-model="seed" name="seed" autocomplete="off" /></label>
      <label>Response order
        <select v-model="ordering" name="ordering">
          <option value="stale-last">Older “ca” arrives last</option>
          <option value="in-order">Responses stay in order</option>
        </select>
      </label>
    </div>
    <fieldset class="strategy-picker">
      <legend>Fixed strategy</legend>
      <label :class="{ selected: strategy === 'abort' }"><input v-model="strategy" type="radio" value="abort" /> <span><strong>Cancel superseded</strong><small>AbortController + signal propagation</small></span></label>
      <label :class="{ selected: strategy === 'freshness' }"><input v-model="strategy" type="radio" value="freshness" /> <span><strong>Discard stale</strong><small>Latest-wins sequence token</small></span></label>
    </fieldset>
    <p class="strategy-description">{{ strategyDescription }}</p>
    <div class="request-preview" aria-label="Requests shared by both lanes">
      <span><b>01</b> “ca” <code>{{ latencies.firstLatency }}ms</code></span>
      <span><b>02</b> “cat” <code>{{ latencies.secondLatency }}ms</code></span>
    </div>
    <div class="action-row">
      <button class="primary-action" type="button" @click="runScenario">Run synchronized comparison <span aria-hidden="true">▶</span></button>
      <button class="secondary-action" type="button" @click="resetScenario">Reset</button>
    </div>
  </section>

  <section class="comparison-results" aria-labelledby="results-title" aria-live="polite">
    <div class="section-heading comparison-heading">
      <div><p class="kicker">Visible UI state</p><h2 id="results-title">Broken vs fixed results</h2></div>
      <span v-if="comparison" class="count-badge">2 synchronized lanes</span>
    </div>
    <div v-if="!comparison" class="comparison-empty">
      <span class="empty-icon" aria-hidden="true">⇄</span>
      <h3>Ready to compare</h3>
      <p>Run the scenario to reveal both commits, invariant checks, and event timelines.</p>
    </div>
    <div v-else class="comparison-grid">
      <article class="result-panel lane-broken" aria-labelledby="broken-result-title">
        <div class="panel-heading">
          <div><p class="kicker danger-text">Protection off</p><h3 id="broken-result-title">Broken · results for “{{ comparison.broken.committed.query }}”</h3></div>
          <span :class="comparison.broken.invariant.passed ? 'pass-label' : 'failure-badge'">{{ resultLabel(comparison.broken) }}</span>
        </div>
        <ul class="result-list" :aria-label="`Broken search results for ${comparison.broken.committed.query}`">
          <li v-for="item in comparison.broken.committed.items" :key="item">{{ item }}</li>
        </ul>
        <div class="invariant-card" :class="{ passed: comparison.broken.invariant.passed }">
          <strong>{{ comparison.broken.invariant.statement }}</strong>
          <p>Expected “{{ comparison.broken.expected.query }}”; committed “{{ comparison.broken.committed.query }}”.</p>
        </div>
      </article>

      <article class="result-panel lane-fixed" aria-labelledby="fixed-result-title">
        <div class="panel-heading">
          <div><p class="kicker success-text">{{ comparison.strategy === 'abort' ? 'Cancellation active' : 'Freshness guard active' }}</p><h3 id="fixed-result-title">Fixed · results for “{{ comparison.fixed.committed.query }}”</h3></div>
          <span class="pass-label">{{ resultLabel(comparison.fixed) }}</span>
        </div>
        <ul class="result-list" :aria-label="`Fixed search results for ${comparison.fixed.committed.query}`">
          <li v-for="item in comparison.fixed.committed.items" :key="item">{{ item }}</li>
        </ul>
        <div class="invariant-card passed">
          <strong>{{ comparison.fixed.invariant.statement }}</strong>
          <p>Expected “{{ comparison.fixed.expected.query }}”; committed “{{ comparison.fixed.committed.query }}”.</p>
        </div>
      </article>
    </div>
  </section>

  <section v-if="comparison" class="timeline-section" aria-labelledby="timeline-title">
    <div class="section-heading"><div><p class="kicker">Structured event evidence</p><h2 id="timeline-title">Synchronized event timelines</h2></div><span class="sync-label">↻ Inputs locked</span></div>
    <div class="timeline-grid">
      <section v-for="lane in ([comparison.broken, comparison.fixed] as SearchRaceRun[])" :key="lane.variant" :aria-labelledby="`${lane.variant}-timeline-title`">
        <div class="timeline-heading"><h3 :id="`${lane.variant}-timeline-title`">{{ lane.variant === 'broken' ? 'Broken lane' : 'Fixed lane' }}</h3><span>{{ lane.events.length }} events</span></div>
        <ol class="timeline">
          <li v-for="event in lane.events" :key="event.sequence" :class="`event-${event.kind}`">
            <span class="sequence">{{ String(event.sequence).padStart(2, '0') }}</span>
            <span class="event-time">{{ event.timestamp }}ms</span>
            <strong>{{ event.label }}</strong>
            <span class="event-kind">{{ event.kind }}</span>
          </li>
        </ol>
      </section>
    </div>
  </section>
</template>
