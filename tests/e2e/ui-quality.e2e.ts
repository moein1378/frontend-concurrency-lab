import { expect, test } from '@playwright/test'

const scenarioRoutes = [
  '/scenarios',
  '/scenario/search-race/compare',
  '/scenario/mutual-exclusion/compare',
  '/scenario/bounded-concurrency/compare',
  '/scenario/single-flight/compare',
  '/scenario/cross-tab/compare?tab=visual',
]

const visualScenarios = [
  { name: 'search', route: '/scenario/search-race/compare', action: /Run live comparison/, complete: true },
  { name: 'mutex', route: '/scenario/mutual-exclusion/compare', action: 'Run comparison', reveal: true },
  { name: 'bounded', route: '/scenario/bounded-concurrency/compare', action: 'Run comparison' },
  { name: 'single-flight', route: '/scenario/single-flight/compare', action: 'Run comparison' },
  { name: 'cross-tab', route: '/scenario/cross-tab/compare?tab=visual', action: 'Coordinate this tab' },
] as const

test('MVP pages stay inside the viewport without browser errors', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })

  for (const route of scenarioRoutes) {
    await page.goto(route)
    await expect(page.locator('h1')).toBeVisible()
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow, `${route} has horizontal overflow`).toBeLessThanOrEqual(1)
  }
  expect(errors).toEqual([])
})

for (const scenario of visualScenarios) {
  test(`${scenario.name} populated visual contract`, async ({ page }, testInfo) => {
    if (scenario.name === 'cross-tab') await page.addInitScript(() => localStorage.clear())
    await page.goto(scenario.route)
    await page.getByRole('button', { name: scenario.action }).click()
    if ('reveal' in scenario) {
      const reveal = page.getByRole('button', { name: 'Reveal next event' })
      while (await reveal.isVisible()) await reveal.click()
    }
    if ('complete' in scenario) await expect(page.getByText('Complete', { exact: true })).toBeVisible()
    const lanes = page.locator('.comparison-grid > *')
    await expect(lanes).toHaveCount(2)
    if (testInfo.project.name === 'chromium') {
      const boxes = await lanes.evaluateAll(elements => elements.map(element => element.getBoundingClientRect().width))
      expect(Math.abs((boxes[0] ?? 0) - (boxes[1] ?? 0))).toBeLessThanOrEqual(1)
    }
    await expect(page).toHaveScreenshot(`${scenario.name}-populated-${testInfo.project.name}.png`, { animations: 'disabled', fullPage: true })
  })
}

test('catalog theme and visual baseline remain coherent', async ({ page }, testInfo) => {
  await page.goto('/scenarios')
  await expect(page).toHaveScreenshot(`catalog-mvp-${testInfo.project.name}.png`, { animations: 'disabled', fullPage: true })

  await page.getByRole('button', { name: 'Use dark theme' }).click()
  await expect(page.locator('.v-application')).toHaveClass(/v-theme--labDark/)

  if (testInfo.project.name === 'chromium') await expect(page).toHaveScreenshot('catalog-dark-chromium.png', { animations: 'disabled', fullPage: true })

})
