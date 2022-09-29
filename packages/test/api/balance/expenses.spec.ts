import { expect } from '@playwright/test';
import { expenseFactory } from '@self/seed';
import * as R from 'remeda';
import type { BalanceDto, CreateExpenseDto } from '../../types/api';
import { test } from '../api-config';

test(`expense amount`, async ({ request, portfolio, expenseCategory }) => {
	const expenses = expenseFactory.buildList(2, {
		portfolioId: portfolio.id,
		organizationId: portfolio.organizationId,
		categoryId: expenseCategory.id,
	});

	const sum = expenses.reduce((acc, expense) => acc + expense.amount, 0);

	// send post request for each expense
	await Promise.all(
		expenses.map((e) => {
			// only submit necessary fields
			const expense: CreateExpenseDto = R.pick(e, [
				'amount',
				'categoryId',
				'portfolioId',
				'organizationId',
				'categoryId',
				'postAt',
			]);

			return request.post('/expenses', { data: expense });
		}),
	);

	const res = await request.get(`/portfolios/${portfolio.id}/balance`);
	const body = (await res.json()) as BalanceDto;

	expect(body.expenses).toBe(sum);
});
