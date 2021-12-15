<script lang="ts">
	import IndexGeneric from '$components/IndexGeneric.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let _entity, docs, title, graphQlName, fieldList;
	const entity = $page.path.split('/')[1];
	const path = `../${entity}/${entity}`;

	onMount(async () => {
		_entity = (await import(path)).default;
		({ docs, title, graphQlName, fieldList } = _entity);
	});
</script>

<svelte:head>
	<title>{entity}</title>
</svelte:head>

{#if _entity}
	<IndexGeneric
		{title}
		{graphQlName}
		{fieldList}
		listDoc={docs.list}
		deleteDoc={docs.delete}
	/>
{/if}
