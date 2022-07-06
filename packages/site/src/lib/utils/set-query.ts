export interface UrlQuery {
	title: string;
	value: any;
}

/**
 * Handles the query string of a URL.
 * Adds new queries to existing ones.
 * Unless `null` is passed as a value.
 */
export const getQuery = ({
	url,
	queries = [],
}: {
	url: URL;
	queries?: UrlQuery[];
}): URL => {
	const newUrl = new URL(url);

	for (let { title, value } of queries) {
		if (!value) {
			newUrl.searchParams.delete(title);
			return newUrl;
		}

		if (typeof value !== 'string') {
			value = JSON.stringify(value);
		}

		newUrl.searchParams.set(title, value);
	}

	newUrl.searchParams.sort(); // good for caching
	return newUrl;
};
