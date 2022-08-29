<script lang="ts">
	import { dev } from '$app/env';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Select from '$lib/components/form/inputs/Select.svelte';
	import {
		DEFAULT_PAGINATION_KEY,
		ORDER_BY,
		PAGE_SIZE,
		SORT_ORDER,
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
	import TSPagination from './TSPagination.svelte';

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
			{#each $table.getRowModel().rows as row}
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
	<TSPagination table={$table} itemCount={data.expenses.pagination.itemCount} />
	<Select
		current={$table.getState().pagination.pageSize}
		options={[10, 25, 50, 75, 100].map((size) => ({
			value: size,
			label: size.toString(),
		}))}
		on:select={(e) => {
			$table.setPageSize(e.detail.value);
		}}
	/>
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
