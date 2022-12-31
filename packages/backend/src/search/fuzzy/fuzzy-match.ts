import { Portfolio, Property, Tenant } from '@prisma/client';
import MiniSearch, { SearchResult } from 'minisearch';

import { Mutable } from '@self/utils';

import {
	ALL_RETURNED_FIELDS,
	ALL_SEARCHABLE_FIELDS,
} from 'src/search/dto/searchable-fields';
import { markHints } from 'src/search/fuzzy/mark-hints';

type TSearchableEntity = Tenant | Portfolio | Property;

export const fuzzyMatch = <T extends TSearchableEntity>(
	query: string,
	documents: T[],
) => {
	const miniSearch = new MiniSearch<T>({
		// fields to index/search/highlight. Although we're only using minisearch
		// for highlighting and ranking.
		fields: ALL_SEARCHABLE_FIELDS as Mutable<typeof ALL_SEARCHABLE_FIELDS>, // TODO: edit

		// fields to return with search results
		storeFields: ALL_RETURNED_FIELDS as Mutable<typeof ALL_RETURNED_FIELDS>,
	});

	// Index all documents
	miniSearch.addAll(documents);

	// Search with default options
	const results = miniSearch
		.search(query, {
			// we are only using minisearch for ranking, so all results should be returned
			prefix: true, // highlight partial match
		})
		.map(
			// @ts-expect-error minisearch types are loose
			(
				n: SearchResult &
					// Represents any fields of entity that are returned with search results
					Pick<T, Extract<keyof T, typeof ALL_SEARCHABLE_FIELDS[number]>>,
			) => ({
				...n,
				hints: markHints(n),
			}),
		);

	return results;
};
