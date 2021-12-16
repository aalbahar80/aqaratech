<script context="module" lang="ts">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
		const entity = page.params.entity;
		const id = page.params.id;
		const url = `/${entity}/${id}.json`;
		const response = await fetch(url);
		const data = await response.json();
		const { docs, fieldList, graphqlName } = data;
		console.dir(fieldList);

		return {
			props: {
				graphqlName,
				docs,
				fieldList
			}
		};
	}
</script>

<script lang="ts">
	import IndexGeneric from '$components/IndexGeneric.svelte';
	import { page } from '$app/stores';
	import { FieldList } from '$components/form/Field';
	export let graphqlName;
	export let docs;
	export let fieldList;
	fieldList = new FieldList(fieldList.fieldList);
</script>

<svelte:head>
	<title>{$page.params.entity}</title>
</svelte:head>

<IndexGeneric
	{graphqlName}
	{fieldList}
	listDoc={docs.list}
	deleteDoc={docs.del}
/>
