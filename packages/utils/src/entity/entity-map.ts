import type { DBEntity, Entity, NonDBEntity } from './entity-definition';

export interface EntityNames {
	title: Entity;
	urlName: string;
	caslName?: string;
	singular: string;
	plural: string;
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
	plural: 'organizations',
	idField: 'organizationId',
} as const satisfies EntityNames;

const role = {
	title: 'role',
	urlName: 'roles',
	caslName: 'Role',
	plural: 'roles',
	singular: 'organization',
	idField: null,
} as const satisfies EntityNames;

const tenant = {
	title: 'tenant',
	urlName: 'tenants',
	caslName: 'Tenant',
	singular: 'tenant',
	plural: 'tenants',
	idField: 'tenantId',
} as const satisfies EntityNames;

const portfolio = {
	title: 'portfolio',
	urlName: 'portfolios',
	caslName: 'Portfolio',
	singular: 'owner',
	plural: 'owners',
	idField: 'portfolioId',
} as const satisfies EntityNames;

const property = {
	title: 'property',
	urlName: 'properties',
	caslName: 'Property',
	singular: 'property',
	plural: 'properties',
	idField: 'propertyId',
} as const satisfies EntityNames;

const unit = {
	title: 'unit',
	urlName: 'units',
	caslName: 'Unit',
	singular: 'unit',
	plural: 'units',
	idField: 'unitId',
} as const satisfies EntityNames;

const lease = {
	title: 'lease',
	urlName: 'leases',
	caslName: 'Lease',
	singular: 'lease',
	plural: 'leases',
	idField: 'leaseId',
} as const satisfies EntityNames;

const leaseInvoice = {
	title: 'leaseInvoice',
	urlName: 'leaseInvoices',
	caslName: 'LeaseInvoice',
	singular: 'leaseInvoice',
	plural: 'leaseInvoices',
	idField: null,
} as const satisfies EntityNames;

const expense = {
	title: 'expense',
	urlName: 'expenses',
	caslName: 'Expense',
	singular: 'expense',
	plural: 'expenses',
	idField: null,
} as const satisfies EntityNames;

const payout = {
	title: 'payout',
	urlName: 'payouts',
	caslName: 'Payout',
	singular: 'payout',
	plural: 'payouts',
	idField: null,
} as const satisfies EntityNames;

const maintenanceOrder = {
	title: 'maintenanceOrder',
	urlName: 'maintenance-orders',
	caslName: 'MaintenanceOrder',
	singular: 'maintenanceOrder',
	plural: 'maintenanceOrders',
	idField: null,
} as const satisfies EntityNames;

const expenseCategory = {
	title: 'expenseCategory',
	urlName: 'expense-categories',
	singular: 'expense category',
	plural: 'expense categories',
	idField: null,
} as const satisfies EntityNames;

const file = {
	title: 'file',
	urlName: 'files',
	singular: 'file',
	plural: 'files',
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
