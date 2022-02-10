export const parseParams = (url: URL) => {
	const pageSize = Number(url.searchParams.get('pageSize')) || 11;
	const pageIndex = Number(url.searchParams.get('p')) || 1;
	const search = url.searchParams.get('q') || '';
	const skip = (pageIndex - 1) * pageSize;
	const sortDir = url.searchParams.get('sortDir') || 'desc';
	const sortKey = url.searchParams.get('sortKey') || 'updatedAt';

	return {
		options: { pageSize, pageIndex, search, skip, sortDir, sortKey },
		queryString: `?p=${pageIndex}&pageSize=${pageSize}&q=${search}&sortDir=${sortDir}&sortKey=${sortKey}`,
	};
};

/**
 * Removes a search param if default.
 */
const removeDefault = (
	params: URLSearchParams,
	key: string,
	defaultValue: string,
) => {
	if (params.get(key) === defaultValue) {
		params.delete(key);
	}
	return params;
};

/**
 * Construct a URL's searchParams.
 */
export const handleParams = ({
	pageIndex,
	search,
	sortKey,
	sortDir,
	pageSize,
}: {
	pageIndex: number;
	search: string;
	sortKey: string;
	sortDir: string;
	pageSize: number;
}): URLSearchParams => {
	const params = new URLSearchParams();
	params.set('page', pageIndex.toString());
	params.set('search', search);
	params.set('sortKey', sortKey);
	params.set('sortDir', sortDir);
	params.set('pageSize', pageSize.toString());
	return params;
};
interface TableOptions {
	p?: string;
	pageSize?: string;
	q?: string;
	sortKey?: string;
	sortDir?: string;
}

export const getTableUrl = (url: URL, options: TableOptions): string => {
	const params = new URLSearchParams();
	Object.entries(options).forEach((option) => {
		if (option[1] && typeof option[1] === 'string') {
			params.set(option[0], option[1]);
		}
	});
	// loop through params and remove default values
	// params.forEach((value, key) => {
	// 	removeDefault(params, key, value);
	// });

	return `${url.pathname}?${params.toString()}`;
};
