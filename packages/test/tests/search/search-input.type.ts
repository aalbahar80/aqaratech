import type { DetailsPaneItem } from './search-palette-model';

export interface SearchInput {
	queryExact: string;
	/** Ideally, the prefix should be of a word that is not the first word in the resultText. */
	queryPrefix: string;
	/** Ideally, the suffix should be of a word that is not the last word in the resultText. */
	querySuffix: string;
	resultText: string;
	keysToValidate: DetailsPaneItem[];
	type: string;
}
