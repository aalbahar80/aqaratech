import { expect } from '@playwright/test';
import { resolveURL } from 'ufo';

import { getRoute, PageTab, PageType } from '@self/utils';

import { test } from '../api/api-fixtures';

test('create invoices-multiple button predefined params', async ({
	page,
	lease,
}) => {
	const url = getRoute({
		entity: 'leaseInvoice',
		pageType: PageType.New,
		predefined: { leaseId: lease.id },
		params: {
			organizationId: lease.organizationId,
			portfolioId: lease.portfolioId,
		},
	});

	await page.goto(url);

	const btn = page.getByRole('link', { name: 'Add multiple invoices' });

	await expect(btn).toHaveAttribute(
		'href',
		resolveURL(
			'/organizations',
			lease.organizationId,
			'portfolios',
			lease.portfolioId,
			'leaseInvoices',
			'new-multiple',
			`?leaseId=${lease.id}`,
		),
	);
});

test('create invoice button predefined params', async ({ page, lease }) => {
	const url = getRoute({
		entity: 'lease',
		id: lease.id,
		pageType: PageTab.Invoices,
		params: {
			organizationId: lease.organizationId,
			portfolioId: lease.portfolioId,
		},
	});

	await page.goto(url);

	const btn = page.getByRole('link', { name: 'New' });

	await expect(btn).toHaveAttribute(
		'href',
		resolveURL(
			'/organizations',
			lease.organizationId,
			'portfolios',
			lease.portfolioId,
			'leaseInvoices',
			'new',
			`?leaseId=${lease.id}`,
		),
	);
});

test('renew lease button predefined params', async ({ page, lease }) => {
	const url = getRoute({
		entity: 'lease',
		id: lease.id,
		pageType: PageType.Id,
		params: {
			organizationId: lease.organizationId,
			portfolioId: lease.portfolioId,
		},
	});

	await page.goto(url);

	const btn = page.getByRole('link', { name: 'Renew' });

	await expect(btn).toHaveAttribute(
		'href',
		resolveURL(
			'/organizations',
			lease.organizationId,
			'portfolios',
			lease.portfolioId,
			'leases',
			'new',
			`?unitId=${lease.unitId}&leaseId=${lease.id}`,
		),
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

	const btn = page.getByRole('link', { name: 'New' });

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

	const btn = page.getByRole('link', { name: 'New' });

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

	const btn = page.getByRole('link', { name: 'New' });

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

	const btn = page.getByRole('link', { name: 'New' });

	await expect(btn).toHaveAttribute(
		'href',
		resolveURL('/organizations', org.organization.id, 'portfolios', 'new'),
	);
});
