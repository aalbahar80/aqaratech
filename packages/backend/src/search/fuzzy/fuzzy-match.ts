import MiniSearch from 'minisearch';
import * as R from 'remeda';

import { Mutable } from '@self/utils';

import {
	ALL_RETURNED_FIELDS,
	ALL_SEARCHABLE_FIELDS,
} from 'src/search/dto/searchable-fields';
import { markHints } from 'src/search/fuzzy/mark-hints';

import { TSearchableEntity } from './entity-search-result';

export const fuzzyMatch = <T extends TSearchableEntity>(
	query: string,
	documents: T[],
) => {
	const miniSearch = new MiniSearch<T>({
		// fields to index/search/highlight. Although we're only using minisearch
		// for highlighting and ranking.
		fields: ALL_SEARCHABLE_FIELDS as Mutable<typeof ALL_SEARCHABLE_FIELDS>, // TODO: edit

		// fields to return with search results
		storeFields: ALL_RETURNED_FIELDS as Mutable<typeof ALL_RETURNED_FIELDS>, // TODO: remove all except id, we merge the results later
	});

	// Index all documents
	miniSearch.addAll(documents);

	// Search with default options
	const minisearchHits = miniSearch.search(query, {
		// we are only using minisearch for ranking, so all results should be returned
		// Also, minisearch isn't great for fuzzy search: https://github.com/lucaong/minisearch/issues/67
		prefix: true, // highlight partial match
		fuzzy: true,
	});

	// map over original documents and add search metadata. This is necessary
	// because we don't want minisearch to filter out any results
	const mergedResults = documents.map((document) => {
		const hit = minisearchHits.find((n) => n.id === document.id);

		// @ts-expect-error we use a common list of returned fields
		const filtered = R.pick(document, ALL_RETURNED_FIELDS);

		return {
			...filtered,
			score: hit?.score ?? 0,
			hints: hit ? markHints(hit) : {},
		};
	});

	return mergedResults;
};
