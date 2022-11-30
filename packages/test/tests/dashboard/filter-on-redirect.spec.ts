import { expect } from '@playwright/test';
import {
	computeLabelProperty,
	computeLabelUnit,
	getRoute,
	PageType,
	PageTypePortfolio,
} from '@self/utils';
import * as R from 'remeda';
import { selectedLabel } from '../../utils/selected-label';
import { test } from '../api/api-fixtures';

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

	// Filter is prepopulated
	const filter = page.getByRole('combobox', { name: 'Property' });

	await expect(filter).toHaveValue(property.id);

	expect(await selectedLabel(filter)).toBe(property.address);

	// Filter persists
	await page.getByRole('link', { name: 'Income' }).click();

	await expect(filter, 'Filter should persist').toHaveValue(property.id);

	expect(await selectedLabel(filter), 'Filter should persist').toBe(
		property.address,
	);
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

	// Filter:property is prepopulated
	const filterProperty = page.getByRole('combobox', { name: 'Property' });

	await expect(filterProperty).toHaveValue(property.id);

	expect(await selectedLabel(filterProperty)).toBe(
		computeLabelProperty(property),
	);

	// Filter:unit is prepopulated
	const filterUnit = page.getByRole('combobox', { name: 'Unit' });

	await expect(filterUnit).toHaveValue(unit.id);

	expect(await selectedLabel(filterUnit)).toBe(computeLabelUnit(unit));

	// Filter persists
	await page.getByRole('link', { name: 'Income' }).click();

	await expect(filterProperty, 'Filter:property should persist').toHaveValue(
		property.id,
	);

	expect(
		await selectedLabel(filterProperty),
		'Filter:property should persist',
	).toBe(computeLabelProperty(property));

	await expect(filterUnit, 'Filter:unit should persist').toHaveValue(unit.id);

	expect(await selectedLabel(filterUnit), 'Filter:unit should persist').toBe(
		computeLabelUnit(unit),
	);
});
