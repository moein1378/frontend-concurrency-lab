<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import MutualExclusionLab from '../modules/mutual-exclusion/MutualExclusionLab.vue'
const { locale } = useI18n()
const backUrl = `${import.meta.env.BASE_URL}scenarios`
const copy = {
  en: { back: '← Back to scenarios', eyebrow: 'Scenario 02 · Mutual exclusion', title: 'Stop double submits from becoming double effects', summary: 'Two clicks can overlap even on one JavaScript thread. Compare unprotected mutation code with a FIFO mutex, then inspect how finally releases ownership after every ending.', mental: 'A mutex does not make the request exactly-once. It gives one task at a time permission to cross a local critical boundary. Pair it with an idempotency key when a remote effect must also be deduplicated.', invariant: 'At most one mutation owns the critical section, and one user intent creates at most one effect.', guidance: 'Use a disabled button for feedback, a mutex for local serialization, and server-side idempotency for payment-grade effects. UI locking alone is not a network guarantee.' },
  fa: { back: 'بازگشت به سناریوها →', eyebrow: 'سناریوی ۰۲ · انحصار متقابل', title: 'جلوگیری از تبدیل ارسال دوباره به اثر دوباره', summary: 'دو کلیک حتی روی یک رشتهٔ جاوااسکریپت می‌توانند هم‌پوشانی داشته باشند. کد بدون محافظ را با mutex صفی مقایسه کنید و ببینید finally پس از هر نوع پایان مالکیت را آزاد می‌کند.', mental: 'mutex درخواست را دقیقاً یک‌بار نمی‌کند؛ فقط در هر لحظه به یک کار اجازهٔ عبور از مرز بحرانی محلی می‌دهد. برای اثر راه‌دور از کلید idempotency نیز استفاده کنید.', invariant: 'حداکثر یک mutation مالک بخش بحرانی است و یک قصد کاربر حداکثر یک اثر می‌سازد.', guidance: 'دکمهٔ غیرفعال بازخورد می‌دهد، mutex اجرای محلی را سریالی می‌کند و idempotency سمت سرور از اثرهای حساس مانند پرداخت محافظت می‌کند.' },
} as const
const lang = () => copy[locale.value as 'en' | 'fa']
</script>

<template><article class="scenario-page"><section class="detail-hero"><a class="back-link" :href="backUrl">{{ lang().back }}</a><p class="eyebrow">{{ lang().eyebrow }}</p><h1>{{ lang().title }}</h1><p>{{ lang().summary }}</p><div class="teaching-callouts"><article><h2>{{ locale === 'fa' ? 'مدل ذهنی' : 'Mental model' }}</h2><p>{{ lang().mental }}</p></article><article><h2>{{ locale === 'fa' ? 'قانون محافظت‌شده' : 'Protected invariant' }}</h2><p>{{ lang().invariant }}</p></article></div></section><MutualExclusionLab /><section class="lesson-content"><h2>{{ locale === 'fa' ? 'راهنمای تصمیم' : 'Decision guidance' }}</h2><p>{{ lang().guidance }}</p></section></article></template>
