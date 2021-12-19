<script lang="ts">
	import { page } from '$app/stores';
	import AddGeneric from '$components/AddGeneric.svelte';
	import ref from '$lib/definitions/ref';
	import { operationStore, query } from '@urql/svelte';

	const entity = $page.params.entity;

	const { docs, fieldList, graphqlNamePk } = ref[entity];

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
