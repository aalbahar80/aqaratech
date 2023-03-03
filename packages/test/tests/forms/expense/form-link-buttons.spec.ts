import { expect } from '@playwright/test';
import { resolveURL } from 'ufo';

import { getRoute, PageType } from '@self/utils';

import { test } from '../../api/api-fixtures';
import { IdPage } from '../../models/id-page';

const inputs = [
	{
		entity: 'expense',
		buttonName: 'New Expense',
		urlName: 'expenses',
	},
];

for (const entity of inputs) {
	test(`create ${entity.entity} for unit button predefined params`, async ({
		page,
		unit,
	}) => {
		const url = getRoute({
			entity: 'unit',
			id: unit.id,
			pageType: PageType.Id,
			params: {
				organizationId: unit.organizationId,
				portfolioId: unit.portfolioId,
			},
		});

		await page.goto(url);

		const idPage = new IdPage({ page });

		const btn = page.getByRole('link', { name: entity.buttonName });
		await idPage.expandOptions(btn);

		await expect(btn).toHaveAttribute(
			'href',
			resolveURL(
				'/en',
				'/organizations',
				unit.organizationId,
				'portfolios',
				unit.portfolioId,
				entity.urlName,
				'new',
				`?unitId=${unit.id}`,
			),
		);
	});

	test(`create ${entity.entity} for property button predefined params`, async ({
		page,
		property,
	}) => {
		const url = getRoute({
			entity: 'property',
			id: property.id,
			pageType: PageType.Id,
			params: {
				organizationId: property.organizationId,
				portfolioId: property.portfolioId,
			},
		});

		await page.goto(url);

		const idPage = new IdPage({ page });

		const btn = page.getByRole('link', { name: entity.buttonName });
		await idPage.expandOptions(btn);

		await expect(btn).toHaveAttribute(
			'href',
			resolveURL(
				'/en',
				'/organizations',
				property.organizationId,
				'portfolios',
				property.portfolioId,
				entity.urlName,
				'new',
				`?propertyId=${property.id}`,
			),
		);
	});
}
