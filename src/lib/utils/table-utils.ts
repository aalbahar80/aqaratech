import drop from 'lodash-es/drop.js';

export default function assertNever(value: any, message?: string): never {
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	throw new Error(message || `Unexpected value: ${value}`);
}
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
// const removeDefault = (
// 	params: URLSearchParams,
// 	key: string,
// 	defaultValue: string,
// ) => {
// 	if (params.get(key) === defaultValue) {
// 		params.delete(key);
// 	}
// 	return params;
// };

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

export function getPaginatedItems<T>(
	items: T[],
	page: number,
	pageSize: number,
) {
	const pg = page || 1;
	const pgSize = pageSize || 100;
	const offset = (pg - 1) * pgSize;
	const pagedItems = drop(items, offset).slice(0, pgSize);
	const startIndex = offset + 1;
	const endIndex = offset + pagedItems.length;
	return {
		pageIndex: pg,
		pageSize: pgSize,
		total: items.length,
		totalPages: Math.ceil(items.length / pgSize),
		data: pagedItems,
		start: startIndex,
		end: endIndex,
	};
}

export const concatIfExists = (strings: (string | null)[]) => {
	return strings.filter((str) => str).join(' ');
};

export const getSkip = (page: number | string | null, pageSize: number) => {
	return (Number(page) ?? 1 - 1) * pageSize;
};
