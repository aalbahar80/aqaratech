import type { EntityTitle } from '$lib/models/types/entity.type';
import { satisfies } from '$lib/utils/satisfies';

export interface EntityName {
	urlName: string;
	singular: string;
	singularCap: string;
	plural: string;
	pluralCap: string;
	idField: string;
}
type EntityNameMap = Record<EntityTitle, EntityName>;
export type EntityIdField = typeof entityNameMap[EntityTitle]['idField'];

const organization = satisfies<EntityName>()({
	urlName: 'organizations',
	singular: 'organization',
	singularCap: 'Organization',
	plural: 'organizations',
	pluralCap: 'Organizations',
	idField: 'organizationId',
});

const role = satisfies<EntityName>()({
	urlName: 'roles',
	singular: 'member',
	singularCap: 'Member',
	plural: 'members',
	pluralCap: 'Members',
	idField: 'roleId',
});

// do the same for tenant,unit,property,lease,invoice,maintenanceOrder, and expense
const tenant = satisfies<EntityName>()({
	urlName: 'tenants',
	singular: 'tenant',
	singularCap: 'Tenant',
	plural: 'tenants',
	pluralCap: 'Tenants',
	idField: 'tenantId',
});

const portfolio = satisfies<EntityName>()({
	urlName: 'portfolios',
	singular: 'portfolio',
	singularCap: 'Portfolio',
	plural: 'portfolios',
	pluralCap: 'Portfolios',
	idField: 'portfolioId',
});

const property = satisfies<EntityName>()({
	urlName: 'properties',
	singular: 'property',
	singularCap: 'Property',
	plural: 'properties',
	pluralCap: 'Properties',
	idField: 'propertyId',
});

const unit = satisfies<EntityName>()({
	urlName: 'units',
	singular: 'unit',
	singularCap: 'Unit',
	plural: 'units',
	pluralCap: 'Units',
	idField: 'unitId',
});

const lease = satisfies<EntityName>()({
	urlName: 'leases',
	singular: 'lease',
	singularCap: 'Lease',
	plural: 'leases',
	pluralCap: 'Leases',
	idField: 'leaseId',
});

const invoice = satisfies<EntityName>()({
	urlName: 'invoices',
	singular: 'invoice',
	singularCap: 'Invoice',
	plural: 'invoices',
	pluralCap: 'Invoices',
	idField: 'invoiceId',
});

const expense = satisfies<EntityName>()({
	urlName: 'expenses',
	singular: 'expense',
	singularCap: 'Expense',
	plural: 'expenses',
	pluralCap: 'Expenses',
	idField: 'expenseId',
});

const expenseCategory = satisfies<EntityName>()({
	urlName: 'expenseCategories',
	singular: 'expense category',
	singularCap: 'Expense Category',
	plural: 'expense categories',
	pluralCap: 'Expense Categories',
	idField: '',
});

// const maintenanceOrder = satisfies<EntityName>()({
// 	urlName: 'maintenanceOrders',
// 	singular: 'maintenanceOrder',
// 	singularCap: 'MaintenanceOrder',
// 	plural: 'maintenanceOrders',
// 	pluralCap: 'MaintenanceOrders',
// 	idField: 'maintenanceOrderId',
// });

const file = satisfies<EntityName>()({
	urlName: 'files',
	singular: 'file',
	singularCap: 'File',
	plural: 'files',
	pluralCap: 'Files',
	idField: '',
});

export const entityNameMap = satisfies<EntityNameMap>()({
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
	files: file,
});
