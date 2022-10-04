import { faker } from '@faker-js/faker';
import type { Expense } from '@prisma/client';
import * as Factory from 'factory.ts';
import { randomUUID } from 'node:crypto';
import { generateExpenseCategoryTree, TIMESPAN } from '../constants';
import { createdAt, updatedAt } from '../utils/dates';

export const expenseFactory = Factory.Sync.makeFactoryWithRequired<
	Expense,
	'organizationId' | 'portfolioId'
>({
	id: Factory.each(() => randomUUID()),
	createdAt: Factory.each(() => createdAt()),
	updatedAt: Factory.each(() => updatedAt()),

	amount: Factory.each(() => +faker.finance.amount(10, 250, 0)),
	categoryId: faker.helpers.arrayElement(
		generateExpenseCategoryTree().filter((c) => !c.isGroup),
	).id,
	memo: Factory.each(() => faker.lorem.sentence()),
	postAt: Factory.each(() => faker.date.past(TIMESPAN)),
	maintenanceOrderId: null,
	propertyId: null,
	unitId: null,
});
