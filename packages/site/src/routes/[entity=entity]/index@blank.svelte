<script context="module" lang="ts">
	import TableParent from '$components/table/TableParent.svelte';
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import type { Entity } from '$models/interfaces/entity.interface';
	import startCase from 'lodash-es/startCase.js';
	import type { Load } from './index';

	export const load: Load = async ({ url, params }) => {
		const entity = params.entity as Entity;
		const pageIndex = url.searchParams.get('p');
		const [total, { data, pagination }] = await Promise.all([
			trpc.query(`${entity}:count`),
			trpc.query(`${entity}:list`, { pageIndex }),
		]);
		return {
			props: { entity, total, pagination, data },
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
