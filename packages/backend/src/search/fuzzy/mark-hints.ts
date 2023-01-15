import { SearchResult } from 'minisearch';

export const markHints = (result: SearchResult) => {
	const hints: Record<string, string> = {};

	result.terms.forEach((term) => {
		// eslint-disable-next-line security/detect-non-literal-regexp
		const regexp = new RegExp(`(${term})`, 'gi');

		result.match[term]?.forEach((field) => {
			const value: unknown = result[field];

			if (typeof value === 'string') {
				hints[field] = value.replace(regexp, '<mark>$1</mark>');
			}
		});
	});

	return hints;
};
