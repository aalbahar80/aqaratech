<script lang="ts">
	import type { ByMonthDto } from '$api/openapi';
	import Pagination from '$lib/components/table/tanstack-table/Pagination.svelte';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { kwdFormat, toUTCFormat } from '$lib/utils/common';
	import { sortingFns, type ColumnDef } from '@tanstack/svelte-table';
	import * as R from 'remeda';
	import { fade } from 'svelte/transition';

	export let invoicesGrouped: ByMonthDto[];
	export let expensesGrouped: ByMonthDto[];

	type Row = typeof tabular[number];

	// Merge the two arrays into one, using the `date` property as the key.
	// The resulting array should include all the dates from both arrays.
	// Sort the resulting array by date.

	const allDates = new Set(
		[...invoicesGrouped, ...expensesGrouped].map(({ date }) => date),
	);

	// Create a new array of objects, with the date as the key, and the income and expense as the values.

	const tabular = Array.from(allDates).map((date) => {
		const income = invoicesGrouped.find((i) => i.date === date)?.amount || 0;
		const expenses = expensesGrouped.find((i) => i.date === date)?.amount || 0;
		return {
			date,
			income,
			expenses,
		};
	});

	const columns: ColumnDef<Row>[] = [
		{
			header: 'Date',
			footer: 'Date',
			id: 'date',
			// TODO: review date formatting/timezone
			accessorFn: (row) => new Date(row.date),
			cell: (row) => {
				const val = row.getValue();
				if (R.isDate(val)) {
					return toUTCFormat(val);
				} else {
					return val;
				}
			},
			sortingFn: sortingFns.datetime,
		},
		{
			header: 'Income',
			accessorKey: 'income',
			cell: (info) => {
				return info.getValue<Row['income']>().toLocaleString();
			},
			footer: ({ table }) => {
				const sum = table
					.getFilteredRowModel()
					.rows.reduce(
						(total, row) => total + row.getValue<Row['income']>('income'),
						0,
					);

				return kwdFormat(sum);
			},
		},
		{
			header: 'Expenses',
			accessorKey: 'expenses',
			cell: (info) => {
				return info.getValue<Row['expenses']>().toLocaleString();
			},
			footer: ({ table }) => {
				const sum = table
					.getFilteredRowModel()
					.rows.reduce(
						(total, row) => total + row.getValue<Row['expenses']>('expenses'),
						0,
					);

				return kwdFormat(sum);
			},
		},
	];
</script>

<div in:fade>
	<Table
		{columns}
		items={tabular}
		itemCount={tabular.length}
		sorting={[
			{
				id: 'date',
				desc: false,
			},
		]}
		pagination={{
			pageIndex: 0,
			pageSize: 10,
		}}
		paginationType="client"
	>
		<div slot="pagination" let:table>
			<Pagination {table} itemCount={tabular.length} hidePageSizeOptions />
		</div>
	</Table>
</div>
