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
	test.describe(`search for ${i.type}`, () => {
		test('exact', async ({ page, isMobile }) => {
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

		test('exact - lowercase', async ({ page, isMobile }) => {
			const { queryExact, resultText, keysToValidate } = i;

			const query = queryExact.toLowerCase();

			const searchPalette = new SearchPalette({ page, isMobile });

			await searchPalette.open();

			// search
			const result = page.getByRole('option', { name: resultText });

			await searchPalette.search({ query, result });

			// navigate to result
			await result.click();

			await searchPalette.verifyResult({ keysToValidate });
		});

		test('exact - uppercase', async ({ page, isMobile }) => {
			const { queryExact, resultText, keysToValidate } = i;

			const query = queryExact.toUpperCase();

			const searchPalette = new SearchPalette({ page, isMobile });

			await searchPalette.open();

			// search
			const result = page.getByRole('option', { name: resultText });

			await searchPalette.search({ query, result });

			// navigate to result
			await result.click();

			await searchPalette.verifyResult({ keysToValidate });
		});

		test('prefix', async ({ page, isMobile }) => {
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

		test('prefix lowercase', async ({ page, isMobile }) => {
			const { queryPrefix, resultText, keysToValidate } = i;

			const query = queryPrefix.toLowerCase();

			const searchPalette = new SearchPalette({ page, isMobile });

			await searchPalette.open();

			// search
			const result = page.getByRole('option', { name: resultText });

			await searchPalette.search({ query, result });

			// navigate to result
			await result.click();

			await searchPalette.verifyResult({ keysToValidate });
		});

		test('prefix uppercase', async ({ page, isMobile }) => {
			const { queryPrefix, resultText, keysToValidate } = i;

			const query = queryPrefix.toUpperCase();

			const searchPalette = new SearchPalette({ page, isMobile });

			await searchPalette.open();

			// search
			const result = page.getByRole('option', { name: resultText });

			await searchPalette.search({ query, result });

			// navigate to result
			await result.click();

			await searchPalette.verifyResult({ keysToValidate });
		});

		test('suffix', async ({ page, isMobile }) => {
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

		test('suffix - uppercase', async ({ page, isMobile }) => {
			const { querySuffix, resultText, keysToValidate } = i;

			const query = querySuffix.toUpperCase();

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
