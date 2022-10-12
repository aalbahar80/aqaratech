<script lang="ts">
	import type { PaginatedLeaseInvoiceDto } from '$api/openapi';
	import { baseColumns } from '$lib/components/table/lease-invoices/columns';
	import { getColumnSum } from '$lib/components/table/tanstack-table/aggregation';
	import Pagination from '$lib/components/table/tanstack-table/Pagination.svelte';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { kwdFormat, toUTCFormat } from '$lib/utils/common';
	import { sortingFns, type ColumnDef } from '@tanstack/svelte-table';
	import * as R from 'remeda';
	import { fade } from 'svelte/transition';

	export let invoices: PaginatedLeaseInvoiceDto;

	$: tabular = invoices.results;

	type Row = typeof tabular[number];

	const columns: ColumnDef<Row>[] = [
		{
			...baseColumns.postAt,
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
		baseColumns.isPaid,
		{
			header: 'Amount',
			accessorKey: 'amount',
			cell: (info) => {
				return info.getValue<Row['amount']>().toLocaleString();
			},
			footer: ({ table }) => {
				const sum = getColumnSum(table, 'amount');
				return kwdFormat(sum);
			},
		},
		{
			header: 'Location',
			footer: 'Location',
			columns: [
				{
					...baseColumns.unitId,
					enableSorting: true,
				},
				{
					...baseColumns.propertyId,
					enableSorting: true,
				},
			],
		},
		baseColumns.view,
	];
</script>

<div in:fade>
	<Table
		{columns}
		items={tabular}
		itemCount={tabular.length}
		sorting={[
			{
				id: 'postAt',
				desc: false,
			},
		]}
		pagination={{
			pageIndex: 0,
			pageSize: 25,
		}}
		paginationType="client"
	>
		<div slot="pagination" let:table>
			<Pagination {table} itemCount={tabular.length} hidePageSizeOptions />
		</div>
	</Table>
</div>
