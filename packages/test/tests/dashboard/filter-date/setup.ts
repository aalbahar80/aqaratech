import { expect } from '@playwright/test';

import { getRoute, PageTypePortfolio } from '@self/utils';

import { test as base } from '../../api/api-fixtures';
import { Filters } from '../filter-model';

export const test = base.extend<{
	filters: Filters;
}>({
	page: async ({ page, org, property }, use) => {
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

test.use({
	userRoleType: 'PORTFOLIO',
});
