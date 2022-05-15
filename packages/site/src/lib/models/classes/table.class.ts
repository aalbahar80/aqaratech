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
	totals: TableFooter<T>;
}

export class CTable<T extends string> {
	headers: TableHeader<T>[];
	rows: TableRow<T>[];
	totals: TableFooter<T>;
	paginated: typeof this.rows[] = [];
	constructor(data: ITable<T>) {
		this.headers = data.headers;
		this.rows = data.rows;
		this.totals = data.totals;
	}

	paginate(size = 10) {
		this.paginated = R.chunk(this.rows, size);
	}

	getPage(page = 1, size = 10) {
		// return this.paginated[page - 1];
		console.time('paginating');
		const result = R.chunk(this.rows, size)[page - 1];
		console.timeEnd('paginating');
		return result;
	}

	getPageCount() {
		return this.paginated.length;
	}
}

// const a = new Table()
