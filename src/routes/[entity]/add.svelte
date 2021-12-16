<script context="module" lang="ts">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
		const entity = page.params.entity;
		const id = page.params.id;
		const url = `/${entity}/${id}.json`;
		const response = await fetch(url);
		const data = await response.json();
		const { docs, fieldList } = data;

		return {
			props: {
				docs,
				fieldList
			}
		};
	}
</script>

<script lang="ts">
	import AddGeneric from '$components/AddGeneric.svelte';
	import type { Field } from '$components/form/Field';

	export let docs;
	export let fieldList: Field[];
</script>

{#if fieldList}
	<AddGeneric {fieldList} insertDoc={docs.insert} />
{/if}
