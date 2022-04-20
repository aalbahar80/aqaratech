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
			props: { model: { name: entity, pagination, data } },
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
</script>

<svelte:head>
	<title>{startCase(model.name)}</title>
</svelte:head>

{#if model.name === 'properties'}
	<div class="mx-auto flex max-w-4xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
		<PropertyList properties={model.data} readOnly />
	</div>
{:else if model.name === 'units'}
	<div class="mx-auto flex max-w-4xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
		<UnitsList units={model.data} readOnly />
	</div>
{:else}
	<TableParent
		data={model.data}
		total={model.data.length}
		pagination={model.pagination}
	/>
{/if}
