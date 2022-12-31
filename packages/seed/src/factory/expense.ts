import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

import { generateExpenseCategoryTree } from '@self/utils';

import { createdAt, updatedAt } from '../utils/dates';
import { fakeDate } from '../utils/fake-date';

import type { Expense } from '../utils/date-or-string';

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
				generateExpenseCategoryTree(randomUUID).filter((c) => !c.isGroup),
			).id,
	),

	memo: Factory.each(() => faker.lorem.sentence()),

	postAt: Factory.each(() => fakeDate()),

	maintenanceOrderId: null,

	propertyId: null,

	unitId: null,
});

export const expensePartialFactory = () =>
	expenseFactory.build({
		organizationId: '',
		portfolioId: '',
		unitId: '',
	});

export type ExpenseFactoryParams = Partial<
	Parameters<typeof expenseFactory.build>[0]
>;
