import { expect } from '@playwright/test';
import { sample } from '@self/seed';
import { entitiesMap } from '@self/utils';
import { test } from '../../config';

const portfolio = sample.portfolios[0];
const property = sample.properties[0];
const unit = sample.units[0];

const params = new URLSearchParams({
	portfolioId: portfolio.id,
	propertyId: property.id,
	unitId: unit.id,
});

const url = `/${entitiesMap.expense.urlName}/new?${params.toString()}`;

test('portfolio is preselected', async ({ page }) => {
	await page.goto(url);
	const el = page.locator('#portfolioId');
	await expect(el).toHaveValue(portfolio.label);
	await expect(el).toHaveAttribute('data-value', portfolio.id);
});

test('property is preselected', async ({ page }) => {
	await page.goto(url);
	const el = page.locator('#propertyId');
	const re = new RegExp(`${property.area}`);
	await expect(el).toHaveValue(re);
	await expect(el).toHaveAttribute('data-value', property.id);
});

test('unit is preselected', async ({ page }) => {
	await page.goto(url);
	const el = page.locator('#unitId');
	const num = new RegExp(`${unit.unitNumber}`);
	const type = new RegExp(`${unit.type}`);
	await expect(el).toHaveValue(type);
	await expect(el).toHaveValue(num);
	await expect(el).toHaveAttribute('data-value', unit.id);
});
