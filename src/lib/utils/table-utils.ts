export const parseParams = (url: URL) => {
	const pageSize = Number(url.searchParams.get('pageSize')) || 11;
	const pageIndex = Number(url.searchParams.get('page')) || 1;
	const search = url.searchParams.get('search') || '';
	const skip = (pageIndex - 1) * pageSize;
	const sortDir = url.searchParams.get('sortDir') || 'desc';
	const sortKey = url.searchParams.get('sortKey') || 'updatedAt';

	return {
		options: { pageSize, pageIndex, search, skip, sortDir, sortKey },
		queryString: `?page=${pageIndex}&pageSize=${pageSize}&search=${search}&sortDir=${sortDir}&sortKey=${sortKey}`,
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

export const getTableUrl = (
	url: URL,
	{
		pageIndex,
		search,
		sortKey,
		sortDir,
		pageSize,
	}: {
		pageIndex?: number;
		search?: string;
		sortKey?: string;
		sortDir?: string;
		pageSize?: number;
	},
): string => {
	const params = new URLSearchParams();
	if (pageIndex) {
		params.set('page', pageIndex.toString());
	}
	if (search) {
		params.set('search', search);
	}
	if (sortKey) {
		params.set('sortKey', sortKey);
	}
	if (sortDir) {
		params.set('sortDir', sortDir);
	}
	if (pageSize) {
		params.set('pageSize', pageSize.toString());
	}

	return `${url.pathname}?${params.toString()}`;
};
