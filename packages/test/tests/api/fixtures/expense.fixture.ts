import { expenseFactory } from '@self/seed';
import * as R from 'remeda';
import type { ExpenseDto } from '../../../types/api';
import { apiURL } from './api-url';
import type { AllFixtures } from './test-fixtures.interface';

export const expenseFixtures: AllFixtures = {
	expenseParams: [undefined, { option: true }],

	expense: async ({ org, property, request, expenseParams }, use) => {
		const expense = expenseFactory.build({
			organizationId: org.organization.id,
			portfolioId: property.portfolioId,
			amount: 1,
			...expenseParams,
		});

		const picked = R.pick(expense, [
			'portfolioId',
			'propertyId',
			'unitId',
			'amount',
			'postAt',
		]);

		const url = `${apiURL}/organizations/${org.organization.id}/expenses`;

		const res = await request.post(url, { data: picked });

		const created = (await res.json()) as ExpenseDto;

		await use(created);
	},

	expensesParams: [undefined, { option: true }],

	expenses: async ({ org, property, unit, request, expensesParams }, use) => {
		if (!expensesParams || expensesParams.length === 0) {
			throw new Error('expensesParams must be an array with at least one item');
		}

		// Merge any declared params with the default params

		const expenses = R.times(expensesParams.length, (n) =>
			expenseFactory.build({
				organizationId: org.organization.id,
				portfolioId: property.portfolioId,
				propertyId: property.id,
				amount: 1,
				unitId: unit.id,
				...expensesParams[n],
			}),
		);

		// Insert expenses

		const url = `${apiURL}/organizations/${org.organization.id}/expenses`;

		const created = await Promise.all(
			expenses.map(async (expense) => {
				const picked = R.pick(expense, [
					'portfolioId',
					'propertyId',
					'unitId',
					'amount',
					'postAt',
				]);

				const res = await request.post(url, { data: picked });

				return (await res.json()) as ExpenseDto;
			}),
		);

		await use(created);
	},
};
