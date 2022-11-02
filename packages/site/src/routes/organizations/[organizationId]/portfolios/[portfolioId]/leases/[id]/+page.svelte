<script lang="ts">
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import LeasePage from '$lib/components/lease/LeasePage.svelte';
	import LeaseInvoiceList from '$lib/components/leaseInvoice/LeaseInvoiceList.svelte';
	import { kwdFormat, toUTCFormat } from '$lib/utils/common';
	import type { PageData } from './$types';

	export let data: PageData;

	$: details = [
		['Tenant', data.lease.breadcrumbs.tenant.label],
		['Start Date', toUTCFormat(data.lease.start)],
		['End Date', toUTCFormat(data.lease.end)],
		['Monthly Rent', kwdFormat(data.lease.monthlyRent)],
		['Deposit', kwdFormat(data.lease.deposit)],
		['License', data.lease.license || '-'],
	] as [string, string | null][];
</script>

<LeasePage lease={data.lease} />
<DetailsPane {details} />
<LeaseInvoiceList leaseInvoices={data.invoices} leaseId={data.lease.id} />
