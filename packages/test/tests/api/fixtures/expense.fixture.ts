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
};
