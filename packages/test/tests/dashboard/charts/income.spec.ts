import { expect } from '@playwright/test';

import { PageTypePortfolio } from '@self/utils';

import { chartText, navbar, sidebar } from '../../../locators/common';
import { Filters } from '../filter-model';

import { chartTestPresets } from './filter-presets';
import { fixtureParams, invoicesParams, test } from './fixture';

// PERF: Perform all tests in the same context/instance

test.describe.configure({ mode: 'parallel' });

const incomeChartTestPresets = chartTestPresets.filter(
	// Unspecified Property doesn't exist in income page
	(n) => n.name !== 'Unspecified Property',
);

for (const preset of incomeChartTestPresets) {
	test.describe(`income page - filter - ${preset.name}`, () => {
		test.use({
			tab: PageTypePortfolio.Income,
			...fixtureParams,
			invoicesParams,
		});

		// apply filter preset
		test.beforeEach(async ({ page }) => {
			const filters = new Filters(page);

			// Select a property
			await filters.property.el.selectOption({ label: preset.filter.property });

			// Select a unit
			if ('unit' in preset.filter) {
				await filters.unit.el.selectOption({ label: preset.filter.unit });
			}
		});

		test('looks the same', async ({ page }) => {
			await expect.soft(page).toHaveScreenshot({
				fullPage: true,
				mask: [
					page.getByText('version: '),
					navbar(page),
					sidebar(page),
					...chartText(page),
				],
				// maxDiffPixelRatio: 0.01,
			});

			const pieChart = page
				.getByTestId('chart-card')
				.filter({ hasText: 'Income: by Payment Status' });

			await expect.soft(pieChart).toHaveScreenshot({
				mask: [navbar(page), sidebar(page), ...chartText(page)],
			});

			const barChart = page
				.getByTestId('chart-card')
				.filter({ hasText: 'Income: by Month' });

			await expect.soft(barChart).toHaveScreenshot({
				maxDiffPixelRatio: 0.01, // firefox fails without this
				mask: [navbar(page), sidebar(page), ...chartText(page)],
			});
		});
	});
}
