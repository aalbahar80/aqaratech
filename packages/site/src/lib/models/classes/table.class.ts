import { getButtons, type IPagination } from '$lib/components/table/pagination';
import * as R from 'remeda';

interface TableHeader<T> {
	key: T;
	style?: 'regular' | 'bold1' | 'bold2';
}
type TableRow<T extends string> = { [key in T]: string } & { id: string };
type TableFooter<T extends string> = { [key in T]?: string };

interface ITable<T extends string> {
	headers: TableHeader<T>[];
	rows: TableRow<T>[];
	footer: TableFooter<T>;
}

export class CTable<T extends string> {
	headers: TableHeader<T>[];
	rows: TableRow<T>[];
	footer: TableFooter<T>;
	paginated: typeof this.rows[] = [];
	constructor(data: ITable<T>) {
		this.headers = data.headers;
		this.rows = data.rows;
		this.footer = data.footer;
	}

	getPage = (page = 1, size = 10) => R.chunk(this.rows, size)[page - 1] || [];

	// use R.chunk for consistency?
	getPageCount = (size: number) => Math.ceil(this.rows.length / size);

	getPagination = (pageIdx = 1, pageSize = 10): IPagination => {
		const pageCount = this.getPageCount(pageSize);
		const buttons = getButtons(pageIdx, pageCount);
		return {
			pageIdx,
			pageCount,
			pageSize: pageSize,
			itemCount: this.rows.length,
			buttons,
			hasNext: pageIdx < pageCount,
			hasPrevious: pageIdx > 1,
		};
	};
}
