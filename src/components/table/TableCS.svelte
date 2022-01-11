<script lang="ts">
	import {
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		Button,
		Pagination,
		DataTableSkeleton,
	} from 'carbon-components-svelte';
	import type { Order_By } from '$generated/graphql';
	import type { Field } from '$components/form/Field';
	import type { DataTableHeader } from 'carbon-components-svelte/types/DataTable/DataTable.svelte';
	import { operationStore, query, TypedDocumentNode } from '@urql/svelte';
	import insert from 'just-insert';
	import capitalize from 'just-capitalize';
	import { page } from '$app/stores';

	export let listDoc: TypedDocumentNode;
	export let graphqlName: string;
	export let fieldList: Field[];

	let searchTerm = '';

	const headers: DataTableHeader[] = insert(
		fieldList.map((v) => ({
			key: v.fieldName,
			value: v.title,
		})),
		{
			key: 'overflow',
			empty: true,
		},
		0,
	);

	const pageSizes = [10, 25, 100];
	let pageSize = 10;
	let pageIndex = 1;
	$: totalItems = $pageQuery.data?.agg?.aggregate?.count ?? 111;

	type SortInfo = {
		[key: string]: Order_By;
	};

	$: filter = fieldList
		// disregard number fields if search term isn't a number
		.filter((f) =>
			parseInt(searchTerm, 10)
				? f.searchable
				: f.searchable && f.searchType === 'text',
		)
		.map((f) => {
			// number scalars use _eq operator
			if (f.searchType === 'number') {
				return {
					[f.fieldName]: { _eq: parseInt(searchTerm, 10) },
				};
			}
			// text scalars use %_ilike% operator
			if (f.searchType === 'text') {
				return {
					[f.fieldName]: { _ilike: `%${searchTerm}%` },
				};
			}

			console.warn(
				'Unknown search type. Search type should be handled.',
				f.searchType,
			);
			return {};
		});
	$: console.log(filter);
	let sortingInfo: SortInfo = { id: 'asc' };
	$: queryVars = {
		limit: pageSize,
		offset: (pageIndex - 1) * pageSize,
		order_by: sortingInfo,
		where: { _or: filter },
	};

	const pageQuery = operationStore(listDoc, queryVars);
	$: pageQuery.variables = queryVars;
	query(pageQuery);
</script>

{#if !$pageQuery.data}
	<DataTableSkeleton {headers} rows={pageSize} />
{:else if $pageQuery.error}
	<p>Error state here</p>
{/if}

{#if pageQuery.data}
	<div>
		<DataTable
			on:click:header={(h) => {
				const field = h.detail.header.key;
				const order = h.detail.sortDirection;
				sortingInfo = {
					[field]: order === 'ascending' ? 'asc' : 'desc',
				};
			}}
			zebra
			sortable
			title={capitalize(graphqlName)}
			{headers}
			rows={$pageQuery.data?.[graphqlName] ?? []}
		>
			<Toolbar>
				<ToolbarContent>
					<ToolbarSearch bind:value={searchTerm} />
					<Button href={`${$page.url.pathname}/add`}>New</Button>
				</ToolbarContent>
			</Toolbar>

			<svelte:fragment slot="cell" let:row let:cell>
				{#if cell.key === 'overflow'}
					<Button href={`${$page.url.pathname}/${row.id}`} kind="ghost">
						View</Button
					>
				{:else}{cell.value}{/if}
			</svelte:fragment>
		</DataTable>
	</div>
	<Pagination bind:totalItems {pageSizes} bind:pageSize bind:page={pageIndex} />
{/if}
