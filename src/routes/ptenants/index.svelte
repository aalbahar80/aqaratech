<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, url }) => {
		const pageSize = url.searchParams.get('pageSize') || '10';
		const pageIndex = url.searchParams.get('page') || '1';
		const search = url.searchParams.get('search') || '';
		const res = await fetch(
			`/ptenants.json?page=${pageIndex}&pageSize=${pageSize}&search=${search}`,
		);
		const { tenants, total } = await res.json();
		return {
			props: {
				tenants,
				total,
				pageSize,
			},
		};
	};
</script>

<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { Order_By } from '$generated/graphql';
	import {
		DataTable,
		Pagination,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
	} from 'carbon-components-svelte';
	import Button from 'carbon-components-svelte/src/Button/Button.svelte';
	import type { DataTableHeader } from 'carbon-components-svelte/types/DataTable/DataTable.svelte';
	import startCase from 'lodash-es/startCase';
	import keys from 'lodash-es/keys';
	import type { Tenant } from '@prisma/client';

	export let tenants: Tenant[];
	export let total: number;
	export let pageSize: number;

	// PAGINATION
	const pageIndex = Number($page.url.searchParams.get('page')) || 1;

	const handlePageChange = (pageNumber: number) => {
		const params = new URLSearchParams($page.url.searchParams.toString());

		if (pageNumber === 1) {
			params.delete('page');
		} else {
			params.set('page', encodeURIComponent(pageNumber));
		}

		const url = `${$page.url.pathname}?${params.toString()}`;
		goto(url, {
			noscroll: true,
			keepfocus: true,
		}).catch((err) => {
			console.error(err);
		});
	};

	// SEARCH
	let searchInput = $page.url.searchParams.get('search') || '';

	// flag to reset page number while user is actively searching
	let forceFirstPage = false;
	const handleSearchChange = (newSearchInput: string) => {
		if (!browser) return;

		const params = new URLSearchParams($page.url.searchParams.toString());

		if (newSearchInput) {
			params.set('search', newSearchInput);
		} else {
			params.delete('search');
		}

		if (forceFirstPage) params.set('page', encodeURIComponent(1));
		forceFirstPage = false;

		const url = `${$page.url.pathname}?${params.toString()}`;
		goto(url, {
			noscroll: true,
			keepfocus: true,
			replaceState: true,
		}).catch((err) => {
			console.error(err);
		});
	};
	$: handleSearchChange(searchInput);

	// SORT
	const handleSortChange = (
		newSortKey: string,
		newSortDir: 'ascending' | 'descending' | 'none' | undefined,
	) => {
		let dir;
		switch (newSortDir) {
			case 'ascending':
				dir = 'asc';
				break;
			case 'descending':
				dir = 'desc';
				break;
			default:
				dir = null;
				break;
		}

		const params = new URLSearchParams($page.url.searchParams.toString());

		if (dir) {
			params.set('sortDir', encodeURIComponent(dir));
			params.set('sortKey', encodeURIComponent(newSortKey));
		} else {
			// declutter URL if default sort is selected
			params.delete('sortDir');
			params.delete('sortKey');
		}

		params.set('page', encodeURIComponent(1));

		const url = `${$page.url.pathname}?${params.toString()}`;
		goto(url, {
			noscroll: true,
			keepfocus: true,
			replaceState: true,
		}).catch((err) => {
			console.error(err);
		});
	};

	$: sortKey = $page.url.searchParams.get('sortKey');
	$: sortDir = $page.url.searchParams.get('sortDir') as Order_By;
	$: sortingInfo = sortKey && sortDir ? { [sortKey]: sortDir } : { id: 'asc' };

	// TABLE
	const headers: DataTableHeader[] = keys(tenants[0]).map((key) => ({
		key,
		value: startCase(key),
	}));
</script>

<pre>{JSON.stringify(tenants)}</pre>
<DataTable zebra sortable {headers} rows={tenants || []}>
	<Toolbar>
		<ToolbarContent>
			<ToolbarSearch
				bind:value={searchInput}
				on:input={() => {
					forceFirstPage = true;
				}}
				on:clear={() => {
					forceFirstPage = true;
				}}
			/>
			<Button href={`${$page.url.pathname}/add`}>New</Button>
		</ToolbarContent>
	</Toolbar>

	<svelte:fragment slot="cell" let:row let:cell>
		{#if cell.key === 'overflow'}
			<Button
				href={`${$page.url.pathname}/${row.id}`}
				kind="ghost"
				sveltekit:prefetch
			>
				View</Button
			>
		{:else}
			<slot name="isPaid" {cell}>
				{cell.value}
			</slot>
		{/if}
	</svelte:fragment>
</DataTable>

<Pagination
	totalItems={total}
	{pageSize}
	pageSizeInputDisabled
	page={pageIndex}
	pageInputDisabled
	on:click:button--next={(e) => {
		handlePageChange(e.detail.page);
	}}
	on:click:button--previous={(e) => {
		handlePageChange(e.detail.page);
	}}
/>
