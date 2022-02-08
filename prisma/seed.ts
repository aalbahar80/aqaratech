// To run this file:
// node --loader ts-node/esm prisma/seed.ts

import * as fakerAll from '@faker-js/faker';
import pkg, { type Prisma } from '@prisma/client';
import * as util from 'util';
const { PrismaClient } = pkg;

const prisma = new PrismaClient({
	log: [{ level: 'query', emit: 'event' }, 'info'],
	errorFormat: 'pretty',
});
prisma.$on('query', (e) => {
	console.log(e);
});

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
			{ length: faker.datatype.number({ min: 1, max: 1 }) },
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

type Data<T extends (...args: any) => any> = Parameters<T>[0]['data'];

async function creator<T extends (...args: any) => any>({
	name,
	count,
	dataFaker,
	prismaCall,
}: {
	name: string;
	count: number;
	prismaCall: T;
	dataFaker: Data<T>;
}): Promise<void> {
	const fakeData = Array.from({ length: count }, dataFaker);
	for (const [i, v] of fakeData.entries()) {
		await prismaCall({
			data: v,
		});
		console.log(i + 1, `Created a ${name}`);
	}
	console.info(`Done creating ${fakeData.length} ${name}`);
}

async function main() {
	await creator<typeof prisma.client.create>({
		name: 'client',
		count: 1,
		prismaCall: prisma.client.create,
		dataFaker: fakeClient,
	});

	await creator<typeof prisma.tenant.create>({
		name: 'tenant',
		count: 1,
		prismaCall: prisma.tenant.create,
		dataFaker: fakeTenant,
	});

	await creator<typeof prisma.maintenanceOrder.create>({
		name: 'maintenance order',
		count: 1,
		prismaCall: prisma.maintenanceOrder.create,
		//@ts-ignore
		dataFaker: fakeMaintenanceOrder,
	});
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
