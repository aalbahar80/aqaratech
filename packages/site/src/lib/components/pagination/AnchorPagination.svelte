<script lang="ts">
	import { page } from '$app/stores';
	import { getButtons } from '$lib/components/table/pagination';
	import { DEFAULT_PAGINATION_KEY } from '$lib/constants/pagination-keys';
	import { classes } from '$lib/utils/classes';
	import { getQuery } from '$lib/utils/set-query';
	import type { PaginatedDto } from '$api/openapi';
	import { ChevronLeft, ChevronRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let pagination: PaginatedDto;
	export let key = DEFAULT_PAGINATION_KEY;

	const getPageHref = (newPage: number, url: URL) =>
		getQuery({
			url,
			queries: [{ title: key, value: newPage }],
		}).href;

	$: nextPageHref = getPageHref(pagination.page + 1, $page.url);
	$: prevPageHref = getPageHref(pagination.page - 1, $page.url);

	$: buttons = getButtons(pagination.page, pagination.pageCount);
</script>

<div
	class="flex items-center justify-between rounded-md rounded-t-none border-t border-gray-200 bg-white px-4 py-3 shadow-sm sm:px-6"
	data-sveltekit-noscroll
>
	<div class="flex flex-1 sm:hidden">
		<a
			class="relative inline-flex w-32 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
			href={pagination.hasPreviousPage ? prevPageHref : null}
			class:disabled-anchor={!pagination.hasPreviousPage}
		>
			Previous
		</a>
		<a
			class="relative ml-3 inline-flex w-32 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
			href={pagination.hasNextPage ? nextPageHref : null}
			class:disabled-anchor={!pagination.hasNextPage}
		>
			Next
		</a>
	</div>
	<div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
		<div>
			<p class="text-sm text-gray-700">
				Showing <span class="font-medium">{pagination.start}</span> to
				<span class="font-medium">{pagination.end}</span>
				of{' '}
				<span class="font-medium">{pagination.itemCount}</span> results
			</p>
		</div>
		<div>
			<nav
				class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
				aria-label="Pagination"
			>
				<a
					class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
					href={pagination.hasPreviousPage ? prevPageHref : null}
					class:disabled-anchor={!pagination.hasPreviousPage}
				>
					<span class="sr-only">Previous</span>
					<Icon src={ChevronLeft} class="h-5 w-5" aria-hidden="true" />
				</a>
				{#each buttons as button}
					{#if button}
						{@const current = button === pagination.page}
						<a
							aria-current={current ? 'page' : null}
							href={getPageHref(button, $page.url)}
							class={classes(
								current
									? 'z-10 border-indigo-500 bg-indigo-50 text-indigo-600'
									: 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50',
								'relative inline-flex items-center border px-4 py-2 text-sm font-medium',
							)}
						>
							{button}
						</a>
					{:else}
						<span
							class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
						>
							...
						</span>
					{/if}
				{/each}
				<a
					class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
					href={pagination.hasNextPage ? nextPageHref : null}
					class:disabled-anchor={!pagination.hasNextPage}
				>
					<span class="sr-only">Next</span>
					<Icon src={ChevronRight} class="h-5 w-5" aria-hidden="true" />
				</a>
			</nav>
		</div>
	</div>
</div>

<style lang="postcss">
	.disabled-anchor {
		@apply cursor-not-allowed opacity-50;
	}
</style>
