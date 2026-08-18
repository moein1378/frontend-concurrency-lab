import { expect, test } from '@playwright/test'

test('reviewer reproduces a stale search result', async ({ page }) => {
  await page.goto('/scenarios')
  await expect(page.getByRole('heading', { name: 'Scenario catalog' })).toBeVisible()
  await page.getByRole('link', { name: /Open broken scenario/ }).click()
  await expect(page).toHaveURL(/\/scenario\/search-race\/broken$/)
  await page.getByRole('button', { name: /Run broken search/ }).click()
  await expect(page.getByText('Invariant violated')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Results for “ca”' })).toBeVisible()
  await expect(page.getByText('Expected “cat”; committed “ca”.')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Event timeline' })).toBeVisible()
})

test('reviewer can inspect the non-failing response order', async ({ page }) => {
  await page.goto('/scenario/search-race/broken')
  await page.getByLabel('Response order').selectOption('in-order')
  await page.getByRole('button', { name: /Run broken search/ }).click()
  await expect(page.getByText('Invariant held')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Results for “cat”' })).toBeVisible()
})
