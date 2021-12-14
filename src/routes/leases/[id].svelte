<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$components/BreadCrumbs.svelte';
	import {
		LeaseByIdQuery,
		LeaseByIdQueryVariables,
		LeaseByIdDocument
	} from '$generated/graphql';
	import { operationStore, query } from '@urql/svelte';

	import LeaseDropdown from '$components/LeaseDropdown.svelte';
	import { formatDistanceToNow, formatRelative } from 'date-fns';
	import { renderReportAndGetRenderId } from '$lib/services/carbone';

	const lease = operationStore<LeaseByIdQuery, LeaseByIdQueryVariables>(
		LeaseByIdDocument,
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

<button class="btn btn-secondary" class:loading>Renew Lease</button>
