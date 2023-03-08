import { expenseCategoryFactory } from '@self/seed';

import { prisma } from '../../../prisma';

import type { AllFixtures } from './test-fixtures.interface';

export const expenseCategoryFixtures: AllFixtures = {
	expenseCategoryParams: [undefined, { option: true }],

	expenseCategory: async ({ org, expenseCategoryParams }, use) => {
		const expenseCategory = expenseCategoryFactory.build(expenseCategoryParams);

		await prisma.organizationSettings.update({
			where: { organizationId: org.organization.id },
			data: {
				expenseCategoryTree: [expenseCategory],
			},
		});

		await use(expenseCategory);
	},
};
