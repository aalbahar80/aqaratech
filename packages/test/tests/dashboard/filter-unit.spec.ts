import { expect } from '@playwright/test';
import { getRoute, PageTypePortfolio } from '@self/utils';
import * as R from 'remeda';
import { test } from '../api/api-fixtures';
import { Filters } from './filter-model';

test.use({
	userRoleType: 'PORTFOLIO',
	propertiesParams: R.times(2, () => ({})),
	unitsParams: R.times(200, () => ({})),
});

test('all units are shown for each property', async ({
	page,
	org,
	portfolio,
	properties,
	units,
}) => {
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

	const filters = new Filters(page);

	// Select a property
	await filters.property.el.selectOption({ value: properties[0].id });

	// Check that all units are shown
	const el = filters.unit.el;

	const options = await el.evaluate((el: HTMLSelectElement) => {
		// return an array of unit id's + 'null' + 'undefined'
		return Array.from(el.options).map((option) => option.value);
	});

	// check that all of properties[0].units are available to select from
	const unitIds = units
		.filter((unit) => unit.propertyId === properties[0].id)
		.map((unit) => unit.id);

	expect.soft(options).toHaveLength(unitIds.length + 2); // +2 for 'null' and 'undefined'
	expect(options).toEqual(expect.arrayContaining(unitIds));
});
