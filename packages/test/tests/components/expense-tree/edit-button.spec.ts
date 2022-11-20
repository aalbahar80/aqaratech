import { expect } from '@playwright/test';
import { getRoute, PageTab } from '@self/utils';
import { test } from '../../api/api-fixtures';

test.use({
	page: async ({ page, org }, use) => {
		const url = getRoute({
			entity: 'organization',
			id: org.organization.id,
			pageType: PageTab.ExpenseCategories,
			params: {},
		});

		await page.goto(url);

		await use(page);
	},
});

test('expense tile links to edit form', async ({ page }) => {
	const name = 'Fire Fighting Contract';

	const tile = page.getByText(name);

	await tile.getByRole('link', { name: 'Edit' }).click();

	// expect page to have url ending with /edit
	const re = new RegExp(`.*/edit$`);
	await expect(page).toHaveURL(re);

	const labelEn = page.getByLabel('Label En');
	await expect(labelEn).toHaveValue(name);
});

test('can drag and drop expense category', async ({ page }) => {
	const category = 'Fire Fighting Contract';
	const group = 'Other CapEx';

	const unchanged = page.getByRole('button', { name: 'No pending changes' });
	await expect(unchanged).toBeDisabled();

	const tile = page.getByText(category);
	// const tile = page.getByText('Other CapEx');

	const newCategory = page.getByText(group);

	await page.waitForTimeout(1000);

	// hover tile
	await tile.hover();

	await page.waitForTimeout(1000);

	// hold left mouse button
	await page.mouse.down();

	await page.waitForTimeout(1000);

	// move mouse to new category
	// Hover twice on purpose: https://playwright.dev/docs/next/input#dragging-manually
	await newCategory.hover();
	await newCategory.hover();

	await page.waitForTimeout(1000);

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
