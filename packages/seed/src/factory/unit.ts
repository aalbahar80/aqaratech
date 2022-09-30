import { faker } from '@faker-js/faker';
import type { Unit } from '@prisma/client';
import * as Factory from 'factory.ts';
import { unitTypeOptions } from '../constants';
import { createdAt, updatedAt } from '../utils/dates';
import { ID } from '../utils/uuid';

const unitTypeValues = unitTypeOptions
	.filter((u) => u.value)
	.map((u) => u.value);

export const unitFactory = Factory.Sync.makeFactoryWithRequired<
	Unit,
	'organizationId' | 'portfolioId' | 'propertyId'
>({
	id: ID(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),

	floor: faker.datatype.number({ min: -2, max: 10 }),
	size: faker.datatype.number({ min: 1, max: 2000 }),
	bed: faker.datatype.number({ min: 1, max: 10 }),
	bath: faker.datatype.number({ min: 1, max: 10 }),
	marketRent: +faker.finance.amount(100, 3000, 0),
	unitNumber: faker.datatype.number({ min: 1, max: 100 }).toString(),
	type: faker.helpers.arrayElement(unitTypeValues),
	usage: null,
	label: null,
});
