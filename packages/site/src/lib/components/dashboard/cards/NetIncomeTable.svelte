<script lang="ts">
	import type { ByMonthDto } from '$api/openapi';
	import Pagination from '$lib/components/table/tanstack-table/Pagination.svelte';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { toUTCFormat } from '$lib/utils/common';
	import type { ColumnDef } from '@tanstack/svelte-table';

	export let invoicesGrouped: ByMonthDto[];
	export let expensesGrouped: ByMonthDto[];

	type Row = typeof tabular[number];

	// Merge the two arrays into one, using the `date` property as the key.
	// The resulting array should include all the dates from both arrays.
	// Sort the resulting array by date.

	const allDates = new Set(
		[...invoicesGrouped, ...expensesGrouped]
			.map(({ date }) => date)
			.sort((a, b) => new Date(a).getTime() - new Date(b).getTime()),
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
			accessorFn: (row) => toUTCFormat(new Date(row.date)),
		},
		{
			header: 'Income',
			footer: 'Income',
			accessorKey: 'income',
			cell: (info) => {
				return info.getValue<Row['income']>().toLocaleString();
			},
		},
		{
			header: 'Expenses',
			footer: 'Expenses',
			accessorKey: 'expenses',
			cell: (info) => {
				return info.getValue<Row['expenses']>().toLocaleString();
			},
		},
	];
</script>

<Table
	{columns}
	items={tabular}
	itemCount={tabular.length}
	pagination={{
		pageIndex: 0,
		pageSize: 10,
	}}
	paginationType="client"
>
	<div slot="pagination" let:table>
		<Pagination {table} itemCount={tabular.length} />
	</div>
</Table>
