import type { InferMutationInput, InferQueryOutput } from '$lib/client/trpc';
import type { z } from 'zod';
import lease from './lease';
import property from './property';
import tenant from './tenant';
import unit from './unit';
import client from './client';

const entities = [
	'tenants',
	'leases',
	'units',
	'properties',
	'clients',
] as const;
export type Entity = typeof entities[number];

export function isEntity(entity: string | Entity): entity is Entity {
	return entities.includes(entity as Entity);
}

export type EntityDefinition<T extends Entity> = {
	defaultForm: () => InferMutationInput<`${T}:save`>;
	schema: z.AnyZodObject | z.ZodEffects<any>;
	label?: (
		item:
			| InferQueryOutput<`${T extends
					| 'tenants'
					| 'units'
					| 'properties'
					| 'clients'
					? T
					: never}:search`>[number],
	) => string;
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
};

export const singular: { [K in Entity]: string } = {
	leases: 'lease',
	tenants: 'tenant',
	units: 'unit',
	properties: 'property',
	clients: 'client',
};
