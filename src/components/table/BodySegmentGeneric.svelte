<script lang="ts">
	import { operationStore, query } from '@urql/svelte';
	import type { DocumentNode } from 'graphql';
	import { key } from '$components/keyyy';
	import { getContext } from 'svelte';
	import ModalDelete from '$components/modal/ModalDelete.svelte';
	import ModalEdit from '$components/modal/ModalEdit.svelte';
	import type { FieldList } from '$components/form/Field';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import isFetching from '$components/table/TableGeneric.svelte';
	import type { Writable } from 'svelte/store';

	export let segmentVars;

	const { getListDoc, getFieldList, getGraphQlName, getIsFetching } =
		getContext(key);
	const queryDocument: DocumentNode = getListDoc();
	const _fieldList: SvelteStore<FieldList> = getFieldList();
	const graphqlName: string = getGraphQlName();
	let isFetching: Writable<boolean> = getIsFetching();

	const PageQuery = operationStore(queryDocument, segmentVars);
	query(PageQuery);

	$: isFetching.set($PageQuery.fetching);
</script>

{#if $PageQuery.error}
	<p>Oh no... {$PageQuery.error.message}</p>
{/if}

<!-- {#if $PageQuery.fetching}
	{isFetching.set(true)}
{:else}
	{isFetching.set(false)}
{/if} -->

{#if $PageQuery.data?.[graphqlName]}
	{#each $PageQuery.data?.[graphqlName] as row}
		<tr class="hover">
			{#each $_fieldList.fieldList as { fieldName, visibile }}
				{#if visibile}
					{#if fieldName === 'actions'}
						<th class="sticky">
							<!-- <ModalEdit existing={row} />
							<ModalDelete id={row.id} /> -->
							<a
								href={`/${graphqlName}/${row.id}`}
								class="btn btn-outline btn-primary btn-sm lg:btn-md">Details</a
							>
						</th>
					{:else}
						<td>{row[fieldName]}</td>
					{/if}
				{/if}
			{/each}
		</tr>
	{/each}
{/if}

<slot fetching={$PageQuery.fetching} />
