import { expect } from '@playwright/test';
import { test } from './tree.fixture';

const CATEGORY = 'Fire Fighting Contract';
const GROUP = 'Other CapEx';

test('can drag and drop expense category', async ({ page }) => {
	const unchanged = page.getByRole('button', { name: 'No pending changes' });
	await expect(unchanged).toBeDisabled();

	const tile = page.getByText(CATEGORY);

	const newCategory = page.getByText(GROUP);

	// hover tile
	await tile.hover();

	// hold left mouse button
	await page.mouse.down();

	// move mouse to new category
	// Hover twice on purpose: https://playwright.dev/docs/next/input#dragging-manually
	await newCategory.hover();
	await newCategory.hover();

	await page.waitForTimeout(1000); // necessary

	// release left mouse button
	await page.mouse.up();

	const save = page.getByRole('button', { name: 'Save changes' });
	await expect(save).toBeEnabled();

	const pending = page.getByText(`${GROUP} → ${CATEGORY}`);

	await expect(pending).toBeVisible();

	await save.click();

	await expect(unchanged).toBeDisabled();
	await expect(pending).not.toBeVisible();
});
