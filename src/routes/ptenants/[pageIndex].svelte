<script context="module" lang="ts">
	import { logger } from '$lib/config/logger';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, params }) => {
		const res = await fetch(`/ptenants/${params.pageIndex}.json`);
		const { tenants } = await res.json();
		console.log(tenants);
		logger.warn({ tenants }, '[pageIndex].svelte ~ 8');
		return {
			props: {
				tenants,
			},
		};
	};
</script>

<script lang="ts">
	import DataTable from 'carbon-components-svelte/src/DataTable/DataTable.svelte';
	import { keys, startCase } from 'lodash-es';
	import type { DataTableHeader } from 'carbon-components-svelte/types/DataTable/DataTable.svelte';
	import Pagination from 'carbon-components-svelte/src/Pagination/Pagination.svelte';
	import { goto, invalidate } from '$app/navigation';
	import { browser } from '$app/env';
	import NextPrev from '$components/breadcrumbs/NextPrev.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	export let tenants: any;
	// export let pageSize: number;
	// export let totalItems: number;

	$: console.log(pageIndex);
	$: console.log(tenants[0]);
	// $: if (browser) goto(`/tenants?pageIndex=${pageIndex}&pageSize=${pageSize}`);

	const headers: DataTableHeader[] = keys(tenants[0]).map((key) => ({
		key,
		value: startCase(key),
		// sort: () => 0,
	}));

	$: pageIndex = $page.params.pageIndex;
</script>

<a href={`/ptenants/${+pageIndex + 1}`}>go next</a>

<NextPrev id={pageIndex} path={$page.url.pathname.split('/')[1]} />

<svelte:head>
	<title>Tenants</title>
</svelte:head>
<pre>{JSON.stringify(tenants)}</pre>
<DataTable zebra sortable {headers} rows={tenants} />
<!-- <Pagination
	{pageSize}
	page={pageIndex}
	{totalItems}
	on:click:button--next={(e) => {
		invalidate($page.url.pathName);
		goto('/ptenants/3');
	}}
/> -->
