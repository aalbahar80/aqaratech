import {
	testOrgEmail,
	testOrgId,
	testOrgRoleId,
	testOrgUserId,
	testPortfolioEmail,
	testPortfolioId,
	testPortfolioRoleId,
	testPortfolioUserId,
	testTenantEmail,
	testTenantId,
	testTenantRoleId,
	testTenantUserId,
} from './constant/ids.constant';
import {
	expenseFactory,
	leaseFactory,
	leaseInvoiceFactory,
	maintenanceOrderFactory,
	organizationFactory,
	payoutFactory,
	portfolioFactory,
	propertyFactory,
	roleFactory,
	tenantFactory,
	unitFactory,
} from './factory';
import { userFactory } from './factory/user';

const users = [
	userFactory.build({
		id: testOrgUserId,
		email: testOrgEmail,
	}),
	userFactory.build({
		id: testPortfolioUserId,
		email: testPortfolioEmail,
	}),
	userFactory.build({
		id: testTenantUserId,
		email: testTenantEmail,
	}),
] as const;

const roles = [
	roleFactory.build({
		id: testOrgRoleId,
		userId: users[0]!.id,
		organizationId: testOrgId,
		roleType: 'ORGADMIN',
	}),
	roleFactory.build({
		id: testPortfolioRoleId,
		userId: users[0]!.id,
		organizationId: testOrgId,
		roleType: 'PORTFOLIO',
		portfolioId: testPortfolioId,
	}),
	roleFactory.build({
		id: testTenantRoleId,
		userId: users[0]!.id,
		organizationId: testOrgId,
		roleType: 'TENANT',
		tenantId: testTenantId,
	}),
] as const;

const organizations = [
	organizationFactory.build({
		id: testOrgId,
		fullName: 'Organization One',
		label: 'Org 1',
		isActive: true,
	}),
] as const;

const portfolios = [
	portfolioFactory.build({
		id: testPortfolioId,
		organizationId: testOrgId,
		fullName: 'Portfolio One',
		label: 'Port 1',
	}),
	portfolioFactory.build({
		id: '23f5fb25-875b-492d-b3f2-a57db2d4bc44',
		organizationId: testOrgId,
		fullName: 'Portfolio updateable',
		label: 'Port 2',
	}),
] as const;

const tenants = [
	tenantFactory.build({
		id: testTenantId,
		organizationId: testOrgId,
		fullName: 'Tenant One',
		label: 'Tenant 1',
	}),
	tenantFactory.build({
		id: '723c124e-b566-408e-9aa4-6d5dd3d4929e',
		organizationId: testOrgId,
		fullName: 'Tenant updateable',
		label: 'Tenant 2',
	}),
] as const;

const properties = [
	propertyFactory.build({
		id: '260bd3ea-28ac-4586-a30d-3d47171ef643',
		organizationId: testOrgId,
		portfolioId: testPortfolioId,
		area: 'السالمية',
		number: '99',
	}),
] as const;

const units = [
	unitFactory.build({
		id: '1df75d02-c437-4f20-a4e8-0a8754e84302',
		organizationId: testOrgId,
		portfolioId: testPortfolioId,
		propertyId: properties[0]!.id,
		unitNumber: '99',
		type: 'فيلا',
	}),
] as const;

const leases = [
	leaseFactory.build({
		id: 'a7ce3151-2e4a-4eba-bbe0-5a600f23a829',
		organizationId: testOrgId,
		portfolioId: testPortfolioId,
		start: new Date('2020-01-01'),
		end: new Date('2020-12-31'),
		unitId: units[0]!.id,
		tenantId: tenants[0]!.id,
		monthlyRent: 1000,
	}),
] as const;

const leaseInvoices = [
	leaseInvoiceFactory.build({
		id: '2b66cc94-1ec9-4aff-a6ab-d7a9cf2b57f6',
		organizationId: testOrgId,
		portfolioId: testPortfolioId,
		leaseId: leases[0]!.id,
		amount: 1000,
		postAt: new Date('2020-01-01'),
		dueAt: new Date('2020-01-10'),
		isPaid: false,
	}),
	leaseInvoiceFactory.build({
		id: 'bdf188e7-1de4-46d8-a2fa-8a2158124f51',
		organizationId: testOrgId,
		portfolioId: testPortfolioId,
		leaseId: leases[0]!.id,
		amount: 1001,
		postAt: new Date('2020-01-01'),
		dueAt: new Date('2020-01-10'),
		isPaid: true,
	}),
	leaseInvoiceFactory.build({
		id: '8190bf8d-9f18-439c-b087-31ea4950a13d',
		organizationId: testOrgId,
		portfolioId: testPortfolioId,
		leaseId: leases[0]!.id,
		amount: 1002,
		postAt: new Date('2020-01-01'),
		dueAt: new Date('2020-01-10'),
		isPaid: true,
	}),
] as const;

const expenses = [
	expenseFactory.build({
		id: 'c8a63068-8123-4a4a-84be-c4f61e12a47e',
		organizationId: testOrgId,
		portfolioId: testPortfolioId,
		amount: 284,
		postAt: new Date('2020-01-01'),
		memo: 'Expense One',
	}),
	expenseFactory.build({
		id: '5710b05b-bdaf-4a99-9aeb-0a8565986134',
		organizationId: testOrgId,
		portfolioId: testPortfolioId,
		amount: 429,
		postAt: new Date('2020-03-21'),
		memo: 'Expense Two',
	}),
] as const;

const payouts = [
	payoutFactory.build({
		id: '63f91b49-b257-4dc7-ab09-2f253b7aec3c',
		organizationId: testOrgId,
		portfolioId: testPortfolioId,
		amount: 381,
		postAt: new Date('2020-01-04'),
	}),
	payoutFactory.build({
		id: '03388e4d-cfda-4854-ab5c-0a4bcb9d704a',
		organizationId: testOrgId,
		portfolioId: testPortfolioId,
		amount: 22,
		postAt: new Date('2020-04-02'),
	}),
] as const;

const maintenanceOrders = [
	maintenanceOrderFactory.build({
		id: '3a201a68-7576-4044-bbaa-8fba3a3dc897',
		organizationId: testOrgId,
		portfolioId: testPortfolioId,
	}),
] as const;

export const sample = {
	users,
	roles,
	organizations,
	tenants,
	portfolios,
	properties,
	units,
	leases,
	leaseInvoices,
	expenses,
	payouts,
	maintenanceOrders,
};
