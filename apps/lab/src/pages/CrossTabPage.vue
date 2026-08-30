<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { runCrossTabComparison, type CrossTabRun, type JobOwnershipPort } from '@concurrency-lab/scenario-engine'
import ScenarioShell from '../components/ScenarioShell.vue'
import ComparisonLane from '../components/ComparisonLane.vue'
import EventTimeline from '../components/EventTimeline.vue'
import WhyPanel from '../components/WhyPanel.vue'
import WorkspaceNavigator from '../components/WorkspaceNavigator.vue'
import ScenarioStateStepper from '../components/ScenarioStateStepper.vue'

const route = useRoute(); const comparison = ref<ReturnType<typeof runCrossTabComparison> | null>(null); const owner = ref('')
const backUrl = '/scenarios'; const tabId = typeof route.query.tab === 'string' ? route.query.tab : crypto.randomUUID().slice(0, 8)
const ownsJob = computed(() => owner.value === tabId)
const ownerLabel = computed(() => ownsJob.value ? 'This tab' : 'Another tab')
const feedback = ref({ change: 'Nothing yet — this tab has not claimed the sync job.', system: 'Each browser tab currently has only its own local memory.', why: 'Separate JavaScript contexts cannot see an in-memory “running” flag.', result: 'Coordinate this tab to establish shared ownership.', concept: 'Cross-tab coordination', unchanged: true, activeStep: 0 })
const tutorFlow = ['Browser tabs', 'Shared claim', 'Election', 'Owner + followers', 'Run job']
const interactionStep = computed(() => !comparison.value ? 0 : owner.value ? 4 : 2)
const interactionReason = computed(() => !comparison.value ? 'This tab has not asked to run the shared job yet.' : ownsJob.value ? 'The shared claim was open, so this tab became the owner.' : 'Another tab already owns the job, so this tab safely became a follower.')
const ownership: JobOwnershipPort = { claim(jobId, claimant) { const key = `concurrency-lab:${jobId}:owner:v1`; const existing = localStorage.getItem(key); if (!existing) localStorage.setItem(key, claimant); return localStorage.getItem(key) ?? claimant } }
function coordinate() { comparison.value = runCrossTabComparison('v1'); owner.value = ownership.claim('fixture-job', tabId); const owns = owner.value === tabId; feedback.value = { change: 'This tab asked to run the shared sync job.', system: owns ? 'No owner existed, so this tab recorded the first shared claim.' : 'A shared claim already existed, so this tab became a follower.', why: 'Every tab checks the same browser record instead of trusting its isolated memory.', result: owns ? 'This tab may run the job; other tabs must observe.' : 'This tab does not start a duplicate job.', concept: 'One shared owner', unchanged: !owns, activeStep: 3 } }
function reset() { localStorage.removeItem('concurrency-lab:fixture-job:owner:v1'); comparison.value = null; owner.value = ''; feedback.value = { change: 'Cleared the shared ownership record.', system: 'No browser tab currently owns the practice sync job.', why: 'Reset returns the lesson to a known starting state.', result: 'The next tab to coordinate can become owner.', concept: 'Clean initial state', unchanged: true, activeStep: 0 } }
function syncOwner(event: StorageEvent) { if (event.key === 'concurrency-lab:fixture-job:owner:v1') owner.value = localStorage.getItem(event.key) ?? '' }
onMounted(() => window.addEventListener('storage', syncOwner)); onBeforeUnmount(() => window.removeEventListener('storage', syncOwner))
function timelineEvents(lane: CrossTabRun) { return lane.events }
</script>

<template>
  <ScenarioShell scenario="cross-tab" :back-href="backUrl" eyebrow="Scenario 05 · Cross-tab ownership" title="One job, one owning tab" summary="See how browser tabs choose one owner for shared background work—and why the others must follow.">
    <WorkspaceNavigator />
    <section class="simulator-workspace" data-scenario="cross-tab"><ScenarioStateStepper :steps="tutorFlow" :current="interactionStep" :tone="owner && owner !== tabId ? 'warning' : 'neutral'" :reason="interactionReason" /><VCard tag="section" class="comparison-controls" variant="outlined"><VCardText><div class="panel-heading"><div><p class="kicker">Browser coordination</p><h2>Ask this tab to run the job</h2></div><VChip variant="tonal">This tab</VChip></div><p class="panel-copy">The first tab records shared ownership. Every later tab sees that decision and becomes a follower instead of repeating the work.</p><div class="action-row"><button class="primary-action" type="button" @click="coordinate">Coordinate this tab</button><button class="secondary-action" type="button" @click="reset">Reset</button><p v-if="owner" :class="ownsJob?'pass-label':'count-badge'">{{ownsJob?'✓ This tab owns the job':'Another tab owns the job · This tab is a follower'}}</p></div><details class="technical-details"><summary>Technical details</summary><p><strong>{{ ownerLabel }} ID:</strong> <code>{{ owner || tabId }}</code></p><p>The lesson stores the claim in this browser so separate tabs can observe the same owner.</p></details></VCardText></VCard>
    <div class="workspace-outcome"><WhyPanel v-bind="feedback" :flow="tutorFlow" /><section class="comparison-results"><VCard v-if="!comparison" class="comparison-empty" variant="tonal"><VCardText>Coordinate this tab to reveal the ownership decision.</VCardText></VCard><template v-else><div class="section-heading comparison-heading"><div><p class="kicker">Coordination result</p><h2>Independent claims vs leader election</h2></div></div><div class="comparison-grid"><ComparisonLane v-for="lane in ([comparison.broken,comparison.fixed] as CrossTabRun[])" :key="lane.variant" :variant="lane.variant" :title="lane.variant==='broken'?'Independent claims':'Leader election'" :status="lane.invariant.passed?'pass':'fail'" :status-label="lane.invariant.passed?'One owner':'Duplicate owners'"><template #timeline><EventTimeline :events="timelineEvents(lane)" ariaLabel="Ownership event timeline" /></template></ComparisonLane></div></template></section></div></section>
  </ScenarioShell>
</template>
