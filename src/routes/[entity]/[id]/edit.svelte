<script context="module" lang="ts">
	import Form from '$components/form/Form.svelte';
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import { singular, type Entity } from '$lib/definitions';
	import { isEntity, entityDefinitions } from '$lib/definitions/index';
	import type { Load } from './edit';

	export const load: Load = async ({ params, fetch }) => {
		const { entity, id } = params;
		if (!isEntity(entity)) {
			return {
				status: 404,
				error: 'Unknown entity',
			};
		}
		const data = await trpc(fetch).query(`${entity}:basic`, id);
		if (data) {
			return {
				props: { data, entity },
			};
		}
		return { error: 'id not found', status: 404 };
	};
</script>

<script lang="ts">
	export let entity: Entity;
	export let data: InferQueryOutput<`${typeof entity}:basic`>;
</script>

<svelte:head>
	<title>{`Edit ${singular[entity]}`}</title>
</svelte:head>

<Form {data} {entity} schema={entityDefinitions[entity].schema} />
