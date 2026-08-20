<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { applyLocale, type AppLocale } from '../i18n'

const { locale, t } = useI18n()

const dark = ref(false)
const baseUrl = import.meta.env.BASE_URL
const catalogUrl = `${baseUrl}scenarios`
const faviconUrl = `${baseUrl}favicon.svg`
onMounted(() => { dark.value = document.documentElement.dataset.theme === 'dark' })

function toggleTheme() {
  dark.value = !dark.value
  document.documentElement.dataset.theme = dark.value ? 'dark' : 'light'
}

const selectedLocale = computed({
  get: () => locale.value as AppLocale,
  set: (value: AppLocale) => applyLocale(value),
})

function startTour() {
  window.dispatchEvent(new CustomEvent('lab:start-tour'))
}
</script>

<template>
  <header class="site-header">
    <a class="brand" :href="catalogUrl" :aria-label="t('common.scenarios')">
      <img :src="faviconUrl" width="34" height="34" alt="" />
      <span>{{ t('common.brand') }}</span>
    </a>
    <nav aria-label="Primary navigation">
      <a :href="catalogUrl">{{ t('common.scenarios') }}</a>
      <span aria-disabled="true">{{ t('common.primitivesSoon') }}</span>
    </nav>
    <div class="header-actions">
      <span class="mode-badge"><span aria-hidden="true">●</span> {{ t('common.fixture') }}</span>
      <button class="tour-button" type="button" @click="startTour"><span aria-hidden="true">?</span> {{ t('common.startTour') }}</button>
      <label class="language-picker">
        <span class="visually-hidden">{{ t('common.language') }}</span>
        <select v-model="selectedLocale" :aria-label="t('common.language')">
          <option value="en">{{ t('common.english') }}</option>
          <option value="fa">{{ t('common.persian') }}</option>
        </select>
      </label>
      <button class="icon-button" type="button" :aria-label="dark ? t('common.themeLight') : t('common.themeDark')" @click="toggleTheme">
        {{ dark ? '☀' : '◐' }}
      </button>
    </div>
  </header>
</template>
