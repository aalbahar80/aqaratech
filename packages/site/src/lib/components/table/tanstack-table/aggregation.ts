import type { Table } from '@tanstack/svelte-table';

export const getColumnSum = <T>(table: Table<T>, key: string) => {
	const sum = table
		.getFilteredRowModel()
		.rows.reduce((total, row) => total + row.getValue(key), 0);

	return sum;
};
