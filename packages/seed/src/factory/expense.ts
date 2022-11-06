import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';
import { randomUUID } from 'node:crypto';
import { generateExpenseCategoryTree } from '../constants';
import type { Expense } from '../utils/date-or-string';
import { createdAt, updatedAt } from '../utils/dates';
import { fakeDate } from '../utils/fake-date';

export const expenseFactory = Factory.Sync.makeFactoryWithRequired<
	Expense,
	'organizationId' | 'portfolioId'
>({
	id: Factory.each(() => randomUUID()),
	createdAt: Factory.each(() => createdAt()),
	updatedAt: Factory.each(() => updatedAt()),

	amount: Factory.each(() => +faker.finance.amount(10, 250, 0)),

	categoryId: Factory.each(
		() =>
			faker.helpers.arrayElement(
				generateExpenseCategoryTree().filter((c) => !c.isGroup),
			).id,
	),

	memo: Factory.each(() => faker.lorem.sentence()),

	postAt: Factory.each(() => fakeDate()),

	maintenanceOrderId: null,

	propertyId: null,

	unitId: null,
});

export type ExpenseFactoryParams = Partial<
	Parameters<typeof expenseFactory.build>[0]
>;
