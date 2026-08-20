<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { TimelineEvent } from '@concurrency-lab/timeline'
import {
  runSearchRaceComparison,
  type SearchProtectionStrategy,
  type SearchRaceComparison,
  type SearchRaceRun,
} from '@concurrency-lab/scenario-engine'
import { startGuidedTour } from '../../tours/create-tour'

const { locale, t } = useI18n()
const defaultSeed = import.meta.env.VITE_DEMO_SEED || 'concurrency-v1'
const seed = ref(defaultSeed)
const ordering = ref<'stale-last' | 'in-order'>('stale-last')
const strategy = ref<SearchProtectionStrategy>('abort')
const comparison = ref<SearchRaceComparison | null>(null)

const latencies = computed(() => ordering.value === 'stale-last'
  ? { firstLatency: 600, secondLatency: 180 }
  : { firstLatency: 180, secondLatency: 600 })

const strategyDescription = computed(() => t(strategy.value === 'abort' ? 'lab.abortDescription' : 'lab.freshnessDescription'))

function runScenario() {
  comparison.value = runSearchRaceComparison({ seed: seed.value.trim() || defaultSeed, strategy: strategy.value, ...latencies.value })
}

function resetScenario() {
  comparison.value = null
  ordering.value = 'stale-last'
  strategy.value = 'abort'
  seed.value = defaultSeed
}

function resultLabel(run: SearchRaceRun): string {
  return run.invariant.passed ? `✓ ${t('lab.held')}` : `✕ ${t('lab.violated')}`
}

function eventQuery(event: TimelineEvent, lane: SearchRaceRun): string {
  const detail = event.detail as Record<string, unknown>
  if (typeof detail.query === 'string') return detail.query
  if (typeof detail.requestId === 'string') return lane.requests.find((request) => request.id === detail.requestId)?.query ?? ''
  return ''
}

function eventLabel(event: TimelineEvent, lane: SearchRaceRun): string {
  const query = eventQuery(event, lane)
  if (event.kind === 'request') return t('lab.eventRequest', { query })
  if (event.kind === 'abort') return t('lab.eventAbort', { query })
  if (event.kind === 'response') return t('lab.eventResponse', { query })
  if (event.kind === 'commit') return t('lab.eventCommit', { query })
  if (event.kind === 'discard') return t('lab.eventDiscard', { query })
  return lane.invariant.passed ? t('lab.eventPass') : t('lab.eventFail')
}

function eventKind(kind: TimelineEvent['kind']): string {
  return t(`lab.kind${kind.charAt(0).toUpperCase()}${kind.slice(1)}`)
}

function localizedItem(item: string): string {
  return locale.value === 'fa' ? t(`results.${item}`) : item
}

async function startTour() {
  ordering.value = 'stale-last'
  runScenario()
  await nextTick()
  startGuidedTour([
    { element: '[data-tour="experiment"]', popover: { title: t('lab.tourIntroTitle'), description: t('lab.tourIntro'), side: 'bottom' } },
    { element: '[data-tour="controls"]', popover: { title: t('lab.tourControlsTitle'), description: t('lab.tourControls'), side: 'bottom' } },
    { element: '[data-tour="strategy"]', popover: { title: t('lab.tourStrategyTitle'), description: t('lab.tourStrategy'), side: 'bottom' } },
    { element: '[data-tour="requests"]', popover: { title: t('lab.tourRequestsTitle'), description: t('lab.tourRequests'), side: 'top' } },
    { element: '[data-tour="broken-result"]', popover: { title: t('lab.tourBrokenTitle'), description: t('lab.tourBroken'), side: 'top' } },
    { element: '[data-tour="fixed-result"]', popover: { title: t('lab.tourFixedTitle'), description: t('lab.tourFixed'), side: 'top' } },
    { element: '[data-tour="timeline"]', popover: { title: t('lab.tourTimelineTitle'), description: t('lab.tourTimeline'), side: 'top' } },
    { popover: { title: t('lab.tourFinishTitle'), description: t('lab.tourFinish') } },
  ], { next: t('tour.next'), previous: t('tour.previous'), done: t('tour.done'), close: t('tour.close'), progress: t('tour.progress') }, locale.value === 'fa')
}

onMounted(() => window.addEventListener('lab:start-tour', startTour))
onBeforeUnmount(() => window.removeEventListener('lab:start-tour', startTour))
</script>

