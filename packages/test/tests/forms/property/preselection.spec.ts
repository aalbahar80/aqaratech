import { expect } from '@playwright/test';
import { entitiesMap, getLabel, getRoute, PageType } from '@self/utils';
import { test } from '../../api/api-fixtures';

// const updatedArea = 'حولي';

test('area is preselected', async ({ page, property }) => {
	const url = getRoute({
		entity: 'property',
		pageType: PageType.Edit,
		id: property.id,
		params: {
			organizationId: property.organizationId,
			portfolioId: property.portfolioId,
		},
	});

	await page.goto(url);

	const el = page.getByLabel(getLabel('area'));

	if (!property.area) {
		throw new Error('property.area is not defined');
	}

	const re = new RegExp(`${property.area}`);

	await expect(el).toHaveValue(re);

	await expect(el).toHaveAttribute('data-value', property.area);
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
