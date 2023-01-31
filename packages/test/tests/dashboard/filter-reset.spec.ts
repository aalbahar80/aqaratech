import { expect } from '@playwright/test';
import * as R from 'remeda';

import {
	computeLabelProperty,
	computeLabelUnit,
	getRoute,
	PageTypePortfolio,
} from '@self/utils';

import { test } from '../api/api-fixtures';

import { Filters } from './filter-model';

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

	const filters = new Filters(page);

	expect(await filters.property.label()).toBe('All');

	// Select property
	await filters.property.el.selectOption({ value: property.id });

	expect(await filters.property.label()).toBe(computeLabelProperty(property));

	// Select unit
	await filters.unit.el.selectOption({ value: unit.id });

	expect(await filters.unit.label()).toBe(computeLabelUnit(unit));

	// Update property
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	await filters.property.el.selectOption({ value: properties[1]!.id });

	expect(await filters.property.label()).toBe(
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		computeLabelProperty(properties[1]!),
	);

	// Unit filter resets
	expect(await filters.unit.label()).toBe('All');
});
