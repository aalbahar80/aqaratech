import { faker } from '@faker-js/faker';
import type {
	Organization,
	Portfolio,
	Property,
	Role,
	Tenant,
	User,
} from '@prisma/client';
import * as Factory from 'factory.ts';
import { areas } from '../constants';
import { createdAt, updatedAt } from '../utils/dates';
import { ID } from '../utils/uuid';

export const userFactory = Factory.Sync.makeFactory<User>({
	id: ID(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	fullName: faker.name.fullName(),
	email: faker.internet.email(),
});

export const organizationFactory = Factory.Sync.makeFactory<Organization>({
	id: ID(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	fullName: faker.company.name(),
	label: null,
	isActive: faker.datatype.boolean(),
	planId: null,
});

export const roleFactory = Factory.Sync.makeFactoryWithRequired<
	Role,
	'userId' | 'organizationId'
>({
	id: ID(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	roleType: Factory.each(() => 'ORGADMIN'),
	portfolioId: null,
	tenantId: null,
	isAccepted: faker.datatype.boolean(),
	isDefault: faker.datatype.boolean(),
	permissions: null,
});

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

export const propertyFactory = Factory.Sync.makeFactoryWithRequired<
	Property,
	'organizationId' | 'portfolioId'
>({
	area: areas[Math.floor(Math.random() * areas.length)]![1],
	id: ID(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),

	label: null,
	cost: null, // rm?

	// address
	block: faker.datatype.number({ min: 1, max: 13 }).toString(),
	street: `شارع ${faker.helpers.arrayElement([
		faker.name.lastName(),
		faker.datatype.number({ min: 1, max: 500 }).toString(),
	])}`,
	avenue: faker.address.streetName(),
	number: faker.datatype.number({ min: 1, max: 100 }).toString(),
	lat: +faker.address.latitude(),
	long: +faker.address.longitude(),
	paci: faker.datatype.number({ min: 10000000, max: 19999999 }).toString(),
	parcel: faker.datatype.number({ min: 100, max: 999999 }).toString(),
});
