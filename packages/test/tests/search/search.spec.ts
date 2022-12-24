import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import { test } from '../api/api-fixtures';

test.use({
	portfoliosParams: [{ fullName: 'Alex Anderson' }],
	tenantsParams: [{ fullName: 'Bob Brown' }],
	propertiesParams: [{ street: 'Main St' }],

	page: async (
		{
			page,
			org,
			portfolios: _portfolios,
			tenants: _tenants,
			properties: _properties,
		},
		use,
	) => {
		const url = getRoute({
			entity: 'portfolio',
			pageType: PageType.List,
			params: {
				organizationId: org.organization.id,
			},
		});

		await page.goto(url);

		await use(page);
	},
});

const inputs = [
	{
		searchText: 'Alex',
		resultText: 'Alex Anderson',
		keysToValidate: [['fullName', 'Alex Anderson']],
		type: 'portfolio',
	},
	{
		searchText: 'Bob',
		resultText: 'Bob Brown',
		keysToValidate: [['fullName', 'Bob Brown']],
		type: 'tenant',
	},
	{
		searchText: 'Main',
		resultText: 'Main St',
		keysToValidate: [['street', 'Main St']],
		type: 'property',
	},
] as const;

for (const i of inputs) {
	test(`search: ${i.type}`, async ({ page, isMobile }) => {
		test.slow(); // search indexing is async

		const { searchText, resultText, keysToValidate } = i;

		if (isMobile) {
			await page.getByRole('button', { name: 'Sidebar' }).click();
		}

		const btn = page.getByRole('button', { name: 'Search' });
		await btn.click();

		// search
		const input = page.getByPlaceholder('Search...');
		const result = page.getByRole('option', { name: resultText });

		// Keep trying to type until the result is visible
		// This is because search indexing is async and not instant
		await expect(async () => {
			await input.clear(); // clear to re-trigger search

			await input.fill(searchText);

			// check result
			await expect(result).toBeVisible({
				timeout: 1000, // short timeout to fail fast and retry
			});
		}).toPass();

		// navigate to result
		await result.click();
		const key = page
			.getByTestId('details-pane')
			.getByTestId(keysToValidate[0][0])
			.getByText(keysToValidate[0][1]);

		await expect(key).toBeVisible();
	});
}
