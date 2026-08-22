<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { TimelineEvent } from '@concurrency-lab/timeline'
import {
  runSearchRaceComparison,
  type SearchProtectionStrategy,
  type SearchRaceComparison,
  type SearchRaceRun,
  type SearchResult,
} from '@concurrency-lab/scenario-engine'
import { startGuidedTour } from '../../tours/create-tour'

type PlaybackStatus = 'idle' | 'playing' | 'paused' | 'complete'

const { locale, t } = useI18n()
const defaultSeed = import.meta.env.VITE_DEMO_SEED || 'concurrency-v1'
const seed = ref(defaultSeed)
const ordering = ref<'stale-last' | 'in-order'>('stale-last')
const strategy = ref<SearchProtectionStrategy>('abort')
const comparison = ref<SearchRaceComparison | null>(null)
const playbackStatus = ref<PlaybackStatus>('idle')
const playbackSpeed = ref(1)
const visibleTimestamp = ref(-1)
const frameIndex = ref(-1)
const frames = ref<number[]>([])
let playbackTimer: number | undefined
let playbackGeneration = 0

const latencies = computed(() => ordering.value === 'stale-last'
  ? { firstLatency: 600, secondLatency: 180 }
  : { firstLatency: 180, secondLatency: 600 })
const strategyDescription = computed(() => t(strategy.value === 'abort' ? 'lab.abortDescription' : 'lab.freshnessDescription'))
const controlsLocked = computed(() => playbackStatus.value === 'playing' || playbackStatus.value === 'paused')
const progress = computed(() => frames.value.length === 0 ? 0 : Math.round(((frameIndex.value + 1) / frames.value.length) * 100))

function clearPlaybackTimer() {
  if (playbackTimer !== undefined) window.clearTimeout(playbackTimer)
  playbackTimer = undefined
}

function visibleEvents(run: SearchRaceRun): readonly TimelineEvent[] {
  return run.events.filter((event) => event.timestamp <= visibleTimestamp.value)
}

function latestCommit(run: SearchRaceRun): SearchResult | null {
  const commit = [...visibleEvents(run)].reverse().find((event) => event.kind === 'commit')
  const detail = commit?.detail as Record<string, unknown> | undefined
  if (typeof detail?.query !== 'string' || !Array.isArray(detail.items) || !detail.items.every((item) => typeof item === 'string')) return null
  return { query: detail.query, items: detail.items }
}

function invariantVisible(run: SearchRaceRun): boolean {
  return visibleEvents(run).some((event) => event.kind === 'invariant')
}

function frameDelay(current: number, next: number): number {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 0
  const virtualGap = Math.max(0, next - current)
  return Math.max(420, Math.min(1200, virtualGap * 1.5)) / playbackSpeed.value
}

function scheduleNextFrame(generation: number) {
  if (generation !== playbackGeneration || playbackStatus.value !== 'playing') return
  const nextIndex = frameIndex.value + 1
  if (nextIndex >= frames.value.length) {
    playbackStatus.value = 'complete'
    return
  }
  const currentTime = frameIndex.value < 0 ? 0 : frames.value[frameIndex.value] ?? 0
  const nextTime = frames.value[nextIndex] ?? currentTime
  playbackTimer = window.setTimeout(() => {
    if (generation !== playbackGeneration || playbackStatus.value !== 'playing') return
    frameIndex.value = nextIndex
    visibleTimestamp.value = nextTime
    scheduleNextFrame(generation)
  }, frameIndex.value < 0 ? 120 : frameDelay(currentTime, nextTime))
}

function runScenario() {
  clearPlaybackTimer()
  playbackGeneration += 1
  comparison.value = runSearchRaceComparison({ seed: seed.value.trim() || defaultSeed, strategy: strategy.value, ...latencies.value })
  frames.value = [...new Set([
    ...comparison.value.broken.events.map((event) => event.timestamp),
    ...comparison.value.fixed.events.map((event) => event.timestamp),
  ])].sort((left, right) => left - right)
  frameIndex.value = -1
  visibleTimestamp.value = -1
  playbackStatus.value = 'playing'
  scheduleNextFrame(playbackGeneration)
}

function togglePlayback() {
  if (playbackStatus.value === 'playing') {
    clearPlaybackTimer()
    playbackStatus.value = 'paused'
    return
  }
  if (playbackStatus.value === 'paused') {
    playbackStatus.value = 'playing'
    scheduleNextFrame(playbackGeneration)
  }
}

