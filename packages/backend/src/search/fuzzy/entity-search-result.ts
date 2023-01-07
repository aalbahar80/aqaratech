import { Tenant, Portfolio, Property } from '@prisma/client';
import { SearchResult } from 'minisearch';

import { ALL_RETURNED_FIELDS } from '../dto/searchable-fields';

export type TSearchableEntity = Tenant | Portfolio | Property;

/** Represents any fields of entity that are returned with search results */
export type EntityReturnedKeys<T extends TSearchableEntity> = Extract<
	keyof T,
	(typeof ALL_RETURNED_FIELDS)[number]
>;

/** Represents the raw search result of a single entity, without metadata added
 * by minisearch */
export type EntityRawSearchResult<T extends TSearchableEntity> = {
	[key in EntityReturnedKeys<T>]: T[key];
};

/** Represents the final search result of a single entity, including metadata
 * added by minisearch */
export type EntitySearchResult<
	T extends TSearchableEntity = TSearchableEntity,
> = SearchResult & Pick<T, EntityReturnedKeys<T>>;
