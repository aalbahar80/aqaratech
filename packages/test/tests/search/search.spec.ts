import { getRoute, PageType } from '@self/utils';

import { test } from '../api/api-fixtures';

import { SearchPalette } from './search-palette-model';

import type { DetailsPaneItem } from './search-palette-model';

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
		queryExact: 'Alex Anderson',
		queryPrefix: 'Anders',
		querySuffix: 'derson',
		resultText: 'Alex Anderson',
		keysToValidate: [['fullName', 'Alex Anderson']] as DetailsPaneItem[],
		type: 'portfolio',
	},
	{
		queryExact: 'Bob Brown',
		queryPrefix: 'Brow',
		querySuffix: 'rown',
		resultText: 'Bob Brown',
		keysToValidate: [['fullName', 'Bob Brown']] as DetailsPaneItem[],
		type: 'tenant',
	},
	{
		queryExact: 'Main St',
		queryPrefix: 'Mai',
		querySuffix: 'ain',
		resultText: 'Main St',
		keysToValidate: [['street', 'Main St']] as DetailsPaneItem[],
		type: 'property',
	},
];

for (const i of inputs) {
	test.describe(`Search ${i.type}`, () => {
		test('Exact', async ({ page, isMobile }) => {
			const { queryExact, resultText, keysToValidate } = i;

			const query = queryExact;

			const searchPalette = new SearchPalette({ page, isMobile });

			await searchPalette.open();

			// search
			const result = page.getByRole('option', { name: resultText });

			await searchPalette.search({ query, result });

			// navigate to result
			await result.click();

			await searchPalette.verifyResult({ keysToValidate });
		});

		test('Prefix', async ({ page, isMobile }) => {
			const { queryPrefix, resultText, keysToValidate } = i;

			const query = queryPrefix;

			const searchPalette = new SearchPalette({ page, isMobile });

			await searchPalette.open();

			// search
			const result = page.getByRole('option', { name: resultText });

			await searchPalette.search({ query, result });

			// navigate to result
			await result.click();

			await searchPalette.verifyResult({ keysToValidate });
		});

		test('Suffix', async ({ page, isMobile }) => {
			const { querySuffix, resultText, keysToValidate } = i;

			const query = querySuffix;

			const searchPalette = new SearchPalette({ page, isMobile });

			await searchPalette.open();

			// search
			const result = page.getByRole('option', { name: resultText });

			await searchPalette.search({ query, result });

			// navigate to result
			await result.click();

			await searchPalette.verifyResult({ keysToValidate });
		});
	});
}
