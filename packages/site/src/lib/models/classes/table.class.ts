import * as R from 'remeda';

interface TableHeader<T> {
	key: T;
	style?: 'regular' | 'bold1' | 'bold2';
}

// type Headers = typeof headers[number]['key'];
// type Totals = { [key in Headers]?: string };
// type Row = { [key in Headers]: string } & { id: string };

interface ITableData<T> {
	headers: TableHeader<T>[];
	rows: any[];
	/**
	 * Array of headers that should be displayed as totals.
	 * If empty, no totals will be displayed.
	 */
	// totals: [];
	totals: Record<string, string>;
}

export class CTable<T> {
	public paginated = [[]];
	constructor(public data: ITableData<T>) {
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
