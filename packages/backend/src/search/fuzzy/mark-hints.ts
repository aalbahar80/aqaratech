import {
	EntityRawSearchResult,
	EntitySearchResult,
	TSearchableEntity,
} from './entity-search-result';

export const markHints = <T extends TSearchableEntity>(
	result: EntitySearchResult<T>,
) => {
	const hints: Partial<EntityRawSearchResult<T>> = {};

	console.log(result);
	result.terms.forEach((term) => {
		const regexp = new RegExp(`(${term})`, 'gi');

		result.match[term]?.forEach((field) => {
			const value: unknown = result[field];

			if (typeof value === 'string') {
				// @ts-expect-error minisearch types are loose
				hints[field] = value.replace(regexp, '<mark>$1</mark>');
			}
		});
	});

	return hints;
};
