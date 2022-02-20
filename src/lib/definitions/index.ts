import type { InferMutationInput } from '$lib/client/trpc';
import client from './client';
import lease from './lease';
import property from './property';
import tenant from './tenant';
import transaction from './transaction';
import unit from './unit';

const entities = ['tenants', 'leases'] as const;
export type Entity = typeof entities[number];

export function isEntity(entity: string | Entity): entity is Entity {
	return entities.includes(entity as Entity);
}

type EntityDefinition = {
	defaultForm: () => InferMutationInput<'tenants:save' | 'leases:save'>;
};

type EntityDefinitions = Record<Entity, EntityDefinition>;

const entityDefinitions: EntityDefinitions = {
	// clients: client,
	// properties: property,
	// units: unit,
	leases: lease,
	tenants: tenant,
	// transactions: transaction,
};

export default entityDefinitions;
