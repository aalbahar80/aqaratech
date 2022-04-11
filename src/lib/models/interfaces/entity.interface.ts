import type { InferMutationInput, InferQueryOutput } from '$lib/client/trpc';
import type { z } from 'zod';
import type { ClientModel } from './client.interface';
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
	| 'maintenanceOrders';
type SearchableEntity = 'properties' | 'clients' | 'leases' | 'tenants';
export interface IEntity<T extends Entity, K extends z.AnyZodObject> {
	singular: string;
	plural: T;
	schema: K;
	defaultForm: () => InferMutationInput<`${T}:create`>;
	getLabel: (item: InferQueryOutput<`${T}:basic`>) => string;
	// dropdowns: [''];
}

export interface Searchable<T extends SearchableEntity> {
	getLabel: (item: InferQueryOutput<`${T}:search`>[number]) => string;
}

export type Model =
	| typeof PropertyModel
	| typeof UnitModel
	| typeof LeaseModel
	| typeof ClientModel
	| typeof TenantModel
	| typeof TransactionModel
	| typeof MaintenanceOrderModel;
