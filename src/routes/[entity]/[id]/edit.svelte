<script context="module" lang="ts">
	import { page } from '$app/stores';
	import Form from '$components/form/Form.svelte';
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import { PropertyModel } from '$lib/models/interfaces/property.interface';
	import type { Entity, Model } from '$models/interfaces/entity.interface';
	import type { Load } from './edit';

	type Params = Parameters<Load>['0']['params'];
	export const load: Load = async ({ params, fetch }) => {
		const id = params.id;
		const entity = params.entity as Entity;
		const data = await trpc(fetch).query(`${entity}:basic`, id);
		return {
			props: { data, entity },
		};
	};
</script>

<script lang="ts">
	export let data: InferQueryOutput<`${typeof model.plural}:basic`>;

	const getModel = (entity: Entity): Model => {
		if (entity === 'properties') {
			return PropertyModel;
		}
		throw new Error(`Unknown entity: ${entity}`);
	};
	const model = getModel($page.params.entity as Params['entity'] as Entity);
</script>

<svelte:head>
	<title>{`Edit ${model.singular}`}</title>
</svelte:head>

<Form {data} {model} />
