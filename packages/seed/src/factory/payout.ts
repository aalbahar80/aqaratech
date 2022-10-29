import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';
import { randomUUID } from 'node:crypto';
import type { Payout } from '../utils/date-or-string';
import { createdAt, updatedAt } from '../utils/dates';
import { fakeDate } from '../utils/fake-date';

export const payoutFactory = Factory.Sync.makeFactoryWithRequired<
	Payout,
	'organizationId' | 'portfolioId'
>({
	id: Factory.each(() => randomUUID()),
	createdAt: Factory.each(() => createdAt()),
	updatedAt: Factory.each(() => updatedAt()),

	amount: Factory.each(() => +faker.finance.amount(10, 250, 0)),
	memo: Factory.each(() => faker.lorem.sentence()),
	postAt: Factory.each(() => fakeDate()),
});
