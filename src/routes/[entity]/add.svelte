<script context="module" lang="ts">
	import FormGeneric from '$components/form/FormGeneric.svelte';
	import {
		entityDefinitions,
		isEntity,
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

<FormGeneric data={entityDefinitions[entity].defaultForm()} />
