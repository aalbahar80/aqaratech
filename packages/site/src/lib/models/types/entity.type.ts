import type {
	Client,
	Property,
	Unit,
	Lease,
	Tenant,
	Transaction,
	Expense,
	MaintenanceOrder,
} from '$models/classes';

export type EntityConstructor =
	| typeof Client
	| typeof Property
	| typeof Unit
	| typeof Tenant
	| typeof Lease
	| typeof Transaction
	| typeof Expense
	| typeof MaintenanceOrder;

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
