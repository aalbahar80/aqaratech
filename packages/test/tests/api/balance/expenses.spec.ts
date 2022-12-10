import { expect } from '@playwright/test';
import * as R from 'remeda';

import { expenseFactory } from '@self/seed';

import { test } from '../api-fixtures';

import type { BalanceDto } from '../../../types/api';


test.use({
	expenseCategoryParams: {
		isGroup: false,
	},
});

test(`expense amount`, async ({ request, portfolio, expenseCategory }) => {
	const expenses = expenseFactory.buildList(2, {
		portfolioId: portfolio.id,
		organizationId: portfolio.organizationId,
		categoryId: expenseCategory.id,
	});

	const sum = expenses.reduce((acc, expense) => acc + expense.amount, 0);

	// send post request for each expense
	const url = `/organizations/${portfolio.organizationId}/expenses`;

	await Promise.all(
		expenses.map(async (e) => {
			// only submit necessary fields
			const expense = R.pick(e, [
				'amount',
				'categoryId',
				'portfolioId',
				'categoryId',
				'postAt',
			]);

			return request.post(url, { data: expense });
		}),
	);

	const res = await request.get(`/portfolios/${portfolio.id}/balance`);
	const body = (await res.json()) as BalanceDto;

	expect(body.expenses).toBe(sum);
});
