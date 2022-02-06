<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { Field } from '$components/form/Field';
	import PreloadingIndicator from '$components/PreloadingIndicator.svelte';
	import { constructFilter } from '$lib/utils/search-utils';
	import capitalize from 'just-capitalize';
	import insert from 'just-insert';

	export let listDoc: TypedDocumentNode;
	export let graphqlName: string;
	export let fieldList: Field[];

	// PAGINATION
	const pageSizes = [10, 25, 100];
	let pageSize = 25;
	let totalItems = 0;
	$: totalItems = $pageQuery.data?.agg?.aggregate?.count;
	$: pageIndex = Number($page.url.searchParams.get('page')) || 1;

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
	$: searchTerm = searchInput;
	$: filter = constructFilter(searchTerm, fieldList);

	// flag to reset page number while user is actively searching
	let forceFirstPage = false;
	const handleSearchChange = (newSearchInput: string) => {
		if (!browser) return;

		const params = new URLSearchParams($page.url.searchParams.toString());

		if (newSearchInput) {
			params.set('search', encodeURIComponent(newSearchInput));
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

	// QUERY
	$: queryVars = {
		limit: pageSize,
		offset: (pageIndex - 1) * pageSize,
		order_by: sortingInfo,
		where: filter,
	};

	const pageQuery = operationStore(listDoc, queryVars);
	$: $pageQuery.variables = queryVars;
	query(pageQuery);

	// TABLE
	const headers: DataTableHeader[] = insert(
		fieldList
			.filter((v) => v.visibileInTable)
			.map((v) => ({
				key: v.fieldName,
				value: v.title,
				sort: () => 0,
				// columnMenu: true,
			})),
		{
			key: 'overflow',
			empty: false,
			value: '',
			sort: false,
		},
		0,
	);
</script>

{#if $pageQuery.fetching}
	<PreloadingIndicator />
{/if}

{#if !$pageQuery.data && $pageQuery.fetching}
	<DataTableSkeleton {headers} rows={pageSize} />
{:else if $pageQuery.error}
	<p>Error state here</p>
{/if}

{#if $pageQuery.data}
	<DataTable
		on:click:header={(h) => {
			const field = h.detail.header.key;
			const dir = h.detail.sortDirection;
			handleSortChange(field, dir);
		}}
		zebra
		sortable
		title={capitalize(graphqlName)}
		{headers}
		rows={$pageQuery.data?.[graphqlName] ?? []}
	>
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
		{totalItems}
		{pageSizes}
		bind:pageSize
		page={pageIndex}
		pageInputDisabled
		on:click:button--next={(e) => {
			handlePageChange(e.detail.page);
		}}
		on:click:button--previous={(e) => {
			handlePageChange(e.detail.page);
		}}
	/>
{/if}
