<script context="module" lang="ts">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
		const entity = page.params.entity;
		const id = page.params.id;
		const url = `/${entity}/${id}.json`;
		const response = await fetch(url);
		console.log(response);
		const data = await response.json();
		console.log(data);
		const { docs, fieldList, graphqlName, updateDoc, sdocs, update5 } = data;
		// const up3: DocumentNode = JSON.parse(updateDoc);
		// console.log(up3);
		// console.log('sdfsdf', <DocumentNode>updateDoc);

		return {
			props: {
				docs,
				fieldList,
				graphqlName,
				updateDoc,
				sdocs,
				update5
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
	export let sdocs;
	export let updateDoc;
	export let update5;
	export let graphqlName: string;
	// const updateDoc2: DocumentNode = JSON.parse(updateDoc);
	export let fieldList;
	fieldList = new FieldList(fieldList.fieldList);
	console.log('update5', update5);
	console.log('update doc here', docs.update);
	const up4 = sdocs.update;
	const thing = operationStore(docs.byId, { id: $page.params.id });
	query(thing);
</script>

{#if $thing.fetching || $thing.stale}
	<p>Loading...</p>
{:else if $thing.error}
	<p>Error: {$thing.error.message}</p>
{:else}
	{console.log('docssss', docs)}
	{@debug up4}
	{@debug updateDoc}
	<AddGeneric
		existing={$thing.data[graphqlName]}
		{fieldList}
		updateDoc={docs.update}
		insertDoc={docs.insert}
	/>
{/if}
