<script lang="ts" context="module">
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import LeasePage from '$lib/components/lease/LeasePage.svelte';
	import LeaseInvoiceList from '$lib/components/leaseInvoice/LeaseInvoiceList.svelte';
	import { kwdFormat, toUTCFormat } from '$lib/utils/common';
	import { parseParams } from '$lib/utils/parse-params';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({
		params,
		stuff,
		url,
	}: LoadEvent<{ id: string }>) => {
		const { page } = parseParams(url);
		const leaseId = params.id;

		const [lease, invoices] = await Promise.all([
			stuff.api!.leases.findOne({ id: leaseId }),
			stuff.api!.leases.findInvoices({ id: leaseId, page, take: 100 }),
		]);

		return { props: { lease, invoices } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let lease: Prop['lease'];
	export let invoices: Prop['invoices'];

	$: details = [
		['Tenant', lease.breadcrumbs.tenant.label],
		['Start Date', toUTCFormat(lease.start)],
		['End Date', toUTCFormat(lease.end)],
		['Monthly Rent', kwdFormat(lease.monthlyRent)],
		['Deposit', kwdFormat(lease.deposit)],
		['License', lease.license || '-'],
	] as [string, string | null][];
</script>

<LeasePage {lease} />
<DetailsPane {details} />
<LeaseInvoiceList leaseInvoices={invoices} leaseId={lease.id} />
