<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import type { TimelineEvent } from '@concurrency-lab/timeline'
import {
  runSearchRaceComparison,
  type SearchProtectionStrategy,
  type SearchRaceComparison,
  type SearchRaceRun,
  type SearchResult,
} from '@concurrency-lab/scenario-engine'
import WhyPanel from '../../components/WhyPanel.vue'
import WorkspaceNavigator from '../../components/WorkspaceNavigator.vue'
import ScenarioStateStepper from '../../components/ScenarioStateStepper.vue'

type PlaybackStatus = 'idle' | 'playing' | 'paused' | 'complete'

const copy: Record<string, string> = {
  'lab.abortDescription': 'AbortSignal propagates when the newer request starts, so superseded work cannot respond.', 'lab.freshnessDescription': 'Both requests complete, but a monotonic sequence token discards the stale response before commit.',
  'lab.held': 'Invariant held', 'lab.violated': 'Invariant violated', 'lab.controlsKicker': 'Synchronized deterministic controls', 'lab.controlsTitle': 'Run one race, compare both outcomes', 'lab.sync': 'Same seed + timing', 'lab.controlsIntro': 'The broken and fixed lanes receive identical requests. Only the selected protection changes.', 'lab.predictionTitle': 'Before clicking Run, predict the outcome', 'lab.prediction': 'The latest user intent is “cat.” Which lane can still end with “ca,” and what event should prevent it in the fixed lane?', 'lab.seed': 'Seed', 'lab.responseOrder': 'Response order', 'lab.staleLast': 'Older “ca” arrives last', 'lab.inOrder': 'Responses stay in order', 'lab.speed': 'Playback speed', 'lab.strategy': 'Fixed strategy', 'lab.abortTitle': 'Cancel superseded', 'lab.abortSubtitle': 'AbortController + signal propagation', 'lab.freshnessTitle': 'Discard stale', 'lab.freshnessSubtitle': 'Latest-wins sequence token', 'lab.sharedRequests': 'Requests shared by both lanes', 'lab.restart': 'Restart live comparison', 'lab.run': 'Run live comparison', 'common.reset': 'Reset', 'lab.resultsKicker': 'Visible UI state', 'lab.resultsTitle': 'Broken vs fixed results', 'lab.lanes': '2 synchronized lanes', 'lab.readyTitle': 'Ready to compare', 'lab.ready': 'Run the scenario to reveal both commits, invariant checks, and event timelines.', 'lab.statusIdle': 'Ready', 'lab.statusPlaying': 'Live', 'lab.statusPaused': 'Paused', 'lab.statusComplete': 'Complete', 'lab.playbackProgress': 'Scenario playback progress', 'lab.pause': 'Pause trace', 'lab.resume': 'Resume trace', 'lab.replay': 'Replay from start', 'lab.protectionOff': 'Protection off', 'lab.cancellationActive': 'Cancellation active', 'lab.freshnessActive': 'Freshness guard active', 'lab.inProgress': 'Running', 'lab.waitingResult': 'Waiting for a commit', 'lab.awaitingCommit': 'No result is visible yet. Watch for the first commit event.', 'scenario.invariantText': 'Visible results must belong to the latest query issued by the user—not the request that happened to finish last.', 'lab.timelineKicker': 'Structured event evidence', 'lab.timelineTitle': 'Synchronized event timelines', 'common.inputsLocked': 'Inputs locked', 'common.inputsEditable': 'Inputs ready to edit', 'lab.traceExplainer': 'Events appear at their deterministic virtual time. A commit updates the visible result immediately; the invariant is evaluated only after the run finishes.', 'lab.brokenLane': 'Broken lane', 'lab.fixedLane': 'Fixed lane', 'lab.awaitingFirstEvent': 'The live trace will begin here.',
  'lab.eventPass': 'Latest query preserved', 'lab.eventFail': 'Latest query was overwritten', 'lab.kindRequest': 'request', 'lab.kindAbort': 'abort', 'lab.kindResponse': 'response', 'lab.kindCommit': 'commit', 'lab.kindDiscard': 'discard', 'lab.kindInvariant': 'invariant',
}
function t(key: string, values: Record<string, unknown> = {}): string {
  const templates: Record<string, string> = { 'lab.stepProgress': 'Step {current} of {total}', 'lab.brokenResult': 'Broken · results for “{query}”', 'lab.fixedResult': 'Fixed · results for “{query}”', 'lab.brokenResultsLabel': 'Broken search results for {query}', 'lab.fixedResultsLabel': 'Fixed search results for {query}', 'lab.expected': 'Expected “{expected}”; committed “{actual}”.', 'common.events': '{count} events', 'lab.eventRequest': 'Request “{query}” issued', 'lab.eventAbort': 'Request “{query}” aborted as superseded', 'lab.eventResponse': 'Response “{query}” arrived', 'lab.eventCommit': 'Results replaced by “{query}”', 'lab.eventDiscard': 'Stale response “{query}” discarded' }
  return (copy[key] ?? templates[key] ?? key).replace(/\{(\w+)\}/g, (_, name: string) => String(values[name] ?? ''))
}
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
const feedback = ref({ change: 'Nothing yet — choose a response order or protection.', system: 'The simulator is waiting with two product-search requests.', why: 'A baseline makes the next transition easy to compare.', result: 'No result exists until you run the requests.', concept: 'Prediction before observation', unchanged: true, activeStep: 0 })

