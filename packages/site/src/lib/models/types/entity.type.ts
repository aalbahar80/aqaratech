import type { Client } from '../classes/client.class';
import type { Expense } from '../classes/expense.class';
import type { Lease } from '../classes/lease.class';
import type { MaintenanceOrder } from '../classes/maintenanceOrder.class';
import type { Property } from '../classes/property.class';
import type { Tenant } from '../classes/tenant.class';
import type { Transaction } from '../classes/transaction.class';
import type { Unit } from '../classes/unit.class';

export type EntityConstructor =
	| typeof Client
	| typeof Property
	| typeof Unit
	| typeof Tenant
	| typeof Lease
	| typeof Transaction
	| typeof Expense
	| typeof MaintenanceOrder;

export type EntityInstance =
	| Client
	| Property
	| Unit
	| Tenant
	| Lease
	| Transaction
	| Expense
	| MaintenanceOrder;

export type Entity =
	| 'properties'
	| 'clients'
	| 'leases'
	| 'tenants'
	| 'units'
	| 'transactions'
	| 'expenses'
	| 'maintenanceOrders';

export type GenericFormModel = Exclude<EntityConstructor, typeof Lease>;

export type Relation =
	| 'clientId'
	| 'propertyId'
	| 'unitId'
	| 'leaseId'
	| 'tenantId';
