import type { InferMutationInput, InferQueryOutput } from '$lib/client/trpc';
import type { z } from 'zod';
import client from './client';
import lease from './lease';
import maintenanceOrder from './maintenanceOrder';
import property from './property';
import tenant from './tenant';
import transaction from './transaction';
import unit from './unit';

const entities = [
	'tenants',
	'leases',
	'units',
	'properties',
	'clients',
	'transactions',
	'maintenanceOrders',
] as const;
export type Entity = typeof entities[number];

export function isEntity(entity: string | Entity): entity is Entity {
	return entities.includes(entity as Entity);
}

export type EntityDefinition<T extends Entity> = {
	defaultForm: () => InferMutationInput<`${T}:save`>;
	schema: z.AnyZodObject | z.ZodEffects<any>;
	label: T extends 'tenants' | 'leases' | 'units' | 'properties' | 'clients'
		? (item: InferQueryOutput<`${T}:search`>[number]) => string
		: undefined;
};
type EntityDefinitions = {
	[K in Entity]: EntityDefinition<K>;
};

export const entityDefinitions: EntityDefinitions = {
	tenants: tenant,
	leases: lease,
	units: unit,
	properties: property,
	clients: client,
	transactions: transaction,
	maintenanceOrders: maintenanceOrder,
};

export const singular: { [K in Entity]: string } = {
	leases: 'lease',
	tenants: 'tenant',
	units: 'unit',
	properties: 'property',
	clients: 'client',
	transactions: 'transaction',
	maintenanceOrders: 'maintenanceOrder',
};
