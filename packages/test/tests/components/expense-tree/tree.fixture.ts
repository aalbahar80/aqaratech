import { getRoute, PageTab } from '@self/utils';
import { test as base } from '../../api/api-fixtures';

export const test = base.extend({
	page: async ({ page, org }, use) => {
		const url = getRoute({
			entity: 'organization',
			id: org.organization.id,
			pageType: PageTab.ExpenseCategories,
			params: {},
		});

		await page.goto(url);

		await use(page);
	},
});
