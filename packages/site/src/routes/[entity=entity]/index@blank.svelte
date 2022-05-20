<script context="module" lang="ts">
	import TableParent from '$components/table/TableParent.svelte';
	import { trpc, type InferQueryOutput } from '$lib/client/trpc';
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

<TableParent {data} {total} {pagination} {entityTitle} />
