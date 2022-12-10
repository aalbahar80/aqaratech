import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

import { createdAt, updatedAt } from '../utils/dates';
import { fakeDate } from '../utils/fake-date';

import type { Portfolio } from '../utils/date-or-string';

export const portfolioFactory = Factory.Sync.makeFactoryWithRequired<
	Portfolio,
	'organizationId'
>({
	id: Factory.each(() => randomUUID()),
	createdAt: Factory.each(() => createdAt()),
	updatedAt: Factory.each(() => updatedAt()),

	fullName: Factory.each(() => faker.name.fullName()),

	label: Factory.each(() => faker.name.jobTitle()),

	civilid: Factory.each(() =>
		faker.datatype.number({ min: 200000000000, max: 399999999999 }).toString(),
	),

	dob: Factory.each(() => fakeDate()),

	phone: Factory.each(() => faker.phone.number('9#######')),
});

export const portfolioPartialFactory = () =>
	portfolioFactory.build({
		organizationId: '',
	});

export type PortfolioFactoryParams = Partial<
	Parameters<typeof portfolioFactory.build>[0]
>;
