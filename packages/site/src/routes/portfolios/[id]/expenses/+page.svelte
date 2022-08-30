<script lang="ts">
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { toUTCFormat } from '$lib/utils/common';
	import type { ExpenseDto } from '@self/sdk';
	import type { ColumnDef } from '@tanstack/svelte-table';
	import type { PageData } from './$types';

	export let data: PageData;

	const columns: ColumnDef<ExpenseDto>[] = [
		{
			header: 'Date',
			footer: 'Date',
			id: 'postAt',
			accessorFn: (row) => toUTCFormat(row.postAt),
		},
		{
			header: 'Amount (KWD)',
			footer: 'Amount (KWD)',
			accessorKey: 'amount',
			cell: (info) => {
				return info.getValue<ExpenseDto['amount']>().toLocaleString();
			},
		},
		{
			header: 'Type',
			footer: 'Type',
			accessorFn: (row) => row.expenseType?.labelEn || '',
			cell: (info) => info.getValue(),
			enableSorting: false,
		},
		{
			header: 'Location',
			footer: 'Location',
			columns: [
				{
					accessorFn: (row) => row.breadcrumbs.property?.label || '',
					id: 'propertyId',
					// cell: (info) => info.getValue(),
					header: 'Property',
					footer: 'Property',
					enableSorting: false,
				},
				{
					accessorFn: (row) => row.breadcrumbs.unit?.label || '',
					id: 'unitId',
					// cell: (info) => info.getValue(),
					header: 'Unit',
					footer: 'Unit',
					enableSorting: false,
				},
			],
		},
	];
</script>

<Table
	{columns}
	items={data.expenses.results}
	itemCount={data.expenses.pagination.itemCount}
	pageCount={data.expenses.pagination.pageCount}
	pagination={{
		pageIndex: data.expenses.pagination.page - 1,
		pageSize: data.expenses.pagination.pageSize,
	}}
/>
