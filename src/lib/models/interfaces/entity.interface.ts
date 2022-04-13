import type { InferMutationInput, InferQueryOutput } from '$lib/client/trpc';
import type { ClientModel } from './client.interface';
import type { LeaseModel } from './lease.interface';
import type { MaintenanceOrderModel } from './maintenanceOrder.interface';
import type { PropertyModel } from './property.interface';
import type { TenantModel } from './tenant.interface';
import type { TransactionModel } from './transaction.interface';
import type { UnitModel } from './unit.interface';
import type { RelationalField } from './utils/get-model';

export type Entity =
	| 'properties'
	| 'clients'
	| 'leases'
	| 'tenants'
	| 'units'
	| 'transactions'
	| 'maintenanceOrders';
export interface IEntity<T extends Entity> {
	name: T;
	singular: string;
	plural: string;
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
	| typeof MaintenanceOrderModel;

export type GenericFormModel = Exclude<Model, typeof LeaseModel>;
