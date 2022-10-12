<script lang="ts">
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import Pagination from '$lib/components/table/tanstack-table/Pagination.svelte';
	import { handleServerPagination } from '$lib/components/table/tanstack-table/server-pagination';
	import { handleServerSorting } from '$lib/components/table/tanstack-table/server-sorting';
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getPaginationRowModel,
		getSortedRowModel,
		type ColumnDef,
		type OnChangeFn,
		type PaginationState,
		type SortingState,
		type TableOptions,
	} from '@tanstack/svelte-table';
	import { afterUpdate } from 'svelte';
	import { writable } from 'svelte/store';

	type T = $$Generic;
	export let items: T[];
	export let columns: ColumnDef<T>[];
	export let pagination: PaginationState;
	export let itemCount: number;
	export let pageCount: number;
	export let paginationType: 'server' | 'client';

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

		if (paginationType === 'server') {
			await handleServerSorting(sorting, $page.url);
		} else {
			// await handleClientSorting(sorting, $page.url);
			throw new Error('Client-side sorting is not yet implemented');
		}

		refreshData();
	};

	const setPagination: OnChangeFn<PaginationState> = async (updater) => {
		// what is this doing?
		if (updater instanceof Function) {
			pagination = updater(pagination);
		} else {
			pagination = updater;
		}

		if (paginationType === 'server') {
			await handleServerPagination(pagination, $page.url);

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

	const clientPaginationOptions = {
		manualPagination: false,
		getPaginationRowModel: getPaginationRowModel<any>(),
	};

	const serverPaginationOptions = {
		manualPagination: true,
		pageCount,
	};

	const options = writable<TableOptions<T>>({
		data: items,
		columns,

		manualSorting: true,
		onSortingChange: setSorting,
		state: {
			sorting,
			pagination,
		},

		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: dev,

		// Pagination. Docs: https://tanstack.com/table/v8/docs/api/features/pagination
		onPaginationChange: setPagination,
		...(paginationType === 'server'
			? serverPaginationOptions
			: clientPaginationOptions),
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
</script>

<div class="inline-block min-w-full py-6 align-middle md:px-6 lg:px-8">
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
								<td class="py-4 px-2 text-sm text-gray-500">
									{#if cell.column.id === 'view'}
										<!-- redundant const for typing purposes -->
										{@const href = cell.getValue()}
										<a
											href={typeof href === 'string' ? href : undefined}
											target="_blank"
											class="text-indigo-600 hover:text-indigo-900">View</a
										>
									{:else}
										{cell.getValue()}
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
		<Pagination table={$table} {itemCount} />
	</div>
</div>

<style lang="postcss">
	th,
	td {
		@apply whitespace-nowrap first:pl-4 last:pr-4;
	}
</style>
