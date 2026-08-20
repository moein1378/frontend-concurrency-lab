import { createI18n } from 'vue-i18n'
import { messages } from './messages'

export type AppLocale = keyof typeof messages
export const locales: readonly AppLocale[] = ['en', 'fa']

function storedLocale(): AppLocale {
  const value = window.localStorage.getItem('concurrency-lab-locale')
  return value === 'fa' ? 'fa' : 'en'
}

export const i18n = createI18n({
  legacy: false,
  locale: storedLocale(),
  fallbackLocale: 'en',
  messages,
})

export function applyLocale(locale: AppLocale): void {
  i18n.global.locale.value = locale
  document.documentElement.lang = locale
  document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr'
  window.localStorage.setItem('concurrency-lab-locale', locale)
}

applyLocale(i18n.global.locale.value as AppLocale)
