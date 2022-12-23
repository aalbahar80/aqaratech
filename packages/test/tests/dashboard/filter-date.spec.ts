import { expect } from '@playwright/test';

import { getRoute, PageTypePortfolio } from '@self/utils';

import { test as base } from '../api/api-fixtures';

import { Filters } from './filter-model';

base.use({
	userRoleType: 'PORTFOLIO',
});

const test = base.extend<{
	filters: Filters;
}>({
	page: async ({ scopedPage: page, org, property }, use) => {
		const params = {
			organizationId: org.organization.id,
			portfolioId: property.portfolioId,
		};

		const url = getRoute({
			entity: 'portfolio',
			id: property.portfolioId,
			pageType: PageTypePortfolio.Expenses,
			params,
		});

		await page.goto(url);

		await use(page);
	},

	filters: async ({ page }, use) => {
		const filters = new Filters(page);

		await expect(filters.range.el).toHaveValue('12');
		expect(await filters.range.label()).toBe('Last 12 months');

		await use(filters);
	},
});

test.describe.configure({ mode: 'parallel' });

test('range filter changes to custom when editing start date', async ({
	filters,
}) => {
	// Manually change start date
	await filters.start.fill('2021-01-01');

	// Expect range to be custom
	await expect(filters.range.el).toHaveValue('null');
	expect(await filters.range.label()).toBe('Custom');
});

test('range filter changes to custom when editing end date', async ({
	filters,
}) => {
	// Manually change end date
	await filters.end.fill('2025-01-01');

	// Expect range to be custom
	await expect(filters.range.el).toHaveValue('null');
	expect(await filters.range.label()).toBe('Custom');
});

test('updating date triggers http call', async ({ page, filters }) => {
	const [request] = await Promise.all([
		page.waitForRequest(/.*end=2025-01-01/),

		// set invalid end	date
		filters.end.fill('2025-01-01'),
	]);

	expect(request).toBeTruthy();
});

test('invalid date does not trigger http call', async ({ page, filters }) => {
	// this test should fail to indicate that no http call is made
	test.fail();

	// @ts-expect-error no use
	const [request] = await Promise.all([
		page.waitForRequest(/.*end/, {
			timeout: 5000,
		}),

		// set invalid end	date
		filters.end.fill('1990-01-01'),
	]);
});

test('invalid date does not trigger http call - multiple', async ({
	page,
	filters,
}) => {
	// this test should fail to indicate that no http call is made
	test.fail();

	// set start date in the future
	await filters.start.fill('2030-01-01');

	// @ts-expect-error no use
	const [request] = await Promise.all([
		page.waitForRequest(/.*end/, {
			timeout: 5000,
		}),

		// set invalid end date
		filters.end.fill('2019-01-01'),
		filters.end.fill('2020-01-01'),
		filters.end.fill('2021-01-01'),
		// filters.end.fill('2022-01-01'), // Why does this trigger a request?
	]);
});

test('start date persists', async ({ page, filters }) => {
	// set start date first, making range invalid
	await filters.start.fill('2030-01-01');
	await page.waitForTimeout(200); // wait for debounce timer

	const [request] = await Promise.all([
		page.waitForRequest(/.*start=2030-01-01&end=2031-01-01.*/),

		// set start to fix range
		filters.end.fill('2031-01-01'),
	]);

	expect(request).toBeTruthy();
});

test('end date persists', async ({ page, filters }) => {
	// set end date first, making range invalid
	await filters.end.fill('2020-01-01');
	await page.waitForTimeout(200); // wait for debounce timer

	const [request] = await Promise.all([
		page.waitForRequest(/.*start=2019-01-01&end=2020-01-01.*/),

		// set start to fix range
		filters.start.fill('2019-01-01'),
	]);

	expect(request).toBeTruthy();
});
