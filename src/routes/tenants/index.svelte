<script context="module" lang="ts">
	import { invalidate } from '$app/navigation';
	import TablePrisma from '$components/table/TablePrisma.svelte';
	import type { Tenant } from '@prisma/client';
	import type { Load } from '@sveltejs/kit';
	import { onMount } from 'svelte';

	export const load: Load = async ({ props, url, params }) => {
		console.log(url);
		console.log(params);
		console.log('running load');
		// if (url.search) '';
		return {
			props,
		};
	};
</script>

<script lang="ts">
	import SlideOverForm from '$components/form/SlideOverForm.svelte';

	export let rows: Tenant[];
	export let totalItems: number;
	export let pageSize: number;
	// onMount(async () => {
	// 	await invalidate('/tenants');
	// });
</script>

<!-- <TablePrisma {rows} {totalItems} {pageSize} /> -->
<SlideOverForm />
