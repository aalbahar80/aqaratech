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

export class CTable<T> {
	public paginated = [[]];
	constructor(public data: ITable<T>) {
		Object.assign(this, data);
	}

	paginate(size = 10) {
		this.paginated = R.chunk(this.data.rows, size);
	}

	getPage(page = 1) {
		return this.paginated[page - 1];
	}

	getPageCount() {
		return this.paginated.length;
	}

	getFooter() {
		// TODO: use getter? use if/else to avoid recalculation?
		const total = this.data.rows.reduce((acc, row) => acc + row.amount, 0);
	}
}

// const a = new Table()
