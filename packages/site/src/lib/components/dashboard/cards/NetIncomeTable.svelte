<script lang="ts">
	import type { ByMonthDto } from '$api/openapi';
	import GenericCellSvelte from '$lib/components/table/lease-invoices/GenericCell.svelte';
	import { getColumnSum } from '$lib/components/table/tanstack-table/aggregation';
	import Pagination from '$lib/components/table/tanstack-table/Pagination.svelte';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { kwdFormat, toUTCFormat } from '$lib/utils/common';
	import {
		renderComponent,
		sortingFns,
		type ColumnDef,
	} from '@tanstack/svelte-table';
	import * as R from 'remeda';
	import { fade } from 'svelte/transition';

	export let invoicesGrouped: ByMonthDto[];
	export let invoicesGroupedPaid: ByMonthDto[];
	export let invoicesGroupedUnpaid: ByMonthDto[];
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

		const paid = invoicesGroupedPaid.find((i) => i.date === date)?.amount || 0;

		const unpaid =
			invoicesGroupedUnpaid.find((i) => i.date === date)?.amount || 0;

		const expenses = expensesGrouped.find((i) => i.date === date)?.amount || 0;
		return {
			date,
			income,
			paid,
			unpaid,
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
			header: 'Total Rent',
			accessorKey: 'income',
			cell: (info) => {
				return info.getValue<Row['income']>().toLocaleString();
			},
			footer: ({ table }) => {
				const sum = getColumnSum(table, 'income');
				return renderComponent(GenericCellSvelte, {
					value: kwdFormat(sum),
					tooltip: 'Sum of collected & uncollected rent',
				});
			},
		},
		{
			header: 'Collected',
			accessorKey: 'paid',
			cell: (info) => {
				return info.getValue<Row['paid']>().toLocaleString();
			},
			footer: ({ table }) => {
				const sum = getColumnSum(table, 'paid');
				return renderComponent(GenericCellSvelte, {
					classes: 'text-green-600',
					value: kwdFormat(sum),
					tooltip: 'Paid rent',
				});
			},
		},
		{
			header: 'Uncollected',
			accessorKey: 'unpaid',
			cell: (info) => {
				return info.getValue<Row['unpaid']>().toLocaleString();
			},
			footer: ({ table }) => {
				const sum = getColumnSum(table, 'unpaid');
				return renderComponent(GenericCellSvelte, {
					value: kwdFormat(sum),
					tooltip: 'Unpaid rent',
				});
			},
		},
		{
			header: 'Expenses',
			accessorKey: 'expenses',
			cell: (info) => {
				return info.getValue<Row['expenses']>().toLocaleString();
			},
			footer: ({ table }) => {
				const sum = getColumnSum(table, 'expenses');
				return renderComponent(GenericCellSvelte, {
					classes: 'text-red-600',
					value: kwdFormat(sum),
				});
			},
		},
		{
			header: 'Net',
			id: 'net',
			accessorFn: (row) => row.paid - row.expenses,
			cell: (info) => {
				return info.getValue().toLocaleString();
			},
			footer: ({ table }) => {
				const sum = getColumnSum(table, 'net');
				return renderComponent(GenericCellSvelte, {
					value: kwdFormat(sum),
					tooltip: 'Net = Collected rent - Expenses',
				});
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
