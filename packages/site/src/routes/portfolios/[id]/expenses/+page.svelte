<script lang="ts">
	import { dev } from '$app/env';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import {
		DEFAULT_PAGINATION_KEY,
		PAGE_SIZE,
	} from '$lib/constants/pagination-keys';
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

	export let data: PageData;

	const columns: ColumnDef<ExpenseDto>[] = [
		{
			header: 'Date',
			accessorKey: 'postAt',
			footer: (props) => props.column.id,
		},
		{
			header: 'Amount',
			accessorKey: 'amount',
			cell: (info) => {
				return info.getValue<ExpenseDto['amount']>().toLocaleString();
			},
			footer: (props) => props.column.id,
		},
		{
			header: 'Location',
			columns: [
				{
					accessorFn: (row) => row.breadcrumbs.property?.label || '',
					id: 'propertyId',
					// cell: (info) => info.getValue(),
					header: () => 'Property',
					footer: (props) => props.column.id,
				},
				{
					accessorFn: (row) => row.breadcrumbs.unit?.label || '',
					id: 'unitId',
					// cell: (info) => info.getValue(),
					header: () => 'Unit',
					footer: (props) => props.column.id,
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
			? url.searchParams.set('orderBy', key)
			: url.searchParams.delete('orderBy');

		if (desc === undefined) {
			url.searchParams.delete('sortOrder');
		} else if (desc === true) {
			url.searchParams.set('sortOrder', 'desc');
		} else if (desc === false) {
			url.searchParams.set('sortOrder', 'asc');
		}

		await goto(url);
		refreshData();
	};

	let pagination: PaginationState = {
		pageIndex: 1,
		pageSize: 10,
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

		await goto(url);

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

<div class="p-2">
	<div class="h-2" />
	<table>
		<thead>
			{#each $table.getHeaderGroups() as headerGroup}
				<tr>
					{#each headerGroup.headers as header}
						<th colSpan={header.colSpan}>
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
		<tbody>
			{#each $table.getRowModel().rows.slice(0, 10) as row}
				<tr>
					{#each row.getVisibleCells() as cell}
						<td>
							<svelte:component
								this={flexRender(cell.column.columnDef.cell, cell.getContext())}
							/>
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
		<tfoot>
			{#each $table.getFooterGroups() as footerGroup}
				<tr>
					{#each footerGroup.headers as header}
						<th colSpan={header.colSpan}>
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
	<div>{$table.getRowModel().rows.length} Rows</div>

	<!-- <div>{$table.getPaginationRowModel()} Rows</div>
	<pre>{JSON.stringify($table.getPageOptions(), null, 2)}</pre> -->
	<div>
		<button on:click={() => rerender()}>Force Rerender</button>
	</div>
	<div>
		<button on:click={() => refreshData()}>Refresh Data</button>
	</div>
	<pre>{JSON.stringify($table.getState().sorting, null, 2)}</pre>
	<pre>{JSON.stringify($table.getState().pagination, null, 2)}</pre>
	<div>
		<button
			on:click={() => $table.previousPage()}
			disabled={!$table.getCanPreviousPage()}>prev page</button
		>
		<!-- <button on:click={() => $table.previousPage()}>prev page</button> -->
		{$table.getCanPreviousPage()}
		{$table.getCanNextPage()}
		{data.expenses.pagination.pageCount}
		<button on:click={() => $table.nextPage()}>next page</button>
	</div>
	<div>
		<button on:click={() => $table.setPageSize(10)}>10</button>
		<button on:click={() => $table.setPageSize(15)}>25</button>
	</div>
</div>

<style>
	table {
		border: 1px solid lightgray;
	}

	tbody {
		border-bottom: 1px solid lightgray;
	}

	th {
		border-bottom: 1px solid lightgray;
		border-right: 1px solid lightgray;
		padding: 2px 4px;
	}

	tfoot {
		color: gray;
	}

	tfoot th {
		font-weight: normal;
	}
</style>
