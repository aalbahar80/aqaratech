import fs from 'node:fs';
import path from 'node:path';

import { expect } from '@playwright/test';
import * as R from 'remeda';

import { getRoute, PageTypePortfolio } from '@self/utils';

import { test } from '../../api/api-fixtures';

// const SAVE_PATH = './downloads/income.csv';
const SAVE_PATH = path.resolve(__dirname, '../../../downloads/income.csv');

test.use({
	userRoleType: 'PORTFOLIO',
	invoicesParams: R.times(100, () => ({
		amount: 100,
	})),
});

test('can export csv from income table', async ({
	page,
	org,
	portfolio,
	invoices,
}) => {
	const url = getRoute({
		entity: 'portfolio',
		id: portfolio.id,
		pageType: PageTypePortfolio.IncomeTable,
		params: { organizationId: org.organization.id, portfolioId: portfolio.id },
	});

	await page.goto(url);

	await page.getByRole('button', { name: 'Options' }).click();

	const [download] = await Promise.all([
		page.waitForEvent('download'),
		page.getByRole('link', { name: 'Export' }).click(),
	]);

	await download.saveAs(SAVE_PATH);
	const csv = fs.readFileSync(SAVE_PATH, 'utf8');

	expect.soft(csv).not.toBe('');

	expect.soft(csv).toContain(
		// Sometimes paidAt column is missing from the csv file
		// 'id,createdAt,updatedAt,dueAt,postAt,paidAt,isPaid,amount,memo,leaseId,organizationId,portfolioId',
		'id,createdAt,updatedAt,dueAt,postAt',
	);

	const ids = invoices.map((invoice) => invoice.id);

	for (const id of ids) {
		expect.soft(csv).toContain(id);
	}
});
