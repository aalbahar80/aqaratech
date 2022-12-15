import { expect } from '@playwright/test';

import { resCheck } from '../../../../../utils/res-check';
import { test } from '../../../api-fixtures';

import type { ExpenseDto } from '../../../../../types/api';

test.use({
	expensesParams: [
		{
			unitId: null,
		},
	],

	/**
	 * Override the default `expenses` fixture to get the expense with breadcrumbs.
	 */
	expense: async ({ request, expense }, use) => {
		const res = await request.get(`/expenses/${expense.id}`);
		resCheck(res);

		const body = (await res.json()) as ExpenseDto;

		await use(body);
	},
});

test('expense does not include duplicate breadcrumbs', ({ expense }) => {
	expect.soft(expense).not.toHaveProperty('portfolio');
	expect.soft(expense).not.toHaveProperty('property');
	expect.soft(expense).not.toHaveProperty('unit');

	expect(expense.breadcrumbs).toHaveProperty('portfolio');
});

test('expense has breadcrumbs - portfolio', ({ expense }) => {
	expect(expense.breadcrumbs).toHaveProperty('portfolio');
	expect(expense.breadcrumbs.portfolio).toHaveProperty('id');
	expect(expense.breadcrumbs.portfolio).toHaveProperty('label');
});

test('expense has breadcrumbs - property', ({ expense }) => {
	expect(expense.breadcrumbs).toHaveProperty('property');
	expect(expense.breadcrumbs.property).toHaveProperty('id');
	expect(expense.breadcrumbs.property).toHaveProperty('label');
});
