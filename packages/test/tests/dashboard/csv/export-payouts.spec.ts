import fs from 'node:fs';
import path from 'node:path';

import { expect } from '@playwright/test';
import * as R from 'remeda';

import { getRoute, PageTypePortfolio } from '@self/utils';

import { test } from '../../api/api-fixtures';

// const SAVE_PATH = './downloads/payout.csv';
const SAVE_PATH = path.resolve(__dirname, '../../../downloads/payouts.csv');

test.use({
	userRoleType: 'PORTFOLIO',
	payoutsParams: R.times(100, () => ({
		amount: 100,
	})),
});

test('can export csv from payout table', async ({
	scopedPage: page,
	org,
	portfolio,
	payouts,
}) => {
	const url = getRoute({
		entity: 'portfolio',
		id: portfolio.id,
		pageType: PageTypePortfolio.PayoutsTable,
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

	expect.soft(csv).toContain('id,createdAt,updatedAt,amount,postAt,memo');

	const ids = payouts.map((payout) => payout.id);

	for (const id of ids) {
		expect.soft(csv).toContain(id);
	}
});
