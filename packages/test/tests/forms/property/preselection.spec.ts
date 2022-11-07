import { expect } from '@playwright/test';
import { entitiesMap } from '@self/utils';
import { test } from '../../api/api-fixtures';

// const updatedArea = 'حولي';

test('area is preselected', async ({ page, property }) => {
	await page.goto(`/${entitiesMap.property.urlName}/${property.id}/edit`);

	const el = page.locator('#area');

	if (!property.area) {
		throw new Error('property.area is not defined');
	}

	const re = new RegExp(`${property.area}`);

	await expect(el).toHaveValue(re);

	await expect(el).toHaveAttribute('data-value', property.area);
});

test('portfolio is preselected', async ({ page, portfolio }) => {
	await page.goto(
		`/${entitiesMap.property.urlName}/new?portfolioId=${portfolio.id}`,
	);

	const el = page.locator('#portfolioId');

	await expect(el).toHaveValue(portfolio.label ?? '');

	await expect(el).toHaveAttribute('data-value', portfolio.id);
});

test.fixme(
	'create property button has predefined params',
	async ({ page, portfolio }) => {
		await page.goto(`/${entitiesMap.portfolio.urlName}/${portfolio.id}`);

		const el = page.locator('a', {
			has: page.locator('text=New property'),
		});

		await expect(el).toHaveAttribute(
			'href',
			`/${entitiesMap.property.urlName}/new?portfolioId=${portfolio.id}`,
		);
	},
);
