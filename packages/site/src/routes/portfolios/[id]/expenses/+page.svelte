<script lang="ts">
	import { dev } from '$app/env';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import {
		DEFAULT_PAGINATION_KEY,
		ORDER_BY,
		PAGE_SIZE,
		SORT_ORDER,
	} from '$lib/constants/pagination-keys';
	import { toUTCFormat } from '$lib/utils/common';
	import type { ExpenseDto } from '@self/sdk';
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getSortedRowModel,
		type ColumnDef,
		type OnChangeFn,
		type PaginationState,
		type SortingState,
		type TableOptions,
	} from '@tanstack/svelte-table';
	import { writable } from 'svelte/store';
	import type { PageData } from './$types';
	import TSPagination from './TSPagination.svelte';

	export let data: PageData;

	const columns: ColumnDef<ExpenseDto>[] = [
		{
			header: 'Date',
			footer: 'Date',
			id: 'postAt',
			accessorFn: (row) => toUTCFormat(row.postAt),
		},
		{
			header: 'Amount',
			footer: 'Amount',
			accessorKey: 'amount',
			cell: (info) => {
				return info.getValue<ExpenseDto['amount']>().toLocaleString();
			},
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

	let sorting: SortingState = [];

	const setSorting: OnChangeFn<SortingState> = async (updater) => {
		// what is this doing?
		if (updater instanceof Function) {
			sorting = updater(sorting);
		} else {
			sorting = updater;
		}

		options.update((old) => ({
			...old,
			state: {
				...old.state,
				sorting,
			},
		}));

		const url = new URL($page.url);
		const key = sorting[0]?.id;
		const desc = sorting[0]?.desc;

		key
			? url.searchParams.set(ORDER_BY, key)
			: url.searchParams.delete(ORDER_BY);

		if (desc === undefined) {
			url.searchParams.delete(SORT_ORDER);
		} else if (desc === true) {
			url.searchParams.set(SORT_ORDER, 'desc');
		} else if (desc === false) {
			url.searchParams.set(SORT_ORDER, 'asc');
		}

		await goto(url, { noscroll: true, keepfocus: true });
		refreshData();
	};

	let pagination: PaginationState = {
		pageIndex: data.expenses.pagination.page - 1,
		pageSize: data.expenses.pagination.pageSize,
	};

	const setPagination: OnChangeFn<PaginationState> = async (updater) => {
		// what is this doing?
		if (updater instanceof Function) {
			pagination = updater(pagination);
		} else {
			pagination = updater;
		}

		options.update((old) => ({
			...old,
			state: {
				...old.state,
				pagination,
			},
		}));

		const url = new URL($page.url);

		url.searchParams.set(
			DEFAULT_PAGINATION_KEY,
			// add one to handle zero-based index
			(pagination.pageIndex + 1).toString(),
		);

		url.searchParams.set(PAGE_SIZE, pagination.pageSize.toString());

		await goto(url, { noscroll: true, keepfocus: true });

		// update fresh pagecount from server
		options.update((old) => ({
			...old,
			pageCount: data.expenses.pagination.pageCount,
		}));

		refreshData();
	};

	const options = writable<TableOptions<ExpenseDto>>({
		data: data.expenses.results,
		columns,

		manualPagination: true,
		pageCount: data.expenses.pagination.pageCount,
		onPaginationChange: setPagination,

		manualSorting: true,
		onSortingChange: setSorting,
		state: {
			sorting,
			pagination,
		},

		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: dev,
	});

	const refreshData = () => {
		console.info('refresh');
		options.update((prev) => ({
			...prev,
			data: data.expenses.results,
		}));
	};

	const rerender = () => {
		options.update((options) => ({
			...options,
			data: data.expenses.results,
		}));
	};

	const table = createSvelteTable(options);
</script>

<div class="inline-block min-w-full py-6 align-middle md:px-6 lg:px-8">
	<div
		class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
	>
		<table class="min-w-full divide-y divide-gray-300">
			<thead class="bg-gray-50">
				{#each $table.getHeaderGroups() as headerGroup}
					<tr>
						{#each headerGroup.headers as header}
							<th
								colSpan={header.colSpan}
								class="py-2 px-2 text-left text-sm font-semibold text-gray-900"
							>
								{#if !header.isPlaceholder}
									<div
										class:cursor-pointer={header.column.getCanSort()}
										class:select-none={header.column.getCanSort()}
										on:click={header.column.getToggleSortingHandler()}
									>
										<svelte:component
											this={flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
										/>
										{{
											asc: ' 🔼',
											desc: ' 🔽',
										}[header.column.getIsSorted().toString()] ?? ''}
									</div>
								{/if}
							</th>
						{/each}
					</tr>
				{/each}
			</thead>
			<tbody class="divide-y divide-gray-200">
				{#each $table.getRowModel().rows as row}
					<tr class="odd:bg-white even:bg-gray-50">
						{#each row.getVisibleCells() as cell}
							<!-- <td>
								<svelte:component
									this={flexRender(
										cell.column.columnDef.cell,
										cell.getContext(),
									)}
								/>
							</td> -->
							<td class="py-3 px-2 text-sm text-gray-500">
								{cell.getValue()}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
			<tfoot class="bg-gray-50">
				{#each $table.getFooterGroups() as footerGroup}
					<tr>
						{#each footerGroup.headers as header}
							<th
								colSpan={header.colSpan}
								class="py-2 px-2 text-left text-sm font-semibold text-gray-900"
							>
								{#if !header.isPlaceholder}
									<svelte:component
										this={flexRender(
											header.column.columnDef.footer,
											header.getContext(),
										)}
									/>
								{/if}
							</th>
						{/each}
					</tr>
				{/each}
			</tfoot>
		</table>
		<TSPagination
			table={$table}
			itemCount={data.expenses.pagination.itemCount}
		/>
	</div>
</div>

<style lang="postcss">
	th,
	td {
		@apply whitespace-nowrap first:pl-4 last:pr-4;
	}
</style>
