import { expect } from '@playwright/test';
import { sample } from '@self/seed';
import { test } from '../../../config';
import { entitiesMap } from '@self/utils';

const portfolio = sample.portfolios[0];
const property = sample.properties[0];
// const updatedArea = 'حولي';

test('area is preselected', async ({ page }) => {
	await page.goto(`/${entitiesMap.property.urlName}/${property.id}/edit`);
	const el = page.locator('#area');
	const re = new RegExp(`${property.area}`);
	await expect(el).toHaveValue(re);
	await expect(el).toHaveAttribute('data-value', property.area);
});

test('portfolio is preselected', async ({ page }) => {
	await page.goto(
		`/${entitiesMap.property.urlName}/new?portfolioId=${portfolio.id}`,
	);
	const el = page.locator('#portfolioId');
	await expect(el).toHaveValue(portfolio.label);
	await expect(el).toHaveAttribute('data-value', portfolio.id);
});

test('create property button has predefined params', async ({ page }) => {
	await page.goto(`/${entitiesMap.portfolio.urlName}/${portfolio.id}`);
	const el = page.locator('text=Create new property');
	await expect(el).toHaveAttribute(
		'href',
		`/${entitiesMap.property.urlName}/new?portfolioId=${portfolio.id}`,
	);
});
