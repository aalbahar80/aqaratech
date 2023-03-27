import * as R from 'remeda';

import { expenseFactory } from '@self/seed';

import { prisma } from '../../../prisma';

import type { AllFixtures } from './test-fixtures.interface';
import type { Expense } from '@prisma/client';

export const expenseFixtures: AllFixtures = {
	expensesParams: [undefined, { option: true }],

	expenses: async ({ org, units, expensesParams }, use) => {
		const params = expensesParams ?? [{}];

		// Merge any declared params with the default params

		const expenses = R.times(params.length, (n) => {
			const unit = units[n % units.length]!;

			const data = expenseFactory.build({
				organizationId: org.organization.id,
				portfolioId: unit.portfolioId,
				propertyId: unit.propertyId,
				amount: 1,
				unitId: unit.id,
				...params[n],
			});

			// turn the date into a iso string
			data.postAt &&= new Date(data.postAt).toISOString();

			return data;
		});

		// Insert expenses

		await prisma.expense.createMany({
			// @ts-expect-error prisma lacks support for exactOptionalPropertyTypes
			data: expenses.map((e) => ({
				organizationId: e.organizationId,
				portfolioId: e.portfolioId,
				propertyId: e.propertyId ?? undefined,
				unitId: e.unitId,
				amount: e.amount,
				postAt: e.postAt,
			})),
		});

		const created = await prisma.expense.findMany({
			where: {
				organizationId: org.organization.id,
			},
		});

		await use(created as [Expense, ...Expense[]]);
	},

	expense: async ({ expenses }, use) => {
		await use(expenses[0]);
	},
};