<template>
  <section class="comparison-controls" data-tour="experiment" aria-labelledby="experiment-title">
    <div class="panel-heading">
      <div><p class="kicker">{{ t('lab.controlsKicker') }}</p><h2 id="experiment-title">{{ t('lab.controlsTitle') }}</h2></div>
      <span class="sync-label">↻ {{ t('lab.sync') }}</span>
    </div>
    <p class="panel-copy">{{ t('lab.controlsIntro') }}</p>
    <aside class="prediction-card"><strong>{{ t('lab.predictionTitle') }}</strong><p>{{ t('lab.prediction') }}</p></aside>
    <div class="controls comparison-control-grid" data-tour="controls">
      <label>{{ t('lab.seed') }}<input v-model="seed" dir="ltr" name="seed" autocomplete="off" /></label>
      <label>{{ t('lab.responseOrder') }}
        <select v-model="ordering" name="ordering"><option value="stale-last">{{ t('lab.staleLast') }}</option><option value="in-order">{{ t('lab.inOrder') }}</option></select>
      </label>
    </div>
    <fieldset class="strategy-picker" data-tour="strategy">
      <legend>{{ t('lab.strategy') }}</legend>
      <label :class="{ selected: strategy === 'abort' }"><input v-model="strategy" type="radio" value="abort" /> <span><strong>{{ t('lab.abortTitle') }}</strong><small>{{ t('lab.abortSubtitle') }}</small></span></label>
      <label :class="{ selected: strategy === 'freshness' }"><input v-model="strategy" type="radio" value="freshness" /> <span><strong>{{ t('lab.freshnessTitle') }}</strong><small>{{ t('lab.freshnessSubtitle') }}</small></span></label>
    </fieldset>
    <p class="strategy-description">{{ strategyDescription }}</p>
    <div class="request-preview" data-tour="requests" :aria-label="t('lab.sharedRequests')" dir="ltr">
      <span><b>01</b> “ca” <code>{{ latencies.firstLatency }}ms</code></span><span><b>02</b> “cat” <code>{{ latencies.secondLatency }}ms</code></span>
    </div>
    <div class="action-row">
      <button class="primary-action" type="button" @click="runScenario">{{ t('lab.run') }} <span aria-hidden="true">▶</span></button>
      <button class="secondary-action" type="button" @click="startTour"><span aria-hidden="true">?</span> {{ t('common.startTour') }}</button>
      <button class="secondary-action" type="button" @click="resetScenario">{{ t('common.reset') }}</button>
    </div>
  </section>

  <section class="comparison-results" aria-labelledby="results-title" aria-live="polite">
    <div class="section-heading comparison-heading"><div><p class="kicker">{{ t('lab.resultsKicker') }}</p><h2 id="results-title">{{ t('lab.resultsTitle') }}</h2></div><span v-if="comparison" class="count-badge">{{ t('lab.lanes') }}</span></div>
    <div v-if="!comparison" class="comparison-empty"><span class="empty-icon" aria-hidden="true">⇄</span><h3>{{ t('lab.readyTitle') }}</h3><p>{{ t('lab.ready') }}</p></div>
    <div v-else class="comparison-grid">
      <article class="result-panel lane-broken" data-tour="broken-result" aria-labelledby="broken-result-title">
        <div class="panel-heading"><div><p class="kicker danger-text">{{ t('lab.protectionOff') }}</p><h3 id="broken-result-title">{{ t('lab.brokenResult', { query: comparison.broken.committed.query }) }}</h3></div><span :class="comparison.broken.invariant.passed ? 'pass-label' : 'failure-badge'">{{ resultLabel(comparison.broken) }}</span></div>
        <ul class="result-list" :aria-label="t('lab.brokenResultsLabel', { query: comparison.broken.committed.query })"><li v-for="item in comparison.broken.committed.items" :key="item">{{ localizedItem(item) }}</li></ul>
        <div class="invariant-card" :class="{ passed: comparison.broken.invariant.passed }"><strong>{{ t('scenario.invariantText') }}</strong><p>{{ t('lab.expected', { expected: comparison.broken.expected.query, actual: comparison.broken.committed.query }) }}</p></div>
      </article>
      <article class="result-panel lane-fixed" data-tour="fixed-result" aria-labelledby="fixed-result-title">
        <div class="panel-heading"><div><p class="kicker success-text">{{ t(comparison.strategy === 'abort' ? 'lab.cancellationActive' : 'lab.freshnessActive') }}</p><h3 id="fixed-result-title">{{ t('lab.fixedResult', { query: comparison.fixed.committed.query }) }}</h3></div><span class="pass-label">{{ resultLabel(comparison.fixed) }}</span></div>
        <ul class="result-list" :aria-label="t('lab.fixedResultsLabel', { query: comparison.fixed.committed.query })"><li v-for="item in comparison.fixed.committed.items" :key="item">{{ localizedItem(item) }}</li></ul>
        <div class="invariant-card passed"><strong>{{ t('scenario.invariantText') }}</strong><p>{{ t('lab.expected', { expected: comparison.fixed.expected.query, actual: comparison.fixed.committed.query }) }}</p></div>
      </article>
    </div>
  </section>

  <section v-if="comparison" class="timeline-section" data-tour="timeline" aria-labelledby="timeline-title">
    <div class="section-heading"><div><p class="kicker">{{ t('lab.timelineKicker') }}</p><h2 id="timeline-title">{{ t('lab.timelineTitle') }}</h2></div><span class="sync-label">↻ {{ t('common.inputsLocked') }}</span></div>
    <div class="timeline-grid">
      <section v-for="lane in ([comparison.broken, comparison.fixed] as SearchRaceRun[])" :key="lane.variant" :aria-labelledby="`${lane.variant}-timeline-title`">
        <div class="timeline-heading"><h3 :id="`${lane.variant}-timeline-title`">{{ t(lane.variant === 'broken' ? 'lab.brokenLane' : 'lab.fixedLane') }}</h3><span>{{ t('common.events', { count: lane.events.length }) }}</span></div>
        <ol class="timeline"><li v-for="event in lane.events" :key="event.sequence" :class="`event-${event.kind}`"><span class="sequence">{{ String(event.sequence).padStart(2, '0') }}</span><span class="event-time" dir="ltr">{{ event.timestamp }}ms</span><strong>{{ eventLabel(event, lane) }}</strong><span class="event-kind">{{ eventKind(event.kind) }}</span></li></ol>
      </section>
    </div>
  </section>
</template>
