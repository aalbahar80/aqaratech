<script context="module" lang="ts">
	import { logger } from '$lib/config/logger';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, url }) => {
		const pageSize = url.searchParams.get('pageSize') || '2';
		const pageIndex = url.searchParams.get('pageIndex') || '1';
		const res = await fetch(
			`/ptenants.json?pageIndex=${pageIndex}&pageSize=${pageSize}`,
		);
		const { tenants } = await res.json();
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
	import { goto } from '$app/navigation';
	import NextPrev from '$components/breadcrumbs/NextPrev.svelte';
	import { page } from '$app/stores';
	import { Pagination } from 'carbon-components-svelte';

	export let tenants: any;
	console.log(tenants);

	$: pageSize = Number($page.url.searchParams.get('pageSize'));
	const headers: DataTableHeader[] = keys(tenants[0]).map((key) => ({
		key,
		value: startCase(key),
	}));

	$: pageIndex = $page.params.pageIndex;

	const handlePageChange = (pageNumber: number) => {
		const params = new URLSearchParams($page.url.searchParams.toString());

		if (pageNumber === 1) {
			params.delete('pageIndex');
		} else {
			params.set('pageIndex', encodeURIComponent(pageNumber));
		}

		const url = `${$page.url.pathname}?${params.toString()}`;
		goto(url, {
			noscroll: true,
			keepfocus: true,
		}).catch((err) => {
			console.error(err);
		});
	};
</script>

<a href={`/ptenants/${+pageIndex + 1}`}>go next</a>
<a href={`/ptenants/${+pageIndex + 1}?pageSize=1`}>go next</a>

<NextPrev id={pageIndex} path={$page.url.pathname.split('/')[1]} />

<svelte:head>
	<title>Tenants</title>
</svelte:head>

<DataTable zebra sortable {headers} rows={tenants} />

<Pagination
	{pageSize}
	pageSizes={[1, 2, 3]}
	on:click:button--next={(e) => {
		console.log('update happened', e.detail);
		handlePageChange(e.detail.page);
	}}
/>
<!-- <Pagination
	goto(`/ptenants?pageIndex=${e.detail.page}&pageSize=${pageSize}`);
	on:update={(e) =>
		goto(`/ptenants?pageIndex=${e.detail.page}&pageSize=${e.detail.pageSize}`)}
	{pageSize}
	page={pageIndex}
	{totalItems}
	on:click:button--next={(e) => {
		invalidate($page.url.pathName);
		goto('/ptenants/3');
	}}
/> -->
