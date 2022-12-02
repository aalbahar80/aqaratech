import { expect } from '@playwright/test';
import { expenseFactory } from '@self/seed';
import * as R from 'remeda';
import { test } from '../../../api-fixtures';

test.use({
	expenseCategoryParams: {
		isGroup: false,
	},
});

test('can create expense in leaf node category', async ({
	request,
	org,
	property,
	expenseCategory,
}) => {
	const expense = R.pick(
		expenseFactory.build({
			organizationId: org.organization.id,
			portfolioId: property.portfolioId,
			propertyId: property.id,
			categoryId: expenseCategory.id,
		}),
		['portfolioId', 'propertyId', 'unitId', 'amount', 'postAt'],
	);

	const url = `/organizations/${org.organization.id}/expenses`;

	const res = await request.post(url, { data: expense });

	expect(res.status()).toBe(201);
});

test('can update expense to leaf node category', async ({
	request,
	expenseCategory,
	expense,
}) => {
	const url = `/expenses/${expense.id}`;

	const res = await request.patch(url, {
		data: {
			// ...expense,
			// id: expense.id,
			categoryId: expenseCategory.id,
		},
	});

	expect(res.status()).toBe(200);
});
