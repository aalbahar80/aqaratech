import type { InferMutationInput } from '$lib/client/trpc';
import type { ClientModel } from './client.interface';
import type { ExpenseModel } from './expense.interface';
import type { LeaseModel } from './lease.interface';
import type { MaintenanceOrderModel } from './maintenanceOrder.interface';
import type { PropertyModel } from './property.interface';
import type { TenantModel } from './tenant.interface';
import type { TransactionModel } from './transaction.interface';
import type { UnitModel } from './unit.interface';

export type Entity =
	| 'properties'
	| 'clients'
	| 'leases'
	| 'tenants'
	| 'units'
	| 'transactions'
	| 'expenses'
	| 'maintenanceOrders';
export interface IEntity<T extends Entity> {
	name: T;
	singular: string;
	singularCap: string;
	plural: string;
	pluralCap: string;
	defaultForm: () => InferMutationInput<`${T}:create`>;
	// dropdowns: [''];
}

export type Model =
	| typeof PropertyModel
	| typeof UnitModel
	| typeof LeaseModel
	| typeof ClientModel
	| typeof TenantModel
	| typeof TransactionModel
	| typeof ExpenseModel
	| typeof MaintenanceOrderModel;

export type GenericFormModel = Exclude<Model, typeof LeaseModel>;
