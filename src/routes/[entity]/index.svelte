<script context="module" lang="ts">
	import { page } from '$app/stores';
	import TableParent from '$components/table/TableParent.svelte';
	import trpc from '$lib/client/trpc';
	import type { Load } from '@sveltejs/kit';

	const entities = ['tenants', 'leases'] as const;
	type Entity = typeof entities[number];

	function isEntity(entity: string | Entity): entity is Entity {
		return entities.includes(entity as Entity);
	}

	export const load: Load = async ({ url, params }) => {
		const { entity } = params;
		if (isEntity(entity)) {
			const pageIndex = url.searchParams.get('p');
			const rows = await trpc.query(`${entity}:list`, pageIndex);
			return {
				props: { rows },
			};
		}
		return {
			status: 404,
			error: 'Unknown entity',
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
