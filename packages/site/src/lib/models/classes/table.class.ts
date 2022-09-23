import {
	calculatePagination,
	type IPagination,
} from '$lib/components/table/pagination';
import * as R from 'remeda';

export interface TableHeader {
	key: string;
	label: string;
	style?: 'regular' | 'bold1' | 'bold2';
	isHref?: boolean;
	hide?: boolean;
}

export interface TableCellScalar {
	// key: string;
	label: any;
	hide?: boolean;
	extraStyles?: string[];
}

export interface TableCellLink extends TableCellScalar {
	href: string;
}

export type TableCell = TableCellScalar | TableCellLink;

type TableRow = Record<string, TableCell>;
type TableFooter = Record<string, any>;

// TODO: dry types
interface ITable {
	headers: TableHeader[];
	rows: TableRow[];
	footer: TableFooter;
}

export class CTable {
	headers: TableHeader[];
	rows: TableRow[];
	footer: TableFooter;
	paginated: typeof this.rows[] = [];
	constructor(data: ITable) {
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
