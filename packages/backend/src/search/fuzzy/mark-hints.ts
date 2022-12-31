// @ts-nocheck
import {
	EntityReturnedKeys,
	EntitySearchResult,
	TSearchableEntity,
} from './entity-search-result';

export const markHints = <T extends TSearchableEntity>(
	result: EntitySearchResult<T>,
) => {
	const hints: Partial<Record<EntityReturnedKeys<T>, 'string'>> = {};

	result.terms.forEach((term) => {
		const regexp = new RegExp(`(${term})`, 'gi');

		result.match[term]?.forEach((field) => {
			const value: unknown = result[field];

			if (typeof value === 'string') {
				hints[field] = value.replace(regexp, '<mark>$1</mark>');
			} else if (field === 'headings') {
				const markedValue = value.reduce((items, h) => {
					if (h.title.toLowerCase().includes(term)) {
						items.push({
							id: h.id,
							title: h.title.replace(regexp, '<mark>$1</mark>'),
						});
					}
					return items;
				}, []);
				hints[field] = markedValue.length ? markedValue : null;
			}
		});
	});

	return hints;
};
