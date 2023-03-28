import { expect } from '@playwright/test';

import { getRoute, PageTypePortfolio } from '@self/utils';

import { test } from '../api/api-fixtures';

test.use({
	portfoliosParams: [{ fullName: 'Portfolio 1' }, { fullName: 'Portfolio 2' }],
});

test.describe('portfolio switcher', () => {
	test.beforeEach(async ({ page, org, portfolios }) => {
		const url = getRoute({
			entity: 'portfolio',
			id: portfolios[1]!.id,
			pageType: PageTypePortfolio.Income,
			params: { organizationId: org.organization.id },
		});

		await page.goto(url);
	});

	test('correct label is set by default', async ({ page }) => {
		const input = page.getByRole('combobox', { name: 'Portfolio' });

		const value = await input.inputValue();

		expect(value).toBe('Portfolio 2');
	});

	test('redirects to selected portfolio', async ({ page, portfolios }) => {
		const input = page.getByRole('combobox', { name: 'Portfolio' });

		await input.fill('Portfolio 1');

		const option = page.getByRole('option', { name: 'Portfolio 1' });

		await option.click();

		const url = getRoute({
			entity: 'portfolio',
			id: portfolios[0]!.id,
			pageType: PageTypePortfolio.Income,
			params: { organizationId: portfolios[0]!.organizationId },
		});

		await expect(page).toHaveURL(url);

		expect(await input.inputValue()).toBe('Portfolio 1');
	});

	test('no duplicate portfolios in dropdown', async ({ page }) => {
		const input = page.getByRole('combobox', { name: 'Portfolio' });

		await input.fill('Portfolio');

		const options = page.getByRole('option', {
			name: 'Portfolio',
		});

		await expect(options).toHaveCount(2);

		await expect(options).toHaveText(['Portfolio 1', 'Portfolio 2']);
	});
});
