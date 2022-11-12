<script lang="ts">
	import type { PaginatedDto } from '$api/openapi';
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import { createTablePaginationModel } from '$lib/components/table/pagination/table-pagination-model';
	import { getColumnFilter } from '$lib/components/table/tanstack-table/filters/column-filter';
	import Pagination from '$lib/components/table/tanstack-table/Pagination.svelte';
	import { handleServerPagination } from '$lib/components/table/tanstack-table/server-pagination';
	import { handleServerSorting } from '$lib/components/table/tanstack-table/server-sorting';
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getPaginationRowModel,
		getSortedRowModel,
		type VisibilityState,
		type ColumnDef,
		type OnChangeFn,
		type PaginationState,
		type SortingState,
		type TableOptions,
	} from '@tanstack/svelte-table';
	import { clsx } from 'clsx';
	import { afterUpdate } from 'svelte';
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';

	type T = $$Generic<{ id: string }>;

	export let items: T[];
	export let paginationDto: PaginatedDto;

	export let columns: ColumnDef<T, any>[];

	/**
	 * Allows setting the initial sorting state.
	 *
	 * Ideally, _initial_ sorting state should be inferred from the URL when possible when using server-side sorting.
	 */
	export let sorting: SortingState = [];
	/**
	 * Page count should be defined when using server-side pagination
	 */
	export let paginationType: 'server' | 'client';

	type TableColumnVisibility = $$Generic<VisibilityState | undefined>;

	/**
	 * Allows setting the initial visibility state.
	 */
	export let columnVisibility: TableColumnVisibility =
		undefined as TableColumnVisibility;

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

		if (paginationType === 'server') {
			void handleServerSorting(sorting, $page.url);
		}

		refreshData();
	};

	// Pagination

	// Initiate pagination state

	let { pagination, itemCount, pageCount } =
		createTablePaginationModel(paginationDto);

	const setPagination: OnChangeFn<PaginationState> = (updater) => {
		// what is this doing?
		if (updater instanceof Function) {
			pagination = updater(pagination);
		} else {
			pagination = updater;
		}

		if (paginationType === 'server') {
			void handleServerPagination(pagination, $page.url);

			options.update((old) => ({
				...old,
				// update fresh pagecount from server
				pageCount: pageCount,
			}));
		}

		options.update((old) => ({
			...old,
			state: {
				...old.state,
				pagination,
			},
		}));

		refreshData();
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

	const clientPaginationOptions = {
		manualPagination: false,
		getPaginationRowModel: getPaginationRowModel<any>(),
	};

	const serverPaginationOptions = {
		manualPagination: true,
		pageCount,
	};

	const clientSortingOptions = {
		manualSorting: false,
	};

	const serverSortingOptions = {
		manualSorting: true,
	};

	const options = writable<TableOptions<T>>({
		data: items,
		columns,

		state: {
			sorting,
			pagination,
			columnVisibility,
		},

		getCoreRowModel: getCoreRowModel(),
		debugTable: dev,

		// Pagination. Docs: https://tanstack.com/table/v8/docs/api/features/pagination
		onPaginationChange: setPagination,
		...(paginationType === 'server'
			? serverPaginationOptions
			: clientPaginationOptions),

		// Sorting. Docs: https://tanstack.com/table/v8/docs/api/features/sorting
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		...(paginationType === 'server'
			? serverSortingOptions
			: clientSortingOptions),

		// Column visibility
		onColumnVisibilityChange: setColumnVisibility,
	});

	const refreshData = () => {
		console.info('refresh');
		options.update((prev) => ({
			...prev,
			data: items,
		}));
	};

	// const rerender = () => {
	// 	options.update((options) => ({
	// 		...options,
	// 		data: data.expenses.results,
	// 	}));
	// };

	const table = createSvelteTable(options);

	afterUpdate(() => {
		// to refresh data when browser back button is pressed
		refreshData();
	});

	const sortIcons: Record<string, any> = {
		asc: '↑',
		desc: '↓',
		// asc: ' 🔼',
		// desc: ' 🔽',
	};

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
	<div class="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
		<div class="overflow-x-auto">
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
											{#if header.column.getIsSorted()}
												{sortIcons[header.column.getIsSorted().toString()]}
											{/if}
										</div>
									{/if}
								</th>
							{/each}
						</tr>
					{/each}
				</thead>
				<tbody>
					{#each $table.getRowModel().rows as row (row.original.id)}
						<tr
							class="odd:bg-white even:bg-gray-50"
							data-testid={row.original.id}
						>
							{#each row.getVisibleCells() as cell}
								{@const cellValueType = typeof cell.getValue()}
								<td
									in:fade={{ duration: 200 }}
									class={clsx('py-4 px-2 text-lg text-gray-600', {
										'slashed-zero tabular-nums': cellValueType === 'number',
									})}
								>
									<!-- Rendering null cells throws. This might only be an issue
									when the entire column is null on a given page. -->
									{#if cell.getValue() !== null}
										<svelte:component
											this={flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										/>
									{/if}
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
		</div>
		<slot name="pagination" table={$table}>
			<Pagination table={$table} {itemCount} />
		</slot>
	</div>
</div>

<style lang="postcss">
	th,
	td {
		@apply whitespace-nowrap first:pl-4 last:pr-4;
	}
</style>
