import { expect, test } from '@playwright/test'

test('reviewer compares broken search with propagated cancellation', async ({ page }) => {
  await page.goto('/scenarios')
  await expect(page.getByRole('heading', { name: 'Scenario catalog' })).toBeVisible()
  await page.getByRole('link', { name: /Compare implementations/ }).click()
  await expect(page).toHaveURL(/\/scenario\/search-race\/compare$/)
  await page.getByRole('button', { name: /Run synchronized comparison/ }).click()

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
  await page.getByRole('button', { name: /Run synchronized comparison/ }).click()

  await expect(page.getByText('Freshness guard active')).toBeVisible()
  await expect(page.getByText('Stale response “ca” discarded')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Fixed · results for “cat”' })).toBeVisible()
})

test('in-order response mode remains a valid non-failing control', async ({ page }) => {
  await page.goto('/scenario/search-race/broken')
  await page.getByLabel('Response order').selectOption('in-order')
  await page.getByRole('button', { name: /Run synchronized comparison/ }).click()

  await expect(page.getByRole('heading', { name: 'Broken · results for “cat”' })).toBeVisible()
  await expect(page.getByText('Invariant held')).toHaveCount(2)
})
