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
} from '../src/lib/config/constants.js';
import { addMonths, addDays, subDays } from 'date-fns';

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
	const random = Math.floor(Math.random() * coordinates.length);
	const propCoordinates = coordinates[random];
	return {
		id: faker.datatype.uuid(),
		createdAt: createdAt(),
		updatedAt: updatedAt(),
		area: areas[Math.floor(Math.random() * areas.length)]?.[1] ?? null,
		block: faker.datatype.number({ min: 1, max: 13 }).toString(),
		street: `شارع ${faker.random.arrayElement([
			faker.name.lastName(),
			faker.datatype.number({ min: 1, max: 500 }).toString(),
		])}`,
		number: faker.datatype.number({ min: 1, max: 100 }).toString(),
		lat: propCoordinates?.[0] ?? 0,
		long: propCoordinates?.[1] ?? 0,
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
		1,
	);
	return {
		id: faker.datatype.uuid(),
		createdAt: leaseStart,
		updatedAt: leaseStart,
		amount,
		memo: 'RENT',
		postDate: addMonths(nextMonth, count),
		dueDate: addMonths(nextMonth, count),
		isPaid: Math.random() > 0.15,
		receiptUrl: faker.image.lorempicsum.imageUrl(),
		leaseId,
	};
};

const fakeLease = (tenantId: string, unitId: string, start: Date) => {
	const end = subDays(addMonths(start, 12), 1);
	return {
		id: faker.datatype.uuid(),
		createdAt: start,
		updatedAt: start,
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
	title: faker.company.bs(),
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
	await prisma.listing.deleteMany({});
};

async function main({
	sample = true,
	clean = false,
}: { sample?: boolean; clean?: boolean } = {}) {
	let clientCount = 15;
	let propertyMax = 15;
	let unitMax = 15;
	let moCount = 2500;
	let expenseCount = 5000;
	const min = 0;

	if (sample) {
		clientCount = 3;
		propertyMax = 3;
		unitMax = 3;
		moCount = 4;
		expenseCount = 4;
	}

	const clients = Array.from({ length: clientCount }, fakeClient);
	const properties = clients.flatMap((client) =>
		Array.from(
			{ length: faker.datatype.number({ min, max: propertyMax }) },
			() => fakeProperty(client.id),
		),
	);
	const units = properties.flatMap((property) =>
		Array.from({ length: faker.datatype.number({ min, max: unitMax }) }, () =>
			fakeUnit(property.id),
		),
	);
	const tenants: ReturnType<typeof fakeTenant>[] = [];
	const leases: ReturnType<typeof fakeLease>[] = [];
	units.forEach((unit) => {
		let date = new Date('2018-01-01');
		let tenantN = fakeTenant();
		tenants.push(tenantN);
		while (date < new Date()) {
			const leaseN = fakeLease(tenantN.id, unit.id, date);
			leases.push(leaseN);

			const renewal = Math.random() > 0.3;
			if (leaseN.end > new Date()) {
				// future reached, move to next unit
				break;
			} else if (renewal) {
				date = addDays(leaseN.end, 1);
				continue;
			} else {
				// lease ended, move to next tenant
				const tenantSearch = faker.datatype.number({ min: 1, max: 30 * 6 });
				date = addDays(leaseN.end, tenantSearch);
				tenantN = fakeTenant();
				tenants.push(tenantN);
				continue;
			}
		}
	});

	// test that all tenantIds in leases are in tenants
	leases.forEach((lease) => {
		if (!tenants.find((tenant) => tenant.id === lease.tenantId)) {
			throw new Error(`Tenant ${lease.tenantId} not found in tenants`);
		}
	});

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
						? clients[faker.datatype.number(clients.length - 1)]?.id ?? null
						: null,
			};
		}
		if (random === 1) {
			return {
				...mo,
				propertyId:
					properties.length > 0
						? properties[faker.datatype.number(properties.length - 1)]?.id ??
						  null
						: null,
			};
		}
		if (random === 2) {
			return {
				...mo,
				unitId:
					units.length > 0
						? units[faker.datatype.number(units.length - 1)]?.id ?? null
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
						? clients[faker.datatype.number(clients.length - 1)]?.id ?? null
						: null,
			};
		}
		if (random === 1) {
			return {
				...expense,
				propertyId:
					properties.length > 0
						? properties[faker.datatype.number(properties.length - 1)]?.id ??
						  null
						: null,
			};
		}
		if (random === 2) {
			return {
				...expense,
				unitId:
					units.length > 0
						? units[faker.datatype.number(units.length - 1)]?.id ?? null
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
		console.log(
			`perparing to insert \n ${clients.length} clients \n ${properties.length} properties \n ${units.length} units \n ${tenants.length} tenants \n ${leases.length} leases \n ${transactions.length} transactions \n ${maintenanceOrders.length} maintenance orders \n ${expenses.length} expenses`,
		);
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
		// define a function to split the maintenance orders into n chunks
		const split = <T>(array: T[], n: number): T[][] => {
			const chunked = [];
			let i;
			let j;
			for (i = 0, j = array.length; i < j; i += n) {
				chunked.push(array.slice(i, i + n));
			}
			return chunked;
		};

		if (transactions.length) {
			// split the maintenance orders into chunks of 10
			const transactionsChunks = split(transactions, 1000);
			// create the chunks
			transactionsChunks.forEach(async (chunk) => {
				await prisma.transaction.createMany({
					data: chunk,
				});
			}),
				console.log('transactions created');
		}

		if (maintenanceOrders.length) {
			// split the maintenance orders into chunks of 10
			const maintenanceOrdersChunks = split(maintenanceOrders, 1000);
			// create the chunks
			maintenanceOrdersChunks.forEach(async (chunk) => {
				await prisma.maintenanceOrder.createMany({
					data: chunk,
				});
			}),
				console.log('maintenance orders created');
		}

		await prisma.expense.createMany({
			data: expenses,
		});
		console.log('expenses created');
	} catch (e) {
		console.error(e);
	}
}

main({ sample: true, clean: false })
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
