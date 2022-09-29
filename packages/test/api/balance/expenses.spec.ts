import { expect } from '@playwright/test';
import { expenseFactory } from '@self/seed';
import * as R from 'remeda';
import type { BalanceDto, CreateExpenseDto } from '../../types/api';
import { test } from '../api-config';

test(`expense amount`, async ({ request, portfolio, expenseCategory }) => {
	const expenses = expenseFactory.buildList(5, {
		portfolioId: portfolio.id,
		organizationId: portfolio.organizationId,
		categoryId: expenseCategory.id,
	});

	const toCreate: CreateExpenseDto[] = expenses.map((e) => {
		const expense = {
			...R.pick(e, [
				'amount',
				'categoryId',
				'portfolioId',
				'organizationId',
				'categoryId',
			]),
			postAt: e.postAt.toISOString(),
		};

		return expense;
	});

	const sum = toCreate.reduce((acc, expense) => acc + expense.amount, 0);

	// send post request for each expense
	await Promise.all(
		expenses.map((expense) => request.post('/expenses', { data: expense })),
	);

	const res = await request.get(`/portfolios/${portfolio.id}/balance`);
	const body = (await res.json()) as BalanceDto;

	expect(body.expenses).toBe(sum);
});
