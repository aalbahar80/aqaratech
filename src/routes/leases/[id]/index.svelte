<script context="module" lang="ts">
	import { page } from '$app/stores';
	import ActionPanel from '$components/ActionPanel.svelte';
	import BreadCrumbs from '$components/breadcrumbs/BreadCrumbs.svelte';
	import NextPrev from '$components/breadcrumbs/NextPrev.svelte';
	import { renderReportAndGetRenderId } from '$lib/services/carbone';
	import type { Load } from '@sveltejs/kit';
	import { query } from '@urql/svelte';
	import { Button } from 'carbon-components-svelte';
	import { DocumentExport16, Renew16 } from 'carbon-icons-svelte';
	import {
		DeleteLeaseDocument,
		LeaseDetailPageDocument,
		LeaseDetailPageStore,
	} from './_index.gql';

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

	let crumbs: CrumbData;
	$: crumbs = {
		unit: $lease.data?.leases_by_pk?.tenant_id,
		lease: $lease.data?.leases_by_pk?.id,
		tenant: $lease.data?.leases_by_pk?.tenant_id,
	};

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

<BreadCrumbs {crumbs} />
<ActionPanel {id} deleteDocumentNode={DeleteLeaseDocument}>
	<svelte:fragment slot="row2">
		<Button kind="tertiary" iconDescription="Renew" icon={Renew16} />
		<Button
			kind="tertiary"
			iconDescription="Generate new PDF"
			icon={DocumentExport16}
			on:click={getPDF}
			skeleton={loading}
		/>
	</svelte:fragment>
</ActionPanel>

<div class="max-w-4xl mx-auto px-6">
	<div class="grid grid-cols-2 gap-2 mt-8 max-w-md justify-self-center">
		{#each Object.entries($lease.data?.leases_by_pk || {}) as [key, value]}
			<p>{key}</p>
			<p>{value}</p>
		{/each}
	</div>
</div>
