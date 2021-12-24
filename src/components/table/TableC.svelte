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
		Pagination
	} from 'carbon-components-svelte';
	import { order_by } from '$generated/graphql';
	import ColumnToggle from '$components/table/ColumnToggle.svelte';
	import SortIndicator from '$components/table/SortIndicator.svelte';
	import BodySegmentGeneric from '$components/table/BodySegmentGeneric.svelte';
	import type { Field } from '$components/form/Field';
	import { getContext } from 'svelte';
	import { key } from '$components/keyyy';
	import ModalEdit from '$components/modal/ModalEdit.svelte';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import type { Writable } from 'svelte/store';
	import { page } from '$app/stores';
	import type { DataTableHeader } from 'carbon-components-svelte/types/DataTable/DataTable.svelte';
	import { operationStore, query } from '@urql/svelte';
	import type { DocumentNode } from 'graphql';
	import ModalDelete from '$components/modal/ModalDelete.svelte';
	import isFetching from '$components/table/TableGeneric.svelte';
	import insert from 'just-insert';

	const { getGraphQlName, getFieldList, getIsFetching, getListDoc } =
		getContext(key);
	const queryDocument: DocumentNode = getListDoc();
	const graphqlName: string = getGraphQlName();
	const isFetching: Writable<boolean> = getIsFetching();
	const _fieldList: SvelteStore<Field[]> = getFieldList();
	const headers: DataTableHeader[] = insert(
		$_fieldList.map((v) => ({
			key: v.fieldName,
			value: v.title
		})),
		{
			key: 'overflow',
			empty: true
		},
		99
	);

	let pageSize = 10;
	let pageIndex = 1;
	let sortingInfo: any = { id: order_by.asc };
	$: queryVars = {
		limit: pageSize,
		offset: (pageIndex - 1) * pageSize,
		order_by: sortingInfo
	};

	$: PageQuery.variables = queryVars;

	const PageQuery = operationStore(queryDocument, queryVars);
	query(PageQuery);
</script>

<DataTable
	zebra
	sortable
	title="Load balancers"
	description="Your organization's active load balancers."
	{headers}
	rows={$PageQuery.data?.[graphqlName]}
>
	<Toolbar>
		<ToolbarContent>
			<ToolbarSearch />
			<ToolbarMenu>
				<ToolbarMenuItem primaryFocus>Restart all</ToolbarMenuItem>
				<ToolbarMenuItem href="https://cloud.ibm.com/docs/loadbalancer-service">
					API documentation
				</ToolbarMenuItem>
				<ToolbarMenuItem danger>Delete</ToolbarMenuItem>
			</ToolbarMenu>
			<Button href={`${$page.path}/add`}>New</Button>
		</ToolbarContent>
	</Toolbar>

	<span slot="cell" let:row let:cell>
		{#if cell.key === 'overflow'}
			<OverflowMenu flipped>
				<OverflowMenuItem href={`${$page.path}/${row.id}/edit`} text="Edit" />
				<OverflowMenuItem danger text="Delete" />
			</OverflowMenu>
		{:else}{cell.value}{/if}
	</span>
</DataTable>
<Pagination
	totalItems={102}
	pageSizes={[10, 20, 30]}
	bind:pageSize
	bind:page={pageIndex}
/>
