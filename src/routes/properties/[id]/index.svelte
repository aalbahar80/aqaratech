<script context="module" lang="ts">
	import ActionPanel from '$components/ActionPanel.svelte';
	import type { Load } from '@sveltejs/kit';
	import { query } from '@urql/svelte';
	import {
		DeletePropertyDocument,
		PropertyDetailPageDocument,
		PropertyDetailPageStore,
	} from './_index.gql';
	import { page } from '$app/stores';

	export const prerender = true;

	export const load: Load = async ({ params, stuff }) => {
		const { id } = params;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		const property: PropertyDetailPageStore = await stuff.query(
			PropertyDetailPageDocument,
			{
				id,
			},
		);
		return {
			props: {
				property,
			},
		};
	};
</script>

<script lang="ts">
	export let property: PropertyDetailPageStore;
	$: id = $page.params.id;
	query(property);
	$: result = $property?.data?.properties_by_pk;
</script>

<ActionPanel {id} deleteDocumentNode={DeletePropertyDocument} />

<div class="max-w-4xl mx-auto px-6">
	<div class="grid grid-cols-2 gap-2 mt-8 max-w-md justify-self-center">
		{#each Object.entries($property.data?.properties_by_pk || {}) as [key, value]}
			<p>{key}</p>
			<p>{value}</p>
		{/each}
	</div>
</div>
