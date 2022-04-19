<script context="module" lang="ts">
	import TableParent from '$components/table/TableParent.svelte';
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import PropertyList from '$lib/components/property/PropertyList.svelte';
	import type { Entity } from '$models/interfaces/entity.interface';
	import startCase from 'lodash-es/startCase.js';
	import type { Load } from './[entity=entity]';

	type OwnerEntity = Extract<Entity, 'leases' | 'properties'>;
	export const load: Load = async ({ url, params }) => {
		const entity = params.entity as OwnerEntity;
		const pageIndex = url.searchParams.get('p');
		const [{ data, pagination }] = await Promise.all([
			trpc.query(`owner:${entity}:list`, {
				pageIndex,
				clientId: params.ownerId,
			}),
		]);
		return {
			props: { entity, pagination, data },
		};
	};
</script>

<script lang="ts">
	// type T = $$Generic<OwnerEntity>;
	type T = $$Generic<OwnerEntity>;
	export let entity: T;
	export let data: InferQueryOutput<`owner:${T}:list`>['data'];
	export let pagination: InferQueryOutput<`owner:${T}:list`>['pagination'];
</script>

<svelte:head>
	<title>{startCase(entity)}</title>
</svelte:head>

{#if entity === 'properties'}
	<div class="mx-auto flex max-w-4xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
		<PropertyList properties={data} readOnly />
	</div>
{:else}
	<TableParent {data} total={data.length} {pagination} />
{/if}
