import {
	EntityReturnedKeys,
	EntitySearchResult,
	TSearchableEntity,
} from './entity-search-result';

export const markHints = <T extends TSearchableEntity>(
	result: EntitySearchResult<T>,
) => {
	const hints: Partial<Record<EntityReturnedKeys<T>, string>> = {};

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
