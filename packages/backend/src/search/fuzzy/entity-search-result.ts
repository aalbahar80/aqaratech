import { Tenant, Portfolio, Property } from '@prisma/client';
import { SearchResult } from 'minisearch';

import { ALL_RETURNED_FIELDS } from '../dto/searchable-fields';

export type TSearchableEntity = Tenant | Portfolio | Property;

/** Represents any fields of entity that are returned with search results */
export type EntityReturnedKeys<T extends TSearchableEntity> = Extract<
	keyof T,
	typeof ALL_RETURNED_FIELDS[number]
>;

/** Represents the search result of a single entity */
export type EntitySearchResult<
	T extends TSearchableEntity = TSearchableEntity,
> = SearchResult & Pick<T, EntityReturnedKeys<T>>;
