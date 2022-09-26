import { faker } from '@faker-js/faker';
import type { Portfolio } from '@prisma/client';
import * as Factory from 'factory.ts';
import { createdAt, updatedAt } from '../utils/dates';
import { ID } from '../utils/uuid';

export const portfolioFactory = Factory.Sync.makeFactoryWithRequired<
	Portfolio,
	'organizationId'
>({
	id: ID(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	fullName: faker.name.fullName(),
	label: null,
	civilid: faker.datatype
		.number({ min: 200000000000, max: 399999999999 })
		.toString(),
	dob: faker.date.past(),
	phone: faker.phone.number('9#######'),
});
