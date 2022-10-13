import { expect } from '@playwright/test';
import { withQuery } from 'ufo';
import { test } from '../../api/api-fixtures';

test('portfolio is preselected', async ({ page, portfolio, unit }) => {
	const url = withQuery(`/units/new`, {
		portfolioId: unit.portfolioId,
		propertyId: unit.propertyId,
	});

	await page.goto(url);

	const el = page.locator('#portfolioId');

	await expect(el).toHaveValue(portfolio.fullName);

	await expect(el).toHaveAttribute('data-value', unit.portfolioId);
});

test('property is preselected', async ({ page, property, unit }) => {
	const url = withQuery(`/units/new`, {
		portfolioId: unit.portfolioId,
		propertyId: unit.propertyId,
	});

	await page.goto(url);

	const el = page.locator('#propertyId');

	if (!property.area) {
		throw new Error('property.area is not defined');
	}

	const re = new RegExp(`${property.area}`);

	await expect(el).toHaveValue(re);

	await expect(el).toHaveAttribute('data-value', property.id);
});

test('unitType is preselected', async ({ page, unit }) => {
	await page.goto(`/units/${unit.id}/edit`);

	const el = page.locator('#type');

	if (!unit.type) {
		throw new Error('unit.type is not defined');
	}

	await expect(el).toHaveValue(unit.type);
});

test('create first unit button has predefined params', async ({
	page,
	property,
}) => {
	await page.goto(`/properties/${property.id}`);

	const url = withQuery(`/units/new`, {
		portfolioId: property.portfolioId,
		propertyId: property.id,
	});

	const el = page.getByRole('link', { name: 'New unit' });

	await expect(el).toHaveAttribute('href', url);
});

test('create unit button has predefined params', async ({
	page,
	property,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	unit: _unit,
}) => {
	await page.goto(`/properties/${property.id}`);

	const url = withQuery(`/units/new`, {
		portfolioId: property.portfolioId,
		propertyId: property.id,
	});

	const el = page.getByRole('link', { name: 'Create new unit' });

	await expect(el).toHaveAttribute('href', url);
});
