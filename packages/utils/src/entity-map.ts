import { DBEntity, Entity, NonDBEntity } from "./entity";
import { satisfies } from "./satisfies";

export interface EntityNames {
	urlName: string;
	singular: string;
	singularCap: string;
	plural: string;
	pluralCap: string;
	idField: string | null;
}
type EntityMap = Record<Entity, EntityNames>;

export type EntitiesMap<T extends Entity> = typeof entitiesMap[T];
export type DBEntitiesMap = EntitiesMap<DBEntity>;
export type NonDBEntitiesMap = EntitiesMap<NonDBEntity>;

export type UEntityMap = typeof entitiesMap[keyof typeof entitiesMap];
export type URLName = UEntityMap["urlName"];

const organization = satisfies<EntityNames>()({
	urlName: "organizations",
	caslName: "Organization",
	singular: "organization",
	singularCap: "Organization",
	plural: "organizations",
	pluralCap: "Organizations",
	idField: "organizationId",
});

const role = satisfies<EntityNames>()({
	urlName: "roles",
	caslName: "Role",
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
	caslName: "Tenant",
	singular: "tenant",
	singularCap: "Tenant",
	plural: "tenants",
	pluralCap: "Tenants",
	idField: "tenantId",
});

const portfolio = satisfies<EntityNames>()({
	urlName: "portfolios",
	caslName: "Portfolio",
	singular: "portfolio",
	singularCap: "Portfolio",
	plural: "portfolios",
	pluralCap: "Portfolios",
	idField: "portfolioId",
});

const property = satisfies<EntityNames>()({
	urlName: "properties",
	caslName: "Property",
	singular: "property",
	singularCap: "Property",
	plural: "properties",
	pluralCap: "Properties",
	idField: "propertyId",
});

const unit = satisfies<EntityNames>()({
	urlName: "units",
	caslName: "Unit",
	singular: "unit",
	singularCap: "Unit",
	plural: "units",
	pluralCap: "Units",
	idField: "unitId",
});

const lease = satisfies<EntityNames>()({
	urlName: "leases",
	caslName: "Lease",
	singular: "lease",
	singularCap: "Lease",
	plural: "leases",
	pluralCap: "Leases",
	idField: "leaseId",
});

const leaseInvoice = satisfies<EntityNames>()({
	urlName: "leaseInvoices",
	caslName: "LeaseInvoice",
	singular: "leaseInvoice",
	singularCap: "Lease Invoice",
	plural: "leaseInvoices",
	pluralCap: "Lease Invoices",
	idField: null,
});

const expense = satisfies<EntityNames>()({
	urlName: "expenses",
	caslName: "Expense",
	singular: "expense",
	singularCap: "Expense",
	plural: "expenses",
	pluralCap: "Expenses",
	idField: null,
});

const maintenanceOrder = satisfies<EntityNames>()({
	urlName: "maintenanceOrders",
	caslName: "MaintenanceOrder",
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

export const entitiesMap = satisfies<EntityMap>()({
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