const latencies = computed(() => ordering.value === 'stale-last'
  ? { firstLatency: 600, secondLatency: 180 }
  : { firstLatency: 180, secondLatency: 600 })
const strategyDescription = computed(() => t(strategy.value === 'abort' ? 'lab.abortDescription' : 'lab.freshnessDescription'))
const controlsLocked = computed(() => playbackStatus.value === 'playing' || playbackStatus.value === 'paused')
const progress = computed(() => frames.value.length === 0 ? 0 : Math.round(((frameIndex.value + 1) / frames.value.length) * 100))
const tutorFlow = ['Shopper types', 'API requests', 'Response order', 'Commit decision', 'Product results']
const interactionStep = computed(() => comparison.value === null ? 0 : playbackStatus.value === 'complete' ? 4 : playbackStatus.value === 'paused' ? 2 : 2)
const interactionTone = computed(() => playbackStatus.value === 'paused' ? 'warning' as const : 'neutral' as const)
const interactionReason = computed(() => comparison.value === null ? 'Configuration is editable; running the comparison triggers the flow.' : playbackStatus.value === 'paused' ? 'Playback is paused; simulator state is preserved until you resume.' : playbackStatus.value === 'complete' ? 'Every event is visible and the freshness invariant has been evaluated.' : 'Events are being revealed from the deterministic virtual clock.')

