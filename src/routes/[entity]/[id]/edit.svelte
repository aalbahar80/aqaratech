<script context="module" lang="ts">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
		const entity = page.params.entity;
		const id = page.params.id;
		const url = `/${entity}/${id}.json`;
		const response = await fetch(url);
		const data = await response.json();
		const { docs, fieldList, graphqlName } = data;

		return {
			props: {
				docs,
				fieldList,
				graphqlName
			}
		};
	}
</script>

<script lang="ts">
	import type { DocumentNode } from 'graphql';
	import { page } from '$app/stores';
	import AddGeneric from '$components/AddGeneric.svelte';
	import { FieldList } from '$components/form/Field';
	import { operationStore, query, TypedDocumentNode } from '@urql/svelte';

	export let docs;
	export let graphqlName: string;
	export let fieldList;
	fieldList = new FieldList(fieldList.fieldList);

	const thing = operationStore(docs.byId, { id: $page.params.id });
	query(thing);
</script>

{#if $thing.fetching || $thing.stale}
	<p>Loading...</p>
{:else if $thing.error}
	<p>Error: {$thing.error.message}</p>
{:else}
	<AddGeneric
		{fieldList}
		existing={$thing.data[graphqlName]}
		updateDoc={docs.update}
	/>
{/if}
