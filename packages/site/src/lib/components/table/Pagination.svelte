<script lang="ts">
	import { page } from '$app/stores';
	import { getTableUrl } from '$lib/utils/table-utils';
	import type { PaginatedDto } from '@self/sdk';

	export let pagination: PaginatedDto;

	const newPageHref = (url: URL, newPageIndex: number) =>
		getTableUrl(url, { p: newPageIndex.toString() });

	$: nextPageHref = newPageHref($page.url, pagination.page + 1);
	$: prevPageHref = newPageHref($page.url, pagination.page - 1);
</script>

<nav
	class="flex items-center justify-between rounded-lg rounded-t-none border-t border-gray-200 bg-white px-4 py-3 shadow sm:px-6"
	aria-label="Pagination"
>
	<div class="hidden sm:block">
		<p class="text-sm text-gray-700">
			Showing <span class="font-medium">{pagination.start}</span> to
			<span class="font-medium">{pagination.end}</span>
			of{' '}
			<span class="font-medium">{pagination.pageSize}</span> results
		</p>
	</div>
	<div class="flex flex-1 justify-between sm:justify-end">
		<a
			class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
			class:disabled-anchor={!pagination.hasPreviousPage}
			href={pagination.hasPreviousPage ? prevPageHref : null}
			rel="prev"
			sveltekit:noscroll
			sveltekit:prefetch
		>
			Previous
		</a>
		<a
			class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
			class:disabled-anchor={!pagination.hasNextPage}
			href={pagination.hasNextPage ? nextPageHref : null}
			rel="next"
			sveltekit:noscroll
			sveltekit:prefetch
		>
			Next
		</a>
	</div>
</nav>

<style lang="postcss">
	.disabled-anchor {
		@apply cursor-not-allowed opacity-50;
	}
</style>
