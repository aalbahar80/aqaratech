import type { InferMutationInput } from '$lib/client/trpc';
import type { z } from 'zod';
import lease from './lease';
import tenant from './tenant';

const entities = ['tenants', 'leases'] as const;
export type Entity = typeof entities[number];

export function isEntity(entity: string | Entity): entity is Entity {
	return entities.includes(entity as Entity);
}

type EntityDefinition<T extends Entity> = {
	defaultForm: () => InferMutationInput<`${T}:save`>;
	schema: z.AnyZodObject;
};

type EntityDefinitions = {
	[K in Entity]: EntityDefinition<K>;
};

export const entityDefinitions: EntityDefinitions = {
	tenants: tenant,
	leases: lease,
};

export const singular: { [K in Entity]: string } = {
	leases: 'lease',
	tenants: 'tenant',
};
