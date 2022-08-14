import { satisfies } from '$lib/utils/satisfies';

export type EntityTitle =
	| 'tenant'
	| 'portfolio'
	| 'property'
	| 'unit'
	| 'lease'
	| 'leaseInvoice'
	| 'expense'
	| 'maintenanceOrder'
	| 'organization'
	| 'role'
	| 'member'
	| 'expenseCategory'
	| 'file';

export interface EntityName {
	urlName: string;
	singular: string;
	singularCap: string;
	plural: string;
	pluralCap: string;
	idField: string | null;
}
type EntityNameMap = Record<EntityTitle, EntityName>;
export type EntityIdField = typeof entityNameMap[EntityTitle]['idField'];

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

const leaseInvoice = satisfies<EntityName>()({
	urlName: 'leaseInvoices',
	singular: 'leaseInvoice',
	singularCap: 'Lease Invoice',
	plural: 'leaseInvoices',
	pluralCap: 'Lease Invoices',
	idField: null,
});

const expense = satisfies<EntityName>()({
	urlName: 'expenses',
	singular: 'expense',
	singularCap: 'Expense',
	plural: 'expenses',
	pluralCap: 'Expenses',
	idField: null,
});

const maintenanceOrder = satisfies<EntityName>()({
	urlName: 'maintenanceOrders',
	singular: 'maintenanceOrder',
	singularCap: 'Maintenance Order',
	plural: 'maintenanceOrders',
	pluralCap: 'Maintenance Orders',
	idField: null,
});

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
	plural: 'roles',
	pluralCap: 'Roles',
	singular: 'organization',
	singularCap: 'Role',
	idField: '',
});

const member = satisfies<EntityName>()({
	urlName: 'roles',
	singular: 'member',
	singularCap: 'Member',
	plural: 'members',
	pluralCap: 'Members',
	idField: '',
});

const expenseCategory = satisfies<EntityName>()({
	urlName: 'expenseCategories',
	singular: 'expense category',
	singularCap: 'Expense Category',
	plural: 'expense categories',
	pluralCap: 'Expense Categories',
	idField: '',
});

const file = satisfies<EntityName>()({
	urlName: 'files',
	singular: 'file',
	singularCap: 'File',
	plural: 'files',
	pluralCap: 'Files',
	idField: '',
});

export const entityNameMap = satisfies<EntityNameMap>()({
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
