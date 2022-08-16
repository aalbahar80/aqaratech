import { Prisma } from "@prisma/client";
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
} from "./generators";

const users = Prisma.validator<Prisma.UserCreateManyArgs["data"]>()([
	{
		id: "cb23d83d-869b-4b02-83e5-55997e3818b0",
		email: testOrgEmail,
	},
	{
		id: "9794384b-dc9e-4917-81cf-ef261c6d11eb",
		email: testPortfolioEmail,
	},
	{
		id: "89d7ff2a-b807-4041-ab7e-9afc7e27022f",
		email: testTenantEmail,
	},
]);

const roles = Prisma.validator<Prisma.RoleCreateManyArgs["data"]>()([
	{
		id: testOrgRoleId,
		userId: users[0]!.id,
		organizationId: testOrgId,
		roleType: "ORGADMIN",
	},
	{
		id: testPortfolioRoleId,
		userId: users[0]!.id,
		organizationId: testOrgId,
		roleType: "PORTFOLIO",
		portfolioId: testPortfolioId,
	},
	{
		id: testTenantRoleId,
		userId: users[0]!.id,
		organizationId: testOrgId,
		roleType: "TENANT",
		tenantId: testTenantId,
	},
]);

const organizations = Prisma.validator<
	Prisma.OrganizationCreateManyArgs["data"]
>()([
	{
		id: testOrgId,
		fullName: "Organization One",
		label: "Org 1",
		isActive: true,
	},
]);

const portfolios = Prisma.validator<Prisma.PortfolioCreateManyArgs["data"]>()([
	{
		id: testPortfolioId,
		organizationId: testOrgId,
		fullName: "Portfolio One",
		label: "Port 1",
	},
]);

const tenants = Prisma.validator<Prisma.TenantCreateManyArgs["data"]>()([
	{
		id: testTenantId,
		organizationId: testOrgId,
		fullName: "Tenant One",
		label: "Tenant 1",
	},
]);

const properties = Prisma.validator<Prisma.PropertyCreateManyArgs["data"]>()([
	{
		id: "260bd3ea-28ac-4586-a30d-3d47171ef643",
		organizationId: testOrgId,
		portfolioId: testPortfolioId,
		area: "السالمية",
		number: "99",
	},
]);

const units = Prisma.validator<Prisma.UnitCreateManyArgs["data"]>()([
	{
		id: "1df75d02-c437-4f20-a4e8-0a8754e84302",
		organizationId: testOrgId,
		portfolioId: testPortfolioId,
		propertyId: properties[0]!.id,
		unitNumber: "99",
		type: "فيلا",
	},
]);

// id: "a7ce3151-2e4a-4eba-bbe0-5a600f23a829",
// id: "2b66cc94-1ec9-4aff-a6ab-d7a9cf2b57f6",

export const sample = {
	users,
	roles,
	organizations,
	tenants,
	portfolios,
	properties,
	units,
};
