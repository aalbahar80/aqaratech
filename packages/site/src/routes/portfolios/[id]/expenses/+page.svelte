<script lang="ts">
	import { page } from '$app/stores';
	import Table from '$lib/components/table/tanstack-table/Table.svelte';
	import { toUTCFormat } from '$lib/utils/common';
	import { downloadBlob } from '$lib/utils/table-utils';
	import { flatten } from '$lib/utils/to-csv';
	import type { ExpenseDto } from '@self/sdk';
	import { entitiesMap } from '@self/utils';
	import type { ColumnDef } from '@tanstack/svelte-table';
	import * as Papa from 'papaparse';
	import type { PageData } from './$types';

	export let data: PageData;

	const columns: ColumnDef<ExpenseDto>[] = [
		{
			header: 'Post Date',
			footer: 'Post Date',
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
		{
			header: '',
			footer: '',
			id: 'view',
			accessorFn: (row) => `/${entitiesMap.expense.urlName}/${row.id}`,
			cell: (info) => info.getValue(),
		},
	];
</script>

<button
	on:click={() => {
		const flat = data.expenses.results.map((e) => flatten(e, ''));
		const csv = Papa.unparse(flat);
		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
		downloadBlob(blob, 'expenses.csv');
	}}>Download all</button
>

<a href={`data:${$page.url.href}`} download="a.csv">A Download all</a>

<Table
	{columns}
	items={data.expenses.results}
	itemCount={data.expenses.pagination.itemCount}
	pageCount={data.expenses.pagination.pageCount}
	pagination={{
		pageIndex: data.expenses.pagination.page - 1,
		pageSize: data.expenses.pagination.take,
	}}
/>
