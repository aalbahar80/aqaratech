import { Portfolio, Property, Tenant } from '@prisma/client';
import MiniSearch from 'minisearch';

import { markHints } from 'src/search/fuzzy/mark-hints';

type TSearchableEntity = Tenant | Portfolio | Property;

export const fuzzyMatch = (query: string, documents: TSearchableEntity[]) => {
	const miniSearch = new MiniSearch({
		fields: ['id', 'text', 'title', 'category', 'label', 'fullName'], // TODO: edit
		storeFields: ['id', 'text', 'title', 'category', 'label', 'fullName'], // fields to return with search results
	});

	// Index all documents
	miniSearch.addAll(documents);

	// Search with default options
	const results = miniSearch.search(query).map((n) => ({
		...n,
		hints: markHints(n),
	}));

	return results;
};
