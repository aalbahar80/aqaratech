// To run this file:
// node --loader ts-node/esm prisma/seed.ts

import * as fakerAll from '@faker-js/faker';
import pkg, { type Prisma } from '@prisma/client';
import * as util from 'util';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();
const faker = fakerAll.faker;
faker.locale = 'ar';

const createdAt = () => faker.date.past(4);
const updatedAt = () => faker.date.past(4);

const fakeTenant = (): Prisma.TenantCreateInput => ({
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
	leases: {
		create: Array.from(
			{ length: faker.datatype.number({ min: 1, max: 4 }) },
			fakeLease,
		),
	},
});

const fakeUnit = (): Prisma.UnitCreateInput => ({
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
	expenses: {
		create: Array.from(
			{ length: faker.datatype.number({ min: 1, max: 4 }) },
			fakeExpense,
		),
	},
});

const fakeProperty = (): Prisma.PropertyCreateInput => ({
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	area: faker.address.cityName(),
	block: faker.datatype.number({ min: 1, max: 13 }).toString(),
	street: faker.address.streetName(),
	number: faker.datatype.number({ min: 1, max: 100 }).toString(),
	units: {
		create: Array.from(
			{ length: faker.datatype.number({ min: 1, max: 8 }) },
			fakeUnit,
		),
	},
	expenses: {
		create: Array.from(
			{ length: faker.datatype.number({ min: 1, max: 4 }) },
			fakeExpense,
		),
	},
});

const fakeClient = (): Prisma.ClientCreateInput => ({
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
	properties: {
		create: Array.from(
			{ length: faker.datatype.number({ min: 1, max: 4 }) },
			fakeProperty,
		),
	},
	expenses: {
		create: Array.from(
			{ length: faker.datatype.number({ min: 1, max: 4 }) },
			fakeExpense,
		),
	},
});

const fakeTransaction = (): Prisma.TransactionCreateInput => ({
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	amount: +faker.finance.amount(100, 3000, 0),
	memo: faker.finance.transactionType(),
	dueDate: faker.date.future(1),
	isPaid: faker.datatype.boolean(),
	receiptUrl: faker.image.lorempicsum.imageUrl(),
});

const fakeLease = (): Prisma.LeaseCreateInput => ({
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	startDate: faker.date.past(4),
	endDate: faker.date.future(1),
	deposit: +faker.finance.amount(100, 3000, 0),
	monthlyRent: +faker.finance.amount(100, 3000, 0),
	license: faker.company.bs(),
	transactions: {
		create: Array.from({ length: 12 }, fakeTransaction),
	},
});

const fakeExpense = (): Prisma.ExpenseCreateInput => ({
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	amount: +faker.finance.amount(100, 3000, 0),
	category: faker.finance.transactionType(),
	memo: faker.lorem.sentences(),
	postDate: faker.date.past(4),
});

const fakeMaintenanceOrder = (): Prisma.MaintenanceOrderCreateInput => ({
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	completedAt: faker.date.future(1),
	title: faker.lorem.words(4),
	description: faker.lorem.sentences(),
	expenses: {
		create: Array.from(
			{ length: faker.datatype.number({ min: 0, max: 4 }) },
			fakeExpense,
		),
	},
});

async function main() {
	const fakeClients = Array.from({ length: 10 }, fakeClient);
	// console.log(util.inspect(fakeClients, { depth: null }));
	for (const client of fakeClients) {
		await prisma.client.create({
			data: client,
		});
		console.log('Created 1 client');
	}
	console.info('Clients created!');

	const fakeTenants = Array.from({ length: 10 }, fakeTenant);
	// console.log(util.inspect(fakeTenants, { depth: null }));
	for (const tenant of fakeTenants) {
		await prisma.tenant.create({
			data: tenant,
		});
		console.log('Created 1 tenant');
	}
	console.info('Done creating Tenants!');

	const fakeMaintenanceOrders = Array.from(
		{ length: 10 },
		fakeMaintenanceOrder,
	);
	// console.log(util.inspect(fakeMaintenanceOrders, { depth: null }));
	for (const maintenanceOrder of fakeMaintenanceOrders) {
		await prisma.maintenanceOrder.create({
			data: maintenanceOrder,
		});
		console.log('Created 1 maintenance order');
	}
	console.info('Maintenance orders created!');
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
