import { expect } from '@playwright/test';
import { getRoute, PageTypePortfolio } from '@self/utils';
import fs from 'node:fs';
import path from 'node:path';
import * as R from 'remeda';
import { test } from '../../api/api-fixtures';

// const SAVE_PATH = './downloads/expenses.csv';
const SAVE_PATH = path.resolve(__dirname, '../../../downloads/expenses.csv');

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
		pageType: PageTypePortfolio.ExpensesTable,
		params: { organizationId: org.organization.id, portfolioId: portfolio.id },
	});

	await page.goto(url);

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

	const ids = expenses.map((expense) => expense.id);

	for (const id of ids) {
		expect(csv).toContain(id);
	}
});
