import { expect } from '@playwright/test';
import { getRoute, PageTypePortfolio } from '@self/utils';
import { test as base } from '../api/api-fixtures';
import { Filters } from './filter-model';

base.use({
	userRoleType: 'PORTFOLIO',
});

const test = base.extend({
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
});

test('range filter changes to custom', async ({ page }) => {
	const filters = new Filters(page);

	await expect(filters.range.el).toHaveValue('12');
	expect(await filters.range.label()).toBe('Last 12 months');

	// Manually change start date
	const start = page.getByLabel('start');
	await start.fill('2021-01-01');

	// Expect range to be custom
	await expect(filters.range.el).toHaveValue('null');
	expect(await filters.range.label()).toBe('Custom');
});
