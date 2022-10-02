import { faker } from '@faker-js/faker';
import type { Portfolio } from '@prisma/client';
import * as Factory from 'factory.ts';
import type { Strict } from '../utils/strict';
import { abstractFactory } from './abstract';

export const portfolioFactory = Factory.Sync.makeFactoryWithRequired<
	Strict<Portfolio>,
	'organizationId'
>({
	fullName: faker.name.fullName(),
	// @ts-expect-error factory.ts does not support optional/nullable properties
	label: null,
	civilid: faker.datatype
		.number({ min: 200000000000, max: 399999999999 })
		.toString(),
	dob: faker.date.past(),
	phone: faker.phone.number('9#######'),
}).combine(abstractFactory);
