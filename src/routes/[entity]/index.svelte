<script context="module" lang="ts">
	import { page } from '$app/stores';
	import TableParent from '$components/table/TableParent.svelte';
	import trpc from '$lib/client/trpc';
	import { isEntity } from '$lib/definitions';
	import type { Load } from '@sveltejs/kit';
	import startCase from 'lodash-es/startCase.js';

	export const load: Load = async ({ url, params }) => {
		const { entity } = params;
		if (isEntity(entity)) {
			const pageIndex = url.searchParams.get('p');
			const [total, { data: rows, pagination }] = await Promise.all([
				trpc.query(`${entity}:count`),
				trpc.query(`${entity}:list`, { pageIndex }),
			]);
			return {
				props: { total, pagination, rows },
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
	export let total: number;
	export let pagination: any;
</script>

<svelte:head>
	<title>{startCase($page.params.entity)}</title>
</svelte:head>

<TableParent {rows} {total} {pagination} />
