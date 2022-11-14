import { expect } from '@playwright/test';
import { withQuery } from 'ufo';
import { test } from '../../api/api-fixtures';

test('unitType is preselected', async ({ page, unit }) => {
	await page.goto(`/units/${unit.id}/edit`);

	const el = page.locator('#type');

	if (!unit.type) {
		throw new Error('unit.type is not defined');
	}

	await expect(el).toHaveValue(unit.type);
});

test.fixme(
	'create first unit button has predefined params',
	async ({ page, property }) => {
		await page.goto(`/properties/${property.id}`);

		const url = withQuery(`/units/new`, {
			portfolioId: property.portfolioId,
			propertyId: property.id,
		});

		const el = page.getByRole('link', { name: 'New unit' });

		await expect(el).toHaveAttribute('href', url);
	},
);

test.fixme(
	'create unit button has predefined params',
	async ({ page, property, unit }) => {
		unit; // declared for playwright fixture setup

		await page.goto(`/properties/${property.id}`);

		const url = withQuery(`/units/new`, {
			portfolioId: property.portfolioId,
			propertyId: property.id,
		});

		const el = page.getByRole('link', { name: 'Create new unit' });

		await expect(el).toHaveAttribute('href', url);
	},
);
