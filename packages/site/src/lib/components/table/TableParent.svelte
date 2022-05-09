<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import { classMap } from '$lib/models/classes/all.class';
	import type { EntityTitle } from '$lib/models/types/entity.type';
	import type { PaginationInfo } from '$lib/utils/table-utils';
	import Pagination from './Pagination.svelte';
	import Table from './Table.svelte';

	export let entityTitle: EntityTitle;

	let modifier: number = 1;
	$: entity = classMap[entityTitle];
	$: createHref = `/new/${entity?.plural}`;

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
		// edit: `${row.id}/edit`,
	}));
</script>

<div class="mx-auto flex max-w-7xl flex-col p-4 sm:p-6 lg:p-8">
	<a
		href={`/new${$page.url.pathname}`}
		class="table__add-button"
		sveltekit:prefetch
	>
		New
	</a>
	{#if rows.length}
		<Table {rows} {modifier} />
		<Pagination {total} currentSize={data.length} {pagination} />
	{:else}
		<EmptyState {entity} {createHref} />
	{/if}
</div>

<style lang="postcss">
	.table__add-button {
		@apply mb-6 inline-flex w-1/6 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2;
	}
</style>
