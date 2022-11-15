/* eslint-disable no-dupe-else-if */
import { inspect } from 'node:util';
import {
	testOrgEmail,
	testPortfolioEmail,
	testTenantEmail,
} from './constant/ids.constant';
import type { Tree } from './constants';
import { expenseFactory } from './factory/expense';
import { leaseFactory } from './factory/lease';
import { leaseInvoiceFactory } from './factory/lease-invoice';
import { organizationFactory } from './factory/organization';
import { organizationSettingsFactory } from './factory/organization-settings';
import { payoutFactory } from './factory/payout';
import { portfolioFactory } from './factory/portfolio';
import { propertyFactory } from './factory/property';
import { roleFactory } from './factory/role';
import { tenantFactory } from './factory/tenant';
import { unitFactory } from './factory/unit';
import { userFactory } from './factory/user';
import { isDefined } from './utils/is-defined';
import { findOrFail, random, randomCategory } from './utils/random';

// TODO use satisfies SeedCount
const defaultSeedCount = {
	portfolios: 10,
	properties: 10,
	units: 30,
	tenants: 10,
	leases: 10,
	leaseInvoices: 10,
	expenses: 10,
	payouts: 10,
};

export const createSeed = (options?: SeedOptions) => {
	const count = {
		...defaultSeedCount,
		...options?.count,
	};

	// Users
	const userAdmin = userFactory.build({
		email: testOrgEmail,
	});

	const userPortfolio = userFactory.build({
		email: testPortfolioEmail,
	});

	const userTenant = userFactory.build({
		email: testTenantEmail,
	});

	const users = [userAdmin, userPortfolio, userTenant];

	// Organizations

	const org1 = organizationFactory.build();

	const organizations = [org1];

	// Organization Settings
	const organizationSettings = organizations.map((o) =>
		organizationSettingsFactory.build({
			organizationId: o.id,
		}),
	);

	// Tenants
	const tenants = Array.from({ length: count.tenants }, () =>
		tenantFactory.build({ organizationId: org1.id }),
	);

	// Portfolios
	const portfolios = Array.from({ length: count.portfolios }, () =>
		portfolioFactory.build({ organizationId: org1.id }),
	);

	// Properties
	const properties = Array.from({ length: count.properties }, () =>
		propertyFactory.build({
			organizationId: org1.id,
			portfolioId: random(portfolios).id,
		}),
	);

	// Units
	const units = Array.from({ length: count.units }, () => {
		const property = random(properties);

		return unitFactory.build({
			organizationId: org1.id,
			portfolioId: property.portfolioId,
			propertyId: property.id,
		});
	});

	// Leases
	const leases = Array.from({ length: count.leases }, () => {
		const tenant = random(tenants);
		const property = random(properties);
		const unit = units.find((u) => u.propertyId === property.id);

		if (!unit) {
			return undefined;
		}

		return leaseFactory.build({
			organizationId: org1.id,
			tenantId: tenant.id,
			portfolioId: property.portfolioId,
			unitId: unit.id,
		});
	}).filter(isDefined);

	// Lease Invoices
	const leaseInvoices = Array.from({ length: count.leaseInvoices }, () => {
		const lease = random(leases);

		return leaseInvoiceFactory.build({
			organizationId: org1.id,
			portfolioId: lease.portfolioId,
			leaseId: lease.id,
		});
	});

	// Expense Categories
	// const expenseCategories = Array.from({ length: count.expenseCategories }, () =>
	// 	expenseCategoryFactory.build(),
	// );

	// Expenses
	const expenses = Array.from({ length: count.expenses }, () => {
		const unit = random(units);
		const property = findOrFail(properties, (p) => p.id === unit.propertyId);
		const portfolio = findOrFail(
			portfolios,
			(p) => p.id === property.portfolioId,
		);

		const organizationId = org1.id;
		const tree = organizationSettings.find(
			(s) => s.organizationId === organizationId,
		)?.expenseCategoryTree as Tree | undefined;

		if (!tree) {
			throw new Error('Expense category tree not found');
		}

		// randomly assign to either propertyId or unitId or neither
		let propertyId: string | null;
		let unitId: string | null;

		if (Math.random() < 0.5) {
			propertyId = null;
			unitId = null;
		} else if (Math.random() < 0.5) {
			propertyId = property.id;
			unitId = null;
		} else {
			propertyId = null;
			unitId = unit.id;
		}

		return expenseFactory.build({
			organizationId,
			portfolioId: portfolio.id,
			categoryId: randomCategory(tree).id,
			propertyId,
			unitId,
		});
	});

	// Payouts
	const payouts = Array.from({ length: count.payouts }, () => {
		const portfolio = random(portfolios);

		return payoutFactory.build({
			organizationId: org1.id,
			portfolioId: portfolio.id,
		});
	});

	// Roles
	const roles = [
		// Main user
		roleFactory.build({
			roleType: 'ORGADMIN',
			organizationId: org1.id,
			userId: userAdmin.id,
		}),

		roleFactory.build({
			roleType: 'PORTFOLIO',
			organizationId: org1.id,
			portfolioId: random(properties).portfolioId, // ensures data
			userId: userAdmin.id,
		}),

		roleFactory.build({
			roleType: 'TENANT',
			organizationId: org1.id,
			tenantId: random(leases).tenantId, // ensures data
			userId: userAdmin.id,
		}),

		// Portfolio user
		roleFactory.build({
			roleType: 'PORTFOLIO',
			organizationId: org1.id,
			portfolioId: random(properties).portfolioId, // ensures data
			userId: userPortfolio.id,
		}),

		// Tenant user
		roleFactory.build({
			roleType: 'TENANT',
			organizationId: org1.id,
			tenantId: random(leases).tenantId, // ensures data
			userId: userTenant.id,
		}),
	];

	const data = {
		users,
		organizations,
		organizationSettings,
		roles,
		tenants,
		portfolios,
		properties,
		units,
		leases,
		leaseInvoices,
		expenses,
		payouts,
	};

	if (options?.print) {
		console.log(inspect(data, false, null, true));
	}

	return data;
};

export type Seed = ReturnType<typeof createSeed>;

interface SeedCount {
	portfolios?: number;
	properties?: number;
	units?: number;
	tenants?: number;
	leases?: number;
	leaseInvoices?: number;
	expenses?: number;
	payouts?: number;
}

interface SeedOptions {
	count?: SeedCount;
	print?: boolean;
}
