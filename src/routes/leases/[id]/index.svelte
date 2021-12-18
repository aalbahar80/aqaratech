<script context="module" lang="ts">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page }) {
		const id = page.params.id;

		if (id === 'add') {
			// Go to add page instead
			return;
		} else {
			return {};
		}
	}
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$components/BreadCrumbs.svelte';
	import {
		LeasesByIdQuery,
		LeasesByIdQueryVariables,
		LeasesByIdDocument
	} from '$generated/graphql';
	import { operationStore, query } from '@urql/svelte';

	import LeaseDropdown from '$components/LeaseDropdown.svelte';
	import { formatDistanceToNow, formatRelative } from 'date-fns';
	import { renderReportAndGetRenderId } from '$lib/services/carbone';

	const lease = operationStore<LeasesByIdQuery, LeasesByIdQueryVariables>(
		LeasesByIdDocument,
		{
			id: parseInt($page.params.id)
		}
	);
	query(lease);
	$: result = $lease?.data?.leases_by_pk;
	$: crumbData = {
		clientId: $lease?.data?.leases_by_pk?.unit?.client_id_s,
		propertyId: $lease?.data?.leases_by_pk?.unit?.property_id,
		unitId: $lease?.data?.leases_by_pk?.unit_id,
		leaseId: $lease?.data?.leases_by_pk?.id,
		tenantId: $lease?.data?.leases_by_pk?.tenant_id
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

<BreadCrumbs {...crumbData} />
{JSON.stringify($lease)}
<button class="btn btn-secondary" class:loading on:click={getPDF}
	>Generate PDF</button
>

<a href="{$page.path}/edit" class="btn btn-secondary" class:loading>Edit</a>
