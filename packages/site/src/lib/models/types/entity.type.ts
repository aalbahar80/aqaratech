import type {
	Client,
	Property,
	Unit,
	Lease,
	Tenant,
	Transaction,
	Expense,
	MaintenanceOrder,
} from '../classes';

export type EntityConstructor =
	| typeof Client
	| typeof Property
	| typeof Unit
	| typeof Tenant
	| typeof Lease
	| typeof Transaction
	| typeof Expense
	| typeof MaintenanceOrder;
