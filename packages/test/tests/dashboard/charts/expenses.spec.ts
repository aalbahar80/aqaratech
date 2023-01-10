import { expect } from '@playwright/test';

import { PageTypePortfolio } from '@self/utils';

import { Filters } from '../filter-model';

import { chartTestPresets } from './filter-presets';
import { test } from './fixture';

// PERF: Perform all tests in the same context/instance

// NOTE: declaring expenses fixture here doesn't seem to work. Needs to be
// declared in fixture.ts (page property)

test.use({ tab: PageTypePortfolio.Expenses });

// for (const [n, filterPreset] of filterPresets.entries()) {
for (const preset of chartTestPresets) {
	test.describe(`expense page - filter - ${preset.name}`, () => {
		// apply filter preset
		test.beforeEach(async ({ page }) => {
			const filters = new Filters(page);

			// Select a property
			await filters.property.el.selectOption({ label: preset.filter.property });
			await page.waitForLoadState('networkidle');

			// Select a unit
			if ('unit' in preset.filter) {
				await filters.unit.el.selectOption({ label: preset.filter.unit });
				await page.waitForLoadState('networkidle');
			}
		});

		test('looks the same', async ({ page }) => {
			await expect(page).toHaveScreenshot({
				fullPage: true,
				// NOTE: Care when setting maxDiffPixelRatio in fullPage screenshots,
				// If necessary, set exact pixel count as low as possible.
			});
		});

		test('expense bar chart', async ({ page }) => {
			const chart = page
				.getByTestId('chart-card')
				.filter({ hasText: 'Expenses: by Month' });

			await expect(chart).toHaveScreenshot({
				maxDiffPixelRatio: 0.01, // firefox fails without this
			});
		});

		test('expense treemap - location', async ({ page }) => {
			const chart = page
				.getByTestId('chart-card')
				.filter({ hasText: 'Expenses: by Location' });

			await expect(chart).toHaveScreenshot();
		});

		// TEST: add treemap - category
	});
}
