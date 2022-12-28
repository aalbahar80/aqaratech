// @ts-nocheck
import { SearchResult } from 'minisearch';

export const markHints = (result: SearchResult) => {
	const hints = {};

	result.terms.forEach((term) => {
		const regexp = new RegExp(`(${term})`, 'gi');

		result.match[term].forEach((field) => {
			const value = result[field];

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
