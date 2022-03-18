<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import type { PaginationInfo } from '$lib/utils/table-utils';
	import Pagination from './Pagination.svelte';
	import Table from './Table.svelte';

	let modifier: number = 1;

	const setModifier = (from: number, to: number) => {
		if (from < to) {
			return 1;
		}
		if (from > to) {
			return -1;
		}
		return 1;
	};

	beforeNavigate(({ from, to }) => {
		const oldPage = Number(from.searchParams.get('p'));
		const newPage = Number(to?.searchParams.get('p'));
		const result = setModifier(oldPage, newPage);
		modifier = result;
	});

	export let total: number;
	export let pagination: PaginationInfo;
	export let data: { id: string; [key: string]: unknown }[];

	// add view & edit to each row
	$: rows = data.map((row) => ({
		...row,
		view: `${row.id}`,
		edit: `${row.id}/edit`,
	}));
</script>

<div class="mx-auto mt-8 flex max-w-screen-2xl flex-col px-2 sm:px-6 lg:px-8">
	<a href={`${$page.url.pathname}/add`} class="table__add-button"> New </a>
	<Table {rows} {modifier} />
	<Pagination {total} currentSize={data.length} {pagination} />
</div>

<style lang="postcss">
	.table__add-button {
		@apply mb-6 inline-flex w-1/6 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2;
	}
</style>
