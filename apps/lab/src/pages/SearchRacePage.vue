<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import SearchRaceLab from '../modules/search-race/SearchRaceLab.vue'

const catalogUrl = `${import.meta.env.BASE_URL}scenarios`
const { t } = useI18n()

const glossary = [
  ['scenario.requestTerm', 'scenario.requestDef'], ['scenario.staleTerm', 'scenario.staleDef'],
  ['scenario.abortTerm', 'scenario.abortDef'], ['scenario.commitTerm', 'scenario.commitDef'],
  ['scenario.discardTerm', 'scenario.discardDef'], ['scenario.invariantTerm', 'scenario.invariantDef'],
]
</script>

<template>
  <section class="detail-hero">
    <a class="back-link" :href="catalogUrl">{{ t('scenario.back') }}</a>
    <div class="detail-title">
      <div><p class="eyebrow">{{ t('scenario.eyebrow') }}</p><h1>{{ t('scenario.title') }}</h1></div>
      <span class="comparison-badge">⇄ {{ t('scenario.badge') }}</span>
    </div>
    <p>{{ t('scenario.summary') }}</p>
  </section>

  <section class="lesson-orientation" aria-labelledby="outcomes-title">
    <article class="orientation-main">
      <p class="kicker">{{ t('common.allLevels') }}</p>
      <h2 id="outcomes-title">{{ t('scenario.outcomeTitle') }}</h2>
      <ul class="check-list"><li>{{ t('scenario.outcome1') }}</li><li>{{ t('scenario.outcome2') }}</li><li>{{ t('scenario.outcome3') }}</li></ul>
    </article>
    <article><h3>{{ t('scenario.prerequisiteTitle') }}</h3><p>{{ t('scenario.prerequisite') }}</p></article>
    <article><h3>{{ t('scenario.mentalTitle') }}</h3><p>{{ t('scenario.mental') }}</p></article>
  </section>

  <SearchRaceLab />

  <section class="lesson-content" aria-labelledby="lesson-title">
    <div class="lesson-heading"><p class="kicker">{{ t('common.allLevels') }}</p><h2 id="lesson-title">{{ t('scenario.lessonTitle') }}</h2><p>{{ t('scenario.lessonIntro') }}</p></div>
    <div class="explanation-grid">
      <article class="explain-broken"><span aria-hidden="true">✕</span><h3>{{ t('scenario.brokenTitle') }}</h3><p>{{ t('scenario.brokenExplain') }}</p></article>
      <article class="explain-fixed"><span aria-hidden="true">↯</span><h3>{{ t('scenario.cancelTitle') }}</h3><p>{{ t('scenario.cancelExplain') }}</p></article>
      <article class="explain-fixed"><span aria-hidden="true">✓</span><h3>{{ t('scenario.freshnessTitle') }}</h3><p>{{ t('scenario.freshnessExplain') }}</p></article>
    </div>
    <blockquote class="invariant-definition"><strong>{{ t('scenario.invariantTitle') }}</strong><p>{{ t('scenario.invariantText') }}</p></blockquote>
  </section>

  <section class="glossary-section" aria-labelledby="glossary-title">
    <div class="section-heading"><div><p class="kicker">{{ t('scenario.vocabularyKicker') }}</p><h2 id="glossary-title">{{ t('scenario.glossaryTitle') }}</h2></div></div>
    <dl class="glossary-grid"><div v-for="entry in glossary" :key="entry[0]"><dt>{{ t(entry[0]) }}</dt><dd>{{ t(entry[1]) }}</dd></div></dl>
  </section>

  <section class="decision-section" aria-labelledby="decision-title">
    <div><p class="kicker">{{ t('scenario.decisionKicker') }}</p><h2 id="decision-title">{{ t('scenario.decisionTitle') }}</h2></div>
    <div class="decision-grid">
      <article><span>01</span><p>{{ t('scenario.decisionCancel') }}</p></article>
      <article><span>02</span><p>{{ t('scenario.decisionFresh') }}</p></article>
      <article><span>03</span><p>{{ t('scenario.decisionBoth') }}</p></article>
    </div>
  </section>

  <section class="depth-section" aria-labelledby="depth-title">
    <div class="section-heading"><div><p class="kicker">{{ t('common.level') }}</p><h2 id="depth-title">{{ t('scenario.depthTitle') }}</h2></div></div>
    <div class="depth-grid">
      <article><span>{{ t('common.junior') }}</span><p>{{ t('scenario.juniorTake') }}</p></article>
      <article><span>{{ t('common.mid') }}</span><p>{{ t('scenario.midTake') }}</p></article>
      <article><span>{{ t('common.senior') }}</span><p>{{ t('scenario.seniorTake') }}</p></article>
    </div>
  </section>

  <section class="limits-section" aria-labelledby="limits-title">
    <h2 id="limits-title">{{ t('scenario.limitsTitle') }}</h2>
    <ul><li>{{ t('scenario.limit1') }}</li><li>{{ t('scenario.limit2') }}</li><li>{{ t('scenario.limit3') }}</li></ul>
  </section>
</template>
