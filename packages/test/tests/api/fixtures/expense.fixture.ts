import * as R from 'remeda';

import { expenseFactory } from '@self/seed';


import { resCheck } from '../../../utils/res-check';

import { apiURL } from './api-url';

import type { ExpenseDto } from '../../../types/api';
import type { AllFixtures } from './test-fixtures.interface';

export const expenseFixtures: AllFixtures = {
	expensesParams: [undefined, { option: true }],

	expenses: async ({ org, units, request, expensesParams }, use) => {
		const params = expensesParams ?? [{}];

		// Merge any declared params with the default params

		const expenses = R.times(params.length, (n) => {
			const unit = units[n % units.length]!;

			return expenseFactory.build({
				organizationId: org.organization.id,
				portfolioId: unit.portfolioId,
				propertyId: unit.propertyId,
				amount: 1,
				unitId: unit.id,
				...params[n],
			});
		});

		// Insert expenses

		const url = `${apiURL}/organizations/${org.organization.id}/expenses`;

		const created = (await Promise.all(
			expenses.map(async (expense) => {
				const picked = R.pick(expense, [
					'portfolioId',
					'propertyId',
					'unitId',
					'amount',
					'postAt',
				]);

				const res = await request.post(url, { data: picked });
				resCheck(res);

				return (await res.json()) as ExpenseDto;
			}),
		)) as [ExpenseDto, ...ExpenseDto[]];

		await use(created);
	},

	expense: async ({ expenses }, use) => {
		await use(expenses[0]);
	},
};
