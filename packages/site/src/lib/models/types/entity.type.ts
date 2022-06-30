import type { Portfolio } from '../classes/portfolio.class';
import type { Expense } from '../classes/expense.class';
import type { Lease } from '../classes/lease.class';
import type { MaintenanceOrder } from '../classes/maintenanceOrder.class';
import type { Property } from '../classes/property.class';
import type { Tenant } from '../classes/tenant.class';
import type { Transaction } from '../classes/transaction.class';
import type { Unit } from '../classes/unit.class';

export type EntityConstructor =
	| typeof Portfolio
	| typeof Property
	| typeof Unit
	| typeof Tenant
	| typeof Lease
	| typeof Transaction
	| typeof Expense
	| typeof MaintenanceOrder;

export type EntityInstance =
	| Portfolio
	| Property
	| Unit
	| Tenant
	| Lease
	| Transaction
	| Expense
	| MaintenanceOrder;

export type EntityTitle =
	| 'properties'
	| 'portfolios'
	| 'leases'
	| 'tenants'
	| 'units'
	| 'leaseInvoices'
	| 'expenses';
// | 'maintenanceOrders';

export type GenericFormModel = Exclude<EntityConstructor, typeof Lease>;

export type Relation =
	| 'portfolioId'
	| 'propertyId'
	| 'unitId'
	| 'leaseId'
	| 'tenantId';
