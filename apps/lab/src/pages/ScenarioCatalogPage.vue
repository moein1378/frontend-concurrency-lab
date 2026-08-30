<script setup lang="ts">
const base = import.meta.env.BASE_URL
const scenarios = [
  ['01', 'Stale search response', 'See an older response overwrite newer intent, then compare two protections against the stale write.', 'search-race'],
  ['02', 'Double submit and mutex', 'Compare duplicate effects with queued ownership and reliable critical-section release.', 'mutual-exclusion'],
  ['03', 'Bounded concurrency', 'Inspect queue pressure and active capacity under unbounded execution and a semaphore.', 'bounded-concurrency'],
  ['04', 'Single-flight', 'Compare independent requests with one shared producer for each normalized key.', 'single-flight'],
  ['05', 'Cross-tab ownership', 'Compare duplicate claims with deterministic election of one owning browser tab.', 'cross-tab'],
] as const
const outcomes: Record<string, readonly [string, string, string]> = {
  'search-race': ['Frontend data fetching', 'You will understand', 'Why stale responses overwrite current intent, and how cancellation or freshness tokens stop it.'],
  'mutual-exclusion': ['Sensitive mutations', 'You will understand', 'What a mutex serializes and why server idempotency is still required.'],
  'bounded-concurrency': ['Uploads and batch work', 'You will understand', 'How capacity changes queue pressure, dependency load, and waiting time.'],
  'single-flight': ['Duplicate API reads', 'You will understand', 'How one producer serves many subscribers without becoming a completed-value cache.'],
  'cross-tab': ['Browser synchronization', 'You will understand', 'Why per-tab memory is insufficient and what shared ownership requires.'],
}
</script>

<template>
  <div class="catalog-page">
    <VContainer tag="section" class="catalog-hero page-rail">
      <p class="eyebrow">Interactive concurrency lessons</p>
      <h1>See the race. <span>Understand the guarantee.</span></h1>
      <p>Reproduce a real frontend ordering bug, compare two correct protections, and read every state change on a deterministic timeline.</p>
      <a class="primary-action" href="#catalog-title">Start the lesson ↓</a>
    </VContainer>
    <VContainer tag="section" class="learning-method page-rail">
      <h2>Learn concurrency by changing the system</h2>
      <p>Predict → run → inspect → explain</p>
      <p>Each scenario makes a production-shaped failure visible, compares protections under identical inputs, and ends by asking you to explain the result.</p>
    </VContainer>
    <VContainer tag="section" class="catalog page-rail" aria-labelledby="catalog-title">
      <div class="section-heading catalog-heading"><div><p class="kicker">Choose a real-world problem</p><h2 id="catalog-title">Scenario catalog</h2></div><p class="catalog-count">5 interactive lessons</p></div>
      <div class="scenario-grid">
        <VCard v-for="scenario in scenarios" :key="scenario[3]" tag="article" class="scenario-card" variant="outlined">
          <img class="scenario-card-image" :src="`${base}scenarios/${scenario[3]}.png`" :alt="`${scenario[1]} concept illustration`" />
          <div class="scenario-card-body">
            <div class="card-topline"><span class="scenario-format">Predict · run · compare</span><span class="scenario-number">Lesson {{ scenario[0] }}</span></div>
            <h3>{{ scenario[1] }}</h3><p>{{ scenario[2] }}</p><p class="scenario-domain">{{ outcomes[scenario[3]]?.[0] }}</p>
            <div class="scenario-outcome"><strong>{{ outcomes[scenario[3]]?.[1] }}</strong><span>{{ outcomes[scenario[3]]?.[2] }}</span></div>
            <div class="card-action-row"><RouterLink class="primary-action" :to="`/scenario/${scenario[3]}/compare`">Start the lesson →</RouterLink></div>
          </div>
        </VCard>
      </div>
    </VContainer>
  </div>
</template>
