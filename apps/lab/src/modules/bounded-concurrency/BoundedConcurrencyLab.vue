<script setup lang="ts">
import { computed, ref, watch } from 'vue'; import { runUploadComparison, type UploadRun } from '@concurrency-lab/scenario-engine'; import { timelineLabel } from '../../components/timeline-label'; import WhyPanel from '../../components/WhyPanel.vue'; import WorkspaceNavigator from '../../components/WorkspaceNavigator.vue'
import ScenarioStateStepper from '../../components/ScenarioStateStepper.vue'
const jobs = ref(6); const capacity = ref(2); const cancelQueued = ref(true); const comparison = ref<ReturnType<typeof runUploadComparison> | null>(null); const step = ref(0)
const total = computed(() => comparison.value ? Math.max(comparison.value.broken.events.length, comparison.value.fixed.events.length) : 0)
const feedback = ref({ change: 'Nothing yet — tune the upload batch.', system: 'Six files are waiting for admission to the upload service.', why: 'Admission control determines how much work may compete at once.', result: 'Run the comparison to reveal active work and queue pressure.', concept: 'Bounded concurrency', unchanged: true, activeStep: 0 })
const tutorFlow = ['Files selected', 'Waiting queue', 'Acquire permit', 'Active upload', 'Return permit']
const invalid = computed(() => jobs.value < 3 || jobs.value > 8 || capacity.value < 1 || capacity.value > 4 || capacity.value > jobs.value)
const interactionStep = computed(() => !comparison.value ? 0 : step.value < total.value ? Math.min(3, Math.max(1, Math.ceil((step.value / total.value) * 4))) : 4)
const interactionReason = computed(() => invalid.value ? 'Invalid configuration: capacity must be 1–4 and cannot exceed the job count.' : !comparison.value ? 'Files and capacity are ready; Run creates the admission queue.' : step.value < total.value ? 'Permits are being acquired and returned from actual simulator events.' : 'The queue is drained and every permit has been returned.')
watch(jobs, (next, previous) => { feedback.value = { change: `Jobs: ${previous} → ${next}`, system: `${next} files now compete for ${capacity.value} protected upload slots.`, why: 'Work above capacity must wait instead of starting immediately.', result: `The protected queue can grow to roughly ${Math.max(0, next - capacity.value)} waiting files; active capacity stays capped.`, concept: 'Backpressure', unchanged: false, activeStep: 1 } })
watch(capacity, (next, previous) => { feedback.value = { change: `Capacity: ${previous} → ${next}`, system: `The semaphore now exposes ${next} permits to ${jobs.value} files.`, why: 'Each active upload owns one permit until completion or cancellation.', result: `At most ${next} protected uploads can run together; a higher limit reduces waiting but increases service pressure.`, concept: 'Semaphore capacity', unchanged: false, activeStep: 2 } })
watch(cancelQueued, (next) => { feedback.value = next ? { change: 'Queued cancellation: off → on', system: 'The final file will be removed while it is still waiting.', why: 'A cancelled waiter must leave the FIFO queue without consuming a permit.', result: 'Active uploads do not change; one queued file will never start.', concept: 'Cooperative cancellation', unchanged: true, activeStep: 1 } : { change: 'Queued cancellation: on → off', system: 'Every queued file remains eligible for the next returned permit.', why: 'No cancellation condition removes the last waiter.', result: 'One more file completes, while peak active work remains limited by capacity.', concept: 'Queue lifecycle', unchanged: false, activeStep: 1 } })
function run() { if (invalid.value) { comparison.value = null; step.value = 0; feedback.value = { change: 'The configuration was rejected.', system: 'No jobs entered the queue.', why: 'An impossible capacity would make the comparison misleading.', result: 'Correct the highlighted limits before running.', concept: 'Input validation', unchanged: true, activeStep: 0 }; return } comparison.value = runUploadComparison({ seed: 'phase-4', jobs: jobs.value, capacity: capacity.value, ...(cancelQueued.value ? { cancelJob: jobs.value } : {}) }); step.value = 1; feedback.value = { change: `Started ${jobs.value} uploads with protected capacity ${capacity.value}.`, system: `The broken lane admitted ${comparison.value.broken.peakActive}; the semaphore lane admitted ${comparison.value.fixed.peakActive} at peak.`, why: 'Only the fixed lane requires a permit before entering active work.', result: `The protected lane trades up to ${maxWait(comparison.value.fixed)}ms waiting for predictable dependency load.`, concept: 'Backpressure trade-off', unchanged: false, activeStep: 3 } }
function revealNext() { if (!comparison.value || step.value >= total.value) return; step.value += 1; const event = comparison.value.fixed.events[step.value - 1]; feedback.value = { change: `Revealed event ${step.value} of ${total.value}.`, system: event ? `The semaphore lane recorded “${event.label}”.` : 'The upload trace advanced.', why: 'Each event shows whether work is waiting, active, cancelled, or returning capacity.', result: step.value >= total.value ? 'The full queue lifecycle and capacity invariant are now visible.' : `Active work is ${latestMetric(comparison.value.fixed, 'active')}; ${latestMetric(comparison.value.fixed, 'available')} permits are available.`, concept: event?.kind === 'queued' ? 'Backpressure queue' : event?.kind === 'release' ? 'Permit lifecycle' : 'Progressive capacity evidence', unchanged: false, activeStep: interactionStep.value } }
function reset() { jobs.value = 6; capacity.value = 2; cancelQueued.value = true; comparison.value = null; step.value = 0; feedback.value = { change: 'Reset the upload experiment.', system: 'Six files are waiting outside a two-permit semaphore.', why: 'Reset clears the previous queue and trace.', result: 'No upload is active until you run again.', concept: 'Clean initial state', unchanged: true, activeStep: 0 } }
function events(lane: UploadRun) { return lane.events.slice(0, step.value) }
function latestMetric(lane: UploadRun, name: 'active' | 'available') { for (const event of [...events(lane)].reverse()) { const value = (event.detail as Record<string, unknown>)[name]; if (typeof value === 'number') return value } return name === 'available' ? lane.capacity : 0 }
function maxWait(lane: UploadRun) { return Math.max(0, ...lane.waitTimes) }
</script>
<template>
  <section class="simulator-workspace" data-scenario="bounded-concurrency">
  <WorkspaceNavigator />
  <ScenarioStateStepper :steps="tutorFlow" :current="interactionStep" :tone="invalid ? 'error' : 'neutral'" :reason="interactionReason" />
  <VCard tag="section" class="comparison-controls" variant="outlined">
    <VCardText>
      <h2>Upload queue experiment</h2>
      <p>Both lanes receive the same files and declared capacity. The broken lane ignores it; the fixed lane must acquire a permit.</p>
      <div class="controls comparison-control-grid">
        <label>Jobs<input v-model.number="jobs" type="number" min="3" max="8" /></label>
        <label>Capacity<input v-model.number="capacity" type="number" min="1" max="4" /></label>
        <label><input v-model="cancelQueued" type="checkbox" /> Cancel last queued job</label>
      </div>
      <div class="action-row">
        <button class="primary-action" type="button" :disabled="invalid" @click="run">Run comparison</button>
        <button v-if="comparison && step < total" class="secondary-action" type="button" @click="revealNext">Reveal next event</button>
        <button class="secondary-action" type="button" @click="reset">Reset</button>
      </div>
    </VCardText>
  </VCard>
  <div class="workspace-outcome">
  <WhyPanel v-bind="feedback" />
  <section class="comparison-results">
    <VCard v-if="!comparison" class="comparison-empty" variant="tonal"><VCardText>Run the batch to reveal its queue, permits, and active load.</VCardText></VCard>
    <div v-else class="comparison-grid">
      <article v-for="lane in ([comparison.broken, comparison.fixed] as UploadRun[])" :key="lane.variant" class="result-panel" :class="lane.variant === 'broken' ? 'lane-broken' : 'lane-fixed'">
            <h3>{{ lane.variant === 'broken' ? 'Unbounded' : 'Semaphore protected' }}</h3>
            <dl class="metric-grid"><div><dt>Active now</dt><dd>{{ latestMetric(lane, 'active') }}</dd></div><div><dt>Available permits</dt><dd>{{ latestMetric(lane, 'available') }}</dd></div><div><dt>Max queue</dt><dd>{{ lane.maxQueueDepth }}</dd></div><div><dt>Max wait</dt><dd>{{ maxWait(lane) }}ms</dd></div><div><dt>Peak active</dt><dd>{{ lane.peakActive }}</dd></div><div><dt>Cancelled</dt><dd>{{ lane.cancelled }}</dd></div></dl>
            <p :class="lane.invariant.passed ? 'pass-label' : 'failure-badge'">{{ lane.invariant.passed ? 'Capacity respected' : 'Capacity exceeded' }}</p>
            <ol class="timeline" tabindex="0" aria-label="Event timeline" aria-live="polite"><li v-for="event in events(lane)" :key="event.sequence" tabindex="-1"><span class="sequence">{{ event.sequence }}</span><span class="event-time">{{ event.timestamp }}ms</span><strong>{{ timelineLabel(event.kind, event.label) }}</strong><span class="event-kind">{{ event.kind }}</span></li></ol>
      </article>
    </div>
  </section>
  </div>
  </section>
</template>
