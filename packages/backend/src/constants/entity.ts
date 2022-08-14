import { satisfies } from 'src/utils/satisfies';

type EntityTitle =
  | 'tenant'
  | 'portfolio'
  | 'property'
  | 'unit'
  | 'lease'
  | 'leaseInvoice'
  | 'expense'
  | 'maintenanceOrder';

export interface EntityName {
  urlName: string;
  singular: string;
  singularCap: string;
  plural: string;
  pluralCap: string;
  idField: string | null;
}

type EntityNameMap = Record<EntityTitle, EntityName>;
export type EntityIdField = typeof entityMap[EntityTitle]['idField'];
export type EntitySingularCap = typeof entityMap[EntityTitle]['singularCap'];
export type EntitySingular = typeof entityMap[EntityTitle]['singular'];

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

export const entityMap = satisfies<EntityNameMap>()({
  tenant,
  portfolio,
  property,
  unit,
  expense,
  lease,
  leaseInvoice,
  maintenanceOrder,
});
