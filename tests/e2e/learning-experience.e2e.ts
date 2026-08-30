import { expect, test } from '@playwright/test'

test('catalog explains the learning method and previews each scenario outcome', async ({ page }) => {
  await page.goto('/scenarios')

  await expect(page.getByRole('heading', { name: 'Learn concurrency by changing the system' })).toBeVisible()
  await expect(page.getByText('Predict → run → inspect → explain')).toBeVisible()
  await expect(page.getByRole('article')).toHaveCount(5)
  await expect(page.getByRole('article').first().getByText('You will understand')).toBeVisible()
  await expect(page.getByRole('article').first().getByText('Frontend data fetching')).toBeVisible()
  const images = await page.locator('.scenario-card-image').evaluateAll(elements => elements.map(element => (element as HTMLImageElement).src))
  expect(new Set(images).size).toBe(5)
  await expect(page.getByText(/\d+\s*[–-]\s*\d+\s*min/i)).toHaveCount(0)
})

test('catalog lesson actions use client routing and preserve the selected theme', async ({ page }) => {
  await page.goto('/scenarios')
  const lessonActions = page.getByRole('link', { name: 'Start the lesson →' })
  await expect(lessonActions).toHaveCount(5)
  for (const action of await lessonActions.all()) await expect(action).toBeVisible()

  await page.getByRole('button', { name: 'Use dark theme' }).click()
  await page.getByRole('link', { name: 'Start the lesson →' }).first().click()
  await expect(page).toHaveURL(/\/scenario\/search-race\/compare$/)
  await expect(page.locator('.v-application')).toHaveClass(/v-theme--labDark/)
  await expect(page.evaluate(() => localStorage.getItem('concurrency-lab-theme'))).resolves.toBe('dark')

  await page.reload()
  await expect(page.locator('.v-application')).toHaveClass(/v-theme--labDark/)
  await page.getByRole('link', { name: 'Scenario catalog' }).click()
  await expect(page).toHaveURL(/\/scenarios$/)
  await expect(page.locator('.v-application')).toHaveClass(/v-theme--labDark/)
})

test('guided lesson highlights the real run control before explaining state', async ({ page }) => {
  await page.goto('/scenario/single-flight/compare')
  await page.getByRole('button', { name: 'Start guided lesson' }).click()
  await page.getByRole('button', { name: 'Next' }).click()
  await page.getByRole('button', { name: 'Next' }).click()
  await expect(page.locator('.introjs-tooltip')).toContainText('highlighted control runs the real comparison')
  await page.getByRole('button', { name: 'Next' }).click()
  await expect(page.locator('.introjs-tooltip')).toContainText('live simulator state')
})

test('state steppers derive invalid, processing, completed, and reset states from simulators', async ({ page }) => {
  await page.goto('/scenario/bounded-concurrency/compare')
  const bounded = page.locator('.scenario-stepper')
  await expect(bounded).toHaveCount(1)
  await expect(page.locator('.why-panel .system-diagram')).toHaveCount(0)
  await expect(bounded).toHaveAttribute('data-current-step', '0')
  await page.getByLabel('Capacity').fill('0')
  await expect(bounded).toHaveAttribute('data-step-tone', 'error')
  await expect(page.getByRole('button', { name: 'Run comparison' })).toBeDisabled()
  await page.getByLabel('Capacity').fill('2')
  await page.getByRole('button', { name: 'Run comparison' }).click()
  await expect(bounded).not.toHaveAttribute('data-current-step', '0')
  const tutorChange = page.locator('.why-panel .why-details').getByText(/Started 6 uploads/)
  await expect(tutorChange).toBeVisible()
  await page.getByRole('button', { name: 'Reveal next event' }).click()
  await expect(page.locator('.why-panel')).toContainText('Revealed event 2 of')
  await page.getByRole('button', { name: 'Reset' }).click()
  await expect(bounded).toHaveAttribute('data-current-step', '0')
  await expect(page.getByText('Run the batch to reveal its queue, permits, and active load.')).toBeVisible()

  await page.goto('/scenario/single-flight/compare')
  const flight = page.locator('.scenario-stepper')
  await page.getByLabel('Resource ID').fill('')
  await expect(flight).toHaveAttribute('data-step-tone', 'error')
  await expect(page.getByRole('button', { name: 'Run comparison' })).toBeDisabled()
  await page.getByRole('button', { name: 'Reset' }).click()
  await expect(page.getByLabel('Resource ID')).toHaveValue('Moein')
  await expect(flight).toHaveAttribute('data-current-step', '0')
})

