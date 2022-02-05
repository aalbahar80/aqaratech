<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Toolbar, ToolbarContent } from 'carbon-components-svelte';
	import Button from 'carbon-components-svelte/src/Button/Button.svelte';
	import DataTable from 'carbon-components-svelte/src/DataTable/DataTable.svelte';
	import Pagination from 'carbon-components-svelte/src/Pagination/Pagination.svelte';
	import ToolbarSearch from 'carbon-components-svelte/src/Search/Search.svelte';
	import type { DataTableHeader } from 'carbon-components-svelte/types/DataTable/DataTable.svelte';
	import keys from 'lodash-es/keys.js';
	import startCase from 'lodash-es/startCase.js';
	import concat from 'lodash-es/concat.js';

	export let rows: any[];
	export let totalItems: number;
	export let pageSize: number;

	// PAGINATION
	$: pageIndex = Number($page.url.searchParams.get('page')) || 1;

	const handlePageChange = (pageNumber: number) => {
		const params = new URLSearchParams($page.url.searchParams.toString());

		if (pageNumber === 1) {
			params.delete('page');
		} else {
			params.set('page', encodeURIComponent(pageNumber));
		}

		const url = `${$page.url.pathname}?${params.toString()}`;
		console.log('manual page change', url);
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
		const params = new URLSearchParams($page.url.searchParams.toString());

		if (newSearchInput) {
			params.set('search', newSearchInput);
		} else {
			params.delete('search');
		}

		if (forceFirstPage) params.set('page', 1);
		forceFirstPage = false;

		const url = `${$page.url.pathname}?${params.toString()}`;
		console.log('triggering url change', url);
		goto(url, {
			noscroll: true,
			keepfocus: true,
			replaceState: true,
		}).catch((err) => {
			console.error(err);
		});
	};

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

	// TABLE
	const overflow: DataTableHeader = {
		key: 'overflow',
		value: '',
		empty: false,
		sort: false,
	};
	const headers: DataTableHeader[] = concat(
		[overflow],
		keys(rows[0]).map((key) => ({
			key,
			value: startCase(key),
			sort: () => 0,
		})),
	);
</script>

<DataTable
	zebra
	sortable
	{headers}
	{rows}
	on:click:header={(h) => {
		const field = h.detail.header.key;
		const dir = h.detail.sortDirection;
		handleSortChange(field, dir);
	}}
>
	<Toolbar>
		<ToolbarContent>
			<ToolbarSearch
				bind:value={searchInput}
				on:keyup={() => {
					forceFirstPage = true;
					handleSearchChange(searchInput);
				}}
				on:clear={() => {
					forceFirstPage = true;
					handleSearchChange(searchInput);
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
	{totalItems}
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
