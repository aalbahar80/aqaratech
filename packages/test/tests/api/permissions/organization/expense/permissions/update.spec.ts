import { randomUUID } from 'crypto';

import { expect } from '@playwright/test';
import * as R from 'remeda';

import { expenseFactory, sample } from '@self/seed';

import { test } from '../../../../api-fixtures';

const newExpense = R.pick(
	expenseFactory.build({
		organizationId: '',
		portfolioId: '',
		propertyId: '',
	}),
	['amount', 'postAt', 'memo'],
);

test('can update expense in own org', async ({ request, expense }) => {
	const res = await request.patch(`/expenses/${expense.id}`, {
		data: newExpense,
	});

	expect(res.status()).toBe(200);
});

test('cannot update expense in another org', async ({ request, org: _org }) => {
	const res = await request.patch(`/expenses/${sample.expenses[0].id}`, {
		data: newExpense,
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});

test('cannot update non-existing expense', async ({ request }) => {
	const res = await request.patch(`/expenses/${randomUUID()}`, {
		data: newExpense,
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});
