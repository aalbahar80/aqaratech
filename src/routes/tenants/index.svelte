<script context="module" lang="ts">
	import { page } from '$app/stores';
	import TableParent from '$components/table/TableParent.svelte';
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ url }) => {
		const pageIndex = url.searchParams.get('p');
		const rows = await trpc.query('tenants:list', pageIndex);
		return {
			props: { rows },
		};
	};
</script>

<script lang="ts">
	type Tenants = InferQueryOutput<'tenants:list'>;
	export let rows: Tenants;
</script>

<svelte:head>
	<title>{$page.params.entity}</title>
</svelte:head>

<TableParent {rows} />
