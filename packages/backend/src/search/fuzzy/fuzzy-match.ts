import { Portfolio, Property, Tenant } from '@prisma/client';
import MiniSearch from 'minisearch';

import { ALL_SEARCHABLE_FIELDS } from 'src/search/dto/searchable-fields';
import { markHints } from 'src/search/fuzzy/mark-hints';

type TSearchableEntity = Tenant | Portfolio | Property;

export const fuzzyMatch = (query: string, documents: TSearchableEntity[]) => {
	const miniSearch = new MiniSearch({
		fields: ALL_SEARCHABLE_FIELDS, // TODO: edit
		storeFields: ['id', ...ALL_SEARCHABLE_FIELDS], // fields to return with search results
	});

	// Index all documents
	miniSearch.addAll(documents);

	// Search with default options
	const results = miniSearch
		.search(query, {
			// we are only using minisearch for ranking, so all results should be returned
			prefix: true, // highlight partial match
		})
		.map((n) => ({
			...n,
			hints: markHints(n),
		}));

	return results;
};
