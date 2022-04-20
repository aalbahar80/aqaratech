<script context="module" lang="ts">
	import TableParent from '$components/table/TableParent.svelte';
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import PropertyList from '$lib/components/property/PropertyList.svelte';
	import UnitsList from '$lib/components/unit/UnitsList.svelte';
	import type { Entity } from '$models/interfaces/entity.interface';
	import startCase from 'lodash-es/startCase.js';
	import type { Load } from './[entity=entity]';

	type OwnerEntity = Extract<Entity, 'properties' | 'units' | 'leases'>;
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
	interface E<K extends OwnerEntity> {
		name: K;
		data: InferQueryOutput<`owner:${K}:list`>['data'];
		pagination: InferQueryOutput<`owner:${K}:list`>['pagination'];
	}
	type Model = E<'leases'> | E<'properties'> | E<'units'>;
	export let model: Model;

	const { name, data, pagination } = model;
</script>

<svelte:head>
	<title>{startCase(model.name)}</title>
</svelte:head>

{#if name === 'properties'}
	<div class="mx-auto flex max-w-4xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
		<PropertyList properties={data} readOnly />
	</div>
{:else if name === 'units'}
	<div class="mx-auto flex max-w-4xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
		<UnitsList units={data} readOnly />
	</div>
{:else}
	<TableParent {data} total={data.length} {pagination} />
{/if}
