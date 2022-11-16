import { expect } from '@playwright/test';
import { getRoute, PageType } from '@self/utils';
import { resolveURL } from 'ufo';
import { test } from '../../api/api-fixtures';

test('create expense for unit button predefined params', async ({
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

	const btn = page.getByRole('link', { name: 'Create expense' });

	await expect(btn).toHaveAttribute(
		'href',
		resolveURL(
			'/organizations',
			unit.organizationId,
			'portfolios',
			unit.portfolioId,
			'expenses',
			'new',
			`?unitId=${unit.id}`,
		),
	);
});

test('create expense for property button predefined params', async ({
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

	const btn = page.getByRole('link', { name: 'Create expense' });

	await expect(btn).toHaveAttribute(
		'href',
		resolveURL(
			'/organizations',
			property.organizationId,
			'portfolios',
			property.portfolioId,
			'expenses',
			'new',
			`?propertyId=${property.id}`,
		),
	);
});
