<script context="module" lang="ts">
	import { page } from '$app/stores';
	import ActionPanel from '$components/ActionPanel.svelte';
	import BreadCrumbs from '$components/breadcrumbs/BreadCrumbs.svelte';
	import type { Load } from '@sveltejs/kit';

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

	$: crumbs = {
		property: $property.data?.properties_by_pk?.id,
		client: $property.data?.properties_by_pk?.client_id,
	};
</script>

<BreadCrumbs {crumbs} />
<ActionPanel {id} deleteDocumentNode={DeletePropertyDocument} />

<div class="max-w-4xl mx-auto px-6">
	<div class="grid grid-cols-2 gap-2 mt-8 max-w-md justify-self-center">
		{#each Object.entries($property.data?.properties_by_pk || {}) as [key, value]}
			<p>{key}</p>
			<p>{value}</p>
		{/each}
	</div>
</div>
