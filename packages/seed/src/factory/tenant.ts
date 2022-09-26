import { faker } from '@faker-js/faker';
import type { Tenant } from '@prisma/client';
import * as Factory from 'factory.ts';
import { createdAt, updatedAt } from '../utils/dates';
import { ID } from '../utils/uuid';

export const tenantFactory = Factory.Sync.makeFactoryWithRequired<
	Tenant,
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
	passportNum: faker.datatype
		.number({ min: 100000000, max: 999999999 })
		.toString(),
	nationality: faker.address.countryCode('alpha-3'),
	residencyNum: faker.datatype
		.number({ min: 100000000, max: 999999999 })
		.toString(),
	residencyEnd: faker.date.future(2),
});
