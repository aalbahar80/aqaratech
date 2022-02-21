<script lang="ts">
	import { page } from '$app/stores';
	import { getTableUrl, type PaginationInfo } from '$lib/utils/table-utils';

	export let total: number;
	export let currentSize: number;
	export let pagination: PaginationInfo;

	$: currentPage = Number($page.url.searchParams.get('p')) || 1;

	const newPageHref = (newPageIndex: number) =>
		getTableUrl($page.url, { p: newPageIndex.toString() });

	$: nextPageHref = newPageHref(currentPage + 1);
	$: prevPageHref = newPageHref(currentPage > 1 ? currentPage - 1 : 1);
</script>

<nav
	class="flex items-center justify-between rounded-lg rounded-t-none border-t border-gray-200 bg-white px-4 py-3 shadow sm:px-6"
	aria-label="Pagination"
>
	<div class="hidden sm:block">
		<p class="text-sm text-gray-700">
			Showing <span class="font-medium">{pagination.start}</span> to
			<span class="font-medium">{pagination.start + currentSize}</span>
			of{' '}
			<span class="font-medium">{total}</span> results
		</p>
	</div>
	<div class="flex flex-1 justify-between sm:justify-end">
		<a
			class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
			class:disabled-anchor={currentPage < 2}
			href={prevPageHref}
			sveltekit:noscroll
			rel="prev"
		>
			Previous
		</a>
		<a
			class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
			href={nextPageHref}
			rel="next"
			sveltekit:noscroll
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
