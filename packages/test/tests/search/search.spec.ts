import { getRoute, PageType } from '@self/utils';

import { test } from '../api/api-fixtures';

import { SearchPalette } from './search-palette-model';

import type { SearchInput } from './search-input.type';

test.use({
	portfoliosParams: [{ fullName: 'Alex Anderson' }],
	tenantsParams: [{ fullName: 'Bob Brown' }],
	propertiesParams: [{ street: 'The Main St' }],

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

const inputs: SearchInput[] = [
	{
		queryExact: 'Alex Anderson',
		queryPrefix: 'Anders',
		querySuffix: 'lex',
		resultText: 'Alex Anderson',
		keysToValidate: [['fullName', 'Alex Anderson']],
		type: 'portfolio',
	},
	{
		queryExact: 'Bob Brown',
		queryPrefix: 'Brow',
		querySuffix: 'ob',
		resultText: 'Bob Brown',
		keysToValidate: [['fullName', 'Bob Brown']],
		type: 'tenant',
	},
	{
		queryExact: 'The Main St',
		queryPrefix: 'Mai',
		querySuffix: 'ain',
		resultText: 'The Main St',
		keysToValidate: [['street', 'Main St']],
		type: 'property',
	},
];

for (const i of inputs) {
	test.describe(`search for ${i.type}`, () => {
		test('exact', async ({ page, isMobile }) => {
			const searchPalette = new SearchPalette({ page, isMobile });

			await searchPalette.searchAndVerify({
				query: i.queryExact,
				resultText: i.resultText,
				keysToValidate: i.keysToValidate,
			});
		});

		test('exact - lowercase', async ({ page, isMobile }) => {
			const searchPalette = new SearchPalette({ page, isMobile });

			await searchPalette.searchAndVerify({
				query: i.queryExact.toLowerCase(),
				resultText: i.resultText,
				keysToValidate: i.keysToValidate,
			});
		});

		test('exact - uppercase', async ({ page, isMobile }) => {
			const searchPalette = new SearchPalette({ page, isMobile });

			await searchPalette.searchAndVerify({
				query: i.queryExact.toUpperCase(),
				resultText: i.resultText,
				keysToValidate: i.keysToValidate,
			});
		});

		test('prefix', async ({ page, isMobile }) => {
			const searchPalette = new SearchPalette({ page, isMobile });

			await searchPalette.searchAndVerify({
				query: i.queryPrefix,
				resultText: i.resultText,
				keysToValidate: i.keysToValidate,
			});
		});

		test('prefix lowercase', async ({ page, isMobile }) => {
			const searchPalette = new SearchPalette({ page, isMobile });

			await searchPalette.searchAndVerify({
				query: i.queryPrefix.toLowerCase(),
				resultText: i.resultText,
				keysToValidate: i.keysToValidate,
			});
		});

		test('prefix uppercase', async ({ page, isMobile }) => {
			const searchPalette = new SearchPalette({ page, isMobile });

			await searchPalette.searchAndVerify({
				query: i.queryPrefix.toUpperCase(),
				resultText: i.resultText,
				keysToValidate: i.keysToValidate,
			});
		});

		test('suffix', async ({ page, isMobile }) => {
			const searchPalette = new SearchPalette({ page, isMobile });

			await searchPalette.searchAndVerify({
				query: i.querySuffix,
				resultText: i.resultText,
				keysToValidate: i.keysToValidate,
			});
		});

		test('suffix - uppercase', async ({ page, isMobile }) => {
			const searchPalette = new SearchPalette({ page, isMobile });

			await searchPalette.searchAndVerify({
				query: i.querySuffix.toUpperCase(),
				resultText: i.resultText,
				keysToValidate: i.keysToValidate,
			});
		});
	});
}
