import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

import { createdAt, updatedAt } from '../utils/dates';
import { fakeDate } from '../utils/fake-date';

import type { Payout } from '../utils/date-or-string';

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

export const payoutPartialFactory = () =>
	payoutFactory.build({
		organizationId: '',
		portfolioId: '',
	});

export type PayoutFactoryParams = Partial<
	Parameters<typeof payoutFactory.build>[0]
>;
