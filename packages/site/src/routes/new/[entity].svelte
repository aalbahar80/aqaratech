<script context="module" lang="ts">
	import { page } from '$app/stores';
	import Form from '$components/form/Form.svelte';
	import type { EntityTitle } from '$lib/models/types/entity.type';
	import { classMap } from '../../lib/models/classes/all.class';
	import type { Load } from './[entity]';

	export const load: Load = ({ url }) => {
		const predefined = Object.fromEntries(url.searchParams.entries());
		return {
			props: { predefined },
		};
	};
</script>

<script lang="ts">
	export let predefined: any;

	const entityName = $page.params.entity as EntityTitle;
	const entity = new classMap[entityName](predefined);
	entity.data = { ...entity.defaultForm(), ...predefined };
</script>

<svelte:head>
	<title>{`New ${entity.singularCap}`}</title>
</svelte:head>

<Form {entity} />
