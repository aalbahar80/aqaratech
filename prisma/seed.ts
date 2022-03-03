//@ts-nocheck
// To run this file:
// node --loader ts-node/esm prisma/seed.ts

import * as fakerAll from '@faker-js/faker';
import * as util from 'util';
// import prisma from '../src/lib/server/prismaClient';
import pkg, { type Prisma } from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient({
	log: [{ level: 'query', emit: 'event' }, 'info', 'warn', 'error'],
	errorFormat: 'pretty',
});
prisma.$on('query', (e) => {
	console.log(e);
});

const faker = fakerAll.faker;
faker.locale = 'ar';

const createdAt = () => faker.date.past(4);
const updatedAt = () => faker.date.past(4);

const fakeTenant = () => ({
	id: faker.datatype.uuid(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	firstName: faker.name.firstName(),
	lastName: faker.name.lastName(),
	secondName: faker.name.lastName(),
	civilid: faker.datatype
		.number({ min: 200000000000, max: 399999999999 })
		.toString(),
	email: faker.internet.email(),
	dob: faker.date.past(),
	phone: faker.phone.phoneNumber('1#######'),
});

const fakeUnit = (propertyId: string) => ({
	id: faker.datatype.uuid(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	floor: faker.datatype.number({ min: 1, max: 10 }).toString(),
	size: faker.datatype.number({ min: 1, max: 2000 }),
	bed: faker.datatype.number({ min: 1, max: 10 }),
	bath: faker.datatype.number({ min: 1, max: 10 }),
	marketRent: +faker.finance.amount(100, 3000, 0),
	unitNumber: faker.address.secondaryAddress(),
	type: ['apartment', 'store', 'basement', 'storage'][
		Math.floor(Math.random() * 4)
	],
	propertyId,
});

const fakeProperty = (clientId: string) => ({
	id: faker.datatype.uuid(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	area: faker.address.cityName(),
	block: faker.datatype.number({ min: 1, max: 13 }).toString(),
	street: faker.address.streetName(),
	number: faker.datatype.number({ min: 1, max: 100 }).toString(),
	clientId,
});

const fakeClient = () => ({
	id: faker.datatype.uuid(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	firstName: faker.name.firstName(),
	lastName: faker.name.lastName(),
	secondName: faker.name.lastName(),
	civilid: faker.datatype
		.number({ min: 200000000000, max: 399999999999 })
		.toString(),
	email: faker.internet.email(),
	phone: faker.phone.phoneNumber('1#######'),
});

const fakeTransaction = (leaseId: string) => ({
	id: faker.datatype.uuid(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	amount: +faker.finance.amount(100, 3000, 0),
	memo: faker.finance.transactionType(),
	dueDate: faker.date.future(1),
	isPaid: faker.datatype.boolean(),
	receiptUrl: faker.image.lorempicsum.imageUrl(),
	leaseId,
});

const fakeLease = (
	tenantId: string,
	unitId: string,
): Prisma.LeaseCreateInput => ({
	id: faker.datatype.uuid(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	startDate: faker.date.past(4),
	endDate: faker.date.future(1),
	deposit: +faker.finance.amount(100, 3000, 0),
	monthlyRent: +faker.finance.amount(100, 3000, 0),
	license: faker.company.bs(),
	tenantId,
	unitId,
});

const fakeExpense = () => ({
	id: faker.datatype.uuid(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	amount: +faker.finance.amount(100, 3000, 0),
	category: faker.finance.transactionType(),
	memo: faker.lorem.sentences(),
	postDate: faker.date.past(4),
});

const fakeMaintenanceOrder = () => ({
	id: faker.datatype.uuid(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	completedAt: faker.date.future(1),
	title: faker.lorem.words(4),
	description: faker.lorem.sentences(),
});

async function main() {
	const clients = Array.from({ length: 2 }, fakeClient);
	const properties = clients.flatMap((client) =>
		Array.from({ length: faker.datatype.number({ min: 0, max: 7 }) }, () =>
			fakeProperty(client.id),
		),
	);
	const units = properties.flatMap((property) =>
		Array.from({ length: faker.datatype.number({ min: 0, max: 15 }) }, () =>
			fakeUnit(property.id),
		),
	);
	const tenants = Array.from({ length: 1000 }, fakeTenant);

	const leases = tenants.flatMap((tenant) =>
		Array.from({ length: faker.datatype.number({ min: 0, max: 5 }) }, () =>
			fakeLease(tenant.id, units[faker.datatype.number(units.length - 1)].id),
		),
	);

	const transactions = leases.flatMap((lease) =>
		Array.from({ length: 12 }, () => fakeTransaction(lease.id)),
	);

	const maintenanceOrders = Array.from({ length: 100 }, () => {
		const mo = fakeMaintenanceOrder();
		// add either a client or a property or a unit
		const random = faker.datatype.number({ min: 0, max: 2 });
		if (random === 0) {
			mo.clientId = clients[faker.datatype.number(clients.length - 1)].id;
		}
		if (random === 1) {
			mo.propertyId =
				properties[faker.datatype.number(properties.length - 1)].id;
		}
		if (random === 2) {
			mo.unitId = units[faker.datatype.number(units.length - 1)].id;
		}
		return mo;
	});

	const expenses = Array.from({ length: 100 }, () => {
		const mo = fakeExpense();
		// assign to either a client or a property or a unit
		const random = faker.datatype.number({ min: 0, max: 2 });
		if (random === 0) {
			mo.clientId = clients[faker.datatype.number(clients.length - 1)].id;
		}
		if (random === 1) {
			mo.propertyId =
				properties[faker.datatype.number(properties.length - 1)].id;
		}
		if (random === 2) {
			mo.unitId = units[faker.datatype.number(units.length - 1)].id;
		}
		return mo;
	});

	// console.log(
	// 	util.inspect(
	// 		{
	// 			clients,
	// 			properties,
	// 			units,
	// 			tenants,
	// 			leases,
	// 			transactions,
	// 			maintenanceOrders,
	// 			expenses,
	// 		},
	// 		{ showHidden: false, depth: null, colors: true },
	// 	),
	// );

	// make the calls to the database
	try {
		await prisma.client.createMany({
			data: clients,
		});
		await prisma.property.createMany({
			data: properties,
		});
		await prisma.unit.createMany({
			data: units,
		});
		await prisma.tenant.createMany({
			data: tenants,
		});
		await prisma.lease.createMany({
			data: leases,
		});
		await prisma.transaction.createMany({
			data: transactions,
		});
		await prisma.maintenanceOrder.createMany({
			data: maintenanceOrders,
		});
		await prisma.expense.createMany({
			data: expenses,
		});
	} catch (e) {
		console.error(e);
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
		// throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
