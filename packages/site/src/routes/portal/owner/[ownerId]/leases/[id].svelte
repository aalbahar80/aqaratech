<script lang="ts" context="module">
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import Badge from '$lib/components/Badge.svelte';
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import TrxColumn from '$lib/components/tenant/TrxColumn.svelte';
	import { dateFormat, getName, kwdFormat } from '$lib/utils/common';
	import { getBadge } from '$models/interfaces/lease.interface';
	import { faCalendarXmark } from '@fortawesome/free-solid-svg-icons';
	import formatDistance from 'date-fns/formatDistance';
	import type { Load } from './[id]';

	export const load: Load = async ({ params }) => {
		const lease = await trpc.query('owner:leases:read', params.id);
		return { props: { lease } };
	};
</script>

<script lang="ts">
	export let lease: InferQueryOutput<'owner:leases:read'>;
	const details: [string, string | null][] = [
		['Tenant', getName(lease.tenant)],
		['Start Date', dateFormat(lease.start)],
		['End Date', dateFormat(lease.end)],
		['Monthly Rent', kwdFormat(lease.monthlyRent)],
		['Deposit', kwdFormat(lease.deposit)],
	];

	const icons = [
		{
			label: `Expiry: ${formatDistance(lease.end, new Date(), {
				addSuffix: true,
			})}`,
			icon: faCalendarXmark,
			tooltip: 'Bedrooms',
		},
	];

	const badge = getBadge(lease);
</script>

<div class="mx-auto flex max-w-4xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<Heading title="Lease" id={lease.id} entity="leases" {icons} hideActions>
		<svelte:fragment slot="breadcrumbs">
			<BreadCrumb
				crumbs={[
					['properties', lease.unit.property.id],
					['units', lease.unit.id],
				]}
			/>
		</svelte:fragment>
	</Heading>
	<Badge label={badge.label} badgeColor={badge.color} />
	<DetailsPane {details} />
	<TrxColumn transactions={lease.transactions} leaseId={lease.id} hideActions />
</div>
