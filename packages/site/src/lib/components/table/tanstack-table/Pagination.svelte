<script lang="ts">
	import Select from '$lib/components/form/inputs/Select.svelte';
	import { getButtons } from '$lib/components/pagination/get-buttons';
	import { classes } from '$lib/utils/classes';
	import type { Table } from '@tanstack/svelte-table';
	import HeroiconsChevronLeft20Solid from '~icons/heroicons/chevron-left-20-solid';
	import HeroiconsChevronRight20Solid from '~icons/heroicons/chevron-right-20-solid';

	export let table: Table<any>;
	export let itemCount: number;
	export let hidePageSizeOptions = false;

	$: pageIdx = table.getState().pagination.pageIndex;
	$: pageSize = table.getState().pagination.pageSize;

	$: idxStart = pageIdx * pageSize + 1;
	$: idxEnd = idxStart + table.getRowModel().rows.length - 1;
</script>

<div class="border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
	<div class="flex flex-col gap-y-4 sm:hidden">
		<div class="flex w-full justify-between">
			<button
				class="relative inline-flex w-32 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				on:click={() => table.previousPage()}
				disabled={!table.getCanPreviousPage()}
			>
				Previous
			</button>
			<button
				class="relative ml-3 inline-flex w-32 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				on:click={() => table.nextPage()}
				disabled={!table.getCanNextPage()}
			>
				Next
			</button>
		</div>
		<div class="flex items-center gap-x-2">
			Page
			<input
				type="number"
				value={pageIdx + 1}
				max={table.getPageCount()}
				min={1}
				class="block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				on:change={(e) => {
					const index = e.currentTarget.valueAsNumber;
					table.setPageIndex(index - 1);
				}}
			/>
			of
			<span class="font-medium">{table.getPageCount()}</span>
		</div>
	</div>
	<div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
		<div class="hidden lg:block">
			<p class="text-sm text-gray-700">
				Showing <span class="font-medium">{idxStart}</span> to
				<span class="font-medium">{idxEnd}</span>
				of{' '}
				<span class="font-medium">{itemCount}</span> results
			</p>
		</div>
		<!-- Page size selector -->
		{#if !hidePageSizeOptions}
			<div class="grow-0">
				<Select
					current={table.getState().pagination.pageSize}
					options={[10, 20, 50, 75, 100].map((size) => ({
						value: size,
						label: `Show ${size}`,
					}))}
					on:select={(e) => {
						table.setPageSize(e.detail.value);
					}}
				/>
			</div>
		{/if}
		<div>
			<nav
				class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
				aria-label="Pagination"
			>
				<button
					class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
					on:click={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					<span class="sr-only">Previous</span>
					<HeroiconsChevronLeft20Solid class="h-5 w-5" aria-hidden="true" />
				</button>
				{#each getButtons(pageIdx, table.getPageCount()) as button}
					{#if button}
						{@const current = button === pageIdx + 1}
						<button
							aria-current={current ? 'page' : null}
							class={classes(
								current
									? 'z-10 border-indigo-500 bg-indigo-50 text-indigo-600'
									: 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50',
								'relative inline-flex items-center border px-4 py-2 text-sm font-medium',
							)}
							on:click={() => table.setPageIndex(button - 1)}
						>
							{button}
						</button>
					{:else}
						<span
							class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
						>
							...
						</span>
					{/if}
				{/each}
				<button
					class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
					on:click={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					<span class="sr-only">Next</span>
					<HeroiconsChevronRight20Solid class="h-5 w-5" aria-hidden="true" />
				</button>
			</nav>
		</div>
	</div>
</div>

<style lang="postcss">
	nav button:disabled {
		@apply cursor-not-allowed opacity-50;
	}
</style>
