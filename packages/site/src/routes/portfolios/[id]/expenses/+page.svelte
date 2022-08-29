<script lang="ts">
	import type { ExpenseDto } from '@self/sdk';
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getSortedRowModel,
		type ColumnDef,
		type OnChangeFn,
		type SortingState,
		type TableOptions,
	} from '@tanstack/svelte-table';
	import { writable } from 'svelte/store';
	import type { PageData } from './$types';
	import TableExample from './TableExample.svelte';

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
					id: 'property',
					// cell: (info) => info.getValue(),
					header: () => 'Property',
					footer: (props) => props.column.id,
				},
				{
					accessorFn: (row) => row.breadcrumbs.unit?.label || '',
					id: 'unit',
					// cell: (info) => info.getValue(),
					header: () => 'Unit',
					footer: (props) => props.column.id,
				},
			],
		},
	];

	let sorting: SortingState = [];

	const setSorting: OnChangeFn<SortingState> = (updater) => {
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
	};

	const options = writable<TableOptions<ExpenseDto>>({
		data: data.expenses.results,
		columns,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true,
	});

	// const data = makeData(100_000);
	const refreshData = () => {
		console.info('refresh');
		options.update((prev) => ({
			...prev,
			// data: makeData(100_000),
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
	<div>
		<button on:click={() => rerender()}>Force Rerender</button>
	</div>
	<div>
		<button on:click={() => refreshData()}>Refresh Data</button>
	</div>
	<pre>{JSON.stringify($table.getState().sorting, null, 2)}</pre>
</div>

<TableExample />

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
