import { faker } from '@faker-js/faker';
import type { Property } from '@prisma/client';
import * as Factory from 'factory.ts';
import { randomUUID } from 'node:crypto';
import { areas } from '../constants';
import { createdAt, updatedAt } from '../utils/dates';

export const propertyFactory = Factory.Sync.makeFactoryWithRequired<
	Property,
	'organizationId' | 'portfolioId'
>({
	id: Factory.each(() => randomUUID()),
	createdAt: Factory.each(() => createdAt()),
	updatedAt: Factory.each(() => updatedAt()),

	area: Factory.each(
		() => areas[Math.floor(Math.random() * areas.length)]?.[1] || null,
	),
	label: null,
	cost: null, // rm?

	// address
	block: faker.datatype.number({ min: 1, max: 13 }).toString(),
	street: `شارع ${faker.helpers.arrayElement([
		faker.name.lastName(),
		faker.datatype.number({ min: 1, max: 500 }).toString(),
	])}`,
	avenue: faker.datatype.number({ min: 1, max: 100 }).toString(),
	number: faker.datatype.number({ min: 1, max: 100 }).toString(),
	lat: +faker.address.latitude(),
	long: +faker.address.longitude(),
	paci: faker.datatype.number({ min: 10000000, max: 19999999 }).toString(),
	parcel: faker.datatype.number({ min: 100, max: 999999 }).toString(),
});
