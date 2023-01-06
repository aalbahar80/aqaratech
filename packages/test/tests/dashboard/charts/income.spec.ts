import { expect } from '@playwright/test';

import { PageTypePortfolio } from '@self/utils';

import { test } from './fixture';

// PERF: Perform all tests in the same context/instance

// NOTE: declaring invoices fixture here doesn't seem to work. Needs to be
// declared in fixture.ts (page property)

test.use({ tab: PageTypePortfolio.Income });

test.describe('income page', () => {
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

		await expect(chart).toHaveScreenshot({
			maxDiffPixelRatio: 0.01, // firefox fails without this
		});
	});
});
