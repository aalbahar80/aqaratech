<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ params }) => {
		const id = params.id;

		if (id === 'add') {
			// Go to add page instead
			return;
		} else {
			return {};
		}
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$components/BreadCrumbs.svelte';
	import { LeasesByIdDocument } from '$generated/graphql';
	import { operationStore, query } from '@urql/svelte';

	import { formatDistanceToNow, formatRelative } from 'date-fns';
	import { renderReportAndGetRenderId } from '$lib/services/carbone';

	const lease = operationStore(LeasesByIdDocument, {
		id: parseInt($page.params.id),
	});
	query(lease);
	$: result = $lease?.data?.leases_by_pk;
	$: crumbData = {
		clientId: $lease?.data?.leases_by_pk?.unit?.property?.client?.id,
		propertyId: $lease?.data?.leases_by_pk?.unit?.property?.id,
		unitId: $lease?.data?.leases_by_pk?.unit_id,
		leaseId: $lease?.data?.leases_by_pk?.id,
		tenantId: $lease?.data?.leases_by_pk?.tenant_id,
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

<a href="{$page.url.pathname}/edit" class="btn btn-secondary" class:loading
	>Edit</a
>
