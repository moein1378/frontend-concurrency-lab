import { expect, test } from '@playwright/test'

test('reviewer compares broken search with propagated cancellation', async ({ page }) => {
  await page.goto('/scenarios')
  await expect(page.getByRole('heading', { name: 'Scenario catalog' })).toBeVisible()
  await page.getByRole('link', { name: /Start the lesson/ }).click()
  await expect(page).toHaveURL(/\/scenario\/search-race\/compare$/)
  await page.getByRole('button', { name: /Run live comparison/ }).click()

  await expect(page.getByRole('heading', { name: 'Broken · results for “ca”' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Fixed · results for “cat”' })).toBeVisible()
  await expect(page.getByText('Invariant violated')).toBeVisible()
  await expect(page.getByText('Invariant held')).toBeVisible()
  await expect(page.getByText('Request “ca” aborted')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Synchronized event timelines' })).toBeVisible()
})

test('reviewer switches to freshness protection and sees a stale discard', async ({ page }) => {
  await page.goto('/scenario/search-race/compare')
  await page.getByLabel('Discard stale').check()
  await page.getByRole('button', { name: /Run live comparison/ }).click()

  await expect(page.getByText('Freshness guard active')).toBeVisible()
  await expect(page.getByText('Stale response “ca” discarded')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Fixed · results for “cat”' })).toBeVisible()
})

test('in-order response mode remains a valid non-failing control', async ({ page }) => {
  await page.goto('/scenario/search-race/broken')
  await page.getByLabel('Response order').selectOption('in-order')
  await page.getByRole('button', { name: /Run live comparison/ }).click()

  await expect(page.getByRole('heading', { name: 'Broken · results for “cat”' })).toBeVisible()
  await expect(page.getByText('Invariant held')).toHaveCount(2)
})

test('learner switches to Persian and receives a complete RTL experience', async ({ page }) => {
  await page.goto('/scenarios')
  await page.getByLabel('Language').selectOption('fa')

  await expect(page.locator('html')).toHaveAttribute('lang', 'fa')
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  await expect(page.getByRole('heading', { name: 'فهرست سناریوها' })).toBeVisible()
  await page.getByRole('link', { name: /شروع درس/ }).click()
  await expect(page.getByRole('heading', { name: 'پاسخ قدیمی جست‌وجو' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'اهداف یادگیری' })).toBeVisible()
  await expect(page.getByLabel('ترتیب پاسخ')).toBeVisible()
})

test('guided tours explain both the catalog and scenario', async ({ page }) => {
  await page.goto('/scenarios')
  await page.locator('.catalog-hero').getByRole('button', { name: /Guided tour/ }).click()
  await expect(page.getByText('Welcome to the lab')).toBeVisible()
  await page.keyboard.press('Escape')

  await page.goto('/scenario/search-race/compare')
  await page.locator('.comparison-controls').getByRole('button', { name: /Guided tour/ }).click()
  await expect(page.getByText('One controlled experiment')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Broken · results for “ca”' })).toBeVisible()
  await page.keyboard.press('Escape')
})

test('live playback exposes intermediate commits and supports inspection', async ({ page }) => {
  await page.goto('/scenario/search-race/compare')
  await page.getByLabel('Playback speed').selectOption('0.5')
  await page.getByRole('button', { name: /Run live comparison/ }).click()

  await expect(page.getByText('Live', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Pause trace' }).click()
  await expect(page.getByText('Paused', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Resume trace' }).click()

  await expect(page.getByRole('heading', { name: 'Broken · results for “cat”' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Broken · results for “ca”' })).toBeVisible()
  await expect(page.getByText('Complete', { exact: true })).toBeVisible()
})

test('timeline is keyboard inspectable in desktop and phone projects', async ({ page }) => {
  await page.goto('/scenario/search-race/compare')
  await page.getByRole('button', { name: /Run live comparison/ }).click()
  const timeline = page.getByRole('list', { name: /Event timeline/ }).first()
  await timeline.focus()
  await page.keyboard.press('ArrowDown')
  await expect(timeline.locator('li').first()).toBeFocused()
})
