<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { runMutualExclusionComparison, type MutationExample, type MutationOutcome, type MutualExclusionRun } from '@concurrency-lab/scenario-engine'
import { timelineLabel } from '../../components/timeline-label'
import WhyPanel from '../../components/WhyPanel.vue'
import WorkspaceNavigator from '../../components/WorkspaceNavigator.vue'
import ScenarioStateStepper from '../../components/ScenarioStateStepper.vue'
const example = ref<MutationExample>('payment'); const outcome = ref<MutationOutcome>('success')
const comparison = ref<ReturnType<typeof runMutualExclusionComparison> | null>(null); const step = ref(0)
const feedback = ref({ change: 'Nothing yet — choose a checkout ending.', system: 'Two submit tasks are ready to enter the payment boundary.', why: 'Awaited work can overlap even on one JavaScript thread.', result: 'Run the comparison to see whether one intent creates duplicate effects.', concept: 'Mutual exclusion', unchanged: true, activeStep: 0 })
const text = { controls: 'Deterministic experiment', example: 'Example', payment: 'Payment double-submit', save: 'Save-form overlap', ending: 'First attempt ending', success: 'Success', failure: 'Failure', timeout: 'Timeout', cancellation: 'Cancellation', run: 'Run comparison', next: 'Reveal next event', replay: 'Replay trace', broken: 'No protection', fixed: 'FIFO mutex + idempotency key', pending: 'Invariant not evaluated yet', held: 'Invariant held', violated: 'Invariant violated', effects: 'Effects', peak: 'Peak active critical sections', evidence: 'Progressive evidence', explain: 'The fixed lane uses a mutex for ownership and a separate idempotency policy to prevent a second effect.', limit: 'Cancellation and timeout are cooperative: a mutex guarantees local release, but cannot undo a remote effect that already happened.' }
const total = computed(() => comparison.value ? Math.max(comparison.value.broken.events.length, comparison.value.fixed.events.length) : 0)
const tutorFlow = ['Customer click', 'Mutex queue', 'Ownership', 'Remote effect', 'Release']
const interactionStep = computed(() => !comparison.value ? 0 : step.value < total.value ? Math.min(3, Math.max(1, Math.ceil((step.value / total.value) * 4))) : 4)
const interactionTone = computed(() => comparison.value && step.value >= total.value && !comparison.value.broken.invariant.passed ? 'warning' as const : 'neutral' as const)
const interactionReason = computed(() => !comparison.value ? 'Choose the first ending; no task owns the critical section yet.' : step.value < total.value ? 'The trace is revealing queueing, ownership, and release from real events.' : 'The broken lane exposed the duplicate effect and the protected lane released ownership safely.')
watch(example, (next, previous) => { feedback.value = { change: `Example: ${previous} → ${next}`, system: next === 'payment' ? 'The protected resource is now a payment effect.' : 'The protected resource is now one local form save.', why: 'The ownership mechanism is identical even though the business risk differs.', result: next === 'payment' ? 'The invariant stays the same, but remote idempotency becomes critical.' : 'The invariant stays the same; a local mutex may be sufficient for this fixture.', concept: 'Mechanism vs business guarantee', unchanged: true, activeStep: 3 } })
watch(outcome, (next, previous) => { feedback.value = { change: `First ending: ${previous} → ${next}`, system: `The first owner now exits through the ${next} path, and finally releases the mutex.`, why: 'Release must happen for success, failure, timeout, and cooperative cancellation.', result: 'The next waiter can still acquire; the queue does not deadlock.', concept: 'Exception-safe release', unchanged: false, activeStep: 4 } })
function run() { comparison.value = runMutualExclusionComparison({ seed: 'phase-3', example: example.value, outcome: outcome.value }); step.value = 1; feedback.value = { change: `Ran two overlapping ${example.value} intents.`, system: 'The broken lane admits both tasks; the fixed lane queues the second behind one owner.', why: 'A FIFO mutex grants one permit and idempotency deduplicates the remote intent.', result: `Broken effects: ${comparison.value.broken.effects}; protected effects: ${comparison.value.fixed.effects}.`, concept: 'Local serialization + remote idempotency', unchanged: false, activeStep: 2 } }
function revealNext() { if (!comparison.value || step.value >= total.value) return; step.value += 1; const event = comparison.value.fixed.events[step.value - 1]; feedback.value = { change: `Revealed event ${step.value} of ${total.value}.`, system: event ? `The protected lane recorded “${event.label}”.` : 'The trace advanced to its next deterministic event.', why: 'Progressive playback exposes ownership changes in the order recorded by the simulator.', result: step.value >= total.value ? 'The full trace is visible and the ownership invariant can now be evaluated.' : 'The next ownership transition is ready to inspect.', concept: event?.kind === 'release' ? 'Exception-safe release' : 'Progressive ownership evidence', unchanged: false, activeStep: interactionStep.value } }
function reset() { comparison.value = null; step.value = 0; example.value = 'payment'; outcome.value = 'success'; feedback.value = { change: 'Reset to the initial payment experiment.', system: 'No task owns or waits for the critical section.', why: 'Reset discards the previous trace and restores editable configuration.', result: 'Run again to produce a new deterministic comparison.', concept: 'Clean initial state', unchanged: true, activeStep: 0 } }
function events(lane: MutualExclusionRun) { return lane.events.slice(0, step.value) }
function done(lane: MutualExclusionRun) { return events(lane).some((event) => event.kind === 'invariant') }
</script>
<template>
  <section class="simulator-workspace" data-scenario="mutual-exclusion">
  <WorkspaceNavigator />
  <ScenarioStateStepper :steps="tutorFlow" :current="interactionStep" :tone="interactionTone" :reason="interactionReason" />
  <VCard tag="section" class="comparison-controls" aria-labelledby="mutex-controls" variant="outlined">
    <VCardText>
      <div class="panel-heading"><div><p class="kicker">{{ text.controls }}</p><h2 id="mutex-controls">One input, two ownership policies</h2></div></div>
      <p>{{ text.explain }}</p>
      <div class="controls comparison-control-grid"><label>{{ text.example }}<select v-model="example" :disabled="!!comparison && step < total"><option value="payment">{{ text.payment }}</option><option value="save">{{ text.save }}</option></select></label><label>{{ text.ending }}<select v-model="outcome" :disabled="!!comparison && step < total"><option value="success">{{ text.success }}</option><option value="failure">{{ text.failure }}</option><option value="timeout">{{ text.timeout }}</option><option value="cancellation">{{ text.cancellation }}</option></select></label></div>
      <div class="action-row"><button class="primary-action" type="button" @click="run">{{ comparison ? text.replay : text.run }} ▶</button><button v-if="comparison && step < total" class="secondary-action" type="button" @click="revealNext">{{ text.next }} →</button><button class="secondary-action" type="button" @click="reset">Reset</button><VChip v-if="comparison" variant="tonal">{{ step }} / {{ total }}</VChip></div>
    </VCardText>
  </VCard>
  <div class="workspace-outcome">
  <WhyPanel v-bind="feedback" />
  <section class="comparison-results" aria-labelledby="mutex-results">
    <h2 id="mutex-results">{{ text.evidence }}</h2>
    <VCard v-if="!comparison" class="comparison-empty" variant="tonal"><VCardText>Run the comparison to reveal ownership and effects beside the controls.</VCardText></VCard>
    <VRow v-else class="comparison-grid ma-0">
      <VCol v-for="lane in ([comparison.broken, comparison.fixed] as MutualExclusionRun[])" :key="lane.variant" class="pa-0" cols="12">
        <VCard tag="article" class="result-panel h-100" :class="lane.variant === 'broken' ? 'lane-broken' : 'lane-fixed'" variant="outlined">
          <VCardText>
            <div class="panel-heading"><h3>{{ lane.variant === 'broken' ? text.broken : text.fixed }}</h3><VChip :class="done(lane) && lane.invariant.passed ? 'pass-label' : done(lane) ? 'failure-badge' : 'count-badge'" :color="done(lane) ? lane.invariant.passed ? 'success' : 'error' : undefined" variant="tonal">{{ !done(lane) ? text.pending : lane.invariant.passed ? text.held : text.violated }}</VChip></div>
            <dl class="metric-grid"><div><dt>{{ text.effects }}</dt><dd>{{ done(lane) ? lane.effects : '—' }}</dd></div><div><dt>{{ text.peak }}</dt><dd>{{ done(lane) ? lane.peakCriticalSections : '—' }}</dd></div></dl>
            <ol class="timeline" tabindex="0" aria-label="Event timeline" aria-live="polite"><li v-for="event in events(lane)" :key="event.sequence" tabindex="-1" :class="`event-${event.kind}`"><span class="sequence">{{ String(event.sequence).padStart(2, '0') }}</span><span class="event-time">{{ event.timestamp }}ms</span><strong>{{ timelineLabel(event.kind, event.label) }}</strong><span class="event-kind">{{ event.kind }}</span></li></ol>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </section>
  </div>
  </section>
</template>
