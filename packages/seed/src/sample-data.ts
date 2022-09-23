import { Prisma } from '@prisma/client';
import {
	testOrgEmail,
	testOrgId,
	testOrgRoleId,
	testPortfolioEmail,
	testPortfolioId,
	testPortfolioRoleId,
	testTenantEmail,
	testTenantId,
	testTenantRoleId,
} from './generators';

const users = Prisma.validator<Prisma.UserCreateManyArgs['data']>()([
	{
		id: 'cb23d83d-869b-4b02-83e5-55997e3818b0',
		email: testOrgEmail,
	},
	{
		id: '9794384b-dc9e-4917-81cf-ef261c6d11eb',
		email: testPortfolioEmail,
	},
	{
		id: '89d7ff2a-b807-4041-ab7e-9afc7e27022f',
		email: testTenantEmail,
	},
]);

const roles = Prisma.validator<Prisma.RoleCreateManyArgs['data']>()([
	{
		id: testOrgRoleId,
		userId: users[0]!.id,
		organizationId: testOrgId,
		roleType: 'ORGADMIN',
	},
	{
		id: testPortfolioRoleId,
		userId: users[0]!.id,
		organizationId: testOrgId,
		roleType: 'PORTFOLIO',
		portfolioId: testPortfolioId,
	},
	{
		id: testTenantRoleId,
		userId: users[0]!.id,
		organizationId: testOrgId,
		roleType: 'TENANT',
		tenantId: testTenantId,
	},
]);

const organizations = Prisma.validator<
	Prisma.OrganizationCreateManyArgs['data']
>()([
	{
		id: testOrgId,
		fullName: 'Organization One',
		label: 'Org 1',
		isActive: true,
	},
]);

const portfolios = Prisma.validator<Prisma.PortfolioCreateManyArgs['data']>()([
	{
		id: testPortfolioId,
		organizationId: testOrgId,
		fullName: 'Portfolio One',
		label: 'Port 1',
	},
	{
		id: '23f5fb25-875b-492d-b3f2-a57db2d4bc44',
		organizationId: testOrgId,
		fullName: 'Portfolio updateable',
		label: 'Port 2',
	},
]);

const tenants = Prisma.validator<Prisma.TenantCreateManyArgs['data']>()([
	{
		id: testTenantId,
		organizationId: testOrgId,
		fullName: 'Tenant One',
		label: 'Tenant 1',
	},
	{
		id: '723c124e-b566-408e-9aa4-6d5dd3d4929e',
		organizationId: testOrgId,
		fullName: 'Tenant updateable',
		label: 'Tenant 2',
	},
]);

const properties = Prisma.validator<Prisma.PropertyCreateManyArgs['data']>()([
	{
		id: '260bd3ea-28ac-4586-a30d-3d47171ef643',
		organizationId: testOrgId,
		portfolioId: testPortfolioId,
		area: 'السالمية',
		number: '99',
	},
]);

const units = Prisma.validator<Prisma.UnitCreateManyArgs['data']>()([
	{
		id: '1df75d02-c437-4f20-a4e8-0a8754e84302',
		organizationId: testOrgId,
		portfolioId: testPortfolioId,
		propertyId: properties[0]!.id,
		unitNumber: '99',
		type: 'فيلا',
	},
]);

const leases = Prisma.validator<Prisma.LeaseCreateManyArgs['data']>()([
	{
		id: 'a7ce3151-2e4a-4eba-bbe0-5a600f23a829',
		organizationId: testOrgId,
		portfolioId: testPortfolioId,
		start: new Date('2020-01-01'),
		end: new Date('2020-12-31'),
		unitId: units[0]!.id,
		tenantId: tenants[0]!.id,
		monthlyRent: 1000,
	},
]);

const leaseInvoices = Prisma.validator<
	Prisma.LeaseInvoiceCreateManyArgs['data']
>()([
	{
		id: '2b66cc94-1ec9-4aff-a6ab-d7a9cf2b57f6',
		organizationId: testOrgId,
		portfolioId: testPortfolioId,
		leaseId: leases[0]!.id,
		amount: 1000,
		postAt: new Date('2020-01-01'),
		dueAt: new Date('2020-01-10'),
		isPaid: false,
	},
	{
		id: 'bdf188e7-1de4-46d8-a2fa-8a2158124f51',
		organizationId: testOrgId,
		portfolioId: testPortfolioId,
		leaseId: leases[0]!.id,
		amount: 1001,
		postAt: new Date('2020-01-01'),
		dueAt: new Date('2020-01-10'),
		isPaid: true,
	},
	{
		id: '8190bf8d-9f18-439c-b087-31ea4950a13d',
		organizationId: testOrgId,
		portfolioId: testPortfolioId,
		leaseId: leases[0]!.id,
		amount: 1002,
		postAt: new Date('2020-01-01'),
		dueAt: new Date('2020-01-10'),
		isPaid: true,
	},
]);

const expenses = Prisma.validator<Prisma.ExpenseCreateManyArgs['data']>()([
	{
		id: 'c8a63068-8123-4a4a-84be-c4f61e12a47e',
		organizationId: testOrgId,
		portfolioId: testPortfolioId,
		amount: 284,
		postAt: new Date('2020-01-01'),
		memo: 'Expense One',
	},
	{
		id: '5710b05b-bdaf-4a99-9aeb-0a8565986134',
		organizationId: testOrgId,
		portfolioId: testPortfolioId,
		amount: 429,
		postAt: new Date('2020-03-21'),
		memo: 'Expense Two',
	},
]);

const payouts = Prisma.validator<Prisma.PayoutCreateManyArgs['data']>()([
	{
		id: '63f91b49-b257-4dc7-ab09-2f253b7aec3c',
		organizationId: testOrgId,
		portfolioId: testPortfolioId,
		amount: 381,
		postAt: new Date('2020-01-04'),
	},
	{
		id: '03388e4d-cfda-4854-ab5c-0a4bcb9d704a',
		organizationId: testOrgId,
		portfolioId: testPortfolioId,
		amount: 22,
		postAt: new Date('2020-04-02'),
	},
]);

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
};
