import { expect } from '@playwright/test';
import * as R from 'remeda';

import { getRoute, PageTypePortfolio } from '@self/utils';

import { test as base } from '../../api/api-fixtures';
import { Filters } from '../filter-model';

import { addDays } from './add-days';

interface TestFixtures {
	filters: Filters;
}

interface TestOptions {
	tab: PageTypePortfolio.Income | PageTypePortfolio.Expenses;
}

const START_YEAR = 2021;

export const test = base.extend<TestFixtures & TestOptions>({
	tab: [PageTypePortfolio.Income, { option: true }],

	page: async ({ page, org, portfolio, tab }, use) => {
		const url = getRoute({
			entity: 'portfolio',
			id: portfolio.id,
			pageType: tab,
			params: {
				organizationId: org.organization.id,
				portfolioId: portfolio.id,
			},
		});

		await page.goto(url);

		await use(page);
	},

	filters: async ({ page, invoices: _invoices }, use) => {
		const filters = new Filters(page);

		await expect(filters.range.el).toHaveValue('12');
		expect(await filters.range.label()).toBe('Last 12 months');

		// wait for navigation between setting filters to avoid race condition
		await filters.start.fill(`${START_YEAR}-01-01`);
		await page.waitForNavigation();

		await filters.end.fill(`${START_YEAR}-12-31`);
		await page.waitForNavigation();

		await use(filters);
	},
});

test.use({
	userRoleType: 'PORTFOLIO',

	portfoliosParams: [{ fullName: 'Evan Evans' }],

	// Generate consistent data for visual regression testing
	invoicesParams: R.times(100, (n) => {
		const postAt = new Date(START_YEAR, 0, n + 1);
		const isPaid = n % 2 === 0;

		return {
			amount: n * 100,
			isPaid,
			postAt: postAt.toISOString().slice(0, 10),
			paidAt: isPaid ? addDays(postAt, 3).toISOString().slice(0, 10) : null,
			dueAt: addDays(postAt, 17).toISOString().slice(0, 10),
			memo: `Memo for sample invoice #${n}`,
		};
	}),
});
