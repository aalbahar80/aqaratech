import { expect } from '@playwright/test';

import { PageTypePortfolio } from '@self/utils';

import { test } from './fixture';

// TODO: screenshot charts separately

test.describe('income page', () => {
	test.use({ tab: PageTypePortfolio.Income });

	test('looks the same', async ({ page }) => {
		await expect(page).toHaveScreenshot({
			fullPage: true,
		});
	});
});

test.describe('expense page', () => {
	test.use({ tab: PageTypePortfolio.Expenses });

	test('looks the same', async ({ page }) => {
		await expect(page).toHaveScreenshot({
			fullPage: true,
		});
	});
});
