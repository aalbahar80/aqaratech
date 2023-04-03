import { expect } from '@playwright/test';

import { getRoute, PageTab } from '@self/utils';

import { test } from '../api/api-fixtures';

test.setTimeout(10000);

test.describe('inferred unit labels', () => {
	test.use({
		actionTimeout: 3000,
		unitsParams: [
			{ type: 'Apartment', unitNumber: '5' },
			{ type: 'Apartment', unitNumber: '10' },
			{ type: 'Condo', unitNumber: '2' },
		],
	});

	test('sorted accurately', async ({ page, property, units: _ }) => {
		const url = getRoute({
			entity: 'property',
			pageType: PageTab.Units,
			id: property.id,
			params: {
				organizationId: property.organizationId,
				portfolioId: property.portfolioId,
			},
		});

		await page.goto(url);

		// sort by label
		const label = page.getByText('Label');
		await label.click();

		// expect sorted by label

		// prettier-ignore
		await expect(page.getByRole('row').nth(1).getByText('Apartment 5')).toBeVisible();
		// prettier-ignore
		await expect(page.getByRole('row').nth(2).getByText('Apartment 10')).toBeVisible();
		// prettier-ignore
		await expect(page.getByRole('row').nth(3).getByText('Condo 2')).toBeVisible();
	});
});

test.describe('custom labels', () => {
	test.use({
		actionTimeout: 3000,
		unitsParams: [
			{ label: 'Apartment 5', unitNumber: '5' },
			{ label: 'Apartment 10', unitNumber: '10' },
			{ label: 'Condo 2', unitNumber: '2' },
		],
	});

	test('sorted accurately', async ({ page, property, units: _ }) => {
		const url = getRoute({
			entity: 'property',
			pageType: PageTab.Units,
			id: property.id,
			params: {
				organizationId: property.organizationId,
				portfolioId: property.portfolioId,
			},
		});

		await page.goto(url);

		// sort by label
		const label = page.getByText('Label');
		await label.click();

		// expect sorted by label

		// prettier-ignore
		await expect(page.getByRole('row').nth(1).getByText('Apartment 5')).toBeVisible();
		// prettier-ignore
		await expect(page.getByRole('row').nth(2).getByText('Apartment 10')).toBeVisible();
		// prettier-ignore
		await expect(page.getByRole('row').nth(3).getByText('Condo 2')).toBeVisible();
	});
});

test.describe('mixed labels', () => {
	test.use({
		actionTimeout: 3000,
		unitsParams: [
			{ type: 'Apartment', unitNumber: '5' },
			{ label: 'Apartment 5', unitNumber: '5' },
			{ type: 'Apartment', unitNumber: '10' },
			{ label: 'Apartment 10', unitNumber: '10' },
			{ type: 'Condo', unitNumber: '2' },
			{ label: 'Condo 2', unitNumber: '2' },
		],
	});

	test('sorted accurately', async ({ page, property, units: _ }) => {
		const url = getRoute({
			entity: 'property',
			pageType: PageTab.Units,
			id: property.id,
			params: {
				organizationId: property.organizationId,
				portfolioId: property.portfolioId,
			},
		});

		await page.goto(url);

		// sort by label
		const label = page.getByText('Label');
		await label.click();

		// expect sorted by label

		// prettier-ignore
		await expect(page.getByRole('row').nth(1).getByText('Apartment 5')).toBeVisible();
		// prettier-ignore
		await expect(page.getByRole('row').nth(2).getByText('Apartment 5')).toBeVisible();
		// prettier-ignore
		await expect(page.getByRole('row').nth(3).getByText('Apartment 10')).toBeVisible();
		// prettier-ignore
		await expect(page.getByRole('row').nth(4).getByText('Apartment 10')).toBeVisible();
		// prettier-ignore
		await expect(page.getByRole('row').nth(5).getByText('Condo 2')).toBeVisible();
		// prettier-ignore
		await expect(page.getByRole('row').nth(6).getByText('Condo 2')).toBeVisible();
	});
});
