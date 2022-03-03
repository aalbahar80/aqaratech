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

const fakeLease = (tenantId: string, unitId: string) => ({
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

const cleanupDatabase = async (): Promise<void> => {
	await prisma.maintenanceOrder.deleteMany({});
	await prisma.expense.deleteMany({});
	await prisma.transaction.deleteMany({});
	await prisma.lease.deleteMany({});
	await prisma.tenant.deleteMany({});
	await prisma.unit.deleteMany({});
	await prisma.property.deleteMany({});
	await prisma.client.deleteMany({});
};

async function main() {
	const clientCount = 15;
	const propertyMax = 7;
	const unitMax = 15;
	const tenantCount = 500;
	const leaseMax = 5;
	const moCount = 100;
	const expenseCount = 100;

	const clients = Array.from({ length: clientCount }, fakeClient);
	const properties = clients.flatMap((client) =>
		Array.from(
			{ length: faker.datatype.number({ min: 0, max: propertyMax }) },
			() => fakeProperty(client.id),
		),
	);
	const units = properties.flatMap((property) =>
		Array.from(
			{ length: faker.datatype.number({ min: 0, max: unitMax }) },
			() => fakeUnit(property.id),
		),
	);
	const tenants = Array.from({ length: tenantCount }, fakeTenant);

	const leases = tenants.flatMap((tenant) =>
		Array.from(
			{ length: faker.datatype.number({ min: 0, max: leaseMax }) },
			() =>
				fakeLease(tenant.id, units[faker.datatype.number(units.length - 1)].id),
		),
	);

	const transactions = leases.flatMap((lease) =>
		Array.from({ length: 12 }, () => fakeTransaction(lease.id)),
	);

	const maintenanceOrders = Array.from({ length: moCount }, () => {
		const mo = fakeMaintenanceOrder();
		// add either a client or a property or a unit
		const random = faker.datatype.number({ min: 0, max: 2 });
		if (random === 0) {
			mo['clientId'] = clients[faker.datatype.number(clients.length - 1)].id;
		}
		if (random === 1) {
			mo['propertyId'] =
				properties[faker.datatype.number(properties.length - 1)].id;
		}
		if (random === 2) {
			mo['unitId'] = units[faker.datatype.number(units.length - 1)].id;
		}
		return mo;
	});

	const expenses = Array.from({ length: expenseCount }, () => {
		const expense = fakeExpense();
		// assign to either a client or a property or a unit
		const random = faker.datatype.number({ min: 0, max: 2 });
		if (random === 0) {
			expense['clientId'] =
				clients[faker.datatype.number(clients.length - 1)].id;
		}
		if (random === 1) {
			expense['propertyId'] =
				properties[faker.datatype.number(properties.length - 1)].id;
		}
		if (random === 2) {
			expense['unitId'] = units[faker.datatype.number(units.length - 1)].id;
		}
		return expense;
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

	try {
		// TODO add a NODE_ENV check to only run this in development
		// await cleanupDatabase();
		await prisma.client.createMany({
			data: clients,
		});
		console.log('clients created');
		await prisma.property.createMany({
			data: properties,
		});
		console.log('properties created');
		await prisma.unit.createMany({
			data: units,
		});
		console.log('units created');
		await prisma.tenant.createMany({
			data: tenants,
		});
		console.log('tenants created');
		await prisma.lease.createMany({
			data: leases,
		});
		console.log('leases created');
		await prisma.transaction.createMany({
			data: transactions,
		});
		console.log('transactions created');
		await prisma.maintenanceOrder.createMany({
			data: maintenanceOrders,
		});
		console.log('maintenance orders created');
		await prisma.expense.createMany({
			data: expenses,
		});
		console.log('expenses created');
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