test('a scenario teaches a progressive mental model around the simulator', async ({ page }) => {
  await page.goto('/scenario/search-race/compare')

  await expect(page.getByRole('heading', { name: 'First, feel the problem' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'The concept, in plain language' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Production mapping' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Trade-offs and decisions' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Can you explain it?' })).toBeVisible()
  await expect(page.getByText('Request → response → commit decision → visible result')).toBeVisible()
})

test('guided tour teaches an interaction and can be restarted or skipped', async ({ page }) => {
  await page.goto('/scenario/search-race/compare')
  await page.getByRole('button', { name: 'Start guided lesson' }).click()

  await expect(page.locator('.introjs-tooltip')).toContainText('Make a prediction')
  await expect(page.getByRole('button', { name: /Skip/ })).toBeVisible()
  await expect(page.getByRole('button', { name: /Next/ })).toBeVisible()
  await page.getByRole('button', { name: /Skip/ }).click()
  await expect(page.getByRole('button', { name: 'Restart guided lesson' })).toBeVisible()
})

test('guided lesson uses an opaque theme surface in light and dark modes', async ({ page }) => {
  await page.goto('/scenario/search-race/compare')
  for (const mode of ['light', 'dark'] as const) {
    if (mode === 'dark') await page.getByRole('button', { name: 'Use dark theme' }).click()
    await page.getByRole('button', { name: /guided lesson/ }).click()
    const tooltip = page.locator('.introjs-tooltip')
    await expect(tooltip).toBeVisible()
    const visual = await tooltip.evaluate(element => {
      const style = getComputedStyle(element)
      return { background: style.backgroundColor, color: style.color, overflow: element.scrollWidth - element.clientWidth }
    })
    expect(visual.background).not.toBe('rgba(0, 0, 0, 0)')
    expect(visual.background).not.toBe('transparent')
    expect(visual.color).not.toBe(visual.background)
    expect(visual.overflow).toBeLessThanOrEqual(2)
    await page.getByRole('button', { name: /Skip/ }).click()
  }
})

const workspaces = [
  { route: 'search-race', run: /Run live comparison/, control: 'Response order', option: 'in-order' },
  { route: 'mutual-exclusion', run: 'Run comparison', control: 'First attempt ending', option: 'failure' },
  { route: 'bounded-concurrency', run: 'Run comparison', control: 'Capacity', option: '3' },
  { route: 'single-flight', run: 'Run comparison', control: 'Subscribers', option: '4' },
] as const

for (const scenario of workspaces) {
  test(`${scenario.route} keeps action, consequence, and explanation together`, async ({ page }, testInfo) => {
    await page.goto(`/scenario/${scenario.route}/compare`)
    const workspace = page.locator('.simulator-workspace')
    await expect(workspace).toBeVisible()
    await expect(workspace.getByRole('heading', { name: 'Why did this happen?' })).toBeVisible()

    const control = page.getByLabel(scenario.control)
    if (await control.evaluate((element) => element instanceof HTMLSelectElement)) await control.selectOption(scenario.option)
    else await control.fill(scenario.option)
    await expect(workspace.getByText(/You changed/)).toBeVisible()
    await expect(workspace.getByText(/Internal effect/)).toBeVisible()
    await page.getByRole('button', { name: scenario.run }).click()
    await expect(workspace.locator('.comparison-results')).toBeVisible()

    const boxes = await workspace.locator(':scope > .comparison-controls, :scope > .workspace-outcome > .why-panel').evaluateAll((elements) => elements.map((element) => { const box = element.getBoundingClientRect(); return { top: box.top, bottom: box.bottom } }))
    if (testInfo.project.name === 'phone' || scenario.route === 'search-race') {
      expect(Math.abs((boxes[1]?.top ?? 0) - (boxes[0]?.bottom ?? 0))).toBeLessThan(24)
    } else {
      expect(Math.abs((boxes[0]?.top ?? 0) - (boxes[1]?.top ?? 0))).toBeLessThan(48)
      const simulatorHeight = await workspace.evaluate(element => element.getBoundingClientRect().height)
      expect(simulatorHeight).toBeLessThanOrEqual(1300)
    }
  })
}

test('cross-tab explains ownership beside the action', async ({ page }) => {
  await page.goto('/scenario/cross-tab/compare?tab=teaching-tab')
  const workspace = page.locator('.simulator-workspace')
  await page.getByRole('button', { name: 'Coordinate this tab' }).click()
  await expect(workspace.getByRole('heading', { name: 'Why did this happen?' })).toBeVisible()
  await expect(workspace.getByText('Shared ownership')).toBeVisible()
  await expect(workspace.locator('.comparison-results')).toBeVisible()
  await expect(workspace.getByText('teaching-tab')).toBeHidden()
})
