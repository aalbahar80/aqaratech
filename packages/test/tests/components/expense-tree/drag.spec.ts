import { expect } from '@playwright/test';
import { test } from './tree.fixture';

test('can drag and drop expense category', async ({ page }) => {
	const category = 'Fire Fighting Contract';
	const group = 'Other CapEx';

	const unchanged = page.getByRole('button', { name: 'No pending changes' });
	await expect(unchanged).toBeDisabled();

	const tile = page.getByText(category);
	// const tile = page.getByText('Other CapEx');

	const newCategory = page.getByText(group);

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

	const pending = page.getByText(`${group} → ${category}`);

	await expect(pending).toBeVisible();

	await save.click();

	await expect(unchanged).toBeDisabled();
	await expect(pending).not.toBeVisible();
});
