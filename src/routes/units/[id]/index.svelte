<script context="module" lang="ts">
	import ActionPanel from '$components/ActionPanel.svelte';
	import type { Load } from '@sveltejs/kit';
	import { query } from '@urql/svelte';
	import {
		DeleteUnitDocument,
		UnitDetailPageDocument,
		UnitDetailPageStore,
	} from './_index.gql';
	import { page } from '$app/stores';
	import BreadCrumbs from '$components/breadcrumbs/BreadCrumbs.svelte';

	export const prerender = true;

	export const load: Load = async ({ params, stuff }) => {
		const { id } = params;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		const unit: UnitDetailPageStore = await stuff.query(
			UnitDetailPageDocument,
			{
				id,
			},
		);
		return {
			props: {
				unit,
			},
		};
	};
</script>

<script lang="ts">
	export let unit: UnitDetailPageStore;
	$: id = $page.params.id;
	query(unit);

	let crumbs: CrumbData;
	$: crumbs = {
		unit: $unit.data?.units_by_pk?.id,
		property: $unit.data?.units_by_pk?.property_id,
		client: $unit.data?.units_by_pk?.property?.client_id,
	};
</script>

<BreadCrumbs {crumbs} />
<ActionPanel {id} deleteDocumentNode={DeleteUnitDocument} />

<div class="max-w-4xl mx-auto px-6">
	<div class="grid grid-cols-2 gap-2 mt-8 max-w-md justify-self-center">
		{#each Object.entries($unit.data?.units_by_pk || {}) as [key, value]}
			<p>{key}</p>
			<p>{value}</p>
		{/each}
	</div>
</div>
