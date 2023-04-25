import { expect } from '@playwright/test';

import { getRoute, PageTypePortfolio } from '@self/utils';

import { test } from '../../api/api-fixtures';
import { Filters } from '../filter-model';

test.use({
	invoicesParams: [
		{
			postAt: Date.UTC(2030, 0, 1),
			paidAt: Date.UTC(2031, 0, 1),
			isPaid: true,
			amount: 111,
		},
		{
			postAt: Date.UTC(2031, 0, 1),
			paidAt: Date.UTC(2030, 0, 1),
			isPaid: true,
			amount: 222,
		},
	],
});

test('range kind', async ({ page, org, portfolio, invoices: _ }) => {
	const url = getRoute({
		entity: 'portfolio',
		id: portfolio.id,
		pageType: PageTypePortfolio.IncomeTable,
		params: {
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
		},
	});

	await page.goto(url);

	// set end date in the future
	const filters = new Filters(page);
	await filters.end.fill('2030-02-01');

	const postAtFilter = page.getByLabel('Due date');
	const paidAtFilter = page.getByLabel('Paid date');

	const invoice1 = page.getByRole('cell', { name: 'KWD 111' });
	const invoice2 = page.getByRole('cell', { name: 'KWD 222' });

	// paid at
	await paidAtFilter.click();
	await expect(invoice1).toBeHidden();
	await expect(invoice2).toBeVisible();

	// post at
	await postAtFilter.click();
	await expect(invoice1).toBeVisible();
	await expect(invoice2).toBeHidden();
});
