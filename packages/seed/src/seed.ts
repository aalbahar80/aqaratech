import { faker } from '@faker-js/faker';
import { Payout } from '@prisma/client';
import { addDays } from 'date-fns';
import { config } from 'dotenv';
import { inspect } from 'util';
import {
	fakeExpense,
	fakeLease,
	fakeLeaseInvoice,
	fakeMaintenanceOrder,
	fakeOrganizationSettings,
	fakePayout,
	fakePortfolio,
	fakeProperty,
	fakeTenant,
	fakeUnit,
	testOrgId,
	timespan,
} from './generators.js';
import prisma from './prisma.js';
import { sample } from './sample-data.js';

config({
	path: '../backend/prisma/.env',
});

const randId = <T extends { id: string }>(entities: T[]): string => {
	const entity = entities[Math.floor(Math.random() * entities.length)];
	if (!entity) {
		throw new Error(`No entity found. List is empty.`);
	}
	return entity.id;
};

export async function seed({
	printOnly = false,
}: { printOnly?: boolean } = {}) {
	let portfolioCount = 9;
	let propertyMin = 2;
	let propertyMax = 5;
	let unitMax = 5;
	let moCount = 10;
	let expenseCount = 50;
	let payoutCount = 10;
	let trxPerLease = 5;
	const min = 1;

	// if (sample) {
	// 	// portfolioCount = 2;
	// 	moCount = 20;
	// 	trxPerLease = 3;
	// }

	const organizations = sample.organizations;
	const users = sample.users;
	const roles = sample.roles;

	const portfolios: any[] = [];
	const randomPortfolios = Array.from({ length: portfolioCount }, () =>
		fakePortfolio(testOrgId),
	);
	portfolios.push(...(randomPortfolios as any));

	const properties: any[] = [];
	const randomProperties = portfolios.flatMap((portfolio) =>
		Array.from(
			{
				length: faker.datatype.number({ min: propertyMin, max: propertyMax }),
			},
			() => fakeProperty(portfolio.id, portfolio.organizationId),
		),
	);
	properties.push(...(randomProperties as any));

	const units: any[] = [];
	const randomUnits = properties.flatMap((property) =>
		Array.from({ length: faker.datatype.number({ min, max: unitMax }) }, () =>
			fakeUnit(property.id, property.portfolioId, property.organizationId),
		),
	);
	units.push(...(randomUnits as any));

	const tenants: ReturnType<typeof fakeTenant>[] = [];
	const leases: ReturnType<typeof fakeLease>[] = [];
	units.forEach((unit, idx) => {
		const unitPortfolioId = properties.find(
			(p) => p.id === unit.propertyId,
		)!.portfolioId;
		const unitOrganizationId = portfolios.find(
			(o) => o.id === unitPortfolioId,
		)!.organizationId;

		let date = new Date();
		date.setFullYear(date.getFullYear() - timespan);
		let tenantN = fakeTenant(unitOrganizationId);

		if (idx === 0) {
			tenantN = sample.tenants[0] as any;
		}

		tenants.push(tenantN as any);
		tenantLoop: while (date < new Date()) {
			const leaseN = fakeLease(
				tenantN.id,
				unit.id,
				date,
				unit.portfolioId,
				unit.organizationId,
			);
			leases.push({ ...leaseN });

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
				tenantN = fakeTenant(unitOrganizationId);
				tenants.push(tenantN as any);
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

	const leaseInvoices = sample.leaseInvoices;
	const randomLeaseInvoices = leases.length
		? leases.flatMap((lease) =>
				Array.from({ length: trxPerLease }, (_, n) =>
					fakeLeaseInvoice(
						lease.id,
						lease.monthlyRent,
						lease.start,
						n,
						lease.portfolioId,
						lease.organizationId,
					),
				),
		  )
		: [];
	leaseInvoices.push(...(randomLeaseInvoices as any));

	const maintenanceOrders = Array.from({ length: moCount }, () => {
		const mo = fakeMaintenanceOrder();
		// add either a portfolio or a property or a unit
		const random = faker.datatype.number({ min: 0, max: 2 });
		if (random === 0) {
			const portfolio =
				portfolios.length > 0
					? portfolios[faker.datatype.number(portfolios.length - 1)] ?? null
					: null;
			return {
				...mo,
				portfolioId: portfolio?.id ?? null,
				organizationId: portfolio?.organizationId,
			};
		}
		if (random === 1) {
			const property =
				properties.length > 0
					? properties[faker.datatype.number(properties.length - 1)] ?? null
					: null;
			return {
				...mo,
				propertyId: property?.id ?? null,
				portfolioId: property?.portfolioId ?? null,
				organizationId: property?.organizationId,
			};
		}
		if (random === 2) {
			const unit =
				units.length > 0
					? units[faker.datatype.number(units.length - 1)] ?? null
					: null;
			return {
				...mo,
				unitId: unit?.id ?? null,
				portfolioId: unit?.portfolioId ?? null,
				organizationId: unit?.organizationId,
			};
		}
		return mo;
	});

	type Expense = ReturnType<typeof fakeExpense> & {
		organizationId?: string;
		portfolioId?: string;
		propertyId?: string;
		unitId?: string;
	};
	const expenses: Expense[] = [];
	portfolios.forEach((portfolio) => {
		for (let i = 0; i < expenseCount; i++) {
			const expense = fakeExpense();
			const ownProperties = properties.filter(
				(p) => p.portfolioId === portfolio.id,
			);
			const randomProperty =
				ownProperties[faker.datatype.number(ownProperties.length - 1)];
			const randomPropertyUnits = units.filter(
				(u) => u.propertyId === randomProperty?.id,
			);
			const randomUnit =
				randomPropertyUnits[
					faker.datatype.number(randomPropertyUnits.length - 1)
				];
			const includeProperty = Math.random() < 0.7; // 70% true
			const includeUnit = includeProperty && Math.random() < 0.5;

			expenses.push({
				...expense,
				portfolioId: portfolio.id!,
				organizationId: testOrgId,

				...(includeProperty &&
					randomProperty && {
						propertyId: randomProperty?.id,
						organizationId: testOrgId,
					}),

				...(includeUnit &&
					randomUnit && {
						unitId: randomUnit?.id,
						organizationId: testOrgId,
					}),
			});
		}
	});

	const payouts = portfolios.flatMap((portfolio) => {
		const portfolioPayouts: Payout[] = [];
		for (let i = 0; i < payoutCount; i++) {
			const payout = fakePayout();
			portfolioPayouts.push({
				...payout,
				portfolioId: portfolio.id,
				organizationId: testOrgId,
				memo: faker.lorem.sentence(),
			});
		}
		return portfolioPayouts;
	});

	// count the number of tenants with a lease
	const tenantsWithLease = tenants.filter((tenant) =>
		leases.find((lease) => lease.tenantId === tenant.id),
	).length;
	const homelessTenantCount = tenants.filter(
		(tenant) => !leases.find((lease) => lease.tenantId === tenant.id),
	).length;

	const portfoliosWithProperty = portfolios.filter((portfolio) =>
		properties.find((property) => property.portfolioId === portfolio.id),
	).length;
	const propsWithUnit = properties.filter((property) =>
		units.find((unit) => unit.propertyId === property.id),
	).length;

	const unitsWithLease = units.filter((unit) =>
		leases.find((lease) => lease.unitId === unit.id),
	).length;

	console.log(`${tenantsWithLease} tenants with a lease`);
	console.log(`${homelessTenantCount} homeless tenants`);
	console.log(`${portfoliosWithProperty} portfolios with a property`);
	console.log(`${propsWithUnit} properties with a unit`);
	console.log(`${unitsWithLease} units with a lease`);

	console.log('Seeding to database:', process.env.DATABASE_URL);
	const summary = `Totals: \n ${users.length} users \n ${organizations.length} organizations \n ${portfolios.length} portfolios \n ${properties.length} properties \n ${units.length} units \n ${tenants.length} tenants \n ${leases.length} leases \n ${leaseInvoices.length} leaseInvoices \n ${maintenanceOrders.length} maintenance orders \n ${expenses.length} expenses \n ${payouts.length} payouts`;
	console.log(summary);

	if (printOnly) {
		console.log(
			inspect(
				{
					portfolios,
					properties,
					units,
					tenants,
					leases,
					leaseInvoices,
					maintenanceOrders,
					expenses,
				},
				{ showHidden: false, depth: null, colors: true },
			),
		);
		console.log('Sample printed, nothing done to database.');
		console.log(summary);
		return;
	} else {
		console.log('Done generating fake data.');
	}

	try {
		console.log(`preparing to insert...`);
		// TODO add a NODE_ENV check to only run this in development

		console.time('insert');
		await prisma.user.createMany({ data: users });
		await prisma.organization.createMany({ data: organizations });
		await prisma.organizationSettings.createMany({
			data: organizations.map((o) => fakeOrganizationSettings(o.id)),
		});
		await prisma.portfolio.createMany({
			data: [...sample.portfolios, ...portfolios],
		});
		await prisma.payout.createMany({ data: [...sample.payouts, ...payouts] });
		await prisma.tenant.createMany({
			// @ts-ignore
			// skip the first tenant, it's already in the sample data
			data: [...sample.tenants.slice(1), ...tenants],
		});
		// @ts-ignore
		await prisma.role.createMany({ data: roles });
		await prisma.property.createMany({
			data: [...sample.properties, ...properties],
		});
		await prisma.unit.createMany({ data: [...sample.units, ...units] });
		if (leases.length) {
			await prisma.lease.createMany({ data: [...leases, ...sample.leases] });
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

		if (leaseInvoices.length) {
			console.time('leaseInvoices created');
			// split the maintenance orders into chunks of 10
			const leaseInvoicesChunks = split(leaseInvoices, 1000);
			// create the chunks
			leaseInvoicesChunks.forEach(async (chunk) => {
				await prisma.leaseInvoice.createMany({
					data: chunk,
				});
			}),
				console.timeEnd('leaseInvoices created');
		}

		if (maintenanceOrders.length) {
			console.time('maintenanceOrders created');
			// split the maintenance orders into chunks of 10
			const maintenanceOrdersChunks = split(maintenanceOrders, 1000);
			// create the chunks
			maintenanceOrdersChunks.forEach(async (chunk) => {
				await prisma.maintenanceOrder.createMany({
					// @ts-ignore
					data: chunk,
				});
			}),
				console.log('maintenance orders created');
		}

		console.time('expenses created');
		await prisma.expense.createMany({
			//@ts-ignore
			data: [...sample.expenses, ...expenses],
		});
		console.timeEnd('expenses created');
		console.timeEnd('insert');

		console.log(`${tenantsWithLease} tenants with a lease`);
		console.log(`${homelessTenantCount} homeless tenants`);
		console.log(summary);
	} catch (e) {
		console.error(e);
	}
}
