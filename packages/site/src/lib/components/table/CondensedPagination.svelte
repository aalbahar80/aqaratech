<script lang="ts">
	import type { createPagination } from '$lib/components/table/pagination';
	import { classes } from '$lib/utils/classes';
	import { ChevronLeft, ChevronRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let pgn: ReturnType<typeof createPagination>;
</script>

<div
	class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
>
	<div class="flex flex-1 sm:hidden">
		<button
			class="relative inline-flex w-32 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
			on:click={pgn.previous}
			disabled={!$pgn.hasPrevious}
		>
			Previous
		</button>
		<button
			class="relative ml-3 inline-flex w-32 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
			on:click={pgn.next}
			disabled={!$pgn.hasNext}
		>
			Next
		</button>
	</div>
	<div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
		<div>
			<p class="text-sm text-gray-700">
				Showing <span class="font-medium">{$pgn.idxStart}</span> to
				<span class="font-medium">{$pgn.idxEnd}</span>
				of{' '}
				<span class="font-medium">{$pgn.itemCount}</span> results
			</p>
		</div>
		<div>
			<nav
				class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
				aria-label="Pagination"
			>
				<button
					class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
					on:click={pgn.previous}
					disabled={!$pgn.hasPrevious}
				>
					<span class="sr-only">Previous</span>
					<Icon src={ChevronLeft} class="h-5 w-5" aria-hidden="true" />
				</button>
				{#each $pgn.buttons as button}
					{#if button}
						{@const current = button === $pgn.pageIdx}
						<button
							aria-current={current ? 'page' : null}
							class={classes(
								current
									? 'z-10 border-indigo-500 bg-indigo-50 text-indigo-600'
									: 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50',
								'relative inline-flex items-center border px-4 py-2 text-sm font-medium',
							)}
							on:click={() => pgn.setPage(button)}
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
					on:click={pgn.next}
					disabled={!$pgn.hasNext}
				>
					<span class="sr-only">Next</span>
					<Icon src={ChevronRight} class="h-5 w-5" aria-hidden="true" />
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
