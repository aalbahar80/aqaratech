<script lang="ts">
	import { page } from '$app/stores';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import LeaseHeading from '$lib/components/lease/LeaseHeading.svelte';
	import TrxColumn from '$lib/components/tenant/TrxColumn.svelte';
	import { dateFormat, kwdFormat } from '$lib/utils/common';
	import { concatIfExists } from '$lib/utils/table-utils';

	const { lease } = $page.stuff;
	const details: [string, string | null][] = [
		['Tenant', concatIfExists([lease.tenant.firstName, lease.tenant.lastName])],
		['Start Date', dateFormat(lease.start)],
		['End Date', dateFormat(lease.end)],
		['Monthly Rent', kwdFormat(lease.monthlyRent)],
		['Deposit', kwdFormat(lease.deposit)],
		['License', lease.license],
	];

	const files: [string, string][] = [['Lease', 'TODO implement']];
</script>

<LeaseHeading {lease} />
<DetailsPane {details} {files} />
<TrxColumn transactions={lease.transactions} leaseId={lease.id} />
