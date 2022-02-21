import drop from 'lodash-es/drop.js';

export default function assertNever(value: any, message?: string): never {
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	throw new Error(message || `Unexpected value: ${value}`);
}

interface TableOptions {
	p?: string;
	pageSize?: string;
	q?: string;
	sortKey?: string;
	sortDir?: string;
}
export interface PaginationInfo {
	size: number;
	start: number;
	pageIndex: number;
}

export const getTableUrl = (url: URL, options: TableOptions): string => {
	const params = new URLSearchParams();
	Object.entries(options).forEach((option) => {
		if (option[1] && typeof option[1] === 'string') {
			params.set(option[0], option[1]);
		}
	});
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
