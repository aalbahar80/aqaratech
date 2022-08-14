import { Entity } from "./entity";
import { satisfies } from "./satisfies";

export interface EntityNames {
	urlName: string;
	singular: string;
	singularCap: string;
	plural: string;
	pluralCap: string;
	idField: string | null;
}

type EntitiesMap = Record<Entity, EntityNames>;
export type EntityIdField = typeof entitiesMap[Entity]["idField"];

const organization = satisfies<EntityNames>()({
	urlName: "organizations",
	singular: "organization",
	singularCap: "Organization",
	plural: "organizations",
	pluralCap: "Organizations",
	idField: "organizationId",
});

const role = satisfies<EntityNames>()({
	urlName: "roles",
	plural: "roles",
	pluralCap: "Roles",
	singular: "organization",
	singularCap: "Role",
	idField: null,
});

const member = satisfies<EntityNames>()({
	urlName: "roles",
	singular: "member",
	singularCap: "Member",
	plural: "members",
	pluralCap: "Members",
	idField: null,
});

const tenant = satisfies<EntityNames>()({
	urlName: "tenants",
	singular: "tenant",
	singularCap: "Tenant",
	plural: "tenants",
	pluralCap: "Tenants",
	idField: "tenantId",
});

const portfolio = satisfies<EntityNames>()({
	urlName: "portfolios",
	singular: "portfolio",
	singularCap: "Portfolio",
	plural: "portfolios",
	pluralCap: "Portfolios",
	idField: "portfolioId",
});

const property = satisfies<EntityNames>()({
	urlName: "properties",
	singular: "property",
	singularCap: "Property",
	plural: "properties",
	pluralCap: "Properties",
	idField: "propertyId",
});

const unit = satisfies<EntityNames>()({
	urlName: "units",
	singular: "unit",
	singularCap: "Unit",
	plural: "units",
	pluralCap: "Units",
	idField: "unitId",
});

const lease = satisfies<EntityNames>()({
	urlName: "leases",
	singular: "lease",
	singularCap: "Lease",
	plural: "leases",
	pluralCap: "Leases",
	idField: "leaseId",
});

const leaseInvoice = satisfies<EntityNames>()({
	urlName: "leaseInvoices",
	singular: "leaseInvoice",
	singularCap: "Lease Invoice",
	plural: "leaseInvoices",
	pluralCap: "Lease Invoices",
	idField: null,
});

const expense = satisfies<EntityNames>()({
	urlName: "expenses",
	singular: "expense",
	singularCap: "Expense",
	plural: "expenses",
	pluralCap: "Expenses",
	idField: null,
});

const maintenanceOrder = satisfies<EntityNames>()({
	urlName: "maintenanceOrders",
	singular: "maintenanceOrder",
	singularCap: "Maintenance Order",
	plural: "maintenanceOrders",
	pluralCap: "Maintenance Orders",
	idField: null,
});

const expenseCategory = satisfies<EntityNames>()({
	urlName: "expenseCategories",
	singular: "expense category",
	singularCap: "Expense Category",
	plural: "expense categories",
	pluralCap: "Expense Categories",
	idField: null,
});

const file = satisfies<EntityNames>()({
	urlName: "files",
	singular: "file",
	singularCap: "File",
	plural: "files",
	pluralCap: "Files",
	idField: null,
});

export const entitiesMap = satisfies<EntitiesMap>()({
	tenant,
	portfolio,
	property,
	unit,
	expense,
	lease,
	leaseInvoice,
	maintenanceOrder,
	organization,
	role,
	member,
	expenseCategory,
	file,
});
