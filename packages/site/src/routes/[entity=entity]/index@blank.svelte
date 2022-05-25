<script context="module" lang="ts">
	import TableParent from '$components/table/TableParent.svelte';
	import { trpc, type InferQueryOutput } from '$lib/client/trpc';
	import StackedList from '$lib/components/StackedList.svelte';
	import type { EntityTitle } from '$lib/models/types/entity.type';
	import { startCase } from '$lib/utils/common';
	import type { Load } from './__types/index@blank';

	export const load: Load = async ({ url, params, fetch }) => {
		const entityTitle = params.entity as EntityTitle;
		const pageIndex = url.searchParams.get('p');
		const [total, { data, pagination }] = await Promise.all([
			trpc(fetch).query(`${entityTitle}:count`),
			trpc(fetch).query(`${entityTitle}:list`, { pageIndex }),
		]);
		return {
			props: { total, pagination, data, entityTitle },
		};
	};
</script>

<script lang="ts">
	export let entityTitle: EntityTitle;
	export let data: InferQueryOutput<`${typeof entityTitle}:list`>['data'];
	export let total: InferQueryOutput<`${typeof entityTitle}:count`>;
	export let pagination: InferQueryOutput<`${typeof entityTitle}:list`>['pagination'];
</script>

<svelte:head>
	<title>{startCase(entityTitle)}</title>
</svelte:head>

{#if data.length}
	<TableParent {data} {total} {pagination} {entityTitle} />
{:else}
	<!-- Only using stacked list for its EmptyState (for now) -->
	<div class="mx-auto flex max-w-4xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
		<StackedList {entityTitle} count={data.length} />
	</div>
{/if}
