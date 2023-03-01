import { expect } from '@playwright/test';
import { resolveURL } from 'ufo';

import { getRoute, PageType } from '@self/utils';

import { test } from '../../api/api-fixtures';
import { IdPage } from '../../models/id-page';

const BUTTON_LABEL = 'New Maintenance';

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

	const idPage = new IdPage({ page });

	const btn = page.getByRole('link', { name: BUTTON_LABEL });

	await idPage.expandOptions(btn);

	await expect(btn).toHaveAttribute(
		'href',
		resolveURL(
			'/en',
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

	const idPage = new IdPage({ page });

	const btn = page.getByRole('link', { name: BUTTON_LABEL });

	await idPage.expandOptions(btn);

	await expect(btn).toHaveAttribute(
		'href',
		resolveURL(
			'/en',
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

test.describe('tenant portal', () => {
	test.use({ userRoleType: 'TENANT' });

	test('create maintenanceOrder has predefined params', async ({
		page,
		tenant,
		lease,
	}) => {
		const url = getRoute({
			entity: 'lease',
			pageType: PageType.List,
			params: {
				organizationId: tenant.organizationId,
				tenantId: tenant.id,
			},
		});

		await page.goto(url);

		const btn = page.getByRole('link', { name: 'New Maintenance' });

		await expect(btn).toHaveAttribute(
			'href',
			resolveURL(
				'/en',
				'/organizations',
				tenant.organizationId,
				'portfolios',
				lease.portfolioId,
				'maintenance-orders',
				'new',
			) +
				// ufo tries to encode if there's a `&` in the string
				[`?unitId=${lease.unitId}`, `&tenantId=${tenant.id}`].join(''),
		);
	});
});
