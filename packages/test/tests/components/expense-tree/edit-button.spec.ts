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
