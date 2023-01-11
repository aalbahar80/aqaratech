import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import { test as base } from '../api/api-fixtures';

import { SearchPalette } from './search-palette-model';
import { inputs } from './test-data';

const test = base.extend<{
	searchPalette: SearchPalette;
}>({
	searchPalette: async ({ page, isMobile }, use) => {
		const searchPalette = new SearchPalette({ page, isMobile });

		await use(searchPalette);
	},
});

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

// TODO: Make tests re-use organization fixture

for (const i of inputs) {
	test.describe(`search for ${i.type}`, () => {
		test('exact', async ({ searchPalette }) => {
			await searchPalette.searchAndVerify({
				query: i.queryExact,
				resultText: i.resultText,
				keysToValidate: i.keysToValidate,
			});
		});

		test('exact - lowercase', async ({ searchPalette }) => {
			await searchPalette.searchAndVerify({
				query: i.queryExact.toLowerCase(),
				resultText: i.resultText,
				keysToValidate: i.keysToValidate,
			});
		});

		test('exact - uppercase', async ({ searchPalette }) => {
			await searchPalette.searchAndVerify({
				query: i.queryExact.toUpperCase(),
				resultText: i.resultText,
				keysToValidate: i.keysToValidate,
			});
		});

		test('prefix', async ({ searchPalette }) => {
			await searchPalette.searchAndVerify({
				query: i.queryPrefix,
				resultText: i.resultText,
				keysToValidate: i.keysToValidate,
			});
		});

		test('prefix lowercase', async ({ searchPalette }) => {
			await searchPalette.searchAndVerify({
				query: i.queryPrefix.toLowerCase(),
				resultText: i.resultText,
				keysToValidate: i.keysToValidate,
			});
		});

		test('prefix uppercase', async ({ searchPalette }) => {
			await searchPalette.searchAndVerify({
				query: i.queryPrefix.toUpperCase(),
				resultText: i.resultText,
				keysToValidate: i.keysToValidate,
			});
		});

		test('suffix', async ({ searchPalette }) => {
			await searchPalette.searchAndVerify({
				query: i.querySuffix,
				resultText: i.resultText,
				keysToValidate: i.keysToValidate,
			});
		});

		test('suffix - uppercase', async ({ searchPalette }) => {
			await searchPalette.searchAndVerify({
				query: i.querySuffix.toUpperCase(),
				resultText: i.resultText,
				keysToValidate: i.keysToValidate,
			});
		});

		test("spaces don't cause error response", async ({
			page,
			searchPalette,
		}) => {
			await searchPalette.open();

			const [res] = await Promise.all([
				page.waitForResponse(/.*search/, {
					timeout: 5000,
				}),
				searchPalette.input.fill(` ${i.queryExact} `),
			]);

			expect(res.status()).toBeLessThan(400);
		});
	});
}

test('multiple matched words within same field are highlighted', async ({
	page,
	isMobile,
}) => {
	test.fail(); // TODO: enable after implementing
	const searchPalette = new SearchPalette({ page, isMobile });

	await searchPalette.open();
	await searchPalette.input.fill('Alex Anderson');

	const firstName = page.locator('mark').getByText('Alex').first();
	const lastName = page.locator('mark').getByText('Anderson').first();

	await expect.soft(firstName).toBeVisible();
	await expect.soft(lastName).toBeVisible();
});
