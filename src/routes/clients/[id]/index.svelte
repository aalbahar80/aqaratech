<script context="module" lang="ts">
	import { page } from '$app/stores';
	import ActionPanel from '$components/ActionPanel.svelte';
	import type { Load } from '@sveltejs/kit';
	import { query } from '@urql/svelte';
	import {
		ClientDetailPageDocument,
		DeleteClientDocument,
		type ClientDetailPageStore,
	} from './_index.gql';

	export const load: Load = async ({ params, stuff }) => {
		const { id } = params;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		const client: ClientDetailPageStore = await stuff.query(
			ClientDetailPageDocument,
			{
				id,
			},
		);
		return {
			props: {
				client,
			},
		};
	};
</script>

<script lang="ts">
	export let client: ClientDetailPageStore;
	$: id = $page.params.id;
	query(client);
	$: result = $client?.data?.clients_by_pk;
</script>

<ActionPanel {id} deleteDocumentNode={DeleteClientDocument} />

<div class="max-w-4xl mx-auto px-6">
	<div class="grid grid-cols-2 gap-2 mt-8 max-w-md justify-self-center">
		{#each Object.entries($client.data?.clients_by_pk || {}) as [key, value]}
			<p>{key}</p>
			<p>{value}</p>
		{/each}
	</div>
</div>
