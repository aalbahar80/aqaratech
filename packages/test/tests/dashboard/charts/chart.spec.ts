import { expect } from '@playwright/test';

import { PageTypePortfolio } from '@self/utils';

import { test } from './fixture';

// PERF: Perforom all tests in the same context/instance

test.describe('income page', () => {
	test.use({ tab: PageTypePortfolio.Income });

	test('looks the same', async ({ page }) => {
		await expect(page).toHaveScreenshot({
			fullPage: true,
		});
	});

	test('income pie chart', async ({ page }) => {
		const chart = page
			.getByTestId('chart-card')
			.filter({ hasText: 'Income: by Payment Status' });

		await expect(chart).toHaveScreenshot();
	});

	test('income bar chart', async ({ page }) => {
		const chart = page
			.getByTestId('chart-card')
			.filter({ hasText: 'Income: by Month' });

		await expect(chart).toHaveScreenshot();
	});
});

test.describe('expense page', () => {
	test.use({ tab: PageTypePortfolio.Expenses });

	test('looks the same', async ({ page }) => {
		await expect(page).toHaveScreenshot({
			fullPage: true,
		});
	});

	test('expense bar chart', async ({ page }) => {
		const chart = page
			.getByTestId('chart-card')
			.filter({ hasText: 'Expenses: by Month' });

		await expect(chart).toHaveScreenshot();
	});

	test('expense treemap - location', async ({ page }) => {
		const chart = page
			.getByTestId('chart-card')
			.filter({ hasText: 'Expenses: by Location' });

		await expect(chart).toHaveScreenshot();
	});

	// TEST: add treemap - category
});
