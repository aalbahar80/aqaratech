import { expect } from '@playwright/test';
import { entitiesMap, getRoute, PageTab, PageType } from '@self/utils';
import { resolveURL } from 'ufo';
import { test } from '../../api/api-fixtures';

test.fixme('renew lease button has predefined params', async ({ page }) => {
	await page.goto(`/${entitiesMap.lease.urlName}/${lease.id}`);
	const el = page.locator('text=Renew');
	await expect(el).toHaveAttribute(
		'href',
		`/${entitiesMap.lease.urlName}/new?tenantId=${lease.tenantId}&portfolioId=${lease.portfolioId}&propertyId=${unit.propertyId}&unitId=${lease.unitId}`,
	);
});

test('create lease button predefined params', async ({ page, unit }) => {
	const url = getRoute({
		entity: 'unit',
		id: unit.id,
		pageType: PageTab.Leases,
		params: {
			organizationId: unit.organizationId,
			portfolioId: unit.portfolioId,
		},
	});

	await page.goto(url);

	const btn = page.getByRole('link', { name: '+ New' });

	await expect(btn).toHaveAttribute(
		'href',
		resolveURL(
			'/organizations',
			unit.organizationId,
			'portfolios',
			unit.portfolioId,
			'leases',
			'new',
			`?unitId=${unit.id}`,
		),
	);
});

test('create unit button predefined params', async ({ page, property }) => {
	const url = getRoute({
		entity: 'property',
		id: property.id,
		pageType: PageTab.Units,
		params: {
			organizationId: property.organizationId,
			portfolioId: property.portfolioId,
		},
	});

	await page.goto(url);

	const btn = page.getByRole('link', { name: '+ New' });

	await expect(btn).toHaveAttribute(
		'href',
		resolveURL(
			'/organizations',
			property.organizationId,
			'portfolios',
			property.portfolioId,
			'units',
			'new',
			`?propertyId=${property.id}`,
		),
	);
});

test('create property button links to form', async ({ page, portfolio }) => {
	const url = getRoute({
		entity: 'portfolio',
		id: portfolio.id,
		pageType: PageTab.Properties,
		params: {
			organizationId: portfolio.organizationId,
		},
	});

	await page.goto(url);

	const btn = page.getByRole('link', { name: '+ New' });

	await expect(btn).toHaveAttribute(
		'href',
		resolveURL(
			'/organizations',
			portfolio.organizationId,
			'portfolios',
			portfolio.id,
			'properties',
			'new',
		),
	);
});

test('create portfolio button links to form', async ({ page, org }) => {
	const url = getRoute({
		entity: 'portfolio',
		pageType: PageType.List,
		params: {
			organizationId: org.organization.id,
		},
	});

	await page.goto(url);

	const btn = page.getByRole('link', { name: '+ New' });

	await expect(btn).toHaveAttribute(
		'href',
		resolveURL('/organizations', org.organization.id, 'portfolios', 'new'),
	);
});
