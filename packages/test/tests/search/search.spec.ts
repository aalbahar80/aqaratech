import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import { test as base } from '../api/api-fixtures';

import { SearchPalette } from './search-palette-model';
import { inputs } from './test-data';

const test = base.extend<{
	searchPalette: SearchPalette;
}>({
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

	searchPalette: async ({ page, isMobile }, use) => {
		const searchPalette = new SearchPalette({ page, isMobile });

		await use(searchPalette);
	},
});

test.use({
	portfoliosParams: [{ fullName: 'Alex Anderson' }],
	tenantsParams: [{ fullName: 'Bob Brown' }],
	propertiesParams: [{ street: 'The Main St' }],
});

for (const i of inputs) {
	test.describe(`search for ${i.type}`, () => {
		test('prefix', async ({ searchPalette }) => {
			await searchPalette.searchAndVerify({
				query: i.queryPrefix,
				resultText: i.resultText,
				keysToValidate: i.keysToValidate,
			});
		});
	});
}

// TODO: enable after implementing
test.fixme(
	'multiple matched words within same field are highlighted',
	async ({ page, isMobile }) => {
		const searchPalette = new SearchPalette({ page, isMobile });

		await searchPalette.open();
		await searchPalette.input.fill('Alex Anderson');

		const firstName = page.locator('mark').getByText('Alex').first();
		const lastName = page.locator('mark').getByText('Anderson').first();

		await expect.soft(firstName).toBeVisible();
		await expect.soft(lastName).toBeVisible();
	},
);
