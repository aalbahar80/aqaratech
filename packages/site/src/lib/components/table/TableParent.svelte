<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import type { EntityTitle } from '$lib/models/types/entity.type';
	import { create } from '$lib/utils/route-helpers';
	import type { PaginatedDto } from '@self/sdk';
	import Table from './Table.svelte';

	interface Data {
		results: Array<{ id: string }>;
		pagination: PaginatedDto;
	}

	export let data: Data;
	$: entity = $page.params.entity as EntityTitle;
	$: formUrl = create({ entity });

	// animation
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

	// add view & edit to each row
	$: rows = data.results.map((row) => ({
		...row,
		view: `${row.id}`,
		// edit: `${row.id}/edit`,
	}));
</script>

<div class="mx-auto flex max-w-7xl flex-col p-4 sm:p-6 lg:p-8">
	<a href={formUrl} class="table__add-button" sveltekit:prefetch> New </a>
	{#if rows.length}
		<Table {rows} {modifier} />
		<AnchorPagination pagination={data.pagination} />
	{:else}
		<EmptyState {entity} {formUrl} />
	{/if}
</div>

<style lang="postcss">
	.table__add-button {
		@apply mb-6 inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-1/6;
	}
</style>
