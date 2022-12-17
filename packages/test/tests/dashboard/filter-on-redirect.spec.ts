import { expect } from '@playwright/test';
import * as R from 'remeda';

import {
	computeLabelProperty,
	computeLabelUnit,
	getRoute,
	PageType,
	PageTypePortfolio,
} from '@self/utils';

import { test } from '../api/api-fixtures';

import { Filters } from './filter-model';

test.use({
	userRoleType: 'PORTFOLIO',
	expensesParams: R.times(100, () => ({
		amount: 100,
	})),
});

test('filter is prepopulated on redirect - property TO financials', async ({
	scopedPage: page,
	org,
	property,
	expenses: _expenses,
	isMobile,
}) => {
	const params = {
		organizationId: org.organization.id,
		portfolioId: property.portfolioId,
	};

	// Go to property page
	const url = getRoute({
		entity: 'property',
		id: property.id,
		pageType: PageType.Id,
		params,
	});

	await page.goto(url);

	if (isMobile) {
		// Select tab
		const select = page.getByRole('combobox', { name: 'Select a tab' });
		await select.selectOption({ label: 'Financials' });
	} else {
		// Click tab
		await page
			.getByRole('navigation', { name: 'Tabs' })
			.getByRole('link', { name: 'Financials' })
			.click();
	}

	await expect(page).toHaveURL(
		getRoute({
			entity: 'portfolio',
			id: property.portfolioId,
			pageType: PageTypePortfolio.Summary,
			params,
		}),
	);

	const filters = new Filters(page);

	// Filter:property is prepopulated
	await expect(filters.property.el).toHaveValue(property.id);
	expect(await filters.property.label()).toBe(computeLabelProperty(property));

	// Navigate to income details
	await page.getByRole('link', { name: 'Income Details' }).click();

	// Filter:property persists
	await expect(filters.property.el).toHaveValue(property.id);
	expect(await filters.property.label()).toBe(computeLabelProperty(property));
});

test('filter is prepopulated on redirect - unit TO financials', async ({
	scopedPage: page,
	org,
	property,
	unit,
	expenses: _expenses,
	isMobile,
}) => {
	const params = {
		organizationId: org.organization.id,
		portfolioId: property.portfolioId,
	};

	// Go to financials tab
	const url = getRoute({
		entity: 'unit',
		id: unit.id,
		pageType: PageType.Id,
		params,
	});

	await page.goto(url);

	if (isMobile) {
		// Select tab
		const select = page.getByRole('combobox', { name: 'Select a tab' });
		await select.selectOption({ label: 'Financials' });
	} else {
		// Click tab
		await page
			.getByRole('navigation', { name: 'Tabs' })
			.getByRole('link', { name: 'Financials' })
			.click();
	}

	await expect(page).toHaveURL(
		getRoute({
			entity: 'portfolio',
			id: property.portfolioId,
			pageType: PageTypePortfolio.Summary,
			params,
		}),
	);

	const filters = new Filters(page);

	// Filter:property is prepopulated
	await expect(filters.property.el).toHaveValue(unit.propertyId);
	expect(await filters.property.label()).toBe(computeLabelProperty(property));

	// Filter:unit is prepopulated
	await expect(filters.unit.el).toHaveValue(unit.id);
	expect(await filters.unit.label()).toBe(computeLabelUnit(unit));

	// Navigate to income details
	await page.getByRole('link', { name: 'Income Details' }).click();

	// Filter:property persists
	await expect(filters.property.el).toHaveValue(unit.propertyId);
	expect(await filters.property.label()).toBe(computeLabelProperty(property));

	// Filter:unit persists
	await expect(filters.unit.el).toHaveValue(unit.id);
	expect(await filters.unit.label()).toBe(computeLabelUnit(unit));
});
