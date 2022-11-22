import { expect } from '@playwright/test';
import { getRoute, PageTab, PageTypePortfolio } from '@self/utils';
import * as R from 'remeda';
import { selectedLabel } from '../../utils/selected-label';
import { test } from '../api/api-fixtures';

test.use({
	userRoleType: 'PORTFOLIO',
	expensesParams: R.times(100, () => ({
		amount: 100,
	})),
});

test('filter is prepopulated on redirect - property TO expenses', async ({
	scopedPage: page,
	org,
	property,
	expenses: _expenses,
}) => {
	const params = {
		organizationId: org.organization.id,
		portfolioId: property.portfolioId,
	};

	// Go to financials tab
	const url = getRoute({
		entity: 'property',
		id: property.id,
		pageType: PageTab.Financials,
		params,
	});

	await page.goto(url);

	// Click Expenses details
	await page.getByRole('button', { name: 'Details' }).nth(1).click();

	await expect(page).toHaveURL(
		getRoute({
			entity: 'portfolio',
			id: property.portfolioId,
			pageType: PageTypePortfolio.Expenses,
			params,
		}),
	);

	// Filter is prepopulated
	const filter = page.getByRole('combobox', { name: 'Property' });

	await expect(filter).toHaveValue(property.id);

	expect(await selectedLabel(filter)).toBe(property.address);
});

test('filter is prepopulated on redirect - property TO income', async ({
	scopedPage: page,
	org,
	property,
	expenses: _expenses,
}) => {
	const params = {
		organizationId: org.organization.id,
		portfolioId: property.portfolioId,
	};

	// Go to financials tab
	const url = getRoute({
		entity: 'property',
		id: property.id,
		pageType: PageTab.Financials,
		params,
	});

	await page.goto(url);

	// Click Expenses details
	await page.getByRole('button', { name: 'Details' }).nth(0).click();

	await expect(page).toHaveURL(
		getRoute({
			entity: 'portfolio',
			id: property.portfolioId,
			pageType: PageTypePortfolio.Income,
			params,
		}),
	);

	// Filter is prepopulated
	const filter = page.getByRole('combobox', { name: 'Property' });

	await expect(filter).toHaveValue(property.id);

	expect(await selectedLabel(filter)).toBe(property.address);
});

test('filter is prepopulated on redirect - unit TO expenses', async ({
	scopedPage: page,
	org,
	property,
	unit,
	expenses: _expenses,
}) => {
	const params = {
		organizationId: org.organization.id,
		portfolioId: property.portfolioId,
	};

	// Go to financials tab
	const url = getRoute({
		entity: 'unit',
		id: unit.id,
		pageType: PageTab.Financials,
		params,
	});

	await page.goto(url);

	// Click Expenses details
	await page.getByRole('button', { name: 'Details' }).nth(1).click();

	await expect(page).toHaveURL(
		getRoute({
			entity: 'portfolio',
			id: property.portfolioId,
			pageType: PageTypePortfolio.Expenses,
			params,
		}),
	);

	// Filter is prepopulated
	const filter = page.getByRole('combobox', { name: 'Unit' });

	await expect(filter).toHaveValue(unit.id);

	expect(await selectedLabel(filter)).toBe(unit.title);
});

test('filter is prepopulated on redirect - unit TO income', async ({
	scopedPage: page,
	org,
	property,
	unit,
	expenses: _expenses,
}) => {
	const params = {
		organizationId: org.organization.id,
		portfolioId: property.portfolioId,
	};

	// Go to financials tab
	const url = getRoute({
		entity: 'unit',
		id: unit.id,
		pageType: PageTab.Financials,
		params,
	});

	await page.goto(url);

	// Click Expenses details
	await page.getByRole('button', { name: 'Details' }).nth(0).click();

	await expect(page).toHaveURL(
		getRoute({
			entity: 'portfolio',
			id: property.portfolioId,
			pageType: PageTypePortfolio.Income,
			params,
		}),
	);

	// Filter is prepopulated
	const filter = page.getByRole('combobox', { name: 'Unit' });

	await expect(filter).toHaveValue(unit.id);

	expect(await selectedLabel(filter)).toBe(unit.title);
});
