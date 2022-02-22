<script context="module" lang="ts">
	import TableParent from '$components/table/TableParent.svelte';
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import { isEntity, singular, type Entity } from '$lib/definitions';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ url, params }) => {
		const { entity } = params;
		if (isEntity(entity)) {
			const pageIndex = url.searchParams.get('p');
			const [total, { data, pagination }] = await Promise.all([
				trpc.query(`${entity}:count`),
				trpc.query(`${entity}:list`, { pageIndex }),
			]);
			return {
				props: { total, pagination, data },
			};
		}
		return {
			status: 404,
			error: 'Unknown entity',
		};
	};
</script>

<script lang="ts">
	export let entity: Entity;
	export let data: InferQueryOutput<`${typeof entity}:list`>['data'];
	export let total: InferQueryOutput<`${typeof entity}:count`>;
	export let pagination: InferQueryOutput<`${typeof entity}:list`>['pagination'];
</script>

<svelte:head>
	<title>{`${singular[entity]}`}</title>
</svelte:head>

<TableParent {data} {total} {pagination} />
