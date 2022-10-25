import { faker } from '@faker-js/faker';
import type { ExpenseCategory } from '@self/utils';
import * as Factory from 'factory.ts';
import { randomUUID } from 'node:crypto';

export const expenseCategoryFactory = Factory.Sync.makeFactory<ExpenseCategory>(
	{
		id: Factory.each(() => randomUUID()),
		labelEn: Factory.each(() => faker.finance.accountName()),
		labelAr: Factory.each(() => faker.finance.accountName()),
		description: Factory.each(() => faker.lorem.sentence()),
		isGroup: Factory.each(() => faker.datatype.boolean()),
		parentId: null,
	},
);
