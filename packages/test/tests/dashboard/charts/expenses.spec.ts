import { expect } from '@playwright/test';

import { PageTypePortfolio } from '@self/utils';

import { chartText, navbar } from '../../../locators/common';
import { Filters } from '../filter-model';

import { chartTestPresets } from './filter-presets';
import { test } from './fixture';

// PERF: Perform all tests in the same context/instance

// NOTE: declaring expenses fixture here doesn't seem to work. Needs to be
// declared in fixture.ts (page property)

for (const preset of chartTestPresets) {
	test.describe(`expense page - filter - ${preset.name}`, () => {
		test.use({ tab: PageTypePortfolio.Expenses });

		// apply filter preset
		test.beforeEach(async ({ page }) => {
			const filters = new Filters(page);

			// Select a property
			await filters.property.el.selectOption({ label: preset.filter.property });

			// Select a unit
			if ('unit' in preset.filter) {
				await filters.unit.el.selectOption({ label: preset.filter.unit });
			}

			// wait for fresh data
			await page.waitForLoadState('networkidle');
		});

		// Combine screeshot assertions into a single test to improve performance significantly.
		// Otherwise, identical fixtures are created for each test.
		test('looks the same', async ({ page }) => {
			await expect.soft(page).toHaveScreenshot({
				fullPage: true,
				// NOTE: Care when setting maxDiffPixelRatio in fullPage screenshots,
				// If necessary, set exact pixel count as low as possible.
				mask: [page.getByText('version: '), navbar(page), ...chartText(page)],
			});

			const barChart = page
				.getByTestId('chart-card')
				.filter({ hasText: 'Expenses: by Month' });

			await expect.soft(barChart).toHaveScreenshot({
				maxDiffPixelRatio: 0.01, // firefox fails without this
				mask: [navbar(page), ...chartText(page)],
			});

			const locationChart = page
				.getByTestId('chart-card')
				.filter({ hasText: 'Expenses: by Location' });

			await expect.soft(locationChart).toHaveScreenshot({
				mask: [navbar(page), ...chartText(page)],
			});

			const categoryChart = page
				.getByTestId('chart-card')
				.filter({ hasText: 'Expenses: by Category' });

			await expect.soft(categoryChart).toHaveScreenshot({
				mask: [navbar(page), ...chartText(page)],
			});
		});
	});
}
