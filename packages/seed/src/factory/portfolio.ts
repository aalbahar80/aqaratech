import { faker } from '@faker-js/faker';
import type { Portfolio } from '../utils/date-or-string';
import * as Factory from 'factory.ts';
import { randomUUID } from 'node:crypto';
import { createdAt, updatedAt } from '../utils/dates';

export const portfolioFactory = Factory.Sync.makeFactoryWithRequired<
	Portfolio,
	'organizationId'
>({
	id: Factory.each(() => randomUUID()),
	createdAt: Factory.each(() => createdAt()),
	updatedAt: Factory.each(() => updatedAt()),

	fullName: faker.name.fullName(),
	label: null,
	civilid: faker.datatype
		.number({ min: 200000000000, max: 399999999999 })
		.toString(),
	dob: faker.date.past(),
	phone: faker.phone.number('9#######'),
});
