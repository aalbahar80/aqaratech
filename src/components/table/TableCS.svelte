<script lang="ts">
	import {
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		ToolbarMenu,
		ToolbarMenuItem,
		Button,
		OverflowMenu,
		OverflowMenuItem,
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

	const headers: DataTableHeader[] = insert(
		fieldList.map((v) => ({
			key: v.fieldName,
			value: v.title,
		})),
		{
			key: 'overflow',
			empty: true,
		},
		fieldList.length,
	);

	const pageSizes = [10, 25, 100];
	let pageSize = 10;
	let pageIndex = 1;

	type SortInfo = {
		[key: string]: Order_By;
	};

	let sortingInfo: SortInfo = { id: 'asc' };
	$: queryVars = {
		limit: pageSize,
		offset: (pageIndex - 1) * pageSize,
		order_by: sortingInfo,
	};

	const pageQuery = operationStore(listDoc, queryVars);
	$: pageQuery.variables = queryVars;
	query(pageQuery);
</script>

{#if $pageQuery.fetching}
	<DataTableSkeleton {headers} rows={pageSize} />
{:else if $pageQuery.error}
	<p>Error state here</p>
{/if}

{#if !pageQuery.error}
	<div class:hidden={$pageQuery.fetching && !$pageQuery.error}>
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
			description="Your organization's active load balancers."
			{headers}
			rows={$pageQuery.data?.[graphqlName] ?? []}
		>
			<Toolbar>
				<ToolbarContent>
					<ToolbarSearch />
					<ToolbarMenu>
						<ToolbarMenuItem primaryFocus>Restart all</ToolbarMenuItem>
						<ToolbarMenuItem
							href="https://cloud.ibm.com/docs/loadbalancer-service"
						>
							API documentation
						</ToolbarMenuItem>
						<ToolbarMenuItem danger>Delete</ToolbarMenuItem>
					</ToolbarMenu>
					<Button href={`${$page.url.pathname}/add`}>New</Button>
				</ToolbarContent>
			</Toolbar>

			<svelte:fragment slot="cell" let:row let:cell>
				{#if cell.key === 'overflow'}
					<OverflowMenu flipped>
						<OverflowMenuItem
							href={`${$page.url.pathname}/${row.id}`}
							text="Details"
						/>
						<OverflowMenuItem
							href={`${$page.url.pathname}/${row.id}/edit`}
							text="Edit"
						/>
						<OverflowMenuItem danger text="Delete" />
					</OverflowMenu>
				{:else}{cell.value}{/if}
			</svelte:fragment>
		</DataTable>
	</div>
	<Pagination
		totalItems={$pageQuery.data?.agg?.aggregate?.count ?? 111}
		{pageSizes}
		bind:pageSize
		bind:page={pageIndex}
	/>
{/if}
