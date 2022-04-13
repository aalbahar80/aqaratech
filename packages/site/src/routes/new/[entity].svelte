<script context="module" lang="ts">
	import { page } from '$app/stores';
	import Form from '$components/form/Form.svelte';
	import type { Entity } from '$lib/models/interfaces/entity.interface';
	import { getModel } from '$lib/models/interfaces/utils/get-model';
	import type { Load } from './[entity]';

	type Params = Parameters<Load>['0']['params'];
	export const load: Load = ({ url }) => {
		const predefined = Object.fromEntries(url.searchParams.entries());
		return {
			props: { predefined },
		};
	};
</script>

<script lang="ts">
	export let predefined: Record<string, string>;

	const model = getModel($page.params.entity as Params['entity'] as Entity);
	const defaultForm = model.defaultForm();
	const data = {
		...defaultForm,
		...predefined,
	};
</script>

<svelte:head>
	<title>{`New ${model.singular}`}</title>
</svelte:head>

<Form {model} {data} />
