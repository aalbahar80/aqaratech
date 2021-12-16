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
	import { FieldList } from '$components/form/Field';

	export let docs;
	export let fieldList;
	fieldList = new FieldList(fieldList.fieldList);
</script>

<AddGeneric {fieldList} insertDoc={docs.insert} />
