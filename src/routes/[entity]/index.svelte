<!-- <script context="module" lang="ts">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch, session, stuff }) {
		const entity = page.params.entity;
		const url = `/${entity}.json`;
		const response = await fetch(url);
		const data = await response.json();
		const { docs, fieldList, graphqlName, key } = data;

		return {
			props: {
				graphqlName,
				docs,
				fieldList
			}
		};
	}
</script> -->
<script lang="ts">
	import { page } from '$app/stores';
	import type { Field } from '$components/form/Field';
	import IndexGeneric from '$components/IndexGeneric.svelte';
	import NewTable from '$components/table/NewTable.svelte';
	import ab from '$lib/mystuff/abc';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { invalidate } from '$app/navigation';

	$: entity = $page.params.entity;
	console.log('entity: ', $page.params.entity);

	$: docs = ab[$page.params.entity].docs;
	$: graphqlName = ab[$page.params.entity].graphqlName;
	$: fieldList = ab[$page.params.entity].fieldList;
	$: title = ab[$page.params.entity].title;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<IndexGeneric
	{entity}
	{graphqlName}
	{fieldList}
	listDoc={docs.list}
	deleteDoc={docs.delete}
/>

<!-- <NewTable svr={segmentVarsList} /> -->
<!-- <NewTable {graphqlName} /> -->
