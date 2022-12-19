import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

import type { ExpenseCategory } from '@self/utils';

export const expenseCategoryFactory = Factory.Sync.makeFactory<ExpenseCategory>(
	{
		id: Factory.each(() => randomUUID()),

		labelEn: Factory.each(() => faker.finance.accountName()),

		labelAr: Factory.each(() => faker.finance.accountName()),

		isGroup: Factory.each(() => faker.datatype.boolean()),

		parentId: null,
	},
);

export type ExpenseCategoryFactoryParams = Partial<
	Parameters<typeof expenseCategoryFactory.build>[0]
>;
