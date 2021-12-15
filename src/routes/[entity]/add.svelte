<script lang="ts">
	import AddGeneric from '$components/AddGeneric.svelte';
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

{#if _entity}
	<AddGeneric {fieldList} insertDoc={docs.insert} />
{/if}
