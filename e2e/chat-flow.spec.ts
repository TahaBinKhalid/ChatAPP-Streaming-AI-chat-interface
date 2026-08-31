import { test, expect } from '@playwright/test'

test('Basic Application Load Flow', async ({ page }) => {
    await page.goto('http://localhost:5173')
    await expect(page).toHaveTitle(/.*/)
})