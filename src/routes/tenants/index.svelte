<script context="module" lang="ts">
	import TablePrisma from '$components/table/TablePrisma.svelte';
	import { parseParams } from '$lib/utils/table-utils';
	import type { Tenant } from '@prisma/client';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, url }) => {
		const {
			queryString,
			options: { pageSize },
		} = parseParams(url);
		const res = await fetch(`/tenants.json${queryString}`);
		const { rows, totalItems } = await res.json();
		return {
			props: {
				rows,
				totalItems,
				pageSize,
			},
		};
	};
</script>

<script lang="ts">
	export let rows: Tenant[];
	export let totalItems: number;
	export let pageSize: number;
</script>

<TablePrisma {rows} {totalItems} {pageSize} />
