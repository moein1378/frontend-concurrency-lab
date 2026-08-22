<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { startGuidedTour } from '../tours/create-tour'

const comparisonUrl = `${import.meta.env.BASE_URL}scenario/search-race/compare`
const { locale, t } = useI18n()

const learningLevels = [
  { level: 'common.junior', text: 'catalog.juniorText', icon: '01' },
  { level: 'common.mid', text: 'catalog.midText', icon: '02' },
  { level: 'common.senior', text: 'catalog.seniorText', icon: '03' },
]

function startTour() {
  startGuidedTour([
    { element: '[data-tour="catalog-hero"]', title: t('catalog.tourWelcomeTitle'), intro: t('catalog.tourWelcome'), position: 'bottom' },
    { element: '[data-tour="learning-method"]', title: t('catalog.tourMethodTitle'), intro: t('catalog.tourMethod'), position: 'bottom' },
    { element: '[data-tour="scenario-card"]', title: t('catalog.tourCardTitle'), intro: t('catalog.tourCard'), position: 'top' },
    { element: '[data-tour="scenario-action"]', title: t('catalog.tourActionTitle'), intro: t('catalog.tourAction'), position: 'top' },
  ], {
    next: t('tour.next'), previous: t('tour.previous'), done: t('tour.done'), close: t('tour.close'), progress: t('tour.progress'),
  }, locale.value === 'fa')
}

onMounted(() => window.addEventListener('lab:start-tour', startTour))
onBeforeUnmount(() => window.removeEventListener('lab:start-tour', startTour))
</script>

<template>
  <section class="catalog-hero" data-tour="catalog-hero">
    <p class="eyebrow">{{ t('catalog.eyebrow') }}</p>
    <h1>{{ t('catalog.titleA') }}<br /><span>{{ t('catalog.titleB') }}</span></h1>
    <p>{{ t('catalog.intro') }}</p>
    <div class="hero-actions">
      <a class="primary-action" href="#catalog-title">{{ t('catalog.action') }} <span aria-hidden="true">↓</span></a>
      <button class="secondary-action" type="button" @click="startTour"><span aria-hidden="true">?</span> {{ t('common.startTour') }}</button>
    </div>
  </section>

  <section class="teaching-method" data-tour="learning-method" aria-labelledby="method-title">
    <div class="method-intro">
      <p class="kicker">{{ t('common.allLevels') }}</p>
      <h2 id="method-title">{{ t('catalog.thesisTitle') }}</h2>
      <p>{{ t('catalog.thesis') }}</p>
    </div>
    <ol class="method-steps">
      <li><span>01</span><div><strong>{{ t('catalog.step1Title') }}</strong><p>{{ t('catalog.step1') }}</p></div></li>
      <li><span>02</span><div><strong>{{ t('catalog.step2Title') }}</strong><p>{{ t('catalog.step2') }}</p></div></li>
      <li><span>03</span><div><strong>{{ t('catalog.step3Title') }}</strong><p>{{ t('catalog.step3') }}</p></div></li>
    </ol>
  </section>

  <section class="catalog" aria-labelledby="catalog-title">
    <div class="section-heading">
      <div><p class="kicker">{{ t('common.phase') }}</p><h2 id="catalog-title">{{ t('catalog.catalogTitle') }}</h2></div>
      <span class="count-badge">{{ t('catalog.available') }}</span>
    </div>
    <article class="scenario-card" data-tour="scenario-card">
      <div class="card-topline"><span class="comparison-badge">⇄ {{ t('catalog.compareBadge') }}</span><span class="scenario-number">{{ t('catalog.number') }}</span></div>
      <h3>{{ t('catalog.scenarioTitle') }}</h3>
      <p>{{ t('catalog.scenarioSummary') }}</p>
      <dl>
        <div><dt>{{ t('catalog.failureType') }}</dt><dd>{{ t('catalog.raceCondition') }}</dd></div>
        <div><dt>{{ t('catalog.invariant') }}</dt><dd>{{ t('catalog.latestWins') }}</dd></div>
        <div><dt>{{ t('catalog.runtime') }}</dt><dd>{{ t('catalog.deterministic') }}</dd></div>
      </dl>
      <div class="concept-preview"><strong>{{ t('catalog.concepts') }}</strong><p>{{ t('catalog.conceptList') }}</p></div>
      <div class="card-action-row">
        <span class="duration-label">◷ {{ t('catalog.duration') }}</span>
        <a class="primary-action" data-tour="scenario-action" :href="comparisonUrl">{{ t('catalog.action') }} <span aria-hidden="true">→</span></a>
      </div>
    </article>
  </section>

  <section class="learning-levels" aria-labelledby="levels-title">
    <div class="section-heading"><div><p class="kicker">{{ t('common.level') }}</p><h2 id="levels-title">{{ t('catalog.levelTitle') }}</h2></div></div>
    <div class="level-grid">
      <article v-for="item in learningLevels" :key="item.level"><span>{{ item.icon }}</span><h3>{{ t(item.level) }}</h3><p>{{ t(item.text) }}</p></article>
    </div>
  </section>
</template>
