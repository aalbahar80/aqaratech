import type {
	Client,
	Expense,
	Lease,
	MaintenanceOrder,
	Property,
	Tenant,
	Transaction,
	Unit,
} from '$lib/models/classes';

export type Entity =
	| 'properties'
	| 'clients'
	| 'leases'
	| 'tenants'
	| 'units'
	| 'transactions'
	| 'expenses'
	| 'maintenanceOrders';

export type EntityClass =
	| typeof Property
	| typeof Client
	| typeof Lease
	| typeof Tenant
	| typeof Unit
	| typeof Transaction
	| typeof Expense
	| typeof MaintenanceOrder;

export type GenericFormModel = Exclude<EntityClass, typeof Lease>;
