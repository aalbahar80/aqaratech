<script lang="ts">
	import type { PaginatedDto } from '$api/openapi';
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import { handlePagination } from '$lib/components/table/pagination/handle-pagination';
	import { createTablePaginationModel } from '$lib/components/table/pagination/table-pagination-model';
	import TableBodyRow from '$lib/components/table/row/TableBodyRow.svelte';
	import TableEmptyState from './TableEmptyState.svelte';
	import TableFooterRow from '$lib/components/table/row/TableFooterRow.svelte';
	import TableHeaderRow from '$lib/components/table/row/TableHeaderRow.svelte';
	import { getColumnFilter } from '$lib/components/table/tanstack-table/filters/column-filter';
	import Pagination from '$lib/components/table/tanstack-table/Pagination.svelte';
	import { handleServerSorting } from '$lib/components/table/tanstack-table/server-sorting';
	import {
		createSvelteTable,
		getCoreRowModel,
		getSortedRowModel,
		type ColumnDef,
		type OnChangeFn,
		type PaginationState,
		type SortingState,
		type TableOptions,
		type VisibilityState,
	} from '@tanstack/svelte-table';
	import { writable } from 'svelte/store';

	type T = $$Generic<{ id: string }>;

	export let items: T[];
	export let paginationDto: PaginatedDto;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export let columns: ColumnDef<T, any>[];

	/**
	 * Allows setting the initial sorting state.
	 *
	 * Ideally, _initial_ sorting state should be inferred from the URL when possible when using server-side sorting.
	 */
	export let sorting: SortingState = [];

	type TableColumnVisibility = $$Generic<VisibilityState>;

	/**
	 * Allows setting the initial visibility state.
	 */
	export let columnVisibility: TableColumnVisibility =
		{} as TableColumnVisibility;

	// Sorting

	const setSorting: OnChangeFn<SortingState> = (updater) => {
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

		void handleServerSorting(sorting, $page.url);
	};

	// Pagination

	// Initiate pagination state

	export const setPagination: OnChangeFn<PaginationState> = (updater) => {
		handlePagination({
			updater,
			url: $page.url,
			paginationDto,
		});
	};

	// Column visibility

	const setColumnVisibility: OnChangeFn<TableColumnVisibility> = (updater) => {
		if (updater instanceof Function) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			columnVisibility = updater(columnVisibility);
		} else {
			columnVisibility = updater;
		}
		options.update((old) => ({
			...old,
			state: {
				...old.state,
				columnVisibility,
			},
		}));
	};

	const options = writable<TableOptions<T>>({
		data: items,
		columns,

		state: {
			sorting,
			pagination: createTablePaginationModel(paginationDto).pagination,
			columnVisibility,
		},

		getCoreRowModel: getCoreRowModel(),
		debugTable: dev,

		// Pagination. Docs: https://tanstack.com/table/v8/docs/api/features/pagination
		manualPagination: true, // use false for client-side pagination
		pageCount: paginationDto.pageCount,
		onPaginationChange: setPagination,

		// Sorting. Docs: https://tanstack.com/table/v8/docs/api/features/sorting
		manualSorting: true, // use false for client-side sorting
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),

		// Column visibility
		// @ts-expect-error until better typing
		onColumnVisibilityChange: setColumnVisibility,
	});

	const refreshData = (data: T[]) => {
		options.update((prev) => ({
			...prev,
			data: data,
		}));
	};

	const refreshPageCount = (n: number) => {
		options.update((options) => ({
			...options,
			pageCount: n,
		}));
	};

	const refreshPagination = (p: PaginationState) => {
		// $table.setPagination(p);
		options.update((options) => ({
			...options,
			state: {
				...options.state,
				pagination: p,
			},
		}));
	};

	const table = createSvelteTable<T>(options);

	$: {
		// refresh items
		refreshData(items);
	}

	$: {
		// refresh pageCount when property filter changes
		refreshPageCount(paginationDto.pageCount);
	}

	$: {
		// refresh pagination when pressing back/forward
		refreshPagination(createTablePaginationModel(paginationDto).pagination);
	}

	$: {
		if (items.length === 0 && paginationDto.page > 1) {
			// reset pagination when no items are available
			$table.resetPageIndex();
		}
	}

	$: filters = [getColumnFilter($table)];
</script>

<div class="inline-block min-w-full align-middle md:px-6 lg:px-8">
	<div class="py-8">
		<!-- Use the named slot "filter" to customize ex. Hero. 
			   Otherwise, a default FilterBar will be rendered. -->
		<slot name="filter" {filters}>
			<FilterBar responsive={filters} />
		</slot>
	</div>
	<div class="text-right">
		<slot name="header-actions" />
	</div>
	{#if $table.getRowModel().rows.length > 0}
		<div class="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
			<div class="overflow-x-auto">
				<table class="min-w-full divide-y divide-gray-300">
					<thead class="bg-gray-50">
						{#each $table.getHeaderGroups() as group}
							<TableHeaderRow {group} />
						{/each}
					</thead>
					<tbody>
						{#each $table.getRowModel().rows as row (row.original.id)}
							<TableBodyRow {row} />
						{/each}
					</tbody>
					<tfoot class="bg-gray-50">
						{#each $table.getFooterGroups() as group}
							<TableFooterRow {group} />
						{/each}
					</tfoot>
				</table>
			</div>
			<slot name="pagination" table={$table}>
				<Pagination table={$table} itemCount={paginationDto.itemCount} />
			</slot>
		</div>
	{:else}
		<TableEmptyState />
	{/if}
</div>
