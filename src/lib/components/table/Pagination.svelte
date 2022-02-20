<script lang="ts">
	import { page } from '$app/stores';
	import { getTableUrl } from '$lib/utils/table-utils';
	import { ChevronLeft, ChevronRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let start: number = 1;
	export let end: number = 12;

	const newPageHref = (newPageIndex: number) =>
		getTableUrl($page.url, { p: newPageIndex.toString() });

	$: nextPageHref = newPageHref(
		(Number($page.url.searchParams.get('p')) || 1) + 1,
	);
	$: prevPageHref = newPageHref(
		(Number($page.url.searchParams.get('p')) || 1) - 1,
	);
</script>

<div
	class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
>
	<div class="flex flex-1 justify-between sm:hidden">
		<a
			href="#"
			class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
		>
			Previous
		</a>
		<a
			href="#"
			class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
		>
			Next
		</a>
	</div>
	<div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
		<div>
			<p class="text-sm text-gray-700">
				Showing <span class="font-medium">{start}</span> to
				<span class="font-medium">{end}</span>
				of{' '}
				<span class="font-medium">{111}</span> results
			</p>
		</div>
		<div>
			<nav
				class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
				aria-label="Pagination"
			>
				<a
					class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
					href={prevPageHref}
					sveltekit:noscroll
					rel="prev"
				>
					<span class="sr-only">Previous</span>
					<Icon src={ChevronLeft} class="h-5 w-5" aria-hidden="true" />
				</a>
				<!-- {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */} -->
				<a
					href="#"
					aria-current="page"
					class="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600"
				>
					1
				</a>
				<a
					href="#"
					class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
				>
					2
				</a>
				<a
					href="#"
					class="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 md:inline-flex"
				>
					3
				</a>
				<span
					class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
				>
					...
				</span>
				<a
					href="#"
					class="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 md:inline-flex"
				>
					8
				</a>
				<a
					href="#"
					class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
				>
					9
				</a>
				<a
					href="#"
					class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
				>
					10
				</a>
				<a
					class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
					href={nextPageHref}
					sveltekit:noscroll
					rel="next"
				>
					<span class="sr-only">Next</span>
					<Icon src={ChevronRight} class="h-5 w-5" aria-hidden="true" />
				</a>
			</nav>
		</div>
	</div>
</div>
