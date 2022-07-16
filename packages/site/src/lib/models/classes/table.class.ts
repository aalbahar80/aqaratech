import {
	calculatePagination,
	type IPagination,
} from '$lib/components/table/pagination';
import * as R from 'remeda';

interface TableHeader<T> {
	key: T;
	label: string;
	style?: 'regular' | 'bold1' | 'bold2';
}

type TableRow<T extends TableHeader<T>[]> = {
	[key in keyof T[number]['key']]: string;
} & { id: string };

type TableFooter<T extends TableHeader<T>[]> = {
	[key in keyof T[number]['key']]?: string;
};

// TODO: dry types
interface ITable<T extends TableHeader<T>[]> {
	headers: T;
	rows: TableRow<T>[];
	footer: TableFooter<T>;
}

export class CTable<T extends TableHeader<T>[]> {
	headers: T;
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

	getPagination = (pageSize = 10, pageIdx = 1): IPagination =>
		calculatePagination(pageIdx, {
			pageCount: this.getPageCount(pageSize),
			pageSize: pageSize,
			itemCount: this.rows.length,
		});
}
