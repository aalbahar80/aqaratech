import type { DBEntity, Entity, NonDBEntity } from './entity-definition';

export interface EntityNames {
	title: Entity;
	urlName: string;
	caslName?: string;
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
export type URLName = UEntityMap['urlName'];

const organization = {
	title: 'organization',
	urlName: 'organizations',
	caslName: 'Organization',
	singular: 'organization',
	singularCap: 'Organization',
	plural: 'organizations',
	pluralCap: 'Organizations',
	idField: 'organizationId',
} as const satisfies EntityNames;

const role = {
	title: 'role',
	urlName: 'roles',
	caslName: 'Role',
	plural: 'roles',
	pluralCap: 'Roles',
	singular: 'organization',
	singularCap: 'Role',
	idField: null,
} as const satisfies EntityNames;

const tenant = {
	title: 'tenant',
	urlName: 'tenants',
	caslName: 'Tenant',
	singular: 'tenant',
	singularCap: 'Tenant',
	plural: 'tenants',
	pluralCap: 'Tenants',
	idField: 'tenantId',
} as const satisfies EntityNames;

const portfolio = {
	title: 'portfolio',
	urlName: 'portfolios',
	caslName: 'Portfolio',
	singular: 'owner',
	singularCap: 'Owner',
	plural: 'owners',
	pluralCap: 'Owners',
	idField: 'portfolioId',
} as const satisfies EntityNames;

const property = {
	title: 'property',
	urlName: 'properties',
	caslName: 'Property',
	singular: 'property',
	singularCap: 'Property',
	plural: 'properties',
	pluralCap: 'Properties',
	idField: 'propertyId',
} as const satisfies EntityNames;

const unit = {
	title: 'unit',
	urlName: 'units',
	caslName: 'Unit',
	singular: 'unit',
	singularCap: 'Unit',
	plural: 'units',
	pluralCap: 'Units',
	idField: 'unitId',
} as const satisfies EntityNames;

const lease = {
	title: 'lease',
	urlName: 'leases',
	caslName: 'Lease',
	singular: 'lease',
	singularCap: 'Lease',
	plural: 'leases',
	pluralCap: 'Leases',
	idField: 'leaseId',
} as const satisfies EntityNames;

const leaseInvoice = {
	title: 'leaseInvoice',
	urlName: 'leaseInvoices',
	caslName: 'LeaseInvoice',
	singular: 'leaseInvoice',
	singularCap: 'Lease Invoice',
	plural: 'leaseInvoices',
	pluralCap: 'Lease Invoices',
	idField: null,
} as const satisfies EntityNames;

const expense = {
	title: 'expense',
	urlName: 'expenses',
	caslName: 'Expense',
	singular: 'expense',
	singularCap: 'Expense',
	plural: 'expenses',
	pluralCap: 'Expenses',
	idField: null,
} as const satisfies EntityNames;

const payout = {
	title: 'payout',
	urlName: 'payouts',
	caslName: 'Payout',
	singular: 'payout',
	singularCap: 'Payout',
	plural: 'payouts',
	pluralCap: 'Payouts',
	idField: null,
} as const satisfies EntityNames;

const maintenanceOrder = {
	title: 'maintenanceOrder',
	urlName: 'maintenance-orders',
	caslName: 'MaintenanceOrder',
	singular: 'maintenanceOrder',
	singularCap: 'Maintenance Order',
	plural: 'maintenanceOrders',
	pluralCap: 'Maintenance Orders',
	idField: null,
} as const satisfies EntityNames;

const expenseCategory = {
	title: 'expenseCategory',
	urlName: 'expense-categories',
	singular: 'expense category',
	singularCap: 'Expense Category',
	plural: 'expense categories',
	pluralCap: 'Expense Categories',
	idField: null,
} as const satisfies EntityNames;

const file = {
	title: 'file',
	urlName: 'files',
	singular: 'file',
	singularCap: 'File',
	plural: 'files',
	pluralCap: 'Files',
	idField: null,
} as const satisfies EntityNames;

export const entitiesMap = {
	tenant,
	portfolio,
	property,
	unit,
	expense,
	payout,
	lease,
	leaseInvoice,
	maintenanceOrder,
	organization,
	role,
	expenseCategory,
	file,
} as const satisfies EntityMap;
