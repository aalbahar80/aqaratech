<script context="module" lang="ts">
	import { page } from '$app/stores';
	import TableParent from '$components/table/TableParent.svelte';
	import type { Load } from '@sveltejs/kit';

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
</script>

<svelte:head>
	<title>{$page.params.entity}</title>
</svelte:head>

<TableParent {rows} />
