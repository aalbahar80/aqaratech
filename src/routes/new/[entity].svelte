<script context="module" lang="ts">
	import Form from '$components/form/Form.svelte';
	import {
		entityDefinitions,
		isEntity,
		singular,
		type Entity,
	} from '$lib/definitions/index';
	import type { Load } from './[entity]';

	export const load: Load = ({ params, url }) => {
		const { entity } = params;
		if (isEntity(entity)) {
			const predefined = Object.fromEntries(url.searchParams.entries());
			return {
				props: { entity, predefined },
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
	export let predefined: Record<string, string>;

	const defaultForm = entityDefinitions[entity].defaultForm();
	const data = {
		...defaultForm,
		...predefined,
	};
</script>

<svelte:head>
	<title>{`New ${singular[entity]}`}</title>
</svelte:head>

<Form {entity} {data} schema={entityDefinitions[entity].schema} />
