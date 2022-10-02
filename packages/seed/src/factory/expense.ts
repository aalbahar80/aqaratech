import { faker } from '@faker-js/faker';
import type { Expense } from '@prisma/client';
import * as Factory from 'factory.ts';
import { generateExpenseCategoryTree, TIMESPAN } from '../constants';
import type { Strict } from '../utils/strict';
import { abstractFactory } from './abstract';

export const expenseFactory = Factory.Sync.makeFactoryWithRequired<
	Strict<Expense>,
	'organizationId' | 'portfolioId'
>({
	amount: Factory.each(() => +faker.finance.amount(10, 250, 0)),
	categoryId: faker.helpers.arrayElement(
		generateExpenseCategoryTree().filter((c) => !c.isGroup),
	).id,
	memo: Factory.each(() => faker.lorem.sentence()),
	postAt: Factory.each(() => faker.date.past(TIMESPAN)),
	// @ts-expect-error factory.ts does not support optional/nullable properties
	maintenanceOrderId: null,
	// @ts-expect-error factory.ts does not support optional/nullable properties
	propertyId: null,
	// @ts-expect-error factory.ts does not support optional/nullable properties
	unitId: null,
}).combine(abstractFactory);
