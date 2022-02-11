<script context="module" lang="ts">
	import TableParent from '$components/table/TableParent.svelte';
	import type { Load } from '@sveltejs/kit';
	import defs, { type EntityDefinitions } from '$lib/definitions/index';
	import { page } from '$app/stores';

	export const load: Load = async ({ fetch, url }) => {
		const newUrl = `${url.pathname}.json${url.search}`;
		const res = await fetch(newUrl);
		const data = await res.json();
		return {
			props: data,
		};
	};
</script>

<script lang="ts">
	export let rows: any[];
	const entityDefs: EntityDefinitions =
		defs?.[$page.params.entity as keyof typeof defs];
</script>

<svelte:head>
	<title>{$page.params.entity}</title>
</svelte:head>

<TableParent {rows} />
