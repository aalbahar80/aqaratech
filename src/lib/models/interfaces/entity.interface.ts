import type { InferMutationInput, InferQueryOutput } from '$lib/client/trpc';
import type { z } from 'zod';
import type { PropertyModel } from './property.interface';

export type Entity = 'properties' | 'clients' | 'leases' | 'tenants';
type SearchableEntity = 'properties' | 'clients' | 'leases' | 'tenants';
export interface IEntity2<T extends Entity, K extends z.AnyZodObject> {
	singular: string;
	plural: T;
	schema: K;
	defaultForm: () => InferMutationInput<`${T}:create`>;
}

export interface Searchable<T extends SearchableEntity> {
	getLabel: (item: InferQueryOutput<`${T}:search`>[number]) => string;
}

export type Model = typeof PropertyModel;
