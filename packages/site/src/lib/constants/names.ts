import type { EntityTitle } from '$lib/models/types/entity.type';

export interface EntityName {
	urlName: string;
	singular: string;
	singularCap: string;
	plural: string;
	pluralCap: string;
	idField: string;
}

const organization: EntityName = {
	urlName: 'organizations',
	singular: 'organization',
	singularCap: 'Organization',
	plural: 'organizations',
	pluralCap: 'Organizations',
	idField: 'organizationId',
};

const role: EntityName = {
	urlName: 'roles',
	singular: 'member',
	singularCap: 'Member',
	plural: 'members',
	pluralCap: 'Members',
	idField: 'roleId',
};

// do the same for tenant,unit,property,lease,invoice,maintenanceOrder, and expense
const tenant: EntityName = {
	urlName: 'tenants',
	singular: 'tenant',
	singularCap: 'Tenant',
	plural: 'tenants',
	pluralCap: 'Tenants',
	idField: 'tenantId',
};

const portfolio: EntityName = {
	urlName: 'portfolios',
	singular: 'portfolio',
	singularCap: 'Portfolio',
	plural: 'portfolios',
	pluralCap: 'Portfolios',
	idField: 'portfolioId',
};

const property: EntityName = {
	urlName: 'properties',
	singular: 'property',
	singularCap: 'Property',
	plural: 'properties',
	pluralCap: 'Properties',
	idField: 'propertyId',
};

const unit: EntityName = {
	urlName: 'units',
	singular: 'unit',
	singularCap: 'Unit',
	plural: 'units',
	pluralCap: 'Units',
	idField: 'unitId',
};

const lease: EntityName = {
	urlName: 'leases',
	singular: 'lease',
	singularCap: 'Lease',
	plural: 'leases',
	pluralCap: 'Leases',
	idField: 'leaseId',
};

const invoice: EntityName = {
	urlName: 'invoices',
	singular: 'invoice',
	singularCap: 'Invoice',
	plural: 'invoices',
	pluralCap: 'Invoices',
	idField: 'invoiceId',
};

const expense: EntityName = {
	urlName: 'expenses',
	singular: 'expense',
	singularCap: 'Expense',
	plural: 'expenses',
	pluralCap: 'Expenses',
	idField: 'expenseId',
};

const expenseCategory: EntityName = {
	urlName: 'expenseCategories',
	singular: 'expense category',
	singularCap: 'Expense Category',
	plural: 'expense categories',
	pluralCap: 'Expense Categories',
	idField: '',
};

// const maintenanceOrder: EntityName = {
// 	urlName: 'maintenanceOrders',
// 	singular: 'maintenanceOrder',
// 	singularCap: 'MaintenanceOrder',
// 	plural: 'maintenanceOrders',
// 	pluralCap: 'MaintenanceOrders',
// 	idField: 'maintenanceOrderId',
// };

type EntityNameMap = Record<EntityTitle, EntityName>;

export const entityNameMap: EntityNameMap = {
	organizations: organization,
	roles: role,
	tenants: tenant,
	portfolios: portfolio,
	properties: property,
	units: unit,
	leases: lease,
	leaseInvoices: invoice,
	// maintenanceOrders: maintenanceOrder,
	expenses: expense,
	expenseCategories: expenseCategory,
};
