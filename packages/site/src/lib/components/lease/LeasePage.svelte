<script lang="ts">
	import Button from '$components/buttons/Button.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import TrxColumn from '$lib/components/tenant/TrxColumn.svelte';
	import { kwdFormat, toUTCFormat } from '$lib/utils/common';
	import { getLeaseBadge } from '$lib/utils/get-badge';
	import { create } from '$lib/utils/route-helpers';
	import type { LeaseDto, PaginatedLeaseInvoiceDto } from '@self/sdk';
	import { DocumentText, Refresh } from '@steeze-ui/heroicons';
	import { formatDistance } from 'date-fns';
	import Fa6SolidCalendarXmark from '~icons/fa6-solid/calendar-xmark';

	export let lease: LeaseDto;
	export let invoices: PaginatedLeaseInvoiceDto;

	$: details = [
		['Tenant', lease.breadcrumbs.tenant.label],
		['Start Date', toUTCFormat(lease.start)],
		['End Date', toUTCFormat(lease.end)],
		['Monthly Rent', kwdFormat(lease.monthlyRent)],
		['Deposit', kwdFormat(lease.deposit)],
		['License', lease.license || '-'],
	] as [string, string | null][];

	const files: [string, string][] = [['Lease', 'TODO implement']];
	const icons = [
		{
			label: `Expiry: ${formatDistance(lease.end, new Date(), {
				addSuffix: true,
			})}`,
			icon: Fa6SolidCalendarXmark,
			tooltip: 'Bedrooms',
		},
	];

	const badge = getLeaseBadge(lease);
</script>

<Heading title="Lease" id={lease.id} entity="leases" {icons}>
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={lease.breadcrumbs} />
	</svelte:fragment>

	<svelte:fragment slot="actions">
		<Button
			icon={Refresh}
			text="Renew"
			as="a"
			href={create({
				entity: 'leases',
				predefined: new Map([['leaseId', lease.id]]),
			})}
			class="w-full sm:w-auto"
			prefetch
		/>

		<Button
			icon={DocumentText}
			text="Contract"
			as="a"
			href={`/leases/${lease.id}/contract`}
			class="w-full sm:w-auto"
			prefetch
		/>
	</svelte:fragment>
</Heading>
<Badge label={badge.label} badgeColor={badge.color} />
<DetailsPane {details} {files} />
<!-- TODO: convert trxColumn to stacked list to take advantage of anchor pagination etc -->
<TrxColumn {invoices} leaseId={lease.id} />
