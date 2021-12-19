<script lang="ts">
	import { page } from '$app/stores';
	import { operationStore, query } from '@urql/svelte';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faPen } from '@fortawesome/free-solid-svg-icons';
	import ref from '$lib/definitions/ref';

	const entity = $page.params.entity;
	const { docs, graphqlNamePk } = ref[entity];
	const thing = operationStore(docs.byId, { id: $page.params.id });
	query(thing);
</script>

{#if $thing.fetching}
	<p>loading</p>
{:else if $thing?.data[graphqlNamePk]}
	<div class="max-w-4xl mx-auto px-6">
		<div class="grid grid-cols-2 gap-2 mt-8 max-w-md justify-self-center">
			<a
				class="btn btn-outline btn-primary col-span-2"
				href="/{$page.params.entity}/{$page.params.id}/edit"
			>
				<Fa icon={faPen} />
				<span class="pl-2">Edit</span>
			</a>
			{#each Object.entries($thing?.data[graphqlNamePk]) as [key, value]}
				<p>{key}</p>
				<p>{value}</p>
			{/each}
		</div>
	</div>
{/if}
