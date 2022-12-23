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

	page: async (
		{ scopedPage: page, org, portfolio, expenses: _expenses },
		use,
	) => {
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

	const info = `Showing 1 to ${SIZE} of ${TOTAL} results`;
	await expect.soft(table.info).toHaveText(info);

	await expect(table.next).toBeEnabled();
	await expect(table.prev).toBeDisabled();

	await table.next.click();

	await expect(table.next).toBeDisabled();
	await expect(table.prev).toBeEnabled();

	const info2 = `Showing ${SIZE + 1} to ${TOTAL} of ${TOTAL} results`;
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
	await table.next.click();
	await page.waitForNavigation();

	// Change property filter

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	await table.property.selectOption(properties[1]!.id);

	// Expect pagination to be reset
	await expect(table.prev).toBeDisabled();

	await expect(table.range(1)).toHaveAttribute('aria-current', 'page');
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
test.fixme('should display current page number upon load', async ({}) => {});

// eslint-disable-next-line @typescript-eslint/no-empty-function
test.fixme('page number updates when pressing back button', async ({}) => {});

// eslint-disable-next-line @typescript-eslint/no-empty-function
test.fixme('data updates when pressing back button', async ({}) => {});

// eslint-disable-next-line @typescript-eslint/no-empty-function
test.fixme('can update pagesize', async ({}) => {});
