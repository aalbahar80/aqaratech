<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button.svelte';
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import TrxColumn from '$lib/components/tenant/TrxColumn.svelte';
	import { dateFormat, kwdFormat } from '$lib/utils/common';
	import { concatIfExists } from '$lib/utils/table-utils';
	import { faCalendarXmark } from '@fortawesome/free-solid-svg-icons';
	import { DocumentText, Refresh } from '@steeze-ui/heroicons';
	import formatDistance from 'date-fns/formatDistance';

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
	const icons = [
		{
			label: `Expiry: ${formatDistance(lease.end, new Date(), {
				addSuffix: true,
			})}`,
			icon: faCalendarXmark,
			tooltip: 'Bedrooms',
		},
	];
</script>

<Heading title="Lease" id={lease.id} entity="leases" {icons}>
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb
			crumbs={[
				['clients', lease.unit.property.client.id],
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
			href={`/leases/add?unitId=${lease.unit.id}&tenantId=${lease.tenant.id}&monthlyRent=${lease.monthlyRent}`}
			class="w-full sm:w-auto"
		/>

		<Button
			icon={DocumentText}
			text="Contract"
			as="a"
			href={`/leases/${lease.id}/contract`}
			class="w-full sm:w-auto"
		/>
	</svelte:fragment>
</Heading>
<DetailsPane {details} {files} />
<TrxColumn transactions={lease.transactions} leaseId={lease.id} />
