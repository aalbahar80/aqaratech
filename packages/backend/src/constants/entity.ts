import { satisfies } from 'src/utils/satisfies';

type EntityTitle =
  | 'tenants'
  | 'portfolios'
  | 'properties'
  | 'expenses'
  | 'units'
  | 'leases'
  | 'leaseInvoices'
  | 'maintenanceOrders';

export interface EntityName {
  urlName: string;
  singular: string;
  singularCap: string;
  plural: string;
  pluralCap: string;
  idField: string;
}
type EntityNameMap = Record<EntityTitle, EntityName>;
export type EntityIdField = typeof entityMap[EntityTitle]['idField'];
export type EntitySingularCap = typeof entityMap[EntityTitle]['singularCap'];

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

// change to leaseInvoice
const invoice = satisfies<EntityName>()({
  urlName: 'invoices',
  singular: 'invoice',
  singularCap: 'LeaseInvoice',
  plural: 'invoices',
  pluralCap: 'Invoices',
  idField: 'leaseInvoiceId',
});

const expense = satisfies<EntityName>()({
  urlName: 'expenses',
  singular: 'expense',
  singularCap: 'Expense',
  plural: 'expenses',
  pluralCap: 'Expenses',
  idField: 'expenseId',
});

const maintenanceOrder = satisfies<EntityName>()({
  urlName: 'maintenanceOrders',
  singular: 'maintenanceOrder',
  singularCap: 'MaintenanceOrder',
  plural: 'maintenanceOrders',
  pluralCap: 'MaintenanceOrders',
  idField: 'maintenanceOrderId',
});

export const entityMap = satisfies<EntityNameMap>()({
  tenants: tenant,
  portfolios: portfolio,
  properties: property,
  units: unit,
  expenses: expense,
  leases: lease,
  leaseInvoices: invoice,
  maintenanceOrders: maintenanceOrder,
});
