import { expect } from '@playwright/test';

import { test } from './api-fixtures';

import type { BalanceDto } from '../../types/api';

test.use({
	invoicesParams: [
		{ amount: 10, isPaid: false },
		{ amount: 20, isPaid: true },
		{ amount: 30, isPaid: true },
	],
	expensesParams: [{ amount: 15 }, { amount: 25 }, { amount: 35 }],
	payoutsParams: [{ amount: 7 }, { amount: 17 }, { amount: 27 }],
});

test(`balance`, async ({
	request,
	portfolio,
	invoices: _invoices,
	expenses: _expenses,
	payouts: _payouts,
}) => {
	const res = await request.get(`/portfolios/${portfolio.id}/balance`);

	await expect(res).toBeOK();

	const sums = {
		leaseInvoices: 50,
		expenses: 75,
		payouts: 51,
		total: 50 - 75 - 51,
	};

	const body = (await res.json()) as BalanceDto;

	expect.soft(body.leaseInvoices).toBe(sums.leaseInvoices);

	expect.soft(body.expenses).toBe(sums.expenses);

	expect.soft(body.payouts).toBe(sums.payouts);

	expect.soft(body.total).toBe(sums.total);
});
