<script context="module" lang="ts">
	import { renderReportAndGetRenderId } from '$lib/services/carbone';
	import type { Load } from '@sveltejs/kit';
	import { query } from '@urql/svelte';
	import ActionPanel from '$components/ActionPanel.svelte';
	import { Button } from 'carbon-components-svelte';
	import { DocumentExport16, Renew16 } from 'carbon-icons-svelte';
	import {
		DeleteLeaseDocument,
		LeaseDetailPageDocument,
		LeaseDetailPageStore,
	} from './_index.gql';
	import { page } from '$app/stores';

	export const prerender = true;

	export const load: Load = async ({ params, stuff }) => {
		const { id } = params;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		const lease: LeaseDetailPageStore = await stuff.query(
			LeaseDetailPageDocument,
			{
				id,
			},
		);
		return {
			props: {
				lease,
			},
		};
	};
</script>

<script lang="ts">
	export let lease: LeaseDetailPageStore;
	$: id = $page.params.id;
	query(lease);
	$: result = $lease?.data?.leases_by_pk;

	let loading = false;
	// async function that opens a new window with the report
	async function getPDF() {
		loading = true;
		await renderReportAndGetRenderId().then((url) => {
			window.open(url, '_blank');
		});
		loading = false;
	}
</script>

<ActionPanel {id} deleteDocumentNode={DeleteLeaseDocument} />

<div class="grid grid-flow-col grid-rows-1 justify-end gap-4">
	<Button kind="tertiary" iconDescription="Renew" icon={Renew16} />
	<Button
		kind="tertiary"
		iconDescription="Generate PDF"
		icon={DocumentExport16}
		on:click={getPDF}
	/>
</div>
<div class="max-w-4xl mx-auto px-6">
	<div class="grid grid-cols-2 gap-2 mt-8 max-w-md justify-self-center">
		{#each Object.entries($lease.data?.leases_by_pk) as [key, value]}
			<p>{key}</p>
			<p>{value}</p>
		{/each}
	</div>
</div>
