import type { InferMutationInput } from '$lib/client/trpc';
import lease from './lease';
import tenant from './tenant';

const entities = ['tenants', 'leases'] as const;
export type Entity = typeof entities[number];

export function isEntity(entity: string | Entity): entity is Entity {
	return entities.includes(entity as Entity);
}

type EntityDefinition<T extends Entity> = {
	defaultForm: () => InferMutationInput<`${T}:save`>;
};

type EntityDefinitions = {
	[K in Entity]: EntityDefinition<K>;
};

const entityDefinitions: EntityDefinitions = {
	leases: lease,
	tenants: tenant,
};

export default entityDefinitions;
