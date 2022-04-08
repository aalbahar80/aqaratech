<script context="module" lang="ts">
	import TableParent from '$components/table/TableParent.svelte';
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import { isEntity, type Entity } from '$lib/definitions';
	import startCase from 'lodash-es/startCase.js';
	import type { Load } from './index';

	export const load: Load = async ({ url, params, fetch }) => {
		const { entity } = params;
		if (isEntity(entity)) {
			const pageIndex = url.searchParams.get('p');
			const trpcClient = trpc(fetch);
			const [total, { data, pagination }] = await Promise.all([
				trpcClient.query(`${entity}:count`),
				trpcClient.query(`${entity}:list`, { pageIndex }),
			]);
			return {
				props: { entity, total, pagination, data },
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
	<title>{startCase(entity)}</title>
</svelte:head>

<TableParent {data} {total} {pagination} />
