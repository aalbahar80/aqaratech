import { expenseFactory } from './factory/expense';
import { leaseFactory } from './factory/lease';
import { leaseInvoiceFactory } from './factory/lease-invoice';
import { organizationFactory } from './factory/organization';
import { payoutFactory } from './factory/payout';
import { portfolioFactory } from './factory/portfolio';
import { propertyFactory } from './factory/property';
import { roleFactory } from './factory/role';
import { tenantFactory } from './factory/tenant';
import { unitFactory } from './factory/unit';
import { userFactory } from './factory/user';
import {
	testOrgEmail,
	testPortfolioEmail,
	testTenantEmail,
} from './generators';
import { isDefined } from './utils/is-defined';
import { random } from './utils/random';

export const createSeed = () => {
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

	// Roles
	const roles = [
		roleFactory.build({
			roleType: 'ORGADMIN',
			organizationId: org1.id,
			userId: userAdmin.id,
		}),
		roleFactory.build({
			roleType: 'PORTFOLIO',
			organizationId: org1.id,
			userId: userPortfolio.id,
		}),
		roleFactory.build({
			roleType: 'TENANT',
			organizationId: org1.id,
			userId: userTenant.id,
		}),
	];

	// Tenants
	const tenants = Array.from({ length: 10 }, () =>
		tenantFactory.build({ organizationId: org1.id }),
	);

	// Portfolios
	const portfolios = Array.from({ length: 10 }, () =>
		portfolioFactory.build({ organizationId: org1.id }),
	);

	// Properties
	const properties = Array.from({ length: 10 }, () =>
		propertyFactory.build({
			organizationId: org1.id,
			portfolioId: random(portfolios).id,
		}),
	);

	// Units
	const units = Array.from({ length: 10 }, () => {
		const property = random(properties);

		return unitFactory.build({
			organizationId: org1.id,
			portfolioId: property.portfolioId,
			propertyId: property.id,
		});
	});

	// Leases
	const leases = Array.from({ length: 10 }, () => {
		const tenant = random(tenants);
		const property = random(properties);
		const unit = units.find((u) => u.propertyId === property.id);

		if (!unit) {
			console.log('No unit found for property. Skipping lease.');
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
	const leaseInvoices = Array.from({ length: 10 }, () => {
		const lease = random(leases);

		return leaseInvoiceFactory.build({
			organizationId: org1.id,
			portfolioId: lease.portfolioId,
			leaseId: lease.id,
		});
	});

	// Expense Categories
	// const expenseCategories = Array.from({ length: 10 }, () =>
	// 	expenseCategoryFactory.build(),
	// );

	// Expenses
	const expenses = Array.from({ length: 10 }, () => {
		const portfolio = random(portfolios);

		return expenseFactory.build({
			organizationId: org1.id,
			portfolioId: portfolio.id,
		});
	});

	// Payouts
	const payouts = Array.from({ length: 10 }, () => {
		const portfolio = random(portfolios);

		return payoutFactory.build({
			organizationId: org1.id,
			portfolioId: portfolio.id,
		});
	});

	return {
		users,
		organizations,
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
};

export type Seed = ReturnType<typeof createSeed>;
