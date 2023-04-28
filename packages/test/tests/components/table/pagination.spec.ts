import { expect } from '@playwright/test';
import * as R from 'remeda';

import { getRoute, PageTypePortfolio } from '@self/utils';

import { selectedLabel } from '../../../utils/selected-label';
import { test } from '../../api/api-fixtures';

import { TablePage } from './TablePage';

const TOTAL = 35;
const SIZE = 20;

test.use({
	userRoleType: 'PORTFOLIO',

	propertiesParams: R.times(3, () => ({})),

	// create multiple units to spread expenses across
	unitsParams: R.times(10, () => ({})),
	expensesParams: R.times(TOTAL, () => ({
		postAt: new Date().toISOString().slice(0, 10),
		amount: 30,
	})),

	page: async ({ page, org, portfolio, expenses: _expenses }, use) => {
		const url = getRoute({
			entity: 'portfolio',
			id: portfolio.id,
			pageType: PageTypePortfolio.ExpensesTable,
			params: {
				organizationId: org.organization.id,
				portfolioId: portfolio.id,
			},
		});

		await page.goto(url);

		await use(page);
	},
});

test('table pagination smoke test', async ({ page }) => {
	const table = new TablePage(page);

	const info = `Showing 1 to ${SIZE} of ${TOTAL}`;
	await expect.soft(table.info).toHaveText(info);

	await expect(table.next).toBeEnabled();
	await expect(table.prev).toBeDisabled();

	await table.next.click();

	await expect(table.next).toBeDisabled();
	await expect(table.prev).toBeEnabled();

	const info2 = `Showing ${SIZE + 1} to ${TOTAL} of ${TOTAL}`;
	await expect.soft(table.info).toHaveText(info2);

	await expect(table.size).toHaveValue('20');
	expect(await selectedLabel(table.size)).toBe('Show 20');
});

test('pagination is updated when changing property filter', async ({
	page,
	properties,
	expenses: _expenses,
}) => {
	const table = new TablePage(page);

	await expect.soft(table.property).toHaveValue('undefined');

	// Go to next page
	const resPromise = page.waitForResponse((res) => res.status() === 200);
	await table.next.click();
	await resPromise;

	// Change property filter

	await table.property.selectOption(properties[1]!.id);

	// Expect pagination to be reset
	await expect(table.prev).toBeDisabled();

	await expect(table.range(1)).toHaveAttribute('aria-current', 'page');
});

test('should display current page number upon load', async ({
	page,
	portfolio,
}) => {
	const url = getRoute({
		entity: 'portfolio',
		id: portfolio.id,
		pageType: PageTypePortfolio.ExpensesTable,
		params: {
			organizationId: portfolio.organizationId,
			portfolioId: portfolio.id,
		},
	});

	await page.goto(url + '?page=2');
	const table = new TablePage(page);

	// expect to be on page 2
	await expect(table.range(2)).toHaveAttribute('aria-current', 'page');
});

test('page number updates when pressing back button', async ({
	page,
	portfolio,
}) => {
	const url = getRoute({
		entity: 'portfolio',
		id: portfolio.id,
		pageType: PageTypePortfolio.ExpensesTable,
		params: {
			organizationId: portfolio.organizationId,
			portfolioId: portfolio.id,
		},
	});
	await page.goto(url);
	const table = new TablePage(page);

	// expect to start on page 1
	await expect(table.range(1)).toHaveAttribute('aria-current', 'page');
	await table.next.click();

	// expect to be on page 2
	await expect(table.range(2)).toHaveAttribute('aria-current', 'page');

	// Go back
	await page.goBack();

	// expect to be on page 1
	await expect(table.range(1)).toHaveAttribute('aria-current', 'page');
});

test('data updates when pressing back button', async ({ page, portfolio }) => {
	const url = getRoute({
		entity: 'portfolio',
		id: portfolio.id,
		pageType: PageTypePortfolio.ExpensesTable,
		params: {
			organizationId: portfolio.organizationId,
			portfolioId: portfolio.id,
		},
	});
	await page.goto(url);
	const table = new TablePage(page);

	const rows = page.locator('tbody tr');
	const row = rows.first();

	// take note of current data
	const data1 = await row.innerText();

	await table.next.click();

	// wait for data to update
	await expect(async () => {
		const data2 = await row.innerText();
		expect(data2).not.toBe(data1);
	}).toPass();

	// Go back
	await page.goBack();

	// expect data to be updated back to original
	await expect(async () => {
		const data3 = await row.innerText();
		expect(data3).toBe(data1);
	}).toPass();
});

test('can update pagesize', async ({ page, portfolio }) => {
	const url = getRoute({
		entity: 'portfolio',
		id: portfolio.id,
		pageType: PageTypePortfolio.ExpensesTable,
		params: {
			organizationId: portfolio.organizationId,
			portfolioId: portfolio.id,
		},
	});
	await page.goto(url);
	const table = new TablePage(page);

	await table.size.selectOption('50');

	// expect url to be updated
	await page.waitForURL((url) => url.toString().includes('take=50'));
});
