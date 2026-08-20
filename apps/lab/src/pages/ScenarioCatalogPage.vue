<template>
  <section class="catalog-hero">
    <p class="eyebrow">Interactive concurrency failures</p>
    <h1>See the race.<br /><span>Understand the order.</span></h1>
    <p>Run deterministic browser scenarios, inspect the violated invariant, and follow every request and commit on one timeline.</p>
  </section>

  <section class="catalog" aria-labelledby="catalog-title">
    <div class="section-heading">
      <div><p class="kicker">Phase 2</p><h2 id="catalog-title">Scenario catalog</h2></div>
      <span class="count-badge">1 available</span>
    </div>
    <article class="scenario-card">
      <div class="card-topline"><span class="comparison-badge">⇄ Broken + fixed</span><span class="scenario-number">01</span></div>
      <h3>Stale search response</h3>
      <p>A slower request for an older query arrives last and silently replaces the results the user actually asked for.</p>
      <dl>
        <div><dt>Failure type</dt><dd>Race condition</dd></div>
        <div><dt>Protected invariant</dt><dd>Latest query wins</dd></div>
        <div><dt>Runtime</dt><dd>Deterministic fixture</dd></div>
      </dl>
      <a class="primary-action" href="/scenario/search-race/compare">Compare implementations <span aria-hidden="true">→</span></a>
    </article>
  </section>
</template>
