<script context="module" lang="ts">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
		const entity = page.params.entity;
		const id = page.params.id;
		const url = `/${entity}/${id}.json`;
		console.log(url);
		const response = await fetch(url);
		// const data = await response.json();
		const data = await response;
		console.log('data is', data);
		// console.log(response);

		return {
			props: {
				data: data
			}
		};
	}
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import AddGeneric from '$components/AddGeneric.svelte';
	import { onMount } from 'svelte';
	export let data;

	// let _entity, docs, title, graphQlName, fieldList;
	// const entity = $page.params.entity;
	// const id = $page.params.id;
	// const path = `../${entity}/${entity}`;
	// onMount(async () => {
	// 	_entity = (await import(path)).default;
	// 	({ docs, title, graphQlName, fieldList } = _entity);
	// });

	let _entity, docs, title, graphQlName, fieldList;
	const entity = $page.params.entity;
	const path = `../../${entity}/${entity}`;
	onMount(async () => {
		_entity = (await import(path)).default;
		({ docs, title, graphQlName, fieldList } = _entity);
	});
</script>

<p>{JSON.stringify(data)}</p>
{#if _entity}
	<!-- <BreadCrumbs {...crumbData} /> -->
	<AddGeneric existing={data} {fieldList} updateDoc={docs.update} />
{/if}
