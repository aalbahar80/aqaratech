<script context="module" lang="ts">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
		const entity = page.params.entity;
		const id = page.params.id;
		const url = `/${entity}/${id}.json`;
		const response = await fetch(url);
		const data = await response.json();
		const { docs, fieldList, graphqlNamePk } = data;

		return {
			props: {
				docs,
				fieldList,
				graphqlNamePk,
				entity
			}
		};
	}
</script>

<script lang="ts">
	import type { DocumentNode } from 'graphql';
	import { page } from '$app/stores';
	import AddGeneric from '$components/AddGeneric.svelte';
	import type { Field } from '$components/form/Field';
	import { operationStore, query, TypedDocumentNode } from '@urql/svelte';

	export let docs;
	export let graphqlNamePk: string;
	export let fieldList: Field[];
	export let entity: string;

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
		{entity}
		existing={$thing.data[graphqlNamePk]}
		updateDoc={docs.update}
	/>
{/if}
