<script context="module" lang="ts">
	import TableParent from '$components/table/TableParent.svelte';
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import type { Entity } from '$models/interfaces/entity.interface';
	import startCase from 'lodash-es/startCase.js';
	import type { Load } from './[entity=entity]';

	type OwnerEntity = Extract<Entity, 'leases'>;
	export const load: Load = async ({ url, params }) => {
		const entity = params.entity as OwnerEntity;
		const pageIndex = url.searchParams.get('p');
		const [{ data, pagination }] = await Promise.all([
			trpc.query(`owner:${entity}:list`, { pageIndex, clientId: params.id }),
		]);
		return {
			props: { entity, pagination, data },
		};
	};
</script>

<script lang="ts">
	export let entity: OwnerEntity;
	export let data: InferQueryOutput<`owner:${typeof entity}:list`>['data'];
	export let pagination: InferQueryOutput<`owner:${typeof entity}:list`>['pagination'];
</script>

<svelte:head>
	<title>{startCase(entity)}</title>
</svelte:head>

<TableParent {data} total={data.length} {pagination} />
