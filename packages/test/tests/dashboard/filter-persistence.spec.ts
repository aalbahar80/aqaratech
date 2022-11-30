import { expect } from '@playwright/test';
import {
	computeLabelProperty,
	computeLabelUnit,
	getRoute,
	PageTypePortfolio,
} from '@self/utils';
import * as R from 'remeda';
import { test } from '../api/api-fixtures';
import { Filters } from './filter-model';

test.use({
	userRoleType: 'PORTFOLIO',
	expensesParams: R.times(100, () => ({
		amount: 100,
	})),
});

const PAGES = ['Income', 'Expenses'];

for (const PAGE_NAME of PAGES) {
	test(`filter persists through ${PAGE_NAME} details pane`, async ({
		scopedPage: page,
		org,
		property,
		unit,
		expenses: _expenses,
	}) => {
		const params = {
			organizationId: org.organization.id,
			portfolioId: unit.portfolioId,
		};

		// Go to financials summary page
		const url = getRoute({
			entity: 'portfolio',
			id: unit.portfolioId,
			pageType: PageTypePortfolio.Summary,
			params,
		});

		await page.goto(url);

		const filters = new Filters(page);

		// Select a property
		await filters.property.el.selectOption({ value: unit.propertyId });

		// Select a unit
		await filters.unit.el.selectOption({ value: unit.id });

		// Clink on details link
		await page.getByRole('link', { name: `${PAGE_NAME} Details →` }).click();

		// Filter persists
		await expect(filters.property.el).toHaveValue(unit.propertyId);
		expect(await filters.property.label()).toBe(computeLabelProperty(property));

		await expect(filters.unit.el).toHaveValue(unit.id);
		expect(await filters.unit.label()).toBe(computeLabelUnit(unit));
	});
}
