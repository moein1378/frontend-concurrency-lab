import { expect, test } from '@playwright/test'

test('site remains English and left-to-right across navigation and reload', async ({ page }) => {
  await page.goto('/scenarios')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
  await expect(page.getByLabel('Language')).toHaveCount(0)

  await page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Stale search response' }) }).getByRole('link', { name: /Start the lesson/ }).click()
  await page.reload()

  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
  await expect(page.getByRole('heading', { name: 'Stale search response' })).toBeVisible()
  await expect(page.getByLabel('Language')).toHaveCount(0)
})

test('reviewer compares broken search with propagated cancellation', async ({ page }) => {
  await page.goto('/scenarios')
  await expect(page.getByRole('heading', { name: 'Scenario catalog' })).toBeVisible()
  await page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Stale search response' }) }).getByRole('link', { name: /Start the lesson/ }).click()
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
  await page.goto('/scenario/search-race/compare')
  await page.getByLabel('Response order').selectOption('in-order')
  await page.getByRole('button', { name: /Run live comparison/ }).click()

  await expect(page.getByRole('heading', { name: 'Broken · results for “cat”' })).toBeVisible()
  await expect(page.getByText('Invariant held')).toHaveCount(2)
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
  await expect(timeline.locator('li').first()).toBeVisible()
  await timeline.focus()
  await page.keyboard.press('ArrowDown')
  await expect(timeline.locator('li').first()).toBeFocused()
})

test('reviewer downloads the visible structured trace', async ({ page }) => {
  await page.goto('/scenario/search-race/compare')
  await page.getByRole('button', { name: /Run live comparison/ }).click()
  await expect(page.getByText('Complete', { exact: true })).toBeVisible()
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Download visible trace' }).click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toBe('concurrency-trace-search-race.json')
  const stream = await download.createReadStream()
  let content = ''
  for await (const chunk of stream) content += chunk.toString()
  const trace = JSON.parse(content) as { format: string; scenario: string; deterministic: boolean; controls: unknown[]; timelines: Array<{ events: Array<{ sequence: number; timestampMs: number; kind: string; label: string }> }> }
  expect(trace.format).toBe('frontend-concurrency-lab-trace-v1')
  expect(trace.scenario).toBe('search-race')
  expect(trace.deterministic).toBe(true)
  expect(trace.controls.length).toBeGreaterThan(0)
  expect(trace.timelines[0]?.events[0]).toEqual(expect.objectContaining({ sequence: 1, timestampMs: 0, kind: 'request' }))
})