watch(ordering, (next, previous) => { feedback.value = next === 'stale-last' ? { change: `Response order: ${previous} → ${next}`, system: 'The “cat” response now arrives before the older “ca” response.', why: 'Network work completes independently, so an older request can take longer.', result: 'The unprotected lane will finish with stale “ca”; protection keeps “cat”.', concept: 'Race condition', unchanged: false, activeStep: 2 } : { change: `Response order: ${previous} → ${next}`, system: 'Responses now arrive in the same order as the keystrokes.', why: 'The newer “cat” request is deliberately assigned the longer completion time.', result: 'Both lanes finish with “cat”; protection is still present but has nothing stale to reject.', concept: 'Safe control case', unchanged: true, activeStep: 2 } })
watch(strategy, (next, previous) => { feedback.value = next === 'abort' ? { change: `Protection: ${previous} → abort`, system: 'Starting “cat” signals the older “ca” work to stop.', why: 'AbortSignal propagates that the older intent is no longer useful.', result: 'The stale response cannot reach the commit decision, saving downstream work.', concept: 'Cancellation', unchanged: false, activeStep: 3 } : { change: `Protection: ${previous} → freshness token`, system: 'Both requests may finish, but each response carries its sequence.', why: 'Commit accepts only the sequence that still matches the latest intent.', result: 'The visible result remains “cat”, but the stale request still consumes network work.', concept: 'Latest-wins guard', unchanged: true, activeStep: 3 } })
watch(playbackSpeed, (next, previous) => { feedback.value = { change: `Playback speed: ${previous}× → ${next}×`, system: 'Only the teaching clock advances faster or slower.', why: 'Playback speed changes presentation, not deterministic request timestamps.', result: 'The final result does not change because response order and protection are unchanged.', concept: 'Simulation vs presentation state', unchanged: true, activeStep: 2 } })

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
    if (comparison.value) feedback.value = { change: 'Playback reached the final event.', system: 'Both lanes exposed their commits and evaluated the freshness invariant.', why: 'The final check compares committed state with the latest issued query.', result: comparison.value.fixed.invariant.passed ? 'The protected lane preserved “cat”; the broken lane demonstrates whether ordering was unsafe.' : 'The protected lane did not preserve the latest query.', concept: 'Freshness invariant', unchanged: false, activeStep: 4 }
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
  feedback.value = ordering.value === 'stale-last' ? { change: 'Ran the two-request product search.', system: strategy.value === 'abort' ? 'The newer request cancelled its predecessor before commit.' : 'The commit guard compared response sequences.', why: 'Only the latest user intent is allowed to own the visible result.', result: 'Watch “ca” become stale while “cat” remains authoritative in the protected lane.', concept: strategy.value === 'abort' ? 'Cancellation + freshness' : 'Latest-wins freshness', unchanged: false, activeStep: 3 } : { change: 'Ran the in-order control case.', system: 'No response attempted to commit after a newer response.', why: 'Completion order happened to match intent order.', result: 'Both lanes stay correct; the protection causes no visible difference in this run.', concept: 'A race requires adverse ordering', unchanged: true, activeStep: 3 }
  scheduleNextFrame(playbackGeneration)
}

