import { expect } from '@playwright/test';
import { resolveURL } from 'ufo';

import { getRoute, PageType } from '@self/utils';

import { test } from '../../api/api-fixtures';

const BUTTON_LABEL = 'Create maintenance order';

test('create maintenanceOrder for unit button predefined params', async ({
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

	await page.getByRole('button', { name: 'Open options' }).click();

	const btn = page.getByRole('link', { name: BUTTON_LABEL });

	await expect(btn).toHaveAttribute(
		'href',
		resolveURL(
			'/organizations',
			unit.organizationId,
			'portfolios',
			unit.portfolioId,
			'maintenance-orders',
			'new',
			`?unitId=${unit.id}`,
		),
	);
});

test('create maintenanceOrder for property button predefined params', async ({
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

	await page.getByRole('button', { name: 'Open options' }).click();

	const btn = page.getByRole('link', { name: BUTTON_LABEL });

	await expect(btn).toHaveAttribute(
		'href',
		resolveURL(
			'/organizations',
			property.organizationId,
			'portfolios',
			property.portfolioId,
			'maintenance-orders',
			'new',
			`?propertyId=${property.id}`,
		),
	);
});
