<script lang="ts" context="module">
	import Button from '$components/Button.svelte';
	import { trpc } from '$lib/client/trpc';
	import Badge from '$lib/components/Badge.svelte';
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import TrxColumn from '$lib/components/tenant/TrxColumn.svelte';
	import type { Props } from '$lib/models/types/Props.type';
	import { dateFormat, getName, kwdFormat } from '$lib/utils/common';
	import { Lease } from '$models/classes/lease.class';
	import { faCalendarXmark } from '@fortawesome/free-solid-svg-icons/faCalendarXmark';
	import { DocumentText, Refresh } from '@steeze-ui/heroicons';
	import type { LoadInput } from '@sveltejs/kit';
	import { formatDistance } from 'date-fns';

	export const load = async ({
		params,
		session,
		fetch,
	}: LoadInput<{ id: string }>) => {
		const lease = session.authz?.isAdmin
			? await trpc(fetch).query('leases:read', params.id)
			: await trpc(fetch).query('owner:leases:read', params.id);
		return { props: { lease } };
	};
</script>

<script lang="ts">
	type Lease = Props<typeof load>['lease'];
	export let lease: Lease;

	const details: [string, string | null][] = [
		['Tenant', getName(lease.tenant)],
		['Start Date', dateFormat(lease.start)],
		['End Date', dateFormat(lease.end)],
		['Monthly Rent', kwdFormat(lease.monthlyRent)],
		['Deposit', kwdFormat(lease.deposit)],
		['License', lease.license],
		['Created on', dateFormat(lease.createdAt)],
		['Last updated', lease.updatedAt.toLocaleString()],
	];

	const files: [string, string][] = [['Lease', 'TODO implement']];
	const icons = [
		{
			label: `Expiry: ${formatDistance(lease.end, new Date(), {
				addSuffix: true,
			})}`,
			icon: faCalendarXmark,
			tooltip: 'Bedrooms',
		},
	];

	const badge = Lease.getBadge(lease);
</script>

<Heading title="Lease" id={lease.id} entity="leases" {icons}>
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb
			crumbs={[
				// ['clients', lease.unit.property.clientId],
				['properties', lease.unit.property.id],
				['units', lease.unit.id],
				['tenants', lease.tenant.id],
			]}
		/>
	</svelte:fragment>

	<svelte:fragment slot="actions">
		<Button
			icon={Refresh}
			text="Renew"
			as="a"
			href={`/new/leases?leaseId=${lease.id}&renew=true`}
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
<TrxColumn transactions={lease.transactions} leaseId={lease.id} />
