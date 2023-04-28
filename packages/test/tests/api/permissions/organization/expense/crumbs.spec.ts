import { expect } from '@playwright/test';

import { test as base } from '../../../api-fixtures';

import type { ExpenseDto } from '../../../../../types/api';

const test = base.extend<{ expenseDto: ExpenseDto }>({
	/** Override the default `maintenanceOrders` fixture to get the
	 * maintenanceOrder with breadcrumbs. */
	expenseDto: async ({ request, expense }, use) => {
		const res = await request.get(`/expenses/${expense.id}`, {
			failOnStatusCode: true,
		});

		const body = (await res.json()) as ExpenseDto;

		await use(body);
	},
});

test.use({ expensesParams: [{ unitId: null }] });

test('expense does not include duplicate breadcrumbs', ({
	expenseDto: expense,
}) => {
	expect.soft(expense).not.toHaveProperty('portfolio');
	expect.soft(expense).not.toHaveProperty('property');
	expect.soft(expense).not.toHaveProperty('unit');

	expect(expense.breadcrumbs).toHaveProperty('portfolio');
});

test('expense has breadcrumbs - portfolio', ({ expenseDto: expense }) => {
	expect(expense.breadcrumbs).toHaveProperty('portfolio');
	expect(expense.breadcrumbs.portfolio).toHaveProperty('id');
	expect(expense.breadcrumbs.portfolio).toHaveProperty('label');
});

test('expense has breadcrumbs - property', ({ expenseDto: expense }) => {
	expect(expense.breadcrumbs).toHaveProperty('property');
	expect(expense.breadcrumbs.property).toHaveProperty('id');
	expect(expense.breadcrumbs.property).toHaveProperty('label');
});