function resetScenario() {
  clearPlaybackTimer()
  playbackGeneration += 1
  comparison.value = null
  playbackStatus.value = 'idle'
  frameIndex.value = -1
  visibleTimestamp.value = -1
  frames.value = []
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
  strategy.value = 'abort'
  runScenario()
  clearPlaybackTimer()
  frameIndex.value = frames.value.length - 1
  visibleTimestamp.value = frames.value.at(-1) ?? -1
  playbackStatus.value = 'complete'
  await nextTick()
  startGuidedTour([
    { element: '[data-tour="experiment"]', title: t('lab.tourIntroTitle'), intro: t('lab.tourIntro'), position: 'bottom' },
    { element: '[data-tour="controls"]', title: t('lab.tourControlsTitle'), intro: t('lab.tourControls'), position: 'bottom' },
    { element: '[data-tour="strategy"]', title: t('lab.tourStrategyTitle'), intro: t('lab.tourStrategy'), position: 'bottom' },
    { element: '[data-tour="requests"]', title: t('lab.tourRequestsTitle'), intro: t('lab.tourRequests'), position: 'top' },
    { element: '[data-tour="playback"]', title: t('lab.tourPlaybackTitle'), intro: t('lab.tourPlayback'), position: 'top' },
    { element: '[data-tour="broken-result"]', title: t('lab.tourBrokenTitle'), intro: t('lab.tourBroken'), position: 'top' },
    { element: '[data-tour="fixed-result"]', title: t('lab.tourFixedTitle'), intro: t('lab.tourFixed'), position: 'top' },
    { element: '[data-tour="timeline"]', title: t('lab.tourTimelineTitle'), intro: t('lab.tourTimeline'), position: 'top' },
    { title: t('lab.tourFinishTitle'), intro: t('lab.tourFinish'), position: 'floating' },
  ], { next: t('tour.next'), previous: t('tour.previous'), done: t('tour.done'), close: t('tour.close'), progress: t('tour.progress') }, locale.value === 'fa')
}

