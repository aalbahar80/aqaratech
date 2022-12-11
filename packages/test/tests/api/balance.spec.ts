import { expect } from '@playwright/test';

import { sample } from '@self/seed';

import { test } from './api-fixtures';

import type { BalanceDto } from '../../types/api';

const portfolio = sample.portfolios[0];
const leaseInvoices = sample.leaseInvoices;
const expenses = sample.expenses;
const payouts = sample.payouts;

// TODO: other tests that add data will cause this test to fail
test.skip(`balance`, async ({ request }) => {
	const res = await request.get(`/portfolios/${portfolio.id}/balance`);

	await expect(res).toBeOK();
	const sums = {
		leaseInvoices: leaseInvoices
			.filter((i) => i.isPaid)
			.reduce((acc, cur) => acc + cur.amount, 0),
		expenses: expenses.reduce((acc, cur) => acc + cur.amount, 0),
		payouts: payouts.reduce((acc, cur) => acc + cur.amount, 0),
	};

	const body = (await res.json()) as BalanceDto;

	expect.soft(body.leaseInvoices).toBe(sums.leaseInvoices);

	expect.soft(body.expenses).toBe(sums.expenses);

	expect.soft(body.payouts).toBe(sums.payouts);

	expect
		.soft(body.total)
		.toBe(sums.leaseInvoices - sums.expenses - sums.payouts);
});