function togglePlayback() {
  if (playbackStatus.value === 'playing') {
    clearPlaybackTimer()
    playbackStatus.value = 'paused'
    feedback.value = { change: `Paused playback at ${Math.max(0, visibleTimestamp.value)}ms.`, system: 'The virtual clock stopped while the revealed simulator state stayed intact.', why: 'Pausing changes inspection time, not the deterministic event order.', result: 'Resume to reveal the remaining commits and invariant evidence.', concept: 'Inspectable deterministic playback', unchanged: true, activeStep: interactionStep.value }
    return
  }
  if (playbackStatus.value === 'paused') {
    playbackStatus.value = 'playing'
    feedback.value = { change: `Resumed playback from ${Math.max(0, visibleTimestamp.value)}ms.`, system: 'The virtual clock continues from the preserved frame.', why: 'The simulator reuses the same seed, timings, and event sequence.', result: 'The next deterministic event will update the visible evidence.', concept: 'Replayable virtual time', unchanged: true, activeStep: interactionStep.value }
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

onBeforeUnmount(() => {
  clearPlaybackTimer()
})
</script>

<template>
  <section class="simulator-workspace" data-scenario="search-race">
  <WorkspaceNavigator />
  <ScenarioStateStepper :steps="tutorFlow" :current="interactionStep" :tone="interactionTone" :reason="interactionReason" />
  <VCard tag="section" class="comparison-controls" aria-labelledby="experiment-title" variant="outlined">
    <VCardText>
    <div class="panel-heading">
      <div><p class="kicker">{{ t('lab.controlsKicker') }}</p><h2 id="experiment-title">{{ t('lab.controlsTitle') }}</h2></div>
      <span class="sync-label">↻ {{ t('lab.sync') }}</span>
    </div>
    <p class="panel-copy">{{ t('lab.controlsIntro') }}</p>
    <VCard tag="aside" class="prediction-card" color="warning" variant="tonal"><VCardText><strong>{{ t('lab.predictionTitle') }}</strong><p>{{ t('lab.prediction') }}</p></VCardText></VCard>
    <div class="controls comparison-control-grid">
      <label>{{ t('lab.seed') }}<input v-model="seed" :disabled="controlsLocked" dir="ltr" name="seed" autocomplete="off" /></label>
      <label>{{ t('lab.responseOrder') }}
        <select v-model="ordering" :disabled="controlsLocked" name="ordering"><option value="stale-last">{{ t('lab.staleLast') }}</option><option value="in-order">{{ t('lab.inOrder') }}</option></select>
      </label>
      <label>{{ t('lab.speed') }}<select v-model.number="playbackSpeed" name="playback-speed"><option :value="0.5">0.5×</option><option :value="1">1×</option><option :value="2">2×</option></select></label>
    </div>
    <fieldset class="strategy-picker" :disabled="controlsLocked">
      <legend>{{ t('lab.strategy') }}</legend>
      <label :class="{ selected: strategy === 'abort' }"><input v-model="strategy" type="radio" value="abort" /> <span><strong>{{ t('lab.abortTitle') }}</strong><small>{{ t('lab.abortSubtitle') }}</small></span></label>
      <label :class="{ selected: strategy === 'freshness' }"><input v-model="strategy" type="radio" value="freshness" /> <span><strong>{{ t('lab.freshnessTitle') }}</strong><small>{{ t('lab.freshnessSubtitle') }}</small></span></label>
    </fieldset>
    <p class="strategy-description">{{ strategyDescription }}</p>
    <div class="request-preview" :aria-label="t('lab.sharedRequests')" dir="ltr">
      <span><b>01</b> “ca” <code>{{ latencies.firstLatency }}ms</code></span><span><b>02</b> “cat” <code>{{ latencies.secondLatency }}ms</code></span>
    </div>
    <div class="action-row">
      <button class="primary-action" type="button" :disabled="controlsLocked" @click="runScenario">{{ comparison ? t('lab.restart') : t('lab.run') }} <span aria-hidden="true">▶</span></button>
      <button class="secondary-action" type="button" @click="resetScenario">{{ t('common.reset') }}</button>
    </div>
    </VCardText>
  </VCard>

  <div class="workspace-outcome">
  <WhyPanel v-bind="feedback" :flow="tutorFlow" />
  <section class="comparison-results" aria-labelledby="results-title">
    <div class="section-heading comparison-heading"><div><p class="kicker">{{ t('lab.resultsKicker') }}</p><h2 id="results-title">{{ t('lab.resultsTitle') }}</h2></div><VChip v-if="comparison" class="count-badge" variant="tonal">{{ t('lab.lanes') }}</VChip></div>
    <VCard v-if="!comparison" class="comparison-empty text-center" variant="tonal"><VCardText><span class="empty-icon" aria-hidden="true">⇄</span><h3>{{ t('lab.readyTitle') }}</h3><p>{{ t('lab.ready') }}</p></VCardText></VCard>
    <template v-else>
      <VCard class="playback-panel" variant="outlined"><VCardText>
        <div class="playback-summary">
          <VChip class="playback-state" :data-status="playbackStatus" color="primary" variant="tonal">{{ t(`lab.status${playbackStatus.charAt(0).toUpperCase()}${playbackStatus.slice(1)}`) }}</VChip>
          <strong dir="ltr">{{ visibleTimestamp < 0 ? 0 : visibleTimestamp }}ms</strong>
          <span>{{ t('lab.stepProgress', { current: Math.max(0, frameIndex + 1), total: frames.length }) }}</span>
        </div>
        <VProgressLinear class="progress-track" :aria-label="t('lab.playbackProgress')" :model-value="progress" color="primary" height="8" rounded />
        <div class="playback-actions">
          <button v-if="playbackStatus === 'playing' || playbackStatus === 'paused'" class="secondary-action" type="button" @click="togglePlayback">{{ t(playbackStatus === 'playing' ? 'lab.pause' : 'lab.resume') }}</button>
          <button v-if="playbackStatus === 'complete'" class="secondary-action" type="button" @click="runScenario">{{ t('lab.replay') }}</button>
        </div>
      </VCardText></VCard>
      <VRow class="comparison-grid ma-0">
        <VCol v-for="lane in ([comparison.broken, comparison.fixed] as SearchRaceRun[])" :key="lane.variant" class="pa-0" cols="12">
        <VCard tag="article" class="result-panel h-100" :class="lane.variant === 'broken' ? 'lane-broken' : 'lane-fixed'" :aria-labelledby="`${lane.variant}-result-title`" variant="outlined"><VCardText>
          <div class="panel-heading">
            <div><p class="kicker" :class="lane.variant === 'broken' ? 'danger-text' : 'success-text'">{{ t(lane.variant === 'broken' ? 'lab.protectionOff' : comparison.strategy === 'abort' ? 'lab.cancellationActive' : 'lab.freshnessActive') }}</p><h3 :id="`${lane.variant}-result-title`">{{ latestCommit(lane) ? t(lane.variant === 'broken' ? 'lab.brokenResult' : 'lab.fixedResult', { query: latestCommit(lane)?.query }) : t('lab.waitingResult') }}</h3></div>
            <VChip v-if="invariantVisible(lane)" :class="lane.invariant.passed ? 'pass-label' : 'failure-badge'" :color="lane.invariant.passed ? 'success' : 'error'" variant="tonal">{{ resultLabel(lane) }}</VChip>
            <VChip v-else class="count-badge" variant="tonal">{{ t('lab.inProgress') }}</VChip>
          </div>
          <ul v-if="latestCommit(lane)" class="result-list" :aria-label="t(lane.variant === 'broken' ? 'lab.brokenResultsLabel' : 'lab.fixedResultsLabel', { query: latestCommit(lane)?.query })"><li v-for="item in latestCommit(lane)?.items" :key="item">{{ item }}</li></ul>
          <div v-else class="result-pending"><span aria-hidden="true">…</span><p>{{ t('lab.awaitingCommit') }}</p></div>
          <div v-if="invariantVisible(lane)" class="invariant-card" :class="{ passed: lane.invariant.passed }"><strong>{{ t('scenario.invariantText') }}</strong><p>{{ t('lab.expected', { expected: lane.expected.query, actual: lane.committed.query }) }}</p></div>
        </VCardText></VCard>
        </VCol>
      </VRow>
    </template>
  </section>
  </div>
  </section>

  <section v-if="comparison" class="timeline-section" aria-labelledby="timeline-title">
    <div class="section-heading"><div><p class="kicker">{{ t('lab.timelineKicker') }}</p><h2 id="timeline-title">{{ t('lab.timelineTitle') }}</h2></div><VChip class="sync-label" variant="tonal">↻ {{ t(controlsLocked ? 'common.inputsLocked' : 'common.inputsEditable') }}</VChip></div>
    <p class="trace-explainer">{{ t('lab.traceExplainer') }}</p>
    <div class="timeline-grid">
      <section v-for="lane in ([comparison.broken, comparison.fixed] as SearchRaceRun[])" :key="lane.variant" :aria-labelledby="`${lane.variant}-timeline-title`">
        <div class="timeline-heading"><h3 :id="`${lane.variant}-timeline-title`">{{ t(lane.variant === 'broken' ? 'lab.brokenLane' : 'lab.fixedLane') }}</h3><span>{{ t('common.events', { count: visibleEvents(lane).length }) }}</span></div>
        <ol class="timeline" tabindex="0" aria-label="Event timeline; use Up and Down arrows to inspect events" aria-live="polite"><li v-for="event in visibleEvents(lane)" :key="event.sequence" tabindex="-1" :class="`event-${event.kind}`"><span class="sequence">{{ String(event.sequence).padStart(2, '0') }}</span><span class="event-time" dir="ltr">{{ event.timestamp }}ms</span><strong>{{ eventLabel(event, lane) }}</strong><span class="event-kind">{{ eventKind(event.kind) }}</span></li></ol>
        <p v-if="visibleEvents(lane).length === 0" class="trace-empty">{{ t('lab.awaitingFirstEvent') }}</p>
      </section>
    </div>
  </section>
</template>
