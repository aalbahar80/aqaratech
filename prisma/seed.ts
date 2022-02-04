// To run this file:
// node --loader ts-node/esm prisma/seed.ts

import * as fakerAll from '@faker-js/faker';
import pkg, { type Prisma } from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();
const faker = fakerAll.faker;
// faker.locale = 'en';
faker.locale = 'ar';

const fakeTenant = (): Prisma.TenantCreateInput => ({
	firstName: faker.name.firstName(),
	lastName: faker.name.lastName(),
	secondName: faker.name.lastName(),
	civilid: faker.datatype
		.number({ min: 200000000000, max: 399999999999 })
		.toString(),
	email: faker.internet.email(),
	dob: faker.date.past(),
	createdAt: faker.date.past(4),
	updatedAt: faker.date.past(4),
	phone: faker.phone.phoneNumber(),
});
// Log 10 tenants
for (let i = 0; i < 10; i++) {
	console.log(fakeTenant());
}

async function generate() {
	await prisma.tenant.create({ data: fakeTenant() });
}
