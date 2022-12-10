import { expect } from '@playwright/test';
import * as R from 'remeda';

import { expenseFactory } from '@self/seed';

import { test } from '../api-fixtures';

import type { ExpenseDto } from '../../../types/api';


test('postAt defaults to midnight UTC', async ({ request, portfolio }) => {
	const expense = expenseFactory.build({
		portfolioId: portfolio.id,
		organizationId: portfolio.organizationId,
		postAt: '2021-01-01',
	});

	const url = `/organizations/${portfolio.organizationId}/expenses`;
	const res = await request.post(url, {
		data: R.pick(expense, ['portfolioId', 'amount', 'postAt']),
	});

	const body = (await res.json()) as ExpenseDto;

	// check postAt is midnight UTC
	expect(body.postAt).toBe('2021-01-01T00:00:00.000Z');
});
