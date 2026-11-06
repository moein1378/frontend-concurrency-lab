import { expect, test } from '@playwright/test'

for (const scenario of ['search-race', 'mutual-exclusion', 'bounded-concurrency', 'single-flight', 'cross-tab']) {
  test(`${scenario} mobile section navigation selects only the tapped item`, async ({ page }) => {
    await page.setViewportSize({ width: 393, height: 851 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(`/scenario/${scenario}/compare`)
    const navigation = page.getByRole('navigation', { name: 'Simulator sections' })
    await expect(navigation.getByRole('button', { name: 'Controls', exact: true })).toHaveAttribute('aria-current', 'location')

    for (const [label, selector] of [['Why?', '.why-panel'], ['Result', '.comparison-results'], ['Controls', '.comparison-controls']] as const) {
      const button = navigation.getByRole('button', { name: label, exact: true })
      await button.click()
      await expect(button).toHaveAttribute('aria-current', 'location')
      await expect(navigation.locator('[aria-current="location"]')).toHaveCount(1)
      await expect(button).toHaveClass(/is-active/)
      await expect(page.locator(`.simulator-workspace ${selector}`)).toBeInViewport()
      const backgrounds = await navigation.getByRole('button').evaluateAll(buttons => buttons.map(element => ({ current: element.getAttribute('aria-current') === 'location', background: getComputedStyle(element).backgroundColor })))
      const active = backgrounds.find(item => item.current)!
      for (const inactive of backgrounds.filter(item => !item.current)) expect(inactive.background).not.toBe(active.background)
    }
  })
}
