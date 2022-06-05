import { faker } from "@faker-js/faker";
import { addDays } from "date-fns";
import { config } from "dotenv";
import { inspect } from "util";
import { cleanupDatabase, isProdBranch } from "./clean-db.js";
import {
	fakePortfolio,
	fakeExpense,
	fakeLease,
	fakeMaintenanceOrder,
	fakeProperty,
	fakeTenant,
	fakeTransaction,
	fakeUnit,
	testPortfolioId,
	testTenantId,
	timespan,
} from "./generators.js";
import { insertExpenseCategories, insertExpenseGroups } from "./prep-db.js";
import prisma from "./prisma.js";

config({
	path: "../site/.env",
});

async function main({
	sample = true,
	clean = false,
}: { sample?: boolean; clean?: boolean } = {}) {
	if (await isProdBranch()) {
		return;
	}
	let portfolioCount = 3;
	let propertyMin = 2;
	let propertyMax = 6;
	let unitMax = 5;
	let moCount = 100;
	let expenseCount = 150;
	const min = 1;

	const portfolios = Array.from({ length: portfolioCount }, fakePortfolio);
	portfolios[0]!.id = testPortfolioId;

	const properties = portfolios.flatMap((portfolio) =>
		Array.from(
			{ length: faker.datatype.number({ min: propertyMin, max: propertyMax }) },
			() => fakeProperty(portfolio.id)
		)
	);
	const units = properties.flatMap((property) =>
		Array.from({ length: faker.datatype.number({ min, max: unitMax }) }, () =>
			fakeUnit(property.id)
		)
	);
	const tenants: ReturnType<typeof fakeTenant>[] = [];
	const leases: ReturnType<typeof fakeLease>[] = [];
	units.forEach((unit, idx) => {
		let date = new Date();
		date.setFullYear(date.getFullYear() - timespan);
		let tenantN = fakeTenant();
		if (idx === 0) {
			tenantN.id = testTenantId;
		}
		tenants.push(tenantN);
		tenantLoop: while (date < new Date()) {
			const leaseN = fakeLease(tenantN.id, unit.id, date);
			leases.push(leaseN);

			const renewal = Math.random() > 0.3;
			if (leaseN.end > new Date()) {
				// future reached, move to next unit
				break tenantLoop;
			} else if (renewal) {
				date = addDays(leaseN.end, 1);
				continue tenantLoop;
			} else {
				// lease ended, move to next tenant
				const tenantSearch = faker.datatype.number({ min: 1, max: 30 * 6 });
				date = addDays(leaseN.end, tenantSearch);
				tenantN = fakeTenant();
				tenants.push(tenantN);
				continue tenantLoop;
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
					fakeTransaction(lease.id, lease.monthlyRent, lease.start, n)
				)
		  )
		: [];

	const maintenanceOrders = Array.from({ length: moCount }, () => {
		const mo = fakeMaintenanceOrder();
		// add either a portfolio or a property or a unit
		const random = faker.datatype.number({ min: 0, max: 2 });
		if (random === 0) {
			return {
				...mo,
				portfolioId:
					portfolios.length > 0
						? portfolios[faker.datatype.number(portfolios.length - 1)]?.id ??
						  null
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

	type Expense = ReturnType<typeof fakeExpense> & {
		portfolioId?: string;
		propertyId?: string;
		unitId?: string;
	};
	const expenses: Expense[] = [];
	portfolios.forEach((portfolio) => {
		for (let i = 0; i < expenseCount; i++) {
			const expense = fakeExpense();
			expenses.push({ ...expense, portfolioId: portfolio.id });
		}
	});
	properties.forEach((property) => {
		for (let i = 0; i < expenseCount; i++) {
			const expense = fakeExpense();
			expenses.push({ ...expense, propertyId: property.id });
		}
	});
	units.forEach((unit) => {
		for (let i = 0; i < expenseCount; i++) {
			const expense = fakeExpense();
			expenses.push({ ...expense, unitId: unit.id });
		}
	});

	// count the number of tenants with a lease
	const tenantsWithLease = tenants.filter((tenant) =>
		leases.find((lease) => lease.tenantId === tenant.id)
	).length;
	const homelessTenantCount = tenants.filter(
		(tenant) => !leases.find((lease) => lease.tenantId === tenant.id)
	).length;

	const portfoliosWithProperty = portfolios.filter((portfolio) =>
		properties.find((property) => property.portfolioId === portfolio.id)
	).length;
	const propsWithUnit = properties.filter((property) =>
		units.find((unit) => unit.propertyId === property.id)
	).length;

	const unitsWithLease = units.filter((unit) =>
		leases.find((lease) => lease.unitId === unit.id)
	).length;

	console.log(`${tenantsWithLease} tenants with a lease`);
	console.log(`${homelessTenantCount} homeless tenants`);
	console.log(`${portfoliosWithProperty} portfolios with a property`);
	console.log(`${propsWithUnit} properties with a unit`);
	console.log(`${unitsWithLease} units with a lease`);

	console.log("Seeding to database:", process.env.DATABASE_URL);
	const summary = `Totals: \n ${portfolios.length} portfolios \n ${properties.length} properties \n ${units.length} units \n ${tenants.length} tenants \n ${leases.length} leases \n ${transactions.length} transactions \n ${maintenanceOrders.length} maintenance orders \n ${expenses.length} expenses`;
	console.log(summary);

	if (sample) {
		console.log(
			inspect(
				{
					portfolios,
					properties,
					units,
					tenants,
					leases,
					transactions,
					maintenanceOrders,
					expenses,
				},
				{ showHidden: false, depth: null, colors: true }
			)
		);
		console.log("Sample printed, nothing done to database.");
		console.log(summary);
		return;
	} else {
		console.log("Done generating fake data.");
	}

	try {
		console.log(`preparing to insert...`);
		// TODO add a NODE_ENV check to only run this in development
		if (clean) {
			console.time("cleanup");
			await cleanupDatabase();
			console.timeEnd("cleanup");
		}

		console.time("insert");
		await insertExpenseGroups();
		await insertExpenseCategories();
		await prisma.portfolio.createMany({
			data: portfolios,
		});
		console.log("portfolios created");
		await prisma.property.createMany({
			data: properties,
		});
		console.log("properties created");
		await prisma.unit.createMany({
			data: units,
		});
		console.log("units created");
		await prisma.tenant.createMany({
			data: tenants,
		});
		console.log("tenants created");
		if (leases.length) {
			await prisma.lease.createMany({
				data: leases,
			});
			console.log("leases created");
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
			console.time("transactions created");
			// split the maintenance orders into chunks of 10
			const transactionsChunks = split(transactions, 1000);
			// create the chunks
			transactionsChunks.forEach(async (chunk) => {
				await prisma.transaction.createMany({
					data: chunk,
				});
			}),
				console.time("transactions created");
		}

		if (maintenanceOrders.length) {
			console.time("maintenanceOrders created");
			// split the maintenance orders into chunks of 10
			const maintenanceOrdersChunks = split(maintenanceOrders, 1000);
			// create the chunks
			maintenanceOrdersChunks.forEach(async (chunk) => {
				await prisma.maintenanceOrder.createMany({
					data: chunk,
				});
			}),
				console.log("maintenance orders created");
		}

		console.time("expenses created");
		await prisma.expense.createMany({
			data: expenses,
		});
		console.timeEnd("expenses created");
		console.timeEnd("insert");

		console.log(`${tenantsWithLease} tenants with a lease`);
		console.log(`${homelessTenantCount} homeless tenants`);
		console.log(summary);
	} catch (e) {
		console.error(e);
	}
}

main({ sample: false, clean: true })
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
