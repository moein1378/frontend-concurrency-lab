<script setup lang="ts">
import { computed, ref } from 'vue'
import { runBrokenSearchRace, type SearchRaceRun } from '@concurrency-lab/scenario-engine'

const seed = ref(import.meta.env.VITE_DEMO_SEED || 'concurrency-v1')
const ordering = ref<'stale-last' | 'in-order'>('stale-last')
const run = ref<SearchRaceRun | null>(null)

const latencies = computed(() => ordering.value === 'stale-last'
  ? { firstLatency: 600, secondLatency: 180 }
  : { firstLatency: 180, secondLatency: 600 })

function runScenario() {
  run.value = runBrokenSearchRace({ seed: seed.value.trim() || 'concurrency-v1', ...latencies.value })
}

function resetScenario() {
  run.value = null
  ordering.value = 'stale-last'
  seed.value = import.meta.env.VITE_DEMO_SEED || 'concurrency-v1'
}
</script>

<template>
  <section class="experiment" aria-labelledby="experiment-title">
    <div class="control-panel">
      <div class="panel-heading">
        <div><p class="kicker">Deterministic controls</p><h2 id="experiment-title">Reproduce the race</h2></div>
        <span class="broken-label">✕ Protection off</span>
      </div>
      <p class="panel-copy">Two searches are issued 40ms apart. Change their completion order, then replay the exact same seed.</p>
      <div class="controls">
        <label>Seed<input v-model="seed" name="seed" autocomplete="off" /></label>
        <label>Response order
          <select v-model="ordering" name="ordering">
            <option value="stale-last">Older “ca” arrives last</option>
            <option value="in-order">Responses stay in order</option>
          </select>
        </label>
      </div>
      <div class="request-preview" aria-label="Configured requests">
        <span><b>01</b> “ca” <code>{{ latencies.firstLatency }}ms</code></span>
        <span><b>02</b> “cat” <code>{{ latencies.secondLatency }}ms</code></span>
      </div>
      <div class="action-row">
        <button class="primary-action" type="button" @click="runScenario">Run broken search <span aria-hidden="true">▶</span></button>
        <button class="secondary-action" type="button" @click="resetScenario">Reset</button>
      </div>
    </div>

    <div class="result-panel" :class="{ empty: !run }" aria-live="polite">
      <template v-if="!run">
        <span class="empty-icon" aria-hidden="true">↯</span>
        <h2>Ready to race</h2>
        <p>Run the scenario to reveal response ordering, visible results, and the invariant check.</p>
      </template>
      <template v-else>
        <div class="panel-heading">
          <div><p class="kicker">Visible UI state</p><h2>Results for “{{ run.committed.query }}”</h2></div>
          <span :class="run.invariant.passed ? 'pass-label' : 'failure-badge'">{{ run.invariant.passed ? '✓ Invariant held' : '✕ Invariant violated' }}</span>
        </div>
        <ul class="result-list" :aria-label="`Search results for ${run.committed.query}`">
          <li v-for="item in run.committed.items" :key="item">{{ item }}</li>
        </ul>
        <div class="invariant-card" :class="{ passed: run.invariant.passed }">
          <strong>{{ run.invariant.statement }}</strong>
          <p>Expected “{{ run.expected.query }}”; committed “{{ run.committed.query }}”.</p>
        </div>
      </template>
    </div>
  </section>

  <section v-if="run" class="timeline-section" aria-labelledby="timeline-title">
    <div class="section-heading"><div><p class="kicker">Structured alternative view</p><h2 id="timeline-title">Event timeline</h2></div><span class="count-badge">{{ run.events.length }} events</span></div>
    <ol class="timeline">
      <li v-for="event in run.events" :key="event.sequence" :class="`event-${event.kind}`">
        <span class="sequence">{{ String(event.sequence).padStart(2, '0') }}</span>
        <span class="event-time">{{ event.timestamp }}ms</span>
        <strong>{{ event.label }}</strong>
        <span class="event-kind">{{ event.kind }}</span>
      </li>
    </ol>
  </section>
</template>