onMounted(() => window.addEventListener('lab:start-tour', startTour))
onBeforeUnmount(() => {
  clearPlaybackTimer()
  window.removeEventListener('lab:start-tour', startTour)
})
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
      <label>{{ t('lab.seed') }}<input v-model="seed" :disabled="controlsLocked" dir="ltr" name="seed" autocomplete="off" /></label>
      <label>{{ t('lab.responseOrder') }}
        <select v-model="ordering" :disabled="controlsLocked" name="ordering"><option value="stale-last">{{ t('lab.staleLast') }}</option><option value="in-order">{{ t('lab.inOrder') }}</option></select>
      </label>
    </div>
    <fieldset class="strategy-picker" data-tour="strategy" :disabled="controlsLocked">
      <legend>{{ t('lab.strategy') }}</legend>
      <label :class="{ selected: strategy === 'abort' }"><input v-model="strategy" type="radio" value="abort" /> <span><strong>{{ t('lab.abortTitle') }}</strong><small>{{ t('lab.abortSubtitle') }}</small></span></label>
      <label :class="{ selected: strategy === 'freshness' }"><input v-model="strategy" type="radio" value="freshness" /> <span><strong>{{ t('lab.freshnessTitle') }}</strong><small>{{ t('lab.freshnessSubtitle') }}</small></span></label>
    </fieldset>
    <p class="strategy-description">{{ strategyDescription }}</p>
    <div class="request-preview" data-tour="requests" :aria-label="t('lab.sharedRequests')" dir="ltr">
      <span><b>01</b> “ca” <code>{{ latencies.firstLatency }}ms</code></span><span><b>02</b> “cat” <code>{{ latencies.secondLatency }}ms</code></span>
    </div>
    <div class="action-row">
      <button class="primary-action" type="button" :disabled="controlsLocked" @click="runScenario">{{ comparison ? t('lab.restart') : t('lab.run') }} <span aria-hidden="true">▶</span></button>
      <button class="secondary-action" type="button" @click="startTour"><span aria-hidden="true">?</span> {{ t('common.startTour') }}</button>
      <button class="secondary-action" type="button" @click="resetScenario">{{ t('common.reset') }}</button>
    </div>
  </section>

  <section class="comparison-results" aria-labelledby="results-title">
    <div class="section-heading comparison-heading"><div><p class="kicker">{{ t('lab.resultsKicker') }}</p><h2 id="results-title">{{ t('lab.resultsTitle') }}</h2></div><span v-if="comparison" class="count-badge">{{ t('lab.lanes') }}</span></div>
    <div v-if="!comparison" class="comparison-empty"><span class="empty-icon" aria-hidden="true">⇄</span><h3>{{ t('lab.readyTitle') }}</h3><p>{{ t('lab.ready') }}</p></div>
    <template v-else>
      <div class="playback-panel" data-tour="playback">
        <div class="playback-summary">
          <span class="playback-state" :data-status="playbackStatus">{{ t(`lab.status${playbackStatus.charAt(0).toUpperCase()}${playbackStatus.slice(1)}`) }}</span>
          <strong dir="ltr">{{ visibleTimestamp < 0 ? 0 : visibleTimestamp }}ms</strong>
          <span>{{ t('lab.stepProgress', { current: Math.max(0, frameIndex + 1), total: frames.length }) }}</span>
        </div>
        <div class="progress-track" role="progressbar" :aria-label="t('lab.playbackProgress')" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"><span :style="{ width: `${progress}%` }"></span></div>
        <div class="playback-actions">
          <button v-if="playbackStatus === 'playing' || playbackStatus === 'paused'" class="secondary-action" type="button" @click="togglePlayback">{{ t(playbackStatus === 'playing' ? 'lab.pause' : 'lab.resume') }}</button>
          <button v-if="playbackStatus === 'complete'" class="secondary-action" type="button" @click="runScenario">{{ t('lab.replay') }}</button>
          <label>{{ t('lab.speed') }}<select v-model.number="playbackSpeed" name="playback-speed"><option :value="0.5">0.5×</option><option :value="1">1×</option><option :value="2">2×</option></select></label>
        </div>
      </div>
      <div class="comparison-grid">
        <article v-for="lane in ([comparison.broken, comparison.fixed] as SearchRaceRun[])" :key="lane.variant" class="result-panel" :class="lane.variant === 'broken' ? 'lane-broken' : 'lane-fixed'" :data-tour="`${lane.variant}-result`" :aria-labelledby="`${lane.variant}-result-title`">
          <div class="panel-heading">
            <div><p class="kicker" :class="lane.variant === 'broken' ? 'danger-text' : 'success-text'">{{ t(lane.variant === 'broken' ? 'lab.protectionOff' : comparison.strategy === 'abort' ? 'lab.cancellationActive' : 'lab.freshnessActive') }}</p><h3 :id="`${lane.variant}-result-title`">{{ latestCommit(lane) ? t(lane.variant === 'broken' ? 'lab.brokenResult' : 'lab.fixedResult', { query: latestCommit(lane)?.query }) : t('lab.waitingResult') }}</h3></div>
            <span v-if="invariantVisible(lane)" :class="lane.invariant.passed ? 'pass-label' : 'failure-badge'">{{ resultLabel(lane) }}</span>
            <span v-else class="count-badge">{{ t('lab.inProgress') }}</span>
          </div>
          <ul v-if="latestCommit(lane)" class="result-list" :aria-label="t(lane.variant === 'broken' ? 'lab.brokenResultsLabel' : 'lab.fixedResultsLabel', { query: latestCommit(lane)?.query })"><li v-for="item in latestCommit(lane)?.items" :key="item">{{ localizedItem(item) }}</li></ul>
          <div v-else class="result-pending"><span aria-hidden="true">…</span><p>{{ t('lab.awaitingCommit') }}</p></div>
          <div v-if="invariantVisible(lane)" class="invariant-card" :class="{ passed: lane.invariant.passed }"><strong>{{ t('scenario.invariantText') }}</strong><p>{{ t('lab.expected', { expected: lane.expected.query, actual: lane.committed.query }) }}</p></div>
        </article>
      </div>
    </template>
  </section>

  <section v-if="comparison" class="timeline-section" data-tour="timeline" aria-labelledby="timeline-title">
    <div class="section-heading"><div><p class="kicker">{{ t('lab.timelineKicker') }}</p><h2 id="timeline-title">{{ t('lab.timelineTitle') }}</h2></div><span class="sync-label">↻ {{ t(controlsLocked ? 'common.inputsLocked' : 'common.inputsEditable') }}</span></div>
    <p class="trace-explainer">{{ t('lab.traceExplainer') }}</p>
    <div class="timeline-grid">
      <section v-for="lane in ([comparison.broken, comparison.fixed] as SearchRaceRun[])" :key="lane.variant" :aria-labelledby="`${lane.variant}-timeline-title`">
        <div class="timeline-heading"><h3 :id="`${lane.variant}-timeline-title`">{{ t(lane.variant === 'broken' ? 'lab.brokenLane' : 'lab.fixedLane') }}</h3><span>{{ t('common.events', { count: visibleEvents(lane).length }) }}</span></div>
        <ol class="timeline" aria-live="polite"><li v-for="event in visibleEvents(lane)" :key="event.sequence" :class="`event-${event.kind}`"><span class="sequence">{{ String(event.sequence).padStart(2, '0') }}</span><span class="event-time" dir="ltr">{{ event.timestamp }}ms</span><strong>{{ eventLabel(event, lane) }}</strong><span class="event-kind">{{ eventKind(event.kind) }}</span></li></ol>
        <p v-if="visibleEvents(lane).length === 0" class="trace-empty">{{ t('lab.awaitingFirstEvent') }}</p>
      </section>
    </div>
  </section>
</template>
