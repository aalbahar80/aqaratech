<script context="module" lang="ts">
	import { page } from '$app/stores';
	import Form from '$components/form/Form.svelte';
	import type { Entity } from '$lib/models/types';
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
	export let predefined: Record<string, string>;

	const entity = $page.params.entity as Entity;
	const cstor = classMap[entity];
	const defaultForm = cstor.defaultForm();
	const data = {
		...defaultForm,
		...predefined,
	};
</script>

<svelte:head>
	<title>{`New ${cstor.singularCap}`}</title>
</svelte:head>

<Form {cstor} {data} />
