<script context="module" lang="ts">
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
				fieldList,
				key
			}
		};
	}
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import type { Field } from '$components/form/Field';
	import IndexGeneric from '$components/IndexGeneric.svelte';
	import NewTable from '$components/table/NewTable.svelte';
	import TableGeneric from '$components/table/TableGeneric.svelte';
	// import { key } from '$components/keyyy';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	export let graphqlName;
	export let docs;
	export let fieldList: Field[];

	let segmentVarsList = writable([3]);
	setContext(graphqlName, {
		getsvr: () => segmentVarsList
	});

	console.log('segmentVarsList', $segmentVarsList);
</script>

<svelte:head>
	<title>{$page.params.entity}</title>
</svelte:head>

<IndexGeneric
	{graphqlName}
	{fieldList}
	listDoc={docs.list}
	deleteDoc={docs.delete}
/>

<!-- <NewTable svr={segmentVarsList} /> -->
<!-- <NewTable {graphqlName} /> -->
