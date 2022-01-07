<script lang="ts">
	import FormC from '$components/form/FormC.svelte';
	import ref from '$lib/definitions/ref';
	import { operationStore, query } from '@urql/svelte';
	import { page } from '$app/stores';

	const { entity } = $page.params;

	const { docs, fieldList, graphqlNamePk } = ref[entity];

	const thing = operationStore(docs.byId, { id: $page.params.id });
	query(thing);
</script>

{#if $thing.fetching || $thing.stale}
	<p>Loading...</p>
{:else if $thing.error}
	<p>Error: {$thing.error.message}</p>
{:else}
	<FormC
		{fieldList}
		{entity}
		existing={$thing.data[graphqlNamePk]}
		updateDoc={docs.update}
	/>
{/if}
