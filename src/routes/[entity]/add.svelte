<script context="module" lang="ts">
	import Form from '$components/form/Form.svelte';
	import {
		entityDefinitions,
		isEntity,
		singular,
		type Entity,
	} from '$lib/definitions/index';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ params }) => {
		const { entity } = params;
		if (isEntity(entity)) {
			return {
				props: { entity },
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
</script>

<svelte:head>
	<title>{`New ${singular[entity]}`}</title>
</svelte:head>

<Form
	{entity}
	data={entityDefinitions[entity].defaultForm()}
	schema={entityDefinitions[entity].schema}
/>
