import { expect } from '@playwright/test';
import { getRoute, PageTypePortfolio } from '@self/utils';
import fs from 'node:fs';
import * as R from 'remeda';
import { test } from '../../api/api-fixtures';
const SAVE_PATH = './downloads/expenses.csv';

test.use({
	userRoleType: 'PORTFOLIO',
	expensesParams: R.times(100, () => ({
		amount: 100,
	})),
});

test('can export csv from expenses table', async ({
	scopedPage: page,
	org,
	portfolio,
	expenses,
}) => {
	const url = getRoute({
		entity: 'portfolio',
		id: portfolio.id,
		pageType: PageTypePortfolio.Expenses,
		params: { organizationId: org.organization.id, portfolioId: portfolio.id },
	});

	await page.goto(url);

	await page.getByRole('link', { name: 'Table' }).click();

	await page.getByRole('button', { name: 'Options' }).click();

	const [download] = await Promise.all([
		page.waitForEvent('download'),
		page.getByRole('link', { name: 'Export to CSV' }).click(),
	]);

	await download.saveAs(SAVE_PATH);
	const csv = fs.readFileSync(SAVE_PATH, 'utf8');

	expect.soft(csv).not.toBe('');

	expect(csv).toContain(
		'id,unitId,createdAt,updatedAt,amount,postAt,organizationId,portfolioId',
	);

	expect(csv).toContain(expenses[0].id);
	expect(csv).toContain(expenses[99].id);
});
