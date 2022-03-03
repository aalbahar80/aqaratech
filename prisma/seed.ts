// To run this file:
// node --loader ts-node/esm prisma/seed.ts
// OR npx prisma db seed

import * as fakerAll from '@faker-js/faker';
// import * as util from 'util';
// import prisma from '../src/lib/server/prismaClient';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import pkg, { type Prisma } from '@prisma/client';

const { PrismaClient } = pkg;

const prisma = new PrismaClient({
	log: [{ level: 'query', emit: 'event' }, 'info', 'warn', 'error'],
	errorFormat: 'pretty',
});
prisma.$on('query', (e) => {
	console.log(e);
});

const { faker } = fakerAll;
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
	passportNum: faker.datatype
		.number({ min: 100000000, max: 999999999 })
		.toString(),
	nationality: faker.address.countryCode(),
	residencyNum: faker.datatype
		.number({ min: 100000000, max: 999999999 })
		.toString(),
	residencyExp: faker.date.future(2),
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
	unitNumber: faker.datatype.number({ min: 1, max: 100 }).toString(),
	type: faker.random.arrayElement(['شقة', 'محل', 'سرداب', 'مخزن']),
	propertyId,
});

const fakeProperty = (clientId: string) => ({
	id: faker.datatype.uuid(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	area: faker.address.cityName(),
	block: faker.datatype.number({ min: 1, max: 13 }).toString(),
	street: `شارع ${faker.random.arrayElement([
		faker.name.lastName(),
		faker.datatype.number({ min: 1, max: 500 }).toString(),
	])}`,
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
	dob: faker.date.past(),
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

const fakeLease = (tenantId: string, unitId: string) => {
	return {
		id: faker.datatype.uuid(),
		createdAt: createdAt(),
		updatedAt: updatedAt(),
		start: faker.date.past(4),
		end: faker.date.future(1),
		deposit: +faker.finance.amount(100, 3000, 0),
		monthlyRent: +faker.finance.amount(100, 3000, 0),
		license: faker.company.bs(),
		tenantId,
		unitId,
	};
};

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
	const clientCount = 8;
	const propertyMax = 10;
	const unitMax = 20;
	const tenantCount = 200;
	const leaseMax = 5;
	const moCount = 200;
	const expenseCount = 200;

	const clients = Array.from({ length: clientCount }, fakeClient);
	const properties = clients.flatMap((client) =>
		Array.from(
			{ length: faker.datatype.number({ min: 0, max: propertyMax }) },
			() => fakeProperty(client.id),
		),
	);
	console.log(properties);
	const units = properties.flatMap((property) =>
		Array.from(
			{ length: faker.datatype.number({ min: 0, max: unitMax }) },
			() => fakeUnit(property.id),
		),
	);
	console.log(units);
	const tenants = Array.from({ length: tenantCount }, fakeTenant);

	const leases = units.length
		? tenants.flatMap((tenant) =>
				Array.from(
					{ length: faker.datatype.number({ min: 0, max: leaseMax }) },
					() =>
						fakeLease(
							tenant.id,
							units[faker.datatype.number(units.length - 1)].id,
						),
				),
		  )
		: [];
	console.log(leases);

	const transactions = leases.length
		? leases.flatMap((lease) =>
				Array.from({ length: 12 }, () => fakeTransaction(lease.id)),
		  )
		: [];

	const maintenanceOrders = Array.from({ length: moCount }, () => {
		const mo = fakeMaintenanceOrder();
		// add either a client or a property or a unit
		const random = faker.datatype.number({ min: 0, max: 2 });
		if (random === 0) {
			return {
				...mo,
				clientId:
					clients.length > 0
						? clients[faker.datatype.number(clients.length - 1)].id
						: null,
			};
		}
		if (random === 1) {
			return {
				...mo,
				propertyId:
					properties.length > 0
						? properties[faker.datatype.number(properties.length - 1)].id
						: null,
			};
		}
		if (random === 2) {
			return {
				...mo,
				unitId:
					units.length > 0
						? units[faker.datatype.number(units.length - 1)].id
						: null,
			};
		}
		return mo;
	});

	const expenses = Array.from({ length: expenseCount }, () => {
		const expense = fakeExpense();
		// assign to either a client or a property or a unit
		const random = faker.datatype.number({ min: 0, max: 2 });
		if (random === 0) {
			return {
				...expense,
				clientId:
					clients.length > 0
						? clients[faker.datatype.number(clients.length - 1)].id
						: null,
			};
		}
		if (random === 1) {
			return {
				...expense,
				propertyId:
					properties.length > 0
						? properties[faker.datatype.number(properties.length - 1)].id
						: null,
			};
		}
		if (random === 2) {
			return {
				...expense,
				unitId:
					units.length > 0
						? units[faker.datatype.number(units.length - 1)].id
						: null,
			};
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
		await cleanupDatabase();
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
		if (leases.length) {
			await prisma.lease.createMany({
				data: leases,
			});
			console.log('leases created');
		}
		if (transactions.length) {
			await prisma.transaction.createMany({
				data: transactions,
			});
			console.log('transactions created');
		}
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
	.finally(() => prisma.$disconnect());
