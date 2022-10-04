import { expect } from '@playwright/test';
import { expenseFactory } from '@self/seed';
import * as R from 'remeda';
import type { ExpenseDto } from '../../types/api';
import { test } from '../api-fixtures';

test('postAt defaults to midnight UTC', async ({ request, portfolio }) => {
	const expense = expenseFactory.build({
		portfolioId: portfolio.id,
		organizationId: portfolio.organizationId,
		postAt: '2021-01-01',
	});

	const res = await request.post('/expenses', {
		data: R.pick(expense, [
			'organizationId',
			'portfolioId',
			'amount',
			'postAt',
		]),
	});

	const body = (await res.json()) as ExpenseDto;

	// check postAt is midnight UTC
	expect(body.postAt).toBe('2021-01-01T00:00:00.000Z');
});
