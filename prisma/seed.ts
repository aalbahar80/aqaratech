//@ts-nocheck
// To run this file:
// node --loader ts-node/esm prisma/seed.ts
// OR npx prisma db seed

import * as fakerAll from '@faker-js/faker';
import * as util from 'util';
import pkg from '@prisma/client';
import {
	areas,
	coordinates,
	expenseCategories,
} from '../src/lib/config/constants.ts';
import { addMonths } from 'date-fns';

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
	residencyEnd: faker.date.future(2),
});

const fakeUnit = (propertyId: string) => ({
	id: faker.datatype.uuid(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	floor: faker.datatype.number({ min: -2, max: 10 }),
	size: faker.datatype.number({ min: 1, max: 2000 }),
	bed: faker.datatype.number({ min: 1, max: 10 }),
	bath: faker.datatype.number({ min: 1, max: 10 }),
	marketRent: +faker.finance.amount(100, 3000, 0),
	unitNumber: faker.datatype.number({ min: 1, max: 100 }).toString(),
	type: faker.random.arrayElement([
		'شقة',
		'محل',
		'سرداب',
		'مخزن',
		'شاليه',
		'بيت',
	]),
	propertyId,
});

const fakeProperty = (clientId: string) => {
	const lat = faker.random.arrayElement(coordinates)[0];
	const long = faker.random.arrayElement(coordinates)[1];
	return {
		id: faker.datatype.uuid(),
		createdAt: createdAt(),
		updatedAt: updatedAt(),
		area: faker.random.arrayElement(areas)[1],
		block: faker.datatype.number({ min: 1, max: 13 }).toString(),
		street: `شارع ${faker.random.arrayElement([
			faker.name.lastName(),
			faker.datatype.number({ min: 1, max: 500 }).toString(),
		])}`,
		number: faker.datatype.number({ min: 1, max: 100 }).toString(),
		long,
		lat,
		clientId,
	};
};

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

const fakeTransaction = (
	leaseId: string,
	amount: number,
	leaseStart: Date,
	count: number,
) => {
	const nextMonth = new Date(
		leaseStart.getFullYear(),
		leaseStart.getMonth() + 1,
		2,
	);
	return {
		id: faker.datatype.uuid(),
		createdAt: createdAt(),
		updatedAt: updatedAt(),
		amount,
		memo: 'RENT',
		postDate: addMonths(nextMonth, count),
		dueDate: faker.date.future(1),
		isPaid: Math.random() > 0.15,
		receiptUrl: faker.image.lorempicsum.imageUrl(),
		leaseId,
	};
};

const fakeLease = (
	tenantId: string,
	unitId: string,
	tenantStart: Date,
	count: number, // nth lease for tenant
) => {
	// const start = faker.date.between('2018-01-01', '2022-05-31');
	let start = new Date(tenantStart);
	start = new Date(start.setFullYear(start.getFullYear() + count));
	let end = new Date(start);
	end = new Date(end.setFullYear(end.getFullYear() + 1));
	return {
		id: faker.datatype.uuid(),
		createdAt: createdAt(),
		updatedAt: updatedAt(),
		start,
		end,
		deposit: +faker.finance.amount(100, 3000, 0),
		monthlyRent: +faker.finance.amount(100, 3000, 0),
		license: faker.company.bs(),
		active: true,
		tenantId,
		unitId,
	};
};

const fakeExpense = () => ({
	id: faker.datatype.uuid(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	amount: +faker.finance.amount(100, 3000, 0),
	category: faker.random.arrayElement(expenseCategories),
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

async function main(sample = true, clean = false) {
	let clientCount = 15;
	let propertyMax = 10;
	let unitMax = 20;
	let tenantCount = 300;
	let leaseMax = 4;
	let moCount = 500;
	let expenseCount = 5000;

	if (sample) {
		clientCount = 3;
		propertyMax = 3;
		unitMax = 3;
		tenantCount = 5;
		leaseMax = 4;
		moCount = 4;
		expenseCount = 4;
	}

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
					(_, n) => {
						const leaseN = fakeLease(
							tenant.id,
							units[faker.datatype.number(units.length - 1)].id,
							faker.date.between('2018-01-01', '2022-05-31'),
							n,
						);
						// discard lease if it starts after today. Unless it's the first
						if (n !== 0 || leaseN.start < new Date()) {
							return leaseN;
						}
					},
				),
		  )
		: [];
	console.log(leases);

	const transactions = leases.length
		? leases.flatMap((lease) =>
				Array.from({ length: 12 }, (_, n) =>
					fakeTransaction(lease.id, lease.monthlyRent, lease.start, n),
				),
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

	if (sample) {
		console.log(
			util.inspect(
				{
					clients,
					properties,
					units,
					tenants,
					leases,
					transactions,
					maintenanceOrders,
					expenses,
				},
				{ showHidden: false, depth: null, colors: true },
			),
		);
		return;
	}

	try {
		// TODO add a NODE_ENV check to only run this in development
		if (clean) {
			await cleanupDatabase();
		}

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

main(true, false)
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
