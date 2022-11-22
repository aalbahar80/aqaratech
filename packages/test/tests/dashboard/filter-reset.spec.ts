import { expect } from '@playwright/test';
import { computeLabelUnit, getRoute, PageTypePortfolio } from '@self/utils';
import * as R from 'remeda';
import { selectedLabel } from '../../utils/selected-label';
import { test } from '../api/api-fixtures';
import { Filter } from './filter-model';

test.use({
	userRoleType: 'PORTFOLIO',
	propertiesParams: R.times(3, () => ({})),
	unitsParams: R.times(10, () => ({})),
});

test('unit filter resets when updating property', async ({
	scopedPage: page,
	org,
	property,
	properties,
	unit,
}) => {
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

	const filter = new Filter(page);

	expect(await selectedLabel(filter.property)).toBe('All properties');

	// Select property
	await filter.property.selectOption({ value: property.id });

	expect(await selectedLabel(filter.property)).toBe(property.address);

	// Select unit
	await filter.unit.selectOption({ value: unit.id });

	expect(await selectedLabel(filter.unit)).toBe(computeLabelUnit(unit));

	// Update property
	await filter.property.selectOption({ value: properties[1]!.id });

	expect(await selectedLabel(filter.property)).toBe(properties[1]!.address);

	// Unit filter resets
	expect(await selectedLabel(filter.unit)).toBe('All units');
});
