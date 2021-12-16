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
				graphqlNamePk
			}
		};
	}
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import type { DocumentNode } from 'graphql';
	import { FieldList } from '$components/form/Field';
	import { operationStore, query, TypedDocumentNode } from '@urql/svelte';
	export let docs;
	export let graphqlNamePk;
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faPen } from '@fortawesome/free-solid-svg-icons';
	const thing = operationStore(docs.byId, { id: $page.params.id });
	query(thing);
</script>

{JSON.stringify($thing)}

<div class="max-w-4xl mx-auto px-6">
	<div class="grid grid-cols-2 gap-2 mt-8 max-w-md justify-self-center">
		<a
			class="btn btn-outline btn-primary col-span-2"
			href="/{$page.params.entity}/{$page.params.id}/edit"
		>
			<Fa icon={faPen} />
			<span class="pl-2">Edit</span>
		</a>
		{#each Object.entries($thing.data[graphqlNamePk]) as [key, value]}
			<p>{key}</p>
			<p>{value}</p>
		{/each}
	</div>
</div>
