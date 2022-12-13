import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import { test } from '../api/api-fixtures';

test.use({
	portfoliosParams: [{ fullName: 'Alex Anderson' }],
	tenantsParams: [{ fullName: 'Bob Brown' }],
	propertiesParams: [{ label: 'Property 1' }],

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
	},
	{
		searchText: 'Bob',
		resultText: 'Bob Brown',
		keysToValidate: [['fullName', 'Bob Brown']],
	},
	{
		searchText: 'Property 1',
		resultText: 'Property 1',
		keysToValidate: [['label', 'Property 1']],
	},
] as const;

for (const i of inputs) {
	test(`search is enabled - ${i.resultText}`, async ({ page }) => {
		const { searchText, resultText, keysToValidate } = i;

		const btn = page.getByRole('button', { name: 'Search' });
		await btn.click();

		// search
		const input = page.getByPlaceholder('Search...');
		await input.fill(searchText);

		// check result
		const result = page.getByRole('option', { name: resultText });
		await expect(result).toBeVisible();

		// navigate to result
		await result.click();
		const key = page
			.getByTestId('details-pane')
			.getByTestId(keysToValidate[0][0])
			.getByText(keysToValidate[0][1]);

		await expect(key).toBeVisible();
	});
}
