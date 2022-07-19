import type { EntityTitle } from '$lib/models/types/entity.type';

export interface EntityName {
	urlName: string;
	singular: string;
	singularCap: string;
	plural: string;
	pluralCap: string;
}

const role: EntityName = {
	urlName: 'roles',
	singular: 'member',
	singularCap: 'Member',
	plural: 'members',
	pluralCap: 'Members',
};

// do the same for tenant,unit,property,lease,invoice,maintenanceOrder, and expense
const tenant: EntityName = {
	urlName: 'tenants',
	singular: 'tenant',
	singularCap: 'Tenant',
	plural: 'tenants',
	pluralCap: 'Tenants',
};

const portfolio: EntityName = {
	urlName: 'portfolios',
	singular: 'portfolio',
	singularCap: 'Portfolio',
	plural: 'portfolios',
	pluralCap: 'Portfolios',
};

const property: EntityName = {
	urlName: 'properties',
	singular: 'property',
	singularCap: 'Property',
	plural: 'properties',
	pluralCap: 'Properties',
};

const unit: EntityName = {
	urlName: 'units',
	singular: 'unit',
	singularCap: 'Unit',
	plural: 'units',
	pluralCap: 'Units',
};

const lease: EntityName = {
	urlName: 'leases',
	singular: 'lease',
	singularCap: 'Lease',
	plural: 'leases',
	pluralCap: 'Leases',
};

const invoice: EntityName = {
	urlName: 'invoices',
	singular: 'invoice',
	singularCap: 'Invoice',
	plural: 'invoices',
	pluralCap: 'Invoices',
};

const expense: EntityName = {
	urlName: 'expenses',
	singular: 'expense',
	singularCap: 'Expense',
	plural: 'expenses',
	pluralCap: 'Expenses',
};

const maintenanceOrder: EntityName = {
	urlName: 'maintenanceOrders',
	singular: 'maintenanceOrder',
	singularCap: 'MaintenanceOrder',
	plural: 'maintenanceOrders',
	pluralCap: 'MaintenanceOrders',
};

type EntityNameMap = Record<EntityTitle, EntityName>;

export const entityNameMap: EntityNameMap = {
	roles: role,
	tenants: tenant,
	portfolios: portfolio,
	properties: property,
	units: unit,
	leases: lease,
	leaseInvoices: invoice,
	// maintenanceOrders: maintenanceOrder,
	expenses: expense,
};
